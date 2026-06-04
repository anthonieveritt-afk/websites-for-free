import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServiceClient } from "@/lib/supabase/server";
import { generateSiteFiles } from "@/lib/generator/generate-site";
import type { Application } from "@/lib/types/application";
import crypto from "crypto";

const VERCEL_TOKEN = process.env.VERCEL_API_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

function fileHash(content: string): string {
  return crypto.createHash("sha1").update(content).digest("hex");
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  if (!VERCEL_TOKEN) return NextResponse.json({ error: "VERCEL_API_TOKEN not set" }, { status: 500 });

  const { id } = await params;
  const supabase = createServiceClient();

  const { data: app } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .single();

  if (!app) return NextResponse.json({ error: "Application not found" }, { status: 404 });

  // Generate site files
  const files = generateSiteFiles(app as Application);

  // Build Vercel deployment payload
  const projectName = `ywn-${app.business_name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").slice(0, 30)}-${id.slice(0, 6)}`;

  const deployFiles = files.map((f) => ({
    file: f.path,
    data: f.content,
    encoding: "utf-8",
  }));

  const payload = {
    name: projectName,
    files: deployFiles,
    projectSettings: { framework: null },
    target: "production",
  };

  const url = VERCEL_TEAM_ID
    ? `https://api.vercel.com/v13/deployments?teamId=${VERCEL_TEAM_ID}`
    : "https://api.vercel.com/v13/deployments";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const deployment = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: deployment.error?.message ?? "Vercel deploy failed", detail: deployment }, { status: 500 });
  }

  const previewUrl = `https://${deployment.url}`;

  // Save deployment record + preview URL
  await supabase.from("deployments").insert({
    application_id: id,
    status: "live",
    vercel_deployment_id: deployment.id,
    deploy_url: previewUrl,
  });

  await supabase.from("applications").update({
    status: "preview_sent",
    updated_at: new Date().toISOString(),
  }).eq("id", id);

  await supabase.from("activity_logs").insert({
    application_id: id,
    action: "deployed",
    meta: { url: previewUrl, deploymentId: deployment.id },
  });

  return NextResponse.json({ ok: true, url: previewUrl, deploymentId: deployment.id });
}

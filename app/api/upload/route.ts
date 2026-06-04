import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) ?? "general";

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  // 5MB limit
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Only JPG, PNG, WebP or GIF allowed" }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const supabase = createServiceClient();
  const { error } = await supabase.storage
    .from("client-uploads")
    .upload(fileName, file, { contentType: file.type, upsert: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: urlData } = supabase.storage
    .from("client-uploads")
    .getPublicUrl(fileName);

  return NextResponse.json({ ok: true, url: urlData.publicUrl });
}

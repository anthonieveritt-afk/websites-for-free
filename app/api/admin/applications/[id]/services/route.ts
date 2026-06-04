import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { id } = await params;
  const { key, value } = await req.json();

  const supabase = createServiceClient();

  // Load current checklist
  const { data: app } = await supabase
    .from("applications")
    .select("services_checklist")
    .eq("id", id)
    .single();

  const current: Record<string, boolean> = (app?.services_checklist as Record<string, boolean>) ?? {};
  const updated = { ...current, [key]: value };

  const { error } = await supabase
    .from("applications")
    .update({ services_checklist: updated })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

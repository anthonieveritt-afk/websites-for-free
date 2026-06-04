import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "No user" }, { status: 401 });

  const supabase = createServiceClient();

  // Check if user already exists
  const { data: existing } = await supabase
    .from("platform_users")
    .select("id, role")
    .eq("clerk_id", userId)
    .single();

  if (existing) {
    return NextResponse.json({ ok: true, role: existing.role, created: false });
  }

  // Count existing admins — first user becomes admin, rest become client
  const { count } = await supabase
    .from("platform_users")
    .select("*", { count: "exact", head: true })
    .eq("role", "admin");

  const role = (count ?? 0) === 0 ? "admin" : "client";

  const email = user.emailAddresses[0]?.emailAddress ?? "";
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ") || null;

  const { error } = await supabase.from("platform_users").insert({
    clerk_id: userId,
    email,
    full_name: fullName,
    role,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, role, created: true });
}

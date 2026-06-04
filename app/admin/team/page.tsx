import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getTeam() {
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("platform_users")
      .select("*")
      .in("role", ["admin", "team_member"])
      .order("created_at", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

const ROLE_BADGE: Record<string, { bg: string; text: string }> = {
  admin:       { bg: "bg-violet-100", text: "text-violet-700" },
  team_member: { bg: "bg-blue-100",   text: "text-blue-700" },
  client:      { bg: "bg-gray-100",   text: "text-gray-600" },
};

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Team</h1>
        <p className="text-gray-500 mt-1">Admin and team member accounts with platform access.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Team Members</h2>
          <span className="text-sm text-gray-500">{team.length} member{team.length !== 1 ? "s" : ""}</span>
        </div>

        {team.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="text-4xl mb-3">👥</div>
            <div className="font-semibold text-gray-700 mb-1">No team members yet</div>
            <div className="text-sm text-gray-400 max-w-sm mx-auto">
              Team members are added when they sign in through Clerk. Sign in at{" "}
              <span className="font-mono text-indigo-600">/sign-in</span> to create your admin account, then update your role in Supabase.
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {team.map((member: {
              id: string;
              full_name: string | null;
              email: string;
              role: string;
              created_at: string;
            }) => (
              <div key={member.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0">
                  {(member.full_name ?? member.email).charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">{member.full_name ?? "—"}</div>
                  <div className="text-sm text-gray-500">{member.email}</div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${ROLE_BADGE[member.role]?.bg} ${ROLE_BADGE[member.role]?.text}`}>
                  {member.role.replace("_", " ")}
                </span>
                <div className="text-xs text-gray-400">
                  Joined {new Date(member.created_at).toLocaleDateString("en-GB")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 bg-amber-50 border border-amber-100 rounded-2xl p-5">
        <h3 className="font-bold text-amber-900 mb-1">Adding team members</h3>
        <p className="text-sm text-amber-700">
          Have your team member sign in at <span className="font-mono">/sign-in</span>. Their account will appear in Supabase under <span className="font-mono">platform_users</span>. Update their <span className="font-mono">role</span> to <span className="font-mono">team_member</span> or <span className="font-mono">admin</span> to grant access.
        </p>
      </div>
    </div>
  );
}

import { UserButton, Show } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { BRAND } from "@/lib/config/brand";
import { createServiceClient } from "@/lib/supabase/server";

const navItems = [
  { href: "/admin", label: "Applications", icon: "📋" },
  { href: "/admin/coupons", label: "Coupons", icon: "🎟️" },
  { href: "/admin/team", label: "Team", icon: "👥" },
];

async function syncUser() {
  try {
    const { userId } = await auth();
    if (!userId) return;
    const supabase = createServiceClient();
    const { data: existing } = await supabase
      .from("platform_users")
      .select("id")
      .eq("clerk_id", userId)
      .single();
    if (!existing) {
      const { count } = await supabase
        .from("platform_users")
        .select("*", { count: "exact", head: true })
        .eq("role", "admin");
      const role = (count ?? 0) === 0 ? "admin" : "client";
      await supabase.from("platform_users").insert({ clerk_id: userId, email: "", role });
    }
  } catch {}
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await syncUser();
  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-100 flex flex-col fixed h-full z-10">
        <div className="px-5 py-5 border-b border-gray-100">
          <Link href="/admin">
            <div className="text-base font-black text-gray-900">{BRAND.name}</div>
            <div className="text-xs text-indigo-600 font-semibold">Admin Panel</div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-gray-100 flex items-center gap-3">
          <UserButton />
          <span className="text-xs text-gray-500">Signed in</span>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-60 p-8 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}

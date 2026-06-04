"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StickyCtaBar() {
  const pathname = usePathname();
  const isApplyPage = pathname === "/apply";

  if (isApplyPage) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden pb-safe">
      <div className="bg-white border-t border-gray-200 p-3 shadow-2xl">
        <Link
          href="/apply"
          className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-full text-center text-base transition-all duration-200 shadow-lg"
        >
          🚀 Start My Free Website
        </Link>
      </div>
    </div>
  );
}

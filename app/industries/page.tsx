import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries We Serve | WebsitesForFree",
  description:
    "We build free professional websites for all types of UK small businesses — from electricians and plumbers to restaurants, gyms, and consultants.",
};

const allIndustries = [
  ...industries,
  { slug: "builders", name: "Builders", icon: "🏗️", color: "#78716c", bgColor: "#f5f5f4", headline: "Free Website For Builders" },
  { slug: "coaches", name: "Coaches", icon: "🎯", color: "#6366f1", bgColor: "#eef2ff", headline: "Free Website For Coaches" },
  { slug: "photographers", name: "Photographers", icon: "📸", color: "#374151", bgColor: "#f3f4f6", headline: "Free Website For Photographers" },
  { slug: "accountants", name: "Accountants", icon: "📑", color: "#0284c7", bgColor: "#e0f2fe", headline: "Free Website For Accountants" },
];

export default function IndustriesPage() {
  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-sm font-semibold text-indigo-700 mb-4">
            12+ industries served
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            We Build Websites For Every Industry
          </h1>
          <p className="text-xl text-gray-600">
            Whatever your business, we&apos;ve got you covered. Professional websites built free for UK small businesses.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allIndustries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 bg-white shadow-sm card-hover"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: industry.bgColor }}
                >
                  {industry.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{industry.name}</h3>
                <span
                  className="text-xs font-semibold"
                  style={{ color: industry.color }}
                >
                  See examples →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Don&apos;t see your industry?
          </h2>
          <p className="text-indigo-200 mb-8">
            We build websites for any type of UK small business. Just apply and tell us about your business.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 bg-white hover:bg-indigo-50 text-indigo-600 font-bold px-8 py-4 rounded-full text-lg transition-all shadow-xl hover:-translate-y-1"
          >
            Start My Free Website →
          </Link>
        </div>
      </section>
    </div>
  );
}

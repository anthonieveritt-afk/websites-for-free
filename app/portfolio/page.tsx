import type { Metadata } from "next";
import Link from "next/link";
import PortfolioGrid from "@/components/sections/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio | yourwebsitenow.co.uk — Example Websites",
  description:
    "Browse our portfolio of professionally built websites for UK small businesses. Filter by industry to see what we can build for you.",
};

export default function PortfolioPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-sm font-semibold text-indigo-700 mb-4">
            Our work
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Example Websites We&apos;ve Built
          </h1>
          <p className="text-xl text-gray-600">
            Filter by your industry to see what we can create for your business — all built free.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioGrid showFilter={true} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Like what you see?
          </h2>
          <p className="text-indigo-200 mb-8">
            We can build something just as impressive for your business — completely free to try.
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

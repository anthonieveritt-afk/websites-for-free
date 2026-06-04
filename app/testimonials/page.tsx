import type { Metadata } from "next";
import Link from "next/link";
import Testimonials from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Customer Reviews | YourWebsiteNow — ★★★★★",
  description:
    "Read real reviews from UK small business owners who got their professional website built free with YourWebsiteNow.",
};

export default function TestimonialsPage() {
  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-sm font-semibold text-amber-700 mb-4">
            ★★★★★ Real customers, real results
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            What Our Customers Say
          </h1>
          <p className="text-xl text-gray-600">
            Real businesses. Real results. Real reviews.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Testimonials limit={6} />
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Join Our Happy Customers
          </h2>
          <p className="text-indigo-200 mb-8">
            Your business could be next. Start your free trial today.
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

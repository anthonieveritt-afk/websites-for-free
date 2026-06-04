import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQ | WebsitesForFree — Your Questions Answered",
  description:
    "Got questions about WebsitesForFree? Find answers to everything — from how it works to pricing, your website, and support.",
};

export default function FaqPage() {
  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-sm font-semibold text-indigo-700 mb-4">
            Questions & answers
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about WebsitesForFree.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion faqs={faqs} grouped={true} />
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-4xl mb-4">💬</div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            We&apos;re happy to help. Get in touch and we&apos;ll answer anything you&apos;d like to know.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-6 py-3 rounded-full transition-all shadow-lg hover:-translate-y-0.5"
          >
            Contact Us →
          </Link>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-indigo-200 mb-8">
            No risk. No credit card. Just a great website for your business.
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

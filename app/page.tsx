import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import CostCalculator from "@/components/sections/CostCalculator";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Testimonials from "@/components/sections/Testimonials";
import FaqAccordion from "@/components/sections/FaqAccordion";
import ExitIntentPopup from "@/components/sections/ExitIntentPopup";
import { faqs } from "@/lib/faqs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "yourwebsitenow.co.uk | Get A Professional Website Built For Free",
  description:
    "We build your professional website for free. Try it for 10 days — if you love it, continue for just £29/month. No upfront cost. No contracts.",
};

export default function HomePage() {
  const homeFaqs = faqs.slice(0, 5);

  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Benefits />
      <CostCalculator />

      {/* Portfolio section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm font-semibold text-gray-700 mb-4 shadow-sm">
              Our work
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Example Websites We&apos;ve Built
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Filter by industry to see what your website could look like.
            </p>
          </div>
          <PortfolioGrid limit={6} showFilter={true} />
          <div className="text-center mt-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 font-semibold px-6 py-3 rounded-full transition-all"
            >
              View All Examples →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 text-sm font-semibold text-amber-700 mb-4">
              ★★★★★ Customer stories
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>
          <Testimonials limit={3} />
          <div className="text-center mt-10">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 font-semibold px-6 py-3 rounded-full transition-all"
            >
              Read All Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Common Questions
            </h2>
            <p className="text-gray-600">
              Everything you need to know before getting started.
            </p>
          </div>
          <FaqAccordion faqs={homeFaqs} />
          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Ready To Get Your Business Online?
          </h2>
          <p className="text-xl text-indigo-200 mb-8">
            Join hundreds of UK small businesses already using yourwebsitenow.co.uk
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 bg-white hover:bg-indigo-50 text-indigo-600 font-bold px-10 py-5 rounded-full text-xl transition-all duration-200 shadow-2xl hover:shadow-3xl hover:-translate-y-1"
          >
            Build My Free Website →
          </Link>
          <p className="text-indigo-300 text-sm mt-4">
            No credit card required · Free 10-day trial · Cancel anytime
          </p>
        </div>
      </section>

      <ExitIntentPopup />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, getIndustryBySlug } from "@/lib/industries";
import { testimonials } from "@/lib/testimonials";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { Faq } from "@/lib/faqs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) notFound();

  const testimonial = testimonials.find((t) => t.id === industry.testimonialId);

  // Convert industry FAQs to Faq type
  const faqItems: Faq[] = industry.faqItems.map((item, i) => ({
    id: `${slug}-${i}`,
    category: "FAQ",
    question: item.question,
    answer: item.answer,
  }));

  return (
    <div className="pt-24">
      {/* Hero */}
      <section
        className="py-16 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${industry.bgColor}, #f8fafc)` }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-md"
            style={{ backgroundColor: industry.bgColor }}
          >
            {industry.icon}
          </div>
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm font-semibold text-gray-700 mb-4 shadow-sm">
            Free website for {industry.name.toLowerCase()}
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            {industry.headline}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {industry.subheadline}
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-8 py-4 rounded-full text-lg transition-all shadow-xl hover:-translate-y-1"
          >
            Get My Free {industry.name} Website →
          </Link>
          <p className="text-gray-500 text-sm mt-3">
            No credit card · Free 10-day trial · Ready in 3–5 days
          </p>
        </div>
      </section>

      {/* Why need section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">
            Why {industry.name} Need a Professional Website
          </h2>
          <div className="space-y-4">
            {industry.whyNeed.map((reason, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-indigo-500 font-black text-lg shrink-0">✓</span>
                <span className="text-gray-700 leading-relaxed">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">
            What Your {industry.name} Website Will Include
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {industry.included.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-indigo-100 shadow-sm">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                  style={{ backgroundColor: industry.bgColor }}
                >
                  {industry.icon}
                </div>
                <span className="text-gray-700 font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">
            Key Features For {industry.name}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {industry.features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-gray-100 shadow-sm p-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ backgroundColor: industry.bgColor }}
                >
                  {industry.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {testimonial && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black text-gray-900 mb-8">
              What a {industry.name.toLowerCase().replace(/s$/, "")} customer says
            </h2>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex justify-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">★</span>
                ))}
              </div>
              <blockquote className="text-gray-700 leading-relaxed italic text-lg mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                  {testimonial.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.business} · {testimonial.location}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">
            Common Questions From {industry.name}
          </h2>
          <FaqAccordion faqs={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to get your {industry.name.toLowerCase()} website?
          </h2>
          <p className="text-indigo-200 mb-8">
            Free to try. No credit card. Live in 3–5 days.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 bg-white hover:bg-indigo-50 text-indigo-600 font-bold px-8 py-4 rounded-full text-lg transition-all shadow-xl hover:-translate-y-1"
          >
            Get My Free Website →
          </Link>
        </div>
      </section>
    </div>
  );
}

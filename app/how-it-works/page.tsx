import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works | WebsitesForFree",
  description:
    "Learn exactly how we build your professional website for free in 5 simple steps — from application to live website in less than a week.",
};

const steps = [
  {
    number: "01",
    emoji: "📝",
    title: "Apply Online (5 minutes)",
    description:
      "Fill in our simple application form. Tell us about your business, what you do, and who your customers are. No technical knowledge required.",
    details: [
      "Your business name and industry",
      "What makes you different from competitors",
      "Who your ideal customers are",
      "Any design preferences or inspiration",
    ],
    color: "bg-indigo-50",
    accent: "text-indigo-600",
    border: "border-indigo-200",
  },
  {
    number: "02",
    emoji: "🎨",
    title: "We Design & Build (3–5 Working Days)",
    description:
      "Our professional design team builds your website from scratch — tailored to your industry, your brand, and your goals. You'll get a homepage, about page, services/products, contact form, and more.",
    details: [
      "Custom design matched to your brand",
      "Mobile-first, responsive layout",
      "All pages written and structured for SEO",
      "Contact form and click-to-call integrated",
    ],
    color: "bg-purple-50",
    accent: "text-purple-600",
    border: "border-purple-200",
  },
  {
    number: "03",
    emoji: "🔍",
    title: "Review & Refine (2 Rounds of Revisions)",
    description:
      "We send you a preview link. You tell us what you'd like changed. We make up to 2 rounds of revisions based on your feedback.",
    details: [
      "Full preview link sent to you before launch",
      "We implement your requested changes",
      "Up to 2 complete revision rounds included",
      "Final approval is yours before going live",
    ],
    color: "bg-amber-50",
    accent: "text-amber-600",
    border: "border-amber-200",
  },
  {
    number: "04",
    emoji: "🚀",
    title: "Your 10-Day Free Trial",
    description:
      "Your website goes live. You try it for 10 days completely free. Show it to your customers. Test it. Use it. No credit card required.",
    details: [
      "Your site goes live on a real domain",
      "Share the link with customers immediately",
      "Track visitor activity and enquiries",
      "Zero cost, zero risk during this period",
    ],
    color: "bg-emerald-50",
    accent: "text-emerald-600",
    border: "border-emerald-200",
  },
  {
    number: "05",
    emoji: "✅",
    title: "Keep It Or Walk Away",
    description:
      "Love it? Continue for just £29/month — which includes hosting, security, updates, and support. Not for you? Cancel with one email. You pay absolutely nothing.",
    details: [
      "No obligation to continue after 10 days",
      "Simply choose a plan that suits your budget",
      "All plans include hosting and security",
      "Cancel anytime with no penalties",
    ],
    color: "bg-sky-50",
    accent: "text-sky-600",
    border: "border-sky-200",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-sm font-semibold text-indigo-700 mb-4">
            Simple, transparent process
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">How It Works</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            From application to live website in 5 simple steps — and the whole thing is free to try.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {steps.map((step, i) => (
              <div key={step.number} className={`rounded-2xl border ${step.border} ${step.color} p-8`}>
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-gray-100">
                      {step.emoji}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-bold ${step.accent} uppercase tracking-wide`}>
                        Step {i + 1}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-3">{step.title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-5">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className={`${step.accent} font-bold`}>✓</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to start your free website?
          </h2>
          <p className="text-indigo-200 mb-8">
            Takes 5 minutes. No commitment. No card required.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 bg-white hover:bg-indigo-50 text-indigo-600 font-bold px-8 py-4 rounded-full text-lg transition-all shadow-xl hover:-translate-y-1"
          >
            Apply Now — It&apos;s Free →
          </Link>
        </div>
      </section>
    </div>
  );
}

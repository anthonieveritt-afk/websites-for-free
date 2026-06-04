import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Pricing | yourwebsitenow.co.uk — From £29/month",
  description:
    "Simple, affordable pricing with a free 10-day trial. Starter from £29/month. No setup fees, no hidden costs, cancel anytime.",
};

const plans = [
  {
    name: "Starter",
    price: "£29",
    description: "Perfect for getting your business online with a professional presence.",
    popular: false,
    color: "border-gray-200",
    features: [
      "Professional website (up to 5 pages)",
      "Mobile optimised",
      "Basic SEO included",
      "Contact form",
      "Hosting & security included",
      "SSL certificate",
      "Email support",
      "Cancel anytime",
    ],
    cta: "Start Free Trial",
    ctaStyle: "border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50",
  },
  {
    name: "Growth",
    price: "£49",
    description: "For businesses ready to grow their online presence and attract more customers.",
    popular: true,
    color: "border-indigo-500",
    features: [
      "Everything in Starter",
      "Up to 10 pages",
      "Advanced SEO setup",
      "Google Analytics integration",
      "Blog included",
      "Social media links",
      "Priority email support",
      "Free domain (1st year)",
      "Cancel anytime",
    ],
    cta: "Start Free Trial",
    ctaStyle: "bg-indigo-500 hover:bg-indigo-600 text-white shadow-xl",
  },
  {
    name: "Pro",
    price: "£79",
    description: "For established businesses that need the complete solution.",
    popular: false,
    color: "border-gray-200",
    features: [
      "Everything in Growth",
      "Unlimited pages",
      "E-commerce ready",
      "Booking system integration",
      "Monthly updates included",
      "Dedicated account manager",
      "Phone support",
      "Free domain (every year)",
      "Cancel anytime",
    ],
    cta: "Start Free Trial",
    ctaStyle: "border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50",
  },
];

const pricingFaqs = [
  {
    question: "What's included in hosting?",
    answer:
      "Your monthly fee covers hosting on fast, secure servers; SSL security certificate; regular backups; software updates; and email support. It's everything you need to keep your website live and secure.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer:
      "Absolutely. You can upgrade your plan at any time and we'll apply the change immediately. You only pay the difference from that point onwards.",
  },
  {
    question: "Do I own my domain?",
    answer:
      "If you bring your own domain, it's always yours. If we register a domain for you (included in Growth and Pro plans), we register it in your name — you own it completely.",
  },
  {
    question: "What if I want to cancel?",
    answer:
      "Simply send us an email. We'll cancel your subscription and your site will remain live until the end of your current billing period. No penalties, no fuss.",
  },
];

export default function PricingPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 text-sm font-semibold text-emerald-700 mb-4">
            💰 Transparent pricing
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Simple, Affordable Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            All plans include a 10-day free trial. No setup fees. No hidden costs. Cancel anytime.
          </p>
          <p className="text-sm text-gray-500">
            Prices shown are per month (billed monthly). No long-term contracts.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border-2 ${plan.color} p-8 relative ${
                  plan.popular ? "shadow-2xl shadow-indigo-100" : "shadow-sm"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge variant="indigo">⭐ MOST POPULAR</Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-black text-gray-900 mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 font-medium">/month</span>
                  </div>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-emerald-500 font-bold mt-0.5 shrink-0">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/apply"
                  className={`block text-center font-bold py-3 px-6 rounded-full transition-all duration-200 ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </Link>

                <p className="text-xs text-gray-400 text-center mt-3">
                  10-day free trial · No card required
                </p>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
            {[
              { icon: "🔒", text: "Secure payments" },
              { icon: "✅", text: "Cancel anytime" },
              { icon: "💬", text: "UK-based support" },
              { icon: "🏆", text: "200+ happy customers" },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                <span>{badge.icon}</span>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
            Pricing Questions
          </h2>
          <div className="space-y-4">
            {pricingFaqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Start Your Free Trial Today
          </h2>
          <p className="text-indigo-200 mb-8">
            No credit card required. Your website could be live in 5 days.
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

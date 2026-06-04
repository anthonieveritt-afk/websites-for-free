import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | YourWebsiteNow",
  description:
    "Learn about YourWebsiteNow — our mission to help UK small businesses get online affordably, without the risk of upfront agency fees.",
};

const values = [
  {
    icon: "💰",
    title: "Remove the cost barrier",
    description:
      "Thousands of UK small businesses have never had a website because of upfront costs. We eliminated that barrier entirely.",
  },
  {
    icon: "🏆",
    title: "Quality without compromise",
    description:
      "Just because it's free to try doesn't mean it's low quality. Every website we build is professional-grade and built to convert.",
  },
  {
    icon: "🤝",
    title: "Fair, transparent pricing",
    description:
      "No hidden fees, no surprises. The price you see is the price you pay. Always.",
  },
  {
    icon: "💬",
    title: "Real human support",
    description:
      "You'll always speak to a real person. We're a small, dedicated team that genuinely cares about your success.",
  },
];

const stats = [
  { value: "200+", label: "Websites built" },
  { value: "★ 4.9", label: "Average rating" },
  { value: "3–5 days", label: "Average delivery" },
  { value: "10 days", label: "Free trial period" },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-sm font-semibold text-indigo-700 mb-4">
            Our story
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-6">
            About YourWebsiteNow
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We started YourWebsiteNow with a simple belief: every UK small business deserves a 
            professional website — regardless of budget. So we built a model that removes the biggest 
            barrier: the upfront cost.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              We&apos;ve spent years working with UK small businesses and noticed the same pattern 
              again and again: business owners knew they needed a website, but the cost of getting 
              one built professionally was simply out of reach.
            </p>
            <p>
              A decent website from a web agency costs anywhere from £1,500 to £5,000 upfront — before 
              you know if it&apos;ll even work for your business. That&apos;s a huge risk for a sole trader or 
              small business owner.
            </p>
            <p>
              So we flipped the model. We build your website first, at our cost. You try it for 10 days 
              with real customers. If you love it, you continue for just £29/month. If not, you owe us 
              nothing.
            </p>
            <p>
              It&apos;s the deal we always wished someone would offer. So we built it ourselves.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to join us?
          </h2>
          <p className="text-indigo-200 mb-8">
            Apply for your free website today. No risk, no obligation.
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

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Application Received! | WebsitesForFree",
  description: "Your website application has been received. We'll be in touch within 24 hours.",
};

const nextSteps = [
  {
    icon: "📋",
    title: "We review your application",
    description: "Our team reads through your details within a few hours of receiving it.",
  },
  {
    icon: "📞",
    title: "We may reach out with questions",
    description: "If we need clarification, we'll contact you by email or phone.",
  },
  {
    icon: "🎨",
    title: "Building begins",
    description: "Your website is designed and built within 3–5 working days.",
  },
];

export default function ThankYouPage() {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-emerald-50 to-indigo-50">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        {/* Success icon */}
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
          🎉
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-4">
          Application Received!
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          We&apos;ll review your application and be in touch within 24 hours.
        </p>
        <p className="text-gray-500 mb-10">
          Check your inbox — we&apos;ll send a confirmation email shortly.
        </p>

        {/* What happens next */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 text-left">
          <h2 className="text-lg font-bold text-gray-900 mb-4">What happens next?</h2>
          <div className="space-y-4">
            {nextSteps.map((step, i) => (
              <div key={step.title} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                  {step.icon}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {i + 1}. {step.title}
                  </div>
                  <div className="text-sm text-gray-500">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share CTA */}
        <div className="bg-green-50 rounded-2xl border border-green-100 p-5 mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            🗣 Know another business that could use a free website?
          </p>
          <a
            href="https://wa.me/?text=I%20just%20applied%20for%20a%20free%20professional%20website%20from%20WebsitesForFree.%20Check%20it%20out%3A%20https%3A%2F%2Fwebsitesforfree.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full text-sm transition-all shadow-md"
          >
            📲 Share on WhatsApp
          </a>
        </div>

        <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-semibold">
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
}

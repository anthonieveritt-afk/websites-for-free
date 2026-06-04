import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | WebsitesForFree",
  description:
    "Get in touch with the WebsitesForFree team. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-black text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600">
            Have a question or want to know more? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-6">Contact Information</h2>

              <div className="space-y-6">
                {[
                  {
                    icon: "📧",
                    label: "Email",
                    value: "hello@websitesforfree.co.uk",
                    href: "mailto:hello@websitesforfree.co.uk",
                  },
                  {
                    icon: "📞",
                    label: "Phone",
                    value: "0800 000 0000",
                    href: "tel:08000000000",
                  },
                  {
                    icon: "🕐",
                    label: "Response time",
                    value: "Within 1 business day",
                    href: null,
                  },
                  {
                    icon: "🇬🇧",
                    label: "Location",
                    value: "England, United Kingdom",
                    href: null,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">{item.label}</div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="font-semibold text-gray-900">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-indigo-50 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-2">Quick answer?</h3>
                <p className="text-sm text-gray-600">
                  Check our{" "}
                  <a href="/faq" className="text-indigo-600 font-semibold hover:underline">
                    FAQ page
                  </a>{" "}
                  — we&apos;ve answered the most common questions there.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-6">Send Us a Message</h2>
              <form action="/api/contact" method="POST" className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all text-sm"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all text-sm"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all text-sm"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all text-sm resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-full transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

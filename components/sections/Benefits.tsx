const benefits = [
  {
    icon: "💰",
    title: "No Upfront Cost",
    description: "We build your website completely free. Pay only if you love the result.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: "🎨",
    title: "Professional Design",
    description: "Clean, modern websites that look premium and build instant trust with customers.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: "📱",
    title: "Mobile Optimised",
    description: "Perfect on every device — smartphone, tablet, and desktop. Always responsive.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: "🔍",
    title: "Google Friendly",
    description: "Built with SEO best practices from day one so customers can find you on Google.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: "⚡",
    title: "Fast Loading",
    description: "Lightning-fast websites that keep visitors engaged and rank higher in search results.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    icon: "✅",
    title: "Cancel Anytime",
    description: "No long-term contracts or lock-in. Cancel with a single email — no questions asked.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: "🔒",
    title: "Secure Hosting",
    description: "SSL certificate, regular backups, and enterprise-grade hosting included in every plan.",
    color: "text-slate-600",
    bg: "bg-slate-50",
  },
  {
    icon: "💬",
    title: "Ongoing Support",
    description: "Real people, fast responses. We're here to help whenever you need us.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export default function Benefits() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm font-semibold text-gray-700 mb-4 shadow-sm">
            Why choose us
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Everything You Need, Nothing You Don&apos;t
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional websites designed for UK small businesses — without the agency price tag.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover"
            >
              <div
                className={`w-12 h-12 ${benefit.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}
              >
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

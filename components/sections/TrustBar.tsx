const items = [
  { emoji: "⭐", text: "★★★★★ 200+ Five-Star Reviews" },
  { emoji: "📱", text: "100% Mobile Friendly" },
  { emoji: "✅", text: "Cancel Anytime" },
  { emoji: "🔍", text: "SEO Ready From Day One" },
  { emoji: "💼", text: "Built For Small Businesses" },
  { emoji: "🔒", text: "Secure Hosting Included" },
  { emoji: "🏆", text: "No Upfront Cost" },
  { emoji: "⚡", text: "Live In 3–5 Days" },
];

export default function TrustBar() {
  return (
    <section className="bg-gray-900 py-5 overflow-hidden">
      <div className="trust-scroll-container">
        <div className="trust-scroll-track">
          {[...items, ...items].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-white text-sm font-semibold shrink-0"
            >
              <span>{item.emoji}</span>
              <span>{item.text}</span>
              <span className="text-gray-600 ml-5">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

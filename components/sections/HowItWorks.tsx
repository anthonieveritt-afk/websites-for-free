import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: "📝",
    title: "Apply Online",
    description:
      "Fill in a short application. Tell us about your business, what you do, and who your customers are. Takes about 5 minutes.",
    color: "bg-indigo-50",
    iconBg: "bg-indigo-500",
  },
  {
    number: "02",
    icon: "🎨",
    title: "We Build Your Website",
    description:
      "Our team designs and builds your site within 3–5 working days — tailored to your industry, brand, and goals.",
    color: "bg-purple-50",
    iconBg: "bg-purple-500",
  },
  {
    number: "03",
    icon: "🚀",
    title: "Try It Free For 10 Days",
    description:
      "Love it? Keep it for just £29/month. Don't? Walk away with nothing to pay. No credit card required to start.",
    color: "bg-emerald-50",
    iconBg: "bg-emerald-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-sm font-semibold text-indigo-700 mb-4">
            Simple process
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From application to live website in less than a week — and completely free to try.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-emerald-200" />

          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              <div className={`rounded-2xl p-8 ${step.color} h-full`}>
                {/* Number */}
                <div className="text-6xl font-black text-gray-200/80 absolute top-4 right-6 select-none">
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 ${step.iconBg} rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md`}
                >
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 w-8 h-8 bg-white rounded-full border border-gray-200 items-center justify-center text-gray-400 z-10 shadow-sm">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Start My Free Website →
          </Link>
        </div>
      </div>
    </section>
  );
}

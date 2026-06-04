import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-sm font-semibold text-indigo-700 mb-6">
              ✨ No upfront cost. No contracts. No risk.
            </div>

            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
              Get A Professional
              <span className="text-indigo-500 block">Website Built</span>
              <span className="block">For Free</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
              We build your website first. If you love it, simply continue with
              affordable monthly hosting. No design fees. No hidden costs. No
              long-term contracts.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                🚀 Start My Free Website
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200"
              >
                See Example Websites →
              </Link>
            </div>

            {/* Social proof stats */}
            <div className="flex flex-wrap gap-6 mt-10">
              <div>
                <div className="text-2xl font-black text-gray-900">200+</div>
                <div className="text-sm text-gray-500">Websites built</div>
              </div>
              <div className="w-px bg-gray-200" />
              <div>
                <div className="text-2xl font-black text-gray-900">★ 4.9</div>
                <div className="text-sm text-gray-500">Average rating</div>
              </div>
              <div className="w-px bg-gray-200" />
              <div>
                <div className="text-2xl font-black text-gray-900">10 days</div>
                <div className="text-sm text-gray-500">Free trial</div>
              </div>
            </div>
          </div>

          {/* Device mockups */}
          <div className="relative flex justify-center items-center h-96 lg:h-[500px]">
            {/* Desktop frame — Forza Karate Club */}
            <div className="absolute w-72 lg:w-80 bg-white rounded-2xl shadow-2xl border-4 border-gray-200 overflow-hidden animate-float top-0 left-0 lg:left-8">
              <div className="bg-gray-100 h-7 flex items-center gap-1.5 px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="h-44 relative overflow-hidden">
                <Image
                  src="/forza.png"
                  alt="Forza Karate Club website"
                  fill
                  className="object-cover object-top"
                  sizes="320px"
                />
              </div>
              <div className="px-3 py-2">
                <div className="text-[10px] font-bold text-gray-700">Forza Karate Club</div>
                <div className="text-[9px] text-gray-400">forzakarate.co.uk</div>
              </div>
            </div>

            {/* Mobile frame — JHKA */}
            <div className="absolute w-28 bg-white rounded-2xl shadow-2xl border-4 border-gray-200 overflow-hidden right-0 lg:right-8 bottom-8" style={{ animationDelay: "1.5s" }}>
              <div className="bg-gray-100 h-5 flex items-center justify-center">
                <div className="w-8 h-1.5 bg-gray-300 rounded-full" />
              </div>
              <div className="h-44 relative overflow-hidden">
                <Image
                  src="/jhka.png"
                  alt="JHKA website"
                  fill
                  className="object-cover object-top"
                  sizes="112px"
                />
              </div>
              <div className="px-2 py-1.5">
                <div className="text-[9px] font-bold text-gray-700">JHKA</div>
                <div className="text-[8px] text-gray-400">jhka.co.uk</div>
              </div>
            </div>

            {/* Tablet frame — JGFA */}
            <div className="absolute w-48 bg-white rounded-2xl shadow-xl border-4 border-gray-200 overflow-hidden left-1/2 -translate-x-1/2 bottom-0" style={{ animationDelay: "0.75s" }}>
              <div className="bg-gray-100 h-6 flex items-center gap-1.5 px-3">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
              </div>
              <div className="h-32 relative overflow-hidden">
                <Image
                  src="/jgfa.png"
                  alt="JGFA website"
                  fill
                  className="object-cover object-top"
                  sizes="192px"
                />
              </div>
              <div className="px-2 py-1.5">
                <div className="text-[9px] font-bold text-gray-700">JGFA Football</div>
                <div className="text-[9px] text-gray-400">jgfa.co.uk</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

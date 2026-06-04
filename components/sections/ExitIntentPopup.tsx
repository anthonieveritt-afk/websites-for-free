"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;

    // Desktop: mouse leaves window
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) {
        setVisible(true);
        setShown(true);
      }
    };

    // Mobile: 30 second timer
    const mobileTimer = setTimeout(() => {
      if (!shown && window.innerWidth < 1024) {
        setVisible(true);
        setShown(true);
      }
    }, 30000);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, [shown]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center relative animate-fade-in-up">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="text-5xl mb-4">🚀</div>
        <h2 className="text-2xl font-black text-gray-900 mb-3">
          Wait! Don&apos;t leave without your free website...
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Get a professional website built for your business — completely free to try. No credit card. No commitment. No risk.
        </p>

        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="text-emerald-500">✓</span>
            Built by professionals in 3–5 days
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="text-emerald-500">✓</span>
            10-day free trial — no card required
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="text-emerald-500">✓</span>
            Just £29/month if you love it
          </div>
        </div>

        <Link
          href="/apply"
          onClick={() => setVisible(false)}
          className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl mb-3"
        >
          Start My Free Website
        </Link>

        <button
          onClick={() => setVisible(false)}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          No thanks, I&apos;ll keep struggling without a website
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const quickReplies = [
  {
    label: "Is it really free?",
    answer:
      "Yes! We build your website completely free. You get a 10-day free trial — no credit card needed. If you love it, continue for just £29/month. If not, you pay nothing.",
  },
  {
    label: "How long does it take?",
    answer:
      "We typically deliver your website within 3–5 working days of receiving your application. We'll then give you 2 rounds of revisions before your 10-day free trial begins.",
  },
  {
    label: "What's included?",
    answer:
      "Everything! Professional design, mobile optimisation, SEO setup, contact form, hosting, SSL security, and ongoing support. All included in your monthly plan.",
  },
  {
    label: "I'm ready to apply!",
    answer: "apply",
  },
];

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [reply, setReply] = useState<string | null>(null);
  const router = useRouter();

  function handleQuickReply(item: (typeof quickReplies)[0]) {
    if (item.answer === "apply") {
      router.push("/apply");
      setOpen(false);
      return;
    }
    setReply(item.answer);
  }

  return (
    <>
      {/* Chat drawer */}
      {open && (
        <div className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-in-up">
          {/* Header */}
          <div className="bg-indigo-500 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                WF
              </div>
              <div>
                <div className="text-white font-semibold text-sm">yourwebsitenow.co.uk</div>
                <div className="text-indigo-200 text-xs flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online now
                </div>
              </div>
            </div>
            <button
              onClick={() => { setOpen(false); setReply(null); }}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="bg-gray-50 rounded-xl p-3 mb-4 text-sm text-gray-700 leading-relaxed">
              👋 Hi! I&apos;m here to answer any questions about yourwebsitenow.co.uk. What would you like to know?
            </div>

            {reply ? (
              <div className="bg-indigo-50 rounded-xl p-3 mb-4 text-sm text-indigo-900 leading-relaxed">
                {reply}
              </div>
            ) : null}

            <div className="flex flex-col gap-2">
              {quickReplies.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleQuickReply(item)}
                  className="text-left px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => { setOpen(!open); setReply(null); }}
        className="fixed bottom-20 right-4 lg:bottom-8 lg:right-8 z-50 w-14 h-14 bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer"
        aria-label="Open chat"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </>
  );
}

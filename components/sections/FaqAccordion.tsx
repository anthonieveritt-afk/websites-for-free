"use client";

import { useState } from "react";
import { Faq } from "@/lib/faqs";

interface FaqAccordionProps {
  faqs: Faq[];
  grouped?: boolean;
}

function FaqItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
        <span
          className={`text-indigo-500 transition-transform duration-200 shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white text-gray-600 leading-relaxed text-sm">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

export default function FaqAccordion({ faqs, grouped = false }: FaqAccordionProps) {
  if (!grouped) {
    return (
      <div className="space-y-3">
        {faqs.map((faq) => (
          <FaqItem key={faq.id} faq={faq} />
        ))}
      </div>
    );
  }

  // Group by category
  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <div className="space-y-10">
      {categories.map((cat) => (
        <div key={cat}>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-indigo-500 rounded-full inline-block" />
            {cat}
          </h3>
          <div className="space-y-3">
            {faqs.filter((f) => f.category === cat).map((faq) => (
              <FaqItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

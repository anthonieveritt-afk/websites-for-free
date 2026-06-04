"use client";

import { useState } from "react";
import Link from "next/link";
import { portfolioItems, industryFilters } from "@/lib/portfolio";
import IndustryFilter from "@/components/ui/IndustryFilter";

interface PortfolioGridProps {
  limit?: number;
  showFilter?: boolean;
}

export default function PortfolioGrid({ limit, showFilter = true }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = portfolioItems.filter(
    (item) => activeFilter === "All" || item.industry === activeFilter
  );

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div>
      {showFilter && (
        <div className="mb-8">
          <IndustryFilter
            filters={industryFilters}
            active={activeFilter}
            onChange={setActiveFilter}
          />
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayed.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-hover"
          >
            {/* Mockup header */}
            <div
              className="h-40 flex flex-col items-center justify-center text-white relative"
              style={{ background: `linear-gradient(135deg, ${item.color}cc, ${item.color}99)` }}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="text-sm font-bold text-white/90">{item.businessName}</div>
              {/* Browser chrome effect */}
              <div className="absolute top-3 left-3 flex gap-1">
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <div className="w-2 h-2 rounded-full bg-white/40" />
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">{item.businessName}</h3>
                <span
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ color: item.color, backgroundColor: item.bgColor }}
                >
                  {item.industry}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/apply"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                This is what we can build for you →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

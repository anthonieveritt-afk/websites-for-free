"use client";

interface IndustryFilterProps {
  filters: string[];
  active: string;
  onChange: (filter: string) => void;
}

export default function IndustryFilter({
  filters,
  active,
  onChange,
}: IndustryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
            active === filter
              ? "bg-indigo-500 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

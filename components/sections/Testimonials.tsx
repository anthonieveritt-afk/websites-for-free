import { testimonials } from "@/lib/testimonials";

interface TestimonialsProps {
  limit?: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-amber-400" : "text-gray-200"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials({ limit = 3 }: TestimonialsProps) {
  const displayed = testimonials.slice(0, limit);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayed.map((t) => (
        <div key={t.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <StarRating rating={t.rating} />
          <blockquote className="mt-4 text-gray-700 leading-relaxed italic text-sm">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <div className="mt-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
              {t.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">{t.name}</div>
              <div className="text-gray-500 text-xs">
                {t.business} · {t.location}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

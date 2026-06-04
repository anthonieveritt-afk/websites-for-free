"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ALL_SERVICES = [
  { key: "design",     label: "Professional Design",   icon: "🎨" },
  { key: "mobile",     label: "Mobile Optimised",       icon: "📱" },
  { key: "seo",        label: "SEO Setup",              icon: "🔍" },
  { key: "contact",    label: "Contact Form",           icon: "✉️" },
  { key: "hosting",    label: "Hosting Configured",     icon: "☁️" },
  { key: "ssl",        label: "SSL Active",             icon: "🔒" },
  { key: "support",    label: "Support Channel Active", icon: "💬" },
];

export default function ServicesChecklist({
  applicationId,
  initial,
}: {
  applicationId: string;
  initial: Record<string, boolean>;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>(initial);
  const [saving, setSaving] = useState<string | null>(null);
  const router = useRouter();

  async function toggle(key: string) {
    const newVal = !checked[key];
    setSaving(key);
    setChecked((prev) => ({ ...prev, [key]: newVal }));

    await fetch(`/api/admin/applications/${applicationId}/services`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: newVal }),
    });

    setSaving(null);
    router.refresh();
  }

  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-400">{done}/{ALL_SERVICES.length} complete</span>
        <div className="h-1.5 flex-1 mx-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${(done / ALL_SERVICES.length) * 100}%` }}
          />
        </div>
      </div>

      {ALL_SERVICES.map((svc) => (
        <button
          key={svc.key}
          onClick={() => toggle(svc.key)}
          disabled={saving === svc.key}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
            checked[svc.key]
              ? "border-emerald-200 bg-emerald-50"
              : "border-gray-100 bg-white hover:border-gray-200"
          }`}
        >
          <span className="text-lg">{svc.icon}</span>
          <span className={`flex-1 text-sm font-semibold ${checked[svc.key] ? "text-emerald-700" : "text-gray-600"}`}>
            {svc.label}
          </span>
          <span className={`text-lg transition-all ${saving === svc.key ? "opacity-40" : ""}`}>
            {checked[svc.key] ? "✅" : "⬜"}
          </span>
        </button>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PLANS = [
  { key: "starter", label: "Starter", price: "£29/mo" },
  { key: "growth",  label: "Growth",  price: "£49/mo" },
  { key: "pro",     label: "Pro",     price: "£79/mo" },
];

export default function PlanSelector({
  applicationId,
  currentPlan,
}: {
  applicationId: string;
  currentPlan: string | null;
}) {
  const [selected, setSelected] = useState(currentPlan ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  async function save(plan: string) {
    setSelected(plan);
    setSaving(true);
    setSaved(false);
    await fetch(`/api/admin/applications/${applicationId}/plan`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    setSaving(false);
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {PLANS.map((p) => (
          <button
            key={p.key}
            onClick={() => save(p.key)}
            disabled={saving}
            className={`flex-1 py-2.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer disabled:opacity-50 ${
              selected === p.key
                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                : "border-gray-200 text-gray-500 hover:border-indigo-200"
            }`}
          >
            <div>{p.label}</div>
            <div className="font-normal text-gray-400">{p.price}</div>
          </button>
        ))}
      </div>
      {saved && <p className="text-xs text-emerald-600 font-semibold">✅ Plan updated</p>}
    </div>
  );
}

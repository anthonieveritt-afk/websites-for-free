"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  applicable_plans: string[];
  expiry_at: string | null;
  max_uses: number | null;
  uses_count: number;
  enabled: boolean;
  created_at: string;
}

const emptyForm = {
  code: "",
  description: "",
  discount_type: "percentage" as const,
  discount_value: "",
  applicable_plans: ["starter", "growth", "pro"],
  expiry_at: "",
  max_uses: "",
};

export default function CouponManager({ coupons }: { coupons: Coupon[] }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const router = useRouter();

  function startEdit(c: Coupon) {
    setEditingId(c.id);
    setEditForm({
      code: c.code,
      description: c.description ?? "",
      discount_type: c.discount_type,
      discount_value: String(c.discount_value),
      applicable_plans: c.applicable_plans ?? ["starter", "growth", "pro"],
      expiry_at: c.expiry_at ? c.expiry_at.split("T")[0] : "",
      max_uses: c.max_uses !== null ? String(c.max_uses) : "",
    });
    setEditError(null);
  }

  async function saveEdit(id: string) {
    if (!editForm.code || !editForm.discount_value) return;
    setEditSaving(true);
    setEditError(null);
    const res = await fetch(`/api/admin/coupons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: editForm.code.toUpperCase(),
        description: editForm.description || null,
        discount_type: editForm.discount_type,
        discount_value: Number(editForm.discount_value),
        applicable_plans: editForm.applicable_plans,
        expiry_at: editForm.expiry_at || null,
        max_uses: editForm.max_uses ? Number(editForm.max_uses) : null,
      }),
    });
    const json = await res.json();
    setEditSaving(false);
    if (!res.ok) { setEditError(json.error ?? "Save failed"); return; }
    setEditingId(null);
    router.refresh();
  }

  function update(key: keyof typeof emptyForm, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function togglePlan(plan: string) {
    setForm((prev) => {
      const plans = prev.applicable_plans.includes(plan)
        ? prev.applicable_plans.filter((p) => p !== plan)
        : [...prev.applicable_plans, plan];
      return { ...prev, applicable_plans: plans };
    });
  }

  async function submit() {
    if (!form.code || !form.discount_value) return;
    setSaving(true);
    setError(null);
    const res = await fetch("/api/admin/coupons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        discount_value: Number(form.discount_value),
        max_uses: form.max_uses ? Number(form.max_uses) : null,
        expiry_at: form.expiry_at || null,
      }),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error ?? "Something went wrong");
      setSaving(false);
      return;
    }
    setForm(emptyForm);
    setShowForm(false);
    setSaving(false);
    router.refresh();
  }

  async function toggleEnabled(id: string, enabled: boolean) {
    setTogglingId(id);
    await fetch(`/api/admin/coupons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: !enabled }),
    });
    setTogglingId(null);
    router.refresh();
  }

  const inputClass = "w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white";

  return (
    <div className="space-y-4">
      {/* Create button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all"
        >
          {showForm ? "Cancel" : "+ New Coupon"}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">New Coupon</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Code *</label>
              <input className={inputClass} placeholder="e.g. FIRSTMONTH" value={form.code}
                onChange={(e) => update("code", e.target.value.toUpperCase())} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
              <input className={inputClass} placeholder="e.g. 1 month free for new clients" value={form.description}
                onChange={(e) => update("description", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Discount type</label>
              <select className={inputClass} value={form.discount_type}
                onChange={(e) => update("discount_type", e.target.value)}>
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed amount (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Value * {form.discount_type === "percentage" ? "(0–100)" : "(£)"}
              </label>
              <input className={inputClass} type="number" placeholder={form.discount_type === "percentage" ? "e.g. 100" : "e.g. 10"}
                value={form.discount_value} onChange={(e) => update("discount_value", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expiry date (optional)</label>
              <input className={inputClass} type="date" value={form.expiry_at}
                onChange={(e) => update("expiry_at", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Max uses (optional)</label>
              <input className={inputClass} type="number" placeholder="Leave blank for unlimited"
                value={form.max_uses} onChange={(e) => update("max_uses", e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Applicable plans</label>
            <div className="flex gap-2">
              {["starter", "growth", "pro"].map((plan) => (
                <button key={plan} type="button" onClick={() => togglePlan(plan)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all capitalize ${
                    form.applicable_plans.includes(plan)
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 text-gray-500"
                  }`}>
                  {plan}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              ⚠️ {error}
            </div>
          )}
          <button onClick={submit} disabled={saving || !form.code || !form.discount_value}
            className="mt-5 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white font-bold text-sm px-6 py-2.5 rounded-full transition-all">
            {saving ? "Saving…" : "Create Coupon"}
          </button>
        </div>
      )}

      {/* Coupons list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {coupons.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="text-4xl mb-3">🎟️</div>
            <div className="font-semibold text-gray-700 mb-1">No coupons yet</div>
            <div className="text-sm text-gray-400">Create your first discount code above.</div>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {coupons.map((c) => (
              <div key={c.id} className="flex items-center gap-4 px-6 py-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono font-bold text-gray-900">{c.code}</span>
                    {!c.enabled && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">Disabled</span>}
                  </div>
                  <div className="text-sm text-gray-500">{c.description ?? "—"}</div>
                </div>

                <div className="text-sm font-bold text-indigo-700 w-20 text-center">
                  {c.discount_type === "percentage" ? `${c.discount_value}%` : `£${(c.discount_value / 100).toFixed(2)}`}
                </div>

                <div className="text-xs text-gray-400 w-24 text-center">
                  {c.uses_count} / {c.max_uses ?? "∞"} uses
                </div>

                <div className="text-xs text-gray-400 w-24 text-center">
                  {c.expiry_at ? new Date(c.expiry_at).toLocaleDateString("en-GB") : "No expiry"}
                </div>

                <button onClick={() => startEdit(c)}
                  className="text-xs font-bold px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all">
                  Edit
                </button>
                <button onClick={() => toggleEnabled(c.id, c.enabled)} disabled={togglingId === c.id}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                    c.enabled
                      ? "bg-red-50 text-red-600 hover:bg-red-100"
                      : "bg-green-50 text-green-600 hover:bg-green-100"
                  }`}>
                  {togglingId === c.id ? "…" : c.enabled ? "Disable" : "Enable"}
                </button>
              </div>

              {/* Inline edit form */}
              {editingId === c.id && (
                <div className="px-6 pb-5 pt-2 border-t border-gray-50 bg-gray-50/50">
                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Code</label>
                      <input className={inputClass} value={editForm.code}
                        onChange={(e) => setEditForm((p) => ({ ...p, code: e.target.value.toUpperCase() }))} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                      <input className={inputClass} value={editForm.description}
                        onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Discount type</label>
                      <select className={inputClass} value={editForm.discount_type}
                        onChange={(e) => setEditForm((p) => ({ ...p, discount_type: e.target.value as "percentage" | "fixed" }))}>
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed (£)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Value</label>
                      <input className={inputClass} type="number" value={editForm.discount_value}
                        onChange={(e) => setEditForm((p) => ({ ...p, discount_value: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Expiry date</label>
                      <input className={inputClass} type="date" value={editForm.expiry_at}
                        onChange={(e) => setEditForm((p) => ({ ...p, expiry_at: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Max uses</label>
                      <input className={inputClass} type="number" placeholder="Unlimited" value={editForm.max_uses}
                        onChange={(e) => setEditForm((p) => ({ ...p, max_uses: e.target.value }))} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Applicable plans</label>
                    <div className="flex gap-2">
                      {["starter", "growth", "pro"].map((plan) => (
                        <button key={plan} type="button"
                          onClick={() => setEditForm((p) => ({ ...p, applicable_plans: p.applicable_plans.includes(plan) ? p.applicable_plans.filter((x) => x !== plan) : [...p.applicable_plans, plan] }))}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all capitalize ${
                            editForm.applicable_plans.includes(plan) ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-gray-200 text-gray-500"
                          }`}>
                          {plan}
                        </button>
                      ))}
                    </div>
                  </div>
                  {editError && <p className="text-xs text-red-600 mb-2">⚠️ {editError}</p>}
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(c.id)} disabled={editSaving}
                      className="bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white font-bold text-xs px-4 py-2 rounded-full transition-all">
                      {editSaving ? "Saving…" : "Save changes"}
                    </button>
                    <button onClick={() => setEditingId(null)}
                      className="border border-gray-200 text-gray-500 font-bold text-xs px-4 py-2 rounded-full hover:bg-gray-50 transition-all">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

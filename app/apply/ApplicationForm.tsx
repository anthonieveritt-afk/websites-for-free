"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepIndicator from "@/components/ui/StepIndicator";

const STEPS = ["Your Business", "Your Goals", "Features", "Photos", "Contact", "Confirm"];

const industries = [
  "Tradesman / General",
  "Electrician",
  "Plumber",
  "Builder / Contractor",
  "Karate Club / Martial Arts",
  "Restaurant / Café",
  "Gym / Fitness Studio",
  "Beauty Salon / Hair",
  "Consultant / Coach",
  "Personal Trainer",
  "Photographer",
  "Accountant",
  "Other",
];

const goalOptions = [
  "Get more enquiries",
  "Show my work / portfolio",
  "Sell products online",
  "Take bookings online",
  "Build credibility / trust",
  "Other",
];

const featureOptions = [
  "Contact form",
  "Photo gallery",
  "Online booking",
  "Blog",
  "Testimonials",
  "Price list",
  "Map / location",
  "Social media links",
  "Google reviews",
  "E-commerce / shop",
];

const howFoundOptions = [
  "Google search",
  "Social media",
  "Word of mouth / referral",
  "Saw an advert",
  "Other",
];

interface FormData {
  // Step 1
  businessName: string;
  industry: string;
  hasWebsite: string;
  currentUrl: string;
  // Step 2
  goals: string[];
  idealCustomers: string;
  competitorUrls: string;
  // Step 3
  features: string[];
  pageCount: string;
  // Step 4 — Photos
  logoUrl: string;
  heroUrl: string;
  galleryUrls: string[];
  // Step 5
  fullName: string;
  email: string;
  phone: string;
  bestTime: string;
  // Step 6
  budget: string;
  timeline: string;
  howFound: string;
  couponCode: string;
}

const initialData: FormData = {
  businessName: "",
  industry: "",
  hasWebsite: "",
  currentUrl: "",
  goals: [],
  idealCustomers: "",
  competitorUrls: "",
  features: [],
  pageCount: "",
  logoUrl: "",
  heroUrl: "",
  galleryUrls: [],
  fullName: "",
  email: "",
  phone: "",
  bestTime: "",
  budget: "",
  timeline: "",
  howFound: "",
  couponCode: "",
};

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [couponState, setCouponState] = useState<{ valid: boolean; message: string; discountedPrice?: number; saving?: number } | null>(null);
  const [checkingCoupon, setCheckingCoupon] = useState(false);
  const router = useRouter();

  function update(key: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleArray(key: "goals" | "features", value: string) {
    setForm((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  }

  async function uploadFile(file: File, field: "logoUrl" | "heroUrl" | "gallery"): Promise<string | null> {
    setUploading(field);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", form.businessName ? form.businessName.toLowerCase().replace(/[^a-z0-9]/g, "-") : "uploads");
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      setUploading(null);
      if (!res.ok || !json.url) {
        setUploadError(json.error ?? "Upload failed — please try again.");
        return null;
      }
      setUploadError(null);
      return json.url;
    } catch {
      setUploading(null);
      setUploadError("Upload failed — check your connection and try again.");
      return null;
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, field: "logoUrl" | "heroUrl" | "gallery") {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file, field);
    if (!url) return;
    if (field === "gallery") {
      setForm((prev) => ({ ...prev, galleryUrls: [...prev.galleryUrls, url] }));
    } else {
      setForm((prev) => ({ ...prev, [field]: url }));
    }
    e.target.value = "";
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {}
    router.push("/thank-you");
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all text-sm bg-white";

  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
      {/* Step indicator */}
      <div className="mb-8">
        <StepIndicator steps={STEPS} currentStep={step} />
      </div>

      {/* Step 1: About Your Business */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-1">About Your Business</h2>
            <p className="text-gray-500 text-sm">Tell us the basics so we can get started.</p>
          </div>

          <div>
            <label className={labelClass}>Business name *</label>
            <input
              type="text"
              className={inputClass}
              placeholder="e.g. Collins Electrical"
              value={form.businessName}
              onChange={(e) => update("businessName", e.target.value)}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Industry *</label>
            <select
              className={inputClass}
              value={form.industry}
              onChange={(e) => update("industry", e.target.value)}
            >
              <option value="">Select your industry...</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Do you currently have a website?</label>
            <div className="flex gap-3">
              {["Yes", "No"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => update("hasWebsite", opt)}
                  className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all cursor-pointer ${
                    form.hasWebsite === opt
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 text-gray-600 hover:border-indigo-200"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {form.hasWebsite === "Yes" && (
            <div>
              <label className={labelClass}>Current website URL</label>
              <input
                type="url"
                className={inputClass}
                placeholder="https://www.example.com"
                value={form.currentUrl}
                onChange={(e) => update("currentUrl", e.target.value)}
              />
            </div>
          )}

          <button
            onClick={() => form.businessName && form.industry && setStep(2)}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-full transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
            disabled={!form.businessName || !form.industry}
          >
            Continue →
          </button>
        </div>
      )}

      {/* Step 2: Your Goals */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-1">Your Goals</h2>
            <p className="text-gray-500 text-sm">Help us understand what you want to achieve.</p>
          </div>

          <div>
            <label className={labelClass}>What do you want your website to do? (select all that apply)</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {goalOptions.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleArray("goals", goal)}
                  className={`py-2.5 px-3 rounded-xl border-2 font-medium text-xs text-left transition-all cursor-pointer ${
                    form.goals.includes(goal)
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 text-gray-600 hover:border-indigo-200"
                  }`}
                >
                  {form.goals.includes(goal) ? "✓ " : ""}
                  {goal}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Who are your ideal customers?</label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={3}
              placeholder="e.g. Homeowners in Essex looking for a reliable local electrician..."
              value={form.idealCustomers}
              onChange={(e) => update("idealCustomers", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Any competitor websites you like? (optional)</label>
            <input
              type="text"
              className={inputClass}
              placeholder="e.g. https://www.example.com"
              value={form.competitorUrls}
              onChange={(e) => update("competitorUrls", e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3.5 rounded-full transition-all hover:border-gray-300 cursor-pointer"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-full transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Features */}
      {step === 3 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-1">Features You Need</h2>
            <p className="text-gray-500 text-sm">Select everything you&apos;d like on your website.</p>
          </div>

          <div>
            <label className={labelClass}>Which features would you like? (select all that apply)</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {featureOptions.map((feature) => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => toggleArray("features", feature)}
                  className={`py-2.5 px-3 rounded-xl border-2 font-medium text-xs text-left transition-all cursor-pointer ${
                    form.features.includes(feature)
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 text-gray-600 hover:border-indigo-200"
                  }`}
                >
                  {form.features.includes(feature) ? "✓ " : ""}
                  {feature}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>How many pages do you need?</label>
            <select
              className={inputClass}
              value={form.pageCount}
              onChange={(e) => update("pageCount", e.target.value)}
            >
              <option value="">Select...</option>
              <option value="1-5">1–5 pages</option>
              <option value="6-10">6–10 pages</option>
              <option value="10+">10+ pages</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3.5 rounded-full transition-all hover:border-gray-300 cursor-pointer"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-full transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Photos & Branding */}
      {step === 4 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-1">Photos &amp; Branding</h2>
            <p className="text-gray-500 text-sm">Upload your logo and photos — we&apos;ll use these to build your website. All optional but recommended.</p>
          </div>

          {uploadError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              ⚠️ {uploadError}
            </div>
          )}

          {/* Logo */}
          <div>
            <label className={labelClass}>Your logo (PNG or SVG preferred)</label>
            {form.logoUrl ? (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <img src={form.logoUrl} alt="Logo" className="h-12 w-12 object-contain rounded" />
                <div className="flex-1">
                  <p className="text-xs text-emerald-600 font-semibold">✅ Logo uploaded</p>
                </div>
                <button type="button" onClick={() => update("logoUrl", "")} className="text-xs text-red-400 hover:text-red-600">✕ Remove</button>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-all text-sm text-gray-500">
                {uploading === "logoUrl" ? "🔄 Uploading..." : "📷 Click to upload logo"}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, "logoUrl")} disabled={uploading !== null} />
              </label>
            )}
          </div>

          {/* Hero photo */}
          <div>
            <label className={labelClass}>Main / hero photo (shown at the top of your site)</label>
            {form.heroUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <img src={form.heroUrl} alt="Hero" className="w-full h-36 object-cover" />
                <button type="button" onClick={() => update("heroUrl", "")} className="absolute top-2 right-2 bg-white/90 text-red-500 text-xs font-bold px-2 py-1 rounded-lg hover:bg-white">✕ Remove</button>
                <p className="text-xs text-emerald-600 font-semibold p-2">✅ Hero photo uploaded</p>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-2 w-full py-8 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-all text-sm text-gray-500">
                {uploading === "heroUrl" ? "🔄 Uploading..." : "🌄 Click to upload main photo"}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, "heroUrl")} disabled={uploading !== null} />
              </label>
            )}
          </div>

          {/* Gallery */}
          <div>
            <label className={labelClass}>Gallery photos (up to 6 — optional)</label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {form.galleryUrls.map((url, i) => (
                <div key={url} className="relative rounded-xl overflow-hidden border border-gray-200">
                  <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-20 object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, galleryUrls: prev.galleryUrls.filter((_, j) => j !== i) }))}
                    className="absolute top-1 right-1 bg-white/90 text-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded"
                  >✕</button>
                </div>
              ))}
              {form.galleryUrls.length < 6 && (
                <label className="flex items-center justify-center h-20 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-all text-2xl text-gray-300">
                  {uploading === "gallery" ? "🔄" : "+"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, "gallery")} disabled={uploading !== null || form.galleryUrls.length >= 6} />
                </label>
              )}
            </div>
            <p className="text-xs text-gray-400">{form.galleryUrls.length}/6 photos uploaded</p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(3)} className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3.5 rounded-full transition-all hover:border-gray-300 cursor-pointer">← Back</button>
            <button onClick={() => setStep(5)} className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-full transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer">Continue →</button>
          </div>
        </div>
      )}

      {/* Step 5: Contact Details */}
      {step === 5 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-1">Your Contact Details</h2>
            <p className="text-gray-500 text-sm">So we can get in touch about your website.</p>
          </div>

          <div>
            <label className={labelClass}>Full name *</label>
            <input
              type="text"
              className={inputClass}
              placeholder="John Smith"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Email address *</label>
            <input
              type="email"
              className={inputClass}
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Phone number *</label>
            <input
              type="tel"
              className={inputClass}
              placeholder="07700 000000"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Best time to contact you</label>
            <div className="flex gap-2">
              {["Morning", "Afternoon", "Evening"].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => update("bestTime", time)}
                  className={`flex-1 py-2.5 rounded-xl border-2 font-semibold text-xs transition-all cursor-pointer ${
                    form.bestTime === time
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 text-gray-600 hover:border-indigo-200"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(4)}
              className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3.5 rounded-full transition-all hover:border-gray-300 cursor-pointer"
            >
              ← Back
            </button>
            <button
              onClick={() => form.fullName && form.email && form.phone && setStep(6)}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-full transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
              disabled={!form.fullName || !form.email || !form.phone}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Confirm */}
      {step === 6 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-1">Confirm & Submit</h2>
            <p className="text-gray-500 text-sm">Almost there! Just a couple of final questions.</p>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="font-bold text-gray-900 mb-3">Your Application Summary</div>
            <div className="flex justify-between">
              <span className="text-gray-500">Business</span>
              <span className="font-semibold text-gray-900">{form.businessName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Industry</span>
              <span className="font-semibold text-gray-900">{form.industry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Contact</span>
              <span className="font-semibold text-gray-900">{form.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-semibold text-gray-900 text-xs">{form.email}</span>
            </div>
            {form.features.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Features</span>
                <span className="font-semibold text-gray-900 text-right max-w-[60%]">
                  {form.features.slice(0, 3).join(", ")}
                  {form.features.length > 3 ? ` +${form.features.length - 3} more` : ""}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className={labelClass}>Budget preference</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Starter", value: "£29/month" },
                { label: "Growth", value: "£49/month" },
                { label: "Pro", value: "£79/month" },
                { label: "Not sure yet", value: "Not sure" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => update("budget", opt.value)}
                  className={`py-2.5 px-3 rounded-xl border-2 text-xs font-semibold text-left transition-all cursor-pointer ${
                    form.budget === opt.value
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 text-gray-600 hover:border-indigo-200"
                  }`}
                >
                  <div>{opt.label}</div>
                  <div className="text-gray-400 font-normal">{opt.value}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Timeline</label>
            <div className="flex gap-2">
              {["ASAP", "Within 1 month", "No rush"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => update("timeline", t)}
                  className={`flex-1 py-2.5 rounded-xl border-2 font-semibold text-xs transition-all cursor-pointer ${
                    form.timeline === t
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 text-gray-600 hover:border-indigo-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>How did you hear about us?</label>
            <select
              className={inputClass}
              value={form.howFound}
              onChange={(e) => update("howFound", e.target.value)}
            >
              <option value="">Select...</option>
              {howFoundOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Coupon code */}
          <div>
            <label className={labelClass}>Discount code (optional)</label>
            <div className="flex gap-2">
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. FIRSTMONTH"
                value={form.couponCode}
                onChange={(e) => { update("couponCode", e.target.value.toUpperCase()); setCouponState(null); }}
              />
              <button
                type="button"
                onClick={async () => {
                  if (!form.couponCode) return;
                  setCheckingCoupon(true);
                  const planMap: Record<string, string> = { "£29/month": "starter", "£49/month": "growth", "£79/month": "pro" };
                  const plan = planMap[form.budget] ?? null;
                  const res = await fetch("/api/coupons/validate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code: form.couponCode, plan }),
                  });
                  const json = await res.json();
                  setCheckingCoupon(false);
                  if (json.valid) {
                    setCouponState({ valid: true, message: json.coupon.description ?? "Discount applied!", discountedPrice: json.discountedPrice, saving: json.savingAmount });
                  } else {
                    setCouponState({ valid: false, message: json.error ?? "Invalid code" });
                  }
                }}
                disabled={checkingCoupon || !form.couponCode}
                className="px-4 py-3 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all whitespace-nowrap cursor-pointer"
              >
                {checkingCoupon ? "..." : "Apply"}
              </button>
            </div>
            {couponState && (
              <div className={`mt-2 px-3 py-2 rounded-xl text-sm font-medium ${
                couponState.valid ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"
              }`}>
                {couponState.valid ? "✅" : "⚠️"} {couponState.message}
                {couponState.valid && couponState.discountedPrice !== undefined && (
                  <span className="ml-2">— saves £{couponState.saving?.toFixed(2)}/mo</span>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(5)}
              className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3.5 rounded-full transition-all hover:border-gray-300 cursor-pointer"
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-full transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Application 🚀"}
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center">
            By submitting, you agree to our{" "}
            <a href="/terms" className="underline">Terms</a> and{" "}
            <a href="/privacy" className="underline">Privacy Policy</a>.
          </p>
        </div>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import ApplicationForm from "./ApplicationForm";

export const metadata: Metadata = {
  title: "Apply For Your Free Website | WebsitesForFree",
  description:
    "Start your free website application. Takes just 5 minutes. No credit card required. Your professional website could be live in 3–5 days.",
};

export default function ApplyPage() {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 text-sm font-semibold text-emerald-700 mb-4">
            ✅ Free · No card required · Ready in 3–5 days
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Start Your Free Website
          </h1>
          <p className="text-gray-600">
            Fill in your details below and we&apos;ll build your professional website — completely free to try.
          </p>
        </div>

        <ApplicationForm />
      </div>
    </div>
  );
}

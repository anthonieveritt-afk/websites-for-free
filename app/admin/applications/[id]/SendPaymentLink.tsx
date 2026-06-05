"use client";

import { useState } from "react";

export default function SendPaymentLink({
  applicationId,
  email,
  plan,
  hasBasicShop,
}: {
  applicationId: string;
  email: string;
  plan: string | null;
  hasBasicShop: boolean;
}) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendLink() {
    if (!plan) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/applications/${applicationId}/send-payment-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, email, hasBasicShop }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Failed to send payment link");
      } else {
        setSent(true);
      }
    } catch {
      setError("Network error — please try again");
    }
    setSending(false);
  }

  if (!plan) {
    return (
      <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
        ⚠️ No plan selected — update the application first.
      </p>
    );
  }

  if (sent) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 font-semibold">
        ✅ Payment link sent to {email}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">
        Sends the client a Stripe checkout link via email. Their 10-day free trial starts on payment.
      </p>
      <button
        onClick={sendLink}
        disabled={sending}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-3 rounded-full transition-all text-sm"
      >
        {sending ? "Sending…" : "💳 Send Payment Link to Client"}
      </button>
      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}

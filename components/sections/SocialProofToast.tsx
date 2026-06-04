"use client";

import { useState, useEffect } from "react";

const toastMessages = [
  "🔔 New application received from a plumber in Kent",
  "🚀 Website just launched for a karate club in Essex",
  "⭐ Sarah from London just gave us 5 stars",
  "✅ Mike's electrician website went live 2 hours ago",
  "📩 New enquiry received from a restaurant owner in Birmingham",
  "🎉 James just started his free 10-day trial",
  "🔔 New application from a personal trainer in Manchester",
  "🌟 Beauty salon website launched in Leeds today",
];

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState<number[]>([]);

  useEffect(() => {
    // Start after 5 seconds
    const startTimer = setTimeout(() => {
      setVisible(true);
    }, 5000);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    // Auto-dismiss after 4 seconds
    const dismissTimer = setTimeout(() => {
      setVisible(false);

      // Show next after 8 seconds
      const nextTimer = setTimeout(() => {
        const nextIndex = (currentIndex + 1) % toastMessages.length;
        setCurrentIndex(nextIndex);
        setVisible(true);
      }, 8000);

      return () => clearTimeout(nextTimer);
    }, 4000);

    return () => clearTimeout(dismissTimer);
  }, [visible, currentIndex]);

  if (!visible || dismissed.includes(currentIndex)) return null;

  return (
    <div className="fixed bottom-24 left-4 z-40 lg:bottom-8 animate-slide-in-up max-w-xs">
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 flex items-start gap-3">
        <div className="text-xl shrink-0">{toastMessages[currentIndex].split(" ")[0]}</div>
        <p className="text-sm text-gray-700 leading-snug flex-1">
          {toastMessages[currentIndex].split(" ").slice(1).join(" ")}
        </p>
        <button
          onClick={() => {
            setDismissed((d) => [...d, currentIndex]);
            setVisible(false);
          }}
          className="text-gray-400 hover:text-gray-600 text-xs shrink-0 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

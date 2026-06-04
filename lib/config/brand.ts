// ─────────────────────────────────────────────────────────────────────────────
// Brand config — change these constants to white-label the platform
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND = {
  name: "yourwebsitenow.co.uk",
  tagline: "Get A Professional Website Built For Free",
  domain: "yourwebsitenow.co.uk",
  email: "hello@yourwebsitenow.co.uk",
  trialSubdomainSuffix: ".yourwebsitenow.co.uk",
  trialDays: 10,
  gracePeriodDays: 2,
  paymentFailureGraceDays: 5,
  social: {
    twitter: "https://twitter.com/yourwebsitenow",
    instagram: "https://instagram.com/yourwebsitenow",
  },
} as const;

export const PLANS = {
  starter: { name: "Starter", price: 29, maxPages: 5, stripePriceId: "" },
  growth:  { name: "Growth",  price: 49, maxPages: 10, stripePriceId: "" },
  pro:     { name: "Pro",     price: 79, maxPages: Infinity, stripePriceId: "" },
} as const;

export const ADDONS = {
  basicShop: { name: "Basic Shop", price: 10, stripeAddonPriceId: "" },
} as const;

export type PlanKey = keyof typeof PLANS;

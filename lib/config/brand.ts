// ─────────────────────────────────────────────────────────────────────────────
// Brand config — change these constants to white-label the platform
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND = {
  name: "WebsitesForFree",
  tagline: "Get A Professional Website Built For Free",
  domain: "websitesforfree.co.uk",
  email: "hello@websitesforfree.co.uk",
  trialSubdomainSuffix: ".websitesforfree.co.uk",
  trialDays: 10,
  gracePeriodDays: 2,
  paymentFailureGraceDays: 5,
  social: {
    twitter: "https://twitter.com/websitesforfree",
    instagram: "https://instagram.com/websitesforfree",
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

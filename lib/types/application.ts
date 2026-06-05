export type ApplicationStatus =
  | "new_lead"
  | "accepted"
  | "in_design"
  | "in_build"
  | "waiting_for_client"
  | "preview_sent"
  | "trial_live"
  | "active_subscriber"
  | "trial_expired"
  | "payment_failed"
  | "cancelled";

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  new_lead: "New Lead",
  accepted: "Accepted",
  in_design: "In Design",
  in_build: "In Build",
  waiting_for_client: "Waiting for Client",
  preview_sent: "Preview Sent",
  trial_live: "Trial Live",
  active_subscriber: "Active",
  trial_expired: "Trial Expired",
  payment_failed: "Payment Failed",
  cancelled: "Cancelled",
};

export const STATUS_COLOURS: Record<ApplicationStatus, { bg: string; text: string }> = {
  new_lead:          { bg: "bg-blue-100",   text: "text-blue-700" },
  accepted:          { bg: "bg-indigo-100", text: "text-indigo-700" },
  in_design:         { bg: "bg-purple-100", text: "text-purple-700" },
  in_build:          { bg: "bg-orange-100", text: "text-orange-700" },
  waiting_for_client:{ bg: "bg-yellow-100", text: "text-yellow-700" },
  preview_sent:      { bg: "bg-cyan-100",   text: "text-cyan-700" },
  trial_live:        { bg: "bg-emerald-100",text: "text-emerald-700" },
  active_subscriber: { bg: "bg-green-100",  text: "text-green-700" },
  trial_expired:     { bg: "bg-red-100",    text: "text-red-700" },
  payment_failed:    { bg: "bg-red-100",    text: "text-red-800" },
  cancelled:         { bg: "bg-gray-100",   text: "text-gray-500" },
};

export interface Application {
  id: string;
  business_name: string;
  industry: string | null;
  contact_name: string;
  email: string;
  phone: string | null;
  package: "starter" | "growth" | "pro" | null;
  wants_basic_shop: boolean;
  status: ApplicationStatus;
  goals: string[];
  features_wanted: string[];
  page_count: string | null;
  brand_colours: string | null;
  how_found: string | null;
  special_notes: string | null;
  coupon_code: string | null;
  location: string | null;
  domain_status: string | null;
  existing_domain: string | null;
  current_website: string | null;
  ideal_customers: string | null;
  competitor_urls: string | null;
  logo_url: string | null;
  hero_url: string | null;
  gallery_urls: string[];
  assigned_to: string | null;
  trial_start_at: string | null;
  trial_end_at: string | null;
  preview_approved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  application_id: string;
  author_id: string | null;
  body: string;
  created_at: string;
}

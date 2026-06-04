-- ─────────────────────────────────────────────────────────────────────────────
-- WebsitesForFree — Supabase Schema
-- Run this in your Supabase SQL editor to set up the database
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────────────────────────────────────
-- ENUMS
-- ─────────────────────────────────────────────────────────────────────────────

create type application_status as enum (
  'new_lead',
  'accepted',
  'in_design',
  'in_build',
  'waiting_for_client',
  'preview_sent',
  'trial_live',
  'active_subscriber',
  'trial_expired',
  'payment_failed',
  'cancelled'
);

create type plan_key as enum ('starter', 'growth', 'pro');
create type user_role as enum ('admin', 'team_member', 'client');
create type domain_status as enum ('subdomain', 'dns_pending', 'connected');
create type deployment_status as enum ('pending', 'building', 'live', 'failed');
create type change_status as enum ('pending', 'approved', 'rejected');
create type coupon_discount_type as enum ('percentage', 'fixed');
create type ticket_status as enum ('open', 'in_progress', 'resolved', 'closed');

-- ─────────────────────────────────────────────────────────────────────────────
-- PACKAGES
-- ─────────────────────────────────────────────────────────────────────────────

create table packages (
  id uuid primary key default uuid_generate_v4(),
  key plan_key unique not null,
  name text not null,
  price_monthly integer not null, -- in pence
  max_pages integer, -- null = unlimited
  features jsonb default '[]',
  stripe_price_id text,
  created_at timestamptz default now()
);

insert into packages (key, name, price_monthly, max_pages, features) values
  ('starter', 'Starter', 2900, 5,  '["5 pages","Mobile optimised","Basic SEO","Contact form","SSL","Email support","Cancel anytime"]'),
  ('growth',  'Growth',  4900, 10, '["10 pages","Advanced SEO","Google Analytics","Blog","Free domain first year","Priority support","Cancel anytime"]'),
  ('pro',     'Pro',     7900, null, '["Unlimited pages","E-commerce","Booking system","Monthly updates","Account manager","Phone support","Free domain every year","Cancel anytime"]');

-- ─────────────────────────────────────────────────────────────────────────────
-- APPLICATIONS
-- ─────────────────────────────────────────────────────────────────────────────

create table applications (
  id uuid primary key default uuid_generate_v4(),

  -- Business info
  business_name text not null,
  industry text,
  location text,
  current_website text,

  -- Contact
  contact_name text not null,
  email text not null,
  phone text,
  best_time text,

  -- Goals & requirements
  goals jsonb default '[]',
  ideal_customers text,
  competitor_urls text,
  features_wanted jsonb default '[]',
  page_count text,
  special_notes text,

  -- Package
  package plan_key,
  wants_basic_shop boolean default false,
  coupon_code text,

  -- Domain
  domain_status text default 'not_sure', -- 'own_one' | 'need_one' | 'not_sure'
  existing_domain text,

  -- Branding
  brand_colours text,
  logo_url text,

  -- Social
  social_links jsonb default '{}',

  -- Misc
  how_found text,
  timeline text,

  -- Status
  status application_status default 'new_lead',
  assigned_to uuid, -- references users.id
  trial_start_at timestamptz,
  trial_end_at timestamptz,
  preview_approved_at timestamptz,

  -- Meta
  ip_address text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- USERS (platform users — admins, team members, clients)
-- ─────────────────────────────────────────────────────────────────────────────

create table platform_users (
  id uuid primary key default uuid_generate_v4(),
  clerk_id text unique not null,
  email text not null,
  full_name text,
  role user_role default 'client',
  application_id uuid references applications(id),
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- WEBSITES
-- ─────────────────────────────────────────────────────────────────────────────

create table websites (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid references applications(id) on delete cascade,
  plan plan_key,
  subdomain text unique, -- e.g. "collins-electrical"
  custom_domain text,
  domain_status domain_status default 'subdomain',
  live_url text,
  vercel_project_id text,
  vercel_deployment_id text,
  status deployment_status default 'pending',
  preview_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- PAGES
-- ─────────────────────────────────────────────────────────────────────────────

create table pages (
  id uuid primary key default uuid_generate_v4(),
  website_id uuid references websites(id) on delete cascade,
  slug text not null,
  title text not null,
  order_index integer default 0,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- PAGE SECTIONS
-- ─────────────────────────────────────────────────────────────────────────────

create table page_sections (
  id uuid primary key default uuid_generate_v4(),
  page_id uuid references pages(id) on delete cascade,
  section_type text not null, -- 'hero' | 'text' | 'gallery' | 'cta' | 'faq' etc.
  order_index integer default 0,
  content jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- MEDIA UPLOADS
-- ─────────────────────────────────────────────────────────────────────────────

create table media_uploads (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid references applications(id) on delete cascade,
  website_id uuid references websites(id),
  file_name text not null,
  file_url text not null,
  file_type text,
  file_size integer,
  uploaded_by uuid references platform_users(id),
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- DEPLOYMENTS
-- ─────────────────────────────────────────────────────────────────────────────

create table deployments (
  id uuid primary key default uuid_generate_v4(),
  website_id uuid references websites(id) on delete cascade,
  triggered_by uuid references platform_users(id),
  status deployment_status default 'pending',
  vercel_deployment_id text,
  deploy_url text,
  logs text,
  created_at timestamptz default now(),
  completed_at timestamptz
);

-- ─────────────────────────────────────────────────────────────────────────────
-- SUBSCRIPTIONS
-- ─────────────────────────────────────────────────────────────────────────────

create table subscriptions (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid references applications(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  plan plan_key,
  has_basic_shop boolean default false,
  status text default 'trialing', -- 'trialing' | 'active' | 'past_due' | 'cancelled'
  trial_end timestamptz,
  current_period_end timestamptz,
  coupon_applied text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- COUPONS
-- ─────────────────────────────────────────────────────────────────────────────

create table coupons (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null,
  description text,
  discount_type coupon_discount_type not null,
  discount_value integer not null, -- percentage (0-100) or pence
  applicable_plans jsonb default '["starter","growth","pro"]',
  expiry_at timestamptz,
  max_uses integer, -- null = unlimited
  uses_count integer default 0,
  stripe_coupon_id text,
  created_by uuid references platform_users(id),
  enabled boolean default true,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- INTERNAL NOTES
-- ─────────────────────────────────────────────────────────────────────────────

create table notes (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid references applications(id) on delete cascade,
  author_id uuid references platform_users(id),
  body text not null,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- PENDING CHANGES (client-submitted content edits)
-- ─────────────────────────────────────────────────────────────────────────────

create table pending_changes (
  id uuid primary key default uuid_generate_v4(),
  website_id uuid references websites(id) on delete cascade,
  page_section_id uuid references page_sections(id),
  submitted_by uuid references platform_users(id),
  change_type text, -- 'text' | 'image' | 'page_add' etc.
  before_content jsonb,
  after_content jsonb,
  status change_status default 'pending',
  reviewed_by uuid references platform_users(id),
  reviewed_at timestamptz,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- SUPPORT TICKETS
-- ─────────────────────────────────────────────────────────────────────────────

create table support_tickets (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid references applications(id) on delete cascade,
  submitted_by uuid references platform_users(id),
  subject text not null,
  body text not null,
  status ticket_status default 'open',
  assigned_to uuid references platform_users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- EMAIL LOG
-- ─────────────────────────────────────────────────────────────────────────────

create table email_log (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid references applications(id),
  to_email text not null,
  subject text not null,
  template text,
  status text default 'sent',
  provider_id text,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- ACTIVITY LOG
-- ─────────────────────────────────────────────────────────────────────────────

create table activity_logs (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid references applications(id),
  actor_id uuid references platform_users(id),
  action text not null, -- e.g. 'status_changed', 'note_added', 'deployed'
  meta jsonb default '{}',
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────────────────────────────────────

create index idx_applications_status on applications(status);
create index idx_applications_created_at on applications(created_at desc);
create index idx_applications_email on applications(email);
create index idx_platform_users_clerk_id on platform_users(clerk_id);
create index idx_notes_application_id on notes(application_id);
create index idx_activity_logs_application_id on activity_logs(application_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- updated_at trigger
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_applications_updated_at before update on applications
  for each row execute function update_updated_at();
create trigger trg_websites_updated_at before update on websites
  for each row execute function update_updated_at();
create trigger trg_subscriptions_updated_at before update on subscriptions
  for each row execute function update_updated_at();
create trigger trg_support_tickets_updated_at before update on support_tickets
  for each row execute function update_updated_at();

-- Quick setup: Create macro_targets table and dependencies
-- Run this in Supabase SQL Editor

-- Step 1: Create users table if it doesn't exist
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email varchar(255) unique not null,
  name varchar(255),
  created_at timestamp with time zone default now(),
  date_of_birth date,
  sex varchar(10) not null default 'male',
  height_cm numeric(5,2),
  goal varchar(50),
  sport varchar(50),
  training_frequency int,
  body_fat_percent numeric(5,2),
  lean_body_mass_kg numeric(6,2),
  user_category varchar(20),
  metabolic_flexibility_score numeric(3,2),
  wearable_type varchar(50),
  wearable_device_id varchar(255),
  subscription_tier varchar(20) default 'free',
  baseline_established boolean default false,
  baseline_start_date date,
  baseline_hrv_mean numeric(6,2),
  baseline_hrv_sd numeric(6,2),
  baseline_rhr_mean int,
  baseline_rhr_sd numeric(4,2)
);

-- Step 2: Create research_papers table if it doesn't exist (for foreign key references)
create table if not exists public.research_papers (
  id uuid primary key default gen_random_uuid(),
  doi varchar(255) unique not null,
  title text not null,
  authors text,
  journal varchar(255),
  year int,
  abstract text,
  key_findings text[],
  practical_takeaways text[],
  eli5_summary text,
  study_type varchar(50),
  quality_rating int,
  confidence_level varchar(20),
  population varchar(100),
  sample_size int,
  effect_size varchar(100),
  topics varchar(50)[],
  superseded_by_doi varchar(255),
  current boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Step 3: Create macro_targets table
create table if not exists public.macro_targets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  date date not null,
  calories int,
  protein_g int,
  carbs_g int,
  fat_g int,
  protein_citation_doi varchar(255) references public.research_papers(doi),
  carb_citation_doi varchar(255) references public.research_papers(doi),
  fat_citation_doi varchar(255) references public.research_papers(doi),
  calculation_method varchar(50),
  adjustment_reason text,
  confidence_level varchar(20),
  created_at timestamp with time zone default now(),
  unique(user_id, date)
);

-- Step 4: Create index for performance
create index if not exists idx_macro_targets_user_date on public.macro_targets(user_id, date desc);

-- Step 5: Enable Row Level Security
alter table public.macro_targets enable row level security;

-- Step 6: Create RLS policies so users can access their own targets
create policy if not exists "Users can view own macro targets" on public.macro_targets
  for select using (auth.uid() = user_id);

create policy if not exists "Users can insert own macro targets" on public.macro_targets
  for insert with check (auth.uid() = user_id);

create policy if not exists "Users can update own macro targets" on public.macro_targets
  for update using (auth.uid() = user_id);

-- Step 7: Enable RLS on users table if not already enabled
alter table public.users enable row level security;

create policy if not exists "Users can view own profile" on public.users
  for select using (auth.uid() = id);

create policy if not exists "Users can update own profile" on public.users
  for update using (auth.uid() = id);

create policy if not exists "Users can insert own profile" on public.users
  for insert with check (auth.uid() = id);

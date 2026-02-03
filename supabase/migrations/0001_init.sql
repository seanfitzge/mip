-- MIP schema init
create extension if not exists "pgcrypto";

-- Users table (maps to Supabase auth.users)
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email varchar(255) unique not null,
  name varchar(255),
  created_at timestamp with time zone default now(),

  date_of_birth date,
  sex varchar(10) not null,
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

create table if not exists public.biometrics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  date date not null,

  hrv_rmssd_ms numeric(6,2),
  hrv_sdnn_ms numeric(6,2),
  resting_hr_bpm int,
  sleeping_hr_bpm int,

  sleep_duration_hrs numeric(4,2),
  sleep_quality_score int,
  deep_sleep_hrs numeric(4,2),
  rem_sleep_hrs numeric(4,2),
  light_sleep_hrs numeric(4,2),
  sleep_efficiency_percent int,

  steps int,
  active_calories int,
  training_load int,
  recovery_time_hrs int,

  source_device varchar(50),
  device_accuracy_ccc numeric(4,3),

  readiness_score int,
  recovery_grade varchar(10),
  intervention_triggered boolean default false,

  created_at timestamp with time zone default now(),
  unique(user_id, date)
);

create table if not exists public.nutrition_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  date date not null,
  meal_time timestamp with time zone,

  calories int,
  protein_g numeric(6,2),
  carbs_g numeric(6,2),
  fat_g numeric(6,2),
  fiber_g numeric(5,2),

  meal_name varchar(255),
  meal_type varchar(50),

  deviation_from_target_percent int,

  logged_at timestamp with time zone default now()
);

create table if not exists public.daily_nutrition_summary (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  date date not null,

  total_calories int,
  total_protein_g numeric(6,2),
  total_carbs_g numeric(6,2),
  total_fat_g numeric(6,2),

  target_calories int,
  adherence_percent int,

  exercise_calories_burned int,
  energy_availability_kcal_per_kg_ffm numeric(5,2),

  unique(user_id, date)
);

create table if not exists public.weight_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  date date not null,
  weight_kg numeric(6,2) not null,

  body_fat_percent numeric(5,2),
  lean_body_mass_kg numeric(6,2),
  measurement_method varchar(50),

  seven_day_average numeric(6,2),

  created_at timestamp with time zone default now(),
  unique(user_id, date)
);

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

create table if not exists public.reverse_diet_protocols (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,

  start_date date not null,
  end_date date,
  predicted_end_date date,

  starting_calories int,
  starting_weight_kg numeric(6,2),
  starting_body_fat_percent numeric(5,2),
  deficit_duration_weeks int,

  target_calories int,

  weekly_increase_kcal int default 100,
  current_weekly_increase int,

  current_phase varchar(50),
  current_week int,

  baseline_hrv_at_start numeric(6,2),
  current_hrv numeric(6,2),
  baseline_rhr_at_start int,
  current_rhr int,

  status varchar(20),

  total_weight_change_kg numeric(6,2),
  total_fat_gain_kg numeric(6,2),
  metabolic_recovery_percent int,

  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.tdee_estimates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  date date not null,

  formula_estimate int,
  bayesian_estimate int,
  confidence_interval_lower int,
  confidence_interval_upper int,

  days_of_data int,
  estimation_confidence varchar(20),

  metabolic_adaptation_kcal int,
  adaptation_detected boolean,

  created_at timestamp with time zone default now(),
  unique(user_id, date)
);

create table if not exists public.red_s_assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  assessment_date date not null,

  risk_level varchar(20),

  low_energy_availability boolean,
  menstrual_dysfunction boolean,
  declining_performance boolean,
  frequent_injuries boolean,
  poor_sleep_quality boolean,
  mood_disturbances boolean,

  current_ea_kcal_per_kg_ffm numeric(5,2),
  days_below_threshold int,

  hrv_below_baseline_percent int,
  rhr_above_baseline_bpm int,

  cssd_referral_recommended boolean,
  intervention_applied varchar(50),

  created_at timestamp with time zone default now()
);

create table if not exists public.user_behavior_patterns (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,

  logging_consistency_score numeric(3,2),
  avg_daily_entries int,
  longest_streak_days int,

  food_variety_score int,
  macro_awareness_level varchar(20),
  uses_timing boolean,
  uses_periodization boolean,

  training_age_estimated_years int,
  performance_trend varchar(20),

  avg_deviation_from_targets_percent int,
  override_frequency int,

  detected_category varchar(20),
  classification_confidence numeric(3,2),

  updated_at timestamp with time zone default now(),
  unique(user_id)
);

create table if not exists public.intervention_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  intervention_date date not null,

  trigger_type varchar(50),
  trigger_details jsonb,

  intervention_type varchar(50),
  adjustment_details jsonb,

  supporting_studies varchar(255)[],
  confidence_level varchar(20),

  user_compliance boolean,
  outcome_measured boolean,
  outcome_positive boolean,

  created_at timestamp with time zone default now()
);

create index if not exists idx_biometrics_user_date on public.biometrics(user_id, date desc);
create index if not exists idx_nutrition_logs_user_date on public.nutrition_logs(user_id, date desc);
create index if not exists idx_weight_logs_user_date on public.weight_logs(user_id, date desc);
create index if not exists idx_research_papers_doi on public.research_papers(doi);
create index if not exists idx_research_papers_topics on public.research_papers using gin(topics);
create index if not exists idx_macro_targets_user_date on public.macro_targets(user_id, date desc);
create index if not exists idx_tdee_estimates_user_date on public.tdee_estimates(user_id, date desc);

alter table public.users enable row level security;
alter table public.biometrics enable row level security;
alter table public.nutrition_logs enable row level security;
alter table public.daily_nutrition_summary enable row level security;
alter table public.weight_logs enable row level security;
alter table public.research_papers enable row level security;
alter table public.macro_targets enable row level security;
alter table public.reverse_diet_protocols enable row level security;
alter table public.tdee_estimates enable row level security;
alter table public.red_s_assessments enable row level security;
alter table public.user_behavior_patterns enable row level security;
alter table public.intervention_logs enable row level security;

-- User-owned row policies
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.users
  for insert with check (auth.uid() = id);

create policy "Users can view own biometrics" on public.biometrics
  for select using (auth.uid() = user_id);

create policy "Users can insert own biometrics" on public.biometrics
  for insert with check (auth.uid() = user_id);

create policy "Users can update own biometrics" on public.biometrics
  for update using (auth.uid() = user_id);

create policy "Users can view own nutrition logs" on public.nutrition_logs
  for select using (auth.uid() = user_id);

create policy "Users can insert own nutrition logs" on public.nutrition_logs
  for insert with check (auth.uid() = user_id);

create policy "Users can update own nutrition logs" on public.nutrition_logs
  for update using (auth.uid() = user_id);

create policy "Users can view own daily nutrition summary" on public.daily_nutrition_summary
  for select using (auth.uid() = user_id);

create policy "Users can insert own daily nutrition summary" on public.daily_nutrition_summary
  for insert with check (auth.uid() = user_id);

create policy "Users can update own daily nutrition summary" on public.daily_nutrition_summary
  for update using (auth.uid() = user_id);

create policy "Users can view own weight logs" on public.weight_logs
  for select using (auth.uid() = user_id);

create policy "Users can insert own weight logs" on public.weight_logs
  for insert with check (auth.uid() = user_id);

create policy "Users can update own weight logs" on public.weight_logs
  for update using (auth.uid() = user_id);

create policy "Users can view own macro targets" on public.macro_targets
  for select using (auth.uid() = user_id);

create policy "Users can insert own macro targets" on public.macro_targets
  for insert with check (auth.uid() = user_id);

create policy "Users can update own macro targets" on public.macro_targets
  for update using (auth.uid() = user_id);

create policy "Users can view own reverse diet protocols" on public.reverse_diet_protocols
  for select using (auth.uid() = user_id);

create policy "Users can insert own reverse diet protocols" on public.reverse_diet_protocols
  for insert with check (auth.uid() = user_id);

create policy "Users can update own reverse diet protocols" on public.reverse_diet_protocols
  for update using (auth.uid() = user_id);

create policy "Users can view own tdee estimates" on public.tdee_estimates
  for select using (auth.uid() = user_id);

create policy "Users can insert own tdee estimates" on public.tdee_estimates
  for insert with check (auth.uid() = user_id);

create policy "Users can update own tdee estimates" on public.tdee_estimates
  for update using (auth.uid() = user_id);

create policy "Users can view own red-s assessments" on public.red_s_assessments
  for select using (auth.uid() = user_id);

create policy "Users can insert own red-s assessments" on public.red_s_assessments
  for insert with check (auth.uid() = user_id);

create policy "Users can update own red-s assessments" on public.red_s_assessments
  for update using (auth.uid() = user_id);

create policy "Users can view own behavior patterns" on public.user_behavior_patterns
  for select using (auth.uid() = user_id);

create policy "Users can insert own behavior patterns" on public.user_behavior_patterns
  for insert with check (auth.uid() = user_id);

create policy "Users can update own behavior patterns" on public.user_behavior_patterns
  for update using (auth.uid() = user_id);

create policy "Users can view own intervention logs" on public.intervention_logs
  for select using (auth.uid() = user_id);

create policy "Users can insert own intervention logs" on public.intervention_logs
  for insert with check (auth.uid() = user_id);

create policy "Users can update own intervention logs" on public.intervention_logs
  for update using (auth.uid() = user_id);

-- Research papers are readable by all authenticated users
create policy "Research readable by authenticated users" on public.research_papers
  for select using (auth.role() = 'authenticated');

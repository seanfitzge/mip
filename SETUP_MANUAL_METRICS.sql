-- Manual Health Metrics Setup
-- This ensures the biometrics table has all necessary fields for manual input
-- Run this in Supabase SQL Editor

-- Ensure biometrics table exists with all fields
create table if not exists public.biometrics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  date date not null,

  -- Core HRV metrics
  hrv_rmssd_ms numeric(6,2),
  hrv_sdnn_ms numeric(6,2),
  
  -- Heart rate metrics
  resting_hr_bpm int,
  sleeping_hr_bpm int,

  -- Sleep metrics
  sleep_duration_hrs numeric(4,2),
  sleep_quality_score int,
  deep_sleep_hrs numeric(4,2),
  rem_sleep_hrs numeric(4,2),
  light_sleep_hrs numeric(4,2),
  sleep_efficiency_percent int,

  -- Activity metrics
  steps int,
  active_calories int,
  training_load int,
  recovery_time_hrs int,

  -- Device metadata
  source_device varchar(50),
  device_accuracy_ccc numeric(4,3),

  -- Calculated scores
  readiness_score int,
  recovery_grade varchar(10),
  intervention_triggered boolean default false,

  created_at timestamp with time zone default now(),
  unique(user_id, date)
);

-- Add any missing columns (if table already exists)
do $$ 
begin
  -- Add hrv_rmssd_ms if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='hrv_rmssd_ms') then
    alter table public.biometrics add column hrv_rmssd_ms numeric(6,2);
  end if;

  -- Add hrv_sdnn_ms if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='hrv_sdnn_ms') then
    alter table public.biometrics add column hrv_sdnn_ms numeric(6,2);
  end if;

  -- Add resting_hr_bpm if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='resting_hr_bpm') then
    alter table public.biometrics add column resting_hr_bpm int;
  end if;

  -- Add sleeping_hr_bpm if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='sleeping_hr_bpm') then
    alter table public.biometrics add column sleeping_hr_bpm int;
  end if;

  -- Add sleep_duration_hrs if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='sleep_duration_hrs') then
    alter table public.biometrics add column sleep_duration_hrs numeric(4,2);
  end if;

  -- Add sleep_quality_score if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='sleep_quality_score') then
    alter table public.biometrics add column sleep_quality_score int;
  end if;

  -- Add deep_sleep_hrs if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='deep_sleep_hrs') then
    alter table public.biometrics add column deep_sleep_hrs numeric(4,2);
  end if;

  -- Add rem_sleep_hrs if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='rem_sleep_hrs') then
    alter table public.biometrics add column rem_sleep_hrs numeric(4,2);
  end if;

  -- Add light_sleep_hrs if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='light_sleep_hrs') then
    alter table public.biometrics add column light_sleep_hrs numeric(4,2);
  end if;

  -- Add sleep_efficiency_percent if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='sleep_efficiency_percent') then
    alter table public.biometrics add column sleep_efficiency_percent int;
  end if;

  -- Add steps if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='steps') then
    alter table public.biometrics add column steps int;
  end if;

  -- Add active_calories if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='active_calories') then
    alter table public.biometrics add column active_calories int;
  end if;

  -- Add training_load if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='training_load') then
    alter table public.biometrics add column training_load int;
  end if;

  -- Add recovery_time_hrs if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='recovery_time_hrs') then
    alter table public.biometrics add column recovery_time_hrs int;
  end if;

  -- Add source_device if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='source_device') then
    alter table public.biometrics add column source_device varchar(50);
  end if;

  -- Add device_accuracy_ccc if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='device_accuracy_ccc') then
    alter table public.biometrics add column device_accuracy_ccc numeric(4,3);
  end if;

  -- Add readiness_score if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='readiness_score') then
    alter table public.biometrics add column readiness_score int;
  end if;

  -- Add recovery_grade if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='recovery_grade') then
    alter table public.biometrics add column recovery_grade varchar(10);
  end if;

  -- Add intervention_triggered if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='biometrics' and column_name='intervention_triggered') then
    alter table public.biometrics add column intervention_triggered boolean default false;
  end if;
end $$;

-- Ensure baseline fields exist in users table
do $$ 
begin
  -- Add baseline_established if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='users' and column_name='baseline_established') then
    alter table public.users add column baseline_established boolean default false;
  end if;

  -- Add baseline_start_date if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='users' and column_name='baseline_start_date') then
    alter table public.users add column baseline_start_date date;
  end if;

  -- Add baseline_hrv_mean if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='users' and column_name='baseline_hrv_mean') then
    alter table public.users add column baseline_hrv_mean numeric(6,2);
  end if;

  -- Add baseline_hrv_sd if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='users' and column_name='baseline_hrv_sd') then
    alter table public.users add column baseline_hrv_sd numeric(6,2);
  end if;

  -- Add baseline_rhr_mean if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='users' and column_name='baseline_rhr_mean') then
    alter table public.users add column baseline_rhr_mean int;
  end if;

  -- Add baseline_rhr_sd if missing
  if not exists (select 1 from information_schema.columns 
                 where table_name='users' and column_name='baseline_rhr_sd') then
    alter table public.users add column baseline_rhr_sd numeric(4,2);
  end if;
end $$;

-- Create index for performance (if not exists)
create index if not exists idx_biometrics_user_date on public.biometrics(user_id, date desc);

-- Enable Row Level Security
alter table public.biometrics enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view own biometrics" on public.biometrics;
drop policy if exists "Users can insert own biometrics" on public.biometrics;
drop policy if exists "Users can update own biometrics" on public.biometrics;

-- Create RLS policies
create policy "Users can view own biometrics" on public.biometrics
  for select using (auth.uid() = user_id);

create policy "Users can insert own biometrics" on public.biometrics
  for insert with check (auth.uid() = user_id);

create policy "Users can update own biometrics" on public.biometrics
  for update using (auth.uid() = user_id);

-- Verification query
-- Run this to verify the setup
select 
  'biometrics' as table_name,
  column_name,
  data_type,
  is_nullable
from information_schema.columns
where table_schema = 'public' 
  and table_name = 'biometrics'
order by ordinal_position;

-- Success message
do $$
begin
  raise notice 'Manual metrics setup complete! You can now:';
  raise notice '1. Navigate to /biometrics in your app';
  raise notice '2. Use the Manual Health Metrics Input form';
  raise notice '3. Enter at least HRV, RHR, Sleep Duration, and Sleep Quality';
  raise notice '4. After 14 days of data, your baseline will be automatically calculated';
end $$;

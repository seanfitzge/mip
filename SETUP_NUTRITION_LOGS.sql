-- Setup: Create nutrition_logs table for meal logging
-- Run this in Supabase SQL Editor

-- Step 1: Create nutrition_logs table
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

-- Step 2: Create index for performance
create index if not exists idx_nutrition_logs_user_date on public.nutrition_logs(user_id, date desc);

-- Step 3: Enable Row Level Security
alter table public.nutrition_logs enable row level security;

-- Step 4: Create RLS policies so users can access their own logs
drop policy if exists "Users can view own nutrition logs" on public.nutrition_logs;
create policy "Users can view own nutrition logs" on public.nutrition_logs
  for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own nutrition logs" on public.nutrition_logs;
create policy "Users can insert own nutrition logs" on public.nutrition_logs
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own nutrition logs" on public.nutrition_logs;
create policy "Users can update own nutrition logs" on public.nutrition_logs
  for update using (auth.uid() = user_id);

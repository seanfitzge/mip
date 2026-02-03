# Database Setup Instructions

## Quick Setup

The `macro_targets` table (and other tables) need to be created in your Supabase database. Follow these steps:

### Option 1: Using Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to https://app.supabase.com
   - Select your project

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the Migration**
   - Open the file `supabase/migrations/0001_init.sql` in this project
   - Copy the entire contents
   - Paste into the SQL Editor
   - Click "Run" (or press Cmd/Ctrl + Enter)

4. **Verify Tables Created**
   - Go to "Table Editor" in the left sidebar
   - You should see these tables:
     - `users`
     - `biometrics`
     - `nutrition_logs`
     - `macro_targets` ← **This is the one needed for saving targets**
     - `weight_logs`
     - `research_papers`
     - And others...

### Option 2: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Link your project (if not already linked)
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### Verify the Setup

After running the migration, you can verify by:

1. **Check Table Editor**: The `macro_targets` table should appear
2. **Test the API**: Try calculating targets again - it should work now

### Troubleshooting

**Error: "Could not find the table 'public.macro_targets' in the schema cache"**
- This means the migration hasn't been run
- Follow Option 1 above to run the migration

**Error: "permission denied for table macro_targets"**
- Check Row Level Security (RLS) policies
- The migration includes RLS policies, but verify they're active
- Go to Authentication > Policies in Supabase dashboard

**Error: "relation already exists"**
- The table already exists - this is fine, the migration uses `CREATE TABLE IF NOT EXISTS`
- You can proceed normally

## Table Structure

The `macro_targets` table has:
- `user_id` (UUID, references users)
- `date` (DATE, unique per user)
- `calories`, `protein_g`, `carbs_g`, `fat_g` (INT)
- `protein_citation_doi`, `carb_citation_doi`, `fat_citation_doi` (VARCHAR)
- `calculation_method`, `adjustment_reason`, `confidence_level` (VARCHAR/TEXT)
- Unique constraint on (`user_id`, `date`)

This allows one set of targets per user per day.

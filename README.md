# MIP

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add environment variables in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only, optional for now)
3. Run the dev server:
   ```bash
   npm run dev
   ```

## Supabase schema

The initial schema is defined in `supabase/migrations/0001_init.sql`. **You must run this migration before using the app.**

### Quick Setup

1. Go to your Supabase dashboard: https://app.supabase.com
2. Navigate to **SQL Editor**
3. Copy the entire contents of `supabase/migrations/0001_init.sql`
4. Paste into the SQL Editor and click **Run**

See `DATABASE_SETUP.md` for detailed instructions and troubleshooting.
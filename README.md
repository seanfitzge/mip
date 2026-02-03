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

The initial schema is defined in `supabase/migrations/0001_init.sql`. Apply it in the
Supabase SQL editor or via migrations once Supabase CLI is configured.

# PunchApp — Phase 1 (Supabase + Next.js)

**Includes:** Pharmasave theme, Punch & Break with soft geofence and offline queue, Tasks & Shifts (stubs), Payroll report downloads, SW for push/offline.

## Deploy on Vercel (Online-only)
1. Create Supabase project; copy URL/keys.
2. In Supabase SQL editor, run your core schema and functions (0001–0003), then these files:
   - 0004_indexes.sql
   - 0005_shifts_indexes.sql
   - 0006_notifications.sql
   - 0007_profiles_rate.sql
   - 0008_report_rpc.sql
   - 0009_indexes_reports.sql
3. In Vercel → Environment Variables set:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
```
4. Deploy → open `/sign-in`.

Generated 2025-11-06T21:49:14.298879Z

# OZMO Gym website

Next.js 16 (App Router) + Tailwind CSS 4. Form submissions are stored in Supabase. Deploys on Vercel.

## Pages

| Route | Content |
| --- | --- |
| `/` | Home: hero, services, stats, facilities, transformations, branches + map, testimonials, FAQ, free-trial form |
| `/franchise` | Franchise pitch, benefits, support, branches, FAQ, franchise enquiry form |
| `/about` | Stats, Punjab branch map, mission, team, testimonials |
| `/services/gym` `/yoga` `/kickfit` `/swimming` | Service pages (shared layout in `src/components/ServicePage.tsx`) |
| `/contact` | Contact form, contact cards, map, branches |
| `/api/leads` | Receives all three forms and inserts into Supabase |

## Where to edit things

- **Phone, email, address, social links, branches, FAQs, testimonials, stats** → `src/lib/site.ts`
- **Service page copy** → `src/lib/services.ts`
- **Team members** → `src/components/Team.tsx`
- **Colours and fonts** → `src/app/globals.css` and `src/app/layout.tsx`
- **Photos** → `public/images/` (replace a file with the same name and it updates everywhere)

## Run locally

```bash
npm install
npm run dev
```

## 1. Supabase (form storage)

1. Create a project at supabase.com.
2. Open **SQL Editor**, paste the contents of `supabase/schema.sql`, and run it. This creates the `leads` table.
3. Go to **Project Settings → API** and copy the **Project URL** and the **anon public** key.
4. For local testing, copy `.env.example` to `.env.local` and paste the two values.

Submissions appear in **Table Editor → leads**. The `type` column says which form it came from (`trial`, `franchise`, `contact`).

## 2. GitHub

```bash
git add -A
git commit -m "OZMO Gym website"
git branch -M main
git remote add origin https://github.com/<your-username>/ozmo-gym.git
git push -u origin main
```

## 3. Vercel

1. vercel.com → **Add New → Project** → import the GitHub repo.
2. Under **Environment Variables** add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Deploy. Add the custom domain under **Settings → Domains**.

Until the two env vars are set, the forms show "The form is not connected yet" instead of saving.

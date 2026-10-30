# OZMO Gym website

Next.js 16 (App Router) + Tailwind CSS 4. Form submissions are stored in Supabase. Deploys on Vercel.

## Pages

| Route | Content |
| --- | --- |
| `/` | Home: hero, services, facilities, locations + Google map, transformations, franchise CTA, testimonials, FAQ, membership enquiry form |
| `/locations` | All gyms (open + opening soon), interactive map |
| `/locations/[slug]` | One SEO page per gym that has a full address (title, map, directions, membership enquiry form, structured data) |
| `/franchise` | Franchise sales page: headline figures, why a franchise, at-a-glance terms, formats, investment breakdown + ROI calculator, support, success tools, property needs, steps, FAQ, enquiry form |
| `/about` | Story, stats, Google map of branches, mission, team, testimonials |
| `/services/gym` `/yoga` `/kickfit` `/swimming` | Service pages (shared layout in `src/components/ServicePage.tsx`) |
| `/contact` | Contact form, contact cards, location finder |
| `/api/leads` | Receives all three forms and inserts into Supabase |

SEO: per-page titles/descriptions/canonicals, Open Graph image, `/sitemap.xml`, `/robots.txt`, and JSON-LD (Organization, ExerciseGym per location, FAQPage, BreadcrumbList).
Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://ozmogym.com`) in Vercel once a custom domain is live.

## Where to edit things

- **Locations** (add a gym, mark one open, add address/phone/photo) → `locations` in `src/lib/site.ts`. A gym gets its own page as soon as it has a `street` address.
- **Phone, email, social links, FAQs, testimonials, stats** → `src/lib/site.ts`
- **Franchise ROI calculator starting values** → `roiDefaults` in `src/lib/site.ts`
- **Service page copy** → `src/lib/services.ts`
- **Team members** → `src/components/Team.tsx`
- **Colours and fonts** → `src/app/globals.css` and `src/app/layout.tsx` (brand yellow `#FCEE00` is taken from the logo)
- **Photos** → `public/images/` (replace a file with the same name and it updates everywhere). Logo → `public/brand/ozmo-logo.png`

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

Submissions appear in **Table Editor → leads**. The `type` column says which form it came from (`contact` for membership enquiries and the contact form, `franchise` for franchise enquiries).

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

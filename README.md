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
| `/blog`, `/blog/[slug]` | Blog list and articles (from Supabase `posts`), with article structured data and sitemap entries |
| `/admin` | Blog portal for the management team: sign in, write (Markdown + image upload), save drafts, publish, delete. Not indexed |
| `/enquire` | Google Ads landing page: no menu, short call-back form (not indexed by Google) |
| `/thank-you` | After the landing form; reports the Google Ads conversion (not indexed) |
| `/api/leads` | Receives every form; saves to Supabase and the OZMO Google Sheet |

SEO: per-page titles/descriptions/canonicals, Open Graph image, `/sitemap.xml`, `/robots.txt`, and JSON-LD (Organization, ExerciseGym per location, FAQPage, BreadcrumbList).
Live at https://www.ozmogyms.com (ozmogyms.com redirects there). That is the default site URL; set `NEXT_PUBLIC_SITE_URL` in Vercel only if the domain changes.

## Where to edit things

- **Locations** (add a gym, mark one open, add address/phone/photo) → `locations` in `src/lib/site.ts`. A gym gets its own page as soon as it has a `street` address.
- **Phone, email, social links, FAQs, testimonials, stats** → `src/lib/site.ts`
- **Franchise ROI calculator starting values** → `roiDefaults` in `src/lib/site.ts`
- **Service page copy** → `src/lib/services.ts`
- **Team members** → `src/components/Team.tsx`
- **Colours and fonts** → `src/app/globals.css` and `src/app/layout.tsx` (brand yellow `#FCEE00` is taken from the logo)
- **Photos** → `public/images/` (replace a file with the same name and it updates everywhere). Logo → `public/brand/ozmo-logo.png`

## Blog portal (management team)

1. Supabase → **SQL Editor** → run [`supabase/blog.sql`](supabase/blog.sql) (creates `posts`, `blog_authors`, the `blog-images` storage bucket and permissions).
2. For each writer: **Authentication → Users → Add user** (email + password, tick *Auto Confirm User*), then in SQL Editor:
   `insert into public.blog_authors (email, name) values ('person@example.com', 'Full Name');`
3. **Authentication → Sign In / Providers → turn off "Allow new users to sign up"** so only people you add can log in.
4. Writers go to `https://<domain>/admin`, sign in, and click **New post**. **Publish** makes it live immediately; **Save draft** keeps it private.
5. Remove a writer: `delete from public.blog_authors where email = 'person@example.com';` (and delete the user in Authentication).

## Google Ads

- Use `https://<domain>/enquire` as the ad's **Final URL**. Turn on **auto-tagging** in Google Ads (adds `gclid`); optionally add UTM tags with a tracking template, e.g. `{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}`.
- Conversion tracking: in Google Ads create a conversion action (**Goals → Conversions → New → Website → Submit lead form**, count **One**), open **Tag setup → Install the tag yourself**, and copy the `AW-…` ID and the conversion label into Vercel as `NEXT_PUBLIC_GOOGLE_ADS_ID` and `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`, then redeploy. The conversion fires once per lead on `/thank-you`.
- Leads land in the Google Sheet with campaign, keyword and click ID — setup in [google-sheets/README.md](google-sheets/README.md).

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

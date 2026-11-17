# Send website leads to a Google Sheet

Every form on the website (the Google Ads landing page `/enquire`, membership enquiries, contact form and
franchise form) adds a row to an OZMO Google Sheet. Leads are still saved in Supabase as a backup.

Do this once, logged in with the **OZMO Google account** that should own the leads.

## 1. Create the sheet and the script

1. Go to [sheets.new](https://sheets.new) and name the spreadsheet **OZMO Website Leads**.
2. **File → Settings → Time zone → (GMT+05:30) India Standard Time → Save.**
3. **Extensions → Apps Script.** Delete everything in `Code.gs`, then paste the contents of
   [`Code.gs`](./Code.gs) from this folder.
4. On the line `const SECRET = "CHANGE-ME-to-a-long-random-string";` replace the text inside the quotes with
   a long random password (letters and numbers, 30+ characters). Keep it — you need it in step 3.
5. Click **Save** (disk icon). In the function dropdown pick **testSetup** and click **▶ Run**.
   Google asks for permission → **Review permissions → choose the OZMO account → Advanced →
   Go to project (unsafe) → Allow**. (It's "unsafe" only because Google hasn't reviewed your own script.)
   A **Leads** tab with yellow column headers appears in the sheet.

## 2. Publish the script as a web app

1. In Apps Script click **Deploy → New deployment**.
2. Gear icon → **Web app**.
3. **Execute as: Me**, **Who has access: Anyone** → **Deploy**.
4. Copy the **Web app URL** (ends in `/exec`).

"Anyone" only means the website's server can post to it. It still rejects any request without your SECRET.

## 3. Connect the website (Vercel)

Vercel → project **ozmowebsite** → **Settings → Environment Variables**, add (all environments):

| Name | Value |
| --- | --- |
| `GOOGLE_SHEETS_WEBHOOK_URL` | the Web app URL from step 2 |
| `GOOGLE_SHEETS_SECRET` | the same SECRET you put in `Code.gs` |

Then **Deployments → ⋯ on the latest → Redeploy**. Submit a test on `/enquire` and check the sheet.

## If you change the script later

Use **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy** so the URL stays the same.

## Columns

Received (IST) · Form · Name · Phone · Email · Branch · Interested in · Call back time · City · Budget ·
Message · UTM source · UTM medium · UTM campaign · Keyword · Ad content · Google Ads click ID · Page · Status

The **Status** column starts as `New` — the team can change it to Called / Joined / Not interested to track
follow-ups. Add a filter (Data → Create a filter) to sort by branch or status.

## Email alert for every new lead

`Code.gs` also emails the OZMO team each time a lead is added. The email shows the lead's details, with **Call**,
**WhatsApp** and **Open leads sheet** buttons. It's sent from the Google account that owns the script (Gmail
allows about 100 a day on a normal account, 1,500 on Google Workspace).

1. In Apps Script, copy your current `SECRET` and `SPREADSHEET_ID` values somewhere safe.
2. Replace everything in `Code.gs` with the new file and put those two values back.
3. Set `NOTIFY_EMAILS` to the address(es) that should get alerts, e.g. `"owner@gmail.com, manager@gmail.com"`.
4. Save. In the function dropdown pick **testEmail** → **▶ Run** → allow the new "send email" permission.
   A sample "New lead: Test Lead – Dugri" email arrives.
5. **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy.** (Same URL, nothing to change in Vercel.)

Franchise enquiries don't go to the sheet, so they don't trigger this email.

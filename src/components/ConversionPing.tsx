"use client";

import { useEffect } from "react";
import { LEAD_ID_KEY } from "./AdsLeadForm";

type GtagWindow = Window & { dataLayer?: unknown[] };

/**
 * Reports a Google Ads conversion once per submitted lead.
 * Needs NEXT_PUBLIC_GOOGLE_ADS_ID (AW-XXXXXXXXX) and NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL.
 * Only fires when the visitor arrived here from the form (a lead id is in sessionStorage),
 * so refreshes or direct visits don't inflate conversions.
 */
export default function ConversionPing() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
    const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
    let leadId: string | null = null;
    try {
      leadId = sessionStorage.getItem(LEAD_ID_KEY);
      sessionStorage.removeItem(LEAD_ID_KEY);
    } catch {}
    if (!id || !label || !leadId) return;

    // Queue on dataLayer so it works even if gtag.js hasn't finished loading.
    const w = window as GtagWindow;
    w.dataLayer = w.dataLayer || [];
    function gtag(...args: unknown[]) {
      // gtag expects the `arguments` object shape
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
      void args;
    }
    gtag("event", "conversion", { send_to: `${id}/${label}`, transaction_id: leadId });
  }, []);

  return null;
}

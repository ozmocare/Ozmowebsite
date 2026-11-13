// Offer type and helpers that are safe to use in the browser (no server-only imports).

export type Offer = {
  id: string;
  title: string;
  description: string | null;
  badge: string | null;
  image: string | null;
  cta_label: string;
  ends_on: string | null;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

/** Link to the enquiry page with the offer named, so the lead records which offer brought them in. */
export const offerEnquiryHref = (o: Pick<Offer, "title">) => `/enquire?offer=${encodeURIComponent(o.title)}#form`;

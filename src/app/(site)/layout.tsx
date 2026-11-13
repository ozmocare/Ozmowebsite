import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfferPopup from "@/components/OfferPopup";
import { getLiveOffers } from "@/lib/offers";

/** Full website chrome: header, footer, offer pop-up. Ad landing pages live in (landing) without it. */
export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const offers = await getLiveOffers();
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <OfferPopup offers={offers} />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";

/** Full website chrome: header, footer. Ad landing pages live in (landing) without it. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

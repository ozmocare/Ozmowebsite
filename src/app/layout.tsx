import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd, { organizationSchema } from "@/components/JsonLd";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const display = Montserrat({
  variable: "--font-display",
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OZMO Gym & Spa | Best Gym in Ludhiana, Punjab",
    template: "%s | OZMO Gym",
  },
  description:
    "OZMO Gym & Spa — premium gyms across Ludhiana and Jagraon with modern equipment, expert trainers, cardio, cross-fit, yoga, swimming, steam and spa. Enquire about membership today.",
  keywords: [
    "gym in Ludhiana",
    "best gym in Ludhiana",
    "gym near me Ludhiana",
    "OZMO Gym",
    "gym and spa Ludhiana",
    "gym franchise Punjab",
    "fitness centre Ludhiana",
  ],
  applicationName: "OZMO Gym",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "OZMO Gym & Spa",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationSchema()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

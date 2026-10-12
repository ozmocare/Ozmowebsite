import type { Metadata } from "next";
import { Archivo_Black, Orbitron, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const body = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const display = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
});

const logo = Archivo_Black({
  variable: "--font-logo",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OZMO Gym | Transform body and mind in Ludhiana",
    template: "%s | OZMO Gym",
  },
  description:
    "OZMO Gym & Spa — 6 branches across Ludhiana, Punjab. Gym, cardio, cross-fit, yoga and swimming with 50+ expert trainers. Sign up for a free 1-day trial.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${logo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

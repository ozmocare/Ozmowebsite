import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { services } from "@/lib/services";

const service = services.yoga;

export const metadata: Metadata = {
  title: service.seoTitle,
  description: service.description,
  alternates: { canonical: "/services/yoga" },
  openGraph: { url: "/services/yoga", title: service.seoTitle, description: service.description },
};

export default function Page() {
  return <ServicePage service={service} />;
}

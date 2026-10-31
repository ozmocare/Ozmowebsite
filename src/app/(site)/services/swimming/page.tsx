import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { services } from "@/lib/services";

const service = services.swimming;

export const metadata: Metadata = {
  title: service.seoTitle,
  description: service.description,
  alternates: { canonical: "/services/swimming" },
  openGraph: { url: "/services/swimming", title: service.seoTitle, description: service.description },
};

export default function Page() {
  return <ServicePage service={service} />;
}

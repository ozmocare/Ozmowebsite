import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { services } from "@/lib/services";

const service = services.gym;

export const metadata: Metadata = {
  title: service.seoTitle,
  description: service.description,
  alternates: { canonical: "/services/gym" },
  openGraph: { url: "/services/gym", title: service.seoTitle, description: service.description },
};

export default function Page() {
  return <ServicePage service={service} />;
}

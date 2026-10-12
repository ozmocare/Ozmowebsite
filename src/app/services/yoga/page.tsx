import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { services } from "@/lib/services";

const service = services.yoga;

export const metadata: Metadata = {
  title: service.title,
  description: service.description,
};

export default function Page() {
  return <ServicePage service={service} />;
}

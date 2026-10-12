import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { SocialLinks } from "./Socials";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="wrap grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_auto]">
        <div className="max-w-sm">
          <Logo size="lg" />
          <p className="mt-6 leading-8 text-white/80">
            We are a leading fitness system in India, with 12 years of experience in the fitness
            industry and trusted by over 10,000+ customers.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold">Support</h3>
          {/* TODO: link these to the policy pages once the documents are ready */}
          <ul className="mt-6 space-y-4 text-lg text-white/75">
            <li><a href="#" className="hover:text-brand">Terms of service</a></li>
            <li><a href="#" className="hover:text-brand">Privacy policy</a></li>
            <li><a href="#" className="hover:text-brand">Refund policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold">Contact</h3>
          <ul className="mt-6 space-y-4 text-white/80">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-3 hover:text-brand">
                <Phone size={22} className="shrink-0 text-brand" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-brand">
                <Mail size={22} className="shrink-0 text-brand" /> {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={22} className="shrink-0 text-brand" />
              <span className="max-w-56 leading-8">{site.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold">Social media</h3>
          <SocialLinks variant="tile" className="mt-6 flex gap-2.5" />
        </div>
      </div>

      <div className="wrap">
        <div className="flex flex-col gap-2 border-t border-white/10 py-10 text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© Copyright 2025. All rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

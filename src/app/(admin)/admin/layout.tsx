import type { Metadata } from "next";

// Management-only blog portal. Hidden from search engines; access is enforced by Supabase (supabase/blog.sql).
export const metadata: Metadata = {
  title: { absolute: "OZMO Blog Portal" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <main className="flex-1 bg-ink">{children}</main>;
}

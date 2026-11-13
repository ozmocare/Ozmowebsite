"use client";

import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { ArrowLeft, Eye, EyeOff, Megaphone, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { getSupabase, refreshPublicBlog, uploadBlogImage } from "./supabase";
import type { Offer } from "@/lib/offers-shared";

type Draft = {
  title: string;
  description: string;
  badge: string;
  image: string;
  cta_label: string;
  ends_on: string;
  active: boolean;
  sort_order: number;
};

const empty: Draft = {
  title: "",
  description: "",
  badge: "",
  image: "",
  cta_label: "Claim offer",
  ends_on: "",
  active: true,
  sort_order: 0,
};

const today = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

function statusOf(o: Offer) {
  if (!o.active) return { label: "Hidden", cls: "bg-white/10 text-white/60" };
  if (o.ends_on && o.ends_on < today()) return { label: "Ended", cls: "bg-red-500/15 text-red-300" };
  return { label: "Live", cls: "bg-brand text-ink" };
}

const fmt = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

/** Offers shown in the website pop-up. Several can be live at once; the visitor flips between them. */
export default function OffersAdmin() {
  const [offers, setOffers] = useState<Offer[] | null>(null);
  const [editing, setEditing] = useState<Offer | "new" | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const { data, error } = await getSupabase()
      .from("offers")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error)
      setError(
        error.message.includes("offers")
          ? "The offers table isn't set up yet. Run supabase/offers.sql in Supabase → SQL Editor."
          : error.message,
      );
    else setOffers(data as Offer[]);
  }, []);

  useEffect(() => {
    // Initial fetch on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  async function toggle(o: Offer) {
    const { error } = await getSupabase().from("offers").update({ active: !o.active }).eq("id", o.id);
    if (error) return setError(error.message);
    await refreshPublicBlog();
    void load();
  }

  if (editing)
    return (
      <OfferEditor
        offer={editing === "new" ? null : editing}
        onClose={() => {
          setEditing(null);
          void load();
        }}
      />
    );

  const liveCount = (offers ?? []).filter((o) => statusOf(o).label === "Live").length;

  return (
    <div className="wrap py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-black uppercase">Offers pop-up</h1>
          <p className="mt-1 max-w-xl text-white/55">
            Live offers pop up when someone opens the website. With more than one live offer, visitors can flip between
            them. The button takes them to the enquiry form with the offer named.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setEditing("new")}>
          <Plus size={18} /> New offer
        </button>
      </div>

      {offers && (
        <p className="mt-6 text-sm text-white/60">
          {liveCount === 0
            ? "No offers are live, so the pop-up is switched off."
            : `${liveCount} offer${liveCount > 1 ? "s" : ""} live on the website now.`}
        </p>
      )}
      {error && <p className="mt-6 rounded-xl bg-red-500/10 px-4 py-3 text-red-300">{error}</p>}

      <div className="card mt-4 overflow-hidden">
        {offers === null ? (
          <p className="p-8 text-center text-white/50">{error ? "—" : "Loading offers…"}</p>
        ) : offers.length === 0 ? (
          <div className="p-12 text-center">
            <Megaphone className="mx-auto text-white/25" size={40} />
            <p className="mt-4 text-white/60">No offers yet. Create one to start the pop-up.</p>
          </div>
        ) : (
          <ul className="divide-y divide-white/10">
            {offers.map((o) => {
              const s = statusOf(o);
              return (
                <li key={o.id} className="flex flex-wrap items-center gap-4 p-4 md:p-5">
                  <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                    {o.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={o.image} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold">{o.title}</p>
                    <p className="mt-1 text-sm text-white/50">
                      {o.badge ? `${o.badge} · ` : ""}
                      {o.ends_on ? `ends ${fmt(o.ends_on)}` : "no end date"} · order {o.sort_order}
                    </p>
                  </div>
                  <span className={`chip border-transparent text-xs uppercase tracking-wider ${s.cls}`}>{s.label}</span>
                  <div className="flex gap-2">
                    <button className="btn-ghost px-4 py-2 text-sm" onClick={() => toggle(o)}>
                      {o.active ? (
                        <>
                          <EyeOff size={14} /> Hide
                        </>
                      ) : (
                        <>
                          <Eye size={14} /> Show
                        </>
                      )}
                    </button>
                    <button className="btn-primary px-4 py-2 text-sm" onClick={() => setEditing(o)}>
                      <Pencil size={14} /> Edit
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function OfferEditor({ offer, onClose }: { offer: Offer | null; onClose: () => void }) {
  const [d, setD] = useState<Draft>(
    offer
      ? {
          title: offer.title,
          description: offer.description ?? "",
          badge: offer.badge ?? "",
          image: offer.image ?? "",
          cta_label: offer.cta_label,
          ends_on: offer.ends_on ?? "",
          active: offer.active,
          sort_order: offer.sort_order,
        }
      : empty,
  );
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((p) => ({ ...p, [k]: v }));

  async function onPick(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      set("image", await uploadBlogImage(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    }
    setUploading(false);
  }

  async function save() {
    if (!d.title.trim()) return setError("Give the offer a title.");
    setBusy(true);
    setError("");
    const row = {
      title: d.title.trim(),
      description: d.description.trim() || null,
      badge: d.badge.trim() || null,
      image: d.image || null,
      cta_label: d.cta_label.trim() || "Claim offer",
      ends_on: d.ends_on || null,
      active: d.active,
      sort_order: Number.isFinite(d.sort_order) ? d.sort_order : 0,
    };
    const supabase = getSupabase();
    const { error } = offer
      ? await supabase.from("offers").update(row).eq("id", offer.id)
      : await supabase.from("offers").insert(row);
    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }
    await refreshPublicBlog();
    onClose();
  }

  async function remove() {
    if (!offer || !window.confirm(`Delete the offer “${offer.title}” permanently? This can't be undone.`)) return;
    setBusy(true);
    const { error } = await getSupabase().from("offers").delete().eq("id", offer.id);
    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }
    await refreshPublicBlog();
    onClose();
  }

  const label = "text-sm font-bold uppercase tracking-wider text-white/50";

  return (
    <div className="wrap py-8">
      <button onClick={onClose} className="flex items-center gap-2 text-white/60 hover:text-brand">
        <ArrowLeft size={18} /> All offers
      </button>
      <h1 className="mt-4 font-display text-3xl font-black uppercase">{offer ? "Edit offer" : "New offer"}</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="card space-y-5 p-6">
          <label className="block">
            <span className={label}>Offer title *</span>
            <input
              value={d.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Flat 30% off on annual membership"
              maxLength={120}
              className="field mt-2"
            />
          </label>
          <label className="block">
            <span className={label}>Details</span>
            <textarea
              value={d.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              maxLength={400}
              placeholder="One or two lines: what's included, which branches, any conditions."
              className="field mt-2"
            />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className={label}>Badge</span>
              <input
                value={d.badge}
                onChange={(e) => set("badge", e.target.value)}
                placeholder="e.g. Diwali offer"
                maxLength={30}
                className="field mt-2"
              />
            </label>
            <label className="block">
              <span className={label}>Button text</span>
              <input
                value={d.cta_label}
                onChange={(e) => set("cta_label", e.target.value)}
                maxLength={30}
                className="field mt-2"
              />
            </label>
            <label className="block">
              <span className={label}>Last day (optional)</span>
              <input type="date" value={d.ends_on} onChange={(e) => set("ends_on", e.target.value)} className="field mt-2" />
            </label>
            <label className="block">
              <span className={label}>Order</span>
              <input
                type="number"
                value={d.sort_order}
                onChange={(e) => set("sort_order", parseInt(e.target.value, 10) || 0)}
                className="field mt-2"
              />
              <span className="mt-1 block text-xs text-white/40">Lower number shows first.</span>
            </label>
          </div>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={d.active}
              onChange={(e) => set("active", e.target.checked)}
              className="h-5 w-5 accent-[#fcee00]"
            />
            <span className="font-semibold">Show this offer on the website</span>
          </label>
        </div>

        <div className="space-y-5">
          <div className="card p-5">
            <p className={label}>Offer image</p>
            {d.image ? (
              <div className="relative mt-3 overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.image} alt="" className="aspect-[4/3] w-full object-cover" />
                <button
                  onClick={() => set("image", "")}
                  aria-label="Remove image"
                  className="absolute right-2 top-2 rounded-full bg-ink/80 p-1.5 text-white hover:text-brand"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="mt-3 flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 text-white/50 hover:border-brand hover:text-brand">
                <Upload size={22} />
                <span className="text-sm font-semibold">{uploading ? "Uploading…" : "Upload an image"}</span>
                <input type="file" accept="image/*" className="hidden" onChange={onPick} disabled={uploading} />
              </label>
            )}
            <p className="mt-2 text-xs text-white/40">
              Shown at 4:3 (e.g. 1200 × 900). Keep important text away from the edges.
            </p>
          </div>

          {error && <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}

          <div className="flex flex-wrap gap-3">
            <button className="btn-primary flex-1" onClick={save} disabled={busy || uploading}>
              {busy ? "Saving…" : offer ? "Save changes" : "Create offer"}
            </button>
            {offer && (
              <button className="btn-ghost" onClick={remove} disabled={busy}>
                <Trash2 size={16} /> Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

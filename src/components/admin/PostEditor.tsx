"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  ArrowLeft,
  Bold,
  Eye,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Quote,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Markdown from "../Markdown";
import { getSupabase, refreshPublicBlog, uploadBlogImage } from "./supabase";
import { categories, slugify, type Post } from "@/lib/blog-shared";

type Draft = {
  title: string;
  slug: string;
  category: string;
  author_name: string;
  excerpt: string;
  cover_image: string;
  content: string;
};

const fromPost = (p: Post | null, author: string): Draft => ({
  title: p?.title ?? "",
  slug: p?.slug ?? "",
  category: p?.category ?? categories[0],
  author_name: p?.author_name ?? author,
  excerpt: p?.excerpt ?? "",
  cover_image: p?.cover_image ?? "",
  content: p?.content ?? "",
});

const TOOLS = [
  { id: "h2", icon: Heading2, label: "Heading" },
  { id: "h3", icon: Heading3, label: "Sub-heading" },
  { id: "bold", icon: Bold, label: "Bold" },
  { id: "italic", icon: Italic, label: "Italic" },
  { id: "ul", icon: List, label: "Bullet list" },
  { id: "ol", icon: ListOrdered, label: "Numbered list" },
  { id: "quote", icon: Quote, label: "Quote" },
  { id: "link", icon: Link2, label: "Link" },
  { id: "image", icon: ImagePlus, label: "Insert image" },
] as const;

const STARTER = `Write a short introduction here.

## First section

Your text. Use the toolbar above for headings, **bold**, lists, links and images.

## Second section

- Point one
- Point two
`;

export default function PostEditor({
  post,
  authorEmail,
  onClose,
}: {
  post: Post | null;
  authorEmail: string;
  onClose: () => void;
}) {
  const [saved, setSaved] = useState<Post | null>(post);
  const [d, setD] = useState<Draft>(() => {
    const draft = fromPost(post, authorEmail.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));
    return post ? draft : { ...draft, content: STARTER };
  });
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ kind: "error" | "ok"; text: string } | null>(null);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [dirty, setDirty] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const inlineImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setDirty(true);
    setD((prev) => {
      const next = { ...prev, [k]: v };
      if (k === "title" && !slugTouched) next.slug = slugify(String(v));
      return next;
    });
  };

  // Wrap the selection in the textarea with Markdown syntax.
  function wrap(before: string, after = "", placeholder = "text") {
    const el = textRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const sel = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + sel + after + value.slice(e);
    set("content", next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + sel.length);
    });
  }

  function linePrefix(prefix: string) {
    const el = textRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    // Apply to every whole line the cursor or selection touches.
    const start = value.lastIndexOf("\n", s - 1) + 1;
    const nl = value.indexOf("\n", Math.max(s, e));
    const end = nl === -1 ? value.length : nl;
    const block = value.slice(start, end) || "Text";
    const lines = block.split("\n").map((l, i) => (prefix === "1. " ? `${i + 1}. ` : prefix) + l.replace(/^(#{1,6} |> |- |\d+\. )/, ""));
    const next = lines.join("\n");
    set("content", value.slice(0, start) + next + value.slice(end));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start, start + next.length);
    });
  }

  function insertLink() {
    const url = window.prompt("Link address (https://…)");
    if (url) wrap("[", `](${url})`, "link text");
  }

  async function upload(file: File, target: "cover" | "inline") {
    setBusy(target === "cover" ? "Uploading cover…" : "Uploading image…");
    setMsg(null);
    try {
      const url = await uploadBlogImage(file);
      if (target === "cover") set("cover_image", url);
      else {
        const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
        wrap(`\n![${alt}](${url})\n`, "", "");
      }
    } catch (err) {
      setMsg({ kind: "error", text: `Upload failed: ${err instanceof Error ? err.message : String(err)}` });
    }
    setBusy(null);
  }

  function onPick(e: ChangeEvent<HTMLInputElement>, target: "cover" | "inline") {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) void upload(file, target);
  }

  async function save(status: "draft" | "published") {
    if (!d.title.trim()) return setMsg({ kind: "error", text: "Add a title first." });
    const slug = slugify(d.slug || d.title);
    if (!slug) return setMsg({ kind: "error", text: "The URL needs at least one letter or number." });
    if (status === "published" && !d.content.trim()) return setMsg({ kind: "error", text: "Write some content before publishing." });

    setBusy(status === "published" ? "Publishing…" : "Saving…");
    setMsg(null);
    const row = {
      title: d.title.trim(),
      slug,
      category: d.category || null,
      author_name: d.author_name.trim() || null,
      excerpt: d.excerpt.trim() || null,
      cover_image: d.cover_image || null,
      content: d.content,
      status,
      published_at: status === "published" ? (saved?.published_at ?? new Date().toISOString()) : saved?.published_at ?? null,
    };
    const supabase = getSupabase();
    const { data, error } = saved
      ? await supabase.from("posts").update(row).eq("id", saved.id).select().single()
      : await supabase.from("posts").insert(row).select().single();
    setBusy(null);
    if (error) {
      const text = error.code === "23505" ? "Another post already uses this URL — change the URL slug." : error.message;
      return setMsg({ kind: "error", text });
    }
    setSaved(data as Post);
    setD((prev) => ({ ...prev, slug }));
    setSlugTouched(true);
    setDirty(false);
    await refreshPublicBlog();
    setMsg({
      kind: "ok",
      text: status === "published" ? "Published! It's live on the blog." : saved?.status === "published" ? "Unpublished — saved as a draft." : "Draft saved.",
    });
  }

  async function remove() {
    if (!saved) return onClose();
    if (!window.confirm(`Delete “${saved.title}” permanently? This can't be undone.`)) return;
    setBusy("Deleting…");
    const { error } = await getSupabase().from("posts").delete().eq("id", saved.id);
    setBusy(null);
    if (error) return setMsg({ kind: "error", text: error.message });
    await refreshPublicBlog();
    setDirty(false);
    onClose();
  }

  function back() {
    if (dirty && !window.confirm("You have unsaved changes. Leave without saving?")) return;
    onClose();
  }

  const isPublished = saved?.status === "published";
  function runTool(id: (typeof TOOLS)[number]["id"]) {
    if (id === "h2") linePrefix("## ");
    else if (id === "h3") linePrefix("### ");
    else if (id === "bold") wrap("**", "**");
    else if (id === "italic") wrap("_", "_");
    else if (id === "ul") linePrefix("- ");
    else if (id === "ol") linePrefix("1. ");
    else if (id === "quote") linePrefix("> ");
    else if (id === "link") insertLink();
    else inlineImageRef.current?.click();
  }

  return (
    <div className="wrap py-8">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={back} className="flex items-center gap-1 text-white/70 hover:text-brand">
          <ArrowLeft size={18} /> All posts
        </button>
        <span
          className={`chip border-transparent text-xs uppercase tracking-wider ${isPublished ? "bg-brand text-ink" : "bg-white/10 text-white/70"}`}
        >
          {isPublished ? "Published" : saved ? "Draft" : "New post"}
        </span>
        {dirty && <span className="text-sm text-white/45">Unsaved changes</span>}
        <div className="ml-auto flex flex-wrap gap-2">
          {saved && (
            <button onClick={remove} className="btn-ghost px-4 py-2.5 text-sm hover:!border-red-400 hover:!text-red-300" disabled={!!busy}>
              <Trash2 size={15} /> Delete
            </button>
          )}
          <button onClick={() => save("draft")} className="btn-ghost px-5 py-2.5 text-sm" disabled={!!busy}>
            {isPublished ? "Unpublish" : "Save draft"}
          </button>
          <button onClick={() => save("published")} className="btn-primary px-5 py-2.5 text-sm" disabled={!!busy}>
            {isPublished ? "Update post" : "Publish"}
          </button>
        </div>
      </div>

      {(busy || msg) && (
        <p
          role="status"
          className={`mt-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${
            busy ? "bg-white/5 text-white/70" : msg?.kind === "error" ? "bg-red-500/10 text-red-300" : "bg-brand/15 text-brand"
          }`}
        >
          {busy ? (
            <>
              <Loader2 size={16} className="animate-spin" /> {busy}
            </>
          ) : (
            <>
              {msg?.text}
              {msg?.kind === "ok" && isPublished && (
                <a href={`/blog/${d.slug}`} target="_blank" className="underline">
                  View post
                </a>
              )}
            </>
          )}
        </p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Main column */}
        <div className="space-y-5">
          <input
            value={d.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Post title"
            className="w-full bg-transparent font-display text-3xl font-black uppercase outline-none placeholder:text-white/20 md:text-4xl"
          />
          <textarea
            value={d.excerpt}
            onChange={(e) => set("excerpt", e.target.value)}
            rows={2}
            maxLength={220}
            placeholder="Short summary (shown on the blog list and in Google results)"
            className="field resize-none"
          />
          <p className="-mt-3 text-right text-xs text-white/40">{d.excerpt.length}/220 · aim for 120–160 characters</p>

          <div className="card overflow-hidden">
            <div className="flex flex-wrap items-center gap-1 border-b border-white/10 p-2">
              {TOOLS.map((t) => (
                <button
                  key={t.label}
                  type="button"
                  title={t.label}
                  aria-label={t.label}
                  onClick={() => runTool(t.id)}
                  disabled={tab === "preview"}
                  className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-brand disabled:opacity-30"
                >
                  <t.icon size={18} />
                </button>
              ))}
              <div className="ml-auto flex rounded-full bg-white/5 p-1 text-sm lg:hidden">
                {(["write", "preview"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setTab(v)}
                    className={`rounded-full px-3 py-1 capitalize ${tab === v ? "bg-brand text-ink" : "text-white/60"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid lg:grid-cols-2">
              <textarea
                ref={textRef}
                value={d.content}
                onChange={(e) => set("content", e.target.value)}
                className={`min-h-[60vh] w-full resize-y bg-transparent p-5 font-mono text-[15px] leading-7 outline-none lg:block lg:border-r lg:border-white/10 ${
                  tab === "write" ? "block" : "hidden"
                }`}
                placeholder="Write your article…"
              />
              <div className={`max-h-[75vh] overflow-y-auto p-5 lg:block ${tab === "preview" ? "block" : "hidden"}`}>
                <p className="mb-3 flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-white/35">
                  <Eye size={14} /> Preview
                </p>
                <Markdown className="prose-base">{d.content || "_Nothing to preview yet._"}</Markdown>
              </div>
            </div>
          </div>
          <input ref={inlineImageRef} type="file" accept="image/*" className="hidden" onChange={(e) => onPick(e, "inline")} />
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <div className="card p-5">
            <p className="text-sm font-bold uppercase tracking-wider text-white/50">Cover image</p>
            {d.cover_image ? (
              <div className="relative mt-3 overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.cover_image} alt="" className="aspect-[16/10] w-full object-cover" />
                <button
                  onClick={() => set("cover_image", "")}
                  aria-label="Remove cover image"
                  className="absolute right-2 top-2 rounded-full bg-ink/80 p-1.5 text-white hover:text-brand"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="mt-3 flex aspect-[16/10] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 text-white/50 hover:border-brand hover:text-brand">
                <Upload size={22} />
                <span className="text-sm font-semibold">Upload a photo</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => onPick(e, "cover")} />
              </label>
            )}
            <p className="mt-2 text-xs text-white/40">Landscape works best. Large photos are resized automatically.</p>
          </div>

          <div className="card space-y-4 p-5">
            <label className="block">
              <span className="text-sm font-bold uppercase tracking-wider text-white/50">Category</span>
              <select value={d.category} onChange={(e) => set("category", e.target.value)} className="field mt-2">
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-bold uppercase tracking-wider text-white/50">Author name</span>
              <input value={d.author_name} onChange={(e) => set("author_name", e.target.value)} className="field mt-2" />
            </label>
            <label className="block">
              <span className="text-sm font-bold uppercase tracking-wider text-white/50">Page URL</span>
              <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-surface-2 pl-3 text-sm text-white/40">
                /blog/
                <input
                  value={d.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                  }}
                  className="w-full bg-transparent py-3 pr-3 text-white outline-none"
                />
              </div>
              {isPublished && <p className="mt-1 text-xs text-white/40">Changing the URL of a published post breaks old links.</p>}
            </label>
          </div>

          <div className="card p-5 text-sm leading-6 text-white/55">
            <p className="font-bold uppercase tracking-wider text-white/50">Writing tips</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Use “Heading” for main sections — it helps Google.</li>
              <li>Mention the area, e.g. “gym in Dugri, Ludhiana”.</li>
              <li>End with a link to the nearest branch or membership form.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

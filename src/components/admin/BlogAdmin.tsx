"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { ExternalLink, FileText, LogOut, Pencil, Plus, Search } from "lucide-react";
import Logo from "../Logo";
import OffersAdmin from "./OffersAdmin";
import PostEditor from "./PostEditor";
import { getSupabase } from "./supabase";
import { formatDate, type Post } from "@/lib/blog-shared";

type View = { kind: "list" } | { kind: "edit"; post: Post | null };

export default function BlogAdmin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [recovery, setRecovery] = useState(false);
  const [isAuthor, setIsAuthor] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s);
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    getSupabase()
      .rpc("is_blog_author")
      .then(({ data, error }) => setIsAuthor(!error && data === true));
  }, [session]);

  if (!ready) return <Centered>Loading…</Centered>;
  if (recovery && session) return <SetPassword onDone={() => setRecovery(false)} />;
  if (!session) return <Login />;
  if (isAuthor === null) return <Centered>Checking access…</Centered>;
  if (!isAuthor)
    return (
      <Centered>
        <p className="font-display text-xl font-black uppercase">No blog access</p>
        <p className="mt-3 max-w-sm text-white/60">
          {session.user.email} isn&apos;t on the OZMO authors list. Ask the site admin to add you, then sign in again.
        </p>
        <button className="btn-ghost mt-6" onClick={() => getSupabase().auth.signOut()}>
          Sign out
        </button>
      </Centered>
    );

  return <Portal email={session.user.email ?? ""} />;
}

function Portal({ email }: { email: string }) {
  const [section, setSection] = useState<"blog" | "offers">("blog");
  const [view, setView] = useState<View>({ kind: "list" });
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "draft" | "published">("all");
  const [q, setQ] = useState("");

  const load = useCallback(async () => {
    const { data, error } = await getSupabase()
      .from("posts")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) setError(error.message);
    else setPosts(data as Post[]);
  }, []);

  useEffect(() => {
    // Initial fetch of the author's posts on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const shown = (posts ?? []).filter(
    (p) => (filter === "all" || p.status === filter) && p.title.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-ink/95 backdrop-blur">
        <div className="wrap flex h-16 items-center gap-4">
          <Logo className="h-8 w-auto" />
          <nav className="flex gap-1 rounded-full border border-white/10 p-1 text-sm font-bold">
            {(
              [
                ["blog", "Blog posts"],
                ["offers", "Offers"],
              ] as const
            ).map(([key, text]) => (
              <button
                key={key}
                onClick={() => {
                  setSection(key);
                  setView({ kind: "list" });
                }}
                className={`rounded-full px-4 py-1.5 transition ${section === key ? "bg-brand text-ink" : "text-white/70 hover:text-white"}`}
              >
                {text}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 text-sm">
            <Link href="/blog" target="_blank" className="hidden items-center gap-1 text-white/70 hover:text-brand sm:flex">
              View blog <ExternalLink size={14} />
            </Link>
            <span className="hidden text-white/40 md:inline">{email}</span>
            <button
              className="flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-white/80 hover:border-brand hover:text-brand"
              onClick={() => getSupabase().auth.signOut()}
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>

      {section === "offers" ? (
        <OffersAdmin />
      ) : view.kind === "edit" ? (
        <PostEditor
          post={view.post}
          authorEmail={email}
          onClose={() => {
            setView({ kind: "list" });
            void load();
          }}
        />
      ) : (
        <div className="wrap py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-black uppercase">Blog posts</h1>
              <p className="mt-1 text-white/55">Write, edit and publish articles for the OZMO website.</p>
            </div>
            <button className="btn-primary" onClick={() => setView({ kind: "edit", post: null })}>
              <Plus size={18} /> New post
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {(["all", "draft", "published"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`chip capitalize ${filter === f ? "border-brand bg-brand text-ink" : "border-white/15 text-white/70"}`}
              >
                {f === "all" ? "All" : f === "draft" ? "Drafts" : "Published"}
              </button>
            ))}
            <label className="ml-auto flex items-center gap-2 rounded-full border border-white/10 bg-surface px-4 py-2">
              <Search size={16} className="text-white/40" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search titles"
                className="w-40 bg-transparent text-sm outline-none placeholder:text-white/35"
              />
            </label>
          </div>

          {error && <p className="mt-6 rounded-xl bg-red-500/10 px-4 py-3 text-red-300">{error}</p>}

          <div className="card mt-6 overflow-hidden">
            {posts === null ? (
              <p className="p-8 text-center text-white/50">Loading posts…</p>
            ) : shown.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="mx-auto text-white/25" size={40} />
                <p className="mt-4 text-white/60">
                  {posts.length === 0 ? "No posts yet — write the first one." : "No posts match this filter."}
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-white/10">
                {shown.map((p) => (
                  <li key={p.id} className="flex flex-wrap items-center gap-4 p-4 md:p-5">
                    <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                      {p.cover_image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.cover_image} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold">{p.title}</p>
                      <p className="mt-1 text-sm text-white/50">
                        {p.category ?? "No category"} · updated {formatDate(p.updated_at)}
                        {p.status === "published" && p.published_at ? ` · published ${formatDate(p.published_at)}` : ""}
                      </p>
                    </div>
                    <span
                      className={`chip border-transparent text-xs uppercase tracking-wider ${
                        p.status === "published" ? "bg-brand text-ink" : "bg-white/10 text-white/70"
                      }`}
                    >
                      {p.status}
                    </span>
                    <div className="flex gap-2">
                      {p.status === "published" && (
                        <Link href={`/blog/${p.slug}`} target="_blank" className="btn-ghost px-4 py-2 text-sm">
                          View <ExternalLink size={14} />
                        </Link>
                      )}
                      <button className="btn-primary px-4 py-2 text-sm" onClick={() => setView({ kind: "edit", post: p })}>
                        <Pencil size={14} /> Edit
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ kind: "error" | "info"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const { error } = await getSupabase().auth.signInWithPassword({ email, password });
    if (error) setMsg({ kind: "error", text: error.message === "Invalid login credentials" ? "Wrong email or password." : error.message });
    setBusy(false);
  }

  async function forgot() {
    if (!email) return setMsg({ kind: "error", text: "Enter your email first, then click “Forgot password”." });
    const { error } = await getSupabase().auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/admin` });
    setMsg(error ? { kind: "error", text: error.message } : { kind: "info", text: "Check your email for a reset link." });
  }

  return (
    <Centered>
      <Logo className="mx-auto h-12 w-auto" />
      <h1 className="mt-6 font-display text-2xl font-black uppercase">Blog portal</h1>
      <p className="mt-1 text-white/55">Sign in with your OZMO team account.</p>
      <form onSubmit={onSubmit} className="mt-8 w-full max-w-sm space-y-4 text-left">
        <input className="field" type="email" required placeholder="Email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="field" type="password" required placeholder="Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {msg && (
          <p className={`rounded-xl px-4 py-3 text-sm ${msg.kind === "error" ? "bg-red-500/10 text-red-300" : "bg-brand/15 text-brand"}`}>{msg.text}</p>
        )}
        <button className="btn-primary w-full" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <button type="button" onClick={forgot} className="w-full text-center text-sm text-white/50 hover:text-brand">
          Forgot password?
        </button>
      </form>
    </Centered>
  );
}

function SetPassword({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.length < 8) return setError("Use at least 8 characters.");
    const { error } = await getSupabase().auth.updateUser({ password });
    if (error) setError(error.message);
    else onDone();
  }

  return (
    <Centered>
      <h1 className="font-display text-2xl font-black uppercase">Set a new password</h1>
      <form onSubmit={onSubmit} className="mt-6 w-full max-w-sm space-y-4">
        <input className="field" type="password" placeholder="New password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
        <button className="btn-primary w-full">Save password</button>
      </form>
    </Centered>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">{children}</div>;
}

"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/** Browser Supabase client for the blog portal (session kept in localStorage). */
export function getSupabase() {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error("Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL / ANON_KEY).");
    client = createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true } });
  }
  return client;
}

/** Tell the public site to refresh its cached blog pages. */
export async function refreshPublicBlog() {
  const { data } = await getSupabase().auth.getSession();
  const token = data.session?.access_token;
  if (!token) return;
  await fetch("/api/revalidate-blog", { method: "POST", headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
}

/** Shrink large photos in the browser before upload (max 1600px, JPEG). GIF/SVG are uploaded as-is. */
export async function prepareImage(file: File): Promise<Blob> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size < 600_000) return file;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b ?? file), "image/jpeg", 0.82));
}

/** Upload an image to the public `blog-images` bucket and return its URL. */
export async function uploadBlogImage(file: File): Promise<string> {
  const supabase = getSupabase();
  const blob = await prepareImage(file);
  const ext = blob.type === "image/jpeg" ? "jpg" : (file.name.split(".").pop() ?? "img").toLowerCase();
  const base = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40) || "image";
  const d = new Date();
  const path = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${crypto.randomUUID().slice(0, 8)}-${base}.${ext}`;
  const { error } = await supabase.storage
    .from("blog-images")
    .upload(path, blob, { cacheControl: "31536000", contentType: blob.type || file.type, upsert: false });
  if (error) throw new Error(error.message);
  return supabase.storage.from("blog-images").getPublicUrl(path).data.publicUrl;
}

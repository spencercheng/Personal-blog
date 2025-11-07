// src/utils/storage.js
const LS_KEY = "cleanblog:userPosts:v1";

// ---- LocalStorage helpers ----
export function loadUserPosts() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUserPost(post) {
  const existing = loadUserPosts();
  const idx = existing.findIndex(p => p.slug === post.slug);
  if (idx >= 0) existing[idx] = post; else existing.unshift(post); // newest first
  localStorage.setItem(LS_KEY, JSON.stringify(existing));
  return post;
}

// Merge sample + user posts, newest first by createdAt (fallback date string)
export function getAllPosts(samplePosts = []) {
  const user = loadUserPosts();
  const parseDate = d => {
    // allow ISO or "Nov 3, 2025"
    const ts = Date.parse(d);
    return Number.isNaN(ts) ? 0 : ts;
  };
  const merged = [...user, ...samplePosts];
  return merged.sort((a, b) => (parseDate(b.createdAt || b.date) - parseDate(a.createdAt || a.date)));
}

// Simple slugify
export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

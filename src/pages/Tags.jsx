import { Link, useLocation } from "react-router-dom";
import { samplePosts, allTags } from "../data/posts.js";
import { getAllPosts } from "../utils/storage.js";

function useQuery() {
  const params = new URLSearchParams(useLocation().search);
  return Object.fromEntries(params.entries());
}

export default function Tags() {
  const { tag, search } = useQuery();
  const q = (search || "").toLowerCase();

  let filtered = getAllPosts(samplePosts);
  if (tag)
    filtered = filtered.filter(
      (p) => p.tag.toLowerCase() === tag.toLowerCase()
    );
  if (q)
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
    );

  return (
    <div className="panel" style={{ marginTop: 20 }}>
      <h2 style={{ marginTop: 0 }}>Tags & Search</h2>
      <p className="meta">
        Click a tag below or use the search box in the header to find posts.
      </p>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          margin: "10px 0 16px",
        }}
      >
        {allTags.map((t) => (
          <Link
            className="chip"
            key={t}
            to={`/tags?tag=${encodeURIComponent(t)}`}
          >
            {t}
          </Link>
        ))}
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid var(--card-border)",
          margin: "16px 0",
        }}
      />

      <div className="grid" style={{ marginTop: 16 }}>
        {filtered.map((p) => (
          <article className="card" key={p.slug}>
            <div className="thumb" />
            <div className="body">
              <span
                className="chip"
                style={{ background: p.tagColor || "var(--brand)" }}
              >
                {p.tag.toUpperCase()}
              </span>
              <h3>
                <Link to={`/post/${p.slug}`}>{p.title}</Link>
              </h3>
              <p className="meta">
                {p.date} · {p.read} min read · {p.category}
              </p>
              <p>{p.excerpt}</p>
            </div>
          </article>
        ))}
        {!filtered.length && (
          <p style={{ marginTop: 16, color: "var(--muted)" }}>
            No matches found.
          </p>
        )}
      </div>
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";
import { posts, allTags } from "../data/posts.js";

function useQuery() {
  const params = new URLSearchParams(useLocation().search);
  return Object.fromEntries(params.entries());
}

export default function Tags() {
  const { tag, search } = useQuery();
  const q = (search || "").toLowerCase();

  let filtered = posts;
  if (tag) filtered = filtered.filter(p => p.tag.toLowerCase() === tag.toLowerCase());
  if (q) filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));

  return (
    <div className="panel" style={{ marginTop: 20 }}>
      <h2 style={{ marginTop: 0 }}>Tags & Search</h2>
      <p className="meta">Click a tag or use the search in the header.</p>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", margin:"10px 0 16px" }}>
        {allTags.map(t => <Link className="chip" key={t} to={`/tags?tag=${encodeURIComponent(t)}`}>{t}</Link>)}
      </div>
      <hr style={{ border: "none", borderTop: "1px solid var(--card-border)" }} />
      <div className="grid" style={{ marginTop: 16 }}>
        {filtered.map(p => (
          <article className="card" key={p.slug}>
            <div className="thumb" />
            <div className="body">
              <span className="chip" style={{ background: p.tagColor }}>{p.tag.toUpperCase()}</span>
              <h3><Link to={`/post/${p.slug}`}>{p.title}</Link></h3>
              <p className="meta">{p.date} · {p.read} min read · {p.category}</p>
              <p>{p.excerpt}</p>
            </div>
          </article>
        ))}
        {!filtered.length && <p>No matches.</p>}
      </div>
    </div>
  );
}

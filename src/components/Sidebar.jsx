import { Link } from "react-router-dom";

export default function Sidebar({ tags = [] }) {
  return (
    <aside className="panel" aria-label="Sidebar widgets">
      <h3 style={{ margin: "0 0 8px" }}>Popular tags</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        {tags.map(t => (
          <Link className="chip" key={t} to={`/tags?tag=${encodeURIComponent(t)}`}>{t}</Link>
        ))}
      </div>
      <h3 style={{ margin: "8px 0 8px" }}>Recent links</h3>
      <nav className="list">
        <a href="#">How to pick a blog niche</a>
        <a href="#">Titles that don’t feel clickbait</a>
        <a href="#">My writing toolbox (2025)</a>
      </nav>
    </aside>
  );
}

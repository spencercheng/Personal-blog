import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveUserPost, slugify } from "../utils/storage.js";

export default function Write() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [tag, setTag] = useState("note");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [read, setRead] = useState(5);

  const slug = useMemo(() => slugify(title || "untitled"), [title]);

  useEffect(() => {
    // auto-make an excerpt from the first ~160 chars
    if (!excerpt) setExcerpt(content.slice(0, 160));
  }, [content]); // eslint-disable-line

  const onSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const post = {
      // required by the rest of the app
      slug,
      title: title || "Untitled",
      date: now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      createdAt: now.toISOString(),
      read: Number(read) || 5,
      category,
      tag,
      tagColor: tag === "guide" ? "var(--brand-2)" : tag === "opinion" ? "#ef4444" : "var(--brand)",
      excerpt: excerpt || content.slice(0, 160),
      content: content || "No content yet."
    };

    saveUserPost(post);
    alert("Saved! Redirecting to your new post.");
    nav(`/post/${slug}`);
  };

  return (
    <div className="panel" style={{ marginTop: 20 }}>
      <h1 style={{ marginTop: 0 }}>Write a Post</h1>
      <p className="meta">Draft, preview, and publish locally (saved in your browser).</p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          <div>Title</div>
          <input
            type="text"
            placeholder="My awesome blog post"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid var(--card-border)", background: "var(--bg)" }}
          />
        </label>

        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr 1fr" }}>
          <label>
            <div>Category</div>
            <input
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid var(--card-border)", background: "var(--bg)" }}
            />
          </label>
          <label>
            <div>Tag</div>
            <select
              value={tag}
              onChange={e => setTag(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid var(--card-border)", background: "var(--bg)" }}
            >
              <option value="note">note</option>
              <option value="guide">guide</option>
              <option value="opinion">opinion</option>
            </select>
          </label>
          <label>
            <div>Read time (minutes)</div>
            <input
              type="number"
              min={1}
              value={read}
              onChange={e => setRead(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid var(--card-border)", background: "var(--bg)" }}
            />
          </label>
        </div>

        <label>
          <div>Excerpt (optional)</div>
          <textarea
            placeholder="Short summary that appears on the card…"
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            rows={3}
            style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid var(--card-border)", background: "var(--bg)" }}
          />
        </label>

        <label>
          <div>Content (supports simple headings and code blocks)</div>
          <textarea
            placeholder={"Write your post here...\n\n## Section\nParagraph text\n```js\nconsole.log('code');\n```"}
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={12}
            required
            style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid var(--card-border)", background: "var(--bg)" }}
          />
        </label>

        <div className="meta">Slug (auto): <code>{slug}</code></div>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn" type="submit">Publish</button>
          <Link className="btn" to={`/post/${slug}`}>Preview route</Link>
        </div>
      </form>
    </div>
  );
}

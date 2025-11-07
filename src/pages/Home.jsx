import { Link } from "react-router-dom";
import Featured from "../components/Featured.jsx";
import PostCard from "../components/PostCard.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { samplePosts, allTags } from "../data/posts.js";
import { getAllPosts } from "../utils/storage.js";

export default function Home() {
  const posts = getAllPosts(samplePosts);
  const [first, ...rest] = posts;

  // If there are no posts at all (fresh install + cleared storage)
  if (!posts.length) {
    return (
      <div className="container" style={{ marginTop: 24 }}>
        <div className="panel">
          <h2 style={{ marginTop: 0 }}>Welcome to your blog 👋</h2>
          <p className="meta">
            You don’t have any posts yet. Create your first one now.
          </p>
          <Link className="btn" to="/write">Write a post →</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section (Featured + Newsletter) */}
      <section className="hero">
        <div className="container hero-inner">
          <Featured post={first} />
          <aside className="panel newsletter" aria-label="Newsletter signup">
            <h3 style={{ margin: "6px 0 4px" }}>Join the newsletter</h3>
            <p className="meta">Get new posts delivered right to your inbox.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Pretend we subscribed you 😄");
              }}
            >
              <label className="visually-hidden" htmlFor="email">Email address</label>
              <input id="email" type="email" placeholder="you@example.com" required />
              <button className="btn" type="submit">Subscribe</button>
            </form>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid var(--card-border)",
                margin: "16px 0",
              }}
            />
            <h4 style={{ margin: "0 0 8px" }}>About this site</h4>
            <p className="meta">
              Hand-crafted with React so you can copy, paste, and publish fast.
            </p>
            <div style={{ marginTop: 12 }}>
              <Link className="btn" to="/write">Write a post →</Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Latest Posts Grid */}
      <section aria-label="Latest posts">
        <div className="container">
          <div className="grid">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
            {/* If only one post exists, gently suggest writing another */}
            {rest.length === 0 && (
              <article className="card">
                <div className="thumb" />
                <div className="body">
                  <span className="chip">NOTE</span>
                  <h3>Welcome!</h3>
                  <p className="meta">Your blog is live</p>
                  <p>
                    You currently have one post. Add more from{" "}
                    <Link to="/write" className="link">the Write page</Link>.
                  </p>
                </div>
              </article>
            )}
          </div>

          {/* Content + Sidebar */}
          <div className="layout">
            <article className="panel post">
              <header>
                <h1 className="title">Demo Post: Build & Ship a Simple Blog</h1>
                <p className="meta">By You · Updated Nov 5, 2025 · 7 min read</p>
              </header>
              <section className="prose">
                <p>
                  This sample shows typography, spacing, and components. Replace
                  it with your own content or wire up a CMS later.
                </p>
                <h2>Quick start</h2>
                <ol>
                  <li>Create posts from the <Link to="/write">Write</Link> page.</li>
                  <li>Your posts are saved locally (browser storage) for now.</li>
                  <li>When ready, swap storage for a real backend.</li>
                </ol>
              </section>
            </article>

            <Sidebar tags={allTags} />
          </div>
        </div>
      </section>
    </>
  );
}

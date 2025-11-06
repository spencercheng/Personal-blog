import Featured from "../components/Featured.jsx";
import PostCard from "../components/PostCard.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { posts, allTags } from "../data/posts.js";

export default function Home() {
  const [first, ...rest] = posts;
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <Featured post={first} />
          <aside className="panel newsletter" aria-label="Newsletter signup">
            <h3 style={{ margin: "6px 0 4px" }}>Join the newsletter</h3>
            <p className="meta">Get new posts delivered right to your inbox.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Pretend we subscribed you 😄"); }}>
              <label className="visually-hidden" htmlFor="email">Email address</label>
              <input id="email" type="email" placeholder="you@example.com" required />
              <button className="btn" type="submit">Subscribe</button>
            </form>
            <hr style={{ border: "none", borderTop: "1px solid var(--card-border)", margin: "16px 0" }} />
            <h4 style={{ margin: "0 0 8px" }}>About this site</h4>
            <p className="meta">Hand-crafted with React so you can copy, paste, and publish fast.</p>
          </aside>
        </div>
      </section>

      <section aria-label="Latest posts">
        <div className="grid">
          {rest.map(p => <PostCard key={p.slug} post={p} />)}
        </div>

        <div className="layout">
          <article className="panel post">
            <header>
              <h1 className="title">Demo Post: Build & Ship a Simple Blog</h1>
              <p className="meta">By You · Updated Nov 5, 2025 · 7 min read</p>
            </header>
            <section className="prose">
              <p>This sample shows typography, spacing, and components. Replace with your own content or wire up a CMS.</p>
            </section>
          </article>

          <Sidebar tags={allTags} />
        </div>
      </section>
    </>
  );
}

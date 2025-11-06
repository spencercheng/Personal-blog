import { useParams, Link } from "react-router-dom";
import { posts } from "../data/posts.js";

export default function Post() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="panel" style={{ marginTop: 20 }}>
        <h2>Post not found</h2>
        <p>Return to <Link to="/">home</Link>.</p>
      </div>
    );
  }

  return (
    <div className="layout" style={{ marginTop: 26 }}>
      <article className="panel post">
        <header>
          <h1 className="title">{post.title}</h1>
          <p className="meta">{post.date} · {post.read} min read · {post.category}</p>
        </header>
        <section className="prose">
          {/* naive markdown-ish render */}
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) return <h2 key={i}>{line.replace("## ", "")}</h2>;
            if (line.startsWith("```") || line.endsWith("```")) return <pre key={i}><code>{line.replace(/```/g, "")}</code></pre>;
            return <p key={i}>{line}</p>;
          })}
        </section>
      </article>

      <aside className="panel">
        <h3 style={{ marginTop: 0 }}>More posts</h3>
        <nav className="list">
          {posts.filter(p => p.slug !== slug).map(p =>
            <Link key={p.slug} to={`/post/${p.slug}`}>{p.title}</Link>
          )}
        </nav>
      </aside>
    </div>
  );
}

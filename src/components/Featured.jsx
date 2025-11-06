import { Link } from "react-router-dom";

export default function Featured({ post }) {
  if (!post) return null;
  return (
    <article className="featured">
      <div className="cover">Featured</div>
      <div className="content">
        <span className="chip">{post.tag.toUpperCase()}</span>
        <h1 style={{ margin: "10px 0 6px" }}>{post.title}</h1>
        <p className="meta">
          {post.date} · {post.read} min read
        </p>
        <p>{post.excerpt}</p>
        <p><Link className="btn" to={`/post/${post.slug}`}>Read the post →</Link></p>
      </div>
    </article>
  );
}

import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <article className="card">
      <div className="thumb" />
      <div className="body">
        <span className="chip" style={{ background: post.tagColor }}>{post.tag.toUpperCase()}</span>
        <h3><Link to={`/post/${post.slug}`}>{post.title}</Link></h3>
        <p className="meta">{post.date} · {post.read} min read · {post.category}</p>
        <p>{post.excerpt}</p>
      </div>
    </article>
  );
}

import { useParams, Link } from "react-router-dom";
import { samplePosts } from "../data/posts.js";
import { getAllPosts } from "../utils/storage.js";

export default function Post() {
  const { slug } = useParams();
  const posts = getAllPosts(samplePosts);
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="panel" style={{ marginTop: 20 }}>
        <h2>Post not found</h2>
        <p>
          Return to <Link to="/">home</Link>.
        </p>
      </div>
    );
  }

  // Split the markdown-like content into paragraphs / headings / code blocks
  const renderContent = (text) => {
    const lines = text.split("\n");
    const elements = [];
    let codeBuffer = null;

    lines.forEach((line, i) => {
      // Handle code fences ``` (start or end)
      if (line.trim().startsWith("```")) {
        if (codeBuffer === null) {
          codeBuffer = []; // start code block
        } else {
          // end code block
          elements.push(
            <pre key={`code-${i}`}>
              <code>{codeBuffer.join("\n")}</code>
            </pre>
          );
          codeBuffer = null;
        }
      } else if (codeBuffer !== null) {
        codeBuffer.push(line);
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={`h2-${i}`}>{line.replace(/^##\\s*/, "")}</h2>
        );
      } else if (line.trim()) {
        elements.push(<p key={`p-${i}`}>{line}</p>);
      }
    });

    return elements;
  };

  const otherPosts = posts.filter((p) => p.slug !== slug);

  return (
    <div className="layout" style={{ marginTop: 26 }}>
      <article className="panel post">
        <header>
          <h1 className="title">{post.title}</h1>
          <p className="meta">
            {post.date} · {post.read} min read · {post.category}
          </p>
        </header>
        <section className="prose">{renderContent(post.content)}</section>
      </article>

      <aside className="panel">
        <h3 style={{ marginTop: 0 }}>More posts</h3>
        <nav className="list">
          {otherPosts.map((p) => (
            <Link key={p.slug} to={`/post/${p.slug}`}>
              {p.title}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}

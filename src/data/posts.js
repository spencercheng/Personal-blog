// src/data/posts.js

export const samplePosts = [
  {
    slug: "designing-a-calm-blog-layout",
    title: "Designing a Calm Blog Layout",
    date: "Nov 3, 2025",
    read: 8,
    category: "UI/UX",
    tag: "guide",
    tagColor: "var(--brand-2)",
    excerpt:
      "Balance whitespace, hierarchy, and rhythm to make longer reads feel effortless. Here’s a practical checklist…",
    content: `
## What's inside this template?

- Accessible header with sticky nav and search
- Featured post hero
- Responsive grid of post cards
- Two-column layout + sidebar
- Light/dark theme toggle with localStorage

\`\`\`html
<!-- Tip: duplicate a PostCard to add more posts -->
<article class="card">…</article>
\`\`\`
    `.trim()
  },
  {
    slug: "why-i-switched-to-writing-daily",
    title: "Why I Switched to Writing Daily",
    date: "Oct 29, 2025",
    read: 4,
    category: "Habits",
    tag: "note",
    tagColor: "var(--brand)",
    excerpt:
      "Showing up every day compounds creativity. These are the prompts and constraints that helped me stick to it.",
    content: `
Consistency beats intensity. Start small, keep score, and protect a short daily window for writing.
    `.trim()
  },
  {
    slug: "craft-over-clickbait",
    title: "Craft > Clickbait",
    date: "Oct 21, 2025",
    read: 5,
    category: "Writing",
    tag: "opinion",
    tagColor: "#ef4444",
    excerpt:
      "Algorithms come and go, but craft endures. Let’s double down on clear thinking, not cheap tricks.",
    content: `
Clickbait fades; clarity lasts. Write for your future self and your best readers.
    `.trim()
  }
];

export const allTags = ["design", "writing", "product", "career", "life"];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container foot">
        <p>© {year} Clean Blog. Built with ♥ and React.</p>
        <nav style={{ display: "flex", gap: 10 }}>
          <a href="#">RSS</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </footer>
  );
}

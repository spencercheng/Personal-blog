import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const key = "cleanblog:theme";
    const saved = localStorage.getItem(key);
    const preferredDark = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", preferredDark);
    setIsDark(preferredDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("cleanblog:theme", next ? "dark" : "light");
    setIsDark(next);
  };

  const onSearch = (e) => {
    if (e.key === "Enter") {
      const q = e.currentTarget.value.trim();
      if (q) navigate(`/tags?search=${encodeURIComponent(q)}`);
    }
  };

  return (
    <header>
      <div className="container nav">
        <div className="brand" aria-label="Home">
          <div className="logo">B</div>
          <Link to="/">Clean Blog</Link>
        </div>

        <NavLink className="link" to="/">Home</NavLink>
        <NavLink className="link" to="/tags">Tags</NavLink>
        <NavLink className="link" to="/about">About</NavLink>

        <div className="spacer" />

        <div className="search" role="search">
          <input type="search" placeholder="Search posts…" aria-label="Search posts" onKeyDown={onSearch}/>
          <span className="icon">⌘K</span>
        </div>

        <button className="btn" onClick={toggleTheme} aria-pressed={isDark} aria-label="Toggle dark mode">
          {isDark ? "🌞" : "🌙"} Theme
        </button>
      </div>
    </header>
  );
}

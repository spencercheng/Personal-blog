import { Routes, Route } from "react-router-dom";
import Header from "./components/header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Post from "./pages/Post.jsx";
import About from "./pages/About.jsx";
import Tags from "./pages/Tags.jsx";
import Write from "./pages/Write.jsx";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<Post />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/about" element={<About />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

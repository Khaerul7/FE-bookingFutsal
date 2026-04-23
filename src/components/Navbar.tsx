import { useState, useEffect } from "react";
import { Link, } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Beranda", "Lapangan", "Ulasan", "Kontak"];

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(15,23,42,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(245,158,11,0.15)" : "none",
        transition: "all 0.4s ease",
        padding: "0 1.5rem",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 12, fontFamily: "'Bebas Neue', sans-serif" }}>R9</span>
          </div>
          <span className="font-display" style={{ color: "#fff", fontSize: 26, letterSpacing: 2 }}>
            RUL<span style={{ color: "#f59e0b" }}>09</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button key={l} className="nav-link" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.85)", cursor: "pointer", fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}>
              {l}
            </button>
          ))}
        </div>

        {/* Hamburger - Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="flex md:hidden"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
          aria-label="Toggle menu"
        >
          <div style={{ width: 24, height: 20, position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span className="hamburger-line" style={{ display: "block", height: 2.5, background: "#fff", borderRadius: 2, transform: open ? "translateY(8.75px) rotate(45deg)" : "none" }} />
            <span className="hamburger-line" style={{ display: "block", height: 2.5, background: "#fff", borderRadius: 2, opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "none" }} />
            <span className="hamburger-line" style={{ display: "block", height: 2.5, background: "#fff", borderRadius: 2, transform: open ? "translateY(-8.75px) rotate(-45deg)" : "none" }} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden"
        style={{
          overflow: "hidden",
          maxHeight: open ? 320 : 0,
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
          background: "rgba(15,23,42,0.98)",
          borderTop: open ? "1px solid rgba(245,158,11,0.2)" : "none",
        }}
      >
        <div style={{ padding: "12px 0 16px" }}>
          {links.map((l) => (
            <button key={l} onClick={() => setOpen(false)} className="nav-btn" style={{ display: "block", width: "100%", background: "none", border: "none", color: "rgba(255,255,255,0.85)", padding: "12px 20px", textAlign: "left", cursor: "pointer", fontSize: 15, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}>
              {l}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

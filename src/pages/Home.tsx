import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Stars from "../components/Stars";
import { fields, reviews } from "../data/mockData";

// ── Hero ─────────────────────────────────────────────────────────────────────
const HeroSection = () => (
  <section style={{ position: "relative", minHeight: "60vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
    <img
      src="https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=1400&q=80"
      alt="hero"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(15,23,42,0.88) 0%,rgba(15,23,42,0.65) 60%,rgba(15,23,42,0.75) 100%)" }} />
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(245,158,11,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

    <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", width: "100%", paddingTop: 80, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

      <div className="animate-in delay-1" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
        <span className="hero-badge" style={{ color: "#0f172a", fontWeight: 700, fontSize: 11, padding: "4px 12px", borderRadius: 99, letterSpacing: 1.5, textTransform: "uppercase" }}>
          #1 Futsal Arena di Brebes
        </span>
      </div>

      <h1 className="font-display animate-in delay-2" style={{ fontSize: "clamp(32px,5vw,60px)", color: "#fff", lineHeight: 1, letterSpacing: 3, marginBottom: 24, whiteSpace: "nowrap" }}>
        BOOK <span style={{ color: "#f59e0b" }}>LAPANGAN</span> SEKARANG
      </h1>

      <p className="animate-in delay-3" style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(14px,2vw,17px)", maxWidth: 520, lineHeight: 1.7, marginBottom: 40, fontWeight: 400 }}>
        Fasilitas premium, lapangan berkualitas internasional. Nikmati pengalaman futsal terbaik di{" "}
        <strong style={{ color: "#f59e0b" }}>Kaligangsa, Brebes</strong> — buka setiap hari.
      </p>

      <div className="animate-in delay-4" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button className="btn-gold" style={{ background: "#f59e0b", color: "#0f172a", border: "none", borderRadius: 10, padding: "14px 32px", fontWeight: 800, cursor: "pointer", fontSize: 15, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: 0.5 }}>
          Lihat Lapangan →
        </button>
        <button className="btn-ghost" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: 10, padding: "14px 28px", fontWeight: 600, cursor: "pointer", fontSize: 15, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Hubungi Kami
        </button>
      </div>
    </div>
  </section>
);

// ── Fields ────────────────────────────────────────────────────────────────────
const FieldsSection = () => {
  const [filter, setFilter] = useState<"all" | "available" | "occupied">("all");

  const filtered = fields.filter((f) =>
    filter === "all" ? true : f.status === filter
  );

  return (
    <section style={{ padding: "80px 1.5rem", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 40, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>— Koleksi Lapangan</p>
            <h2 className="font-display" style={{ fontSize: "clamp(32px,5vw,52px)", color: "#0f172a", letterSpacing: 1, lineHeight: 1 }}>PILIH LAPANGANMU</h2>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: "flex", gap: 8, background: "#e2e8f0", padding: 4, borderRadius: 10, alignSelf: "center" }}>
            {(["all", "available", "occupied"] as const).map((val) => (
              <button
                key={val}
                className="filter-btn"
                onClick={() => setFilter(val)}
                style={{
                  padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer",
                  fontWeight: 600, fontSize: 13, fontFamily: "'Plus Jakarta Sans',sans-serif",
                  background: filter === val ? "#0f172a" : "transparent",
                  color: filter === val ? "#fff" : "#475569",
                }}
              >
                {val === "all" ? "Semua" : val === "available" ? "Tersedia" : "Dipakai"}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((f) => (
            <div key={f.id} className="card-hover" style={{ background: "#fff", borderRadius: 16, overflow: "hidden", cursor: "pointer", border: "1px solid #e2e8f0" }}>
              <div style={{ position: "relative", height: 180 }}>
                <img src={f.img} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(15,23,42,0.5),transparent 60%)" }} />
                <span style={{
                  position: "absolute", top: 12, right: 12, padding: "4px 10px", borderRadius: 99,
                  fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
                  background: f.status === "available" ? "rgba(220,252,231,0.92)" : "rgba(254,226,226,0.92)",
                  color: f.status === "available" ? "#15803d" : "#b91c1c",
                }}>
                  {f.status === "available" ? "✓ Tersedia" : "✗ Dipakai"}
                </span>
              </div>
              <div style={{ padding: "16px 18px 18px" }}>
                <p style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginBottom: 4, letterSpacing: 0.5 }}>{f.venue}</p>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", marginBottom: 10 }}>{f.name}</h3>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Stars count={f.rating} size={13} />
                    <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>{f.rating}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 17, fontWeight: 800, color: "#0f172a" }}>
                      Rp {f.price.toLocaleString("id-ID")}
                    </span>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>/sesi</span>
                  </div>
                </div>
                <button
                  className={f.status === "available" ? "btn-navy" : ""}
                  style={{
                    marginTop: 14, width: "100%",
                    background: f.status === "available" ? "#0f172a" : "#e2e8f0",
                    color: f.status === "available" ? "#fff" : "#94a3b8",
                    border: "none", borderRadius: 9, padding: "10px 0",
                    fontWeight: 700, cursor: f.status === "available" ? "pointer" : "not-allowed",
                    fontSize: 13, fontFamily: "'Plus Jakarta Sans',sans-serif",
                  }}
                  disabled={f.status === "occupied"}
                >
                  {f.status === "available" ? "Pesan Sekarang" : "Sedang Digunakan"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Reviews ───────────────────────────────────────────────────────────────────
const ReviewsSection = () => (
  <section style={{ padding: "80px 0", background: "#0f172a", overflow: "hidden" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
      <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>— Testimoni</p>
      <h2 className="font-display" style={{ fontSize: "clamp(32px,5vw,52px)", color: "#fff", letterSpacing: 1, marginBottom: 8 }}>APA KATA MEREKA</h2>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 40 }}>Ratusan pemain sudah memercayai RUL09 sebagai arena terbaik mereka.</p>

      {/* Grid: 2 kolom di HP, 3 kolom di desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {reviews.map((r) => (
          <div key={r.id} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14 }} className="p-3 md:p-5">
            <Stars count={r.stars} size={12} />
            <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: "8px 0 14px", fontStyle: "italic" }} className="text-xs md:text-sm">
              "{r.text}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#d97706)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} className="w-7 h-7 md:w-9 md:h-9">
                <span style={{ color: "#0f172a", fontWeight: 800 }} className="text-xs md:text-sm">{r.avatar}</span>
              </div>
              <div>
                <p style={{ color: "#fff", fontWeight: 700 }} className="text-xs md:text-sm">{r.name}</p>
                <p style={{ color: "rgba(255,255,255,0.4)" }} className="text-xs">Member Aktif</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const Home = () => (
  <div>
    <Navbar />
    <HeroSection />
    <FieldsSection />
    <ReviewsSection />
    <Footer />
  </div>
);

export default Home;

const Footer = () => (
  <footer style={{ background: "#0a1020", borderTop: "1px solid rgba(245,158,11,0.15)", padding: "56px 1.5rem 32px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

        {/* Col 1 — Brand + Lokasi */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 13, fontFamily: "'Bebas Neue', sans-serif" }}>R9</span>
            </div>
            <span className="font-display" style={{ color: "#fff", fontSize: 28, letterSpacing: 2 }}>
              RUL<span style={{ color: "#f59e0b" }}>09</span>
            </span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.8 }}>
            Arena futsal premium dengan fasilitas terbaik untuk pengalaman bermain yang tak terlupakan.
          </p>
          <div style={{ marginTop: 16, display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span style={{ color: "#f59e0b", fontSize: 14 }}>📍</span>
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.6 }}>
              Jl. Raya Kaligangsa,<br />Kaligangsa, Brebes, Jawa Tengah
            </span>
          </div>
        </div>

        {/* Col 2 — Kontak */}
        <div>
          <h4 style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Kontak</h4>
          {[
            ["✉️", "rul09futsal@gmail.com"],
            ["💬", "+62 812-3456-7890 (WhatsApp)"],
            ["⏰", "Buka 07.00 – 23.00 WIB"],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: 14 }}>{icon}</span>
              <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.5 }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Col 3 — Sosial Media */}
        <div>
          <h4 style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Sosial Media</h4>
          <div style={{ display: "flex", gap: 10 }}>
            {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
              <button key={i} className="btn-social" style={{ width: 40, height: 40, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 17, transition: "all 0.2s" }}>
                {icon}
              </button>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 20, lineHeight: 1.7 }}>
            Follow kami untuk info promo &amp; jadwal booking terbaru!
          </p>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>© 2025 RUL09 Futsal Arena. All rights reserved.</p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>Kaligangsa, Brebes, Jawa Tengah</p>
      </div>
    </div>
  </footer>
);

export default Footer;

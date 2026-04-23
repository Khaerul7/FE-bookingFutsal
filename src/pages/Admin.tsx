import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { adminFields, bookings, members, laporanBulanan } from "../data/mockData";

const menuItems = [
  { id: "dashboard", icon: "⊞", label: "Dashboard" },
  { id: "lapangan",  icon: "⬡", label: "Lapangan"  },
  { id: "booking",   icon: "📅", label: "Booking"   },
  { id: "member",    icon: "👥", label: "Member"    },
  { id: "laporan",   icon: "📊", label: "Laporan"   },
];

// ── Sidebar ───────────────────────────────────────────────────────────────────
interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (id: string) => void;
  onLogout: () => void;
}

const Sidebar = ({ activeMenu, setActiveMenu, onLogout }: SidebarProps) => (
  <aside style={{ width: 240, background: "#0f172a", borderRight: "1px solid rgba(245,158,11,0.1)", display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0, flexShrink: 0 }}>
    <div style={{ padding: "28px 20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="font-display" style={{ color: "#fff", fontSize: 15 }}>R9</span>
        </div>
        <div>
          <span className="font-display" style={{ color: "#fff", fontSize: 22, letterSpacing: 2 }}>RUL<span style={{ color: "#f59e0b" }}>09</span></span>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, letterSpacing: 1 }}>ADMIN PANEL</p>
        </div>
      </div>
    </div>
    <nav style={{ padding: "16px 12px", flex: 1 }}>
      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: 2, padding: "0 8px", marginBottom: 10 }}>NAVIGASI</p>
      {menuItems.map((m) => (
        <button key={m.id} onClick={() => setActiveMenu(m.id)}
          className={`sidebar-link ${activeMenu === m.id ? "active" : ""}`}
          style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "11px 12px", background: "none", border: "none", cursor: "pointer", color: activeMenu === m.id ? "#f59e0b" : "rgba(255,255,255,0.6)", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 14, textAlign: "left", marginBottom: 2 }}>
          <span style={{ fontSize: 16 }}>{m.icon}</span>
          {m.label}
        </button>
      ))}
    </nav>
    <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <button onClick={onLogout}
        className="btn-logout" style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", background: "none", border: "none", cursor: "pointer", color: "rgba(255,100,100,0.8)", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 13, borderRadius: 8 }}>
        ⎋ Logout
      </button>
    </div>
  </aside>
);

// ── Shared Styles ─────────────────────────────────────────────────────────────
const tableWrap: React.CSSProperties = { background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" };
const tableHead: React.CSSProperties = { padding: "12px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" };
const tableCell: React.CSSProperties = { padding: "14px 20px" };

const AddButton = ({ label }: { label: string }) => (
  <button className="btn-navy" style={{ background: "#0f172a", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
    + {label}
  </button>
);

const PageHeader = ({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
    <div>
      <p style={{ color: "#64748b", fontSize: 14 }}>{subtitle}</p>
      <h2 className="font-display" style={{ fontSize: "clamp(24px,4vw,36px)", color: "#0f172a", letterSpacing: 0.5 }}>{title}</h2>
    </div>
    {action}
  </div>
);

// ── 1. DASHBOARD ─────────────────────────────────────────────────────────────
const DashboardPage = () => {
  const total     = adminFields.length;
  const available = adminFields.filter((f) => f.status === "available").length;
  const occupied  = adminFields.filter((f) => f.status === "occupied").length;

  return (
    <>
      <PageHeader title="PANEL ADMIN RUL09" subtitle="Selamat datang kembali 👋" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Lapangan", value: total,     color: "#3b82f6", bg: "#eff6ff", icon: "⬡", desc: "Semua lapangan"     },
          { label: "Tersedia",       value: available, color: "#10b981", bg: "#ecfdf5", icon: "✓", desc: "Siap digunakan"     },
          { label: "Sedang Dipakai", value: occupied,  color: "#ef4444", bg: "#fef2f2", icon: "●", desc: "Sedang berlangsung" },
        ].map((s) => (
          <div key={s.label} className="stat-card" style={{ background: "#fff", borderRadius: 14, padding: "20px 20px 18px", border: "1px solid #e2e8f0", borderLeft: `4px solid ${s.color}` }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <p style={{ color: "#64748b", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{s.label}</p>
                <p className="font-display" style={{ fontSize: 36, color: "#0f172a", lineHeight: 1, letterSpacing: 1 }}>{s.value}</p>
              </div>
              <div style={{ width: 40, height: 40, background: s.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: s.color, fontSize: 20 }}>{s.icon}</span>
              </div>
            </div>
            <p style={{ color: "#94a3b8", fontSize: 11, fontWeight: 500 }}>{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Booking",    value: `${bookings.length}`,               sub: "Semua booking",    color: "#f59e0b" },
          { label: "Total Member",     value: `${members.length}`,                sub: "Member terdaftar", color: "#8b5cf6" },
          { label: "Pendapatan Bulan", value: "Rp 9.800.000",                     sub: "April 2025",       color: "#10b981" },
        ].map((s) => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, background: `${s.color}18`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: 12, height: 12, background: s.color, borderRadius: "50%" }} />
            </div>
            <div>
              <p style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginBottom: 3 }}>{s.label}</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>{s.value}</p>
              <p style={{ fontSize: 11, color: "#cbd5e1" }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={tableWrap}>
        <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #f1f5f9" }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>Booking Terbaru</h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: "#f8fafc" }}>
              {["Kode", "Nama", "Lapangan", "Tanggal", "Status"].map(h => <th key={h} style={tableHead}>{h}</th>)}
            </tr></thead>
            <tbody>
              {bookings.slice(0, 5).map(b => (
                <tr key={b.id} style={{ borderTop: "1px solid #f1f5f9" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <td style={tableCell}><span style={{ fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{b.code}</span></td>
                  <td style={tableCell}><span style={{ fontWeight: 700, color: "#0f172a", fontSize: 14 }}>{b.name}</span></td>
                  <td style={tableCell}><span style={{ fontSize: 13, color: "#475569" }}>{b.lapangan}</span></td>
                  <td style={tableCell}><span style={{ fontSize: 13, color: "#64748b" }}>{b.tanggal}</span></td>
                  <td style={tableCell}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99,
                      background: b.status === "confirmed" ? "#dcfce7" : b.status === "pending" ? "#fef9c3" : "#fee2e2",
                      color:      b.status === "confirmed" ? "#15803d" : b.status === "pending" ? "#854d0e" : "#b91c1c",
                    }}>{b.status.toUpperCase()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// ── 2. LAPANGAN ───────────────────────────────────────────────────────────────
const LapanganPage = () => (
  <>
    <PageHeader title="KELOLA LAPANGAN" subtitle="Manajemen lapangan" action={<AddButton label="Tambah Lapangan" />} />
    <div style={tableWrap}>
      <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #f1f5f9" }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>Daftar Lapangan</h3>
        <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 2 }}>Total {adminFields.length} lapangan terdaftar</p>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#f8fafc" }}>
            {["Lapangan", "Tipe", "Harga/Sesi", "Sesi Aktif", "Pemesan", "Status", "Aksi"].map(h => <th key={h} style={tableHead}>{h}</th>)}
          </tr></thead>
          <tbody>
            {adminFields.map(f => (
              <tr key={f.id} style={{ borderTop: "1px solid #f1f5f9" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <td style={tableCell}><span style={{ fontWeight: 700, color: "#0f172a", fontSize: 14 }}>{f.name}</span></td>
                <td style={tableCell}>
                  <span style={{ fontSize: 12, color: f.type === "VIP" ? "#7c3aed" : "#0f172a", background: f.type === "VIP" ? "#f3e8ff" : "#f1f5f9", padding: "3px 10px", borderRadius: 6, fontWeight: 700 }}>{f.type}</span>
                </td>
                <td style={tableCell}><span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>Rp {f.type === "VIP" ? "180.000" : "120.000"}</span></td>
                <td style={tableCell}><span style={{ fontSize: 13, color: "#64748b" }}>{f.time}</span></td>
                <td style={tableCell}><span style={{ fontSize: 13, color: f.user ? "#0f172a" : "#cbd5e1", fontWeight: f.user ? 600 : 400 }}>{f.user ?? "—"}</span></td>
                <td style={tableCell}>
                  <span className={f.status === "available" ? "badge-available" : "badge-occupied"}
                    style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 99, letterSpacing: 0.5 }}>
                    {f.status === "available" ? "TERSEDIA" : "DIPAKAI"}
                  </span>
                </td>
                <td style={tableCell}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ padding: "5px 12px", borderRadius: 7, border: "1.5px solid #e2e8f0", background: "none", color: "#475569", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Edit</button>
                    <button style={{ padding: "5px 12px", borderRadius: 7, border: "none", background: "#0f172a", color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Detail</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

// ── 3. BOOKING ────────────────────────────────────────────────────────────────
const BookingPage = () => {
  const confirmed = bookings.filter(b => b.status === "confirmed").length;
  const pending   = bookings.filter(b => b.status === "pending").length;
  const cancelled = bookings.filter(b => b.status === "cancelled").length;

  return (
    <>
      <PageHeader title="KELOLA BOOKING" subtitle="Manajemen reservasi" action={<AddButton label="Tambah Booking" />} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Confirmed", value: confirmed, color: "#10b981" },
          { label: "Pending",   value: pending,   color: "#f59e0b" },
          { label: "Cancelled", value: cancelled, color: "#ef4444" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", border: "1px solid #e2e8f0", borderLeft: `4px solid ${s.color}`, display: "flex", alignItems: "center", gap: 14 }}>
            <p className="font-display" style={{ fontSize: 32, color: s.color, lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#475569" }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div style={tableWrap}>
        <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #f1f5f9" }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>Semua Booking</h3>
          <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 2 }}>Total {bookings.length} booking</p>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: "#f8fafc" }}>
              {["Kode", "Nama", "Lapangan", "Tanggal", "Sesi", "Total", "Status", "Aksi"].map(h => <th key={h} style={tableHead}>{h}</th>)}
            </tr></thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} style={{ borderTop: "1px solid #f1f5f9" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <td style={tableCell}><span style={{ fontFamily: "monospace", fontSize: 12, color: "#64748b", fontWeight: 600 }}>{b.code}</span></td>
                  <td style={tableCell}><span style={{ fontWeight: 700, color: "#0f172a", fontSize: 14 }}>{b.name}</span></td>
                  <td style={tableCell}><span style={{ fontSize: 13, color: "#475569" }}>{b.lapangan}</span></td>
                  <td style={tableCell}><span style={{ fontSize: 13, color: "#64748b" }}>{b.tanggal}</span></td>
                  <td style={tableCell}><span style={{ fontSize: 12, color: "#64748b" }}>{b.sesi}</span></td>
                  <td style={tableCell}><span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Rp {b.total.toLocaleString("id-ID")}</span></td>
                  <td style={tableCell}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99,
                      background: b.status === "confirmed" ? "#dcfce7" : b.status === "pending" ? "#fef9c3" : "#fee2e2",
                      color:      b.status === "confirmed" ? "#15803d" : b.status === "pending" ? "#854d0e" : "#b91c1c",
                    }}>{b.status.toUpperCase()}</span>
                  </td>
                  <td style={tableCell}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn-outline" style={{ padding: "5px 10px", borderRadius: 7, border: "1.5px solid #e2e8f0", background: "none", color: "#475569", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Edit</button>
                      <button className="btn-dark" style={{ padding: "5px 10px", borderRadius: 7, border: "none", background: "#0f172a", color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Detail</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// ── 4. MEMBER ─────────────────────────────────────────────────────────────────
const MemberPage = () => {
  const active   = members.filter(m => m.status === "active").length;
  const inactive = members.filter(m => m.status === "inactive").length;

  return (
    <>
      <PageHeader title="KELOLA MEMBER" subtitle="Manajemen pelanggan" action={<AddButton label="Tambah Member" />} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          { label: "Member Aktif",    value: active,   color: "#10b981" },
          { label: "Member Nonaktif", value: inactive, color: "#94a3b8" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", border: "1px solid #e2e8f0", borderLeft: `4px solid ${s.color}`, display: "flex", alignItems: "center", gap: 14 }}>
            <p className="font-display" style={{ fontSize: 32, color: s.color, lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#475569" }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div style={tableWrap}>
        <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #f1f5f9" }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>Daftar Member</h3>
          <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 2 }}>Total {members.length} member terdaftar</p>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: "#f8fafc" }}>
              {["Nama", "No. HP", "Email", "Booking", "Total Spend", "Bergabung", "Status", "Aksi"].map(h => <th key={h} style={tableHead}>{h}</th>)}
            </tr></thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id} style={{ borderTop: "1px solid #f1f5f9" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <td style={tableCell}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#d97706)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ color: "#fff", fontWeight: 800, fontSize: 13 }}>{m.name[0]}</span>
                      </div>
                      <span style={{ fontWeight: 700, color: "#0f172a", fontSize: 14 }}>{m.name}</span>
                    </div>
                  </td>
                  <td style={tableCell}><span style={{ fontSize: 12, color: "#64748b" }}>{m.phone}</span></td>
                  <td style={tableCell}><span style={{ fontSize: 12, color: "#64748b" }}>{m.email}</span></td>
                  <td style={tableCell}><span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{m.totalBooking}x</span></td>
                  <td style={tableCell}><span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Rp {m.totalSpend.toLocaleString("id-ID")}</span></td>
                  <td style={tableCell}><span style={{ fontSize: 12, color: "#94a3b8" }}>{m.joinDate}</span></td>
                  <td style={tableCell}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99,
                      background: m.status === "active" ? "#dcfce7" : "#f1f5f9",
                      color:      m.status === "active" ? "#15803d" : "#94a3b8",
                    }}>{m.status === "active" ? "AKTIF" : "NONAKTIF"}</span>
                  </td>
                  <td style={tableCell}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn-outline" style={{ padding: "5px 10px", borderRadius: 7, border: "1.5px solid #e2e8f0", background: "none", color: "#475569", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Edit</button>
                      <button className="btn-dark" style={{ padding: "5px 10px", borderRadius: 7, border: "none", background: "#0f172a", color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Detail</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// ── 5. LAPORAN ────────────────────────────────────────────────────────────────
const LaporanPage = () => {
  const totalPendapatan = laporanBulanan.reduce((a, b) => a + b.pendapatan, 0);
  const totalBooking    = laporanBulanan.reduce((a, b) => a + b.booking, 0);
  const maxPendapatan   = Math.max(...laporanBulanan.map(l => l.pendapatan));

  return (
    <>
      <PageHeader title="LAPORAN" subtitle="Rekap performa bulanan" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Pendapatan", value: `Rp ${(totalPendapatan / 1000000).toFixed(1)}jt`, color: "#10b981", bg: "#ecfdf5", icon: "💰" },
          { label: "Total Booking",    value: `${totalBooking}`,                                  color: "#f59e0b", bg: "#fffbeb", icon: "📅" },
          { label: "Total Member",     value: `${members.length}`,                                color: "#8b5cf6", bg: "#f5f3ff", icon: "👥" },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ background: "#fff", borderRadius: 14, padding: "20px 20px 18px", border: "1px solid #e2e8f0", borderLeft: `4px solid ${s.color}` }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
              <div>
                <p style={{ color: "#64748b", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{s.label}</p>
                <p className="font-display" style={{ fontSize: 30, color: "#0f172a", lineHeight: 1 }}>{s.value}</p>
              </div>
              <div style={{ width: 40, height: 40, background: s.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
            </div>
            <p style={{ color: "#94a3b8", fontSize: 11 }}>6 bulan terakhir</p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", marginBottom: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>Pendapatan Bulanan</h3>
        <p style={{ color: "#94a3b8", fontSize: 12, marginBottom: 24 }}>Nov 2024 – Apr 2025</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160, paddingBottom: 8 }}>
          {laporanBulanan.map(l => {
            const heightPct = (l.pendapatan / maxPendapatan) * 100;
            return (
              <div key={l.bulan} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1 }}>
                <span style={{ fontSize: 10, color: "#64748b", fontWeight: 600 }}>{(l.pendapatan / 1000000).toFixed(1)}jt</span>
                <div style={{ width: "100%", background: "linear-gradient(to top,#f59e0b,#fbbf24)", borderRadius: "6px 6px 0 0", height: `${heightPct}%`, minHeight: 8 }} />
                <span style={{ fontSize: 10, color: "#94a3b8", textAlign: "center", whiteSpace: "nowrap" }}>{l.bulan}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div style={tableWrap}>
        <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #f1f5f9" }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>Detail Per Bulan</h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: "#f8fafc" }}>
              {["Bulan", "Jumlah Booking", "Member Baru", "Pendapatan"].map(h => <th key={h} style={tableHead}>{h}</th>)}
            </tr></thead>
            <tbody>
              {[...laporanBulanan].reverse().map(l => (
                <tr key={l.bulan} style={{ borderTop: "1px solid #f1f5f9" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <td style={tableCell}><span style={{ fontWeight: 700, color: "#0f172a", fontSize: 14 }}>{l.bulan}</span></td>
                  <td style={tableCell}><span style={{ fontSize: 13, color: "#475569" }}>{l.booking} booking</span></td>
                  <td style={tableCell}><span style={{ fontSize: 13, color: "#475569" }}>{l.member} member</span></td>
                  <td style={tableCell}><span style={{ fontSize: 14, fontWeight: 800, color: "#10b981" }}>Rp {l.pendapatan.toLocaleString("id-ID")}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// ── MAIN ──────────────────────────────────────────────────────────────────────
const Admin = () => {
  const [sideOpen, setSideOpen]     = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => { logout(); navigate("/admin"); };

  const now = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const renderContent = () => {
    switch (activeMenu) {
      case "lapangan": return <LapanganPage />;
      case "booking":  return <BookingPage />;
      case "member":   return <MemberPage />;
      case "laporan":  return <LaporanPage />;
      default:         return <DashboardPage />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <div className="hidden md:flex">
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} onLogout={handleLogout} />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button onClick={() => setSideOpen(!sideOpen)} className="flex md:hidden"
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20 }}>☰</button>
            <div>
              <h1 style={{ fontSize: 17, fontWeight: 800, color: "#0f172a" }}>
                {menuItems.find(m => m.id === activeMenu)?.label ?? "Dashboard"}
              </h1>
              <p style={{ fontSize: 11, color: "#94a3b8" }}>{now}</p>
            </div>
          </div>
          <div style={{ width: 38, height: 38, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>A</span>
          </div>
        </header>

        {sideOpen && (
          <div className="md:hidden" style={{ position: "fixed", inset: 0, zIndex: 200 }}>
            <div onClick={() => setSideOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.6)" }} />
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 256 }}>
              <Sidebar activeMenu={activeMenu}
                setActiveMenu={(id) => { setActiveMenu(id); setSideOpen(false); }}
                onLogout={handleLogout} />
            </div>
          </div>
        )}

        <main style={{ padding: "clamp(16px,3vw,32px)", flex: 1 }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;

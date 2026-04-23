import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/login", { username, password });
      login(res.data.token);
      navigate("/admin/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Login gagal. Coba lagi.");
      } else {
        setError("Terjadi kesalahan. Coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1400&q=80"
        alt="bg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.75)" }} />
      <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(3px)" }} />

      {/* Card */}
      <div className="glass-card animate-in" style={{ position: "relative", width: "100%", maxWidth: 420, margin: "1.5rem", borderRadius: 24, padding: "clamp(28px,5vw,44px)" }}>

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 13, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 24, display: "flex", alignItems: "center", gap: 6, padding: 0 }}
        >
          ← Kembali ke Beranda
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <span className="font-display" style={{ color: "#fff", fontSize: 22, letterSpacing: 1 }}>R9</span>
          </div>
          <h1 className="font-display" style={{ fontSize: 32, color: "#0f172a", letterSpacing: 1 }}>ADMIN LOGIN</h1>
          <p style={{ color: "#64748b", fontSize: 13, marginTop: 6 }}>Masuk ke panel pengelola RUL09</p>
        </div>

        {/* Username */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 7, letterSpacing: 0.5 }}>
            USERNAME
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Masukkan username"
            autoComplete="username"
            style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "12px 14px", fontSize: 14, fontFamily: "'Plus Jakarta Sans',sans-serif", outline: "none", background: "rgba(255,255,255,0.8)", color: "#0f172a" }}
            onFocus={(e) => (e.target.style.borderColor = "#f59e0b")}
            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: error ? 12 : 24 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 7, letterSpacing: 0.5 }}>
            PASSWORD
          </label>
          <div style={{ position: "relative" }}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              type={showPass ? "text" : "password"}
              placeholder="Masukkan password"
              autoComplete="current-password"
              style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "12px 44px 12px 14px", fontSize: 14, fontFamily: "'Plus Jakarta Sans',sans-serif", outline: "none", background: "rgba(255,255,255,0.8)", color: "#0f172a" }}
              onFocus={(e) => (e.target.style.borderColor = "#f59e0b")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 16 }}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: "#dc2626", fontSize: 12, marginBottom: 16, background: "#fef2f2", padding: "8px 12px", borderRadius: 8, border: "1px solid #fecaca" }}>
            ⚠ {error}
          </p>
        )}

        {/* Submit */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={loading ? "" : "btn-navy"} style={{ width: "100%", background: loading ? "#475569" : "#0f172a", color: "#fff", border: "none", borderRadius: 10, padding: "14px 0", fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", fontSize: 14, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: 0.5, transition: "background 0.2s" }}
        >
          {loading ? "Memverifikasi..." : "MASUK KE DASHBOARD →"}
        </button>

        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 12, marginTop: 20 }}>
          Hanya untuk administrator RUL09
        </p>
      </div>
    </div>
  );
};

export default Login;

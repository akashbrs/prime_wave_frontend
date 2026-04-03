import { useEffect } from "react";
import { useTheme, themes } from "../context/ThemeContext";
import Hero from "../components/Hero";
import type { Page } from "../components/Navbar";
import { motion } from "framer-motion";
import fashionLogo from "../assets/Homescreenfashionlogo.png";
import electroLogo from "../assets/homescreenelectrologo.png";

interface HomeProps {
  navigate: (p: Page, hash?: string) => void;
}

/* GLOBAL ANIMATIONS */
function GlobalAnimations() {
  useEffect(() => {
    const id = "primewave-animations";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes blink { 0%,50%,100%{opacity:1} 25%,75%{opacity:0} }
@keyframes float { 0%{transform:translateY(0)} 50%{transform:translateY(-8px)} 100%{transform:translateY(0)} }
@keyframes fadeUp { from { opacity:0; transform:translateY(18px);} to {opacity:1; transform:translateY(0);} }
@keyframes pulseDot {0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.6}}
@keyframes shimmer { from { background-position:200% center;} to { background-position:0% center;} }
@keyframes gridMove { from { transform:translateY(0);} to { transform:translateY(40px);} }
`;
    document.head.appendChild(style);
  }, []);

  return null;
}

/* TICKER */
function TickerBar() {
  const { theme } = useTheme();
  const t = themes[theme];

  const items = [
    "Enterprise Grade Solutions",
    "Cloud Native Architecture",
    "High Performance Systems",
    "Scalable Digital Transformation",
    "99.9% Service Uptime",
    "Global Infrastructure",
    "Secure & Compliant",
    "Next Generation Engineering",
    "Unified Commerce Platform",
    "Continuous Integration & Delivery",
    "Data-Driven Architecture",
  ];

  const doubled = [...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        borderTop: `1px solid ${t.border}`,
        borderBottom: `1px solid ${t.border}`,
        background: t.bgSecondary,
        padding: "10px 0",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          gap: 48,
          animation: "ticker 28s linear infinite",
          fontSize: "0.75rem",
          fontWeight: 500,
          color: t.textSubtle,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i}>
            <span style={{ color: t.accent }}>◆</span> {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home({ navigate }: HomeProps) {
  const { theme, isDark } = useTheme();
  const t = themes[theme];

  /* TERMINAL COLORS (THEME AWARE) */
  const termText = isDark ? "#e2e8f0" : "#475569";
  const termCmd = isDark ? "#60a5fa" : "#2563eb";
  const termDollar = "#10b981";
  const termResult = isDark ? "#cbd5e1" : "#475569";

  const businesses = [
    { id: "fashion", name: "E-Commerce of Fashion (VELOURA)", desc: "Fashion & Apparel", logo: fashionLogo, color: "#ce93d8" },
    { id: "electronics", name: "E-Commerce of Electronics (ELECTRON)", desc: "Electronics & Gadgets", logo: electroLogo, color: t.accentBlue },
  ];

  return (
    <div style={{ background: t.bg, minHeight: "100vh" }}>
      <GlobalAnimations />

      <Hero navigate={navigate} />
      <TickerBar />

      {/* ABOUT */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: t.sectionBg, padding: "80px 24px" }}
        className="section-pad"
      >
        <div
          className="grid-2col"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <div>
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: t.accent,
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <span style={{ width: 22, height: 1, background: t.accent }} />
              About Us
            </div>

            <h2
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 800,
                color: t.text,
                marginBottom: 20,
                lineHeight: 1.15,
                letterSpacing: "-0.02em"
              }}
            >
              Engineering excellence
              <br />
              <span style={{ color: t.accent }}>at scale.</span>
            </h2>

            <p style={{ fontSize: "1rem", lineHeight: 1.7, color: t.textSubtle, marginBottom: 24 }}>
              PrimeWave Lifestyle & Electronics is a forward-thinking retail organization managing specialized e-commerce brands in clothing and consumer electronics. The company strives to combine style, performance, and affordability under one unified brand ecosystem.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {businesses.map((b) => (
                <motion.a
                  whileHover={{ scale: 1.02, x: 8, backgroundColor: t.bgCardHover, borderColor: t.borderAccent }}
                  whileTap={{ scale: 0.98 }}
                  key={b.name}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("industries", b.id);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 18px",
                    borderRadius: 10,
                    border: `1px solid ${t.border}`,
                    background: t.bgCard,
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "border-color 0.3s, background-color 0.3s"
                  }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                    padding: 6,
                    flexShrink: 0,
                    overflow: "hidden"
                  }}>
                    <img
                      src={b.logo}
                      alt={b.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        filter: "none"
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "1.05rem", color: t.text, marginBottom: 2 }}>{b.name}</div>
                    <div style={{ fontSize: "0.85rem", color: t.textMuted }}>{b.desc}</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: t.accent }}>→</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT TERMINAL (MAC STYLE POLISH ONLY) */}
          <div className="terminal-panel" style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: `1px solid ${t.glassBorder || "rgba(255,255,255,0.2)"}`,
                background: t.glassBg || (isDark ? "rgba(18,20,29,0.4)" : "rgba(255,255,255,0.4)"),
                backdropFilter: "blur(16px)",
                boxShadow: t.shadowCard,
              }}
            >
              {/* MAC TOP BAR */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 14px",
                  background: isDark
                    ? "rgba(0,0,0,0.2)"
                    : "rgba(255,255,255,0.3)",
                  borderBottom: `1px solid ${t.glassBorder || "rgba(255,255,255,0.1)"}`,
                }}
              >
                <span style={{ width: 12, height: 12, borderRadius: 999, background: "#ff5f57" }} />
                <span style={{ width: 12, height: 12, borderRadius: 999, background: "#febc2e" }} />
                <span style={{ width: 12, height: 12, borderRadius: 999, background: "#28c840" }} />
              </div>
              <div
                style={{
                  padding: 24,
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  background: "transparent",
                  color: isDark ? "#e2e8f0" : "#475569",
                }}
              >
                {[
                  { cmd: "whoami", res: "PrimeWave Lifestyle & Electronics - Enterprise Solutions" },
                  { cmd: "cat core_values.log", res: "Excellence. Scalability. Security." },
                  { cmd: "ls ./capabilities", res: "cloud/ retail/ electronics/ architecture/" },
                  {
                    cmd: "system_status --check",
                    res: "All services operational. API latency: 12ms.",
                  },
                  { cmd: "uptime", res: "99.99% Core Service Availability" },
                ].map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.4, duration: 0.5 }}
                    key={i}
                    style={{ marginBottom: 12 }}
                  >
                    <div>
                      <span style={{ color: termDollar }}>$ </span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.4, duration: 0.1 }}
                        style={{ color: termCmd }}
                      >{item.cmd}</motion.span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.9 }}
                      viewport={{ once: true }}
                      transition={{ delay: (i * 0.4) + 0.3, duration: 0.2 }}
                      style={{
                        color: termResult,
                        marginTop: 3,
                        paddingLeft: 14,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word"
                      }}
                    >
                      {item.res}
                    </motion.div>
                  </motion.div>
                ))}

                <div style={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                  <span style={{ color: termDollar }}>$ </span>
                  <span
                    style={{
                      display: "inline-block",
                      width: 2,
                      height: "0.9em",
                      background: termDollar,
                      marginLeft: 6,
                      animation: "blink 1s infinite",
                      borderRadius: 1,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* BADGE */}
            <div
              style={{
                position: "absolute",
                bottom: "clamp(4px, 2vw, -14px)",
                right: "clamp(4px, 2vw, -14px)",
                background: t.accent,
                color: isDark ? "#0a0b0f" : "#fff",
                padding: "12px 20px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: "0.8rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                boxShadow: `0 8px 24px ${t.accent}40`,
                animation: "float 4s ease-in-out infinite",
              }}
            >
              Systems Active
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="section-pad"
        style={{ padding: "80px 24px", background: t.bg, borderTop: `1px solid ${t.border}` }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 800,
              color: t.text,
              marginBottom: 16,
              letterSpacing: "-0.02em"
            }}
          >
            Partner With Excellence
          </h2>

          <p style={{ fontSize: "1rem", color: t.textMuted, marginBottom: 36, maxWidth: 600, margin: "0 auto 36px" }}>
            Reach out to discuss your technical challenges and how PrimeWave Lifestyle & Electronics can help scale your products reliably.
          </p>

          <div className="cta-row" style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("contact")}
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                padding: "12px 28px",
                borderRadius: 8,
                cursor: "pointer",
                border: "1px solid transparent",
                background: t.accent,
                color: isDark ? "#0a0b0f" : "#fff",
              }}
            >
              Start a Conversation
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("purpose")}
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                padding: "12px 28px",
                borderRadius: 8,
                cursor: "pointer",
                border: `1px solid ${t.borderAccent}`,
                background: "transparent",
                color: t.text,
              }}
            >
              Our Purpose
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
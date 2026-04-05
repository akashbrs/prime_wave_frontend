import { useState, useEffect } from "react";
import { useTheme, themes as tokens } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import vastrraCoat from "../assets/vastrra_coat.png";
import womanBlueDress from "../assets/woman_blue_dress.png";
import electronDevices from "../assets/electron_devices.png";
import electronCardBanner from "../assets/electron_card_banner.png";
import fashionLogo from "../assets/Homescreenfashionlogo.png";
import electroLogo from "../assets/homescreenelectrologo.png";

function TickerBar() {
  const { theme } = useTheme();
  const t = tokens[theme];
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
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, background: t.bgSecondary, padding: "10px 0" }}>
      <div style={{ display: "inline-flex", gap: 48, animation: "ticker 28s linear infinite", fontSize: "0.75rem", fontWeight: 500, color: t.textSubtle, letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {doubled.map((item, i) => (
          <span key={i}><span style={{ color: t.accent }}>◆</span> {item}</span>
        ))}
      </div>
    </div>
  );
}

const INDUSTRIES = [
  {
    id: "fashion",
    name: "E-Commerce of Fashion (VELOURA)",
    shortName: "Fashion",
    subtitle: "Fashion & Apparel",
    icon: "🛍",
    logo: fashionLogo,
    color: "#00e676",
    url: "https://veloura-frontend.vercel.app",
    desc: "A stylish and high-converting e-commerce storefront for the Vastrra fashion brand.",
    bullets: ["Latest Fashion Trends", "Exclusive Collections", "Premium Quality Apparel"],
    footerLabel: "◆ VASTRRA FASHION",
    head2: "Step Up Your Style Game",
    headSpan: "with Vastrra",
    tags: ["E-Commerce", "Fashion"],
    gradient: "linear-gradient(135deg,#00e67614,#00e67604)"
  },
  {
    id: "electronics",
    name: "E-Commerce of Electronics (ELECTRON)",
    shortName: "Electron",
    subtitle: "Electronics & Gadgets",
    icon: "⚡",
    logo: electroLogo,
    color: "#4fc3f7",
    url: "https://electron-primewave.vercel.app/",
    desc: "A robust digital storefront for consumer electronics.",
    bullets: ["Latest Gadgets & Devices", "Exclusive Tech Deals", "High-Performance Electronics"],
    footerLabel: "◆ ELECTRONIC PLATFORM",
    head2: "Power Up Your Tech Experience",
    headSpan: "with Electronic",
    tags: ["E-Commerce", "Electronics"],
    gradient: "linear-gradient(135deg,#4fc3f714,#4fc3f704)"
  },
];

export default function Industries() {
  const { theme } = useTheme();
  const t = tokens[theme];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (INDUSTRIES.some((i) => i.id === hash)) {
        setExpandedId(hash);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const sectionLabel = (text: string) => (
    <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: t.accent, display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <span style={{ width: 22, height: 1, background: t.accent, display: "inline-block" }} />
      {text}
    </div>
  );

  return (
    <div style={{ background: t.bg, minHeight: "100vh", paddingTop: 64 }}>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ padding: "70px 24px 52px", background: t.sectionBg, borderBottom: `1px solid ${t.border}`, position: "relative", overflow: "hidden" }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${t.border}60 1px, transparent 1px), linear-gradient(90deg, ${t.border}60 1px, transparent 1px)`, backgroundSize: "40px 40px", opacity: 0.22, animation: "gridMove 10s linear infinite" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          {sectionLabel("What We Build")}
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 800, letterSpacing: "-0.04em", color: t.text, lineHeight: 1.05, marginBottom: 18 }}>
            Specialized platforms.<br />
            <span style={{ color: t.accent }}>Enterprise execution.</span>
          </h1>
          <p style={{ color: t.textSubtle, fontSize: "1.05rem", maxWidth: 510, lineHeight: 1.8 }}>
            PrimeWave Lifestyle & Electronics provides purpose-built, highly scalable digital infrastructure tailored for the rigorous demands of select industry verticals.
          </p>
          <div className="achievement-strip" style={{ display: "flex", gap: 20, marginTop: 36, flexWrap: "wrap" }}>
            {[{ val: "2", l: "Verticals" }, { val: "5", l: "Countries" }, { val: "2", l: "Products" }, { val: "99.9%", l: "Uptime" }].map((s) => (
              <div key={s.l} style={{ padding: "11px 18px", borderRadius: 8, border: `1px solid ${t.border}`, background: t.bgCard }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: t.accent, letterSpacing: "-0.04em" }}>{s.val}</div>
                <div style={{ fontSize: "0.67rem", fontWeight: 600, color: t.textMuted, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <TickerBar />

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="section-pad"
        style={{ padding: "72px 24px" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {INDUSTRIES.map((ind) => {
              const isExpanded = expandedId === ind.id;
              const isDark = theme === "dark";

              const panelBg = isDark
                ? (ind.id === 'fashion' ? "linear-gradient(135deg, #0d0a14 0%, #130e1f 50%, #0d0a14 100%)" : "linear-gradient(135deg, #0a0f1e 0%, #0c1628 50%, #0a1020 100%)")
                : (ind.id === 'fashion' ? "linear-gradient(135deg, #ffffff 0%, #f8f7ff 50%, #ffffff 100%)" : "linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #ffffff 100%)");

              const borderCol = ind.color;
              const secColor = ind.id === 'fashion' ? (isDark ? "#00e676" : "#00b96b") : (isDark ? "#fb923c" : "#0284c7");

              return (
                <motion.div
                  layout
                  key={ind.id}
                  onClick={() => {
                    if (!isExpanded) {
                      setExpandedId(ind.id);
                      window.location.hash = ind.id;
                      setTimeout(() => {
                        const el = document.getElementById(`card-${ind.id}`);
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY - 100;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }, 100);
                    }
                  }}
                  id={`card-${ind.id}`}
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    cursor: isExpanded ? "default" : "pointer",
                    border: isExpanded ? `1px solid ${borderCol}50` : `1px solid ${t.border}`,
                    background: isExpanded ? panelBg : t.bgCard,
                    backdropFilter: "blur(16px)",
                    boxShadow: isExpanded
                      ? (isDark ? `0 24px 60px -12px ${borderCol}20` : "0 20px 50px -10px rgba(0,0,0,0.08)")
                      : "none",
                    position: "relative",
                  }}
                  whileHover={!isExpanded ? { y: -4, boxShadow: `0 12px 24px ${borderCol}15` } : undefined}
                >
                  <AnimatePresence mode="wait">
                    {!isExpanded ? (
                      <motion.div
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div style={{
                          height: 220,
                          position: "relative",
                          overflow: "hidden",
                          background: isDark ? "#0a0b0f" : "#ffffff",
                        }}>
                          <img
                            src={ind.id === "fashion" ? womanBlueDress : electronCardBanner}
                            style={{
                              position: "absolute",
                              right: 0,
                              top: 0,
                              width: ind.id === "fashion" ? "70%" : "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: ind.id === "fashion" ? "center 10%" : "center",
                              WebkitMaskImage: ind.id === "fashion"
                                ? "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)"
                                : "linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)",
                              maskImage: ind.id === "fashion"
                                ? "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)"
                                : "linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)",
                            }}
                            alt={ind.name}
                          />

                          <div style={{
                            position: "absolute",
                            left: 30,
                            top: "50%",
                            transform: "translateY(-50%)",
                            maxWidth: "75%",
                            paddingRight: 10
                          }}>
                            {ind.logo && (
                              <img
                                src={ind.logo}
                                alt={`${ind.shortName} Logo`}
                                style={{
                                  height: 48,
                                  marginBottom: 16,
                                  objectFit: "contain",
                                  filter: "none",
                                  display: "block"
                                }}
                              />
                            )}
                            <div style={{
                              fontSize: "clamp(1.4rem, 5vw, 2rem)",
                              fontWeight: 800,
                              color: t.text,
                              lineHeight: 1.15,
                              marginBottom: 8,
                              textShadow: isDark ? "0 2px 10px rgba(0,0,0,0.8)" : "0 2px 10px rgba(255,255,255,0.8)"
                            }}>
                              {ind.name}
                            </div>
                            <div style={{
                              fontSize: "0.95rem",
                              fontWeight: 600,
                              color: secColor,
                              display: "flex",
                              alignItems: "center",
                              gap: 8
                            }}>
                              Tap to view details <span style={{ fontSize: "1.1rem" }}>→</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isDark && (
                          <>
                            <div style={{ position: "absolute", top: -60, right: -40, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${borderCol}15 0%, transparent 70%)`, pointerEvents: "none" }} />
                            <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${secColor}10 0%, transparent 70%)`, pointerEvents: "none" }} />
                          </>
                        )}

                        <button
                          onClick={(e) => { e.stopPropagation(); setExpandedId(null); }}
                          style={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                            border: "none",
                            borderRadius: "50%",
                            width: 36,
                            height: 36,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: t.text,
                            zIndex: 10,
                          }}
                        >
                          ✕
                        </button>

                        <div style={{ padding: "36px", position: "relative" }}>
                          <div className="panel-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, paddingRight: 40 }}>
                            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                              <div style={{
                                width: 56, height: 56, borderRadius: 14,
                                background: isDark ? `${borderCol}25` : `${borderCol}20`,
                                border: isDark ? `1px solid ${borderCol}50` : "none",
                                display: "flex", justifyContent: "center", alignItems: "center",
                                color: borderCol,
                                boxShadow: isDark ? `0 0 20px ${borderCol}30` : `0 8px 16px ${borderCol}40`,
                                overflow: "hidden"
                              }}>
                                {ind.logo ? (
                                  <img
                                    src={ind.logo}
                                    alt={`${ind.shortName} Logo`}
                                    style={{
                                      width: "80%",
                                      height: "80%",
                                      objectFit: "contain",
                                      filter: "none"
                                    }}
                                  />
                                ) : (
                                  <span style={{ fontSize: "1.6rem" }}>{ind.icon}</span>
                                )}
                              </div>
                              <div>
                                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: t.text, marginBottom: 4, letterSpacing: "-0.01em" }}>{ind.name}</div>
                                <div style={{ fontSize: "1.05rem", color: t.textSubtle }}>{ind.subtitle}</div>
                              </div>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); window.open(ind.url, "_blank"); }}
                              style={{
                                background: isDark ? `${borderCol}15` : "transparent",
                                border: isDark ? `1px solid ${borderCol}40` : "none",
                                color: borderCol,
                                opacity: 0.9, cursor: "pointer", fontSize: "1.2rem",
                                borderRadius: 8, padding: "6px 14px", transition: "all 0.2s"
                              }}
                            >
                              →
                            </button>
                          </div>

                          <div className="grid-panel-2col" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 24, alignItems: "center" }}>
                            <div>
                              <h3 style={{ fontSize: "1.35rem", fontWeight: 600, color: t.text, marginBottom: 24 }}>
                                {ind.head2} <span style={{ color: t.textSubtle }}>{ind.headSpan}</span>
                              </h3>
                              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 18 }}>
                                {ind.bullets.map((item) => (
                                  <li key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "1rem", color: isDark ? t.textSubtle : secColor }}>
                                    <span style={{
                                      width: 8, height: 8, borderRadius: "50%",
                                      background: isDark ? borderCol : secColor,
                                      boxShadow: isDark ? `0 0 8px ${borderCol}90` : "none",
                                      flexShrink: 0
                                    }}></span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="industries-image-col" style={{ display: "flex", justifyContent: "flex-end", position: "relative", height: 220, paddingRight: 20 }}>
                              {ind.id === 'fashion' ? (
                                <>
                                  <img src={vastrraCoat} style={{ height: 230, width: "auto", objectFit: "contain", borderRadius: 12, position: "absolute", right: 120, top: -10, zIndex: 1, filter: isDark ? `drop-shadow(0 8px 20px ${borderCol}25)` : "none" }} alt="Fashion Coat" />
                                  <img src={womanBlueDress} style={{ height: 250, width: "auto", objectFit: "contain", borderRadius: 12, position: "absolute", right: -20, top: -20, zIndex: 2, filter: isDark ? `drop-shadow(0 10px 30px ${borderCol}35)` : "drop-shadow(0 10px 20px rgba(0,0,0,0.1))" }} alt="Fashion Dress" />
                                </>
                              ) : (
                                <img src={electronDevices} style={{ height: 240, width: "auto", objectFit: "contain", borderRadius: 12, position: "absolute", right: -30, top: -10, zIndex: 1, filter: isDark ? `drop-shadow(0 10px 30px ${borderCol}35)` : "drop-shadow(0 10px 20px rgba(0,0,0,0.1))" }} alt="Electronics Devices" />
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="panel-footer-row" style={{
                          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(226, 232, 240, 0.4)",
                          padding: "20px 36px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderTop: isDark ? `1px solid ${borderCol}25` : "1px solid rgba(0,0,0,0.04)"
                        }}>
                          <span style={{
                            fontSize: "0.75rem",
                            color: borderCol,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            fontWeight: 600,
                            opacity: isDark ? 1 : 0.7
                          }}>
                            {ind.footerLabel}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); window.open(ind.url, "_blank"); }}
                            style={{
                              background: isDark ? `linear-gradient(135deg, ${borderCol}, ${secColor})` : `linear-gradient(135deg, ${secColor}, ${borderCol})`,
                              color: isDark ? "#000" : "white",
                              padding: "12px 28px", borderRadius: 10, border: "none",
                              fontSize: "1rem", fontWeight: 600, cursor: "pointer",
                              boxShadow: isDark ? `0 4px 20px ${borderCol}50` : `0 4px 12px ${borderCol}50`,
                              letterSpacing: "0.02em", transition: "all 0.2s"
                            }}
                          >
                            Shop Now
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
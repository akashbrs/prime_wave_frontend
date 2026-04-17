import { useTheme, themes as tokens } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "../supabaseClient";

// ─── Ticker bar (shared pattern across pages) ─────────────────────────────────
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

// ─── Section label helper ─────────────────────────────────────────────────────
function SectionLabel({ text, t }: { text: string; t: any }) {
  return (
    <div
      style={{
        fontSize: "0.68rem",
        fontWeight: 600,
        letterSpacing: "0.15em",
        textTransform: "uppercase" as const,
        color: t.accent,
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
      }}
    >
      <span
        style={{
          width: 22,
          height: 1,
          background: t.accent,
          display: "inline-block",
        }}
      />
      {text}
    </div>
  );
}

// ─── Contact Page ─────────────────────────────────────────────────────────────
export default function Contact() {
  const { theme } = useTheme();
  const t = tokens[theme];

  const [form, setForm] = useState({ full_name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setServerMessage("");

    try {
      // 1. Save to Supabase
      const { error: dbError } = await supabase
        .from("contacts")
        .insert([
          {
            full_name: form.full_name,
            email: form.email,
            message: form.message,
          },
        ]);

      if (dbError) throw new Error(`Database Error: ${dbError.message}`);

      // 2. Send to Django Backend (FIXED)
      const response = await fetch(
        "https://api.prime-wave.tech/api/contact/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: form.full_name,   // ✅ FIXED
            email: form.email,
            message: form.message,
          }),
        }
      );

      // Handle response safely
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Server error occurred");
      }

      // ✅ SUCCESS
      setStatus("success");
      setServerMessage("Message sent successfully!");
      setForm({ full_name: "", email: "", message: "" });

    } catch (err: any) {
      console.error("Error:", err);

      setStatus("error");
      setServerMessage(err.message || "Failed to send message ❌");

    }

    setTimeout(() => setStatus("idle"), 5000);
  };


  const socials = [
    {
      platform: "Email",
      handle: "primewavelifestyle@gmail.com",
      icon: "✉",
      color: "#ff8a65",
      link: "mailto:primewavelifestyle@gmail.com",
      desc: "Connect directly with our engineering and sales teams.",
    },
    {
      platform: "LinkedIn",
      handle: "PrimeWave Lifestyle & Electronics",
      icon: "◈",
      color: "#4fc3f7",
      link: "#",
      desc: "Company updates, tech architectures, and talent networking.",
    },
    {
      platform: "GitHub",
      handle: "@primewave-tech",
      icon: "⬡",
      color: "#ffca28",
      link: "#",
      desc: "Open source contributions and engineering standards.",
    },
    {
      platform: "Twitter / X",
      handle: "@primewave_hq",
      icon: "✦",
      color: "#ffb74d",
      link: "#",
      desc: "Announcements, product updates, and industry insights.",
    },
    {
      platform: "Newsletter",
      handle: "The Architecture Digest",
      icon: "◎",
      color: "#ff7043",
      link: "#",
      desc: "Monthly deep dives into scalable system design.",
    },
  ];



  return (
    <div style={{ background: t.bg, minHeight: "100vh", paddingTop: 64 }}>

      {/* ── Page Header ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          padding: "70px 24px 52px",
          background: t.sectionBg,
          borderBottom: `1px solid ${t.border}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${t.border}60 1px, transparent 1px), linear-gradient(90deg, ${t.border}60 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            opacity: 0.25,
            animation: "gridMove 10s linear infinite",
          }}
        />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <SectionLabel text="Get In Touch" t={t} />

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: t.text,
              marginBottom: 16,
              lineHeight: 1.05,
            }}
          >
            Connect with our
            <br />
            <span style={{ color: t.accent }}>engineering team</span>
          </h1>

          <p
            style={{
              color: t.textSubtle,
              fontSize: "1.05rem",
              maxWidth: 540,
              lineHeight: 1.8,
            }}
          >
            Whether you want to discuss a potential partnership, inquire about our enterprise platforms, or explore how we can architect your next digital commerce solution — we are ready to assist.
          </p>
        </div>
      </motion.section>

      {/* ── Ticker ── */}
      <TickerBar />

      {/* ── Main Content ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="section-pad"
        style={{ padding: "72px 24px" }}
      >
        <div
          className="grid-2col"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
          }}
        >

          {/* ── Left: Social Links ── */}
          <div>
            <SectionLabel text="Connect" t={t} />

            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: t.text,
                marginBottom: 6,
              }}
            >
              Reach out to us
            </h2>

            <p
              style={{
                color: t.textSubtle,
                fontSize: "1rem",
                marginBottom: 26,
                lineHeight: 1.75,
              }}
            >
              Our team actively monitors these channels for partnership and technical inquiries.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {socials.map((s) => {
                return (
                  <motion.a
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    whileHover={{ scale: 1.02, y: -3, boxShadow: `0 12px 24px ${t.accent}15`, borderColor: t.borderAccent, backgroundColor: t.bgCardHover }}
                    key={s.platform}
                    href={s.link}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "14px 18px",
                      borderRadius: 10,
                      textDecoration: "none",
                      border: `1px solid ${t.border}`,
                      background: t.bgCard,
                      transition: "all 0.22s ease",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: `${s.color}14`,
                        border: `1px solid ${s.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: s.color,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        flexShrink: 0,
                        transition: "box-shadow 0.22s",
                      }}
                    >
                      {s.icon}
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          color: t.text,
                        }}
                      >
                        {s.platform}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          color: s.color,
                          marginTop: 2,
                        }}
                      >
                        {s.handle}
                      </div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: t.textMuted,
                          marginTop: 3,
                        }}
                      >
                        {s.desc}
                      </div>
                    </div>

                    <motion.span
                      whileHover={{ color: t.accent, x: 3 }}
                      style={{
                        color: t.textMuted,
                        fontSize: "0.85rem",
                        transition: "color 0.2s, transform 0.2s",
                      }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div>
            <SectionLabel text="Send a Message" t={t} />

            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: t.text,
                marginBottom: 6,
              }}
            >
              Direct Inquiry
            </h2>

            <p
              style={{
                color: t.textSubtle,
                fontSize: "1rem",
                marginBottom: 26,
                lineHeight: 1.75,
              }}
            >
              Fill out the form below. Your application/message will be securely stored in our cloud database for immediate review by our engineering leads.
            </p>

            <motion.form
              onSubmit={handleSubmit}
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                padding: "32px",
                borderRadius: 16,
                border: `1px solid ${t.border}`,
                background: t.bgCard,
                boxShadow: t.shadowCard,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: t.text }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={form.full_name}
                  onChange={(e) => setForm(f => ({ ...f, full_name: e.target.value }))}
                  placeholder="John Doe"
                  style={{
                    padding: "12px 16px",
                    borderRadius: 8,
                    border: `1px solid ${t.border}`,
                    background: t.bg,
                    color: t.text,
                    fontSize: "0.95rem",
                    outline: "none",
                    transition: "border 0.2s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = t.accent}
                  onBlur={(e) => e.target.style.borderColor = t.border}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: t.text }}>Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="john@example.com"
                  style={{
                    padding: "12px 16px",
                    borderRadius: 8,
                    border: `1px solid ${t.border}`,
                    background: t.bg,
                    color: t.text,
                    fontSize: "0.95rem",
                    outline: "none",
                    transition: "border 0.2s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = t.accent}
                  onBlur={(e) => e.target.style.borderColor = t.border}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: t.text }}>Message</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="How can we help you?"
                  rows={4}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 8,
                    border: `1px solid ${t.border}`,
                    background: t.bg,
                    color: t.text,
                    fontSize: "0.95rem",
                    outline: "none",
                    transition: "border 0.2s",
                    resize: "vertical"
                  }}
                  onFocus={(e) => e.target.style.borderColor = t.accent}
                  onBlur={(e) => e.target.style.borderColor = t.border}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                style={{
                  marginTop: 10,
                  padding: "14px 24px",
                  borderRadius: 8,
                  border: "none",
                  background: status === "success" ? "#4caf50" : `linear-gradient(90deg, ${t.accent}, ${t.accentBlue})`,
                  color: "#fff",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: (status === "loading" || status === "success") ? "not-allowed" : "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
                  boxShadow: `0 8px 20px ${t.accent}40`,
                  opacity: status === "loading" ? 0.7 : 1,
                }}
                onMouseOver={(e) => {
                  if (status !== "loading" && status !== "success") e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  if (status !== "loading" && status !== "success") e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {status === "idle" && "Send Message"}
                {status === "loading" && "Sending..."}
                {status === "success" && "Message Sent! We will contact you within 48hrs."}
                {status === "error" && "Error Sending"}
              </button>

              {status === "error" && (
                <div style={{ color: "#ef5350", fontSize: "0.85rem", marginTop: 4 }}>
                  {serverMessage || "Ensure the database connection is active and credentials are correct."}
                </div>
              )}
              {status === "success" && serverMessage && (
                <div style={{ color: t.textMuted, fontSize: "0.85rem", marginTop: 4 }}>
                  {serverMessage}
                </div>
              )}
            </motion.form>
          </div>
        </div>
      </motion.section>
    </div>
  );
}


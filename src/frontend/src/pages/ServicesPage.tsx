import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Database,
  HardDrive,
  Search,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { useCinematicScroll } from "../hooks/useCinematicScroll";

const LIGHT_ORANGE = "rgba(255,240,216,0.88)";
const PASTEL_GREEN = "rgba(212,237,218,0.88)";
const PASTEL_GREEN_CARD = "rgba(234,246,237,0.92)";
const PASTEL_GREEN_HOVER = "rgba(194,229,203,0.92)";
const ORANGE = "#e05c00";

const CUSTOM_EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];
const SPRING_CINEMATIC = {
  type: "spring" as const,
  stiffness: 300,
  damping: 26,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const SERVICES_DETAIL = [
  {
    num: "01",
    icon: HardDrive,
    title: "Media Archiving",
    tagline: "Long-term preservation on IBM LTO tape",
    desc: "Long-term preservation of your media on IBM LTO tape. We manage the full ingestion pipeline — from intake to verified write confirmation. Our Symply PRO and MagStar hardware writers ensure each asset is reliably encoded to tape with dual-verify passes.",
    features: [
      "Full ingest pipeline management",
      "Dual-verify write confirmation",
      "Symply PRO & MagStar hardware",
      "LTO-8 and LTO-9 generation support",
    ],
  },
  {
    num: "02",
    icon: Database,
    title: "Asset Cataloging",
    tagline: "Structured metadata for every asset",
    desc: "Every asset gets a structured metadata record: Tape ID, LTO generation, writer hardware (Symply PRO or MagStar), tape position, and write date. Our catalog system ensures any file can be located and retrieved in minutes, not hours.",
    features: [
      "Tape ID & LTO generation tagging",
      "Hardware provenance tracking",
      "Tape position & write date logging",
      "Searchable metadata index",
    ],
  },
  {
    num: "03",
    icon: Search,
    title: "Tape Retrieval",
    tagline: "Fast, tracked asset recovery",
    desc: "Request specific assets for delivery. We track each retrieval order through four clear stages: Pending → In Progress → Ready → Delivered. Real-time status updates keep your team informed throughout the process.",
    features: [
      "Four-stage retrieval tracking",
      "Real-time status notifications",
      "Priority retrieval available",
      "Partial tape reads supported",
    ],
  },
  {
    num: "04",
    icon: Shield,
    title: "Client Access Portal",
    tagline: "Secure web access for your entire team",
    desc: "Secure web access to browse, search by metadata, upload, manage projects, and monitor retrieval request status in real time. Role-based access controls let you manage permissions for your entire marketing or production team.",
    features: [
      "Role-based access controls",
      "Full-text metadata search",
      "Project and folder management",
      "Retrieval request dashboard",
    ],
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Intake",
    desc: "Your media is received, cataloged, and queued for archiving.",
  },
  {
    step: "02",
    title: "Write to Tape",
    desc: "Assets are written to IBM LTO tape using Symply PRO or MagStar hardware with dual verification.",
  },
  {
    step: "03",
    title: "Index & Catalog",
    desc: "Full metadata record created: Tape ID, generation, hardware, tape position, and write date.",
  },
  {
    step: "04",
    title: "Access & Retrieve",
    desc: "Browse your catalog through the client portal. Request retrieval — tracked from Pending to Delivered.",
  },
];

// Animated word-by-word hero heading
function AnimatedHeading({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className="font-display font-bold leading-tight tracking-tight text-black"
      style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
    >
      {words.map((word) => (
        <motion.span
          key={word}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
          className="inline-block mr-[0.2em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function ServicesPage() {
  useCinematicScroll();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ background: LIGHT_ORANGE, minHeight: "100vh", color: "#111" }}
    >
      {/* ── HERO ─────────────────────────────────── */}
      <section
        className="px-6 md:px-16 pt-12 pb-20"
        style={{
          background: LIGHT_ORANGE,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
        data-ocid="services_page.hero"
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] font-semibold font-body tracking-[0.22em] uppercase text-[#3d3d3d] hover:text-black transition-smooth"
            data-ocid="services_page.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        <div className="flex flex-col gap-6 max-w-4xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[11px] font-semibold font-body tracking-[0.22em] uppercase text-[#3d3d3d]"
          >
            WeVirtual
          </motion.span>

          {/* Clip-path hero reveal wrapping word-by-word animation */}
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.1, ease: CUSTOM_EASE, delay: 0.15 }}
          >
            <AnimatedHeading text="Our Services" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-body text-base md:text-xl leading-relaxed max-w-2xl"
            style={{ color: "#2d2d2d" }}
          >
            From acquisition to retrieval, WeVirtual is your end-to-end media
            archiving partner — combining enterprise LTO hardware with an
            intelligent access platform.
          </motion.p>
        </div>
      </section>

      {/* ── SERVICE DETAIL CARDS ─────────────────── */}
      <section
        className="px-6 md:px-16 py-24"
        style={{
          background: PASTEL_GREEN,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
        data-ocid="services_page.cards_section"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="flex flex-col gap-8"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold font-body tracking-[0.22em] uppercase text-[#3d3d3d]">
              What We Do
            </span>
            <hr style={{ borderColor: "rgba(0,0,0,0.1)" }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES_DETAIL.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.num}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    delay: i * 0.15,
                    duration: 0.75,
                    ease: CUSTOM_EASE,
                  }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 48px rgba(0,0,0,0.12)",
                    transition: SPRING_CINEMATIC,
                  }}
                  className="group flex flex-col gap-5 rounded-xl p-8 md:p-10 border transition-colors duration-300 cursor-default"
                  style={{
                    background: PASTEL_GREEN_CARD,
                    borderColor: "rgba(0,0,0,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      PASTEL_GREEN_HOVER;
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      PASTEL_GREEN_CARD;
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(0,0,0,0.1)";
                  }}
                  data-ocid={`services_page.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <motion.span
                      initial={{ scale: 0, rotate: -10 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        ...SPRING_CINEMATIC,
                        delay: i * 0.15 + 0.2,
                      }}
                      className="font-display text-5xl font-bold leading-none"
                      style={{ color: ORANGE }}
                    >
                      {svc.num}
                    </motion.span>
                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        ...SPRING_CINEMATIC,
                        delay: i * 0.15 + 0.3,
                      }}
                      className="p-2 rounded-lg"
                      style={{ background: `${ORANGE}18` }}
                    >
                      <Icon size={20} style={{ color: ORANGE }} />
                    </motion.div>
                  </div>

                  <div className="flex flex-col gap-1">
                    {/* Hover-enlarge title */}
                    <h3 className="font-display text-2xl font-bold text-black transition-transform duration-300 group-hover:scale-105 origin-left">
                      {svc.title}
                    </h3>
                    <p
                      className="font-body text-xs uppercase tracking-widest font-semibold"
                      style={{ color: ORANGE }}
                    >
                      {svc.tagline}
                    </p>
                  </div>

                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "#2d2d2d" }}
                  >
                    {svc.desc}
                  </p>

                  <ul
                    className="flex flex-col gap-2 pt-3 border-t"
                    style={{ borderColor: "rgba(0,0,0,0.08)" }}
                  >
                    {svc.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 font-body text-xs text-[#2d2d2d]"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: ORANGE }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <section
        className="px-6 md:px-16 py-24"
        style={{
          background: LIGHT_ORANGE,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
        data-ocid="services_page.process_section"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="flex flex-col gap-12"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <span className="text-[11px] font-semibold font-body tracking-[0.22em] uppercase text-[#3d3d3d]">
              Process
            </span>
            <hr style={{ borderColor: "rgba(0,0,0,0.1)" }} />
            <h2
              className="font-display font-bold leading-tight tracking-tight text-black"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              How It Works
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {PROCESS_STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: i * 0.2,
                  duration: 0.7,
                  ease: CUSTOM_EASE,
                }}
                className="flex flex-col gap-4 p-6 border border-black/10"
                style={{ background: PASTEL_GREEN_CARD }}
                data-ocid={`services_page.process.${i + 1}`}
              >
                <motion.span
                  initial={{ scale: 0, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...SPRING_CINEMATIC, delay: i * 0.2 + 0.1 }}
                  className="font-display text-4xl font-bold"
                  style={{ color: ORANGE }}
                >
                  {s.step}
                </motion.span>
                <h3 className="font-display text-xl font-bold text-black">
                  {s.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "#2d2d2d" }}
                >
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section
        className="px-6 md:px-16 py-28"
        style={{ background: PASTEL_GREEN }}
        data-ocid="services_page.cta_section"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10"
        >
          <div className="flex flex-col gap-4">
            <motion.h2
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: CUSTOM_EASE, delay: 0.1 }}
              className="font-display font-bold leading-tight tracking-tight text-black"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              Ready to archive
              <br />
              your media?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-body text-base md:text-lg max-w-lg leading-relaxed"
              style={{ color: "#3d3d3d" }}
            >
              Get in touch with the WeVirtual team to discuss your archiving
              requirements and get a tailored solution.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="shrink-0"
          >
            <a
              href="mailto:sharad@wevirtual.cloud"
              className="inline-flex items-center gap-3 border border-black/60 px-8 py-4 text-sm font-body font-semibold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-smooth"
              data-ocid="services_page.contact_button"
            >
              Get in touch <ArrowRight size={14} />
            </a>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ARTICLES, CULTURE_TRIPS, STORE_ITEMS } from "../data";
import { useProjectsByCategory } from "../hooks/useProjects";
import type { Project } from "../types";

const CATEGORIES = [
  "All",
  "Branding",
  "Digital",
  "Experience",
  "E-commerce",
  "Content",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Warm light orange palette — all sections unified
const LIGHT_ORANGE = "#fff0d8";
const LIGHT_ORANGE_ALT = "#ffe8c8";
const ORANGE = "#e05c00";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold font-body tracking-[0.22em] uppercase text-black/40">
      {children}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group border border-black/10 p-6 md:p-8 flex flex-col gap-4 hover:border-black/30 transition-smooth"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[11px] font-body font-semibold tracking-widest uppercase text-black/40">
            {project.category}
          </span>
          <h3 className="font-display text-xl md:text-2xl font-bold text-black leading-tight truncate">
            {project.title}
          </h3>
        </div>
        <span className="font-body text-xs text-black/30 shrink-0 mt-1 tracking-wide">
          {project.year}
        </span>
      </div>
      <p className="font-body text-black/55 text-sm leading-relaxed line-clamp-3">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-body font-medium px-2 py-0.5 border border-black/15 text-black/45 uppercase tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        to="/projects/$id"
        params={{ id: project.id }}
        className="mt-auto inline-flex items-center gap-2 text-sm font-body font-medium text-black/60 hover:text-black hover:gap-3 transition-all duration-300"
        data-ocid="project.read_more_link"
      >
        Read more <ArrowRight size={13} />
      </Link>
    </motion.div>
  );
}

function ProjectGridSkeleton() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-px"
      style={{ background: "rgba(0,0,0,0.08)" }}
    >
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="p-8 flex flex-col gap-4"
          style={{ background: LIGHT_ORANGE }}
          data-ocid={`featured_work.loading_state.${i}`}
        >
          <Skeleton className="h-3 w-20 bg-black/10" />
          <Skeleton className="h-7 w-3/4 bg-black/10" />
          <Skeleton className="h-14 w-full bg-black/10" />
          <Skeleton className="h-3 w-28 bg-black/10" />
        </div>
      ))}
    </div>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="min-h-screen text-black flex flex-col justify-between px-6 md:px-16 pt-8 pb-10 relative overflow-hidden"
      style={{ background: LIGHT_ORANGE }}
      data-ocid="hero.section"
    >
      <hr style={{ borderColor: "rgba(0,0,0,0.1)" }} />

      <div className="flex-1 flex flex-col justify-center gap-8 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col gap-6"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Media Asset Management</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display font-bold leading-[0.88] tracking-[-0.02em]"
            style={{ fontSize: "clamp(4.5rem, 13vw, 11rem)" }}
          >
            <span className="text-black">WeVirtual</span>
            <sup
              className="font-body font-normal align-super"
              style={{ fontSize: "0.28em", color: ORANGE }}
            >
              ®
            </sup>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-display text-xl md:text-3xl font-normal italic tracking-tight max-w-2xl"
            style={{ color: "rgba(0,0,0,0.60)" }}
          >
            Digital-First Media Archive
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-body text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "rgba(0,0,0,0.42)" }}
          >
            Design and code are only tools of expression. What sets us and our
            work apart is people.
          </motion.p>
        </motion.div>
      </div>

      <div className="flex items-center justify-between gap-8">
        <hr className="flex-1" style={{ borderColor: "rgba(0,0,0,0.1)" }} />
        <span className="font-body text-[11px] tracking-[0.2em] uppercase text-black/30 shrink-0">
          ©2008–2026
        </span>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        data-ocid="hero.scroll_indicator"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <ArrowDown size={16} style={{ color: "rgba(0,0,0,0.35)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── FEATURED WORK ───────────────────────────────────────────────────────────

function FeaturedWorkSection() {
  const navigate = useNavigate({ from: "/" });
  const { category: activeCategory = "All" } = useSearch({ from: "/" });
  const { data: projects, isLoading } = useProjectsByCategory(activeCategory);

  const setActiveCategory = (cat: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        category: cat === "All" ? undefined : cat,
      }),
    });
  };

  return (
    <section
      id="work"
      className="text-black py-20 px-6 md:px-16"
      style={{
        background: LIGHT_ORANGE_ALT,
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
      data-ocid="featured_work.section"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="flex flex-col gap-10"
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <SectionLabel>Featured Work</SectionLabel>
          <hr style={{ borderColor: "rgba(0,0,0,0.1)" }} />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-0.5"
          role="tablist"
          aria-label="Project category filter"
        >
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              data-ocid="featured_work.filter.tab"
              className={`px-4 py-2 text-sm font-body font-medium transition-smooth border-b-2 ${
                activeCategory === cat
                  ? "border-black text-black"
                  : "border-transparent text-black/38 hover:text-black/65"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        {isLoading ? (
          <ProjectGridSkeleton />
        ) : !projects || projects.length === 0 ? (
          <motion.div
            variants={fadeUp}
            className="py-24 flex flex-col items-center gap-4 border border-black/10"
            data-ocid="featured_work.empty_state"
          >
            <p className="font-display text-2xl text-black/35">
              No projects found
            </p>
            <p className="font-body text-black/25 text-sm">
              Check back soon — great work takes time.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-px"
            style={{ background: "rgba(0,0,0,0.08)" }}
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                style={{ background: LIGHT_ORANGE_ALT }}
                data-ocid={`featured_work.item.${i + 1}`}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

// ─── ABOUT / PHILOSOPHY ──────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 px-6 md:px-16"
      style={{ background: LIGHT_ORANGE, color: "#0a0a0a" }}
      data-ocid="about.section"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="flex flex-col gap-12"
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <SectionLabel>About</SectionLabel>
          <hr style={{ borderColor: "rgba(0,0,0,0.1)" }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Pull quote */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <blockquote className="font-display text-2xl md:text-4xl font-bold leading-tight tracking-tight text-black">
              "Design and code are only tools of expression. What sets us and
              our work apart is people."
            </blockquote>
            <div
              className="flex gap-10 pt-5 border-t"
              style={{ borderColor: "rgba(0,0,0,0.1)" }}
            >
              <div>
                <p
                  className="font-body text-xs tracking-widest uppercase mb-1"
                  style={{ color: "rgba(0,0,0,0.4)" }}
                >
                  Founded
                </p>
                <p
                  className="font-display font-bold text-2xl"
                  style={{ color: ORANGE }}
                >
                  2008
                </p>
              </div>
              <div>
                <p
                  className="font-body text-xs tracking-widest uppercase mb-1"
                  style={{ color: "rgba(0,0,0,0.4)" }}
                >
                  Based In
                </p>
                <p
                  className="font-display font-bold text-2xl"
                  style={{ color: ORANGE }}
                >
                  Pune, India
                </p>
              </div>
            </div>
          </motion.div>

          {/* Body text */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <p
              className="font-body text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(0,0,0,0.65)" }}
            >
              We're a small group of creative thinkers who craft bespoke
              digital-first media experiences. We manage and catalog large-scale
              media archives stored on IBM LTO tapes, making them searchable,
              accessible, and beautifully organized for our clients.
            </p>
            <p
              className="font-body text-base leading-relaxed"
              style={{ color: "rgba(0,0,0,0.52)" }}
            >
              Our hardware fleet includes Symply PRO and MagStar tape writers —
              each asset cataloged with full provenance: Tape ID, LTO
              generation, hardware used, tape position, and date written.
            </p>
            <p
              className="font-body text-base leading-relaxed"
              style={{ color: "rgba(0,0,0,0.52)" }}
            >
              Web Emerging Technologies Pvt Ltd is headquartered in Pune, India,
              serving media houses, production studios, and archival
              institutions across the region.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: "01",
    title: "Media Archiving",
    desc: "Long-term preservation of your media on IBM LTO tape. We manage the full ingestion pipeline — from intake to verified write confirmation.",
  },
  {
    num: "02",
    title: "Asset Cataloging",
    desc: "Every asset gets a structured metadata record: Tape ID, LTO generation, writer hardware (Symply PRO or MagStar), tape position, and write date.",
  },
  {
    num: "03",
    title: "Tape Retrieval",
    desc: "Request specific assets for delivery. We track each retrieval order through four stages: Pending → In Progress → Ready → Delivered.",
  },
  {
    num: "04",
    title: "Client Access Portal",
    desc: "Secure web access to browse, search by metadata, upload, manage projects, and monitor retrieval request status in real time.",
  },
];

function ServicesSection() {
  return (
    <section
      className="text-black py-24 px-6 md:px-16"
      style={{
        background: LIGHT_ORANGE_ALT,
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
      data-ocid="services.section"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="flex flex-col gap-12"
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-5">
          <SectionLabel>Services</SectionLabel>
          <hr style={{ borderColor: "rgba(0,0,0,0.1)" }} />
          <h2 className="font-display text-3xl md:text-5xl font-bold text-black max-w-3xl leading-tight tracking-tight">
            From acquisition to retrieval, we're the ultimate media management
            partner.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ background: "rgba(0,0,0,0.08)" }}
        >
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.num}
              variants={fadeUp}
              className="p-8 md:p-10 flex flex-col gap-4 border-b border-black/10 last:border-b-0"
              style={{ background: LIGHT_ORANGE_ALT }}
              data-ocid={`services.item.${i + 1}`}
            >
              <span
                className="font-display text-5xl font-bold leading-none"
                style={{ color: ORANGE }}
              >
                {svc.num}
              </span>
              <h3 className="font-display text-xl font-bold text-black">
                {svc.title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "rgba(0,0,0,0.52)" }}
              >
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── ARTICLES ────────────────────────────────────────────────────────────────

function ArticlesSection() {
  return (
    <section
      id="articles"
      className="py-24 px-6 md:px-16"
      style={{ background: LIGHT_ORANGE, color: "#0a0a0a" }}
      data-ocid="articles.section"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="flex flex-col gap-10"
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <SectionLabel>Articles</SectionLabel>
          <hr style={{ borderColor: "rgba(0,0,0,0.1)" }} />
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-black">
            Latest Thinking
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {ARTICLES.map((article, i) => (
            <motion.article
              key={article.id}
              variants={fadeUp}
              className="flex flex-col gap-3 pt-5 border-t"
              style={{ borderColor: "rgba(0,0,0,0.15)" }}
              data-ocid={`articles.item.${i + 1}`}
            >
              <div className="flex items-center gap-4 flex-wrap">
                <span
                  className="font-body text-xs uppercase tracking-widest"
                  style={{ color: "rgba(0,0,0,0.38)" }}
                >
                  {article.date}
                </span>
                <span
                  className="font-body text-xs"
                  style={{ color: "rgba(0,0,0,0.28)" }}
                >
                  by {article.author}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold leading-tight text-black">
                {article.title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed line-clamp-3"
                style={{ color: "rgba(0,0,0,0.55)" }}
              >
                {article.excerpt}
              </p>
              <Link
                to="/articles/$id"
                params={{ id: article.id }}
                className="inline-flex items-center gap-2 text-sm font-body font-medium hover:gap-3 transition-all duration-300 mt-1"
                style={{ color: "rgba(0,0,0,0.6)" }}
                data-ocid={`articles.read_more_link.${i + 1}`}
              >
                Read more <ArrowRight size={13} />
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── CULTURE ─────────────────────────────────────────────────────────────────

function CultureSection() {
  return (
    <section
      className="text-black py-24 px-6 md:px-16"
      style={{
        background: LIGHT_ORANGE_ALT,
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
      data-ocid="culture.section"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="flex flex-col gap-10"
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <SectionLabel>Culture</SectionLabel>
          <hr style={{ borderColor: "rgba(0,0,0,0.1)" }} />
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-black">
            Our World
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "rgba(0,0,0,0.08)" }}
        >
          {CULTURE_TRIPS.map((trip, i) => (
            <motion.div
              key={trip.id}
              variants={fadeUp}
              className="p-8 relative overflow-hidden flex flex-col gap-3 transition-smooth"
              style={{ background: LIGHT_ORANGE_ALT }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "#fde4b0";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  LIGHT_ORANGE_ALT;
              }}
              data-ocid={`culture.item.${i + 1}`}
            >
              {/* Large year watermark */}
              <span
                className="absolute -bottom-3 -right-1 font-display font-bold select-none pointer-events-none"
                style={{
                  fontSize: "7rem",
                  lineHeight: 1,
                  opacity: 0.07,
                  color: "#111111",
                }}
                aria-hidden="true"
              >
                {trip.year}
              </span>
              <span
                className="font-body text-xs uppercase tracking-widest"
                style={{ color: "rgba(0,0,0,0.32)" }}
              >
                {trip.year}
              </span>
              <h3 className="font-display text-2xl font-bold text-black">
                {trip.location}
              </h3>
              <p
                className="font-body text-sm leading-relaxed relative z-10"
                style={{ color: "rgba(0,0,0,0.52)" }}
              >
                {trip.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── STORE ───────────────────────────────────────────────────────────────────

function StoreSection() {
  return (
    <section
      id="store"
      className="py-24 px-6 md:px-16"
      style={{ background: LIGHT_ORANGE, color: "#0a0a0a" }}
      data-ocid="store.section"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="flex flex-col gap-10"
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <SectionLabel>Store</SectionLabel>
          <hr style={{ borderColor: "rgba(0,0,0,0.1)" }} />
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-black">
            WeVirtual Merchandise
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: "rgba(0,0,0,0.08)" }}
        >
          {STORE_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className="flex flex-col gap-3 p-6"
              style={{ background: LIGHT_ORANGE }}
              data-ocid={`store.item.${i + 1}`}
            >
              <h3 className="font-display text-lg font-bold leading-tight text-black">
                {item.name}
              </h3>
              <p
                className="font-body font-bold text-2xl"
                style={{ color: ORANGE }}
              >
                ${item.price}
              </p>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "rgba(0,0,0,0.52)" }}
              >
                {item.description}
              </p>
              <button
                type="button"
                className="mt-auto w-full py-2.5 text-sm font-body font-semibold uppercase tracking-widest transition-smooth border border-black/60 text-black hover:bg-black hover:text-white"
                data-ocid={`store.shop_button.${i + 1}`}
              >
                Shop Now
              </button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── FOOTER CTA ──────────────────────────────────────────────────────────────

function FooterCTASection() {
  return (
    <section
      className="text-black py-28 px-6 md:px-16"
      style={{
        background: LIGHT_ORANGE_ALT,
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
      data-ocid="footer_cta.section"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10"
      >
        <motion.h2
          variants={fadeUp}
          className="font-display font-bold leading-tight tracking-tight text-black"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
        >
          Let's work together
        </motion.h2>

        <motion.div variants={fadeUp} className="shrink-0">
          <a
            href="mailto:sharad@wevirtual.cloud"
            className="inline-flex items-center gap-3 border border-black/60 px-8 py-4 text-sm font-body font-semibold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-smooth"
            data-ocid="footer_cta.get_in_touch_button"
          >
            Get in touch <ArrowRight size={14} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedWorkSection />
      <AboutSection />
      <ServicesSection />
      <ArticlesSection />
      <CultureSection />
      <StoreSection />
      <FooterCTASection />
    </>
  );
}

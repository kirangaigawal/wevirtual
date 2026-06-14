import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { CULTURE_TRIPS, STORE_ITEMS, getAutoPopulatedBlogs } from "../data";
import { useCinematicScroll } from "../hooks/useCinematicScroll";
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

// Cinematic word-split entrance variants
const wordContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

// Cinematic card entrance with scale
const cardReveal = (i: number) => ({
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
});

// Service card entrance
const serviceCardReveal = (i: number) => ({
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
});

// Blog card slide from left
const blogCardReveal = (i: number) => ({
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
});

// Color palette — use rgba so the fixed watermark (z-index 2) shows through
const LIGHT_ORANGE =
  "linear-gradient(160deg, #fff8ee 0%, #fff0d8 50%, #ffe8c4 100%)";
const PASTEL_GREEN = "rgba(212,237,218,0.88)"; // alternate sections
const PASTEL_GREEN_CARD = "rgba(234,246,237,0.92)"; // card faces on green sections
const PASTEL_GREEN_HOVER = "rgba(194,229,203,0.92)"; // card hover on green sections
const ORANGE = "#e05c00";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold font-body tracking-[0.22em] uppercase text-[#3d3d3d]">
      {children}
    </span>
  );
}

function ProjectCard({
  project,
  index = 0,
}: { project: Project; index?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={cardReveal(index)}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="group border border-black/10 p-6 md:p-8 flex flex-col gap-4 hover:border-black/30 transition-smooth"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[11px] font-body font-semibold tracking-widest uppercase text-[#3d3d3d]">
            {project.category}
          </span>
          <h3 className="font-display text-xl md:text-2xl font-bold text-black leading-tight truncate">
            {project.title}
          </h3>
        </div>
        <span className="font-body text-xs text-[#555555] shrink-0 mt-1 tracking-wide">
          {project.year}
        </span>
      </div>
      <p className="font-body text-[#2d2d2d] text-sm leading-relaxed line-clamp-3">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-body font-medium px-2 py-0.5 border border-black/15 text-[#3d3d3d] uppercase tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        to="/projects/$id"
        params={{ id: project.id }}
        className="mt-auto inline-flex items-center gap-2 text-sm font-body font-medium text-[#2d2d2d] hover:text-black hover:gap-3 transition-all duration-300"
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
          style={{ background: "rgba(212,237,218,0.88)" }}
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

// Unique token for each word position so React has stable keys
const TAGLINE_TOKENS = [
  "With",
  "over",
  "two",
  "decades",
  "of",
  "experience",
  "in",
  "the",
  "media",
  "and",
  "entertainment",
  "industry",
  "internationally,",
  "We",
  "Virtual",
  "helps",
  "keep",
  "your",
  "media",
  "secure",
  "whilst",
  "providing",
  "fast",
  "and",
  "easy",
  "access",
  "to",
  "your",
  "marketing",
  "teams.",
].map((w, i) => ({ word: w, id: `tw-${i}` }));

function useBinaryWallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorPos = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const drawFrameRef = useRef<(() => void) | null>(null);

  // Grid state — allocated once and reused
  const gridRef = useRef<{
    chars: string[]; // fixed 0/1 — never changes
    homeX: number[]; // base X of each cell
    homeY: number[]; // base Y of each cell
    offX: number[]; // current X displacement
    offY: number[]; // current Y displacement
    velX: number[]; // spring velocity X
    velY: number[]; // spring velocity Y
  } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    cursorPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    // Wake animation loop only when idle
    if (!isAnimatingRef.current && drawFrameRef.current) {
      isAnimatingRef.current = true;
      animFrameRef.current = requestAnimationFrame(drawFrameRef.current);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FONT_SIZE = 14;
    const CELL = 20; // wallpaper grid pitch
    const DENT_RADIUS = 36;
    const DENT_STRENGTH = 8;
    const DECAY = 0.94; // velocity damping per frame
    const RESTORE = 0.18; // spring restoring force
    const BASE_ALPHA = 0.1; // resting opacity — very faint
    const BOOST_ALPHA = 0.28; // opacity near cursor
    const IDLE_THRESHOLD = 0.15;

    const initGrid = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.ceil(canvas.width / CELL);
      const rows = Math.ceil(canvas.height / CELL);
      const total = cols * rows;
      const chars: string[] = [];
      const homeX: number[] = [];
      const homeY: number[] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          chars.push(Math.random() > 0.5 ? "1" : "0");
          homeX.push(col * CELL + CELL / 2);
          homeY.push(row * CELL + CELL);
        }
      }
      gridRef.current = {
        chars,
        homeX,
        homeY,
        offX: new Array(total).fill(0),
        offY: new Array(total).fill(0),
        velX: new Array(total).fill(0),
        velY: new Array(total).fill(0),
      };
    };

    const drawStatic = () => {
      const g = gridRef.current;
      if (!g) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.textAlign = "center";
      ctx.fillStyle = `rgba(224,92,0,${BASE_ALPHA.toFixed(3)})`;
      for (let i = 0; i < g.chars.length; i++) {
        ctx.fillText(g.chars[i], g.homeX[i], g.homeY[i]);
      }
    };

    // Spring-physics frame — runs only when cursor is active
    const drawFrame = () => {
      const g = gridRef.current;
      if (!g) {
        isAnimatingRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.textAlign = "center";

      const cx = cursorPos.current.x;
      const cy = cursorPos.current.y;
      const total = g.chars.length;
      let anyMotion = false;

      for (let i = 0; i < total; i++) {
        const hx = g.homeX[i];
        const hy = g.homeY[i];
        const dx = hx - cx;
        const dy = hy - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Radial push away from cursor
        if (dist < DENT_RADIUS && dist > 0) {
          const strength = ((DENT_RADIUS - dist) / DENT_RADIUS) * DENT_STRENGTH;
          g.velX[i] += (dx / dist) * strength * 0.4;
          g.velY[i] += (dy / dist) * strength * 0.4;
        }

        // Spring pull back to home
        g.velX[i] += -g.offX[i] * RESTORE;
        g.velY[i] += -g.offY[i] * RESTORE;
        // Damping
        g.velX[i] *= DECAY;
        g.velY[i] *= DECAY;
        // Integrate
        g.offX[i] += g.velX[i];
        g.offY[i] += g.velY[i];

        if (
          Math.abs(g.offX[i]) > IDLE_THRESHOLD ||
          Math.abs(g.offY[i]) > IDLE_THRESHOLD
        ) {
          anyMotion = true;
        }

        // Opacity boost near cursor
        let alpha = BASE_ALPHA;
        if (dist < DENT_RADIUS) {
          alpha =
            BASE_ALPHA +
            ((DENT_RADIUS - dist) / DENT_RADIUS) * (BOOST_ALPHA - BASE_ALPHA);
        }

        ctx.fillStyle = `rgba(224,92,0,${alpha.toFixed(3)})`;
        ctx.fillText(g.chars[i], hx + g.offX[i], hy + g.offY[i]);
      }

      if (anyMotion) {
        animFrameRef.current = requestAnimationFrame(drawFrame);
      } else {
        // Settled — snap to zero and draw clean static frame
        for (let i = 0; i < total; i++) {
          g.offX[i] = 0;
          g.offY[i] = 0;
          g.velX[i] = 0;
          g.velY[i] = 0;
        }
        drawStatic();
        isAnimatingRef.current = false;
      }
    };

    // Expose drawFrame to handleMouseMove via ref
    drawFrameRef.current = drawFrame;

    initGrid();
    drawStatic();

    const onResize = () => {
      if (animFrameRef.current !== null)
        cancelAnimationFrame(animFrameRef.current);
      isAnimatingRef.current = false;
      initGrid();
      drawStatic();
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (animFrameRef.current !== null)
        cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { canvasRef, handleMouseMove };
}

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const { canvasRef, handleMouseMove } = useBinaryWallpaper();

  const HEADLINE_WORDS = ["WeVirtual"];
  const SUBTITLE_WORDS = ["Digital-First", "Media", "Archive"];

  return (
    <section
      ref={heroRef}
      className="min-h-screen text-black flex flex-col justify-between px-6 md:px-16 pt-8 pb-10 relative overflow-hidden"
      style={{ background: LIGHT_ORANGE }}
      data-ocid="hero.section"
      onMouseMove={handleMouseMove}
    >
      {/* Binary rain canvas — behind all content, pointer-events: none */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Parallax mesh gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgParallaxY, zIndex: 1 }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(224,92,0,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(255,200,100,0.07) 0%, transparent 60%)",
            animation: "pulseMesh 8s ease-in-out infinite",
          }}
        />
      </motion.div>

      <hr
        style={{
          borderColor: "rgba(0,0,0,0.1)",
          position: "relative",
          zIndex: 2,
        }}
      />

      <motion.div
        style={{ y: heroY }}
        className="flex-1 flex flex-col justify-center gap-8 py-16 relative z-10"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col gap-6"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Media Asset Management</SectionLabel>
          </motion.div>

          {/* Cinematic word-by-word headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={wordContainerVariants}
            className="font-display font-bold leading-[0.88] tracking-[-0.02em]"
            style={{ fontSize: "clamp(4.5rem, 13vw, 11rem)" }}
          >
            {HEADLINE_WORDS.map((word) => (
              <motion.span
                key={word}
                variants={wordVariants}
                className="inline-block"
                style={{ color: "#111111" }}
              >
                {word}
              </motion.span>
            ))}
            <sup
              className="font-body font-normal align-super"
              style={{ fontSize: "0.28em", color: ORANGE }}
            >
              ®
            </sup>
          </motion.h1>

          {/* Subtitle with word-split blur entrance */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.06, delayChildren: 0.3 },
              },
            }}
            className="font-display text-xl md:text-3xl font-normal italic tracking-tight max-w-2xl"
            style={{ color: "#2d2d2d" }}
          >
            {SUBTITLE_WORDS.map((word) => (
              <motion.span
                key={word}
                variants={wordVariants}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* Word-by-word animated tagline */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.04, delayChildren: 0.8 },
              },
            }}
            className="font-body text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "#3d3d3d" }}
          >
            {TAGLINE_TOKENS.map((token) => (
              <motion.span
                key={token.id}
                variants={{
                  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.4 },
                  },
                }}
                className="inline-block mr-[0.28em]"
              >
                {token.word}
              </motion.span>
            ))}
          </motion.p>

          {/* CTA Button with scale entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-3 border border-black/60 px-8 py-4 text-sm font-body font-semibold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-smooth"
              data-ocid="hero.explore_button"
            >
              Explore Our Work <ArrowRight size={14} />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="flex items-center justify-between gap-8 relative z-10">
        <hr className="flex-1" style={{ borderColor: "rgba(0,0,0,0.1)" }} />
        <span className="font-body text-[11px] tracking-[0.2em] uppercase text-[#555555] shrink-0">
          ©2008–2026
        </span>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
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
          <ArrowDown size={16} style={{ color: "#555555" }} />
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
        background: PASTEL_GREEN,
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
                  : "border-transparent text-[#555555] hover:text-[#2d2d2d]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project grid — wrapped with perspective for 3D depth */}
        {isLoading ? (
          <ProjectGridSkeleton />
        ) : !projects || projects.length === 0 ? (
          <motion.div
            variants={fadeUp}
            className="py-24 flex flex-col items-center gap-4 border border-black/10"
            data-ocid="featured_work.empty_state"
          >
            <p className="font-display text-2xl text-[#555555]">
              No projects found
            </p>
            <p className="font-body text-[#555555] text-sm">
              Check back soon — great work takes time.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-px"
            style={{ perspective: 1000, background: "rgba(0,0,0,0.08)" }}
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                style={{ background: PASTEL_GREEN }}
                data-ocid={`featured_work.item.${i + 1}`}
              >
                <ProjectCard project={project} index={i} />
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
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Clip-path heading reveal */}
            <div className="overflow-hidden relative">
              <motion.blockquote
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
                className="font-display text-2xl md:text-4xl font-bold leading-tight tracking-tight text-black"
              >
                "WeVirtual.cloud is a next-generation media asset management
                platform developed by Web Emerging Technologies Pvt Ltd."
              </motion.blockquote>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex gap-10 pt-5 border-t"
              style={{ borderColor: "rgba(0,0,0,0.1)" }}
            >
              <div>
                <p
                  className="font-body text-xs tracking-widest uppercase mb-1"
                  style={{ color: "#3d3d3d" }}
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
                  style={{ color: "#3d3d3d" }}
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
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <p
              className="font-body text-base md:text-lg leading-relaxed"
              style={{ color: "#2d2d2d" }}
            >
              Our hardware fleet includes Symply PRO and MagStar tape writers —
              each asset cataloged with full provenance: Tape ID, LTO
              generation, hardware used, tape position, and date written. By
              combining powerful software with reliable LTO storage technology,
              we eliminate the risks of data loss, high cloud costs, and
              inefficient asset management.
            </p>
            <p
              className="font-body text-base leading-relaxed"
              style={{ color: "#3d3d3d" }}
            >
              We empower marketing teams, production houses, and enterprises to
              take full control of their media libraries.
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
        background: PASTEL_GREEN,
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
          {/* Clip-path heading reveal */}
          <div className="overflow-hidden relative">
            <motion.h2
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
              className="font-display text-3xl md:text-5xl font-bold text-black max-w-3xl leading-tight tracking-tight"
            >
              From acquisition to retrieval, we're the ultimate media management
              partner.
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.num}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={serviceCardReveal(i)}
              whileHover={{
                y: -6,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.10)",
                transition: { type: "spring", stiffness: 300, damping: 22 },
              }}
              className="group flex flex-col gap-4 rounded-xl p-8 md:p-10 border transition-all duration-300 cursor-default"
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
              data-ocid={`services.item.${i + 1}`}
            >
              <span
                className="font-display text-5xl font-bold leading-none"
                style={{ color: ORANGE }}
              >
                {svc.num}
              </span>
              {/* Hover-enlarge title */}
              <h3 className="font-display text-xl font-bold text-black transition-transform duration-300 group-hover:scale-105 origin-left">
                {svc.title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "#3d3d3d" }}
              >
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── BLOG ─────────────────────────────────────────────────────────────────────

function BlogSection() {
  const recentPosts = getAutoPopulatedBlogs(2);

  const CATEGORY_COLORS: Record<string, string> = {
    "LTO History": "#e05c00",
    "LTO Technology": "#2e7d52",
    "HDD News": "#1a5f8a",
    "SSD News": "#6b3fa0",
    "Storage Trends": "#a05c00",
  };

  return (
    <section
      id="blog"
      className="py-24 px-6 md:px-16"
      style={{ background: LIGHT_ORANGE, color: "#0a0a0a" }}
      data-ocid="blog.section"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="flex flex-col gap-10"
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="flex flex-col gap-4">
            <SectionLabel>Blog</SectionLabel>
            <hr style={{ borderColor: "rgba(0,0,0,0.1)" }} />
            {/* Clip-path heading reveal */}
            <div className="overflow-hidden relative">
              <motion.h2
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
                className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-black"
              >
                Latest from the Archive
              </motion.h2>
            </div>
          </div>
          <Link
            to="/blog"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-body font-semibold transition-all duration-300 hover:gap-3"
            style={{ color: ORANGE }}
            data-ocid="blog.view_all_link"
          >
            View all posts <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recentPosts.map((article, i) => {
            const catColor = CATEGORY_COLORS[article.category] ?? ORANGE;
            return (
              <motion.article
                key={article.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={blogCardReveal(i)}
                className="flex flex-col gap-4 pt-6 border-t"
                style={{ borderColor: "rgba(0,0,0,0.15)" }}
                data-ocid={`blog.featured.item.${i + 1}`}
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="text-[10px] font-body font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full text-white"
                    style={{ background: catColor }}
                  >
                    {article.category}
                  </span>
                  <span
                    className="font-body text-xs uppercase tracking-widest"
                    style={{ color: "#555555" }}
                  >
                    {article.date}
                  </span>
                  <span
                    className="font-body text-xs"
                    style={{ color: "#555555" }}
                  >
                    by {article.author}
                  </span>
                </div>
                <h3
                  className="font-display font-bold leading-tight text-black transition-all duration-300 hover:opacity-70 cursor-pointer"
                  style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)" }}
                >
                  <Link to="/articles/$id" params={{ id: article.id }}>
                    {article.title}
                  </Link>
                </h3>
                <p
                  className="font-body text-sm leading-relaxed line-clamp-3"
                  style={{ color: "#2d2d2d" }}
                >
                  {article.excerpt}
                </p>
                <Link
                  to="/articles/$id"
                  params={{ id: article.id }}
                  className="inline-flex items-center gap-2 text-sm font-body font-medium hover:gap-3 transition-all duration-300 mt-1"
                  style={{ color: ORANGE }}
                  data-ocid={`blog.read_more_link.${i + 1}`}
                >
                  Read more <ArrowRight size={13} />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

// ─── WORLD (CULTURE) ─────────────────────────────────────────────────────────

// Number of "Coming Soon" boxes matching original culture trips count
const WORLD_BOXES = CULTURE_TRIPS.map((t) => t.id);

function WorldSection() {
  return (
    <section
      id="culture"
      className="text-black py-24 px-6 md:px-16"
      style={{
        background: PASTEL_GREEN,
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
      data-ocid="world.section"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="flex flex-col gap-10"
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <SectionLabel>World</SectionLabel>
          <hr style={{ borderColor: "rgba(0,0,0,0.1)" }} />
          {/* Clip-path heading reveal */}
          <div className="overflow-hidden relative">
            <motion.h2
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
              className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-black"
            >
              Our World
            </motion.h2>
          </div>
        </motion.div>

        {/* Video placeholder with scale reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-xl overflow-hidden border flex items-center justify-center"
          style={{
            background: PASTEL_GREEN_CARD,
            borderColor: "rgba(0,0,0,0.1)",
            minHeight: "340px",
          }}
          data-ocid="world.video_placeholder"
        >
          {/* Play icon ring */}
          <div className="flex flex-col items-center gap-5 py-16 px-8 text-center">
            <div
              className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: ORANGE }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <polygon points="6,4 20,12 6,20" fill={ORANGE} />
              </svg>
            </div>
            <p className="font-display text-2xl md:text-3xl font-bold text-black">
              Video Coming Soon
            </p>
            <p
              className="font-body text-sm max-w-sm leading-relaxed"
              style={{ color: "#3d3d3d" }}
            >
              We're preparing an exclusive look into Our World at WeVirtual.
              Check back soon.
            </p>
          </div>
        </motion.div>

        {/* Coming Soon boxes — cinematic scale reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WORLD_BOXES.map((id, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.75,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 16px 40px rgba(0,0,0,0.10)",
                transition: { type: "spring", stiffness: 280, damping: 22 },
              }}
              className="group relative overflow-hidden flex flex-col items-center justify-center gap-3 rounded-xl p-10 border cursor-default"
              style={{
                background: PASTEL_GREEN_CARD,
                borderColor: "rgba(0,0,0,0.1)",
                minHeight: "160px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  PASTEL_GREEN_HOVER;
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  PASTEL_GREEN_CARD;
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(0,0,0,0.1)";
              }}
              data-ocid={`world.item.${i + 1}`}
            >
              {/* Hover-enlarge "Coming Soon" title */}
              <h3
                className="font-display text-xl font-bold text-black transition-transform duration-300 group-hover:scale-110 origin-center text-center"
                style={{ color: "#2d2d2d" }}
              >
                Coming Soon
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── STORE ───────────────────────────────────────────────────────────────────

function StoreSection() {
  return (
    <section
      id="clients"
      className="py-24 px-6 md:px-16"
      style={{ background: LIGHT_ORANGE, color: "#0a0a0a" }}
      data-ocid="clients.section"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="flex flex-col gap-10"
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <SectionLabel>Clients</SectionLabel>
          <hr style={{ borderColor: "rgba(0,0,0,0.1)" }} />
          {/* Clip-path heading reveal */}
          <div className="overflow-hidden relative">
            <motion.h2
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
              className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-black"
            >
              WeVirtual Clients
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STORE_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.75,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 16px 40px rgba(0,0,0,0.10)",
                transition: { type: "spring", stiffness: 280, damping: 22 },
              }}
              className="group flex items-center justify-center rounded-xl border"
              style={{
                background: PASTEL_GREEN_CARD,
                borderColor: "rgba(0,0,0,0.1)",
                minHeight: "160px",
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
              data-ocid={`clients.item.${i + 1}`}
            >
              {item.name === "Hindustan Unilever" ? (
                <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
                  <span
                    className="font-display font-black text-2xl md:text-3xl leading-tight tracking-tight transition-transform duration-300 group-hover:scale-105 origin-center"
                    style={{ color: "#003087" }}
                  >
                    Hindustan
                  </span>
                  <span
                    className="font-display font-black text-2xl md:text-3xl leading-tight tracking-tight transition-transform duration-300 group-hover:scale-105 origin-center"
                    style={{ color: "#003087" }}
                  >
                    Unilever
                  </span>
                  <span
                    className="font-body text-xs uppercase tracking-widest mt-1"
                    style={{ color: "#003087" }}
                  >
                    Client
                  </span>
                </div>
              ) : null}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-16"
      style={{
        background: LIGHT_ORANGE,
        borderTop: "1px solid rgba(0,0,0,0.08)",
        color: "#0a0a0a",
      }}
      data-ocid="contact.section"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="flex flex-col gap-10"
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <SectionLabel>Get in touch</SectionLabel>
          <hr style={{ borderColor: "rgba(0,0,0,0.1)" }} />
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-black">
            Contact Us
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Address card */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-5 rounded-xl border p-8 transition-all duration-300 hover:shadow-lg"
            style={{
              background: PASTEL_GREEN_CARD,
              borderColor: "rgba(0,0,0,0.1)",
            }}
            data-ocid="contact.address_card"
          >
            <div className="flex flex-col gap-1">
              <span
                className="font-body text-xs uppercase tracking-widest"
                style={{ color: "#555555" }}
              >
                Office Address
              </span>
              <h3 className="font-display text-xl font-bold text-black mt-1">
                Web Emerging Technologies Pvt Ltd
              </h3>
            </div>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "rgba(0,0,0,0.6)" }}
            >
              SR/NO - 44/3 ahead of Rims School,
              <br />
              Wadachiwadi Road, Undri,
              <br />
              Pune 411060, India
            </p>
          </motion.div>

          {/* Contact person card */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-5 rounded-xl border p-8 transition-all duration-300 hover:shadow-lg"
            style={{
              background: PASTEL_GREEN_CARD,
              borderColor: "rgba(0,0,0,0.1)",
            }}
            data-ocid="contact.person_card"
          >
            <div className="flex flex-col gap-1">
              <span
                className="font-body text-xs uppercase tracking-widest"
                style={{ color: "#555555" }}
              >
                Contact Person
              </span>
              <h3 className="font-display text-xl font-bold text-black mt-1">
                Sharad Deshmukh
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="tel:9823312123"
                className="font-body text-sm transition-smooth hover:opacity-60"
                style={{ color: ORANGE }}
                data-ocid="contact.phone_1"
              >
                +91 98233 12123
              </a>
              <a
                href="tel:9769295026"
                className="font-body text-sm transition-smooth hover:opacity-60"
                style={{ color: ORANGE }}
                data-ocid="contact.phone_2"
              >
                +91 97692 95026
              </a>
              <a
                href="mailto:sharad@wevirtual.cloud"
                className="font-body text-sm transition-smooth hover:opacity-60 mt-1"
                style={{ color: ORANGE }}
                data-ocid="contact.email"
              >
                sharad@wevirtual.cloud
              </a>
            </div>
          </motion.div>
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
        background: PASTEL_GREEN,
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
      data-ocid="footer_cta.section"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10"
      >
        {/* Clip-path heading reveal */}
        <div className="overflow-hidden relative">
          <motion.h2
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 1.3,
              ease: [0.77, 0, 0.175, 1],
              delay: 0.15,
            }}
            className="font-display font-bold leading-tight tracking-tight text-black"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
          >
            Let's work together
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0"
        >
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
  useCinematicScroll();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <FeaturedWorkSection />
        <AboutSection />
        <ServicesSection />
        <BlogSection />
        <WorldSection />
        <StoreSection />
        <ContactSection />
        <FooterCTASection />
      </motion.div>
    </AnimatePresence>
  );
}

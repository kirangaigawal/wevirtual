import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ARTICLES } from "../data";
import { useCinematicScroll } from "../hooks/useCinematicScroll";
import type { Article } from "../types";

const PASTEL_GREEN = "rgba(212,237,218,0.88)";
const PASTEL_GREEN_CARD = "rgba(234,246,237,0.92)";
const PASTEL_GREEN_HOVER = "rgba(194,229,203,0.92)";
const ORANGE = "#e05c00";

const CATEGORY_COLORS: Record<string, string> = {
  "LTO History": "#e05c00",
  "LTO Technology": "#2e7d52",
  "HDD News": "#1a5f8a",
  "SSD News": "#6b3fa0",
  "Storage Trends": "#a05c00",
};

const ALL_CATEGORIES = [
  "All",
  ...Array.from(new Set(ARTICLES.map((a) => a.category))),
];

const CUSTOM_EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];

function CategoryBadge({ category }: { category: string }) {
  const color = CATEGORY_COLORS[category] ?? ORANGE;
  return (
    <span
      className="text-[10px] font-body font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
      style={{ background: color, color: "#fff" }}
    >
      {category}
    </span>
  );
}

function BlogCard({ article, index }: { article: Article; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: CUSTOM_EASE }}
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow: "0 16px 40px rgba(0,0,0,0.1)",
        transition: { type: "spring", stiffness: 340, damping: 28 },
      }}
      className="group flex flex-col gap-4 rounded-xl p-6 border cursor-pointer"
      style={{
        background: PASTEL_GREEN_CARD,
        borderColor: "rgba(0,0,0,0.1)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = PASTEL_GREEN_HOVER;
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = PASTEL_GREEN_CARD;
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.1)";
      }}
      data-ocid={`blog.item.${index + 1}`}
    >
      <div className="flex items-center gap-3 flex-wrap">
        <CategoryBadge category={article.category} />
        <span className="font-body text-xs text-[#555555] uppercase tracking-widest">
          {article.date}
        </span>
      </div>

      {/* Title with hover-enlarge effect */}
      <h3
        className="font-display font-bold text-black leading-tight transition-all duration-300 group-hover:scale-[1.03] origin-left"
        style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)" }}
      >
        {article.title}
      </h3>

      <p
        className="font-body text-sm leading-relaxed line-clamp-3"
        style={{ color: "#2d2d2d" }}
      >
        {article.excerpt}
      </p>

      <div
        className="flex items-center justify-between pt-3 mt-auto border-t"
        style={{ borderColor: "rgba(0,0,0,0.1)" }}
      >
        <span
          className="font-body text-xs font-medium"
          style={{ color: "#3d3d3d" }}
        >
          by {article.author}
        </span>
        <Link
          to="/articles/$id"
          params={{ id: article.id }}
          className="inline-flex items-center gap-1.5 text-sm font-body font-semibold transition-all duration-300 hover:gap-2.5"
          style={{ color: ORANGE }}
          data-ocid={`blog.read_more_link.${index + 1}`}
        >
          Read more <ArrowRight size={13} />
        </Link>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  useCinematicScroll();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ background: PASTEL_GREEN, minHeight: "100vh", color: "#111" }}
    >
      {/* Page Header */}
      <section
        className="px-6 md:px-16 pt-12 pb-10"
        style={{
          background: PASTEL_GREEN,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-label text-[#3d3d3d] hover:text-black transition-smooth"
            data-ocid="blog.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex flex-col gap-3 max-w-3xl"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="text-[11px] font-semibold font-body tracking-[0.22em] uppercase text-[#3d3d3d]"
          >
            WeVirtual
          </motion.span>

          {/* Clip-path mask reveal on hero heading */}
          <motion.h1
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.1, ease: CUSTOM_EASE, delay: 0.2 }}
            className="font-display font-bold text-black leading-tight tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            Blog
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="font-body text-base md:text-lg text-[#2d2d2d] max-w-xl leading-relaxed"
          >
            Storage technology insights, LTO tape history, HDD and SSD news —
            two new posts published daily by the WeVirtual team.
          </motion.p>
        </motion.div>
      </section>

      {/* Category Filter — staggered x-slide */}
      <section
        className="px-6 md:px-16 py-6"
        style={{ background: PASTEL_GREEN }}
      >
        <motion.div
          className="flex flex-wrap gap-2 relative"
          role="tablist"
          aria-label="Blog category filter"
        >
          {ALL_CATEGORIES.map((cat, idx) => (
            <motion.button
              type="button"
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.05 * idx,
                duration: 0.45,
                ease: "easeOut",
              }}
              className="px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest rounded-full border transition-all duration-200 relative"
              style={
                activeCategory === cat
                  ? { background: ORANGE, color: "#fff", borderColor: ORANGE }
                  : {
                      background: "transparent",
                      color: "#3d3d3d",
                      borderColor: "rgba(0,0,0,0.2)",
                    }
              }
              data-ocid="blog.filter.tab"
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full"
                  style={{ background: ORANGE, zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              {cat}
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Blog Grid — cinematic scroll-triggered stagger */}
      <section
        className="px-6 md:px-16 pb-24"
        style={{ background: PASTEL_GREEN }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((article, i) => (
              <BlogCard key={article.id} article={article} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div
            className="py-20 flex flex-col items-center gap-4"
            data-ocid="blog.empty_state"
          >
            <p className="font-display text-2xl text-[#555555]">
              No posts in this category
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className="text-sm font-body font-semibold text-[#3d3d3d] hover:text-black transition-smooth underline"
            >
              Show all posts
            </button>
          </div>
        )}
      </section>
    </motion.div>
  );
}

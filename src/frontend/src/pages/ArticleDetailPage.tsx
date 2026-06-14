import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ARTICLES } from "../data";
import { useCinematicScroll } from "../hooks/useCinematicScroll";

// Pastel green palette consistent with alternate sections
const PASTEL_GREEN = "#d4edda";
const PASTEL_GREEN_LIGHT = "#e8f5eb";
const ORANGE = "#e05c00";
const CUSTOM_EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];

export default function ArticleDetailPage() {
  useCinematicScroll();
  const { id } = useParams({ from: "/articles/$id" });
  const article = ARTICLES.find((a) => a.id === id);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  if (!article) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-black"
        style={{ background: PASTEL_GREEN_LIGHT }}
        data-ocid="article_detail.error_state"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center px-6"
        >
          <p className="text-label text-[#3d3d3d] mb-4">404</p>
          <h1 className="text-h2 mb-6 text-black">Article not found</h1>
          <p className="font-body text-[#2d2d2d] mb-10 max-w-sm mx-auto leading-relaxed">
            This article doesn't exist or may have been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-label text-[#2d2d2d] hover:opacity-60 transition-smooth"
            data-ocid="article_detail.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>
      </div>
    );
  }

  const paragraphs = article.content
    .split("\n\n")
    .map((p, i) => ({ text: p.trim(), key: `para-${i}` }))
    .filter((p) => p.text);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      data-ocid="article_detail.page"
    >
      {/* Hero — pastel green with parallax */}
      <motion.section
        ref={heroRef}
        className="px-6 md:px-16 pt-10 pb-20 overflow-hidden"
        style={{ background: PASTEL_GREEN, color: "#111", y: heroParallaxY }}
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-12"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-label text-[#3d3d3d] hover:text-black transition-smooth"
            data-ocid="article_detail.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="mb-4 flex items-center gap-3"
          >
            <span
              className="text-[11px] font-body font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: ORANGE, color: "#fff" }}
            >
              {article.category}
            </span>
          </motion.div>

          {/* Clip-path mask reveal on article title */}
          <motion.h1
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.1, ease: CUSTOM_EASE, delay: 0.15 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-10 text-black"
            data-ocid="article_detail.title"
          >
            {article.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap items-center gap-6 border-t pt-8"
            style={{ borderColor: "rgba(0,0,0,0.12)" }}
          >
            <div>
              <p className="text-label text-[#555555] mb-1">Author</p>
              <p
                className="font-body font-semibold text-black"
                data-ocid="article_detail.author"
              >
                {article.author}
              </p>
            </div>
            <div
              className="w-px h-8 hidden sm:block"
              style={{ background: "rgba(0,0,0,0.15)" }}
            />
            <div>
              <p className="text-label text-[#555555] mb-1">Published</p>
              <p
                className="font-body font-semibold text-black"
                data-ocid="article_detail.date"
              >
                {article.date}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Body — lighter green */}
      <section
        className="px-6 md:px-16 py-20"
        style={{ background: PASTEL_GREEN_LIGHT, color: "#111" }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Excerpt pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border-l-4 pl-6 mb-14"
            style={{ borderColor: ORANGE }}
            data-ocid="article_detail.excerpt"
          >
            <p className="font-display text-xl md:text-2xl font-semibold leading-snug text-black">
              {article.excerpt}
            </p>
          </motion.blockquote>

          {/* Article body */}
          <div className="space-y-6" data-ocid="article_detail.content">
            {paragraphs.map(({ text, key }, i) => {
              const headingMatch = text.match(/^\*\*(.+?)\*\*$/);
              if (headingMatch) {
                return (
                  <motion.h2
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                    className="font-display text-2xl md:text-3xl font-bold tracking-tight mt-10 mb-2 text-black"
                  >
                    {headingMatch[1]}
                  </motion.h2>
                );
              }
              return (
                <motion.p
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  className="font-body text-lg leading-8"
                  style={{ color: "#2d2d2d" }}
                >
                  {text}
                </motion.p>
              );
            })}
          </div>

          {/* Footer nav */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-20 pt-10 border-t flex gap-6"
            style={{ borderColor: "rgba(0,0,0,0.12)" }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-label text-[#3d3d3d] hover:text-black transition-smooth"
              data-ocid="article_detail.bottom_back_link"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

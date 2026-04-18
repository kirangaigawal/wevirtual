import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { ARTICLES } from "../data";

export default function ArticleDetailPage() {
  const { id } = useParams({ from: "/articles/$id" });
  const article = ARTICLES.find((a) => a.id === id);

  if (!article) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground"
        data-ocid="article_detail.error_state"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center px-6"
        >
          <p className="text-label text-muted-foreground mb-4">404</p>
          <h1 className="text-h2 mb-6">Article not found</h1>
          <p className="text-muted-foreground font-body mb-10 max-w-sm mx-auto leading-relaxed">
            This article doesn't exist or may have been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-label hover:opacity-60 transition-smooth"
            data-ocid="article_detail.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
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
    <div data-ocid="article_detail.page">
      {/* Dark Hero */}
      <section className="section-dark px-6 md:px-16 pt-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-label opacity-60 hover:opacity-100 transition-smooth"
            data-ocid="article_detail.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to articles
          </Link>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-label opacity-50 mb-6"
          >
            Essay
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-10"
            data-ocid="article_detail.title"
          >
            {article.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-6 border-t border-primary-foreground/20 pt-8"
          >
            <div>
              <p className="text-label opacity-40 mb-1">Author</p>
              <p
                className="font-body font-medium"
                data-ocid="article_detail.author"
              >
                {article.author}
              </p>
            </div>
            <div className="w-px h-8 bg-primary-foreground/20 hidden sm:block" />
            <div>
              <p className="text-label opacity-40 mb-1">Published</p>
              <p
                className="font-body font-medium"
                data-ocid="article_detail.date"
              >
                {article.date}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Light Body */}
      <section className="section-light px-6 md:px-16 py-20">
        <div className="max-w-3xl mx-auto">
          {/* Excerpt pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border-l-4 border-foreground pl-6 mb-14"
            data-ocid="article_detail.excerpt"
          >
            <p className="font-display text-xl md:text-2xl font-semibold leading-snug text-foreground">
              {article.excerpt}
            </p>
          </motion.blockquote>

          {/* Article body */}
          <div className="space-y-6" data-ocid="article_detail.content">
            {paragraphs.map(({ text, key }, i) => {
              // Detect markdown-style bold heading like **Heading text**
              const headingMatch = text.match(/^\*\*(.+?)\*\*$/);
              if (headingMatch) {
                return (
                  <motion.h2
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
                    className="font-display text-2xl md:text-3xl font-bold tracking-tight mt-10 mb-2"
                  >
                    {headingMatch[1]}
                  </motion.h2>
                );
              }

              return (
                <motion.p
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.04,
                    ease: "easeOut",
                  }}
                  className="font-body text-lg leading-8 text-foreground/85"
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
            className="mt-20 pt-10 border-t border-border"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-label hover:opacity-50 transition-smooth"
              data-ocid="article_detail.bottom_back_link"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to articles
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

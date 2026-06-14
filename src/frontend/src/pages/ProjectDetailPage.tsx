import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Trophy } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useCinematicScroll } from "../hooks/useCinematicScroll";
import { useProject } from "../hooks/useProjects";

const CUSTOM_EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];
const SPRING_CINEMATIC = {
  type: "spring" as const,
  stiffness: 300,
  damping: 26,
};

export default function ProjectDetailPage() {
  useCinematicScroll();
  const { id } = useParams({ from: "/projects/$id" });
  const navigate = useNavigate();
  const { data: project, isLoading } = useProject(id);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh] bg-background"
        data-ocid="project_detail.loading_state"
      >
        <span className="text-label text-muted-foreground tracking-widest animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  if (!project) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] bg-background gap-6"
        data-ocid="project_detail.error_state"
      >
        <p className="text-h3 font-display">Project not found</p>
        <p className="text-muted-foreground font-body">
          This project doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate({ to: "/" })}
          type="button"
          className="text-label underline underline-offset-4 hover:opacity-60 transition-smooth"
          data-ocid="project_detail.back_button"
        >
          ← Back to work
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero — dark section with dramatic entrance */}
      <section className="section-dark min-h-[60vh] flex flex-col justify-end px-6 md:px-16 pb-16 pt-32 relative overflow-hidden">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, currentColor 39px, currentColor 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, currentColor 39px, currentColor 40px)",
          }}
        />

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="absolute top-8 left-6 md:left-16"
        >
          <button
            onClick={() => navigate({ to: "/" })}
            type="button"
            className="flex items-center gap-2 text-label text-[#3d3d3d] hover:text-primary-foreground transition-smooth"
            data-ocid="project_detail.back_button"
            aria-label="Back to work"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            <span>Back to work</span>
          </button>
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-4 mb-6"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...SPRING_CINEMATIC, delay: 0.15 }}
            className="text-label border border-primary-foreground/30 px-3 py-1 rounded-full"
            data-ocid="project_detail.category_tag"
          >
            {project.category}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-label text-[#555555]"
          >
            {project.year}
          </motion.span>
          {project.awardsCount > 0 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...SPRING_CINEMATIC, delay: 0.25 }}
              className="flex items-center gap-1.5 text-label text-[#555555]"
              data-ocid="project_detail.awards_badge"
            >
              <Trophy size={12} strokeWidth={2} />
              {project.awardsCount} Award{project.awardsCount !== 1 ? "s" : ""}
            </motion.span>
          )}
        </motion.div>

        {/* Title — clip-path mask reveal */}
        <motion.h1
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.1, ease: CUSTOM_EASE, delay: 0.2 }}
          className="text-hero max-w-4xl leading-tight"
          data-ocid="project_detail.title"
        >
          {project.title}
        </motion.h1>

        {/* Short description */}
        {project.description && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-lg font-body text-[#2d2d2d] max-w-2xl"
            data-ocid="project_detail.description"
          >
            {project.description}
          </motion.p>
        )}

        {/* Decorative bottom border */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 h-px bg-primary-foreground/20 origin-left"
        />
      </section>

      {/* Body — light section */}
      <section
        className="section-light w-full py-20"
        data-ocid="project_detail.body_section"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          {/* Project image with parallax */}
          {project.imageUrl && (
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12 rounded-xl overflow-hidden"
              style={{ y: imageParallaxY }}
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          )}

          {/* Full description */}
          {project.fullDescription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-label text-muted-foreground mb-4">Overview</p>
              <p
                className="text-lg md:text-xl font-body leading-relaxed text-foreground whitespace-pre-line"
                data-ocid="project_detail.full_description"
              >
                {project.fullDescription}
              </p>
            </motion.div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="mt-16"
            >
              <p className="text-label text-muted-foreground mb-4">Tags</p>
              <div
                className="flex flex-wrap gap-2"
                data-ocid="project_detail.tags_list"
              >
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...SPRING_CINEMATIC, delay: i * 0.07 }}
                    className="text-sm font-body border border-border px-3 py-1 rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-smooth cursor-default"
                    data-ocid={`project_detail.tag.${i + 1}`}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Divider + back link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-20 pt-10 border-t border-border"
          >
            <button
              onClick={() => navigate({ to: "/" })}
              type="button"
              className="flex items-center gap-2 text-label hover:opacity-60 transition-smooth"
              data-ocid="project_detail.back_link"
            >
              <ArrowLeft size={14} strokeWidth={2} />
              <span>Back to work</span>
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

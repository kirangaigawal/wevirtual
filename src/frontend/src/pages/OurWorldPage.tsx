import { motion } from "motion/react";
import { useCinematicScroll } from "../hooks/useCinematicScroll";

const LIGHT_ORANGE =
  "linear-gradient(160deg, #fff8ee 0%, #fff0d8 50%, #ffe8c4 100%)";
const ORANGE = "#e05c00";

const BOXES = [
  { label: "Stories" },
  { label: "Culture" },
  { label: "People" },
  { label: "Events" },
  { label: "Insights" },
  { label: "Vision" },
];

export default function OurWorldPage() {
  useCinematicScroll();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      style={{ background: LIGHT_ORANGE }}
      data-ocid="our_world_page"
    >
      {/* Center dramatic entrance with blur */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-5 text-center mb-16"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[11px] font-semibold font-body tracking-[0.22em] uppercase text-[#555555]"
        >
          WeVirtual
        </motion.span>

        {/* Clip-path mask reveal hero heading */}
        <motion.h1
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1], delay: 0.25 }}
          className="font-display font-bold leading-tight tracking-tight text-black"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        >
          Our World
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="font-display text-xl md:text-2xl font-normal italic"
          style={{ color: ORANGE }}
        >
          Coming Soon
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="font-body text-base max-w-md leading-relaxed"
          style={{ color: "#3d3d3d" }}
        >
          We’re building this section to share the values, story, and global
          reach behind the WeVirtual team. Stay tuned.
        </motion.p>
      </motion.div>

      {/* Coming soon boxes — staggered reveal */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        {BOXES.map((box, i) => (
          <motion.div
            key={box.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              delay: i * 0.1,
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              scale: 1.04,
              y: -4,
              boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
              transition: { type: "spring", stiffness: 340, damping: 28 },
            }}
            className="flex flex-col items-center justify-center gap-3 rounded-xl border p-8 cursor-default"
            style={{
              background: "rgba(255,255,255,0.5)",
              borderColor: "rgba(0,0,0,0.08)",
            }}
            data-ocid={`our_world.box.${i + 1}`}
          >
            <span
              className="font-body text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#888" }}
            >
              {box.label}
            </span>
            <span
              className="font-display text-sm font-bold"
              style={{ color: ORANGE }}
            >
              Coming Soon
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

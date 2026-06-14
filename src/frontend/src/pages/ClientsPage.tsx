import { motion } from "motion/react";
import { useCinematicScroll } from "../hooks/useCinematicScroll";

const LIGHT_ORANGE =
  "linear-gradient(160deg, #fff8ee 0%, #fff0d8 50%, #ffe8c4 100%)";
const ORANGE = "#e05c00";

const CLIENTS = [
  {
    name: "Hindustan Unilever",
    logo: "/assets/images/hul-logo.png",
    sector: "Consumer Goods",
  },
  { name: "Coming Soon", logo: null, sector: "" },
  { name: "Coming Soon", logo: null, sector: "" },
  { name: "Coming Soon", logo: null, sector: "" },
  { name: "Coming Soon", logo: null, sector: "" },
  { name: "Coming Soon", logo: null, sector: "" },
];

export default function ClientsPage() {
  useCinematicScroll();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      style={{ background: LIGHT_ORANGE }}
      data-ocid="clients_page"
    >
      {/* Dramatic entrance with blur */}
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
          WeVirtual Clients
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
          Our client portal is being prepared. Check back soon to access your
          media archive, project files, and retrieval requests.
        </motion.p>
      </motion.div>

      {/* Client logos / boxes — staggered scale reveal */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        {CLIENTS.map((client, i) => (
          <motion.div
            key={`${client.name}-${i}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              delay: i * 0.1,
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              scale: 1.05,
              y: -4,
              boxShadow: "0 14px 36px rgba(0,0,0,0.1)",
              transition: { type: "spring", stiffness: 340, damping: 28 },
            }}
            className="flex flex-col items-center justify-center gap-3 rounded-xl border p-8 cursor-default min-h-[140px]"
            style={{
              background: "rgba(255,255,255,0.5)",
              borderColor: "rgba(0,0,0,0.08)",
            }}
            data-ocid={`clients.item.${i + 1}`}
          >
            {client.logo ? (
              <img
                src={client.logo}
                alt={client.name}
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            ) : null}
            <span
              className="font-display text-sm font-bold text-center"
              style={{ color: client.logo ? "#111" : ORANGE }}
            >
              {client.name}
            </span>
            {client.sector ? (
              <span
                className="font-body text-[10px] uppercase tracking-widest"
                style={{ color: "#888" }}
              >
                {client.sector}
              </span>
            ) : null}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

import type { backendInterface } from "../backend";

const sampleProjects = [
  {
    id: "theory-verse",
    title: "Theory Verse",
    category: "Branding",
    year: BigInt(2024),
    tags: ["Brand Identity", "Typography", "Art Direction"],
    description:
      "A complete brand overhaul for an independent literary publisher pushing the boundaries of poetry and experimental fiction.",
    fullDescription:
      "Theory Verse approached us with a desire to stand apart from the traditional literary publishing world. We developed a striking monochromatic identity system anchored by a custom wordmark and an editorial grid system.",
    imageUrl: "/images/projects/theory-verse.jpg",
    awardsCount: BigInt(3),
  },
  {
    id: "scout-motors",
    title: "Scout Motors",
    category: "Digital",
    year: BigInt(2023),
    tags: ["Web Design", "UX", "Motion Design", "3D"],
    description:
      "A high-performance digital experience for a new generation of electric off-road vehicles.",
    fullDescription:
      "Scout Motors tasked us with creating a digital presence worthy of their bold automotive vision. We built an immersive, scroll-driven narrative that showcases vehicle specs through cinematic 3D renders.",
    imageUrl: "/images/projects/scout-motors.jpg",
    awardsCount: BigInt(5),
  },
  {
    id: "populous",
    title: "Populous",
    category: "Experience",
    year: BigInt(2023),
    tags: ["Spatial Design", "Wayfinding", "Environmental Branding"],
    description:
      "Experiential design for a world-leading sports and entertainment architecture firm.",
    fullDescription:
      "Populous designs the world's most iconic venues, and they needed a brand environment that matched that ambition.",
    imageUrl: "/images/projects/populous.jpg",
    awardsCount: BigInt(2),
  },
  {
    id: "mate-libre",
    title: "Mate Libre",
    category: "Branding",
    year: BigInt(2022),
    tags: ["Packaging", "Brand Identity", "Illustration"],
    description:
      "An expressive packaging and identity system for an artisanal yerba mate brand rooted in Argentine culture.",
    fullDescription:
      "Mate Libre is a premium yerba mate brand bringing authentic South American culture to a global audience.",
    imageUrl: "/images/projects/mate-libre.jpg",
    awardsCount: BigInt(4),
  },
  {
    id: "nova-commerce",
    title: "Nova Commerce",
    category: "E-commerce",
    year: BigInt(2023),
    tags: ["E-commerce", "UX Strategy", "Conversion Optimisation"],
    description:
      "A full e-commerce platform redesign for a fast-growing direct-to-consumer lifestyle brand.",
    fullDescription:
      "Nova Commerce had hit a growth ceiling with their legacy Shopify setup and needed a custom platform.",
    imageUrl: "/images/projects/nova-commerce.jpg",
    awardsCount: BigInt(3),
  },
  {
    id: "drift-magazine",
    title: "Drift Magazine",
    category: "Content",
    year: BigInt(2021),
    tags: ["Editorial", "Print Design", "Brand Identity"],
    description:
      "Art direction and identity evolution for a celebrated independent coffee and culture magazine.",
    fullDescription:
      "Drift Magazine is an independent publication dedicated to exploring coffee culture through the lens of place.",
    imageUrl: "/images/projects/drift-magazine.jpg",
    awardsCount: BigInt(1),
  },
];

export const mockBackend: backendInterface = {
  getProjects: async () => sampleProjects,
  getProjectsByCategory: async (category: string) =>
    sampleProjects.filter((p) => p.category === category),
  getProject: async (id: string) =>
    sampleProjects.find((p) => p.id === id) ?? null,
};

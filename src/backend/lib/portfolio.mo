import Types "../types/portfolio";
import List "mo:core/List";

module {
  public type Project = Types.Project;

  public func getAll(projects : List.List<Project>) : [Project] {
    projects.toArray();
  };

  public func getByCategory(projects : List.List<Project>, category : Text) : [Project] {
    let filtered = projects.filter(func(p) { p.category == category });
    filtered.toArray();
  };

  public func getById(projects : List.List<Project>, id : Text) : ?Project {
    projects.find(func(p) { p.id == id });
  };

  public func seed(projects : List.List<Project>) {
    projects.add({
      id = "theory-verse";
      title = "Theory Verse";
      category = "Branding";
      year = 2024;
      tags = ["Brand Identity", "Typography", "Art Direction"];
      description = "A complete brand overhaul for an independent literary publisher pushing the boundaries of poetry and experimental fiction. We crafted a visual language that balances intellectual rigour with raw creative energy.";
      fullDescription = "Theory Verse approached us with a desire to stand apart from the traditional literary publishing world. We developed a striking monochromatic identity system anchored by a custom wordmark and an editorial grid system. The resulting brand presence spans print, digital, and event collateral, positioning Theory Verse as the definitive home for progressive literary voices. The identity launched to widespread acclaim at the Frankfurt Book Fair 2024.";
      imageUrl = "/images/projects/theory-verse.jpg";
      awardsCount = 3;
    });
    projects.add({
      id = "scout-motors";
      title = "Scout Motors";
      category = "Digital";
      year = 2023;
      tags = ["Web Design", "UX", "Motion Design", "3D"];
      description = "A high-performance digital experience for a new generation of electric off-road vehicles. The site blurs the line between editorial storytelling and product marketing.";
      fullDescription = "Scout Motors tasked us with creating a digital presence worthy of their bold automotive vision. We built an immersive, scroll-driven narrative that showcases vehicle specs through cinematic 3D renders and layered motion sequences. Custom micro-interactions reward exploration, while a streamlined configurator reduces friction from interest to reservation. The experience drove a 240% uplift in reservation conversions in the first quarter post-launch.";
      imageUrl = "/images/projects/scout-motors.jpg";
      awardsCount = 5;
    });
    projects.add({
      id = "populous";
      title = "Populous";
      category = "Experience";
      year = 2023;
      tags = ["Spatial Design", "Wayfinding", "Environmental Branding"];
      description = "Experiential design for a world-leading sports and entertainment architecture firm. We translated their global portfolio into a coherent physical and digital brand environment.";
      fullDescription = "Populous designs the world's most iconic venues, and they needed a brand environment that matched that ambition. Our team developed a comprehensive wayfinding system, exhibition identity, and interactive installation for their new London studio. The spatial design uses a language of precision and scale, drawing direct references to architectural drawing conventions. The result is an office environment that functions as both a working studio and a living showcase of Populous's craft.";
      imageUrl = "/images/projects/populous.jpg";
      awardsCount = 2;
    });
    projects.add({
      id = "mate-libre";
      title = "Mate Libre";
      category = "Branding";
      year = 2022;
      tags = ["Packaging", "Brand Identity", "Illustration"];
      description = "An expressive packaging and identity system for an artisanal yerba mate brand rooted in Argentine culture. Bold illustration meets refined typographic structure.";
      fullDescription = "Mate Libre is a premium yerba mate brand bringing authentic South American culture to a global audience. We designed a complete packaging system featuring a series of hand-illustrated scenes depicting Buenos Aires street life, each variety telling a different story. The identity balances rough-hewn authenticity with premium shelf presence, helping Mate Libre secure listings across 12 countries within its first year. The packaging has since been featured in Packaging Digest and AIGA Eye on Design.";
      imageUrl = "/images/projects/mate-libre.jpg";
      awardsCount = 4;
    });
    projects.add({
      id = "destigmatize";
      title = "Destigmatize";
      category = "Content";
      year = 2022;
      tags = ["Editorial Design", "Campaign", "Social Content"];
      description = "A national mental health awareness campaign challenging stigma through personal stories, bold design, and community-driven content across print and digital channels.";
      fullDescription = "Destigmatize is a non-profit initiative committed to changing the conversation around mental health in Canada. We developed the campaign's creative strategy, visual identity, and content ecosystem, producing over 200 pieces of editorial and social content in the first campaign cycle. The design system is deliberately accessible and warm, prioritising readability and emotional resonance over aesthetic spectacle. The campaign reached 4.2 million Canadians and generated significant media coverage, resulting in a second-phase funding commitment from the federal government.";
      imageUrl = "/images/projects/destigmatize.jpg";
      awardsCount = 1;
    });
    projects.add({
      id = "axis-studio";
      title = "Axis Studio";
      category = "Digital";
      year = 2024;
      tags = ["Portfolio Site", "Animation", "Web Development"];
      description = "A portfolio and studio platform for a multidisciplinary design practice. The site functions as both a work showcase and a live demonstration of the studio's technical capabilities.";
      fullDescription = "Axis Studio is a Vancouver-based design collective working across branding, motion, and interactive media. We built a bespoke portfolio platform that prioritises the work above all else, using a fluid grid system and context-aware typography that adapts to each project's visual tone. Custom WebGL transitions and a generative background system ensure every visit feels dynamic without distracting from the work itself. The platform also includes a password-protected client area for sharing work in progress, built directly into the same seamless experience.";
      imageUrl = "/images/projects/axis-studio.jpg";
      awardsCount = 2;
    });
    projects.add({
      id = "meridian-health";
      title = "Meridian Health";
      category = "Branding";
      year = 2021;
      tags = ["Healthcare Branding", "Brand Strategy", "Digital Identity"];
      description = "A compassionate and confident rebrand for a regional healthcare network serving over half a million patients. We unified a fragmented brand architecture into a single, coherent identity.";
      fullDescription = "Meridian Health had grown through acquisition, resulting in a patchwork of legacy sub-brands that confused patients and eroded trust. Our engagement began with a six-month brand strategy phase, auditing all touchpoints and conducting extensive patient and staff research. The resulting identity is built around a flexible modular system that scales across 14 facilities while maintaining strong local recognition. Since launch, patient satisfaction surveys show a 28-point improvement in brand perception, and staff adoption of the new identity has been near-universal.";
      imageUrl = "/images/projects/meridian-health.jpg";
      awardsCount = 0;
    });
    projects.add({
      id = "nova-commerce";
      title = "Nova Commerce";
      category = "E-commerce";
      year = 2023;
      tags = ["E-commerce", "UX Strategy", "Conversion Optimisation"];
      description = "A full e-commerce platform redesign for a fast-growing direct-to-consumer lifestyle brand. We rebuilt the shopping experience from the ground up, prioritising speed, trust, and discovery.";
      fullDescription = "Nova Commerce had hit a growth ceiling with their legacy Shopify setup and needed a custom platform capable of handling their expanding product catalogue and international ambitions. We designed and built a headless commerce experience with a focus on personalisation, rapid product discovery, and a checkout flow that reduced abandonment by 34%. The new platform supports 18 localised storefronts across North America and Europe, with dynamic currency and language switching. In the 12 months following launch, Nova Commerce reported a 67% increase in revenue per visitor.";
      imageUrl = "/images/projects/nova-commerce.jpg";
      awardsCount = 3;
    });
    projects.add({
      id = "drift-magazine";
      title = "Drift Magazine";
      category = "Content";
      year = 2021;
      tags = ["Editorial", "Print Design", "Brand Identity"];
      description = "Art direction and identity evolution for a celebrated independent coffee and culture magazine distributed in 40 countries. We refined their visual language for a new chapter of global growth.";
      fullDescription = "Drift Magazine is an independent publication dedicated to exploring coffee culture through the lens of place. After seven successful issues, the founders engaged us to help evolve the brand for a wider audience without losing the intimate, handcrafted quality that earned them a devoted readership. We refined the typographic system, introduced a more structured grid while preserving editorial spontaneity, and developed new cover concept guidelines. The result is a magazine that feels both more confident and more personal, with Issue 8 selling out its first print run in under two weeks.";
      imageUrl = "/images/projects/drift-magazine.jpg";
      awardsCount = 1;
    });
    projects.add({
      id = "sapphire-collective";
      title = "Sapphire Collective";
      category = "E-commerce";
      year = 2020;
      tags = ["Luxury E-commerce", "Visual Identity", "Photography Direction"];
      description = "A luxury e-commerce experience and brand identity for an independent jewellery collective representing emerging designers from across the Asia-Pacific region.";
      fullDescription = "Sapphire Collective brings together independent jewellery designers from Japan, South Korea, Australia, and New Zealand under a single curated platform. We built their visual identity and digital commerce experience simultaneously, ensuring that every aspect of the brand — from logo to product page layout — communicates the same level of care and craftsmanship that defines the work itself. Photography art direction guidelines were developed alongside the platform to ensure consistency across dozens of independent designer submissions. Since launch, Sapphire Collective has been featured in Vogue Australia, Hypebae, and Wallpaper*.";
      imageUrl = "/images/projects/sapphire-collective.jpg";
      awardsCount = 2;
    });
    projects.add({
      id = "cedar-house";
      title = "Cedar House";
      category = "Experience";
      year = 2020;
      tags = ["Hospitality Branding", "Interior Identity", "Signage"];
      description = "A complete brand and environmental identity for a boutique hotel and wellness retreat in the mountains of British Columbia. Every touchpoint designed with restraint and intentionality.";
      fullDescription = "Cedar House is a 24-room retreat set in old-growth forest, drawing guests seeking genuine disconnection. The founders wanted a brand that felt grown rather than made — something that would age well and resist trend cycles. We developed an identity rooted in hand-drawn forms, natural materials, and a restrained typographic palette. The environmental design spans exterior signage and wayfinding to in-room print collateral and a custom ceramic amenity range developed in partnership with a local studio. Cedar House opened to full occupancy and has maintained a waitlist since its first season.";
      imageUrl = "/images/projects/cedar-house.jpg";
      awardsCount = 3;
    });
    projects.add({
      id = "rova-sports";
      title = "Rova Sports";
      category = "Digital";
      year = 2024;
      tags = ["Sports Tech", "App Design", "Motion System"];
      description = "A performance tracking platform and companion app for elite and amateur athletes. We designed a data-rich interface that remains legible and motivating during the hardest workouts.";
      fullDescription = "Rova Sports is a Montreal-based sports technology company building the next generation of athlete performance tools. We led product design for their iOS and Android applications, developing a design system capable of presenting complex biometric data — heart rate variability, power output, recovery scores — in a way that is instantly readable mid-workout. A custom motion system communicates state changes without relying on text labels, reducing cognitive load at peak exertion. The app launched with a 4.8-star rating on both platforms and was named a Best New App by Apple in its launch week.";
      imageUrl = "/images/projects/rova-sports.jpg";
      awardsCount = 4;
    });
  };
};

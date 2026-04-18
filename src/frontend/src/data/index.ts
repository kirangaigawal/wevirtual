import type { Article, CultureTrip, StoreItem } from "../types";

export const ARTICLES: Article[] = [
  {
    id: "locomotive-x-lightship",
    title: "Locomotive x Lightship",
    excerpt:
      "We partnered with Lightship to rethink their digital presence from the ground up — a story of craft, collaboration, and pushing the boundaries of what a brand website can be.",
    date: "March 2024",
    author: "Marie Tremblay",
    content: `When Lightship reached out, they had a clear ambition: build a digital experience that matched the ambition of their physical vessels. The brief was open-ended — and that's exactly how we like it.

We spent the first two weeks in deep immersion. Sailing vocabulary, naval engineering aesthetics, the romance of open water. We wanted every scroll interaction, every typographic choice, to carry the weight of that world.

The result is a site built around motion — not gratuitous animation for its own sake, but movement that mirrors the rolling of a vessel at sea. Horizontal scrolling sections give way to vertical revelation. Typography scales between intimacy and grandeur.

Working with Lightship's team was a genuine collaboration. Their creative director understood intuitively what we were reaching for, and that trust allowed us to go further than we might have otherwise.

The project took six months from kickoff to launch. Three rounds of motion prototyping. Two typographic resets. One late-night discovery that changed the entire navigation concept.

We're proud of what we built together. But more than the finished product, we're proud of how we got there.`,
  },
  {
    id: "should-i-use-locomotive-scroll",
    title: "Should I use Locomotive Scroll on my project?",
    excerpt:
      "Locomotive Scroll is our open-source library for smooth, parallax-driven page scrolling. But it's not right for every project. Here's how to think about the decision.",
    date: "January 2024",
    author: "Pierre Laval",
    content: `Locomotive Scroll has been downloaded millions of times. We're proud of it. But we also see it misused — slapped onto projects where it creates friction rather than delight.

So let's talk honestly about when to use it and when to reach for something else.

**The case for Locomotive Scroll**

When you have rich visual content — photography, video, illustration — that deserves to breathe as it enters the viewport, Locomotive Scroll excels. The parallax capabilities let you create depth and layering that feels genuinely cinematic.

For brand and portfolio sites, the library's ability to transform scroll into a narrative device is unmatched in the open-source ecosystem.

**The case against**

Content-heavy sites with lots of text? Proceed carefully. Smooth scrolling can create disorientation for users who need to scan and navigate quickly. Accessibility is also a real concern — users with vestibular disorders can find the motion overwhelming.

E-commerce and transactional interfaces should rarely use it. The friction adds cognitive load at exactly the wrong moment.

**Our rule of thumb**

If the primary goal of the experience is emotional impact, use it. If the primary goal is information retrieval or task completion, don't.

And always, always respect prefers-reduced-motion.`,
  },
  {
    id: "why-no-frontend-frameworks",
    title: "Why don't we use front-end frameworks at Locomotive?",
    excerpt:
      "React, Vue, Svelte — these are powerful tools. So why does Locomotive still build most client projects without them? The answer is about craft, performance, and the nature of the work we do.",
    date: "November 2023",
    author: "Alex Bouchard",
    content: `This question comes up in interviews, in client conversations, in comment threads. The answer is more nuanced than a hot take, so let us try to explain.

**What we actually build**

Most of what Locomotive creates is marketing and brand experiences — sites where the goal is emotion, perception, and identity. These sites typically don't have complex application state. There's no user authentication, no real-time data, no UI that needs to respond to dozens of user interactions.

For this work, adding React means adding significant JavaScript overhead in exchange for benefits that simply don't apply.

**What we gain without a framework**

Performance, mostly. A site built with vanilla JavaScript and modern CSS can be dramatically lighter than its React equivalent. For creative experiences where the browser is doing expensive rendering work for animation and WebGL, every kilobyte matters.

We also gain creative freedom. Framework conventions can constrain the strange, unexpected solutions that make truly original work. When you're not fighting against React's rendering model or Vue's reactivity system, you can reach for more direct solutions.

**When we do use frameworks**

For projects with genuine application complexity — admin panels, content management tools, anything with real state — we absolutely reach for React or Vue. The right tool for the right job.

The industry's reflex to reach for a framework before evaluating whether it's needed is what we're pushing back on. Not frameworks themselves.`,
  },
  {
    id: "revolution-of-workspace",
    title: "The revolution of the workspace",
    excerpt:
      "After years of remote work, distributed teams, and hybrid experiments, we redesigned our Montreal studio from scratch. Here's what we learned about how space shapes culture.",
    date: "September 2023",
    author: "Sophie Martin",
    content: `The pandemic didn't just change where we work. It changed what we believe work is for.

When we returned to the office — or rather, when we made the choice to return — we knew the old model wasn't right anymore. The pre-2020 open plan, the hot desks, the glass-walled meeting rooms — none of it reflected how we actually work best.

So we took a year to figure out what we actually needed.

**What we discovered**

Deep work needs protection. The kind of thinking required for genuinely original creative work — the kind that takes hours to get into and minutes to lose — can't happen in an environment optimized for visibility and spontaneous collaboration.

Collaboration needs ritual. The best conversations we have aren't accidental. They're structured: a shared problem, a clear starting point, time pressure, and a facilitator.

The space should be the last argument for coming in. If people are choosing to be in the office, the office should earn that choice.

**What we built**

Four zones: deep work (quiet, individual, with acoustic treatment), collaboration (large tables, whiteboards, no assigned seats), social (kitchen, lounge, deliberately informal), and creative (materials library, model-building area, where ideas can be made physical).

Six months in, we're more present when we're present, and more genuinely remote when we're remote. The space works because we designed it around behavior, not aesthetics.

Though it looks pretty good too.`,
  },
];

export const CULTURE_TRIPS: CultureTrip[] = [
  {
    id: "jamaica-2024",
    year: 2024,
    location: "Jamaica",
    description:
      "Seven days in Negril. The whole team, no laptops, no deliverables. We swam, cooked, argued about music, and remembered why we do this work together.",
    imageUrl: "/assets/images/trip-jamaica.jpg",
  },
  {
    id: "samana-2023",
    year: 2023,
    location: "Samaná",
    description:
      "The Dominican Republic's best-kept secret. Humpback whale watching, remote beaches, and a long dinner table that never seemed to empty.",
    imageUrl: "/assets/images/trip-samana.jpg",
  },
  {
    id: "playa-del-carmen-2022",
    year: 2022,
    location: "Playa del Carmen",
    description:
      "Mexico in February — the perfect antidote to a Montreal winter. Cenotes, tacos, mezcal, and a last-night bonfire that lasted until sunrise.",
    imageUrl: "/assets/images/trip-playa.jpg",
  },
  {
    id: "montreal-2021",
    year: 2021,
    location: "Montreal",
    description:
      "The pandemic year. We couldn't go far, so we went deep into our own city — a week of restaurant takeovers, gallery visits, and rooftop evenings.",
    imageUrl: "/assets/images/trip-montreal.jpg",
  },
  {
    id: "tulum-2020",
    year: 2020,
    location: "Tulum",
    description:
      "The last pre-pandemic trip. We didn't know it at the time, of course. Jungle cenotes, white sand, and a collective sense that we were exactly where we should be.",
    imageUrl: "/assets/images/trip-tulum.jpg",
  },
];

export const STORE_ITEMS: StoreItem[] = [
  {
    id: "white-tshirt",
    name: "White T-Shirt",
    price: 30,
    description:
      "100% organic cotton. Screen-printed wordmark. Heavyweight enough to mean it.",
    imageUrl: "/assets/images/store-tshirt.jpg",
  },
  {
    id: "tote-bag",
    name: "Tote Bag",
    price: 30,
    description:
      "Natural canvas, black print. Carries your laptop, your lunch, your moral complexity.",
    imageUrl: "/assets/images/store-tote.jpg",
  },
  {
    id: "cotton-socks",
    name: "Cotton Socks",
    price: 20,
    description: "Ribbed crew socks. White with black logo heel. Made to last.",
    imageUrl: "/assets/images/store-socks.jpg",
  },
  {
    id: "beanie-hat",
    name: "Beanie Hat",
    price: 20,
    description:
      "Merino blend. Black. Subtle embroidered logo. Essential for Montreal winters.",
    imageUrl: "/assets/images/store-beanie.jpg",
  },
  {
    id: "hoodie",
    name: "Hoodie",
    price: 90,
    description:
      "Heavyweight fleece. Oversized fit. The one you'll wear every day and never want to wash.",
    imageUrl: "/assets/images/store-hoodie.jpg",
  },
];

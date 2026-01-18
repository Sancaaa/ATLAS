import { Talk } from "./types";

export const talks: Talk[] = [
  {
    slug: "the-power-of-vulnerability",
    title: "The Power of Vulnerability",
    description:
      "Exploring how embracing vulnerability can transform our connections, creativity, and sense of belonging in an increasingly disconnected world.",
    videoId: "iCvmsMzlF7o", // Sample YouTube video
    duration: 1220,
    publishedAt: "2024-01-15T10:00:00Z",
    speaker: {
      name: "Dr. Sarah Chen",
      title: "Research Professor, Social Psychology",
      bio: "Dr. Sarah Chen is a research professor at Stanford University, where she studies human connection, belonging, and authenticity. Her work has been featured in major publications and her TED-style talks have reached millions worldwide.",
    },
    tags: ["Psychology", "Human Connection", "Personal Growth"],
    transcript: [
      {
        id: "seg-1",
        startTime: 0,
        endTime: 8,
        text: "So I'd like to start by asking you a question: When was the last time you allowed yourself to be truly vulnerable?",
      },
      {
        id: "seg-2",
        startTime: 8,
        endTime: 18,
        text: "Not just the kind of vulnerability where you share a minor inconvenience, but the deep, scary kind where you risk being truly seen.",
      },
      {
        id: "seg-3",
        startTime: 18,
        endTime: 32,
        text: "For most of us, the answer is probably 'not recently.' We live in a culture that tells us vulnerability is weakness, that being open about our struggles is unprofessional, inappropriate, or just too much.",
      },
      {
        id: "seg-4",
        startTime: 32,
        endTime: 45,
        text: "But here's what my research has shown over the past decade: vulnerability isn't weakness. In fact, it might be our greatest measure of courage.",
      },
      {
        id: "seg-5",
        startTime: 45,
        endTime: 58,
        text: "When we armor ourselves against vulnerability, we don't just protect ourselves from pain and disappointment. We also shut ourselves off from love, belonging, joy, and creativity.",
      },
    ],
  },
  {
    slug: "designing-for-accessibility",
    title: "Designing for Accessibility: Building a Web for Everyone",
    description:
      "A practical guide to creating digital experiences that work for people of all abilities, showing how accessibility constraints often lead to better design for everyone.",
    videoId: "iCvmsMzlF7o", // Sample YouTube video
    duration: 980,
    publishedAt: "2024-02-20T14:30:00Z",
    speaker: {
      name: "Marcus Rivera",
      title: "Senior UX Designer & Accessibility Advocate",
      bio: "Marcus Rivera is a senior UX designer who lost his sight at age 25. This experience transformed his approach to design, making him a leading voice in digital accessibility. He now consults with major tech companies to build more inclusive products.",
    },
    tags: ["Design", "Technology", "Accessibility", "Inclusion"],
    transcript: [
      {
        id: "seg-1",
        startTime: 0,
        endTime: 12,
        text: "I want you to imagine trying to use your favorite app or website without being able to see the screen. How would you navigate? How would you know what button to press?",
      },
      {
        id: "seg-2",
        startTime: 12,
        endTime: 24,
        text: "This isn't a hypothetical for me. I lost my sight seven years ago, and suddenly the digital world I had helped build as a designer became largely inaccessible to me.",
      },
      {
        id: "seg-3",
        startTime: 24,
        endTime: 38,
        text: "But here's what I learned: when we design for accessibility, we don't just help people with disabilities. We make better products for everyone.",
      },
      {
        id: "seg-4",
        startTime: 38,
        endTime: 52,
        text: "Think about curb cuts—those sloped ramps at street corners. They were designed for wheelchair users, but they help parents with strollers, delivery workers with carts, and anyone with wheeled luggage.",
      },
      {
        id: "seg-5",
        startTime: 52,
        endTime: 68,
        text: "The same principle applies to digital design. Captions help people in noisy environments. Clear navigation helps everyone find what they need faster. High contrast text is easier for everyone to read.",
      },
    ],
  },
  {
    slug: "future-of-sustainable-cities",
    title: "The Future of Sustainable Cities",
    description:
      "An architect's vision for reimagining urban spaces to be more livable, equitable, and environmentally sustainable through innovative design and community-centered planning.",
    videoId: "iCvmsMzlF7o", // Sample YouTube video
    duration: 1050,
    publishedAt: "2024-03-10T16:00:00Z",
    speaker: {
      name: "Amara Okonkwo",
      title: "Architect & Urban Planning Expert",
      bio: "Amara Okonkwo is an award-winning architect specializing in sustainable urban development. Her projects across Africa and Asia have redefined how cities can grow while prioritizing both people and planet.",
    },
    tags: ["Architecture", "Sustainability", "Urban Planning", "Environment"],
    transcript: [
      {
        id: "seg-1",
        startTime: 0,
        endTime: 10,
        text: "By 2050, nearly 70% of the world's population will live in cities. The question is: what kind of cities will they be?",
      },
      {
        id: "seg-2",
        startTime: 10,
        endTime: 24,
        text: "Will they be concrete jungles where inequality grows and the environment suffers? Or can we create urban spaces that are actually good for people and the planet?",
      },
      {
        id: "seg-3",
        startTime: 24,
        endTime: 40,
        text: "I believe we can choose the latter, but it requires us to completely rethink how we design and build our cities. We need to move beyond the car-centric, sprawling model that has dominated urban planning for the past century.",
      },
      {
        id: "seg-4",
        startTime: 40,
        endTime: 55,
        text: "Sustainable cities aren't just about adding some solar panels or planting a few trees. They're about fundamentally reimagining how people move, live, work, and interact within urban spaces.",
      },
      {
        id: "seg-5",
        startTime: 55,
        endTime: 72,
        text: "In my work across different continents, I've seen that the most successful sustainable cities share three key principles: they're walkable, they're mixed-use, and they prioritize public spaces where community can flourish.",
      },
    ],
  },
];

// Helper function to get a single talk by slug
export function getTalkBySlug(slug: string): Talk | undefined {
  return talks.find((talk) => talk.slug === slug);
}

// Helper function to get all talk slugs (for static generation)
export function getAllTalkSlugs(): string[] {
  return talks.map((talk) => talk.slug);
}

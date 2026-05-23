export interface CourseItem {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  price: number;
  lessons: number;
  duration: string;
  enrolled: number;
  description: string;
  learnPoints: string[];
  thumbnail: string;
  theme: "teal" | "purple" | "orange";
}

export interface StudyItem {
  id: string;
  title: string;
  lessons: number;
  duration: string;
  progress: number;
  thumbnail: string;
}

export const categories = ["Development", "Design", "IT & Software", "Business", "Photography"];

const sharedThumb = "/learning/learning-hero.webp";

export const popularCourses: CourseItem[] = [
  {
    id: "bpm",
    title: "Business Process Management (BPM) Class",
    instructor: "Jaysen Batchelor",
    rating: 4.7,
    reviews: 1240,
    price: 58,
    lessons: 68,
    duration: "12h 20min",
    enrolled: 1324,
    description: "Learn the Business Process Management methods used by the world's most successful organizations.",
    learnPoints: [
      "Learn how to build a Process Architecture.",
      "Learn what makes a great BPM Analyst.",
      "Learn how to use industry-leading BPM tools.",
      "Learn what makes a great BPM Architect.",
      "Understand process optimization with practical case studies.",
      "Build your own BPM implementation roadmap for teams.",
    ],
    thumbnail: sharedThumb,
    theme: "teal",
  },
  {
    id: "graphic",
    title: "Graphic Design Bootcamp",
    instructor: "Eric Ries",
    rating: 4.6,
    reviews: 1035,
    price: 64,
    lessons: 54,
    duration: "10h 30min",
    enrolled: 1090,
    description: "A complete guide to modern visual communication, layout systems, and high-converting design flows.",
    learnPoints: ["Typography systems", "Color psychology", "Composition and hierarchy", "Creative workflow"],
    thumbnail: sharedThumb,
    theme: "purple",
  },
  {
    id: "digital",
    title: "Digital Marketing Masterclass",
    instructor: "Jayse Morgan",
    rating: 4.7,
    reviews: 980,
    price: 75,
    lessons: 72,
    duration: "15h 10min",
    enrolled: 2012,
    description: "Build practical campaigns across SEO, paid ads, and content systems used by growth teams.",
    learnPoints: ["Campaign planning", "Performance tracking", "Ad optimization", "SEO fundamentals"],
    thumbnail: sharedThumb,
    theme: "orange",
  },
];

export const studyingCourses: StudyItem[] = [
  {
    id: "blender",
    title: "The Ultimate Blender 3D Nodes",
    lessons: 34,
    duration: "4h 20min",
    progress: 65,
    thumbnail: sharedThumb,
  },
  {
    id: "unity",
    title: "C# Unity Game Development",
    lessons: 42,
    duration: "6h 12min",
    progress: 48,
    thumbnail: sharedThumb,
  },
  {
    id: "uiux",
    title: "UI Motion and Interaction Design",
    lessons: 28,
    duration: "3h 55min",
    progress: 81,
    thumbnail: sharedThumb,
  },
];

export const tabItems = [
  { key: "featured", label: "Featured" },
  { key: "search", label: "Search" },
  { key: "learning", label: "My Learning" },
  { key: "wishlist", label: "Wishlist" },
  { key: "account", label: "Account" },
] as const;

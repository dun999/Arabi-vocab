import type { Category, CategorySlug } from "@/types/vocab";

export const CATEGORIES: Category[] = [
  {
    slug: "technology",
    name_en: "Technology",
    name_id: "Teknologi",
    name_ar: "تكنولوجيا",
    icon: "Cpu",
    count: 0,
  },
  {
    slug: "ai",
    name_en: "Artificial Intelligence",
    name_id: "Kecerdasan Buatan",
    name_ar: "الذكاء الاصطناعي",
    icon: "Brain",
    count: 0,
  },
  {
    slug: "social-media",
    name_en: "Social Media",
    name_id: "Media Sosial",
    name_ar: "وسائل التواصل",
    icon: "Share2",
    count: 0,
  },
  {
    slug: "business",
    name_en: "Business & Startups",
    name_id: "Bisnis & Startup",
    name_ar: "أعمال وشركات ناشئة",
    icon: "Briefcase",
    count: 0,
  },
  {
    slug: "design",
    name_en: "Design & Creativity",
    name_id: "Desain & Kreativitas",
    name_ar: "تصميم وإبداع",
    icon: "Palette",
    count: 0,
  },
  {
    slug: "gaming",
    name_en: "Gaming",
    name_id: "Game",
    name_ar: "ألعاب",
    icon: "Gamepad2",
    count: 0,
  },
  {
    slug: "finance",
    name_en: "Finance",
    name_id: "Keuangan",
    name_ar: "مالية",
    icon: "Wallet",
    count: 0,
  },
  {
    slug: "culture",
    name_en: "Culture & Lifestyle",
    name_id: "Budaya & Gaya Hidup",
    name_ar: "ثقافة ونمط الحياة",
    icon: "Globe",
    count: 0,
  },
  {
    slug: "media",
    name_en: "Media",
    name_id: "Media",
    name_ar: "إعلام",
    icon: "Radio",
    count: 0,
  },
  {
    slug: "everyday",
    name_en: "Everyday Speech",
    name_id: "Percakapan Sehari-hari",
    name_ar: "كلام يومي",
    icon: "MessageCircle",
    count: 0,
  },
];

export function getCategoryBySlug(slug: CategorySlug): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryIcon(slug: CategorySlug): string {
  return getCategoryBySlug(slug)?.icon || "Tag";
}

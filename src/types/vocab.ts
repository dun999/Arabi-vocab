export interface VocabEntry {
  id: string;
  term_en: string;
  term_id: string;
  term_ar: string;
  transliteration: string;
  definition_en: string;
  definition_id: string;
  definition_ar: string;
  category: CategorySlug;
  tags: string[];
  formality: "formal" | "informal" | "technical" | "slang";
  usage_notes: string;
  example_en: string;
  example_id: string;
  example_ar: string;
  alternatives: string[];
  related_ids: string[];
  status: "published";
}

export interface Submission {
  id: string;
  term_en: string;
  term_id: string;
  term_ar: string;
  explanation: string;
  example: string;
  source_context: string;
  submitter_email: string;
  status: "pending" | "approved" | "rejected";
  admin_notes: string;
  created_at: string;
  reviewed_at: string | null;
}

export type CategorySlug =
  | "technology"
  | "ai"
  | "social-media"
  | "business"
  | "design"
  | "gaming"
  | "finance"
  | "culture"
  | "media"
  | "everyday";

export interface Category {
  slug: CategorySlug;
  name_en: string;
  name_id: string;
  name_ar: string;
  icon: string;
  count: number;
}

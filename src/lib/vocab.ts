import { promises as fs } from "fs";
import path from "path";
import { CATEGORIES } from "@/lib/categories";
import type { Category, CategorySlug, Submission, VocabEntry } from "@/types/vocab";

const dataDir = path.join(process.cwd(), "data");
const vocabPath = path.join(dataDir, "vocab.json");
const submissionsPath = path.join(dataDir, "submissions.json");

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile<T>(filePath: string, value: T) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function normalize(value: string) {
  return value.toLowerCase().trim();
}

export async function getAllVocab(): Promise<VocabEntry[]> {
  const entries = await readJsonFile<VocabEntry[]>(vocabPath, []);
  return entries.filter((entry) => entry.status === "published");
}

export async function getVocabById(id: string): Promise<VocabEntry | undefined> {
  const entries = await getAllVocab();
  return entries.find((entry) => entry.id === id);
}

export async function searchVocab(query = ""): Promise<VocabEntry[]> {
  const entries = await getAllVocab();
  const q = normalize(query);

  if (!q) return entries;

  return entries.filter((entry) => {
    const searchable = [
      entry.term_en,
      entry.term_id,
      entry.term_ar,
      entry.transliteration,
      entry.definition_en,
      entry.definition_id,
      entry.definition_ar,
      entry.category,
      entry.formality,
      entry.usage_notes,
      ...entry.tags,
      ...entry.alternatives,
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(q);
  });
}

export async function filterVocab(options: {
  query?: string;
  category?: string;
  formality?: string;
}): Promise<VocabEntry[]> {
  let entries = await searchVocab(options.query || "");

  if (options.category && options.category !== "all") {
    entries = entries.filter((entry) => entry.category === options.category);
  }

  if (options.formality && options.formality !== "all") {
    entries = entries.filter((entry) => entry.formality === options.formality);
  }

  return entries;
}

export async function getVocabByCategory(slug: CategorySlug): Promise<VocabEntry[]> {
  const entries = await getAllVocab();
  return entries.filter((entry) => entry.category === slug);
}

export async function getFeaturedVocab(): Promise<VocabEntry[]> {
  const entries = await getAllVocab();
  return ["algorithm", "ai", "startup", "prompt", "user-experience", "podcast"]
    .map((id) => entries.find((entry) => entry.id === id))
    .filter(Boolean) as VocabEntry[];
}

export async function getCategories(): Promise<Category[]> {
  const entries = await getAllVocab();
  return CATEGORIES.map((category) => ({
    ...category,
    count: entries.filter((entry) => entry.category === category.slug).length,
  }));
}

export async function getRelatedVocab(entry: VocabEntry): Promise<VocabEntry[]> {
  const entries = await getAllVocab();
  return entry.related_ids
    .map((id) => entries.find((item) => item.id === id))
    .filter(Boolean) as VocabEntry[];
}

export async function addSubmission(data: Omit<Submission, "id" | "status" | "admin_notes" | "created_at" | "reviewed_at">) {
  const submissions = await getSubmissions();
  const submission: Submission = {
    id: crypto.randomUUID(),
    ...data,
    status: "pending",
    admin_notes: "",
    created_at: new Date().toISOString(),
    reviewed_at: null,
  };

  submissions.unshift(submission);
  await writeJsonFile(submissionsPath, submissions);
  return submission;
}

export async function getSubmissions(status?: Submission["status"]): Promise<Submission[]> {
  const submissions = await readJsonFile<Submission[]>(submissionsPath, []);
  if (!status) return submissions;
  return submissions.filter((submission) => submission.status === status);
}

export async function updateSubmission(id: string, updates: Partial<Submission>) {
  const submissions = await getSubmissions();
  const index = submissions.findIndex((submission) => submission.id === id);

  if (index === -1) return null;

  submissions[index] = {
    ...submissions[index],
    ...updates,
    reviewed_at: updates.status && updates.status !== "pending" ? new Date().toISOString() : submissions[index].reviewed_at,
  };

  await writeJsonFile(submissionsPath, submissions);
  return submissions[index];
}

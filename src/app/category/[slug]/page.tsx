import { notFound } from "next/navigation";
import { VocabCard } from "@/components/vocab-card";
import { getCategoryBySlug } from "@/lib/categories";
import { getVocabByCategory } from "@/lib/vocab";
import type { CategorySlug } from "@/types/vocab";

export default async function CategoryPage({ params }: { params: Promise<{ slug: CategorySlug }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const entries = await getVocabByCategory(slug);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="arabic-text text-right text-primary" dir="rtl">{category.name_ar}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">{category.name_en}</h1>
      <p className="mt-3 text-muted-foreground">{category.name_id} · {entries.length} entries</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => <VocabCard key={entry.id} entry={entry} />)}
      </div>
    </div>
  );
}

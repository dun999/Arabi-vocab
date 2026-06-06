import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/search-bar";
import { VocabCard } from "@/components/vocab-card";
import { filterVocab, getCategories } from "@/lib/vocab";

export default async function VocabPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const q = params.q || "";
  const category = params.category || "all";
  const formality = params.formality || "all";
  const [entries, categories] = await Promise.all([filterVocab({ query: q, category, formality }), getCategories()]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">Browse vocabulary</h1>
        <p className="mt-3 text-muted-foreground">Universal search across Indonesian, English, Arabic, tags, categories, and definitions.</p>
      </div>
      <SearchBar initialQuery={q} />

      <div className="mt-8 flex flex-wrap gap-2">
        <Link href={`/vocab${q ? `?q=${encodeURIComponent(q)}` : ""}`}><Badge variant={category === "all" ? "default" : "secondary"}>All</Badge></Link>
        {categories.map((item) => (
          <Link key={item.slug} href={`/vocab?category=${item.slug}${q ? `&q=${encodeURIComponent(q)}` : ""}`}>
            <Badge variant={category === item.slug ? "default" : "secondary"}>{item.name_en}</Badge>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {["all", "formal", "informal", "technical", "slang"].map((item) => (
          <Link key={item} href={`/vocab?${new URLSearchParams({ ...(q && { q }), ...(category !== "all" && { category }), ...(item !== "all" && { formality: item }) }).toString()}`}>
            <Badge variant={formality === item ? "default" : "outline"} className="capitalize">{item}</Badge>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-sm text-muted-foreground">{entries.length} result{entries.length === 1 ? "" : "s"}</div>
      {entries.length > 0 ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => <VocabCard key={entry.id} entry={entry} />)}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-border bg-card/60 p-10 text-center text-muted-foreground">No matches yet. Try another word or submit a suggestion.</div>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VocabCard } from "@/components/vocab-card";
import { getCategoryBySlug } from "@/lib/categories";
import { getAllVocab, getRelatedVocab, getVocabById } from "@/lib/vocab";

export async function generateStaticParams() {
  const entries = await getAllVocab();
  return entries.map((entry) => ({ id: entry.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const entry = await getVocabById(id);
  if (!entry) return {};
  return {
    title: `${entry.term_en} · ${entry.term_ar} | Arabic Modern Vocabulary`,
    description: entry.definition_en,
  };
}

export default async function VocabDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await getVocabById(id);
  if (!entry) notFound();
  const [related, category] = await Promise.all([getRelatedVocab(entry), Promise.resolve(getCategoryBySlug(entry.category))]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-border bg-card/65 p-8 sm:p-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="arabic-text text-right text-6xl font-semibold leading-relaxed text-primary" dir="rtl">{entry.term_ar}</p>
            <p className="mt-2 text-muted-foreground">{entry.transliteration}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>{category?.name_en}</Badge>
            <Badge variant="outline" className="capitalize">{entry.formality}</Badge>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-secondary/70 p-5"><p className="text-xs uppercase tracking-widest text-muted-foreground">English</p><p className="mt-2 text-2xl text-foreground">{entry.term_en}</p></div>
          <div className="rounded-2xl bg-secondary/70 p-5"><p className="text-xs uppercase tracking-widest text-muted-foreground">Indonesia</p><p className="mt-2 text-2xl text-foreground">{entry.term_id}</p></div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-border bg-card/50 p-6">
        <Tabs defaultValue="en">
          <TabsList>
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="id">Indonesia</TabsTrigger>
            <TabsTrigger value="ar">Arabic</TabsTrigger>
          </TabsList>
          <TabsContent value="en" className="mt-5 leading-8 text-muted-foreground">{entry.definition_en}</TabsContent>
          <TabsContent value="id" className="mt-5 leading-8 text-muted-foreground">{entry.definition_id}</TabsContent>
          <TabsContent value="ar" className="arabic-text mt-5 text-right leading-9 text-muted-foreground" dir="rtl">{entry.definition_ar}</TabsContent>
        </Tabs>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-border bg-card/50 p-6">
          <h2 className="text-xl font-semibold text-foreground">Examples</h2>
          <Separator className="my-5" />
          <div className="space-y-5 text-muted-foreground">
            <p>{entry.example_en}</p>
            <p>{entry.example_id}</p>
            <p className="arabic-text text-right text-lg leading-9 text-primary/90" dir="rtl">{entry.example_ar}</p>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-card/50 p-6">
          <h2 className="text-xl font-semibold text-foreground">Usage notes</h2>
          <p className="mt-4 leading-7 text-muted-foreground">{entry.usage_notes}</p>
          <div className="mt-6 flex flex-wrap gap-2">{entry.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}</div>
        </div>
      </section>

      {entry.alternatives.length > 0 && (
        <section className="mt-8 rounded-3xl border border-border bg-card/50 p-6">
          <h2 className="text-xl font-semibold text-foreground">Arabic alternatives</h2>
          <div className="mt-4 flex flex-wrap gap-2">{entry.alternatives.map((alt) => <Badge key={alt} variant="outline" className="arabic-text text-base" dir="rtl">{alt}</Badge>)}</div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-semibold text-foreground">Related terms</h2>
          <div className="grid gap-4 md:grid-cols-2">{related.map((item) => <VocabCard key={item.id} entry={item} />)}</div>
        </section>
      )}
    </div>
  );
}

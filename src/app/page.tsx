import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryGrid } from "@/components/category-grid";
import { SearchBar } from "@/components/search-bar";
import { VocabCard } from "@/components/vocab-card";
import { getCategories, getFeaturedVocab } from "@/lib/vocab";

export default async function Home() {
  const [categories, featured] = await Promise.all([getCategories(), getFeaturedVocab()]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <section className="mx-auto max-w-4xl text-center">
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.28em] text-primary/80">Indonesia · English · Arabic</p>
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Modern vocabulary for words dictionaries miss.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Find natural Arabic for contemporary Indonesian and English terms across AI, design, startups, media, games, and everyday internet life.
        </p>
        <div className="mt-10">
          <SearchBar large />
        </div>
      </section>

      <section className="mt-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-primary/80">Browse by topic</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">Categories</h2>
          </div>
          <Link href="/vocab" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        <CategoryGrid categories={categories} />
      </section>

      <section className="mt-20">
        <div className="mb-6">
          <p className="text-sm text-primary/80">Start here</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">Featured vocabulary</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((entry) => <VocabCard key={entry.id} entry={entry} />)}
        </div>
      </section>

      <section className="mt-20 rounded-3xl border border-border bg-card/60 p-8 sm:p-10">
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          Built for learners, translators, writers, and creators who need vocabulary that sounds modern, precise, and usable in real contexts.
        </p>
      </section>
    </div>
  );
}

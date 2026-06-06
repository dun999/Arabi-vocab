import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryBySlug } from "@/lib/categories";
import type { VocabEntry } from "@/types/vocab";

export function VocabCard({ entry }: { entry: VocabEntry }) {
  const category = getCategoryBySlug(entry.category);

  return (
    <Link href={`/vocab/${entry.id}`} className="group block h-full">
      <Card className="h-full border-border/80 bg-card/78 transition duration-200 hover:border-primary/45 hover:bg-card">
        <CardContent className="flex h-full flex-col gap-5 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="arabic-text text-right text-3xl font-semibold leading-relaxed text-primary" dir="rtl">
                {entry.term_ar}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{entry.transliteration}</p>
            </div>
            <ArrowUpRight className="mt-2 size-4 text-muted-foreground transition group-hover:text-primary" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-medium text-foreground">{entry.term_en}</h3>
            <p className="text-sm text-muted-foreground">{entry.term_id}</p>
          </div>

          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{entry.definition_en}</p>

          <div className="mt-auto flex flex-wrap gap-2">
            <Badge variant="secondary">{category?.name_en || entry.category}</Badge>
            <Badge variant="outline" className="capitalize">{entry.formality}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

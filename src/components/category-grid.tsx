import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/types/vocab";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {categories.map((category) => {
        const Icon = ((Icons as unknown as Record<string, LucideIcon>)[category.icon] || Icons.Tag) as LucideIcon;

        return (
          <Link key={category.slug} href={`/category/${category.slug}`} className="group block">
            <Card className="border-border/80 bg-card/70 transition hover:border-primary/45 hover:bg-card">
              <CardContent className="p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-xs text-muted-foreground">{category.count} words</span>
                </div>
                <h3 className="font-medium text-foreground">{category.name_en}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{category.name_id}</p>
                <p className="arabic-text mt-3 text-right text-base text-primary" dir="rtl">{category.name_ar}</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

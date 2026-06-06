"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar({ initialQuery = "", large = false }: { initialQuery?: string; large?: boolean }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/vocab?q=${encodeURIComponent(value)}` : "/vocab");
  }

  return (
    <form onSubmit={onSubmit} className="relative mx-auto flex w-full max-w-2xl gap-2">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search Indonesian, English, or Arabic..."
          className={`${large ? "h-14 text-base" : "h-11"} rounded-2xl border-border bg-card/90 pl-11 text-foreground placeholder:text-muted-foreground`}
          dir="auto"
        />
      </div>
      <Button type="submit" size={large ? "lg" : "default"} className="rounded-2xl">
        Search
      </Button>
    </form>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function SubmitForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      form.reset();
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="term_en">English term</Label>
        <Input id="term_en" name="term_en" required placeholder="e.g. Prompt" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="term_id">Indonesian term</Label>
        <Input id="term_id" name="term_id" required placeholder="e.g. Instruksi" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="term_ar">Arabic term</Label>
        <Input id="term_ar" name="term_ar" required placeholder="e.g. مطالبة" dir="rtl" className="arabic-text text-right" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="explanation">Explanation</Label>
        <Textarea id="explanation" name="explanation" placeholder="Explain the context or why this word matters." />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="example">Example sentence</Label>
        <Textarea id="example" name="example" placeholder="Optional example in any language." />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="source_context">Source or context</Label>
        <Input id="source_context" name="source_context" placeholder="Article, video, app, conversation, etc." />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="submitter_email">Email</Label>
        <Input id="submitter_email" name="submitter_email" type="email" placeholder="Optional" />
      </div>
      <Button type="submit" disabled={status === "loading"} className="h-11 rounded-2xl">
        {status === "loading" ? "Submitting..." : "Submit word"}
      </Button>
      {status === "success" && <p className="text-sm text-primary">Thanks. Your suggestion is waiting for admin review.</p>}
      {status === "error" && <p className="text-sm text-destructive">Something went wrong. Please try again.</p>}
    </form>
  );
}

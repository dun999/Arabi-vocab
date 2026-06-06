import { SubmitForm } from "@/components/submit-form";

export default function SubmitPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm text-primary/80">Contribute</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">Submit a modern word</h1>
        <p className="mt-3 leading-7 text-muted-foreground">Suggestions are reviewed before publishing so the vocabulary stays practical and trustworthy.</p>
      </div>
      <div className="rounded-3xl border border-border bg-card/65 p-6 sm:p-8">
        <SubmitForm />
      </div>
    </div>
  );
}

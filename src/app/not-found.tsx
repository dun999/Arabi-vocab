import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm text-primary/80">404</p>
      <h1 className="mt-2 text-4xl font-semibold text-foreground">Page not found</h1>
      <p className="mt-4 text-muted-foreground">The word or page you are looking for does not exist yet.</p>
      <Link href="/vocab" className="mt-8 rounded-2xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/80">
        Browse vocabulary
      </Link>
    </div>
  );
}

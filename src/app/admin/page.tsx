import { AdminLoginForm } from "@/components/admin-login-form";

export default function AdminPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <p className="text-sm text-primary/80">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Review submissions</h1>
      </div>
      <div className="rounded-3xl border border-border bg-card/65 p-6">
        <AdminLoginForm />
      </div>
    </div>
  );
}

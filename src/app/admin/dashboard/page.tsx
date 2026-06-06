import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AdminDashboard } from "@/components/admin-dashboard";

export default async function AdminDashboardPage() {
  if ((await cookies()).get("av_admin")?.value !== "1") {
    redirect("/admin");
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm text-primary/80">Admin</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">Submission dashboard</h1>
        <p className="mt-3 text-muted-foreground">Approve or reject community vocabulary suggestions.</p>
      </div>
      <AdminDashboard />
    </div>
  );
}

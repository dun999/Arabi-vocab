import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSubmissions } from "@/lib/vocab";
import type { Submission } from "@/types/vocab";

async function isAdmin() {
  return (await cookies()).get("av_admin")?.value === "1";
}

export async function GET(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = new URL(request.url).searchParams.get("status") as Submission["status"] | null;
  const submissions = await getSubmissions(status || undefined);
  return NextResponse.json({ submissions });
}

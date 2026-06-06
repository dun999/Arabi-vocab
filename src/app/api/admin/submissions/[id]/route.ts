import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { updateSubmission } from "@/lib/vocab";

async function isAdmin() {
  return (await cookies()).get("av_admin")?.value === "1";
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const submission = await updateSubmission(id, body);

  if (!submission) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }

  return NextResponse.json({ submission });
}

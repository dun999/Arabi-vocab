import { NextRequest, NextResponse } from "next/server";
import { addSubmission } from "@/lib/vocab";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const required = ["term_en", "term_id", "term_ar"];

  for (const field of required) {
    if (!body[field] || typeof body[field] !== "string") {
      return NextResponse.json({ error: `${field} is required` }, { status: 400 });
    }
  }

  const submission = await addSubmission({
    term_en: body.term_en.trim(),
    term_id: body.term_id.trim(),
    term_ar: body.term_ar.trim(),
    explanation: body.explanation?.trim() || "",
    example: body.example?.trim() || "",
    source_context: body.source_context?.trim() || "",
    submitter_email: body.submitter_email?.trim() || "",
  });

  return NextResponse.json({ submission }, { status: 201 });
}

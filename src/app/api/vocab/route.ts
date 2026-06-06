import { NextRequest, NextResponse } from "next/server";
import { filterVocab } from "@/lib/vocab";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const entries = await filterVocab({
    query: searchParams.get("q") || "",
    category: searchParams.get("category") || "all",
    formality: searchParams.get("formality") || "all",
  });

  return NextResponse.json({ entries });
}

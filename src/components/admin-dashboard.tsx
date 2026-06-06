"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Submission } from "@/types/vocab";

type StatusFilter = Submission["status"] | "all";

function submissionsUrl(filter: StatusFilter) {
  return filter === "all" ? "/api/admin/submissions" : `/api/admin/submissions?status=${filter}`;
}

export function AdminDashboard() {
  const [filter, setFilter] = useState<StatusFilter>("pending");
  const [submissions, setSubmissions] = useState<Submission[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(submissionsUrl(filter)).then(async (response) => {
      if (!response.ok) return [];
      const data = await response.json();
      return data.submissions as Submission[];
    }).then((items) => {
      if (!cancelled) setSubmissions(items);
    });

    return () => {
      cancelled = true;
    };
  }, [filter]);

  async function update(id: string, status: Submission["status"]) {
    await fetch(`/api/admin/submissions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const response = await fetch(submissionsUrl(filter));
    const data = response.ok ? await response.json() : { submissions: [] };
    setSubmissions(data.submissions);
  }

  return (
    <div>
      <Tabs value={filter} onValueChange={(value) => setFilter(value as StatusFilter)}>
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-6 grid gap-4">
        {submissions === null && <p className="text-muted-foreground">Loading submissions...</p>}
        {submissions !== null && submissions.length === 0 && <p className="rounded-3xl border border-border bg-card/60 p-8 text-muted-foreground">No submissions here yet.</p>}
        {submissions?.map((submission) => (
          <Card key={submission.id} className="border-border bg-card/70">
            <CardContent className="p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-semibold text-foreground">{submission.term_en}</h2>
                    <Badge variant="outline">{submission.status}</Badge>
                  </div>
                  <p className="mt-1 text-muted-foreground">{submission.term_id}</p>
                  <p className="arabic-text mt-2 text-right text-3xl text-primary" dir="rtl">{submission.term_ar}</p>
                </div>
                {submission.status === "pending" && (
                  <div className="flex gap-2">
                    <Button onClick={() => update(submission.id, "approved")}>Approve</Button>
                    <Button variant="destructive" onClick={() => update(submission.id, "rejected")}>Reject</Button>
                  </div>
                )}
              </div>
              {(submission.explanation || submission.example || submission.source_context) && (
                <div className="mt-5 grid gap-3 text-sm leading-6 text-muted-foreground">
                  {submission.explanation && <p><span className="text-foreground">Explanation:</span> {submission.explanation}</p>}
                  {submission.example && <p><span className="text-foreground">Example:</span> {submission.example}</p>}
                  {submission.source_context && <p><span className="text-foreground">Context:</span> {submission.source_context}</p>}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

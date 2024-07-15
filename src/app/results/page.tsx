"use client";

import ResultsList from "@/components/results-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Results() {
  const searchParams = useSearchParams();

  const longitude = parseFloat(searchParams.get("longitude") || "");
  const latitude = parseFloat(searchParams.get("latitude") || "");
  const radius = parseInt(searchParams.get("radius") || "");
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");

  if (!longitude || !latitude || !radius || !startDate || !endDate) return redirect("/");

  return (
    <main className="flex flex-col items-center p-8">
      <Link href="/">
        <Button className="fixed top-2 left-2">Neue Suche</Button>
      </Link>
      <ResultsList longitude={longitude} latitude={latitude} radius={radius} startDate={startDate} endDate={endDate} />
    </main>
  );
}

export default function ResultsWrapper() {
  return (
    <Suspense>
      <Results />
    </Suspense>
  );
}

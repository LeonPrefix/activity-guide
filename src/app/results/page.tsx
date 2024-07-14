"use client";

import ResultsList from "@/components/results-list";
import { useRouter, useSearchParams } from "next/navigation";

export default function Results() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const longitude = parseFloat(searchParams.get("longitude") || "");
  const latitude = parseFloat(searchParams.get("latitude") || "");
  const radius = parseInt(searchParams.get("radius") || "");
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");

  if (!longitude || !latitude || !radius || !startDate || !endDate) return router.push("/");

  return (
    <main className="flex flex-col items-center p-8">
      <ResultsList longitude={longitude} latitude={latitude} radius={radius} startDate={startDate} endDate={endDate} />
    </main>
  );
}

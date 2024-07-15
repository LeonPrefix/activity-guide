import { Result } from "@/util/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import ResultCard from "./result-card";

interface ResultsListProps {
  longitude: number;
  latitude: number;
  radius: number;
  startDate: string;
  endDate: string;
}

export default function ResultsList({ longitude, latitude, radius, startDate, endDate }: ResultsListProps) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/api/results?longitude=${longitude}&latitude=${latitude}&radius=${radius}&start=${startDate}&end=${endDate}`
      )
      .then((r) => setResults(r.data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [longitude, latitude, radius, startDate, endDate]);

  return (
    <>
      <div className="flex flex-col items-center gap-2 text-center mb-8">
        <span className="font-mono text-6xl tracking-widest font-semibold">Unsere Vorschläge</span>
        <span className="text-muted-foreground text-2xl font-light">
          Unsere Suche hat an {loading ? "..." : results.length} Tagen{" "}
          {loading ? "..." : results.flatMap((v) => v.places).filter((v) => v.name).length} tolle Aktivitäten für dich
          hervorgebracht
        </span>
      </div>
      <div className="flex flex-col gap-4 w-full xl:w-[70%]">
        {results.map((v, i) => (
          <ResultCard result={v} key={i} />
        ))}
      </div>
    </>
  );
}

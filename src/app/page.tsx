"use client";

import Map from "@/components/map";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { CalendarIcon, DoubleArrowDownIcon, RocketIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const DEFAULT_CENTER = { lat: 53.5488, lng: 9.9872 };

export default function Search() {
  const router = useRouter();

  const [radius, setRadius] = useState(500);
  const [marker, setMarker] = useState<google.maps.LatLngLiteral>(DEFAULT_CENTER);

  const [date, setDate] = useState<DateRange | undefined>({ from: new Date(), to: addDays(new Date(), 7) });

  const handleSearch = () => {
    if (!date?.from || !date.to) return;
    router.push(
      `/results?longitude=${marker.lng}&latitude=${marker.lat}&radius=${radius}&start=${format(
        date.from,
        "yyyy-MM-dd"
      )}&end=${format(date.to, "yyyy-MM-dd")}`
    );
  };

  return (
    <main className="flex flex-col items-center p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="font-mono text-6xl tracking-widest font-semibold">Activity Guide</span>
        <span className="text-muted-foreground text-2xl font-light">
          Plane einen Ausflug anhand aktueller Wetter- und Ortsdaten
        </span>
      </div>
      <DoubleArrowDownIcon className="m-12 w-8 h-8" />
      <div className="w-full xl:w-[70%] h-[65vh] flex flex-col justify-center gap-2">
        <div className="flex flex-col gap-2 lg:block">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full lg:w-[280px] justify-start text-left font-normal",
                  (!date?.from || !date?.to) && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from && date?.to ? (
                  <>
                    {format(date.from, "dd.MM.yyyy")} - {format(date.to, "dd.MM.yyyy")}
                  </>
                ) : (
                  <span className="animate-pulse">Wähle einen Zeitraum</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                fromDate={new Date()}
                toDate={addDays(new Date(), 7)}
              />
            </PopoverContent>
          </Popover>
          <span className="float-right flex h-full items-center lg:w-[50%] w-full gap-4">
            Radius: <Slider value={[radius]} onValueChange={(v) => setRadius(v[0])} min={300} step={100} max={3000} />
          </span>
        </div>
        <Map radius={radius} marker={marker} setMarker={setMarker} />
        <Button disabled={!date?.from || !date?.to} onClick={handleSearch}>
          <RocketIcon className="mr-2 h-4 w-4" /> Suche nach den perfekten Aktivitäten!
        </Button>
      </div>
    </main>
  );
}

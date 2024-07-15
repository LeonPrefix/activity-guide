import { Result } from "@/util/interfaces";
import { GlobeIcon, Link1Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { WeatherChart } from "./weather-chart";

export default function ResultCard({ result }: { result: Result }) {
  return (
    <div>
      <div className="text-3xl font-semibold py-4">{format(result.date, "EEEE, dd.MM.yy", { locale: de })}</div>
      <div className="flex flex-col lg:flex-row gap-4 relative">
        <WeatherChart weather={result.weather} />
        <div className="flex flex-col grow gap-4">
          {result.places
            .filter((v) => v.name)
            .map((v, i) => (
              <Card key={i}>
                <CardHeader className="p-4 relative">
                  <CardTitle className="text-lg">{v.name}</CardTitle>
                  <CardDescription>
                    {v.street && (
                      <>
                        {v.street}
                        {v.house_number && ` ${v.house_number}`},
                      </>
                    )}{" "}
                    {v.postcode} {v.city}
                  </CardDescription>
                  <div className="absolute right-4 flex gap-2">
                    {v.website && (
                      <Link href={v.website} target="_blank">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="secondary" size="icon">
                              <Link1Icon />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Website</TooltipContent>
                        </Tooltip>
                      </Link>
                    )}
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${v.name} ${v.street} ${v.house_number}, ${v.city}`}
                      target="_blank"
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="secondary" size="icon">
                            <GlobeIcon />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Google Maps</TooltipContent>
                      </Tooltip>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="flex gap-1 px-4 flex-wrap w-9/12">
                  {v.categories
                    .filter((v) => !v.includes(".yes"))
                    .map((w) => (
                      <Badge className="rounded" key={w}>
                        {w
                          .split(/\.|_/)
                          .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
                          .pop()}
                      </Badge>
                    ))}
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

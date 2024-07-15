import { Result } from "@/util/interfaces";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { WeatherChart } from "./weather-chart";

export default function ResultCard({ result }: { result: Result }) {
  return (
    <div>
      <div className="text-3xl font-semibold py-4">{format(result.date, "dd.MM.yy")}</div>
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
                    {v.street} {v.house_number}, {v.postcode} {v.city}
                  </CardDescription>
                  <Button className="absolute right-4" variant="secondary">
                    Mehr Details
                  </Button>
                </CardHeader>
                <CardContent className="flex gap-1 px-4">
                  {v.categories.map((w) => (
                    <Badge className="rounded" key={w}>
                      {w}
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

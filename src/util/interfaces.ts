export interface Result {
  date: string;
  weather: {
    min_temperature: number;
    max_temperature: number;
    rain_sum: number;
    hourly: [
      {
        hour: number;
        temperature: number;
        rain: number;
        wind_speed: number;
      }
    ];
  };
  places: [
    {
      latitude: number;
      longitude: number;
      name: string;
      street: string;
      house_number: string | null;
      postcode: string;
      city: string;
      website: string;
      categories: string[];
    }
  ];
}

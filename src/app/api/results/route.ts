import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  longitude: z.number(),
  latitude: z.number(),
  radius: z.number().int(),
  start: z.string().refine((v) => /\d{4}-\d{2}-\d{2}/.test(v)),
  end: z.string().refine((v) => /\d{4}-\d{2}-\d{2}/.test(v)),
});

export async function GET(req: NextRequest) {
  const response = schema.safeParse({
    longitude: parseFloat(req.nextUrl.searchParams.get("longitude") || ""),
    latitude: parseFloat(req.nextUrl.searchParams.get("latitude") || ""),
    radius: parseInt(req.nextUrl.searchParams.get("radius") || ""),
    start: req.nextUrl.searchParams.get("start"),
    end: req.nextUrl.searchParams.get("end"),
  });

  if (!response.success) {
    return new NextResponse(response.error.errors[0].message, { status: 400 });
  }

  const data = response.data;
  const result = await axios.get(
    `${process.env.SPRING_RESULTS_HOST}/results?longitude=${data.longitude}&latitude=${data.latitude}&radius=${data.radius}&start=${data.start}&end=${data.end}`
  );

  return NextResponse.json(result.data);
}

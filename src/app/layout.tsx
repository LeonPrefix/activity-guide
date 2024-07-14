import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Activity Planner",
  description: "Plane deine nächsten Ausflüge anhand aktueller Wetter- und Ortsdaten",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}

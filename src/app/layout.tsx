import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway, Noto_Serif } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const notoSerifHeading = Noto_Serif({subsets:['latin'],variable:'--font-heading'});

const raleway = Raleway({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumina Voyages | Bespoke Luxury Expeditions & Sanctuaries",
  description: "Curated private journeys to Earth's most breathtaking horizons. Private aviation, Michelin gastronomy, and 5-star secluded sanctuaries.",
  keywords: ["luxury travel", "private expeditions", "bespoke itineraries", "Amalfi coast", "Kyoto ryokan", "Swiss Alps chalet", "Serengeti safari"],
  openGraph: {
    title: "Lumina Voyages | Bespoke Luxury Expeditions",
    description: "Curated private journeys to Earth's most breathtaking sanctuaries.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", raleway.variable, notoSerifHeading.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import GlobalProvider from "@/components/common/GlobalProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ubika",
  description:
    "Ubika is a modern healthcare dashboard for managing appointments, medications, lab results, conditions, allergies, and patient records.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", inter.variable, sourceSerif.variable)}
    >
      <body className="min-h-full font-sans">
        <TooltipProvider>
          <GlobalProvider>{children}</GlobalProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}

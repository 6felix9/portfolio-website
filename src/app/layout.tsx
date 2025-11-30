import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Puah Tze Foong",
  description: "Tze Foong's Playground",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.variable}>
        <TooltipPrimitive.Provider delayDuration={0} skipDelayDuration={0}>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <footer className="w-full border-t border-border bg-background px-4 py-3 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Puah Tze Foong
            </footer>
          </div>
        </TooltipPrimitive.Provider>
      </body>
    </html>
  );
}

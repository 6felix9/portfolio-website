import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <footer className="w-full border-t border-border bg-background px-4 py-3 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Puah Tze Foong
          </footer>
        </div>
      </body>
    </html>
  );
}

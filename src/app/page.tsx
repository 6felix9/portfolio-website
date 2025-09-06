"use client";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

export default function Home() {

  const words = [
    {
      text: "Welcome",
      className: "text-foreground",
    },
    {
      text: "to",
      className: "text-foreground",
    },
    {
      text: "Tze Foong's",
      className: "text-foreground",
    },
    {
      text: "Portfolio.",
      className: "text-foreground",

    },
  ];

  return (
    <>
      {/* Fixed theme toggler in top right */}
      <div className="fixed top-4 right-4 z-50">
        <AnimatedThemeToggler />
      </div>
      
      <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
        <TypewriterEffectSmooth words={words} />
      </div>
    </>
  );
}

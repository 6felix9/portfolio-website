"use client";
import React, { useState } from "react";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function Home() {
  const heroWords = [
    { text: "Welcome", className: "text-foreground" },
    { text: "to", className: "text-foreground" },
    { text: "Tze Foong's", className: "text-foreground" },
    { text: "Portfolio.", className: "text-foreground" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SiteHeader />

      {/* push content below fixed navbar height */}
      <div className="pt-24 flex min-h-screen flex-col items-center justify-center p-24 bg-background">
        <TypewriterEffectSmooth words={heroWords} />
      </div>
    </>
  );
}

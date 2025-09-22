"use client";
import React from "react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";

export default function Home() {
  const heroWords = [
    { text: "Welcome", className: "text-foreground" },
    { text: "to", className: "text-foreground" },
    { text: "Tze Foong's", className: "text-foreground" },
    { text: "Portfolio.", className: "text-foreground" },
  ];

  // Track current theme by observing the root html class
  const [isDark, setIsDark] = React.useState(true);
  React.useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const heroSrc = isDark ? "/hero-potrait-1.JPG" : "/hero-potrait-2.JPG";

  return (
    <>
      <SiteHeader />

      {/* Hero: Pixelated image left, Typewriter right */}
      <section className="relative mx-auto w-full max-w-7xl px-4 md:px-6 pt-24">
        <div className="grid min-h-[70vh] grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Left: Pixelated Canvas */}
          <div className="flex w-full items-center justify-center">
            <PixelatedCanvas
              src={heroSrc}
              width={500}
              height={500}
              cellSize={4}
              dotScale={0.9}
              shape="square"
              backgroundColor="#000000"
              dropoutStrength={0.1}
              interactive
              distortionStrength={0.1}
              distortionRadius={100}
              distortionMode="repel"
              followSpeed={0.2}
              jitterStrength={4}
              jitterSpeed={1}
              sampleAverage
              className="w-full max-w-[560px] rounded-xl shadow-lg"
            />
          </div>

          {/* Right: Typewriter */}
          <div className="flex w-full flex-col items-start justify-center text-left">
            <TypewriterEffectSmooth words={heroWords} />
          </div>
        </div>
      </section>
    </>
  );
}

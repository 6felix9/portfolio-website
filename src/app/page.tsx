"use client";
import React from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { FlipWords } from "@/components/ui/flip-words";

export default function Home() {
  const heroWords = [
    { text: "Welcome", className: "text-foreground" },
    { text: "to", className: "text-foreground" },
    { text: "Tze Foong's", className: "text-foreground" },
    // { text: "Portfolio.", className: "text-foreground" },
  ];

  const flipWords = [
    " Portfolio.",
    " Playground.",
    " Showcase.",
    " Creations.",
    " Adventures.",
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
        <div className="grid h-[80vh] grid-cols-1 items-center gap-10 md:grid-cols-2">
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

          {/* Right: Flip Words */}
          <div className="flex w-full flex-col items-start justify-center text-left gap-6">
            <div className=" items-end gap-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              Welcome to <br />
              Tze Foong's 
              <FlipWords
                words={flipWords}
                className="px-0 text-inherit font-semibold tracking-tight"
              />
            </div>

            <hr className="animated-divider border-3 border-muted-foreground" />

            <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70">
              Full Stack Developer
            </div>
            
            <div className="gap-4 flex">
              <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                Explore my work
              </button>

              <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                My Projects
              </button>
            </div>
          </div>


        </div>
      </section>
    </>
  );
}

"use client";
import React from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { FlipWords } from "@/components/ui/flip-words";
import { BlurFade } from "@/components/ui/blur-fade";
import { Timeline } from "@/components/ui/timeline";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { BriefcaseIcon, GraduationCapIcon } from "lucide-react";
import timelineData from "@/data/experience.json";
import educationHistory from "@/data/education.json";
import { ExperienceCard } from "@/components/ui/experience-card";

export default function Home() {
  // =========================
  // HERO SECTION VARIABLES
  // =========================
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

  // Switch hero image based on theme
  const heroSrc = isDark ? "/hero-potrait-1.JPG" : "/hero-potrait-2.JPG";

  // Words for the flip animation in the hero heading
  const heroFlipWords = [
    " Portfolio.",
    " Playground.",
    " Showcase.",
    " Creations.",
    " Adventures.",
  ];

  // =============================
  // EXPERIENCE SECTION VARIABLES
  // =============================
  const mappedTimelineData = timelineData.map((item) => ({
    ...item,
    icon:
      item.icon === "BriefcaseIcon" ? (
        <BriefcaseIcon />
      ) : (
        <img src={item.icon} alt={item.content.company} />
      ),
    content: <ExperienceCard content={item.content} />,
  }));

  return (
    <>
      <SiteHeader />

      {/* Hero: Pixelated image left, Typewriter right */}
      <section
        id="hero"
        className="relative mx-auto flex w-full max-w-7xl min-h-[100svh] items-center justify-center px-4 pb-24 pt-32 md:px-6"
      >
        <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Left: Pixelated Canvas */}
          <BlurFade delay={0.25} inView className="flex w-full items-center justify-center">
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
          </BlurFade>

          {/* Right: Flip Words */}
          <div className="flex w-full flex-col items-start justify-center text-left gap-6">
            <div className=" items-end gap-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              Welcome to <br />
              Tze Foong's 
              <FlipWords
                words={heroFlipWords}
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

      {/* Experience Section */}
      <div id="experience" className="relative w-full overflow-clip">
        <Timeline data={mappedTimelineData} />
      </div>

      {/* Education Section */}
      <div id="education" className="w-full bg-white dark:bg-neutral-950 font-sans px-4 md:px-10">
        <div className="max-w-6xl mx-auto pt-16 md:pt-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-4 text-foreground max-w-4xl">
            Education
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70">
            A journey through my academic experiences and milestones.
          </p>
        </div>
        <div className="mt-10 grid w-full max-w-6xl mx-auto grid-cols-1 gap-3 md:gap-6 md:grid-cols-3 pb-12 md:pb-20">
        {educationHistory.map((education) => (
          <CardContainer key={education.institution} className="inter-var h-full my-0">
            <CardBody className="bg-gray-50 relative group/card hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-neutral-800/[0.4] dark:bg-neutral-900/80 dark:border-white/[0.2] border-black/[0.1] h-full rounded-xl p-6 border flex flex-col gap-5">
              <CardItem translateZ="70" className="flex items-start gap-4">
                {education.logo ? (
                  <img
                    src={education.logo}
                    alt={education.logoAlt ?? education.institution}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                ) : (
                  <div className="h-12 w-12 shrink-0 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-200">
                    <GraduationCapIcon className="h-6 w-6" />
                  </div>
                )}
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                    {education.period}
                  </span>
                  <p className="text-lg sm:text-xl font-semibold text-neutral-700 dark:text-neutral-100">
                    {education.institution}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {education.location}
                  </p>
                </div>
              </CardItem>

              <CardItem
                as="p"
                translateZ="60"
                className="text-sm md:text-base text-neutral-600 dark:text-neutral-300"
              >
                {education.degree}
              </CardItem>

              <CardItem
                as="p"
                translateZ="60"
                className="text-sm md:text-base leading-relaxed text-neutral-600 dark:text-neutral-300"
              >
                {education.summary}
              </CardItem>

              <CardItem translateZ="90" className="mt-auto">
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300 list-disc pl-5">
                  {education.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
        </div>
      </div>
    </>
  );
}

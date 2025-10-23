"use client";
import React from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { FlipWords } from "@/components/ui/flip-words";
import { BlurFade } from "@/components/ui/blur-fade";
import { Timeline } from "@/components/ui/timeline";
import { BriefcaseIcon, GraduationCapIcon } from "lucide-react";
import timelineData from "@/data/experience.json";
import educationHistory from "@/data/education.json";
import { ExperienceCard } from "@/components/ui/experience-card";
import Image from "next/image";
import { motion } from "framer-motion";

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
  const heroSrc = isDark ? "/hero-potrait-1.webp" : "/hero-potrait-2.webp";
  const heroPlaceholderSrc = isDark
    ? "/hero-potrait-1-preview.webp"
    : "/hero-potrait-2-preview.webp";

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
        <Image
          src={item.icon}
          alt={item.content.company}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full"
          style={{ objectFit: "contain" }}
        />
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
              placeholderSrc={heroPlaceholderSrc}
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

      {/* About Section */}
      <section id="about" className="w-full bg-white dark:bg-neutral-950 font-sans px-4 md:px-10 min-h-[100svh] flex items-center">
        <div className="max-w-6xl mx-auto pt-16 md:pt-20 pb-16 md:pb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-4 text-foreground max-w-4xl">
            About Me
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 mb-10">
            Get to know me better - my journey, skills, and passions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column - About Text */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-semibold text-foreground">
                  Who am I?
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                  I’m a Full Stack Developer and Computer Science student at the National University of Singapore, 
                  with a particular passion on building practical, AI-driven applications that solve real problems.
                </p>
                <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                  My work spans from developing AI-powered training platforms to creating property management systems and leading developer communities. 
                  I love turning innovative ideas into functional, impactful products.
                </p>
                <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                  Outside of coding, you'll probably find me exploring the latest AI research, 
                  experimenting with new developer tools, unwinding with a game of floorball or listening to Mandopop.
                </p>
              </div>
            </div>

            {/* Right Column - Skills & Tech Stack */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-semibold text-foreground">
                  Skills & Technologies
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-foreground/90 mb-2">
                      Frontend
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion"].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-foreground/90 mb-2">
                      Backend
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Node.js", "FastAPI", "Python", "Supabase", "PostgreSQL"].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-foreground/90 mb-2">
                      AI & Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Google Gemini", "Groq", "Whisper", "ElevenLabs", "Git"].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
          {educationHistory.map((education, index) => (
            <motion.article
              key={education.institution}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group flex h-full flex-col gap-5 rounded-xl border border-black/10 bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:shadow-xl dark:border-white/10 dark:bg-neutral-900/80 dark:hover:shadow-neutral-800/40"
            >
              <div className="flex items-start gap-4">
                {education.logo ? (
                  <Image
                    src={education.logo}
                    alt={education.logoAlt ?? education.institution}
                    width={48}
                    height={48}
                    className="h-12 w-12"
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-600 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200">
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
              </div>

              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300">
                {education.degree}
              </p>

              <p className="text-sm md:text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                {education.summary}
              </p>

              <ul className="mt-auto list-disc space-y-2 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
                {education.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </>
  );
}

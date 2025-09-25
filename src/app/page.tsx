"use client";
import React from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { FlipWords } from "@/components/ui/flip-words";
import { BlurFade } from "@/components/ui/blur-fade";
import { Timeline } from "@/components/ui/timeline";
import { LinkPreview } from "@/components/ui/link-preview";
import { BriefcaseIcon } from "lucide-react";

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
  const timelineData = [
    {
      icon: <img src="/keyreply-logo.jpeg" alt="KeyReply"/>,
      title: "2025",
      titleDescription: "June - August",
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              AI & Software Engineer
            </h4>
            <p className="text-base md:text-lg text-foreground/60">
              KeyReply Pte Ltd · Singapore
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
              Led the build of an AI training platform that blends Google Gemini, Groq, Whisper, and ElevenLabs into a real-time digital avatar experience.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
              Designed the streaming infrastructure and partnered with clients to iterate quickly, lifting AI response speeds by 225%.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <img
              src="/keyreply-photo-1.JPG"
              alt="keyreply-photo-1"
              width={500}
              height={500}
              className="h-36 md:h-52 lg:h-64 w-full rounded-2xl object-cover shadow-lg"
            />

            <img
              src="/keyreply-photo-2.png"
              alt="keyreply-photo-2"
              width={500}
              height={500}
              className="h-36 md:h-52 lg:h-64 w-full rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      icon: <img src="/rhdevs-logo.jpeg" alt="Raffles Hall Developers"/>,
      title: "2025",
      titleDescription: "Present",
      content: (
  <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Vice President
            </h4>
            <p className="text-base md:text-lg text-foreground/60">
              Raffles Hall Developers · Singapore
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
              I organise hands-on workshops and hackathons that keep the Raffles Hall developer community growing.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
              I also lead the engineering squad that ships and maintains the apps and Telegram bots used daily by 700+ residents.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <img
              src="/rhdevs-photo-1.jpg"
              alt="rhdevs-photo-1"
              width={500}
              height={500}
              className="h-36 md:h-52 lg:h-64 w-full rounded-2xl object-cover shadow-lg"
            />
            <LinkPreview url="https://new.rhapp.lol">
              <img
                src="/rhdevs-photo-2.png"
                alt="rhdevs-photo-2"
                width={500}
                height={500}
                className="h-36 md:h-52 lg:h-64 w-full rounded-2xl object-cover shadow-lg"
              />
            </LinkPreview>
          </div>
        </div>
        
      ),
    },
    {
      icon: <BriefcaseIcon />,
      title: "2025",
      titleDescription: "Present",
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Frontend Engineer
            </h4>
            <p className="text-base md:text-lg text-foreground/60">
              Freelance Total Rewards Pte Ltd · Singapore
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
              Build polished React experiences that hook into the FastAPI services powering rewards workflows.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
              Recently shipped a data-rich command centre so stakeholders can monitor automation runs at a glance.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <img src="/foo_well_home-logo.jpg" alt="Foo Well Home"/>,
      title: "2024",
      titleDescription: "April - June",
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Software Engineer
            </h4>
            <p className="text-base md:text-lg text-foreground/60">
              Foo Well Home Sdn Bhd · Malaysia
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
              Delivered a property management portal with React and Supabase that keeps thousands of units and records organised.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
              Added secure RBAC, modern auth, and a real-time service desk so tenants, owners, and admins stay in sync.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <LinkPreview url="https://www.foowellhome.com">
              <img
                src="/foo_well_home-photo-1.png"
                alt="foo_well_home-photo-1"
                width={500}
                height={500}
                className="h-36 md:h-52 lg:h-64 w-full rounded-2xl object-cover shadow-lg"
              />
            </LinkPreview>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <SiteHeader />

      {/* Hero: Pixelated image left, Typewriter right */}
      <section className="relative mx-auto w-full max-w-7xl px-4 md:px-6 pt-24">
        <div className="grid h-[80vh] grid-cols-1 items-center gap-10 md:grid-cols-2">
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
      <div className="relative w-full overflow-clip">
        <Timeline data={timelineData} />
      </div>
    </>
  );
}

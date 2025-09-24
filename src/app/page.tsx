"use client";
import React from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { FlipWords } from "@/components/ui/flip-words";
import { BlurFade } from "@/components/ui/blur-fade";
import { Timeline } from "@/components/ui/timeline";

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
      title: "2025",
      titleDescription: "Present",
      content: (
        <div>
          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-snug text-foreground">
            Vice President
          </h4>
          <p className="text-sm md:text-base text-foreground/60 mb-3">Raffles Hall Developers · Singapore</p>
          <div className="space-y-2">
            <p className="text-xs md:text-sm leading-relaxed text-foreground/80">
              I host programming workshops and hackathons to help residents learn and apply their skills.
            </p>
            <p className="text-xs md:text-sm leading-relaxed text-foreground/80">
              Software Engineering lead responsible for building, managing, and deploying applications and Telegram bots used by 700+ hall residents.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      titleDescription: "Present",
      content: (
        <div>
          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-snug text-foreground">
            Frontend Engineer
          </h4>
          <p className="text-sm md:text-base text-foreground/60 mb-3">Freelance Total Rewards Pte Ltd · Singapore</p>
          <div className="space-y-2">
            <p className="text-xs md:text-sm leading-relaxed text-foreground/80">
              Implemented frontend website and FastAPI endpoints connecting backend to frontend.
            </p>
            <p className="text-xs md:text-sm leading-relaxed text-foreground/80">
              Created a dashboard for intuitive data visualisation of running backend scripts.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      titleDescription: "June - August",
      content: (
        <div>
          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-snug text-foreground">
            AI & Software Engineer
          </h4>
          <p className="text-sm md:text-base text-foreground/60 mb-3">KeyReply Pte Ltd · Singapore</p>
          <div className="space-y-2">
            <p className="text-xs md:text-sm leading-relaxed text-foreground/80">
              Spearheaded a full-stack AI-powered training platform using Next.js, TypeScript, and Tailwind CSS, integrating Google Gemini, Groq SDK, OpenAI Whisper, and ElevenLabs TTS to deliver a conversational AI experience with a real-time digital avatar.
            </p>
            <p className="text-xs md:text-sm leading-relaxed text-foreground/80">
              Built and integrated a scalable WebSocket architecture for real-time audio streaming and WebRTC communication, utilising BytePlus Digital Human Interaction Protocol.
            </p>
            <p className="text-xs md:text-sm leading-relaxed text-foreground/80">
              Collaborated regularly with clients to gather feedback, discuss future business developments, and iteratively refine the application, resulting in a 225% improvement in AI response speed.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      titleDescription: "April - June",
      content: (
        <div>
          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-snug text-foreground">
            Software Engineer
          </h4>
          <p className="text-sm md:text-base text-foreground/60 mb-3">Foo Well Home Sdn Bhd · Malaysia</p>
          <div className="space-y-2">
            <p className="text-xs md:text-sm leading-relaxed text-foreground/80">
              Developed a scalable property management website using React and Supabase to manage over 1000 client records.
            </p>
            <p className="text-xs md:text-sm leading-relaxed text-foreground/80">
              Implemented secure authentication, including role-based access control (RBAC) for Tenants, Owners, Admins, and a secure login/signup process with email/password authentication using JWT-based session management.
            </p>
            <p className="text-xs md:text-sm leading-relaxed text-foreground/80">
              Built a real-time service management system using Supabase, enabling tenants to submit maintenance requests, owners to track unit status, and admins to update service progress in real time.
            </p>
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

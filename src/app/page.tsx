"use client";
import React from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { FlipWords } from "@/components/ui/flip-words";
import { BlurFade } from "@/components/ui/blur-fade";
import { Timeline } from "@/components/ui/timeline";
import { LinkPreview } from "@/components/ui/link-preview";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { BriefcaseIcon, GraduationCap, School } from "lucide-react";

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

  type EducationEntry = {
    institution: string;
    period: string;
    degree: string;
    location: string;
    summary: string;
    highlights: string[];
    logo?: string;
    logoAlt?: string;
    icon?: React.ReactNode;
  };

  const educationHistory: EducationEntry[] = [
    {
      institution: "National University of Singapore",
      logo: "/nus-logo.png",
      logoAlt: "NUS crest",
      period: "Aug 2024 – Present",
      degree: "Bachelor of Computing (Computer Science)",
      location: "Singapore",
      summary:
        "Interested in specialisation under Software Engineering and Artificial Intelligence.",
      highlights: [
        "Key Courses: Object Oriented Programming, Data Structures & Algorithms, Database Systems, Computer Organisation, Discrete Structures",
      ],
    },
    {
      institution: "Taylor's College Lakeside Campus",
      logo: "/taylors-logo.png",
      logoAlt: "Taylor's College",
      period: "Aug 2022 – Dec 2023",
      degree: "Cambridge A Levels",
      location: "Subang Jaya, Malaysia",
      summary:
        "Mathematics, Further Mathematics, Physics, and Computer Science.",
      highlights: [
        "ImagineHack 2023",
        "Coder's Challenge 2023 (Champion)",
        "Awarded Taylor's Top Achiever 2024",
        "Awarded Tayor's Excellence Award 2023",
      ],
    },
    {
      institution: "Marlborough College Malaysia",
      logo: "/marlborough-logo.svg",
      logoAlt: "Marlborough College",
      period: "Aug 2019 – June 2022",
      degree: "International General Certificate of Secondary Education (IGCSE)",
      location: "Iskandar Puteri, Malaysia",
      summary:
        "Results: 8A* 3A",
      highlights: [
        "British Physics Olympiad",
        "Chess Club",
        "Volleyball",
      ],
    },
  ];

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
        <Timeline data={timelineData} />
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
                    {education.icon}
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
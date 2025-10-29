"use client";
import React from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { FlipWords } from "@/components/ui/flip-words";
import { BlurFade } from "@/components/ui/blur-fade";
import { Timeline } from "@/components/ui/timeline";
import { BriefcaseIcon, GraduationCapIcon, Mail, Send, MapPin } from "lucide-react";
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
  const mappedTimelineData = timelineData.map((item, index) => ({
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
    content: (
      <BlurFade delay={0.1 + index * 0.1} inView>
        <ExperienceCard content={item.content} />
      </BlurFade>
    ),
  }));

  // ============================
  // CONTACT SECTION VARIABLES
  // ============================
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Placeholder: Add email sending logic here
    alert("Thank you for your message! (This is a placeholder)");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
          <div className="flex w-full flex-col items-start justify-center text-left gap-6 md:pr-12">
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
      <section id="about" className="relative w-full min-h-[100vh] bg-white dark:bg-neutral-950 flex items-center justify-center px-4 md:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Portrait Image */}
            <BlurFade delay={0.25} inView className="flex w-full items-center justify-center">
              <div className="relative w-full max-w-md aspect-[3/4]">
                <Image
                  src="/about-me-potrait.jpg"
                  alt="Puah Tze Foong portrait"
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </BlurFade>

            {/* Right: About Information */}
            <BlurFade delay={0.35} inView className="flex flex-col justify-evenly h-full py-8 md:py-12">
              <div className="space-y-6">
                {/* Title */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-foreground">
                  About Me
                </h2>

                {/* Description */}
                <div className="space-y-4 leading-relaxed">
                  <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-foreground/70">
                    Full Stack Developer passionate about AI technologies and agentic tools. 
                    Experienced in building end-to-end solutions that leverage artificial intelligence to solve real-world problems. 
                  </p>
                  <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-foreground/70">
                    Always exploring the latest in AI advancements and tools, blending curiosity with code to create meaningful impact. 
                    When not building, you'll find me on the floorball court or vibe coding to some mandopop.
                  </p>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 mt-8">
                <a
                  href="https://www.linkedin.com/in/tzefoongpuah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://github.com/6felix9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a
                  href="mailto:tzefoong.puah@u.nus.edu"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
                  aria-label="Email"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <div id="experience" className="relative w-full overflow-clip">
        <Timeline data={mappedTimelineData} />
      </div>

      {/* Education Section */}
      <div id="education" className="w-full min-h-[100vh] bg-white dark:bg-neutral-950 font-sans px-4 md:px-10 flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto pt-16 md:pt-20 w-full">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-4 text-foreground max-w-4xl">
            Education
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70">
            A journey through my academic experiences and milestones.
          </p>
        </div>
        <div className="mt-10 grid w-full max-w-6xl mx-auto grid-cols-1 gap-3 md:gap-6 md:grid-cols-3 pb-12 md:pb-20">
          {educationHistory.map((education, index) => (
            <BlurFade key={education.institution} delay={0.1 + index * 0.1} inView>
              <article className="group relative flex h-full flex-col gap-5 rounded-xl border border-black/10 shadow-sm transition-all hover:duration-300 hover:shadow-xl hover:-translate-y-1 bg-gray-50 p-6 dark:border-white/10 dark:bg-neutral-900/80 dark:hover:shadow-neutral-800/40">
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
            </article>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="relative w-full min-h-[100vh] bg-white dark:bg-neutral-950 flex flex-col items-center justify-center px-4 md:px-6">
        <div className="max-w-6xl mx-auto pt-12 md:pt-16 w-full">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-4 text-foreground max-w-4xl">
            Contact Me
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70">
            Let's connect and create something amazing together.
          </p>
        </div>
        <div className="mx-auto w-full max-w-6xl py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start">
            {/* Left: Contact Information (1/3) */}
            <BlurFade delay={0.25} inView className="flex flex-col justify-center space-y-6">
              <div className="space-y-6">
                {/* Email */}
                <a
                  href="mailto:tzefoong.puah@u.nus.edu"
                  className="flex items-center gap-4 group transition-all duration-300 hover:translate-x-1"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors duration-200">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                      Email
                    </p>
                    <p className="text-sm sm:text-base text-foreground/80 group-hover:text-foreground transition-colors">
                      tzefoong.puah@u.nus.edu
                    </p>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/tzefoongpuah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group transition-all duration-300 hover:translate-x-1"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                      LinkedIn
                    </p>
                    <p className="text-sm sm:text-base text-foreground/80 group-hover:text-foreground transition-colors">
                      Tze Foong Puah
                    </p>
                  </div>
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/tzefoong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group transition-all duration-300 hover:translate-x-1"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors duration-200">
                    <Send className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                      Telegram
                    </p>
                    <p className="text-sm sm:text-base text-foreground/80 group-hover:text-foreground transition-colors">
                      @tzefoong
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors duration-200">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                      Location
                    </p>
                    <p className="text-sm sm:text-base text-foreground/80">
                      Singapore
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>

            {/* Right: Contact Form (2/3) */}
            <BlurFade delay={0.35} inView className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="w-full bg-transparent border-0 border-b-2 border-neutral-300 dark:border-neutral-700 px-0 py-3 text-base sm:text-lg text-foreground placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none hover:border-neutral-600 dark:hover:border-neutral-400 focus:border-neutral-600 dark:focus:border-neutral-400 transition-colors duration-300"
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@gmail.com"
                    required
                    className="w-full bg-transparent border-0 border-b-2 border-neutral-300 dark:border-neutral-700 px-0 py-3 text-base sm:text-lg text-foreground placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none hover:border-neutral-600 dark:hover:border-neutral-400 focus:border-neutral-600 dark:focus:border-neutral-400 transition-colors duration-300"
                  />
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or idea..."
                    required
                    rows={6}
                    className="w-full bg-transparent border-0 border-b-2 border-neutral-300 dark:border-neutral-700 px-0 py-3 text-base sm:text-lg text-foreground placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none hover:border-neutral-600 dark:hover:border-neutral-400 focus:border-neutral-600 dark:focus:border-neutral-400 transition-colors duration-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="shadow-[0_0_0_3px_#000000_inset] px-8 py-3 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 w-full sm:w-auto"
                >
                  Send Message
                </button>
              </form>
            </BlurFade>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";

export default function Home() {

  const words = [
    {
      text: "Welcome",
      className: "text-white",
    },
    {
      text: "to",
      className: "text-white",
    },
    {
      text: "Tze Foong's",
      className: "text-white",
    },
    {
      text: "Portfolio.",
      className: "text-white",

    },
  ];

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
        <TypewriterEffectSmooth words={words} />
      </div>
    </>
  );
}

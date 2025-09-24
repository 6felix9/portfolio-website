"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  titleDescription: string;
  content: React.ReactNode;
  icon?: React.ReactNode; // optional icon/logo for the marker
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto pt-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-4 text-foreground max-w-4xl">
          Experience
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70">
          A journey through my professional experiences and milestones.
        </p>
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex justify-start pt-10 ${index == 0 ? "md:pt-30" : "md:pt-40"} md:gap-10`}
          >
            <div className="sticky flex flex-col z-40 items-start top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-12 w-12 absolute left-2 md:left-2 rounded-full bg-white dark:bg-black flex items-center justify-center overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
                {item.icon}
              </div>
              <h3 className="hidden md:block text-3xl sm:text-4xl lg:text-5xl md:pl-20 font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 md:pl-20 md:mt-2">
                {item.titleDescription}
              </p>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-neutral-900 via-neutral-500 to-transparent dark:from-neutral-100 dark:via-neutral-400 from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

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
      className="w-full bg-white dark:bg-neutral-950 font-sans px-4 md:px-10"
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto pt-16 md:pt-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-4 text-foreground max-w-4xl">
          Experience
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70">
          A journey through my professional experiences and milestones.
        </p>
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto pb-16 md:pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            data-timeline-entry
            className={`relative flex flex-col md:flex-row justify-start pt-10 ${index == 0 ? "md:pt-30" : "md:pt-40"} gap-6 md:gap-10`}
          >
            <div
              data-timeline-meta
              className="relative flex items-center gap-4 md:flex-2 md:gap-0 md:flex-col md:items-start z-40 md:sticky md:top-40 md:self-start md:max-w-sm lg:max-w-full"
            >
              <div className="relative h-12 w-12 flex-shrink-0 rounded-full bg-white dark:bg-black flex items-center justify-center overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm md:absolute md:left-2">
                {item.icon}
              </div>
              <h3 className="hidden md:block text-3xl sm:text-4xl lg:text-5xl md:pl-20 font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-foreground/70 md:pl-20 md:mt-2">
                {item.titleDescription}
              </p>
            </div>

            <div
              data-timeline-content
              className="relative flex-3 w-full pl-12 pr-2 sm:px-4"
            >
              <h3 className="md:hidden block text-2xl mb-2 text-left font-bold text-neutral-500 dark:text-neutral-500">
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
          className="absolute left-6 md:left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
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

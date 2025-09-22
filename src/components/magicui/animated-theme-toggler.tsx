"use client";

import { Moon, SunDim } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

type props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const getStoredTheme = () => {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem("theme");
    } catch (error) {
      return null;
    }
  };
  const persistTheme = (dark: boolean) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (error) {
      // Ignore storage failures so unavailable persistence does not break toggling.
    }
  };

  useEffect(() => {
    const storedTheme = getStoredTheme();
    if (storedTheme === "light" || storedTheme === "dark") {
      setIsDarkMode(storedTheme === "dark");
      return;
    }

    const isDocumentDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDocumentDark);
  }, []);
  const changeTheme = async () => {
    if (!buttonRef.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        const dark = document.documentElement.classList.toggle("dark");
        setIsDarkMode(dark);
        persistTheme(dark);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };
  return (
    <button ref={buttonRef} onClick={changeTheme} className={cn(className)}>
      {isDarkMode ? <SunDim /> : <Moon />}
    </button>
  );
};

"use client";
import React, { useState } from "react";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "@/components/ui/resizable-navbar";

export default function Home() {
  const words = [
    { text: "Welcome", className: "text-foreground" },
    { text: "to", className: "text-foreground" },
    { text: "Tze Foong's", className: "text-foreground" },
    { text: "Portfolio.", className: "text-foreground" },
  ];

  const navItems = [
    { name: "About", link: "#about" },
    { name: "Experience", link: "#experience" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },

  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar className="fixed top-0 left-0 right-0 z-50">
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="hidden md:flex items-center gap-3">
            <AnimatedThemeToggler />
          </div>
          <div className="md:hidden flex items-center gap-3">
            <div>
              <AnimatedThemeToggler />
            </div>
            <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
          </div>
        </NavBody>
        <MobileNav visible={isOpen}>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(false)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <NavItems items={navItems} onItemClick={() => setIsOpen(false)} />
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* push content below fixed navbar height */}
      <div className="pt-24 flex min-h-screen flex-col items-center justify-center p-24 bg-background">
        <TypewriterEffectSmooth words={words} />
      </div>
    </>
  );
}

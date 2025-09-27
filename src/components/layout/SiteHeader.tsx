"use client";
import React, { useId, useState } from "react";
import Link from "next/link";
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

const navItems = [
  { name: "About", link: "#about" },
  { name: "Experience", link: "#experience" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
];

export const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuId = useId();

  return (
    <Navbar
      className="fixed top-0 left-0 right-0 z-50 lg:top-0"
      data-testid="site-navbar"
    >
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="hidden md:flex items-center gap-3">
          <AnimatedThemeToggler />
        </div>
        <div className="md:hidden flex items-center gap-3">
          <AnimatedThemeToggler />
          <MobileNavToggle
            isOpen={isOpen}
            onClick={() => setIsOpen((v) => !v)}
            menuId={mobileMenuId}
            variant="desktop"
          />
        </div>
      </NavBody>
      <MobileNav visible={isOpen}>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex items-center gap-3">
            <AnimatedThemeToggler className="text-xl" />
            <MobileNavToggle
              isOpen={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
              menuId={mobileMenuId}
              variant="mobile"
            />
          </div>
        </MobileNavHeader>
        <MobileNavMenu
          id={mobileMenuId}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <NavItems
            items={navItems}
            variant="mobile"
            className="text-lg"
            onItemClick={() => setIsOpen(false)}
          />
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

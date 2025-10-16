"use client";
import React, { useCallback, useEffect, useId, useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";
import { ThemeToggleButton } from "../ui/shadcn-io/theme-toggle-button";

const navItems = [
  { name: "About", link: "#about" },
  { name: "Experience", link: "#experience" },
  { name: "Education", link: "#education" },
  { name: "Contact", link: "#contact" },
];

export const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === "undefined") return true;
    return document.documentElement.classList.contains("dark");
  });
  const mobileMenuId = useId();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const updateTheme = () => {
      setIsDark(root.classList.contains("dark"));
    };
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const handleThemeToggle = useCallback(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains("dark");

    root.classList.toggle("dark", nextIsDark);
    setIsDark(nextIsDark);

    const body = document.body;
    if (body?.animate) {
      body.animate(
        [
          { opacity: 0.85 },
          { opacity: 1 },
        ],
        { duration: 200, easing: "ease-out" }
      );
    }
  }, []);

  return (
    <Navbar
      className="fixed top-0 left-0 right-0 z-50 lg:top-0"
      data-testid="site-navbar"
    >
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggleButton
            theme={isDark ? "dark" : "light"}
            onClick={handleThemeToggle}
            className="border-0 shadow-none"
          />
        </div>
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggleButton
            theme={isDark ? "dark" : "light"}
            onClick={handleThemeToggle}
            className="border-0 shadow-none"
          />
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
            <ThemeToggleButton
              theme={isDark ? "dark" : "light"}
              onClick={handleThemeToggle}
            className="border-0 shadow-none"
            />
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

import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 py-2 backdrop-blur">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4 sm:h-14 sm:px-6">
        <Link
          href="#home"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground/80 transition hover:text-foreground"
        >
          Tze Foong
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full border border-border/40 bg-background/80 px-2 py-1 shadow-sm backdrop-blur-lg sm:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <nav aria-label="Primary" className="flex items-center gap-1 sm:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <AnimatedThemeToggler className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background" />
        </div>
      </div>
    </header>
  );
};

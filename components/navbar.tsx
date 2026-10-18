"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSlidingIndicator } from "@/hooks/use-sliding-indicator";
import { scrollToSection } from "@/lib/utils";

const navItems = [
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Experience", href: "experience" },
  { label: "Projects", href: "projects" },
  { label: "Contact", href: "contact" },
];

const SCROLL_TARGET_KEY = "navScrollTarget";
const SCROLL_TARGET_TS_KEY = "navScrollTargetTs";
const SCROLL_TARGET_MAX_AGE_MS = 5000;

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [sectionActive, setSectionActive] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const routeActive = pathname.startsWith("/projects") ? "projects" : "";
  const active = pathname === "/" ? sectionActive : routeActive;
  const { containerRef, registerItem, indicatorRect } = useSlidingIndicator<HTMLElement>(active);

  // Section tracking only applies on "/"; other routes derive active state from pathname.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (pathname !== "/") return;

      // Ties the hero reset to real section position instead of a fixed scrollY guess.
      const firstSection = document.getElementById(navItems[0].href);
      if (firstSection && firstSection.getBoundingClientRect().top > 180) {
        setSectionActive("hero");
        return;
      }
      navItems.forEach(item => {
        const section = document.getElementById(item.href);
        if (section) {
          const { top, bottom } = section.getBoundingClientRect();
          if (top <= 180 && bottom >= 180) {
            setSectionActive(item.href);
          }
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // id travels via sessionStorage (not the URL hash) since pathname can update before the hash commits.
  const handleNavClick = (id: string) => {
    setOpen(false);

    if (pathname !== "/") {
      sessionStorage.setItem(SCROLL_TARGET_KEY, id);
      sessionStorage.setItem(SCROLL_TARGET_TS_KEY, String(Date.now()));
      router.push("/", { scroll: false });
      return;
    }

    scrollToSection(id);
  };

  // Real links keep Cmd/Ctrl/middle-click and shareable /#section URLs; plain clicks still scroll smoothly.
  const handleNavLinkClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    handleNavClick(id);
  };

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Home's sections may not be mounted yet after a cross-page nav (blocked on a data fetch), so wait for them.
  useEffect(() => {
    if (pathname !== "/") return;

    const id = sessionStorage.getItem(SCROLL_TARGET_KEY);
    const ts = Number(sessionStorage.getItem(SCROLL_TARGET_TS_KEY));
    sessionStorage.removeItem(SCROLL_TARGET_KEY);
    sessionStorage.removeItem(SCROLL_TARGET_TS_KEY);
    if (!id || Date.now() - ts > SCROLL_TARGET_MAX_AGE_MS) return;

    if (document.getElementById(id)) {
      scrollToSection(id);
      return;
    }

    const observer = new MutationObserver(() => {
      if (document.getElementById(id)) {
        scrollToSection(id);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 py-4 pointer-events-none">
      <div
        className={`w-full max-w-6xl pointer-events-auto rounded-full transition-[background-color,border-color,box-shadow,padding] duration-300 ${
          isScrolled
            ? "bg-background/70 backdrop-blur-md border border-border/40 shadow-lg px-6 py-2"
            : "bg-transparent border border-transparent px-6 py-3"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/#hero"
            aria-label="Harsh Vansjaliya, back to top"
            onClick={e => handleNavLinkClick(e, "hero")}
            className="flex items-center group relative cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            <div className="relative overflow-hidden w-9 h-9 md:w-10 md:h-10 rounded-full border border-border bg-muted flex items-center justify-center">
              <Image
                src="/hv-logo.svg"
                alt=""
                className="w-full h-full object-cover dark:invert"
                width={40}
                height={40}
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            ref={containerRef}
            className="relative hidden md:flex items-center gap-1 bg-muted/40 p-1 rounded-full border border-border/10"
          >
            {indicatorRect && (
              <span
                aria-hidden="true"
                className="absolute top-1 bottom-1 bg-foreground rounded-full border border-background/10 transition-[left,width] duration-300 ease-out motion-reduce:transition-none"
                style={{ left: indicatorRect.left, width: indicatorRect.width }}
              />
            )}
            {navItems.map(item => (
              <Link
                href={`/#${item.href}`}
                aria-current={active === item.href ? "page" : undefined}
                key={item.href}
                ref={registerItem(item.href)}
                onClick={e => handleNavLinkClick(e, item.href)}
                className={`relative z-10 px-4 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] ${
                  active === item.href
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            aria-expanded={open}
            className="md:hidden p-2 rounded-full border border-border/30 hover:bg-muted text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-controls="mobile-nav"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {open && (
          <nav
            id="mobile-nav"
            className="md:hidden absolute left-4 right-4 mt-3 bg-background/95 backdrop-blur-xl border border-border/40 rounded-3xl p-4 shadow-xl space-y-2 flex flex-col pointer-events-auto"
            aria-label="Mobile navigation"
          >
            {navItems.map(item => (
              <Link
                href={`/#${item.href}`}
                aria-current={active === item.href ? "page" : undefined}
                key={item.href}
                onClick={e => handleNavLinkClick(e, item.href)}
                className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] ${
                  active === item.href
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

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
  const [active, setActive] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const latest = window.scrollY;
      setIsScrolled(latest > 20);

      if (latest < 100) {
        setActive("hero");
        return;
      }
      navItems.forEach(item => {
        const section = document.getElementById(item.href);
        if (section) {
          const { top, bottom } = section.getBoundingClientRect();
          if (top <= 180 && bottom >= 180) {
            setActive(item.href);
          }
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // id travels via sessionStorage (not the URL hash) since pathname can update before the hash commits.
  const handleScroll = (id: string) => {
    setOpen(false);

    if (pathname !== "/") {
      sessionStorage.setItem(SCROLL_TARGET_KEY, id);
      sessionStorage.setItem(SCROLL_TARGET_TS_KEY, String(Date.now()));
      router.push("/", { scroll: false });
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Home's sections may not be mounted yet after a cross-page nav (blocked on a data fetch), so wait for them.
  useEffect(() => {
    if (pathname !== "/") return;

    const id = sessionStorage.getItem(SCROLL_TARGET_KEY);
    const ts = Number(sessionStorage.getItem(SCROLL_TARGET_TS_KEY));
    sessionStorage.removeItem(SCROLL_TARGET_KEY);
    sessionStorage.removeItem(SCROLL_TARGET_TS_KEY);
    if (!id || Date.now() - ts > SCROLL_TARGET_MAX_AGE_MS) return;

    const existing = document.getElementById(id);
    if (existing) {
      existing.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const observer = new MutationObserver(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 py-4 pointer-events-none">
      <div
        className={`w-full max-w-6xl pointer-events-auto rounded-full transition-all duration-300 ${
          isScrolled
            ? "bg-background/70 backdrop-blur-md border border-border/40 shadow-lg px-6 py-2"
            : "bg-transparent border border-transparent px-6 py-3"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleScroll("hero")}
            className="flex items-center group relative cursor-pointer"
          >
            <div className="relative overflow-hidden w-9 h-9 md:w-10 md:h-10 rounded-full border border-border bg-muted flex items-center justify-center">
              <Image
                src="/400X400.svg"
                alt="Harsh Vansjaliya Logo"
                className="w-full h-full object-cover dark:invert"
                width={40}
                height={40}
              />
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-muted/40 p-1 rounded-full border border-border/10">
            {navItems.map(item => (
              <button
                aria-label={item.label}
                aria-current={active === item.href ? "page" : undefined}
                key={item.href}
                onClick={() => handleScroll(item.href)}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                  active === item.href
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {active === item.href && (
                  <span className="absolute inset-0 bg-foreground rounded-full border border-background/10" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            aria-expanded={open}
            className="md:hidden p-2 rounded-full border border-border/30 hover:bg-muted text-foreground transition-colors cursor-pointer"
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
            className="md:hidden absolute left-4 right-4 mt-3 bg-background/95 backdrop-blur-xl border border-border/40 rounded-3xl p-4 shadow-xl space-y-2 flex flex-col pointer-events-auto"
            aria-label="Mobile navigation"
          >
            {navItems.map(item => (
              <button
                aria-label={item.label}
                aria-current={active === item.href ? "page" : undefined}
                key={item.href}
                onClick={() => handleScroll(item.href)}
                className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  active === item.href
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/utils";

const navItems = [
  { label: "About", href: "about" },
  { label: "Experience", href: "experience" },
  { label: "Work", href: "projects" },
  { label: "Contact", href: "contact" },
];

const SCROLL_TARGET_KEY = "navScrollTarget";
const SCROLL_TARGET_TS_KEY = "navScrollTargetTs";
const SCROLL_TARGET_MAX_AGE_MS = 5000;

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const onProjectsRoute = pathname.startsWith("/projects");

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

  const linkClass =
    "underline-offset-[6px] decoration-1 hover:underline aria-[current=page]:underline transition-colors";

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-5 pt-6 lg:px-10 lg:pt-8">
      <Link
        href="/#hero"
        aria-label="Harsh Vansjaliya, back to top"
        onClick={e => handleNavLinkClick(e, "hero")}
        className="block size-10 transition-transform duration-150 hover:-translate-y-0.5 motion-reduce:transform-none"
      >
        <Image src="/hv-logo.svg" alt="" width={40} height={40} className="size-10" />
      </Link>

      <nav aria-label="Main" className="hidden md:flex items-center gap-7 text-[15px]">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={`/#${item.href}`}
            aria-current={onProjectsRoute && item.href === "projects" ? "page" : undefined}
            onClick={e => handleNavLinkClick(e, item.href)}
            className={linkClass}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label="Toggle navigation"
        onClick={() => setOpen(!open)}
        className="md:hidden flex size-11 items-center justify-center cursor-pointer"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="md:hidden absolute inset-x-0 top-full mt-2 flex flex-col bg-card px-5 py-4 shadow-2xl animate-fade-up motion-reduce:animate-none"
        >
          {navItems.map(item => (
            <Link
              key={item.href}
              href={`/#${item.href}`}
              aria-current={onProjectsRoute && item.href === "projects" ? "page" : undefined}
              onClick={e => handleNavLinkClick(e, item.href)}
              className={`py-3 text-lead font-semibold ${linkClass}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

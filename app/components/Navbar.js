"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogOut, MonitorSmartphone, MoonStar, SunMedium, User } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useTheme } from "@/app/context/ThemeContext";

const navItems = [
  { label: "Home", href: "/#home" }, 
  { label: "Tours", href: "/tours" },
  { label: "Bike Ride", href: "/bike-ride" },
  { label: "Trekking", href: "/trekking" },
  { label: "Contact Us", href: "/contact" },
];

const moreNavItems = [
  { label: "About Us", href: "/about-us" },
  { label: "Merchandise", href: "/merchandise" },
  { label: "Customer Gallery", href: "/gallery" },
  { label: "Rules & Regulations", href: "/rules-regulations" },
];



function getActiveItem(href, pathname, hash) {
  if (href === "/tours") {
    return pathname === "/tours" || pathname.startsWith("/tours/");
  }

  if (href === "/gallery") {
    return pathname === "/gallery";
  }

  if (href === "/contact") {
    return pathname === "/contact";
  }

  if (href === "/merchandise") {
    return pathname === "/merchandise";
  }

  if (href === "/about-us") {
    return pathname === "/about-us";
  }

  if (href === "/bike-ride") {
    return pathname === "/bike-ride";
  }

  if (href === "/trekking") {
    return pathname === "/trekking";
  }

  if (href === "/rules-regulations") {
    return pathname === "/rules-regulations";
  }

  if (href === "/#home") {
    return pathname === "/" && (!hash || hash === "#home");
  }

  if (href.startsWith("/#")) {
    return pathname === "/" && hash === href.replace("/#", "#");
  }

  return false;
}

const themeOptions = [
  { value: "light", label: "Light", icon: SunMedium },
  { value: "dark", label: "Dark", icon: MoonStar },
  { value: "system", label: "System", icon: MonitorSmartphone },
];

function ThemeMenuButton({ pathname, mobile = false, iconOnly = false, alignRight = false }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const activeOption = themeOptions.find((option) => option.value === theme) ?? themeOptions[2];
  const ActiveIcon = activeOption.icon;
  const isLightTheme = resolvedTheme === "light";

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  const buttonClasses = iconOnly
    ? `inline-flex h-11 w-11 items-center justify-center rounded-3xl border transition ${
        mobile
          ? "border-white/10 bg-white/10 text-white hover:bg-white/20"
          : isLightTheme
            ? "border-(--border) bg-(--surface-strong) text-slate-900 hover:bg-black/5"
            : "border-white/10 bg-white/5 text-white/85 hover:bg-white/10 hover:text-white"
      }`
    : mobile
    ? `flex w-full items-center justify-between rounded-3xl border px-5 py-4 text-sm font-semibold transition ${
        isLightTheme
          ? "border-(--border) bg-(--surface-strong) text-slate-900 hover:bg-black/5"
          : "border-white/10 bg-white/10 text-white hover:bg-white/20"
      }`
    : `inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition ${
        isLightTheme
          ? "border-(--border) bg-(--surface-strong) text-slate-900 hover:bg-black/5"
          : "border-white/10 bg-white/5 text-white/85 hover:bg-white/10 hover:text-white"
      }`;

  const menuClasses = mobile
    ? `absolute left-0 right-0 top-full mt-3 grid gap-2 rounded-3xl border p-2 shadow-2xl backdrop-blur-xl z-50 ${
        isLightTheme ? "border-(--border) bg-(--surface-strong)" : "border-white/10 bg-slate-950/95"
      }`
    : `absolute top-full mt-2 grid w-56 gap-2 rounded-3xl border p-2 shadow-2xl backdrop-blur-xl ${alignRight ? "right-0" : "left-0"} ${
        isLightTheme ? "border-(--border) bg-(--surface-strong)" : "border-white/10 bg-slate-950/95"
      }`;

  return (
    <div ref={menuRef} className={`relative ${mobile ? "w-full" : "shrink-0"}`}>
      <button
        type="button"
        aria-label={`Change theme, current theme ${activeOption.label.toLowerCase()}`}
        onClick={() => setOpen((value) => !value)}
        className={buttonClasses}
      >
        {iconOnly ? (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/15 text-amber-300">
            <ActiveIcon className="h-4 w-4" />
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/15 text-amber-300">
              <ActiveIcon className="h-4 w-4" />
            </span>
            <span>{activeOption.label} theme</span>
          </span>
        )}
      </button>

      {open && (
        <div className={menuClasses}>
          {themeOptions.map((option) => {
            const OptionIcon = option.icon;
            const selected = option.value === theme;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setTheme(option.value);
                  setOpen(false);
                }}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  selected
                    ? isLightTheme
                      ? "border-amber-300/40 bg-amber-300/15 text-slate-900"
                      : "border-amber-300/40 bg-amber-300/15 text-amber-100"
                    : isLightTheme
                      ? "border-(--border) bg-transparent text-slate-700 hover:bg-black/5 hover:text-slate-950"
                      : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <OptionIcon className="h-4 w-4" />
                  {option.label}
                </span>
                {selected ? <span className={`text-[10px] uppercase tracking-[0.28em] ${isLightTheme ? "text-amber-700" : "text-amber-200"}`}>Active</span> : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MoreMenuButton({ pathname, currentHash, isLightTheme, mobile = false }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const active = moreNavItems.some((item) => getActiveItem(item.href, pathname, currentHash));

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  const buttonClasses = mobile
    ? "flex w-full items-center justify-between rounded-3xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/20"
    : `inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition ${
        active
          ? isLightTheme
            ? "border-slate-300 bg-slate-100 text-slate-950"
            : "border-white/20 bg-white/10 text-white"
          : isLightTheme
            ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950"
            : "border-white/10 bg-white/5 text-white/85 hover:bg-white/10 hover:text-white"
      }`;

  const menuClasses = mobile
    ? "absolute left-0 right-0 top-full mt-3 grid gap-2 rounded-3xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl backdrop-blur-xl z-50"
    : `absolute right-0 top-full mt-2 grid w-60 gap-2 rounded-3xl border p-2 shadow-2xl backdrop-blur-xl ${
        isLightTheme ? "border-(--border) bg-(--surface-strong)" : "border-white/10 bg-slate-950/95"
      }`;

  return (
    <div ref={menuRef} className={`relative ${mobile ? "w-full" : "shrink-0"}`}>
      <button type="button" onClick={() => setOpen((value) => !value)} className={buttonClasses}>
        <span>More</span>
      </button>

      {open && (
        <div className={menuClasses}>
          {moreNavItems.map((item) => {
            const itemActive = getActiveItem(item.href, pathname, currentHash);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl border px-4 py-3 text-sm transition ${
                  itemActive
                    ? isLightTheme
                      ? "border-slate-300 bg-slate-100 text-slate-950"
                      : "border-amber-300/40 bg-amber-300/15 text-amber-100"
                    : isLightTheme
                      ? "border-(--border) bg-transparent text-slate-700 hover:bg-black/5 hover:text-slate-950"
                      : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const { resolvedTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const isLightTheme = resolvedTheme === "light";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const frameId = window.requestAnimationFrame(() => {
      setCurrentHash(window.location.hash);
      setIsScrolled(window.scrollY > 20);
    });

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleHashChange = () => setCurrentHash(window.location.hash);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    // Prevent background scroll when mobile drawer is open.
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setMenuOpen(false);
      setProfileMenuOpen(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setProfileMenuOpen(false);
  };

  return (
    <div className="relative z-50" style={{ zIndex: 1000 }}>
      <div
        // Valid z-index utilities keep navbar above mobile page layers.
        className={`fixed left-0 right-0 top-0 z-50 mx-auto w-full px-4 transition-all duration-300 ease-out sm:px-6 md:sticky ${
          isScrolled ? "theme-surface py-3" : "theme-surface py-4 sm:py-5"
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-4">
          <Link href="/" className={`flex min-w-0 flex-1 shrink items-center gap-3 ${isLightTheme ? "text-slate-900" : "text-white"}`}>
            <span className="theme-glow flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-white ring-1 ring-amber-300/20 shadow-lg shadow-amber-500/10 sm:h-12 sm:w-12">
              <Image
                src="/cjd%20logo.jpg"
                alt="Cholo Jai Dure logo"
                width={48}
                height={48}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold sm:text-base">Cholo Jai Dure</p>
              <p className={`hidden truncate text-[11px] sm:text-xs md:block ${isLightTheme ? "text-slate-600" : "text-white/70"}`}>Explore Beyond Boundaries</p>
            </div>
          </Link>

          <nav className={`hidden min-w-0 items-center justify-center gap-6 overflow-x-auto whitespace-nowrap text-sm font-medium lg:flex ${isLightTheme ? "text-slate-700" : "text-white/80"}`}>
            {navItems.map((item) => {
              const active = getActiveItem(item.href, pathname, currentHash);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative transition duration-300 ${
                    active ? (isLightTheme ? "text-slate-950" : "text-white") : isLightTheme ? "hover:text-slate-950" : "hover:text-white"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 w-full bg-white transition-all duration-300 ${
                      active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <MoreMenuButton pathname={pathname} currentHash={currentHash} isLightTheme={isLightTheme} />
            <div className="relative z-50">
              <ThemeMenuButton pathname={pathname} />
            </div>
            {!loading && user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isLightTheme
                      ? "border-amber-300/40 bg-amber-300/15 text-slate-900 hover:bg-amber-300/25"
                      : "border-amber-400/30 bg-amber-400/20 text-amber-300 hover:bg-amber-400/30"
                  }`}
                >
                  <User className="h-4 w-4" />
                  {user.name}
                </button>
                
                {/* Profile dropdown */}
                {profileMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border shadow-xl ${isLightTheme ? "border-(--border) bg-(--surface-strong)" : "border-white/10 bg-slate-950"}`}>
                    <Link
                      href="/account"
                      className={`block w-full border-b px-4 py-3 text-left text-sm transition ${isLightTheme ? "border-(--border) text-slate-900 hover:bg-black/5" : "border-white/5 text-white hover:bg-white/10"}`}
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <User className="h-4 w-4 inline mr-2" />
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-sm text-red-300 transition hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Temporarily hidden login and call buttons */}
                {/* <Link
                  href="/auth/login"
                  className="rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  Login
                </Link>
                <a
                  href="tel:7501307766"
                  className="hidden rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/20 md:inline-flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Call Us
                </a> */}
              </>
            )}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 lg:hidden">
            <ThemeMenuButton pathname={pathname} iconOnly alignRight />
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={(event) => {
                event.stopPropagation();
                setMenuOpen((open) => !open);
              }}
              className={`relative z-50 flex h-11 w-11 shrink-0 items-center justify-center rounded-3xl border transition ${isLightTheme ? "border-slate-300 bg-white text-black shadow-md shadow-slate-900/5 hover:bg-slate-50" : "border-white/10 bg-black/30 text-white hover:bg-black/40"}`}
              style={{ zIndex: 1010 }}
            >
              <span className="relative h-5 w-5">
                <span className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-2 transition-all duration-300 ${isLightTheme ? "bg-black" : "bg-white"} ${menuOpen ? "translate-y-0 rotate-45" : ""}`} />
                <span className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 transition-all duration-300 ${isLightTheme ? "bg-black" : "bg-white"} ${menuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 top-1/2 block h-0.5 w-5 translate-y-1 transition-all duration-300 ${isLightTheme ? "bg-black" : "bg-white"} ${menuOpen ? "translate-y-0 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-20 lg:hidden" aria-hidden="true" />

      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-50 overflow-y-auto transition-all duration-300 lg:hidden ${
          menuOpen
            ? "visible translate-x-0 opacity-100 pointer-events-auto"
            : "invisible translate-x-full opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: isLightTheme ? "rgba(246, 240, 232, 0.38)" : "rgba(2, 6, 23, 0.42)", zIndex: 1020, backdropFilter: "blur(12px)" }}
      >
        <div className={`ml-auto flex min-h-full w-full max-w-88 flex-col gap-6 border-l px-4 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] ${
          isLightTheme
            ? "border-(--border) bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(246,240,232,0.95))]"
            : "border-white/10 bg-[linear-gradient(180deg,rgba(12,18,31,0.98),rgba(7,12,24,0.96))]"
        }`}>
          <div>
            <div className="mb-8 flex items-center justify-between">
              <Link href="/" className={`flex items-center gap-3 ${isLightTheme ? "text-slate-900" : "text-white"}`}>
                <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-3xl bg-white ring-1 ring-amber-300/20">
                  <Image
                    src="/cjd%20logo.jpg"
                    alt="Cholo Jai Dure logo"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                    priority
                  />
                </span>
                <div>
                  <p className="text-base font-semibold">Cholo Jai Dure</p>
                  <p className={`text-xs ${isLightTheme ? "text-slate-600" : "text-white/70"}`}>Explore Beyond Boundaries</p>
                </div>
              </Link>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMenuOpen(false)}
                className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition ${
                  isLightTheme
                    ? "border-(--border) bg-white/80 text-slate-900 hover:bg-black/5"
                    : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                ✕
              </button>
            </div>

            <p className={`mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.28em] ${isLightTheme ? "text-slate-500" : "text-white/45"}`}>
              Navigate
            </p>

            <div className={`space-y-2.5 text-base font-semibold ${isLightTheme ? "text-slate-900" : "text-white"}`}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-2xl border px-4 py-3 transition ${isLightTheme ? "border-(--border) bg-white/85 hover:bg-black/5" : "border-white/10 bg-white/6 hover:bg-white/10"}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="space-y-2.5">
                {moreNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-2xl border px-4 py-3 transition ${isLightTheme ? "border-(--border) bg-white/85 hover:bg-black/5" : "border-white/10 bg-white/6 hover:bg-white/10"}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className={`space-y-3 border-t pt-4 pb-2 ${isLightTheme ? "border-(--border)" : "border-white/10"}`}>
            <p className={`px-1 text-[10px] font-semibold uppercase tracking-[0.28em] ${isLightTheme ? "text-slate-500" : "text-white/45"}`}>
              Preferences
            </p>

            <div className="relative">
              <ThemeMenuButton pathname={pathname} mobile />
            </div>

            {!loading && user ? (
              <>
                <div className={`rounded-2xl border px-4 py-3 text-center ${isLightTheme ? "border-amber-300/30 bg-amber-300/15" : "border-amber-400/20 bg-amber-400/10"}`}>
                  <p className={`text-sm font-semibold ${isLightTheme ? "text-slate-900" : "text-amber-300"}`}>
                    <User className="h-4 w-4 inline mr-2" />
                    {user.name}
                  </p>
                </div>
                <Link
                  href="/account"
                  className={`block rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition ${isLightTheme ? "border-(--border) bg-white/85 text-slate-900 hover:bg-black/5" : "border-white/10 bg-white/6 text-white hover:bg-white/10"}`}
                  onClick={() => setMenuOpen(false)}
                >
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-2xl border border-red-500/30 bg-red-500/20 px-4 py-3 text-center text-sm font-semibold text-red-300 transition hover:bg-red-500/30"
                >
                  <LogOut className="h-4 w-4 inline mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Temporarily hidden login and call buttons */}

                {/* <Link
                  href="/auth/login"
                  className="block rounded-3xl bg-amber-400 px-5 py-4 text-center text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <a
                  href="tel:7501307766"
                  className="block rounded-3xl border border-white/10 bg-white/10 px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/20"
                  onClick={() => setMenuOpen(false)}
                >
                  Call Us
                </a> */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


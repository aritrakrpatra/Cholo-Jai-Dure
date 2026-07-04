"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Compass, MapPin, Phone, Plane, User, LogOut } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about-us" },
  { label: "Tours", href: "/#tours" },
  { label: "Bike Ride", href: "/#bike-ride" },
  { label: "Customer Gallery", href: "/gallery" },
  { label: "Rules & Regulations", href: "/#rules" },
  { label: "Contact Us", href: "/#contact" },
];



function getActiveItem(href, pathname, hash) {
  if (href === "/gallery") {
    return pathname === "/gallery";
  }

  if (href === "/#home") {
    return pathname === "/" && (!hash || hash === "#home");
  }

  if (href.startsWith("/#")) {
    return pathname === "/" && hash === href.replace("/#", "#");
  }

  return false;
}

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const [mounted, setMounted] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setCurrentHash(window.location.hash);
    setIsScrolled(window.scrollY > 20);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleHashChange = () => setCurrentHash(window.location.hash);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setProfileMenuOpen(false);
  };

  return (
    <div className="relative z-60">
      <div
        className={`sticky top-0 z-60 mx-auto w-full px-4 transition-all duration-300 ease-out sm:px-6 ${
          isScrolled ? "backdrop-blur-2xl bg-slate-950/80 py-3 shadow-xl border-b border-white/10" : "backdrop-blur-xl bg-slate-950/40 py-4 sm:py-5"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 sm:gap-4">
          <Link href="/" className="flex min-w-0 flex-1 items-center gap-3 text-white">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-3xl bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/20 shadow-lg shadow-amber-500/10 sm:h-12 sm:w-12">
              <Plane className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold sm:text-base">Cholo Jai Dure</p>
              <p className="truncate text-[11px] text-white/70 sm:text-xs">Explore Beyond Boundaries</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
            {navItems.map((item) => {
              const active = getActiveItem(item.href, pathname, currentHash);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative transition duration-300 ${
                    active ? "text-white" : "hover:text-white"
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

          <div className="hidden items-center gap-3 md:flex">
            {mounted && !loading && user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 rounded-full bg-amber-400/20 border border-amber-400/30 px-4 py-2 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/30"
                >
                  <User className="h-4 w-4" />
                  {user.name}
                </button>
                
                {/* Profile dropdown */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-slate-950 border border-white/10 shadow-xl overflow-hidden">
                    <Link
                      href="/account"
                      className="block w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 transition border-b border-white/5"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <User className="h-4 w-4 inline mr-2" />
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-300 hover:bg-red-500/10 transition"
                    >
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
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
                </a>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-slate-950/70 text-white transition hover:bg-slate-900/90 md:hidden"
          >
            <span className="block h-0.5 w-5 bg-white" />
            <span className="mt-1.5 block h-0.5 w-5 bg-white" />
            <span className="mt-1.5 block h-0.5 w-5 bg-white" />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-55 transform overflow-y-auto bg-slate-950/95 backdrop-blur-xl transition duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-8">
          <div>
            <div className="mb-12 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 text-white">
                <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/20">
                  <Plane className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-base font-semibold">Cholo Jai Dure</p>
                  <p className="text-xs text-white/70">Explore Beyond Boundaries</p>
                </div>
              </Link>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMenuOpen(false)}
                className="text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-lg font-semibold text-white">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-3xl border border-white/10 bg-white/10 px-5 py-4 transition hover:bg-white/20"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {mounted && !loading && user ? (
              <>
                <div className="rounded-3xl bg-amber-400/10 border border-amber-400/20 px-5 py-4 text-center">
                  <p className="text-sm font-semibold text-amber-300">
                    <User className="h-4 w-4 inline mr-2" />
                    {user.name}
                  </p>
                </div>
                <Link
                  href="/account"
                  className="block rounded-3xl border border-white/10 bg-white/10 px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/20"
                  onClick={() => setMenuOpen(false)}
                >
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-3xl bg-red-500/20 border border-red-500/30 px-5 py-4 text-center text-sm font-semibold text-red-300 transition hover:bg-red-500/30"
                >
                  <LogOut className="h-4 w-4 inline mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
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
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


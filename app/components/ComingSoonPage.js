"use client";

import Navbar from "./Navbar";

export default function ComingSoonPage({ title, description }) {
  return (
    <div className="theme-bg min-h-screen text-foreground">
      <Navbar />
      <main className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto flex min-h-[70svh] max-w-4xl items-center justify-center">
          <div className="theme-surface-strong w-full rounded-4xl px-6 py-12 text-center sm:px-10 sm:py-16">
            <p className="text-sm uppercase tracking-[0.45em] text-amber-300">Coming Soon</p>
            <h1 className="mt-4 text-3xl font-bold sm:text-5xl">{title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-(--muted) sm:text-base">
              {description}
            </p>
            <p className="mt-6 text-sm font-semibold text-amber-300">
              We are working on it and it will be coming soon.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

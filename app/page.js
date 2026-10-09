"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";

const galleryImages = [
  "/house-boat.jpeg",
  "/group1.jpeg",
  "/group2.jpeg",
  "/group3.jpeg",
  "/group4.jpeg",
  "/group5.jpeg",
  "/group6.jpeg",
  "/group7.jpeg",
];

const testimonials = [
  {
    name: "Dr. Souvik Ghosh",
    designation: "Doctor",
    comment: "Excellent accomodation. Very Good transport also. Food arrangement awesome. Finally Communication is Excellent also.",
  },
  {
    name: "Mrinal Pati",
    designation: "Retired Army Officer",
    comment: "Overall very good everything like Accommodation, transportation and food. Good behavior and everything explanation. But my suggestion Rameshwaram may halt for two days. If possible then sight seeing from morning so reach before evening.",
  },
  {
    name: "Chaitali Singh",
    designation: "Teacher",
    comment: "Had a great experience with Cholo Jai Dure Tour and Travels. The management was professional and well-organized, making everything smooth and hassle-free. Travel arrangements were comfortable and timely, and the food was fresh, tasty, and well-managed. Highly recommended!",
  },
];

export default function CholoJaiDureTours() {
  return (
    <div className="bg-slate-950 text-white">
      <Navbar />

      <section id="home" className="relative isolate bg-slate-950">
        <div className="sm:hidden">
          <div className="relative z-10 flex flex-col items-center px-4 pb-8 pt-6 text-center">
            <div className="mx-auto max-w-md">
              <h1
                className="brand-reveal font-brand text-[clamp(1.8rem,8vw,2.8rem)] font-bold leading-tight"
                style={{ color: "var(--foreground)" }}
              >
                CHOLO JAI DURE
              </h1>
              <h2 className="brand-reveal font-brand mt-2 text-[clamp(1rem,5vw,1.45rem)] font-semibold text-white/80" style={{ animationDelay: "160ms" }}>
                Tour &amp; Travels
              </h2>
              <p className="mb-3 mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/80">
                <Image
                  src="/cjd%20logo.jpg"
                  alt="Cholo Jai Dure logo"
                  width={14}
                  height={14}
                  className="h-3.5 w-3.5 rounded-full object-cover"
                />
                ESTD. 2024
              </p>
              <p lang="bn" className="brand-reveal mx-auto mt-3 max-w-sm text-sm text-white/80" style={{ animationDelay: "320ms" }}>
                "কাশ্মীর থেকে কন্যাকুমারী — স্বাদে থাকুক বাংলার ছোঁয়া"
              </p>
            </div>
          </div>

          <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/group1.jpeg"
              preload="auto"
              className="h-full w-full object-cover object-center"
            >
              <source src="/cjd video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-linear-to-b from-slate-950/20 via-transparent to-slate-950/60" />
          </div>

          <div className="relative z-10 flex flex-col items-center px-4 pb-8 pt-5 text-center">
            <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3">
              <a
                href="/tours"
                className="flex w-full max-w-xs items-center justify-center rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
              >
                View Packages
              </a>
              <Link
                href="/contact"
                className="flex w-full max-w-xs items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm text-white transition hover:bg-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-video relative hidden min-h-[calc(100svh-5rem)] sm:block md:min-h-screen">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/group1.jpeg"
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source src="/cjd video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-linear-to-b from-slate-950/75 via-slate-950/30 to-slate-950/90" />

          <div className="relative z-10 flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center px-6 pb-8 pt-10 text-center md:min-h-screen md:pt-16">
            <div className="mx-auto max-w-4xl">
              <h1 className="brand-reveal font-brand text-[clamp(1.5rem,7vw,2.7rem)] font-bold leading-tight sm:text-5xl md:text-7xl" style={{ color: "white", textShadow: "0 2px 16px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.7)" }}>
                CHOLO JAI DURE
              </h1>
              <h2 className="brand-reveal font-brand mt-3 text-[clamp(1rem,5vw,1.75rem)] font-semibold text-white/80 sm:text-3xl md:text-5xl" style={{ animationDelay: "160ms" }}>
                Tour &amp; Travels
              </h2>
              <p className="mb-4 mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-white/80">
                <Image
                  src="/cjd%20logo.jpg"
                  alt="Cholo Jai Dure logo"
                  width={16}
                  height={16}
                  className="h-4 w-4 rounded-full object-cover"
                />
                ESTD. 2024
              </p>
              <p lang="bn" className="brand-reveal mx-auto mt-5 max-w-3xl text-base text-white/85 md:text-xl" style={{ animationDelay: "320ms" }}>
                কাশ্মীর থেকে কন্যাকুমারী — স্বাদে থাকুক বাংলার ছোঁয়া’
              </p>
              <div className="mt-8 flex flex-row justify-center gap-4">
                <a
                  href="/tours"
                  className="flex items-center justify-center rounded-full bg-amber-400 px-8 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  View Packages
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm text-white transition hover:bg-white/20"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/tours"
            className="group grid overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 transition hover:border-amber-300/40 sm:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="relative min-h-52 sm:min-h-64">
              <Image
                src="/Domestic Tour.jpeg"
                alt="Domestic tour destinations across India"
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 40vw"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Explore India</p>
              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Domestic Packages</h2>
              <p className="mt-3 max-w-xl text-sm text-white/70 sm:text-base">
                Find your next journey across India, from Himalayan escapes to spiritual destinations.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-amber-300 sm:text-lg">
                Explore domestic tours <span aria-hidden="true">-&gt;</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section id="about-us" className="py-16 bg-slate-900/80 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Why Choose Cholo Jai Dure</p>
              <h2 className="mt-4 text-2xl font-bold sm:text-4xl">Travel with comfort, style, and trust</h2>
              <p className="mt-6 text-white/70">Our premium trips focus on personalised service, luxury stays, safe transport, and unforgettable local experiences for every itinerary.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Handpicked stays",
                "Expert guides",
                "Hassle-free planning",
                "24/7 traveler support",
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                  <p className="text-lg font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Popular Destinations</p>
            <h2 className="mt-4 text-2xl font-bold sm:text-4xl">Destinations loved by travelers</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              { title: "Rajasthan", subtitle: "Royal heritage" },
              { title: "Varanasi", subtitle: "Spiritual heritage" },
              { title: "Leh Ladakh", subtitle: "Adventure retreat" },
            ].map((destination) => (
              <div key={destination.title} className="rounded-4xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl transition hover:-translate-y-1">
                <p className="text-amber-300">{destination.subtitle}</p>
                <h3 className="mt-4 text-2xl font-bold">{destination.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-100 text-slate-950 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Testimonials</p>
            <h2 className="mt-4 text-2xl font-bold sm:text-4xl">What travelers say</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((review) => (
              <div key={review.name} className="flex h-full flex-col rounded-4xl border border-slate-200 bg-white p-8 shadow-xl">
                <p className="flex-1 text-slate-700">&ldquo;{review.comment}&rdquo;</p>
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <p className="font-semibold text-slate-900">{review.name}</p>
                  <p className="text-xs text-slate-500">{review.designation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-950 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Travel Statistics</p>
            <h2 className="mt-4 text-2xl font-bold sm:text-4xl">Making every journey memorable</h2>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
            {[
              { value: "400+", label: "Happy Travelers" },
              { value: "50+", label: "Destinations Covered" },
              { value: "100%", label: "Trusted Service" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-4xl border border-white/10 bg-slate-900/90 p-6 sm:p-10">
                <p className="text-4xl font-bold text-amber-300 sm:text-5xl">{stat.value}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
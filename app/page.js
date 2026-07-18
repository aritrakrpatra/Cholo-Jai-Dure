"use client";
import Link from "next/link";
import Image from "next/image";
import { Plane } from "lucide-react";
import Navbar from "./components/Navbar";
import { allPackages as tours } from "./data/packages";

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

const faqItems = [
  {
    question: "How do I book a tour?",
    answer: "Use the Book Now button or contact us directly via phone or the enquiry form.",
  },
  {
    question: "Can I customize my itinerary?",
    answer: "Yes. We design tailored itineraries based on your travel interests and budget.",
  },
  {
    question: "Are meals included?",
    answer: "Most tours include breakfast and selected meals. Details are shown on each package.",
  },
];

const testimonials = [
  {
    name: "Riya Sen",
    designation: "Software Engineer",
    comment: "Amazing experience, perfect planning and service.",
    image: "https://i.pravatar.cc/120?img=5",
  },
  {
    name: "Anirban Das",
    designation: "Business Consultant",
    comment: "The guides were so helpful and the hotels were excellent.",
    image: "https://i.pravatar.cc/120?img=12",
  },
  {
    name: "Shreya Mukherjee",
    designation: "School Teacher",
    comment: "A luxurious trip with great attention to every detail.",
    image: "https://i.pravatar.cc/120?img=32",
  },
];

export default function CholoJaiDureTours() {
  return (
    <div className="bg-slate-950 text-white">
      <Navbar />

      <section
        id="home"
        className="relative isolate min-h-[calc(100svh-5rem)] md:min-h-screen"
        style={{ backgroundImage: "url('/group1.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
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

        <div className="relative z-10 flex min-h-[calc(100svh-5rem)] md:min-h-screen flex-col items-center justify-start px-4 pb-10 pt-8 text-center sm:justify-center sm:px-6 sm:pb-8 sm:pt-10 md:pt-16">
          <div className="mx-auto max-w-4xl">

            {/* Flash News Ticker */}
            <div className="mb-4 hidden justify-center min-[421px]:flex sm:mb-6">
              <div className="flex w-full max-w-2xl overflow-hidden rounded-2xl border border-amber-400/40 bg-black/40 shadow-lg shadow-amber-400/10 backdrop-blur-md sm:rounded-full">
                <span className="shrink-0 rounded-l-2xl bg-amber-400 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-950 max-[380px]:hidden sm:rounded-l-full sm:px-4 sm:text-xs sm:tracking-widest">
                  FLASH NEWS
                </span>
                <div className="overflow-hidden flex-1">
                  <div
                    className="flex whitespace-nowrap py-2 text-xs text-amber-200 max-[380px]:text-[11px] sm:text-sm"
                    style={{ animation: "marquee 30s linear infinite" }}
                  >
                    <span className="mx-6">✈️ <strong>Chardham Yatra 2026</strong> — Book now at ₹30,000 | 11N/12D</span>
                    <span className="mx-6">🏔️ <strong>Kashmir Special</strong> — Limited seats available!</span>
                    <span className="mx-6">🕌 <strong>Do Dham Yatra</strong> — ₹23,000 | 7N/8D</span>
                    <span className="mx-6">🌴 <strong>Tamil Nadu &amp; Kerala</strong> — ₹26,000 | 9N/10D</span>
                    <span className="mx-6">🏖️ <strong>Vizag Tour</strong> — Coastal getaway deal!</span>
                    <span className="mx-6">🌿 <strong>Sikkim</strong> — Northeast retreat at ₹12,000</span>
                    <span className="mx-6">🌄 <strong>Arunachal Pradesh</strong> — ₹24,000 | 7N/8D</span>
                    <span className="mx-6">📞 <strong>Cholo Jai Dure Tour &amp; Travels</strong> — Call us now!</span>
                    {/* duplicate for seamless loop */}
                    <span className="mx-6">✈️ <strong>Chardham Yatra 2026</strong> — Book now at ₹30,000 | 11N/12D</span>
                    <span className="mx-6">🏔️ <strong>Kashmir Special</strong> — Limited seats available!</span>
                    <span className="mx-6">🕌 <strong>Do Dham Yatra</strong> — ₹23,000 | 7N/8D</span>
                    <span className="mx-6">🌴 <strong>Tamil Nadu &amp; Kerala</strong> — ₹26,000 | 9N/10D</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/80 sm:mb-4 sm:px-4 sm:py-2 sm:text-sm sm:tracking-[0.3em]">
              <Plane className="h-3.5 w-3.5 text-amber-300 sm:h-4 sm:w-4" />
              Luxury Travel
            </p>
            <h1 className="text-[clamp(1.5rem,7vw,2.7rem)] font-bold leading-tight text-white sm:text-5xl md:text-7xl">
              CHOLO JAI DURE
            </h1>
            <h2 className="mt-2 text-[clamp(1rem,5vw,1.75rem)] font-semibold text-white/80 sm:mt-3 sm:text-3xl md:text-5xl">
              Tour &amp; Travels
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-xs text-white/70 sm:mt-5 sm:text-base md:text-xl">
              Elegant journeys curated for modern explorers — from sacred pilgrimages to scenic retreats.
            </p>
            <div className="mt-5 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
              <a
                href="#tours"
                className="flex w-full max-w-xs items-center justify-center rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 sm:w-auto sm:py-3.5"
              >
                View Packages
              </a>
              <a
                href="#contact"
                className="flex w-full max-w-xs items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm text-white transition hover:bg-white/20 sm:w-auto sm:py-3.5"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="tours" className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-12">
            <p className="text-sm uppercase tracking-[0.5em] text-amber-300">All Tours</p>
            <h2 className="mt-4 text-2xl font-bold sm:text-4xl">Curated destinations for every traveler</h2>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tours.map((tour) => (
              <div
                key={tour.title}
                className="group mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 p-4 shadow-2xl shadow-slate-950/20 transition duration-500 hover:-translate-y-1 hover:bg-slate-900/95 sm:max-w-none sm:rounded-4xl sm:p-6"
              >
                <div className="relative h-52 w-full overflow-hidden rounded-[1.25rem] shadow-lg sm:h-64 sm:rounded-[1.75rem] md:h-60 xl:h-64">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-4 sm:mt-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-amber-300 sm:text-sm sm:tracking-[0.3em]">{tour.subtitle}</p>
                  <h3 className="mt-2 text-xl font-bold sm:mt-3 sm:text-2xl">{tour.title}</h3>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-sm text-white/70 sm:text-base">{tour.price}</p>
                    <Link href={tour.packagePath} className="inline-flex rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-amber-300 sm:px-6 sm:py-3 sm:text-sm">
                      Explore More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              { title: "Andaman Islands", subtitle: "Tropical escape" },
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
              <div key={review.name} className="rounded-4xl border border-slate-200 bg-white p-8 shadow-xl">
                <p className="mb-6 text-slate-700">"{review.comment}"</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-amber-300/60"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{review.name}</p>
                    <p className="text-xs text-slate-500">{review.designation}</p>
                  </div>
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
            <h2 className="mt-4 text-2xl font-bold sm:text-4xl">Trusted by thousands of explorers</h2>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
            {[
              { value: "500+", label: "Happy Travelers" },
              { value: "50+", label: "Destinations" },
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

      <section className="py-16 bg-slate-900 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">FAQ</p>
            <h2 className="mt-4 text-2xl font-bold sm:text-4xl">Frequently asked questions</h2>
          </div>
          <div className="grid gap-4 sm:gap-6">
            {faqItems.map((faq) => (
              <div key={faq.question} className="rounded-4xl border border-white/10 bg-slate-950/90 p-6 sm:p-8">
                <h3 className="text-lg font-semibold sm:text-xl">{faq.question}</h3>
                <p className="mt-4 text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-black text-white/80">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="order-1">
              <h3 className="text-lg font-bold text-white">Quick Links</h3>
              <div className="mt-4 space-y-2.5 text-sm">
                <Link href="/#home" className="block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">Home</Link>
                <Link href="/tours" className="block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">Tours</Link>
                <Link href="/#tours" className="block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">Date of Journey</Link>
                <Link href="/contact" className="block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">Feedback</Link>
                <Link href="/#rules" className="block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">Rules &amp; Regulations</Link>
                <Link href="/contact" className="block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">Contact Us</Link>
              </div>
            </div>

            <div className="order-2">
              <h3 className="text-lg font-bold text-white">Services</h3>
              <div className="mt-4 space-y-2.5 text-sm">
                <p className="text-white/70">Group Tours</p>
                <p className="text-white/70">Customized Itinerary</p>
                <p className="text-white/70">Hotel Booking</p>
                <p className="text-white/70">Transport Assistance</p>
                <p className="text-white/70">Pilgrimage Packages</p>
              </div>
            </div>

            <div className="order-3 md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-bold text-white">Contact Us</h3>
              <div className="mt-4 space-y-2.5 text-sm text-white/70">
                <p>Zilla Parishad Market Complex, Midnapur</p>
                <p>Phone: 7501307766</p>
                <p>Phone: 7478167607</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-6 text-center text-sm text-white/70 sm:px-6">
          <p>© 2026 Cholo Jai Dure. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
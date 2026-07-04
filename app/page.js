
"use client";
import Link from "next/link";
import { MapPin, Phone, Star, Plane, Mountain, Landmark, ArrowRight } from "lucide-react";
import Navbar from "./components/Navbar";

const tourPackages = [
  {
    title: "Do Dham Yatra",
    subtitle: "3N / 4D",
    image: "/kedarnath.jpeg",
    price: "Starting ₹14,500",
    href: "/packages/do-dham-yatra",
  },
  {
    title: "Varanasi",
    subtitle: "9N / 10D",
    image: "/varanasi.jpeg",
    price: "Starting ₹28,000",
  },
  {
    title: "Gujarat",
    subtitle: "9N / 10D",
    image: "/varanasi.jpeg",
    price: "Starting ₹32,000",
    href: "/packages/gujarat"
  },
  {
    title: "Kashmir",
    subtitle: "7N / 8D",
    image: "/kashmir.jpeg",
    price: "Starting ₹34,000",
  },
  {
    title: "Tamil Nadu & Kerala",
    subtitle: "8N / 9D",
    image: "/tnk-pic.jpeg",
    price: "Starting ₹26,500",
  },
  {
    title: "North Bengal",
    subtitle: "2N / 3D",
    image: "/northbengal.jpeg",
    price: "Starting ₹9,500",
  },
  {
    title: "Rajasthan",
    subtitle: "7N / 8D",
    image: "/rajasthan.jpeg",
    price: "Starting ₹31,000",
  },
  
  {
    title: "Ladakh",
    subtitle: "10N / 11D",
    image: "/panggonglake.jpeg",
    price: "Starting ₹35,000",
  },

  {
    title: "Manali",
    subtitle: "4N / 5D",
    image: "/manali.jpeg",
    price: "Starting ₹35,000",
  },

  {
    title: "Spiti Valley",
    subtitle: "4N / 5D",
    image: "/spiti.jpeg",
    price: "Starting ₹35,000",
  }
];

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

export default function CholoJaiDureTours() {
  return (
    <div className="bg-slate-950 text-white">
      <Navbar />

      <section id="home" className="relative min-h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/travel-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/30 to-slate-950/90" />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-white/80">
              <Plane className="h-4 w-4 text-amber-300" />
              Luxury Travel
            </p>
            <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl">
              CHOLO JAI DURE 
            </h1>
             <h2 className="mt-4 text-3xl font-semibold text-white/80 sm:text-4xl md:text-5xl">
             Tour & Travels
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70 sm:text-xl">
              Elegant journeys curated for modern explorers — from sacred pilgrimages to scenic retreats.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#tours"
                className="rounded-full bg-amber-400 px-8 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
              >
                View Packages
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm text-white transition hover:bg-white/20"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="tours" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-amber-300">Featured Tours</p>
            <h2 className="mt-4 text-4xl font-bold">Curated destinations for every traveler</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {tourPackages.map((tour) => (
              <div
                key={tour.title}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/20 transition duration-500 hover:-translate-y-1 hover:bg-slate-900/95"
              >
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="h-72 w-full rounded-[1.75rem] object-cover shadow-lg"
                />
                <div className="mt-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-amber-300">{tour.subtitle}</p>
                  <h3 className="mt-3 text-2xl font-bold">{tour.title}</h3>
                  <p className="mt-4 text-white/70">{tour.price}</p>
                  <Link href={tour.href || "/packages/do-dham-yatra"} className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">
                    Explore More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about-us" className="py-24 bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Why Choose Cholo Jai Dure</p>
              <h2 className="mt-4 text-4xl font-bold">Travel with comfort, style, and trust</h2>
              <p className="mt-6 text-white/70">Our premium trips focus on personalised service, luxury stays, safe transport, and unforgettable local experiences for every itinerary.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Handpicked stays",
                "Expert guides",
                "Hassle-free planning",
                "24/7 traveler support",
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-6">
                  <p className="text-lg font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Popular Destinations</p>
            <h2 className="mt-4 text-4xl font-bold">Destinations loved by travelers</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Andaman Islands", subtitle: "Tropical escape" },
              { title: "Varanasi", subtitle: "Spiritual heritage" },
              { title: "Leh Ladakh", subtitle: "Adventure retreat" },
            ].map((destination) => (
              <div key={destination.title} className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl transition hover:-translate-y-1">
                <p className="text-amber-300">{destination.subtitle}</p>
                <h3 className="mt-4 text-2xl font-bold">{destination.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-100 text-slate-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Testimonials</p>
            <h2 className="mt-4 text-4xl font-bold">What travelers say</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              "Amazing experience, perfect planning and service.",
              "The guides were so helpful and the hotels were excellent.",
              "A luxurious trip with great attention to every detail.",
            ].map((review, index) => (
              <div key={index} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
                <p className="mb-6 text-slate-700">"{review}"</p>
                <p className="font-semibold">Happy Traveler</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Travel Statistics</p>
            <h2 className="mt-4 text-4xl font-bold">Trusted by thousands of explorers</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4 text-center">
            {[
              { value: "500+", label: "Happy Travelers" },
              { value: "50+", label: "Destinations" },
              { value: "100%", label: "Trusted Service" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-10">
                <p className="text-5xl font-bold text-amber-300">{stat.value}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">FAQ</p>
            <h2 className="mt-4 text-4xl font-bold">Frequently asked questions</h2>
          </div>
          <div className="grid gap-6">
            {faqItems.map((faq) => (
              <div key={faq.question} className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8">
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <p className="mt-4 text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Contact</p>
              <h2 className="mt-4 text-4xl font-bold">Ready to start your journey?</h2>
              <p className="mt-6 max-w-xl text-white/70">Reach out for personalized trip planning, group bookings, and premium travel support.</p>
              <div className="mt-8 space-y-4 text-white/80">
                <p className="flex items-center gap-3"><MapPin className="h-5 w-5" /> Zilla Parishad Market Complex, Midnapur</p>
                <p className="flex items-center gap-3"><Phone className="h-5 w-5" /> 7501307766</p>
                <p className="flex items-center gap-3"><Phone className="h-5 w-5" /> 7478167607</p>
              </div>
            </div>
            <form className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-900/80 p-10">
              <input placeholder="Your Name" className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-4 text-white outline-none" />
              <input placeholder="Phone Number" className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-4 text-white outline-none" />
              <input placeholder="Email Address" className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-4 text-white outline-none" />
              <textarea rows={5} placeholder="Your Message" className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-4 text-white outline-none" />
              <button className="w-full rounded-full bg-amber-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">Send Inquiry</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-black py-10 text-center text-white/70">
        <p>© 2026 Cholo Jai Dure. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

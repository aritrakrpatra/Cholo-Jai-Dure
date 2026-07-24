"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarHeart,
  CarFront,
  Compass,
  Globe2,
  HeartHandshake,
  Hotel,
  Landmark,
  MapPinned,
  Mountain,
  Phone,
  Plane,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const destinations = [
  "Ladakh",
  "Kashmir",
  "Himachal Pradesh",
  "Uttarakhand",
  "Uttar Pradesh",
  "Odisha",
  "Madhya Pradesh",
  "Tamil Nadu",
  "Kerala",
  "Assam",
  "Meghalaya",
];

const services = [
  {
    title: "Domestic Tour Packages",
    description: "Thoughtfully curated holidays across India with comfort-first planning.",
    icon: MapPinned,
  },
  {
    title: "International Tour Packages",
    description: "Seamless cross-border escapes crafted for memorable global adventures.",
    icon: Globe2,
  },
  {
    title: "Family Vacations",
    description: "Relaxed, kid-friendly itineraries that keep every member happy.",
    icon: Users,
  },
  {
    title: "Group Tours",
    description: "Well-managed shared experiences with easy coordination and strong support.",
    icon: Users,
  },
  {
    title: "Bengali Group Tours Across India",
    description: "Trusted group journeys with familiar comfort and excellent guidance.",
    icon: Landmark,
  },
  {
    title: "Honeymoon Packages",
    description: "Romantic getaways designed for intimate moments and picture-perfect memories.",
    icon: HeartHandshake,
  },
  {
    title: "Adventure Tours",
    description: "High-energy escapes that blend excitement, safety, and unforgettable scenery.",
    icon: Mountain,
  },
  {
    title: "Weekend Getaways",
    description: "Quick, refreshing breaks made easy with efficient planning and support.",
    icon: CalendarHeart,
  },
  {
    title: "Customized Holiday Packages",
    description: "Personalized plans tailored to your pace, budget, and travel style.",
    icon: Compass,
  },
  {
    title: "Hotel Bookings",
    description: "Comfortable stays through carefully selected accommodations for every trip.",
    icon: Hotel,
  },
  {
    title: "Transportation Arrangements",
    description: "Reliable transfers and travel support for a smooth, stress-free journey.",
    icon: CarFront,
  },
  {
    title: "Complete Travel Assistance",
    description: "End-to-end guidance that keeps your vacation beautifully simple and organized.",
    icon: ShieldCheck,
  },
];

const stats = [
  { value: 2024, suffix: "", label: "Founded" },
  { value: 4.8, suffix: "★", label: "Google Rating" },
  { value: 80, suffix: "+", label: "Positive Reviews" },
  { value: 100, suffix: "+", label: "Happy Travellers" },
  { value: 11, suffix: "+", label: "Destinations Covered" },
];

function AnimatedCounter({ value, suffix, label }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let animationFrame;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = value * eased;
      setDisplayValue(nextValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  const formattedValue =
    value % 1 === 0
      ? Math.round(displayValue)
      : displayValue.toFixed(1);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 text-center shadow-lg backdrop-blur-xl sm:p-6">
      <div className="text-3xl font-bold text-amber-500 sm:text-4xl">
        {formattedValue}
        {suffix}
      </div>
      <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">{label}</p>
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="theme-surface rounded-[28px] p-6 sm:p-8 lg:p-12"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-100/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Travel with confidence
              </span>
              <div className="space-y-4">
                <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                  CHOLO JAI DURE TOUR AND TRAVELS
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
                  Creating memorable journeys across India and beyond since 2024.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/packages"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                  aria-label="Explore packages"
                >
                  Explore Packages
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-500/40 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-amber-500 hover:bg-white/80 dark:bg-slate-950/40 dark:text-white"
                  aria-label="Contact CHOLO JAI DURE TOUR AND TRAVELS"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="theme-surface-strong rounded-[28px] p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-gradient-to-br from-amber-300/30 to-orange-400/10 p-5">
                  <MapPinned className="mb-3 h-9 w-9 text-amber-700" aria-hidden="true" />
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Trusted Grounded Roots</h2>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                    Based at Zilla Parishad, Midnapore, West Bengal.
                  </p>
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-sky-300/25 to-cyan-400/10 p-5">
                  <Plane className="mb-3 h-9 w-9 text-sky-700" aria-hidden="true" />
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Purpose-Built Journeys</h2>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                    Crafted to blend comfort, discovery, and peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="theme-surface rounded-[28px] p-6 sm:p-8 lg:p-10"
        >
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-300">Our Story</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">A passionate travel story built on trust</h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-slate-700 dark:text-slate-300">
            <p>
              Founded in 2024, CHOLO JAI DURE TOUR AND TRAVELS (CJD) was created with one simple vision—to make every journey memorable, comfortable, and filled with unforgettable experiences. Based at Zilla Parishad, Midnapore, West Bengal, we specialize in crafting thoughtfully planned tours that combine reliability, comfort, and authentic travel experiences.
            </p>
            <p>
              In a short span of time, we have earned the trust of hundreds of travellers, maintaining an impressive 4.8-star Google rating with 80–100 positive reviews. This reflects our commitment to quality service, transparent pricing, personalized assistance, and customer satisfaction.
            </p>
            <p>
              We have successfully operated tours across India&apos;s most breathtaking destinations, including:
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {destinations.map((destination) => (
                <span
                  key={destination}
                  className="rounded-full border border-amber-400/30 bg-gradient-to-r from-amber-100/80 to-white/60 px-4 py-2 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-md dark:border-amber-400/20 dark:from-amber-400/10 dark:to-slate-950/30 dark:text-slate-100"
                >
                  {destination}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="theme-surface rounded-[28px] p-6 sm:p-8 lg:p-10"
        >
          <div className="mb-6 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-300">What We Believe</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Every journey should be a lasting memory</h2>
          </div>
          <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
            At CHOLO JAI DURE TOUR AND TRAVELS, every trip is more than just a vacation—it is a collection of lifelong memories. Our experienced team focuses on personalized itineraries, dependable support, carefully selected accommodations, and hassle-free travel arrangements so our guests can simply relax and enjoy their journey.
          </p>
        </motion.section>

        <section className="grid gap-6 lg:grid-cols-2">
          {[
            {
              title: "Our Vision",
              content:
                "To become one of the most trusted travel companies in India by delivering exceptional service, authentic experiences, and outstanding value. We aim to inspire people to explore new places while making every trip safe, enjoyable, and memorable.",
              icon: Sparkles,
              gradient: "from-amber-300/25 via-orange-300/10 to-transparent",
            },
            {
              title: "Our Mission",
              content:
                "To provide professional, customer-focused travel services with carefully planned itineraries, dependable support, and personalized experiences that consistently exceed expectations.",
              icon: HeartHandshake,
              gradient: "from-sky-300/25 via-cyan-300/10 to-transparent",
            },
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                className="theme-surface group relative overflow-hidden rounded-[28px] p-6 sm:p-7"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90`} />
                <div className="relative space-y-4">
                  <div className="inline-flex rounded-2xl bg-white/60 p-3 text-amber-700 shadow-sm backdrop-blur-md dark:bg-slate-950/40 dark:text-amber-300">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{card.title}</h3>
                  <p className="text-base leading-8 text-slate-700 dark:text-slate-300">{card.content}</p>
                </div>
              </motion.article>
            );
          })}
        </section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="theme-surface rounded-[28px] p-6 sm:p-8 lg:p-10"
        >
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-300">Why Choose Us</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Travel solutions tailored for every kind of journey</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.03 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="group rounded-[24px] border border-white/10 bg-white/60 p-5 shadow-lg backdrop-blur-xl transition dark:bg-slate-950/35"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-amber-100/80 p-3 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{service.description}</p>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="theme-surface rounded-[28px] p-6 sm:p-8 lg:p-10"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="theme-surface rounded-[28px] p-6 sm:p-8 lg:p-10"
        >
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="inline-flex rounded-full bg-amber-100/80 p-3 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="max-w-4xl text-2xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Your journey begins here. Let&apos;s travel farther, discover more, and create unforgettable memories together with CHOLO JAI DURE TOUR AND TRAVELS.
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/packages"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                aria-label="Explore packages"
              >
                Explore Packages
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-500/40 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-amber-500 hover:bg-white/80 dark:bg-slate-950/40 dark:text-white"
                aria-label="Contact CHOLO JAI DURE TOUR AND TRAVELS"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Contact Us
              </Link>
            </div>
          </div>
        </motion.section>
      </section>
    </main>
  );
}

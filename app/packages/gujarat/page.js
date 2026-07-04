"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  Droplet,
  Gift,
  Heart,
  Hotel,
  Landmark,
  MapPin,
  Phone,
  Sparkles,
  Star,
  Truck,
  TreeDeciduous,
  User,
  Waves,
  XCircle,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";

const heroSlides = [
  {
    title: "Statue of Unity",
    image:
      "https://images.unsplash.com/photo-1598206654724-286b162d9ef2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Somnath Temple",
    image:
      "https://images.unsplash.com/photo-1549440147-3c15e45d6b76?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Dwarkadhish Temple",
    image:
      "https://images.unsplash.com/photo-1527304197807-b8c6b8a1131d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Gir National Park",
    image:
      "https://images.unsplash.com/photo-1519750157634-bfa9351708c2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Diu Beach",
    image:
      "https://images.unsplash.com/photo-1526030555395-4b6a4b2be296?auto=format&fit=crop&w=1400&q=80",
  },
];

const journeyDates = [
  { id: 1, label: "Batch 1 – 26 October 2026", date: "2026-10-26" },
  { id: 2, label: "Batch 2 – 16 November 2026", date: "2026-11-16" },
  { id: 3, label: "Batch 3 – 14 December 2026", date: "2026-12-14" },
];

const itinerary = [
  {
    day: "Day 1",
    title: "Vadodara",
    image:
      "https://images.unsplash.com/photo-1511525547934-2f20d2d8b156?auto=format&fit=crop&w=1200&q=80",
    points: ["Statue of Unity", "Aatapi Wonderland", "Ajwa Lake"],
  },
  {
    day: "Day 2",
    title: "Vadodara → Ahmedabad",
    image:
      "https://images.unsplash.com/photo-1494377121331-9229999cef4b?auto=format&fit=crop&w=1200&q=80",
    points: ["Sabarmati Ashram", "Adalaj Stepwell", "Akshardham Temple"],
  },
  {
    day: "Day 3",
    title: "Ahmedabad",
    image:
      "https://images.unsplash.com/photo-1527979809292-6aaed715a669?auto=format&fit=crop&w=1200&q=80",
    points: [
      "Sabarmati Riverfront",
      "Atal Foot Bridge",
      "Hutheesing Jain Temple",
      "Law Garden",
      "Swaminarayan Temple",
    ],
  },
  {
    day: "Day 4",
    title: "Ahmedabad → Bhavnagar",
    image:
      "https://images.unsplash.com/photo-1546286517-3d076293f5f5?auto=format&fit=crop&w=1200&q=80",
    points: ["Takhteshwar Temple", "Victoria Park", "Gaurishankar Lake"],
  },
  {
    day: "Day 5",
    title: "Bhavnagar → Gir",
    image:
      "https://images.unsplash.com/photo-1595247850422-45c7c3cf523f?auto=format&fit=crop&w=1200&q=80",
    points: ["Gir Jungle Safari", "Devalia Park"],
  },
  {
    day: "Day 6",
    title: "Gir → Diu → Somnath",
    image:
      "https://images.unsplash.com/photo-1511732353189-4f998c802abd?auto=format&fit=crop&w=1200&q=80",
    points: [
      "Diu Beach",
      "Nagoa Beach",
      "Diu Fort",
      "Somnath Temple",
      "Bhalka Tirth",
      "Triveni Sangam",
    ],
  },
  {
    day: "Day 7",
    title: "Somnath → Dwarka",
    image:
      "https://images.unsplash.com/photo-1513708925320-6d01899e8a3f?auto=format&fit=crop&w=1200&q=80",
    points: ["Dwarkadhish Temple", "Gomti Ghat"],
  },
  {
    day: "Day 8",
    title: "Bet Dwarka Excursion",
    image:
      "https://images.unsplash.com/photo-1549909561-1c4db6e8f5c5?auto=format&fit=crop&w=1200&q=80",
    points: ["Bet Dwarka", "Nageshwar Jyotirlinga", "Rukmini Mata Temple"],
  },
  {
    day: "Day 9",
    title: "Dwarka → Rajkot",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    points: ["Kaba Gandhi No Delo", "Watson Museum", "Race Course"],
  },
  {
    day: "Day 10",
    title: "Return Journey",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    points: ["Rajkot to Kharagpur", "End of Tour"],
  },
];

const highlights = [
  { title: "Statue of Unity", icon: Landmark },
  { title: "Gir National Park Safari", icon: TreeDeciduous },
  { title: "Somnath Jyotirlinga", icon: Sparkles },
  { title: "Dwarkadhish Temple", icon: MapPin },
  { title: "Diu Beaches", icon: Waves },
  { title: "Bengali Meals", icon: Heart },
  { title: "Comfortable Hotels", icon: Hotel },
  { title: "Professional Tour Guide", icon: User },
  { title: "Tempo Traveller", icon: Truck },
  { title: "Daily Water Bottle", icon: Droplet },
];

const includedItems = [
  "Pickup & Drop from Railway Station",
  "Tempo Traveller / Bus",
  "Standard Hotel Accommodation",
  "Breakfast",
  "Lunch",
  "Dinner (Bengali Meal)",
  "Travel Guide",
  "Complete Sightseeing",
  "1 Litre Water Bottle Daily",
];

const excludedItems = [
  "Airfare",
  "Train Tickets",
  "Journey Food",
  "Entry Tickets",
  "Boating",
  "Adventure Activities",
  "Personal Expenses",
  "Laundry",
  "Shopping",
  "Extra Meals",
  "Extra Water Bottles",
  "AC / Room Heater Charges",
];

const galleryItems = [
  { label: "Statue of Unity", src: "https://images.unsplash.com/photo-1598206654724-286b162d9ef2?auto=format&fit=crop&w=1200&q=80" },
  { label: "Sabarmati Ashram", src: "https://images.unsplash.com/photo-1508859527853-e1043ffea6b9?auto=format&fit=crop&w=1200&q=80" },
  { label: "Sabarmati Riverfront", src: "https://images.unsplash.com/photo-1548625149-30b17f73902e?auto=format&fit=crop&w=1200&q=80" },
  { label: "Gir National Park", src: "https://images.unsplash.com/photo-1527979809292-6aaed715a669?auto=format&fit=crop&w=1200&q=80" },
  { label: "Lions of Gir", src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80" },
  { label: "Diu Beach", src: "https://images.unsplash.com/photo-1526030555395-4b6a4b2be296?auto=format&fit=crop&w=1200&q=80" },
  { label: "Nagoa Beach", src: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=1200&q=80" },
  { label: "Somnath Temple", src: "https://images.unsplash.com/photo-1547036967-23da7d0cd3d9?auto=format&fit=crop&w=1200&q=80" },
  { label: "Dwarkadhish Temple", src: "https://images.unsplash.com/photo-1519005308646-a9b3301c6e16?auto=format&fit=crop&w=1200&q=80" },
  { label: "Bet Dwarka", src: "https://images.unsplash.com/photo-1502951297867-6f55f456c5f6?auto=format&fit=crop&w=1200&q=80" },
  { label: "Nageshwar Temple", src: "https://images.unsplash.com/photo-1483741908861-03744efa8d22?auto=format&fit=crop&w=1200&q=80" },
  { label: "Rukmini Temple", src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80" },
  { label: "Watson Museum", src: "https://images.unsplash.com/photo-1578898887878-0351bf4cb5a1?auto=format&fit=crop&w=1200&q=80" },
  { label: "Ajwa Lake", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" },
];

const faqItems = [
  {
    question: "Is Gir Safari included?",
    answer:
      "Yes, the package includes a guided Gir Jungle Safari and Devalia Park entry as part of the itinerary.",
  },
  {
    question: "Can I select my preferred seat?",
    answer:
      "Seat selection is available during booking. Please confirm your preference with our booking team.",
  },
  {
    question: "Are Bengali meals available every day?",
    answer:
      "Absolutely. The itinerary includes Bengali meals throughout the journey for a comfortable travel experience.",
  },
  {
    question: "Is the package suitable for senior citizens?",
    answer:
      "Absolutely. The itinerary is paced for comfort and we arrange convenient accommodations and support for senior travelers.",
  },
  {
    question: "Are temple entry tickets included?",
    answer:
      "Temple entry tickets are not included unless specifically noted. We can assist with ticket arrangements on request.",
  },
  {
    question: "What should I carry for the trip?",
    answer:
      "Carry original ID proof, comfortable clothing, personal medications, sunscreen, and a small daypack.",
  },
];

const reviews = [
  {
    name: "Riya Sen",
    comment:
      "The Gujrat tour felt luxurious at every step — the itinerary was rich, the guide was exceptional, and every stay was peaceful.",
    rating: 5,
  },
  {
    name: "Anirban Das",
    comment:
      "From Somnath to Diu, the travel experience was seamless. The added Bengali meals made the journey feel like home.",
    rating: 5,
  },
  {
    name: "Shreya Mukherjee",
    comment:
      "The premium itinerary, modern transport, and scenic route made this one of our best family trips ever.",
    rating: 5,
  },
];

const infoCards = [
  "Last Booking Date: 30 June 2026",
  "Booking Amount: ₹5,000 per person",
  "Seat Selection Available During Booking",
  "Carry Original ID Proof",
  "Wear Comfortable Clothing",
  "Follow Guide Instructions",
  "Tour Operates in All Weather Conditions",
];

function formatDisplayDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date;
}

export default function GujratExplorePage() {
  const [selectedDate, setSelectedDate] = useState(journeyDates[0].date);
  const [activeFaq, setActiveFaq] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setHeroIndex((current) => (current + 1) % heroSlides.length),
      5500,
    );
    return () => clearInterval(interval);
  }, []);

  const dynamicItinerary = useMemo(
    () =>
      itinerary.map((item, index) => ({
        ...item,
        date: formatDisplayDate(addDays(selectedDate, index)),
      })),
    [selectedDate],
  );

  return (
    <>
      <Navbar />
      <div className="bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/85" />
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.title}
            initial={{ opacity: index === heroIndex ? 1 : 0 }}
            animate={{ opacity: index === heroIndex ? 1 : 0 }}
            transition={{ duration: 1.3 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.35), rgba(15,23,42,0.92)), url('${slide.image}')`,
            }}
          />
        ))}

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="grid gap-10 lg:grid-cols-[1.65fr_0.95fr] lg:items-end">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="space-y-6">
              <span className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-amber-200">GUJRAT 9 NIGHTS & 10 DAYS</span>
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">Explore Gujrat&apos;s Royal Temples, Wildlife & Coastal Wonders</h1>
              <p className="max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">A premium journey through Gujrat&apos;s most iconic heritage, wildlife, and beach destinations with luxury comforts and immersive local experiences.</p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="rounded-full bg-amber-400/10 px-5 py-3 text-lg font-semibold text-amber-200 ring-1 ring-amber-300/20">₹32,000 per person</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80">9 Nights · 10 Days · Premium Inclusions</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="#booking" className="inline-flex items-center justify-center rounded-full bg-amber-400 px-7 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">Book Now</a>
                <a href="https://wa.me/917501307766" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 px-7 py-4 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/20">WhatsApp Inquiry</a>
                <a href="tel:7501307766" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10">Call Now</a>
              </div>
            </motion.div>

            <motion.aside initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="rounded-[2rem] border border-white/10 bg-slate-900/85 p-8 shadow-2xl backdrop-blur-xl">
              <div className="space-y-6">
                <div className="rounded-[2rem] border border-amber-300/10 bg-slate-950/90 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Journey Date Selection</p>
                  <div className="mt-5 space-y-3">
                    {journeyDates.map((option) => (
                      <button key={option.id} type="button" onClick={() => setSelectedDate(option.date)} className={`w-full rounded-3xl border px-5 py-4 text-left text-sm font-medium transition ${selectedDate === option.date ? "border-amber-300 bg-amber-300/20 text-amber-100" : "border-white/10 bg-slate-950/80 text-white/80 hover:border-white/20 hover:text-white"}`}>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Premium Inclusions</p>
                  <div className="mt-4 space-y-3 text-white/80">
                    <p className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-4 w-4 text-amber-300" /> Bengali meals every day</p>
                    <p className="flex items-center gap-3 text-sm"><Hotel className="h-4 w-4 text-amber-300" /> Comfortable hotels & resorts</p>
                    <p className="flex items-center gap-3 text-sm"><Truck className="h-4 w-4 text-amber-300" /> Tempo Traveller transport</p>
                  </div>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Travel Concierge</p>
                  <p className="mt-4 text-2xl font-semibold text-white">Premium support from booking to return.</p>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-16">
        <section className="mb-24">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Tour Overview</p>
              <h2 className="mt-4 text-4xl font-bold text-white">A rich Gujrat journey crafted for discerning travelers</h2>
              <p className="mt-6 max-w-3xl text-lg leading-9 text-white/70">Explore the rich culture, spirituality, wildlife, beaches, and heritage of Gujrat on this carefully designed 9 Nights & 10 Days tour. Visit the world&apos;s tallest statue, sacred Jyotirlingas, magnificent temples, historic cities, Gir National Park, and the beautiful beaches of Diu while enjoying comfortable accommodation, Bengali meals, and guided sightseeing.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[{ label: "Luxury coach travel", icon: Truck }, { label: "Curated local experiences", icon: Sparkles }, { label: "Handpicked premium stays", icon: Hotel }, { label: "Expert guide support", icon: User }].map((item) => (
                <div key={item.label} className="rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-6">
                  <item.icon className="h-6 w-6 text-amber-300" />
                  <p className="mt-4 text-lg font-semibold text-white">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Itinerary Timeline</p>
            <h2 className="mt-4 text-4xl font-bold text-white">Your journey day by day</h2>
          </div>
          <div className="space-y-10">
            {dynamicItinerary.map((item, index) => (
              <motion.div key={item.day} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: index * 0.05 }} className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 lg:grid-cols-[220px_1fr] lg:items-start">
                <div className="space-y-4">
                  <div className="inline-flex rounded-[2rem] bg-amber-300/10 px-4 py-3 text-sm uppercase tracking-[0.35em] text-amber-200">{item.day}</div>
                  <p className="text-sm uppercase tracking-[0.25em] text-white/60">{item.date}</p>
                  <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {item.points.slice(0, 3).map((point) => (
                      <span key={point} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">{point}</span>
                    ))}
                  </div>
                </div>
                <div className="overflow-hidden rounded-[1.75rem] bg-slate-950/60">
                  <img src={item.image} alt={item.title} className="h-72 w-full object-cover transition duration-500 hover:scale-105" loading="lazy" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Package Highlights</p>
              <h2 className="mt-4 text-4xl font-bold text-white">Luxury experiences woven through every destination</h2>
              <p className="mt-6 text-white/70">Enjoy a premium travel rhythm from the landmark moments at Statue of Unity to the peaceful beaches of Diu and sacred temples of Dwarka.</p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-6 transition hover:-translate-y-1 hover:border-amber-300/40">
                      <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-amber-300/10 text-amber-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-5 text-lg font-semibold text-white">{item.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="rounded-[2rem] border border-amber-300/10 bg-slate-950/90 p-8 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Premium Comfort</p>
                  <h3 className="mt-3 text-3xl font-bold text-white">Stay, travel and dine in luxury.</h3>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/85 p-5"><p className="text-sm uppercase tracking-[0.3em] text-white/60">Bengali Meals</p><p className="mt-3 text-white/80">Daily curated flavors with comfort for every traveler.</p></div>
                  <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/85 p-5"><p className="text-sm uppercase tracking-[0.3em] text-white/60">Travel & Support</p><p className="mt-3 text-white/80">Guided sightseeing with professional support and smooth transfers.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-10">
          <div>
            <div className="mb-10">
              <p className="text-sm uppercase tracking-[0.4em] text-amber-300">What&apos;s Included</p>
              <h2 className="mt-4 text-4xl font-bold text-white">Every detail covered</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {includedItems.map((item) => (
                <div key={item} className="rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-6">
                  <div className="flex items-center gap-3 text-amber-300"><CheckCircle2 className="h-5 w-5" /><span className="font-semibold text-white">Included</span></div>
                  <p className="mt-4 text-white/75">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="mb-10">
              <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Not Included</p>
              <h2 className="mt-4 text-4xl font-bold text-white">Plan ahead for optional extras</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {excludedItems.map((item) => (
                <div key={item} className="rounded-[1.75rem] border border-rose-500/10 bg-rose-500/5 p-6 text-rose-100">
                  <div className="flex items-center gap-3 text-rose-300"><XCircle className="h-5 w-5" /><span className="font-semibold">Not Included</span></div>
                  <p className="mt-4 text-sm text-rose-100/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Destination Gallery</p>
            <h2 className="mt-4 text-4xl font-bold text-white">Gujrat sights in every frame</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryItems.map((item) => (
              <button key={item.label} type="button" onClick={() => setLightbox(item)} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 transition hover:-translate-y-1">
                <img src={item.src} alt={item.label} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                <div className="relative bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent px-4 pb-4 pt-6 text-left">
                  <p className="text-lg font-semibold text-white">{item.label}</p>
                </div>
              </button>
            ))}
          </div>
          {lightbox && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-6 backdrop-blur-lg">
              <button type="button" onClick={() => setLightbox(null)} className="absolute right-6 top-6 rounded-full border border-white/20 bg-slate-950/80 px-4 py-2 text-sm text-white transition hover:bg-slate-900">Close</button>
              <div className="max-h-full w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-2xl">
                <img src={lightbox.src} alt={lightbox.label} className="h-[75vh] w-full object-cover" />
                <div className="border-t border-white/10 p-6 text-white">
                  <h3 className="text-2xl font-semibold">{lightbox.label}</h3>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="mb-24 rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Map Route</p>
              <h2 className="mt-4 text-4xl font-bold text-white">Visualize the Gujrat route</h2>
              <p className="mt-4 max-w-3xl text-white/70">Follow the elegant travel path from Vadodara to Rajkot, visiting Ahmedabad, Bhavnagar, Gir, Diu, Somnath, and Dwarka along the way.</p>
              <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950">
                <iframe title="Gujrat travel route" src="https://www.google.com/maps?q=Vadodara+Ahmedabad+Bhavnagar+Gir+Diu+Somnath+Dwarka+Rajkot&output=embed" className="h-96 w-full border-0" loading="lazy" />
              </div>
            </div>
            <div className="grid gap-4">
              {infoCards.map((info) => (
                <div key={info} className="rounded-[1.75rem] border border-white/10 bg-slate-950/85 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Important</p>
                  <p className="mt-3 text-white/80">{info}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-24 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <div className="mb-10">
              <p className="text-sm uppercase tracking-[0.4em] text-amber-300">FAQs</p>
              <h2 className="mt-4 text-4xl font-bold text-white">Questions travelers ask most</h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={item.question} className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90">
                  <button type="button" onClick={() => setActiveFaq(activeFaq === index ? null : index)} className="flex w-full items-center justify-between gap-4 p-6 text-left text-white">
                    <span className="text-lg font-semibold">{item.question}</span>
                    <span className="text-2xl text-amber-300">{activeFaq === index ? "−" : "+"}</span>
                  </button>
                  {activeFaq === index && <div className="border-t border-white/10 bg-slate-950/85 p-6 text-white/80">{item.answer}</div>}
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-amber-300/10 bg-slate-950/90 p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Customer Stories</p>
            <h3 className="mt-4 text-3xl font-bold text-white">What premium travelers say</h3>
            <div className="mt-8 space-y-6">
              {reviews.map((review) => (
                <div key={review.name} className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6">
                  <div className="flex items-center gap-2 text-amber-300">
                    {Array.from({ length: review.rating }).map((_, idx) => <Star key={idx} className="h-4 w-4" />)}
                  </div>
                  <p className="mt-4 text-white/80">“{review.comment}”</p>
                  <p className="mt-4 text-sm font-semibold text-white">{review.name}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section id="booking" className="mb-24 rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Booking & Pricing</p>
              <h2 className="mt-3 text-4xl font-bold text-white">Reserve your Gujrat luxury trip</h2>
              <p className="mt-4 max-w-3xl text-white/70">Secure your seat with just ₹5,000 and pay the balance later. Our team will confirm departures, seats, and room preferences with you.</p>
            </div>
            <div className="space-y-4 rounded-[2rem] bg-slate-950/90 p-8 shadow-xl">
              <div className="rounded-[1.75rem] bg-gradient-to-r from-amber-400/15 to-amber-300/10 p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-amber-200">Tour Price</p>
                <p className="mt-3 text-4xl font-semibold text-white">₹32,000 per person</p>
                <p className="mt-2 text-sm text-white/70">Booking Amount ₹5,000</p>
              </div>
              <a href="tel:7501307766" className="block rounded-full bg-white px-6 py-4 text-center text-sm font-semibold text-slate-950 transition hover:bg-amber-300">Call Now</a>
              <a href="https://wa.me/917501307766" target="_blank" rel="noreferrer" className="block rounded-full bg-emerald-400 px-6 py-4 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">WhatsApp Inquiry</a>
              <Link href="#booking" className="block rounded-full border border-amber-300 px-6 py-4 text-center text-sm font-semibold text-amber-200 transition hover:bg-amber-300/10">Book Now</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/95 py-12 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center sm:text-left">
          <p className="text-xl font-semibold">Cholo Jai Dure Tour & Travels</p>
          <p className="mt-4 text-white/70">Zilla Parishad Market Complex, Midnapur, Paschim Medinipur</p>
          <div className="mt-4 flex flex-col items-center justify-center gap-2 text-sm text-white/80 sm:flex-row sm:justify-center">
            <a href="tel:7501307766" className="hover:text-white">📞 7501307766</a>
            <a href="tel:7478167607" className="hover:text-white">📞 7478167607</a>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

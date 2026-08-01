"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Phone, ArrowRight, MapPin, Plane, Heart, Sparkles } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import { useTheme } from "@/app/context/ThemeContext";

const highlights = [
  "Pickup & Drop-off from Station to Station",
  "Tempo Traveller / Bus Transportation",
  "Standard Hotel Accommodation (Non-AC)",
  "Daily Breakfast, Lunch & Dinner",
  "Professional Travel Guide",
  "Complete Sightseeing as per Itinerary",
  "1 Litre Water Bottle Per Person Daily",
];

const itinerary = [
  {
    day: "Day 1",
    title: "Rishikesh",
    date: "09/10/2027",
    points: [
      "Arrival and journey to Rishikesh",
      "Attend the famous Ganga Aarti on the banks of the Ganges",
      "Evening leisure and overnight stay",
    ],
  },
  {
    day: "Day 2",
    title: "Joshimath",
    date: "10/10/2027",
    points: [
      "Scenic drive through the Himalayas",
      "Visit Dev Prayag, Karn Prayag, Narasimha Temple",
      "Overnight stay in Joshimath",
    ],
  },
  {
    day: "Day 3",
    title: "Badrinath Dham & Mana Village",
    date: "11/10/2027",
    points: [
      "Darshan at Badrinath Dham",
      "Explore Mana Village",
      "Visit Saraswati River, Panch Pandav Murti, Nand Prayag, Vishnu Prayag",
    ],
  },
  {
    day: "Day 4",
    title: "Guptkashi",
    date: "12/10/2026",
    points: [
      "Travel to Guptkashi",
      "Visit Rudra Prayag",
      "Overnight stay",
    ],
  },
  {
    day: "Day 5",
    title: "Kedarnath Dham",
    date: "13/10/2026",
    points: [
      "Visit Dhari Devi Temple, Kedarnath Dham, Kaal Bhairav Temple",
      "Spiritual activities and darshan",
      "Overnight stay",
    ],
  },
  {
    day: "Day 6",
    title: "Guptkashi",
    date: "14/10/2026",
    points: [
      "Rest and relaxation day",
      "Explore local surroundings",
      "Overnight stay",
    ],
  },
  {
    day: "Day 7",
    title: "Haridwar",
    date: "15/10/2026",
    points: [
      "Visit Har Ki Pauri",
      "Attend the world-famous Ganga Aarti",
      "Shopping and local sightseeing",
      "Overnight stay",
    ],
  },
  {
    day: "Day 8",
    title: "Return Journey",
    date: "16/10/2026",
    points: [
      "Departure for Delhi",
      "Drop at Railway Station",
      "End of the sacred journey",
    ],
  },
];

const destinations = [
  { image: "/kedarnath.jpeg" },
  { image: "/varanasi.jpeg" },
  { image: "/house-boat.jpeg" },
  { image: "/group2.jpeg" },
  { image: "/group3.jpeg" },
  { image: "/group4.jpeg" },
];

const journeyDates = [
  { id: 1, date: "2027-10-08", label: "October 08 - 15, 2027" },
  { id: 2, date: "2027-11-08", label: "November 08 - 15, 2027" },
  { id: 3, date: "2027-12-08", label: "December 08 - 15, 2027" },
];

const defaultSelectedDate = journeyDates[0].date;

function formatDisplayDate(date) {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function addDays(dateString, days) {
  const date = new Date(dateString);
  const next = new Date(date);
  next.setDate(date.getDate() + days);
  return next;
}

export default function DoDhamYatraPage() {
  const { resolvedTheme } = useTheme();
  const isLightTheme = resolvedTheme === "light";
  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate);

  const dynamicItinerary = useMemo(() => {
    return itinerary.map((item, index) => ({
      ...item,
      date: formatDisplayDate(addDays(selectedDate, index)),
    }));
  }, [selectedDate]);

  return (
    <>
      <Navbar />
      <div className={isLightTheme ? "bg-[linear-gradient(135deg,#f8f5ec_0%,#fffdf9_100%)] text-slate-900" : "bg-slate-950 text-white"}>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(15,23,42,0.45), rgba(15,23,42,0.92)), url('/kedarnath.jpeg')",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-16 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-[1.65fr_0.95fr] lg:items-end">
            <div className="space-y-4">
              <span className={`inline-flex rounded-full border px-4 py-2 text-sm uppercase tracking-[0.35em] ${isLightTheme ? "border-amber-500/30 bg-amber-100 text-amber-700" : "border-amber-300/30 bg-amber-300/10 text-amber-200"}`}>DO DHAM YATRA</span>
              <p className={`max-w-3xl text-base leading-7 sm:text-lg sm:leading-8 md:text-xl ${isLightTheme ? "text-slate-700" : "text-white/80"}`}>A premium Himalayan pilgrimage from Rishikesh to Kedarnath and Badrinath with guided darshan, smooth travel, and carefully planned stays.</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full px-4 py-2 text-base font-semibold ring-1 sm:px-5 sm:py-3 sm:text-lg ${isLightTheme ? "bg-amber-100 text-amber-700 ring-amber-200" : "bg-amber-400/10 text-amber-200 ring-amber-300/20"}`}>₹23,000 per person</span>
                <span className={`rounded-full border px-4 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm ${isLightTheme ? "border-slate-300 bg-white/80 text-slate-700" : "border-white/10 bg-white/5 text-white/80"}`}>7 Nights · 8 Days · Pilgrimage Special</span>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                <a href="/contact" className="flex items-center justify-center rounded-full bg-amber-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 sm:px-7 sm:py-4">Book Now</a>
                <a href="https://wa.me/917478167607" target="_blank" rel="noreferrer" className={`flex items-center justify-center rounded-full border px-6 py-3.5 text-sm font-semibold transition sm:px-7 sm:py-4 ${isLightTheme ? "border-emerald-500/30 bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "border-emerald-400/40 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/20"}`}>WhatsApp Inquiry</a>
                <a href="tel:917478167607" className={`flex items-center justify-center rounded-full border px-6 py-3.5 text-sm font-semibold transition sm:px-7 sm:py-4 ${isLightTheme ? "border-slate-300 bg-white/80 text-slate-700 hover:bg-white" : "border-white/10 bg-white/5 text-white transition hover:bg-white/10"}`}>Call Now</a>
              </div>
            </div>

            <aside className={`rounded-4xl border p-4 shadow-2xl backdrop-blur-xl sm:p-8 ${isLightTheme ? "border-slate-200 bg-white/80" : "border-white/10 bg-slate-900/85"}`}>
              <div className="space-y-4">
                <div className={`rounded-4xl border p-5 ${isLightTheme ? "border-amber-200 bg-amber-50/80" : "border-amber-300/10 bg-slate-950/90"}`}>
                  <p className={`text-sm uppercase tracking-[0.35em] ${isLightTheme ? "text-amber-700" : "text-amber-300"}`}>Journey Date Selection</p>
                  <div className="mt-5 space-y-3">
                    {journeyDates.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedDate(option.date)}
                        className={`w-full rounded-3xl border px-5 py-4 text-left text-sm font-medium transition ${selectedDate === option.date ? (isLightTheme ? "border-amber-400 bg-amber-100 text-amber-800" : "border-amber-300 bg-amber-300/20 text-amber-100") : (isLightTheme ? "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900" : "border-white/10 bg-slate-950/80 text-white/80 hover:border-white/20 hover:text-white")}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={`rounded-4xl border p-6 ${isLightTheme ? "border-slate-200 bg-white/90" : "border-white/10 bg-slate-950/90"}`}>
                  <p className={`text-sm uppercase tracking-[0.35em] ${isLightTheme ? "text-amber-700" : "text-amber-300"}`}>Special Inclusions</p>
                  <div className={`mt-4 space-y-3 ${isLightTheme ? "text-slate-700" : "text-white/80"}`}>
                    <p className="flex items-center gap-3 text-sm"><Heart className={`h-4 w-4 ${isLightTheme ? "text-amber-600" : "text-amber-300"}`} /> Daily Bengali vegetarian meals</p>
                    <p className="flex items-center gap-3 text-sm"><Plane className={`h-4 w-4 ${isLightTheme ? "text-amber-600" : "text-amber-300"}`} /> Guided travel support</p>
                  </div>
                </div>
                <div className={`rounded-4xl border p-5 ${isLightTheme ? "border-slate-200 bg-white/90" : "border-white/10 bg-slate-950/90"}`}>
                  <p className={`text-sm uppercase tracking-[0.35em] ${isLightTheme ? "text-amber-700" : "text-amber-300"}`}>Travel Concierge</p>
                  <p className={`mt-4 text-2xl font-semibold ${isLightTheme ? "text-slate-900" : "text-white"}`}>Sacred journey planning with full support.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>


      <section className={`py-10 sm:py-14 ${isLightTheme ? "bg-white/70" : "bg-slate-950/95"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className={`text-sm uppercase tracking-[0.4em] ${isLightTheme ? "text-amber-700" : "text-amber-300"}`}>Itinerary Timeline</p>
            <h2 className={`mt-4 text-2xl font-bold sm:text-4xl ${isLightTheme ? "text-slate-900" : "text-white"}`}>Your sacred journey day by day</h2>
            <p className={`mx-auto mt-5 max-w-3xl text-base leading-8 sm:text-lg ${isLightTheme ? "text-slate-700" : "text-white/70"}`}>
              Follow the route from Rishikesh to the Himalayan shrines with carefully paced travel, darshan planning, and overnight stays designed for comfort.
            </p>
          </div>
          <div className="space-y-10">
            {dynamicItinerary.map((item) => (
              <div key={item.day} className={`grid gap-6 rounded-4xl border p-8 lg:grid-cols-[140px_1fr] lg:items-start ${isLightTheme ? "border-slate-200 bg-white/90" : "border-white/10 bg-slate-900/90"}`}>
                <div className={`rounded-3xl p-4 text-center ${isLightTheme ? "bg-amber-50" : "bg-slate-950/80"}`}>
                  <p className={`text-xs uppercase tracking-[0.35em] ${isLightTheme ? "text-amber-700" : "text-amber-300"}`}>{item.day}</p>
                  <p className={`mt-2 text-lg font-semibold ${isLightTheme ? "text-slate-900" : "text-white"}`}>{item.date}</p>
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${isLightTheme ? "text-slate-900" : "text-white"}`}>{item.title}</h3>
                  <ul className={`mt-3 space-y-2 ${isLightTheme ? "text-slate-700" : "text-white/70"}`}>
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-7">
                        <span className={`mt-2 h-1.5 w-1.5 rounded-full shrink-0 ${isLightTheme ? "bg-amber-600" : "bg-amber-300"}`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`rounded-4xl border p-5 shadow-2xl sm:p-8 lg:p-10 ${isLightTheme ? "border-slate-200 bg-white/90" : "border-white/10 bg-slate-900/90"}`}>
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-10">
              <div>
                <h2 className={`text-xl font-bold sm:text-2xl ${isLightTheme ? "text-slate-900" : "text-white"}`}>Inclusions</h2>
                <ul className={`mt-4 space-y-2 text-sm ${isLightTheme ? "text-slate-700" : "text-white/80"}`}>
                  {highlights.map((item) => (
                    <li key={item} className={`flex items-start gap-2 rounded-2xl px-3 py-2 ${isLightTheme ? "bg-amber-50" : "bg-slate-950/80"}`}>
                      <span className={`mt-1 h-2 w-2 rounded-full ${isLightTheme ? "bg-emerald-500" : "bg-emerald-300"}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className={`text-xl font-bold sm:text-2xl ${isLightTheme ? "text-slate-900" : "text-white"}`}>Exclusions</h2>
                <ul className={`mt-4 space-y-2 text-sm ${isLightTheme ? "text-slate-700" : "text-white/80"}`}>
                  {[
                    "Room Heater / Air Conditioner Charges",
                    "Airfare & Train Tickets",
                    "Journey Food During Travel",
                    "Entry Fees & Monument Tickets",
                    "Boating & Adventure Activities",
                    "Personal Expenses (Laundry, Shopping, etc.)",
                    "Extra Meals & Additional Water Bottles",
                  ].map((item) => (
                    <li key={item} className={`flex items-start gap-2 rounded-2xl px-3 py-2 ${isLightTheme ? "bg-rose-50" : "bg-slate-950/80"}`}>
                      <span className={`mt-1 h-2 w-2 rounded-full ${isLightTheme ? "bg-rose-500" : "bg-red-400"}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`rounded-3xl border p-5 shadow-2xl sm:p-8 lg:p-10 ${isLightTheme ? "border-slate-200 bg-white/90" : "border-white/10 bg-slate-900/90"}`}>
            <h2 className={`text-2xl font-bold sm:text-3xl ${isLightTheme ? "text-slate-900" : "text-white"}`}>Gallery</h2>
            <div className="mt-6 grid gap-3 grid-cols-2 sm:mt-8 sm:gap-4 lg:grid-cols-4">
              {destinations.slice(0, 4).map((destination, index) => (
                <div key={destination.image} className={`overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] ${isLightTheme ? "bg-slate-100" : "bg-white/5"}`}>
                  <Image
                    src={destination.image}
                    alt={`Do Dham gallery ${index + 1}`}
                    width={800}
                    height={1000}
                    className="h-36 w-full object-cover transition duration-500 hover:scale-105 sm:h-52 lg:h-64"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`py-10 sm:py-12 ${isLightTheme ? "bg-white/70" : "bg-slate-900/80"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <div className={`rounded-3xl border p-5 shadow-2xl sm:p-8 lg:p-10 ${isLightTheme ? "border-slate-200 bg-white/90" : "border-white/10 bg-slate-950/90"}`}>
              <h2 className={`text-2xl font-bold sm:text-3xl ${isLightTheme ? "text-slate-900" : "text-white"}`}>Important Information</h2>
              <div className={`mt-6 space-y-4 ${isLightTheme ? "text-slate-700" : "text-white/80"}`}>
                <p><span className={`font-semibold ${isLightTheme ? "text-slate-900" : "text-white"}`}>Last Date of Booking:</span> 30 June 2026</p>
                <p><span className={`font-semibold ${isLightTheme ? "text-slate-900" : "text-white"}`}>Booking Amount:</span> ₹5,000 per person</p>
                <p><span className={`font-semibold ${isLightTheme ? "text-slate-900" : "text-white"}`}>Tempo Traveller Seat Selection:</span> Available at booking time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={`border-t py-10 text-center text-sm ${isLightTheme ? "border-slate-200 bg-white/80 text-slate-600" : "border-white/10 bg-slate-950/90 text-white/70"}`}>
        <p>© 2026 Cholo Jai Dure. All Rights Reserved.</p>
      </footer>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Phone, ArrowRight, MapPin, Star, Plane, Heart, Sparkles, Hotel } from "lucide-react";
import Navbar from "@/app/components/Navbar";

const highlights = [
  "Pickup & Drop-off from Station to Station",
  "Tempo Traveller / Bus Transportation",
  "Standard Hotel Accommodation (Non-AC)",
  "Daily Breakfast, Lunch & Dinner",
  "Professional Travel Guide",
  "Complete Sightseeing as per Itinerary",
  "1 Litre Water Bottle Per Person Daily",
];

const faqs = [
  {
    question: "Can I customize the tour duration?",
    answer: "Yes, get in touch with us and we can customize the itinerary according to your travel needs.",
  },
  {
    question: "Is the package price per person?",
    answer: "Yes, ₹23,000 is the cost per person for the standard package.",
  },
  {
    question: "Is the trip safe for first-time pilgrims?",
    answer: "Absolutely. We provide experienced guides, safe transport, and comfortable stay arrangements.",
  },
];

const itinerary = [
  {
    day: "Day 1",
    title: "Rishikesh",
    date: "09/10/2027",
    hotel: "Hotel Ganga Valley Resort",
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
    hotel: "Hotel Himalayas",
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
    hotel: "Hotel Badrinath Inn",
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
    hotel: "Hotel Guptkashi Palace",
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
    hotel: "Hotel Kedarnath Retreat",
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
    hotel: "Hotel Guptkashi Palace",
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
    hotel: "Hotel Ghat View Haridwar",
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
    hotel: "No Stay",
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
      <div className="bg-slate-950 text-white">
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(244,215,94,0.15),_transparent_25%),linear-gradient(180deg,_rgba(15,23,42,1),_rgba(15,23,42,0.9))]">
        <div className="absolute inset-0 bg-[url('/kedarnath.jpeg')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-slate-950/90" />
        <header className="relative z-10 border-b border-white/10 px-6 py-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
            <Link href="/" className="text-lg font-semibold text-white">
              Cholo Jai Dure
            </Link>
            <nav className="flex items-center gap-4 text-sm text-white/80">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/packages/do-dham-yatra" className="text-amber-300">Do Dham Yatra</Link>
            </nav>
          </div>
        </header>

        <main className="relative z-10 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Package Overview</p>
                <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
                  DO DHAM YATRA
                </h1>
                <p className="mt-6 max-w-3xl text-lg text-white/70">
                  Experience a premium Himalayan pilgrimage from Rishikesh to Kedarnath and Badrinath with expert guidance, comfortable travel, and sacred spiritual moments.
                </p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Duration</p>
                    <p className="mt-2 text-2xl font-semibold">7 Nights & 8 Days</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Select Journey Date</p>
                    <div className="mt-4 grid gap-3">
                      {journeyDates.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedDate(option.date)}
                          className={`rounded-3xl border px-4 py-3 text-left text-sm font-medium transition ${
                            selectedDate === option.date
                              ? "border-amber-300 bg-amber-300/20 text-amber-200"
                              : "border-white/10 bg-slate-900/80 text-white/80 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-white/70">Choose a journey date and the itinerary will update automatically.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Cost</p>
                    <p className="mt-2 text-2xl font-semibold">₹23,000 per person</p>
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <a href="#booking" className="block rounded-full bg-amber-400 px-6 py-4 text-center font-semibold text-slate-950 transition hover:bg-amber-300">
                    Book Now
                  </a>
                  <a href="tel:7478167607" className="block rounded-full border border-white/10 bg-white/5 px-6 py-4 text-center text-sm text-white transition hover:bg-white/10">
                    Call Now
                  </a>
                  <a href="https://wa.me/917478167607" target="_blank" rel="noreferrer" className="block rounded-full border border-emerald-400/40 bg-emerald-400/10 px-6 py-4 text-center text-sm text-emerald-200 transition hover:bg-emerald-400/20">
                    WhatsApp Inquiry
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>


      <section className="py-24 bg-slate-950/95">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-amber-300">Itinerary</p>
            <h2 className="mt-4 text-4xl font-bold">Detailed Timeline</h2>
          </div>
          <div className="space-y-8">
            {dynamicItinerary.map((item) => (
              <div key={item.day} className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 lg:grid-cols-[140px_1fr_200px] lg:items-start">
                <div className="rounded-[1.5rem] bg-slate-950/80 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-amber-300">{item.day}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{item.date}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <ul className="mt-3 space-y-2 text-white/70">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {item.hotel && (
                  <div className="flex flex-col items-center rounded-[1.5rem] bg-slate-950/80 p-4 text-center h-fit">
                    <Hotel className="h-6 w-6 text-amber-300 mb-2" />
                    <p className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-1">Hotel</p>
                    <p className="text-sm font-semibold text-white">{item.hotel}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-10 shadow-2xl">
              <h2 className="text-3xl font-bold text-white">Inclusions</h2>
              <ul className="mt-8 space-y-4 text-white/80">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-3xl bg-slate-950/80 p-4">
                    <span className="mt-1 h-3 w-3 rounded-full bg-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-10 shadow-2xl">
              <h2 className="text-3xl font-bold text-white">Exclusions</h2>
              <ul className="mt-8 space-y-4 text-white/80">
                {[
                  "Room Heater / Air Conditioner Charges",
                  "Airfare & Train Tickets",
                  "Journey Food During Travel",
                  "Entry Fees & Monument Tickets",
                  "Boating & Adventure Activities",
                  "Personal Expenses (Laundry, Shopping, etc.)",
                  "Extra Meals & Additional Water Bottles",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-3xl bg-slate-950/80 p-4">
                    <span className="mt-1 h-3 w-3 rounded-full bg-red-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_0.95fr]">
            <div>
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-10 shadow-2xl">
                <h2 className="text-3xl font-bold text-white">Package Overview</h2>
                <ul className="mt-8 space-y-4 text-white/80">
                  <li className="rounded-3xl bg-slate-950/80 p-5 shadow-inner shadow-black/10">
                    <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Package Name</p>
                    <p className="mt-2 text-xl font-semibold">DO DHAM YATRA</p>
                  </li>
                  <li className="rounded-3xl bg-slate-950/80 p-5 shadow-inner shadow-black/10">
                    <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Organizer</p>
                    <p className="mt-2 text-xl font-semibold">Cholo Jai Dure Tour & Travels</p>
                  </li>
                  <li className="rounded-3xl bg-slate-950/80 p-5 shadow-inner shadow-black/10">
                    <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Location</p>
                    <p className="mt-2 text-xl font-semibold">Zilla Parishad Market Complex, Midnapur, Paschim Medinipur</p>
                  </li>
                  <li className="rounded-3xl bg-slate-950/80 p-5 shadow-inner shadow-black/10">
                    <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Contact Numbers</p>
                    <p className="mt-2 text-xl font-semibold">7501307766, 7478167607</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-10 shadow-2xl">
                <h2 className="text-3xl font-bold text-white">Package Highlights</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {highlights.map((item) => (
                    <div key={item} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                      <div className="flex items-center gap-3 text-amber-300">
                        <Star className="h-5 w-5" />
                        <p className="font-semibold">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/90 p-10 shadow-2xl">
            <h2 className="text-3xl font-bold text-white">Gallery</h2>
            <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.slice(0, 4).map((destination) => (
                <div key={destination.title} className="overflow-hidden rounded-[1.75rem] bg-white/5">
                  <img src={destination.image} alt={destination.title} className="h-72 w-full object-cover transition duration-500 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_0.8fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-10 shadow-2xl">
              <h2 className="text-3xl font-bold text-white">Important Information</h2>
              <div className="mt-6 space-y-4 text-white/80">
                <p><span className="font-semibold text-white">Last Date of Booking:</span> 30 June 2026</p>
                <p><span className="font-semibold text-white">Booking Amount:</span> ₹5,000 per person</p>
                <p><span className="font-semibold text-white">Tempo Traveller Seat Selection:</span> Available at booking time</p>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-10 shadow-2xl">
              <h2 className="text-3xl font-bold text-white">Pilgrim FAQs</h2>
              <div className="mt-6 space-y-5">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                    <p className="text-lg font-semibold text-white">{faq.question}</p>
                    <p className="mt-3 text-white/70">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="py-24 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Ready to book</p>
              <h2 className="mt-4 text-4xl font-bold text-white">Reserve your sacred journey today</h2>
              <p className="mt-6 text-white/70">Confirm your place on Do Dham Yatra with a ₹5,000 booking amount and get personalized seat selection for the tempo traveller.</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-10 shadow-2xl">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Contact</p>
                <p className="text-xl font-semibold">7501307766</p>
                <p className="text-xl font-semibold">7478167607</p>
                <div className="mt-6 grid gap-4">
                  <a href="tel:7501307766" className="block rounded-full bg-amber-400 px-6 py-4 text-center font-semibold text-slate-950 transition hover:bg-amber-300">Call Now</a>
                  <a href="https://wa.me/917501307766" target="_blank" rel="noreferrer" className="block rounded-full border border-emerald-400/40 bg-emerald-400/10 px-6 py-4 text-center text-sm text-emerald-200 transition hover:bg-emerald-400/20">WhatsApp Inquiry</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/90 py-10 text-center text-sm text-white/70">
        <p>© 2026 Cholo Jai Dure. All Rights Reserved.</p>
      </footer>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Phone, ArrowRight, MapPin, Plane, Heart, Sparkles, Hotel } from "lucide-react";
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
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(15,23,42,0.45), rgba(15,23,42,0.92)), url('/kedarnath.jpeg')",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[1.65fr_0.95fr] lg:items-end">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-amber-200">DO DHAM YATRA 7 NIGHTS & 8 DAYS</span>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">Experience Do Dham Yatra with comfort and spiritual depth</h1>
              <p className="max-w-3xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8 md:text-xl">A premium Himalayan pilgrimage from Rishikesh to Kedarnath and Badrinath with guided darshan, smooth travel, and carefully planned stays.</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-amber-400/10 px-4 py-2 text-base font-semibold text-amber-200 ring-1 ring-amber-300/20 sm:px-5 sm:py-3 sm:text-lg">₹23,000 per person</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 sm:px-5 sm:py-3 sm:text-sm">7 Nights · 8 Days · Pilgrimage Special</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <a href="#booking" className="flex items-center justify-center rounded-full bg-amber-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 sm:px-7 sm:py-4">Book Now</a>
                <a href="https://wa.me/917478167607" target="_blank" rel="noreferrer" className="flex items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 px-6 py-3.5 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/20 sm:px-7 sm:py-4">WhatsApp Inquiry</a>
                <a href="tel:7478167607" className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-7 sm:py-4">Call Now</a>
              </div>
            </div>

            <aside className="rounded-4xl border border-white/10 bg-slate-900/85 p-4 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="space-y-6">
                <div className="rounded-4xl border border-amber-300/10 bg-slate-950/90 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Journey Date Selection</p>
                  <div className="mt-5 space-y-3">
                    {journeyDates.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedDate(option.date)}
                        className={`w-full rounded-3xl border px-5 py-4 text-left text-sm font-medium transition ${selectedDate === option.date ? "border-amber-300 bg-amber-300/20 text-amber-100" : "border-white/10 bg-slate-950/80 text-white/80 hover:border-white/20 hover:text-white"}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-4xl border border-white/10 bg-slate-950/90 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Pilgrimage Inclusions</p>
                  <div className="mt-4 space-y-3 text-white/80">
                    <p className="flex items-center gap-3 text-sm"><Heart className="h-4 w-4 text-amber-300" /> Daily vegetarian meals</p>
                    <p className="flex items-center gap-3 text-sm"><Hotel className="h-4 w-4 text-amber-300" /> Comfortable hotel stays</p>
                    <p className="flex items-center gap-3 text-sm"><Plane className="h-4 w-4 text-amber-300" /> Guided travel support</p>
                  </div>
                </div>
                <div className="rounded-4xl border border-white/10 bg-slate-950/90 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Travel Concierge</p>
                  <p className="mt-4 text-2xl font-semibold text-white">Sacred journey planning with full support.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>


      <section className="py-16 bg-slate-950/95 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-12">
            <p className="text-sm uppercase tracking-[0.5em] text-amber-300">Itinerary</p>
            <h2 className="mt-4 text-2xl font-bold sm:text-4xl">Detailed Timeline</h2>
          </div>
          <div className="space-y-8">
            {dynamicItinerary.map((item) => (
              <div key={item.day} className="grid gap-4 rounded-4xl border border-white/10 bg-slate-900/90 p-4 sm:gap-6 sm:p-8 lg:grid-cols-[140px_1fr_200px] lg:items-start">
                <div className="rounded-3xl bg-slate-950/80 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-amber-300">{item.day}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{item.date}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <ul className="mt-3 space-y-2 text-white/70">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {item.hotel && (
                  <div className="flex flex-col items-center rounded-3xl bg-slate-950/80 p-4 text-center h-fit">
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

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-4xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Inclusions</h2>
              <ul className="mt-8 space-y-4 text-white/80">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-3xl bg-slate-950/80 p-4">
                    <span className="mt-1 h-3 w-3 rounded-full bg-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-4xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Exclusions</h2>
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

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-4xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Gallery</h2>
            <div className="mt-6 grid gap-3 grid-cols-2 sm:mt-8 sm:gap-4 lg:grid-cols-4">
              {destinations.slice(0, 4).map((destination, index) => (
                <div key={destination.image} className="overflow-hidden rounded-[1.25rem] bg-white/5 sm:rounded-[1.75rem]">
                  <img src={destination.image} alt={`Do Dham gallery ${index + 1}`} className="h-36 w-full object-cover transition duration-500 hover:scale-105 sm:h-52 lg:h-64" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900/80 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_0.8fr]">
            <div className="rounded-4xl border border-white/10 bg-slate-950/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Important Information</h2>
              <div className="mt-6 space-y-4 text-white/80">
                <p><span className="font-semibold text-white">Last Date of Booking:</span> 30 June 2026</p>
                <p><span className="font-semibold text-white">Booking Amount:</span> ₹5,000 per person</p>
                <p><span className="font-semibold text-white">Tempo Traveller Seat Selection:</span> Available at booking time</p>
              </div>
            </div>
            <div className="rounded-4xl border border-white/10 bg-slate-950/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Pilgrim FAQs</h2>
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

      <section id="booking" className="py-16 bg-slate-950 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Ready to book</p>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-4xl">Reserve your sacred journey today</h2>
              <p className="mt-6 text-white/70">Confirm your place on Do Dham Yatra with a ₹5,000 booking amount and get personalized seat selection for the tempo traveller.</p>
            </div>
            <div className="rounded-4xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
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

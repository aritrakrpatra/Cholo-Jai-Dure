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

      
      </div>
    </>
  );
}

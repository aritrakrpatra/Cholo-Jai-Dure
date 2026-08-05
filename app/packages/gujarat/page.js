"use client";

import Image from "next/image";
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
    hotel: "Lemon Tree Hotel, Vadodara",
  },
  {
    day: "Day 2",
    title: "Vadodara → Ahmedabad",
    image:
      "https://images.unsplash.com/photo-1494377121331-9229999cef4b?auto=format&fit=crop&w=1200&q=80",
    points: ["Sabarmati Ashram", "Adalaj Stepwell", "Akshardham Temple"],
    hotel: "Fortune Landmark, Ahmedabad",
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
    hotel: "Regenta Central Antarim, Ahmedabad",
  },
  {
    day: "Day 4",
    title: "Ahmedabad → Bhavnagar",
    image:
      "https://images.unsplash.com/photo-1546286517-3d076293f5f5?auto=format&fit=crop&w=1200&q=80",
    points: ["Takhteshwar Temple", "Victoria Park", "Gaurishankar Lake"],
    hotel: "Efcee Sarovar Portico, Bhavnagar",
  },
  {
    day: "Day 5",
    title: "Bhavnagar → Gir",
    image:
      "https://images.unsplash.com/photo-1595247850422-45c7c3cf523f?auto=format&fit=crop&w=1200&q=80",
    points: ["Gir Jungle Safari", "Devalia Park"],
    hotel: "Fern Gir Forest Resort, Sasan Gir",
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
    hotel: "The Fern Residency, Somnath",
  },
  {
    day: "Day 7",
    title: "Somnath → Dwarka",
    image:
      "https://images.unsplash.com/photo-1513708925320-6d01899e8a3f?auto=format&fit=crop&w=1200&q=80",
    points: ["Dwarkadhish Temple", "Gomti Ghat"],
    hotel: "Hawthorn Suites by Wyndham, Dwarka",
  },
  {
    day: "Day 8",
    title: "Bet Dwarka Excursion",
    image:
      "https://images.unsplash.com/photo-1549909561-1c4db6e8f5c5?auto=format&fit=crop&w=1200&q=80",
    points: ["Bet Dwarka", "Nageshwar Jyotirlinga", "Rukmini Mata Temple"],
    hotel: "The Dwarika Hotel, Dwarka",
  },
  {
    day: "Day 9",
    title: "Dwarka → Rajkot",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    points: ["Kaba Gandhi No Delo", "Watson Museum", "Race Course"],
    hotel: "Regency Lagoon Resort, Rajkot",
  },
  {
    day: "Day 10",
    title: "Return Journey",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    points: ["Rajkot to Kharagpur", "End of Tour"],
    hotel: "Train journey / Checkout",
  },
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
      

        <section className="mb-24 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <div className="mb-10">
              <p className="text-sm uppercase tracking-[0.4em] text-amber-300">FAQs</p>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-4xl">Questions travelers ask most</h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={item.question} className="overflow-hidden rounded-4xl border border-white/10 bg-slate-950/90">
                  <button type="button" onClick={() => setActiveFaq(activeFaq === index ? null : index)} className="flex w-full items-center justify-between gap-4 p-6 text-left text-white">
                    <span className="text-lg font-semibold">{item.question}</span>
                    <span className="text-2xl text-amber-300">{activeFaq === index ? "−" : "+"}</span>
                  </button>
                  {activeFaq === index && <div className="border-t border-white/10 bg-slate-950/85 p-6 text-white/80">{item.answer}</div>}
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-4xl border border-amber-300/10 bg-slate-950/90 p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Customer Stories</p>
            <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">What premium travelers say</h3>
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

        <section id="booking" className="mb-16 rounded-4xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:mb-24 sm:p-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Booking & Pricing</p>
              <h2 className="mt-3 text-2xl font-bold text-white sm:text-4xl">Reserve your Gujrat luxury trip</h2>
              <p className="mt-4 max-w-3xl text-white/70">Secure your seat with just ₹5,000 and pay the balance later. Our team will confirm departures, seats, and room preferences with you.</p>
            </div>
            <div className="space-y-4 rounded-4xl bg-slate-950/90 p-4 shadow-xl sm:p-8">
              <div className="rounded-[1.75rem] bg-linear-to-r from-amber-400/15 to-amber-300/10 p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-amber-200">Tour Price</p>
                <p className="mt-3 text-4xl font-semibold text-white">₹32,000 per person</p>
                <p className="mt-2 text-sm text-white/70">Booking Amount ₹5,000</p>
              </div>
              <a href="tel:917478167607" className="block rounded-full bg-white px-6 py-4 text-center text-sm font-semibold text-slate-950 transition hover:bg-amber-300">Call Now</a>
              <a href="https://wa.me/917478167607" target="_blank" rel="noreferrer" className="block rounded-full bg-emerald-400 px-6 py-4 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">WhatsApp Inquiry</a>
              <Link href="#booking" className="block rounded-full border border-amber-300 px-6 py-4 text-center text-sm font-semibold text-amber-200 transition hover:bg-amber-300/10">Book Now</Link>
            </div>
          </div>
        </section>
      </main>

      
    </div>
    </>
  );
}

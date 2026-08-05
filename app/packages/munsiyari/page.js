import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Munsiyari",
  description: "March Munsiyari itinerary across Nainital, Koushani, Munsiyari, Patal Bhubaneswar, and Almora.",
};

const itinerary = [
  { day: "Day 1", title: "Nainital", points: ["Arrival and transfer to Nainital", "Overnight stay"] },
  { day: "Day 2", title: "Nainital", points: ["Nainital local sightseeing", "Overnight stay"] },
  { day: "Day 3", title: "Koushani", points: ["Transfer to Koushani", "Leisure and overnight stay"] },
  { day: "Day 4", title: "Koushani", points: ["Second day in Koushani", "Overnight stay"] },
  { day: "Day 5", title: "Munsiyari", points: ["Transfer to Munsiyari", "Evening mountain views"] },
  { day: "Day 6", title: "Munsiyari", points: ["Munsiyari exploration", "Overnight stay"] },
  { day: "Day 7", title: "Patal Bhubaneswar", points: ["Drive to Patal Bhubaneswar", "Temple cave visit and stay"] },
  { day: "Day 8", title: "Almora", points: ["Transfer to Almora", "Overnight stay"] },
  { day: "Day 9", title: "Return", points: ["Check-out and return journey", "Tour concludes with drop-off"] },
];

const inclusions = [
  "Pickup & Drop-off from Station to Station",
  "Tempo Traveller / Bus Transportation",
  "Standard Hotel Accommodation",
  "Daily Breakfast, Lunch & Dinner",
  "Professional Travel Guide",
  "Complete Sightseeing as per Itinerary",
  "1 Litre Water Bottle Per Person Daily",
];

const exclusions = [
  "Airfare & Train Tickets",
  "Entry Fees & Monument Tickets",
  "Adventure Activities",
  "Personal Expenses",
  "Laundry & Shopping",
  "Extra Meals & Extra Water Bottles",
  "Room Heater / Special Vehicle Charges if any",
];

const galleryItems = [
  { label: "Nainital", src: "/northbengal.jpeg" },
  { label: "Koushani", src: "/group5.jpeg" },
  { label: "Munsiyari", src: "/group6.jpeg" },
  { label: "Patal Bhubaneswar", src: "/group2.jpeg" },
  { label: "Almora", src: "/group3.jpeg" },
  { label: "Kumaon Route", src: "/manali.jpeg" },
];

export default function MunsiyariPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        

        <section className="py-10 sm:py-12"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10"><h2 className="text-2xl font-bold sm:text-3xl">Important Information</h2><div className="mt-6 space-y-4 text-white/80"><p><span className="font-semibold text-white">Package:</span> ₹27,000/-</p><p><span className="font-semibold text-white">Journey Date:</span> 16/03/2027</p><p><span className="font-semibold text-white">Return Date:</span> 25/03/2027</p><p><span className="font-semibold text-white">Route Highlight:</span> Nainital, Koushani, Munsiyari, Patal Bhubaneswar, and Almora</p></div></div></div></section>

        
      </main>
    </>
  );
}

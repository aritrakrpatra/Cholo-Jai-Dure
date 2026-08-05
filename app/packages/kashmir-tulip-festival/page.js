import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Kashmir Tulip Festival",
  description: "March Kashmir Tulip Festival itinerary covering Pahalgam, Srinagar, Gulmarg, and Sonmarg.",
};

const itinerary = [
  { day: "Day 1", title: "Pahalgam", points: ["Arrival and transfer to Pahalgam", "Overnight stay"] },
  { day: "Day 2", title: "Srinagar", points: ["Transfer to Srinagar", "Tulip Festival visit and overnight stay"] },
  { day: "Day 3", title: "Gulmarg", points: ["Excursion/transfer to Gulmarg", "Sightseeing and overnight stay"] },
  { day: "Day 4", title: "Sonmarg", points: ["Transfer to Sonmarg", "Scenic exploration and overnight stay"] },
  { day: "Day 5", title: "Return", points: ["Check-out and return journey", "Tour concludes with drop-off"] },
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
  "Cable car / pony / optional rides",
  "Personal Expenses",
  "Laundry & Shopping",
  "Extra Meals & Extra Water Bottles",
  "Room Heater / Special Vehicle Charges if any",
];

const galleryItems = [
  { label: "Pahalgam", src: "/kashmir.jpeg" },
  { label: "Tulip Festival", src: "/group4.jpeg" },
  { label: "Srinagar", src: "/group3.jpeg" },
  { label: "Gulmarg", src: "/group2.jpeg" },
  { label: "Sonmarg", src: "/group1.jpeg" },
  { label: "Spring Kashmir", src: "/varanasi.jpeg" },
];

export default function KashmirTulipFestivalPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        

        <section className="py-10 sm:py-12"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10"><h2 className="text-2xl font-bold sm:text-3xl">Important Information</h2><div className="mt-6 space-y-4 text-white/80"><p><span className="font-semibold text-white">Package:</span> ₹13,000/-</p><p><span className="font-semibold text-white">Journey Date:</span> 29/03/2027</p><p><span className="font-semibold text-white">Return Date:</span> 04/04/2027</p><p><span className="font-semibold text-white">Route Highlight:</span> Pahalgam, Srinagar, Gulmarg, and Sonmarg</p></div></div></div></section>

        
      </main>
    </>
  );
}

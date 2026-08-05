import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Manali",
  description: "April 4N/5D Manali route covering Shimla, Kasol, and Manali.",
};

const itinerary = [
  { day: "Day 1", title: "Shimla", points: ["Arrival and transfer to Shimla", "Evening leisure and overnight stay"] },
  { day: "Day 2", title: "Kasol", points: ["Transfer to Kasol", "Local sightseeing and overnight stay"] },
  { day: "Day 3", title: "Manali", points: ["Travel to Manali", "Evening at leisure and overnight stay"] },
  { day: "Day 4", title: "Manali", points: ["Manali local exploration", "Second overnight stay in Manali"] },
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
  "Adventure Activities",
  "Personal Expenses",
  "Laundry & Shopping",
  "Extra Meals & Extra Water Bottles",
  "Room Heater / Special Vehicle Charges if any",
];

const galleryItems = [
  { label: "Shimla", src: "/manali.jpeg" },
  { label: "Kasol", src: "/group6.jpeg" },
  { label: "Manali", src: "/group5.jpeg" },
  { label: "Himachal Views", src: "/northbengal.jpeg" },
  { label: "Mountain Route", src: "/group3.jpeg" },
  { label: "Travel Moments", src: "/group2.jpeg" },
];

export default function ShimlaManaliPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">Important Information</h2>
              <div className="mt-6 space-y-4 text-white/80">
                <p><span className="font-semibold text-white">Package:</span> ₹12,000/-</p>
                <p><span className="font-semibold text-white">Journey Date:</span> To be announced</p>
                <p><span className="font-semibold text-white">Return Date:</span> To be announced</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Shimla, Kasol, and Manali</p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Vizag",
  description: "August Vizag itinerary with a compact 3N/4D coastal getaway.",
};

const itinerary = [
  {
    day: "Day 1",
    title: "Vizag",
    date: "27/08/2027",
    points: ["Arrival and transfer to Vizag", "Evening at leisure and overnight stay"],
  },
  {
    day: "Day 2",
    title: "Vizag",
    date: "28/08/2027",
    points: ["Full-day Vizag sightseeing", "Beachside evening and overnight stay"],
  },
  {
    day: "Day 3",
    title: "Vizag",
    date: "29/08/2027",
    points: ["Local attractions and relaxed schedule", "Overnight stay in Vizag"],
  },
  {
    day: "Day 4",
    title: "Return",
    date: "31/08/2027",
    points: ["Check-out and return journey", "Tour ends with drop-off"],
  },
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
  "Boating & Adventure Activities",
  "Personal Expenses",
  "Laundry & Shopping",
  "Extra Meals & Extra Water Bottles",
  "Room Heater / Special Vehicle Charges if any",
];

const galleryItems = [
  { label: "Vizag Coast", src: "/group5.jpeg" },
  { label: "Beach Sunset", src: "/group4.jpeg" },
  { label: "City Tour", src: "/group2.jpeg" },
  { label: "Sea View", src: "/group7.jpeg" },
  { label: "Harbor Side", src: "/group6.jpeg" },
  { label: "Holiday Moments", src: "/group1.jpeg" },
];

export default function VizagPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">Important Information</h2>
              <div className="mt-6 space-y-4 text-white/80">
                <p><span className="font-semibold text-white">Package:</span> ₹10,000/-</p>
                <p><span className="font-semibold text-white">Journey Date:</span> 27/08/2027</p>
                <p><span className="font-semibold text-white">Return Date:</span> 31/08/2027</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Vizag coastal circuit</p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </>
  );
}

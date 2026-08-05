import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Nepal",
  description: "May Nepal itinerary covering Lumbini, Pokhra, Chitwan, Kathmandu, and Nagarkot.",
};

const itinerary = [
  {
    day: "Day 1",
    title: "Lumbini",
    date: "13/05/2027",
    points: ["Arrival and transfer to Lumbini", "Evening leisure and overnight stay"],
  },
  {
    day: "Day 2",
    title: "Pokhra",
    date: "14/05/2027",
    points: ["Transfer to Pokhra", "Lakeside evening and overnight stay"],
  },
  {
    day: "Day 3",
    title: "Pokhra",
    date: "15/05/2027",
    points: ["Pokhra local sightseeing", "Overnight stay"],
  },
  {
    day: "Day 4",
    title: "Chitwan",
    date: "16/05/2027",
    points: ["Transfer to Chitwan", "Evening cultural or nature experience"],
  },
  {
    day: "Day 5",
    title: "Chitwan",
    date: "17/05/2027",
    points: ["Chitwan exploration day", "Overnight stay"],
  },
  {
    day: "Day 6",
    title: "Kathmandu",
    date: "18/05/2027",
    points: ["Drive to Kathmandu", "Evening leisure and overnight stay"],
  },
  {
    day: "Day 7",
    title: "Kathmandu",
    date: "19/05/2027",
    points: ["Kathmandu heritage sightseeing", "Overnight stay"],
  },
  {
    day: "Day 8",
    title: "Nagarkot",
    date: "20/05/2027",
    points: ["Transfer to Nagarkot", "Sunset view and overnight stay"],
  },
  {
    day: "Day 9",
    title: "Return",
    date: "22/05/2027",
    points: ["Check-out and return journey", "Tour concludes with drop-off"],
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
  "Visa and border permit fees if applicable",
];

const galleryItems = [
  { label: "Lumbini", src: "/group6.jpeg" },
  { label: "Pokhra", src: "/group5.jpeg" },
  { label: "Chitwan", src: "/group3.jpeg" },
  { label: "Kathmandu", src: "/group2.jpeg" },
  { label: "Nagarkot", src: "/group4.jpeg" },
  { label: "Nepal Journey", src: "/group1.jpeg" },
];

export default function NepalPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">Important Information</h2>
              <div className="mt-6 space-y-4 text-white/80">
                <p><span className="font-semibold text-white">Package:</span> ₹26,000/-</p>
                <p><span className="font-semibold text-white">Journey Date:</span> 13/05/2027</p>
                <p><span className="font-semibold text-white">Return Date:</span> 22/05/2027</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Lumbini, Pokhra, Chitwan, Kathmandu, and Nagarkot</p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </>
  );
}

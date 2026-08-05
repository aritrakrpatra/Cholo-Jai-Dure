import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Andaman",
  description: "February Andaman itinerary covering Port Blair, Havelock, and Neil Island.",
};

const itinerary = [
  { day: "Day 1", title: "Port Blair", date: "14/02/2027", points: ["Arrival and transfer to Port Blair", "Evening leisure and overnight stay"] },
  { day: "Day 2", title: "Havelock", date: "15/02/2027", points: ["Ferry transfer to Havelock", "Beach time and overnight stay"] },
  { day: "Day 3", title: "Havelock", date: "16/02/2027", points: ["Second day in Havelock", "Island exploration and overnight stay"] },
  { day: "Day 4", title: "Neil Island", date: "17/02/2027", points: ["Transfer to Neil Island", "Sightseeing and overnight stay"] },
  { day: "Day 5", title: "Port Blair", date: "18/02/2027", points: ["Return to Port Blair", "Local visits and overnight stay"] },
  { day: "Day 6", title: "Port Blair", date: "19/02/2027", points: ["Second day in Port Blair", "Leisure and shopping time"] },
  { day: "Day 7", title: "Return", date: "20/02/2027", points: ["Check-out and return journey", "Tour concludes with drop-off"] },
];

const inclusions = [
  "Pickup & Drop-off from Station to Station",
  "Ferry and local transport support",
  "Standard Hotel Accommodation",
  "Daily Breakfast, Lunch & Dinner",
  "Professional Travel Guide",
  "Complete Sightseeing as per Itinerary",
  "1 Litre Water Bottle Per Person Daily",
];

const exclusions = [
  "Airfare & Train Tickets",
  "Entry Fees & Monument Tickets",
  "Scuba, snorkeling, and optional water activities",
  "Personal Expenses",
  "Laundry & Shopping",
  "Extra Meals & Extra Water Bottles",
  "Room upgrade and AC differential charges",
];

const galleryItems = [
  { label: "Port Blair", src: "/group2.jpeg" },
  { label: "Havelock", src: "/group7.jpeg" },
  { label: "Neil Island", src: "/group6.jpeg" },
  { label: "Andaman Beach", src: "/group5.jpeg" },
  { label: "Island Waters", src: "/group4.jpeg" },
  { label: "Travel Moments", src: "/group3.jpeg" },
];

export default function AndamanPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">Important Information</h2>
              <div className="mt-6 space-y-4 text-white/80">
                <p><span className="font-semibold text-white">Package:</span> ₹27,000/-</p>
                <p><span className="font-semibold text-white">Journey Date:</span> 14/02/2027</p>
                <p><span className="font-semibold text-white">Return Date:</span> 20/02/2027</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Port Blair, Havelock, and Neil Island</p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </>
  );
}

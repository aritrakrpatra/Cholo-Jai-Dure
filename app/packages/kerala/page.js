import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Kerala",
  description: "February Kerala itinerary covering Kanniyakumari, Thiruvananthapuram, Alapuzha, Thekkady, Munnar, and Kochi.",
};

const itinerary = [
  { day: "Day 1", title: "Kanniyakumari", date: "15/02/2027", points: ["Arrival and transfer to Kanniyakumari", "Evening leisure and overnight stay"] },
  { day: "Day 2", title: "Thiruvananthapuram", date: "16/02/2027", points: ["Transfer to Thiruvananthapuram", "Local sightseeing and overnight stay"] },
  { day: "Day 3", title: "Alapuzha", date: "17/02/2027", points: ["Move to Alapuzha", "Backwater experience and overnight stay"] },
  { day: "Day 4", title: "Thekkady", date: "18/02/2027", points: ["Transfer to Thekkady", "Nature/plantation zone visit and overnight stay"] },
  { day: "Day 5", title: "Munnar", date: "19/02/2027", points: ["Drive to Munnar", "Tea hill exploration and overnight stay"] },
  { day: "Day 6", title: "Kochi", date: "20/02/2027", points: ["Transfer to Kochi", "City highlights and overnight stay"] },
  { day: "Day 7", title: "Return", date: "23/02/2027", points: ["Check-out and return journey", "Tour concludes with drop-off"] },
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
  "AC / Room Heater Charges if any",
];

const galleryItems = [
  { label: "Kanniyakumari", src: "/group6.jpeg" },
  { label: "Thiruvananthapuram", src: "/group5.jpeg" },
  { label: "Alapuzha", src: "/house-boat.jpeg" },
  { label: "Thekkady", src: "/group3.jpeg" },
  { label: "Munnar", src: "/group2.jpeg" },
  { label: "Kochi", src: "/group1.jpeg" },
];

export default function KeralaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">Important Information</h2>
              <div className="mt-6 space-y-4 text-white/80">
                <p><span className="font-semibold text-white">Package:</span> ₹23,000/-</p>
                <p><span className="font-semibold text-white">Journey Date:</span> 15/02/2027</p>
                <p><span className="font-semibold text-white">Return Date:</span> 23/02/2027</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Kanniyakumari, Thiruvananthapuram, Alapuzha, Thekkady, Munnar, and Kochi</p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </>
  );
}

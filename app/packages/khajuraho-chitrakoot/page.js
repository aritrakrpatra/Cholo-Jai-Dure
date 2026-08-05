import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Khajuraho & Chitrakoot",
  description: "July Khajuraho and Chitrakoot itinerary with a 3N/4D heritage-spiritual route.",
};

const itinerary = [
  {
    day: "Day 1",
    title: "Khajuraho",
    date: "30/07/2027",
    points: ["Arrival and transfer to Khajuraho", "Evening leisure and overnight stay"],
  },
  {
    day: "Day 2",
    title: "Khajuraho",
    date: "31/07/2027",
    points: ["Khajuraho temple and local sightseeing", "Overnight stay"],
  },
  {
    day: "Day 3",
    title: "Chitrakoot",
    date: "01/08/2027",
    points: ["Transfer to Chitrakoot", "Spiritual visits and overnight stay"],
  },
  {
    day: "Day 4",
    title: "Return",
    date: "03/08/2027",
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
  "Room Heater / Special Vehicle Charges if any",
];

const galleryItems = [
  { label: "Khajuraho", src: "/group2.jpeg" },
  { label: "Temple Heritage", src: "/group3.jpeg" },
  { label: "Chitrakoot", src: "/group1.jpeg" },
  { label: "Sacred Route", src: "/group4.jpeg" },
  { label: "Travel Moments", src: "/varanasi.jpeg" },
  { label: "Cultural Journey", src: "/group5.jpeg" },
];

export default function KhajurahoChitrakootPage() {
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
                <p><span className="font-semibold text-white">Journey Date:</span> 30/07/2027</p>
                <p><span className="font-semibold text-white">Return Date:</span> 03/08/2027</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Khajuraho and Chitrakoot cultural-spiritual circuit</p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Kashmir & Gurez Valley",
  description: "June Kashmir and Gurez Valley itinerary covering Srinagar, Gulmarg, Gurez Valley, and Doodhpathri.",
};

const itinerary = [
  {
    day: "Day 1",
    title: "Srinagar",
    date: "14/06/2027",
    points: ["Arrival and transfer to Srinagar", "Evening at leisure and overnight stay"],
  },
  {
    day: "Day 2",
    title: "Gulmarg",
    date: "15/06/2027",
    points: ["Day excursion/transfer to Gulmarg", "Sightseeing and overnight arrangement"],
  },
  {
    day: "Day 3",
    title: "Gurez Valley",
    date: "16/06/2027",
    points: ["Transfer to Gurez Valley", "Local exploration and overnight stay"],
  },
  {
    day: "Day 4",
    title: "Gurez Valley",
    date: "17/06/2027",
    points: ["Full-day scenic exploration in Gurez", "Second overnight stay"],
  },
  {
    day: "Day 5",
    title: "Doodhpathri",
    date: "18/06/2027",
    points: ["Transfer toward Doodhpathri", "Valley visit and overnight stay"],
  },
  {
    day: "Day 6",
    title: "Return",
    date: "21/06/2027",
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
  "Cable car / pony / optional rides",
  "Personal Expenses",
  "Laundry & Shopping",
  "Extra Meals & Extra Water Bottles",
  "Room Heater / Special Vehicle Charges if any",
];

const galleryItems = [
  { label: "Srinagar", src: "/kashmir.jpeg" },
  { label: "Gulmarg", src: "/group4.jpeg" },
  { label: "Gurez Valley", src: "/group3.jpeg" },
  { label: "Doodhpathri", src: "/northbengal.jpeg" },
  { label: "Mountain Meadows", src: "/group2.jpeg" },
  { label: "Kashmir Journey", src: "/group1.jpeg" },
];

export default function KashmirGurezValleyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">Important Information</h2>
              <div className="mt-6 space-y-4 text-white/80">
                <p><span className="font-semibold text-white">Package:</span> ₹18,000/-</p>
                <p><span className="font-semibold text-white">Journey Date:</span> 14/06/2027</p>
                <p><span className="font-semibold text-white">Return Date:</span> 21/06/2027</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Srinagar, Gulmarg, Gurez Valley, and Doodhpathri</p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </>
  );
}

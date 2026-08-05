import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Assam & Meghalaya",
  description: "August Assam and Meghalaya itinerary covering Shillong, Cherrapunji, and Guwahati.",
};

const itinerary = [
  {
    day: "Day 1",
    title: "Shillong",
    date: "11/08/2027",
    points: ["Arrival and transfer to Shillong", "Evening leisure and overnight stay"],
  },
  {
    day: "Day 2",
    title: "Shillong",
    date: "12/08/2027",
    points: ["Shillong local sightseeing", "Overnight stay in Shillong"],
  },
  {
    day: "Day 3",
    title: "Cherrapunji",
    date: "13/08/2027",
    points: ["Scenic transfer to Cherrapunji", "Visit local viewpoints and waterfalls"],
  },
  {
    day: "Day 4",
    title: "Cherrapunji",
    date: "14/08/2027",
    points: ["Full-day Cherrapunji exploration", "Overnight stay in Cherrapunji"],
  },
  {
    day: "Day 5",
    title: "Guwahati",
    date: "15/08/2027",
    points: ["Transfer to Guwahati", "Local visits and overnight stay"],
  },
  {
    day: "Day 6",
    title: "Return",
    date: "17/08/2027",
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
  { label: "Shillong", src: "/group3.jpeg" },
  { label: "Cherrapunji", src: "/group2.jpeg" },
  { label: "Guwahati", src: "/group1.jpeg" },
  { label: "Meghalaya", src: "/northbengal.jpeg" },
  { label: "Assam", src: "/kashmir.jpeg" },
  { label: "Northeast Journey", src: "/group4.jpeg" },
];

export default function AssamMeghalayaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">Important Information</h2>
              <div className="mt-6 space-y-4 text-white/80">
                <p><span className="font-semibold text-white">Package:</span> ₹16,000/-</p>
                <p><span className="font-semibold text-white">Journey Date:</span> 11/08/2027</p>
                <p><span className="font-semibold text-white">Return Date:</span> 17/08/2027</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Shillong, Cherrapunji, and Guwahati</p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </>
  );
}

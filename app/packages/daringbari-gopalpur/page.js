import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Daringbari & Gopalpur",
  description: "September Daringbari and Gopalpur itinerary with a compact hill-and-coast route.",
};

const highlights = [
  "Pickup & Drop-off from Station to Station",
  "Tempo Traveller / Bus Transportation",
  "Standard Hotel Accommodation",
  "Daily Breakfast, Lunch & Dinner",
  "Professional Travel Guide",
  "Complete Sightseeing as per Itinerary",
  "1 Litre Water Bottle Per Person Daily",
];

const itinerary = [
  {
    day: "Day 1",
    title: "Daringbari",
    date: "September Batch",
    points: ["Arrival and transfer to Daringbari", "Enjoy the hill station evening and overnight stay"],
  },
  {
    day: "Day 2",
    title: "Gopalpur",
    date: "September Batch",
    points: ["Drive to Gopalpur by the coast", "Relax at the beach and stay overnight"],
  },
  {
    day: "Day 3",
    title: "Gopalpur",
    date: "September Batch",
    points: ["Local sightseeing and beach time", "Evening leisure and another overnight stay"],
  },
  {
    day: "Day 4",
    title: "Return",
    date: "September Batch",
    points: ["Check-out and return journey", "Tour concludes with drop-off"],
  },
];

const galleryItems = [
  { label: "Daringbari", src: "/group6.jpeg" },
  { label: "Gopalpur Coast", src: "/group5.jpeg" },
  { label: "Hill Views", src: "/group3.jpeg" },
  { label: "Beach Time", src: "/group4.jpeg" },
  { label: "Odisha Tour", src: "/group2.jpeg" },
  { label: "Travel Moments", src: "/group1.jpeg" },
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

export default function DaringbariGopalpurPage() {
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
                <p><span className="font-semibold text-white">Journey:</span> September batch</p>
                <p><span className="font-semibold text-white">Return:</span> September batch</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Daringbari and Gopalpur</p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </>
  );
}

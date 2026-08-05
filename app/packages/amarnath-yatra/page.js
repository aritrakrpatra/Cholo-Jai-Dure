import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Amarnath Yatra",
  description: "July Amarnath Yatra itinerary covering Srinagar and Sonmarg.",
};

const itinerary = [
  {
    day: "Day 1",
    title: "Srinagar",
    date: "02/07/2027",
    points: ["Arrival and transfer to Srinagar", "Evening rest and overnight stay"],
  },
  {
    day: "Day 2",
    title: "Sonmarg",
    date: "03/07/2027",
    points: ["Transfer to Sonmarg", "Pilgrimage support and overnight stay"],
  },
  {
    day: "Day 3",
    title: "Srinagar",
    date: "04/07/2027",
    points: ["Return to Srinagar", "Local visits and overnight stay"],
  },
  {
    day: "Day 4",
    title: "Srinagar",
    date: "05/07/2027",
    points: ["Srinagar sightseeing and leisure", "Overnight stay"],
  },
  {
    day: "Day 5",
    title: "Return",
    date: "08/07/2027",
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
  "Helicopter / Pony / Palki charges if required",
  "Personal Expenses",
  "Laundry & Shopping",
  "Extra Meals & Extra Water Bottles",
  "Room Heater / Special Vehicle Charges if any",
];

const galleryItems = [
  { label: "Srinagar", src: "/kashmir.jpeg" },
  { label: "Sonmarg", src: "/group3.jpeg" },
  { label: "Pilgrimage Route", src: "/group2.jpeg" },
  { label: "Himalayan Valley", src: "/northbengal.jpeg" },
  { label: "Travel Moments", src: "/group1.jpeg" },
  { label: "Yatra Journey", src: "/group4.jpeg" },
];

export default function AmarnathYatraPage() {
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
                <p><span className="font-semibold text-white">Journey Date:</span> 02/07/2027</p>
                <p><span className="font-semibold text-white">Return Date:</span> 08/07/2027</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Srinagar and Sonmarg pilgrimage circuit</p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </>
  );
}

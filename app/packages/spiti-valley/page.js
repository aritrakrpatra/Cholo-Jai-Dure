import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Spiti Valley",
  description: "May Spiti Valley itinerary covering Narkanda, Chitkul, Kalpa, Tabo, Kaza, and Manali.",
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
    title: "Narkanda",
    date: "10/05/2027",
    points: ["Arrival and mountain transfer to Narkanda", "Easy evening and overnight stay"],
  },
  {
    day: "Day 2",
    title: "Chitkul",
    date: "11/05/2027",
    points: ["Scenic drive to the last village of India", "Local sightseeing and overnight stay"],
  },
  {
    day: "Day 3",
    title: "Kalpa",
    date: "12/05/2027",
    points: ["Travel through Kinnaur valley", "Visit Kalpa viewpoints and relax for the night"],
  },
  {
    day: "Day 4",
    title: "Tabo",
    date: "13/05/2027",
    points: ["Drive deeper into Spiti", "Tabo monastery visit and overnight halt"],
  },
  {
    day: "Day 5",
    title: "Kaza",
    date: "14/05/2027",
    points: ["Reach Spiti's main town", "Local market visit and overnight stay in Kaza"],
  },
  {
    day: "Day 6",
    title: "Kaza",
    date: "15/05/2027",
    points: ["Full day local sightseeing around Kaza", "Optional monastery and village exploration"],
  },
  {
    day: "Day 7",
    title: "Manali",
    date: "16/05/2027",
    points: ["Mountain transfer towards Manali", "Evening leisure and stay in Manali"],
  },
  {
    day: "Day 8",
    title: "Return",
    date: "19/05/2027",
    points: ["Journey back with the group", "Tour ends with return drop-off"],
  },
];

const galleryItems = [
  { label: "Spiti Valley", src: "/spiti.jpeg" },
  { label: "Narkanda", src: "/manali.jpeg" },
  { label: "Kalpa", src: "/kashmir.jpeg" },
  { label: "Tabo", src: "/ladakh.jpeg" },
  { label: "Kaza", src: "/northbengal.jpeg" },
  { label: "Manali", src: "/manali.jpeg" },
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

export default function SpitiValleyPage() {
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
                <p><span className="font-semibold text-white">Journey Date:</span> 10/05/2027</p>
                <p><span className="font-semibold text-white">Return Date:</span> 19/05/2027</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Narkanda, Chitkul, Kalpa, Tabo, Kaza, and Manali</p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </>
  );
}

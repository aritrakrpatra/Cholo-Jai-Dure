import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Dalhousie",
  description: "February 5N/6D route covering Amritsar, Dalhousie, and Dharamshala.",
};

const itinerary = [
  { day: "Day 1", title: "Amritsar", date: "21/02/2027", points: ["Arrival and transfer to Amritsar", "Evening local visit and overnight stay"] },
  { day: "Day 2", title: "Dalhousie", date: "22/02/2027", points: ["Transfer to Dalhousie", "Sightseeing and overnight stay"] },
  { day: "Day 3", title: "Dalhousie", date: "23/02/2027", points: ["Second day in Dalhousie", "Leisure and overnight stay"] },
  { day: "Day 4", title: "Dharamshala", date: "24/02/2027", points: ["Transfer to Dharamshala", "Local exploration and overnight stay"] },
  { day: "Day 5", title: "Dharamshala", date: "25/02/2027", points: ["Second day in Dharamshala", "Optional local visits and overnight stay"] },
  { day: "Day 6", title: "Return", date: "28/02/2027", points: ["Check-out and return journey", "Tour concludes with drop-off"] },
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
  { label: "Amritsar", src: "/group1.jpeg" },
  { label: "Dalhousie", src: "/group4.jpeg" },
  { label: "Dharamshala", src: "/group3.jpeg" },
  { label: "Hill Drive", src: "/manali.jpeg" },
  { label: "Mountain Views", src: "/northbengal.jpeg" },
  { label: "Travel Moments", src: "/group2.jpeg" },
];

export default function DalhousieRoutePage() {
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
                <p><span className="font-semibold text-white">Journey Date:</span> 21/02/2027</p>
                <p><span className="font-semibold text-white">Return Date:</span> 28/02/2027</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Amritsar, Dalhousie, and Dharamshala</p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </>
  );
}

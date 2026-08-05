import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Kashmir & Vaishno Devi",
  description: "April Kashmir and Vaishno Devi itinerary with two departure batches.",
};

const itinerary = [
  { day: "Day 1", title: "Srinagar", points: ["Arrival and transfer to Srinagar", "Evening leisure and overnight stay"] },
  { day: "Day 2", title: "Gulmarg", points: ["Transfer/excursion to Gulmarg", "Sightseeing and overnight stay"] },
  { day: "Day 3", title: "Sonmarg", points: ["Drive to Sonmarg", "Scenic exploration and overnight stay"] },
  { day: "Day 4", title: "Pahalgam", points: ["Transfer to Pahalgam", "Local visits and overnight stay"] },
  { day: "Day 5", title: "Pahalgam", points: ["Second day in Pahalgam", "Leisure and overnight stay"] },
  { day: "Day 6", title: "Katra", points: ["Transfer to Katra", "Preparation for Vaishno Devi darshan"] },
  { day: "Day 7", title: "Katra", points: ["Vaishno Devi darshan support", "Overnight stay in Katra"] },
  { day: "Day 8", title: "Return", points: ["Check-out and return journey", "Tour concludes with drop-off"] },
];

const departures = [
  "Journey: 05/04/2027 | Return: 14/04/2027",
  "Journey: 12/04/2027 | Return: 21/04/2027",
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
  "Pony / Palki / Helicopter charges for Vaishno Devi",
  "Personal Expenses",
  "Laundry & Shopping",
  "Extra Meals & Extra Water Bottles",
  "Room Heater / Special Vehicle Charges if any",
];

const galleryItems = [
  { label: "Srinagar", src: "/kashmir.jpeg" },
  { label: "Gulmarg", src: "/group4.jpeg" },
  { label: "Sonmarg", src: "/group3.jpeg" },
  { label: "Pahalgam", src: "/group2.jpeg" },
  { label: "Katra", src: "/group1.jpeg" },
  { label: "Vaishno Devi Route", src: "/varanasi.jpeg" },
];

export default function KashmirVaishnoDeviPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">Important Information</h2>
              <div className="mt-6 space-y-4 text-white/80">
                <p><span className="font-semibold text-white">Package:</span> ₹22,000/-</p>
                <p><span className="font-semibold text-white">Journey Dates:</span> 05/04/2027 and 12/04/2027</p>
                <p><span className="font-semibold text-white">Return Dates:</span> 14/04/2027 and 21/04/2027</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Srinagar, Gulmarg, Sonmarg, Pahalgam, and Katra</p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </>
  );
}

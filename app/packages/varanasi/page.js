import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Varanasi",
  description: "January spiritual itinerary through Ayodhya, Prayagraj, and Varanasi.",
};

const itinerary = [
  { day: "Day 1", title: "Ayodhya", date: "08/01/2027", points: ["Arrival and transfer to Ayodhya", "Evening darshan and overnight stay"] },
  { day: "Day 2", title: "Prayagraj", date: "09/01/2027", points: ["Transfer to Prayagraj", "Temple and Sangam area visits"] },
  { day: "Day 3", title: "Varanasi", date: "10/01/2027", points: ["Travel to Varanasi", "Evening Ganga Aarti and stay"] },
  { day: "Day 4", title: "Varanasi", date: "11/01/2027", points: ["Varanasi local spiritual circuit", "Overnight stay"] },
  { day: "Day 5", title: "Return", date: "13/01/2027", points: ["Check-out and return journey", "Tour concludes with drop-off"] },
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
  "Boating & Optional Activities",
  "Personal Expenses",
  "Laundry & Shopping",
  "Extra Meals & Extra Water Bottles",
  "Room Heater / Special Vehicle Charges if any",
];

const galleryItems = [
  { label: "Ayodhya", src: "/group1.jpeg" },
  { label: "Prayagraj", src: "/group2.jpeg" },
  { label: "Varanasi Ghats", src: "/varanasi.jpeg" },
  { label: "Temple Circuit", src: "/group3.jpeg" },
  { label: "Spiritual Route", src: "/group4.jpeg" },
  { label: "Journey Moments", src: "/group5.jpeg" },
];

export default function VaranasiPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">Important Information</h2>
              <div className="mt-6 space-y-4 text-white/80">
                <p><span className="font-semibold text-white">Package:</span> ₹13,000/-</p>
                <p><span className="font-semibold text-white">Journey Date:</span> 08/01/2027</p>
                <p><span className="font-semibold text-white">Return Date:</span> 13/01/2027</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Ayodhya, Prayagraj, and Varanasi</p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Assam & Arunachal Pradesh",
  description: "March Assam and Arunachal Pradesh itinerary covering Guwahati, Bhalukpong, Dirang, Tawang, and Bomdilha.",
};

const itinerary = [
  { day: "Day 1", title: "Guwahati", points: ["Arrival and transfer to Guwahati", "Evening leisure and overnight stay"] },
  { day: "Day 2", title: "Bhalukpong", points: ["Scenic transfer to Bhalukpong", "Overnight stay"] },
  { day: "Day 3", title: "Dirang", points: ["Drive to Dirang", "Local sightseeing and overnight stay"] },
  { day: "Day 4", title: "Tawang", points: ["Transfer to Tawang via mountain passes", "Evening rest and overnight stay"] },
  { day: "Day 5", title: "Tawang", points: ["Full-day Tawang exploration", "Overnight stay"] },
  { day: "Day 6", title: "Bomdilha", points: ["Drive to Bomdilha", "Evening at leisure and overnight stay"] },
  { day: "Day 7", title: "Return", points: ["Check-out and return journey", "Tour concludes with drop-off"] },
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
  "Protected area permits and special zone fees",
  "Personal Expenses",
  "Laundry & Shopping",
  "Extra Meals & Extra Water Bottles",
  "Room Heater / Special Vehicle Charges if any",
];

const galleryItems = [
  { label: "Guwahati", src: "/group2.jpeg" },
  { label: "Bhalukpong", src: "/group3.jpeg" },
  { label: "Dirang", src: "/group4.jpeg" },
  { label: "Tawang", src: "/northbengal.jpeg" },
  { label: "Bomdilha", src: "/group1.jpeg" },
  { label: "Arunachal Route", src: "/kashmir.jpeg" },
];

export default function AssamArunachalPage() {
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
                <p><span className="font-semibold text-white">Journey Date:</span> 10/03/2027</p>
                <p><span className="font-semibold text-white">Return Date:</span> 17/03/2027</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Guwahati, Bhalukpong, Dirang, Tawang, and Bomdilha</p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </>
  );
}

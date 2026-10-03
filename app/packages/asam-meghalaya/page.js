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
        

        <section className="pb-10 sm:pb-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 sm:p-6 lg:p-8">
              <h2 className="text-2xl font-bold sm:text-3xl">Day-wise Itinerary</h2>
              <div className="mt-6 space-y-4">
                {itinerary.map((item) => (
                  <article
                    key={`${item.day}-${item.title}-${item.date ?? ""}`}
                    className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 sm:p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">{item.day}</p>
                    <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                    {item.date ? <p className="mt-1 text-sm text-amber-200">{item.date}</p> : null}
                    <ul className="mt-3 space-y-2 text-white/75">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-white/60" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-10 sm:pb-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 sm:p-6">
                <h2 className="text-2xl font-bold sm:text-3xl">Inclusions</h2>
                <ul className="mt-5 space-y-3 text-white/80">
                  {inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 block h-2 w-2 rounded-full bg-emerald-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 sm:p-6">
                <h2 className="text-2xl font-bold sm:text-3xl">Exclusions</h2>
                <ul className="mt-5 space-y-3 text-white/80">
                  {exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 block h-2 w-2 rounded-full bg-rose-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}



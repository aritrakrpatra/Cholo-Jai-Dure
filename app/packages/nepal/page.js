import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Nepal",
  description: "May Nepal itinerary covering Lumbini, Pokhra, Chitwan, Kathmandu, and Nagarkot.",
};

const itinerary = [
  {
    day: "Day 1",
    title: "Lumbini",
    date: "13/05/2027",
    points: ["Arrival and transfer to Lumbini", "Evening leisure and overnight stay"],
  },
  {
    day: "Day 2",
    title: "Pokhra",
    date: "14/05/2027",
    points: ["Transfer to Pokhra", "Lakeside evening and overnight stay"],
  },
  {
    day: "Day 3",
    title: "Pokhra",
    date: "15/05/2027",
    points: ["Pokhra local sightseeing", "Overnight stay"],
  },
  {
    day: "Day 4",
    title: "Chitwan",
    date: "16/05/2027",
    points: ["Transfer to Chitwan", "Evening cultural or nature experience"],
  },
  {
    day: "Day 5",
    title: "Chitwan",
    date: "17/05/2027",
    points: ["Chitwan exploration day", "Overnight stay"],
  },
  {
    day: "Day 6",
    title: "Kathmandu",
    date: "18/05/2027",
    points: ["Drive to Kathmandu", "Evening leisure and overnight stay"],
  },
  {
    day: "Day 7",
    title: "Kathmandu",
    date: "19/05/2027",
    points: ["Kathmandu heritage sightseeing", "Overnight stay"],
  },
  {
    day: "Day 8",
    title: "Nagarkot",
    date: "20/05/2027",
    points: ["Transfer to Nagarkot", "Sunset view and overnight stay"],
  },
  {
    day: "Day 9",
    title: "Return",
    date: "22/05/2027",
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
  "Boating & Adventure Activities",
  "Personal Expenses",
  "Laundry & Shopping",
  "Extra Meals & Extra Water Bottles",
  "Visa and border permit fees if applicable",
];

const galleryItems = [
  { label: "Lumbini", src: "/group6.jpeg" },
  { label: "Pokhra", src: "/group5.jpeg" },
  { label: "Chitwan", src: "/group3.jpeg" },
  { label: "Kathmandu", src: "/group2.jpeg" },
  { label: "Nagarkot", src: "/group4.jpeg" },
  { label: "Nepal Journey", src: "/group1.jpeg" },
];

export default function NepalPage() {
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
                <p><span className="font-semibold text-white">Journey Date:</span> 13/05/2027</p>
                <p><span className="font-semibold text-white">Return Date:</span> 22/05/2027</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Lumbini, Pokhra, Chitwan, Kathmandu, and Nagarkot</p>
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

        <section className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl">Gallery</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item) => (
                <figure
                  key={item.label}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80"
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={720}
                    height={460}
                    className="h-48 w-full object-cover"
                  />
                  <figcaption className="px-4 py-3 text-sm text-white/80">{item.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}



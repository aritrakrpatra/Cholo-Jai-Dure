import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";
import { getPackageBySlug } from "@/app/data/packages";

export const metadata = {
  title: "Nepal",
  description: "May Nepal itinerary covering Lumbini, Pokhra, Chitwan, Kathmandu, and Nagarkot.",
};

const itinerary = [
  {
    day: "Day 1",
    title: "Lumbini",
    points: ["Arrival and transfer to Lumbini", "Evening leisure and overnight stay"],
  },
  {
    day: "Day 2",
    title: "Pokhra",
    points: ["Transfer to Pokhra", "Lakeside evening and overnight stay"],
  },
  {
    day: "Day 3",
    title: "Pokhra",
    points: ["Pokhra local sightseeing", "Overnight stay"],
  },
  {
    day: "Day 4",
    title: "Chitwan",
    points: ["Transfer to Chitwan", "Evening cultural or nature experience"],
  },
  {
    day: "Day 5",
    title: "Chitwan",
    points: ["Chitwan exploration day", "Overnight stay"],
  },
  {
    day: "Day 6",
    title: "Kathmandu",
    points: ["Drive to Kathmandu", "Evening leisure and overnight stay"],
  },
  {
    day: "Day 7",
    title: "Kathmandu",
    points: ["Kathmandu heritage sightseeing", "Overnight stay"],
  },
  {
    day: "Day 8",
    title: "Nagarkot",
    points: ["Transfer to Nagarkot", "Sunset view and overnight stay"],
  },
  {
    day: "Day 9",
    title: "Return",
    points: ["Check-out and return journey", "Tour concludes with drop-off"],
  },
];

const departures = ["Journey: 16/10/2027 | Return: 25/10/2027"];

const inclusions = [
  "Station-to-station pick-up and drop-off as per the itinerary",
  "Transportation by tempo traveller, bus, Swift Dzire, or Innova as per group size and itinerary",
  "Standard hotel accommodation on double or triple sharing basis",
  "Breakfast, lunch, and dinner (authentic Bengali cuisine)",
  "Professional tour escort or travel guide throughout the tour",
  "Sightseeing as mentioned in the itinerary",
  "One litre of packaged drinking water per person per day",
];

const exclusions = [
  "Train, flight, or bus tickets unless specifically mentioned in the package",
  "Personal expenses such as laundry, telephone calls, room service, shopping, and tips",
  "Food and beverages not mentioned under inclusions",
  "Monument, museum, park, and attraction entry fees unless specifically mentioned",
  "Optional activities, rides, and adventure sports not included in the itinerary",
  "Any service or expense not specifically mentioned under inclusions",
];

const galleryItems = [
  { label: "Lumbini", src: "/group6.jpeg" },
  { label: "Pokhra", src: "/group5.jpeg" },
  { label: "Chitwan", src: "/group3.jpeg" },
  { label: "Kathmandu", src: "/group2.jpeg" },
  { label: "Nagarkot", src: "/group4.jpeg" },
  { label: "Nepal Journey", src: "/group1.jpeg" },
];

const packageInfo = getPackageBySlug("nepal");

export default function NepalPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <section className="border-b border-white/10 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Link
              href="/tours"
              className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-amber-300/40 hover:text-amber-200"
            >
              Back to Tours
            </Link>

            <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-amber-300">{packageInfo.duration}</p>
                <h1 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">{packageInfo.title}</h1>
                <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">{packageInfo.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <p className="text-2xl font-semibold text-amber-200">{packageInfo.price}</p>
                  <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
                    Fixed Group Dates
                  </span>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <BookNowButton packageName={packageInfo.title} packageId={packageInfo.slug} />
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl sm:p-6">
                <h2 className="text-lg font-semibold text-white sm:text-xl">Departure Batches</h2>
                <ul className="mt-4 space-y-3 text-sm text-white/80 sm:text-base">
                  {departures.map((departure) => (
                    <li key={departure} className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
                      {departure}
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
                    key={`${item.day}-${item.title}`}
                    className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 sm:p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">{item.day}</p>
                    <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
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



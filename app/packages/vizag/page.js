import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";
import { getPackageBySlug } from "@/app/data/packages";

export const metadata = {
  title: "Vizag",
  description: "August Vizag itinerary with a compact 3N/4D coastal getaway.",
};

const itinerary = [
  {
    day: "Day 1",
    title: "Vizag",
    date: "27/08/2027",
    points: ["Arrival and transfer to Vizag", "Evening at leisure and overnight stay"],
  },
  {
    day: "Day 2",
    title: "Vizag",
    date: "28/08/2027",
    points: ["Full-day Vizag sightseeing", "Beachside evening and overnight stay"],
  },
  {
    day: "Day 3",
    title: "Vizag",
    date: "29/08/2027",
    points: ["Local attractions and relaxed schedule", "Overnight stay in Vizag"],
  },
  {
    day: "Day 4",
    title: "Return",
    date: "31/08/2027",
    points: ["Check-out and return journey", "Tour ends with drop-off"],
  },
];

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
  { label: "Vizag Coast", src: "/group5.jpeg" },
  { label: "Beach Sunset", src: "/group4.jpeg" },
  { label: "City Tour", src: "/group2.jpeg" },
  { label: "Sea View", src: "/group7.jpeg" },
  { label: "Harbor Side", src: "/group6.jpeg" },
  { label: "Holiday Moments", src: "/group1.jpeg" },
];

const packageInfo = getPackageBySlug("vizag");

export default function VizagPage() {
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
            <div className="mt-8 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">{packageInfo.duration}</p>
              <h1 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">{packageInfo.title}</h1>
              <p className="mt-4 text-base text-white/75 sm:text-lg">{packageInfo.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <p className="text-2xl font-semibold text-amber-200">{packageInfo.price}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <BookNowButton packageName={packageInfo.title} packageId={packageInfo.slug} />
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



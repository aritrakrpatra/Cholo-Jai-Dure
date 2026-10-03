import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";
import { getPackageBySlug } from "@/app/data/packages";

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
  "✓ STATION-TO-STATION PICK-UP & DROP-OFF – AS PER THE ITINERARY",
  "✓ TRANSPORTATION – TEMPO TRAVELLER / BUS / SWIFT DZIRE / INNOVA, AS PER GROUP SIZE AND ITINERARY",
  "✓ ACCOMMODATION – STANDARD HOTELS ON DOUBLE / TRIPLE SHARING BASIS (AC / NON-AC AS PER DESTINATION & AVAILABILITY)",
  "✓ MEALS – BREAKFAST, LUNCH & DINNER (AUTHENTIC BENGALI CUISINE)",
  "✓ PROFESSIONAL TOUR ESCORT / TRAVEL GUIDE – THROUGHOUT THE TOUR",
  "✓ SIGHTSEEING – ALL SIGHTSEEING AS MENTIONED IN THE ITINERARY",
  "✓ PERMITS & REGISTRATIONS – LIMITED PERMITS AND REGISTRATIONS AS APPLICABLE",
  "✓ PACKAGED DRINKING WATER – 1 LITRE BOTTLE PER PERSON PER DAY",
];

const exclusions = [
  "✕ TRAIN / FLIGHT / BUS TICKETS – UNLESS SPECIFICALLY MENTIONED IN THE PACKAGE",
  "✕ PERSONAL EXPENSES – LAUNDRY, TELEPHONE CALLS, ROOM SERVICE, SHOPPING, TIPS, ETC.",
  "✕ ADDITIONAL FOOD & BEVERAGES – ANY MEALS, SNACKS, BEVERAGES OR FOOD ITEMS NOT MENTIONED UNDER INCLUSIONS",
  "✕ ADDITIONAL WATER BOTTLES – MORE THAN 1 LITRE PACKAGED DRINKING WATER PER PERSON PER DAY",
  "✕ ENTRY FEES – MONUMENT, MONASTERY, PARK, MUSEUM AND OTHER ATTRACTION ENTRY TICKETS UNLESS SPECIFICALLY MENTIONED",
  "✕ ADVENTURE ACTIVITIES – ANY OPTIONAL ACTIVITIES, RIDES OR ADVENTURE SPORTS NOT INCLUDED IN THE ITINERARY",
  "✕ PERMITS / REGISTRATIONS – ANY ADDITIONAL OR SPECIAL PERMITS BEYOND THOSE MENTIONED UNDER INCLUSIONS",
  "✕ ANYTHING NOT SPECIFICALLY MENTIONED – ANY SERVICE OR EXPENSE NOT CLEARLY STATED UNDER THE \"INCLUSIONS\" SECTION WILL BE CONSIDERED EXCLUDED",
];

const packageInfo = getPackageBySlug("spiti-valley");

export default function SpitiValleyPage() {
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



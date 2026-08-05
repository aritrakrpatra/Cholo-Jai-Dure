import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Daringbari & Gopalpur",
  description: "September Daringbari and Gopalpur itinerary with a compact hill-and-coast route.",
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
    title: "Daringbari",
    date: "September Batch",
    points: ["Arrival and transfer to Daringbari", "Enjoy the hill station evening and overnight stay"],
  },
  {
    day: "Day 2",
    title: "Gopalpur",
    date: "September Batch",
    points: ["Drive to Gopalpur by the coast", "Relax at the beach and stay overnight"],
  },
  {
    day: "Day 3",
    title: "Gopalpur",
    date: "September Batch",
    points: ["Local sightseeing and beach time", "Evening leisure and another overnight stay"],
  },
  {
    day: "Day 4",
    title: "Return",
    date: "September Batch",
    points: ["Check-out and return journey", "Tour concludes with drop-off"],
  },
];

const galleryItems = [
  { label: "Daringbari", src: "/group6.jpeg" },
  { label: "Gopalpur Coast", src: "/group5.jpeg" },
  { label: "Hill Views", src: "/group3.jpeg" },
  { label: "Beach Time", src: "/group4.jpeg" },
  { label: "Odisha Tour", src: "/group2.jpeg" },
  { label: "Travel Moments", src: "/group1.jpeg" },
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

export default function DaringbariGopalpurPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(15,23,42,0.45), rgba(15,23,42,0.92)), url('/group6.jpeg')",
            }}
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[1.65fr_0.95fr] lg:items-end">
              <div className="space-y-4">
                <span className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-amber-200">
                  September Tour
                </span>
                <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">Daringbari &amp; Gopalpur</h1>
                <p className="max-w-3xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8 md:text-xl">
                  A compact September route combining the cool hills of Daringbari with the relaxed coastal stretch of Gopalpur.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-amber-400/10 px-4 py-2 text-base font-semibold text-amber-200 ring-1 ring-amber-300/20 sm:px-5 sm:py-3 sm:text-lg">
                    ₹10,000 per person
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm">
                    3 Nights · 4 Days · September Batch
                  </span>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                  <BookNowButton packageName="Daringbari & Gopalpur" packageId="daringbari-gopalpur" />
                  <Link
                    href="/contact"
                    className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold transition hover:bg-white/10 sm:px-7 sm:py-4"
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>

              <aside className="rounded-4xl border border-white/10 bg-slate-900/85 p-4 shadow-2xl backdrop-blur-xl sm:p-8">
                <div className="space-y-4">
                  <div className="rounded-4xl border border-amber-300/10 bg-slate-950/90 p-5">
                    <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Journey Details</p>
                    <div className="mt-5 space-y-3 text-sm text-white/80">
                      <p><span className="font-semibold text-white">Journey:</span> September batch</p>
                      <p><span className="font-semibold text-white">Return:</span> September batch</p>
                      <p><span className="font-semibold text-white">Route:</span> Daringbari → Gopalpur → Gopalpur → Return</p>
                    </div>
                  </div>
                  <div className="rounded-4xl border border-white/10 bg-slate-950/90 p-5">
                    <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Travel Concierge</p>
                    <p className="mt-4 text-2xl font-semibold text-white">A small-group holiday with hill views and sea breeze.</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Itinerary Timeline</p>
              <h2 className="mt-4 text-2xl font-bold sm:text-4xl">Your September route day by day</h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                A short and easy-paced tour that moves from the hills of Daringbari to the coast of Gopalpur.
              </p>
            </div>
            <div className="space-y-10">
              {itinerary.map((item) => (
                <div key={item.day} className="grid gap-6 rounded-4xl border border-white/10 bg-slate-900/90 p-8 lg:grid-cols-[140px_1fr] lg:items-start">
                  <div className="rounded-3xl bg-slate-950/80 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.35em] text-amber-300">{item.day}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{item.date}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <ul className="mt-3 space-y-2 text-white/70">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-2 text-sm leading-7">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="rounded-4xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-10">
                <div>
                  <h2 className="text-xl font-bold sm:text-2xl">Inclusions</h2>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 rounded-2xl bg-slate-950/80 px-3 py-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-bold sm:text-2xl">Exclusions</h2>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {exclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 rounded-2xl bg-slate-950/80 px-3 py-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-red-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">Gallery</h2>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-4">
                {galleryItems.map((item) => (
                  <div key={item.label} className="overflow-hidden rounded-[1.25rem] bg-white/5 sm:rounded-[1.75rem]">
                    <Image
                      src={item.src}
                      alt={item.label}
                      width={800}
                      height={1000}
                      className="h-36 w-full object-cover transition duration-500 hover:scale-105 sm:h-52 lg:h-64"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">Important Information</h2>
              <div className="mt-6 space-y-4 text-white/80">
                <p><span className="font-semibold text-white">Package:</span> ₹10,000/-</p>
                <p><span className="font-semibold text-white">Journey:</span> September batch</p>
                <p><span className="font-semibold text-white">Return:</span> September batch</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Daringbari and Gopalpur</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-slate-950/90 py-10 text-center text-sm text-white/70">
          <p>© 2026 Cholo Jai Dure Tour & Travels. All Rights Reserved.</p>
        </footer>
      </main>
    </>
  );
}

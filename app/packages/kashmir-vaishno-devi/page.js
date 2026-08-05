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
                <p className="text-sm uppercase tracking-[0.3em] text-amber-300">8D / 7N Group Departure</p>
                <h1 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">Kashmir & Vaishno Devi</h1>
                <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
                  Scenic Kashmir and spiritual Vaishno Devi in one route with two April departure batches.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <p className="text-2xl font-semibold text-amber-200">Rs 22,000/- per person</p>
                  <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
                    Fixed Group Dates
                  </span>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <BookNowButton packageName="Kashmir & Vaishno Devi" packageId="kashmir-vaishno-devi" />
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

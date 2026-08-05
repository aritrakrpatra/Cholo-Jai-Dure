import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Ladakh",
  description: "June Ladakh itinerary covering Srinagar, Kargil, Leh, Nubra Valley, Pangong Tso, Jispa, and Manali.",
};

const itinerary = [
  {
    day: "Day 1",
    title: "Srinagar",
    date: "07/06/2027",
    points: ["Arrival and transfer to Srinagar", "Evening rest and overnight stay"],
  },
  {
    day: "Day 2",
    title: "Kargil",
    date: "08/06/2027",
    points: ["Scenic drive to Kargil", "Overnight stay in Kargil"],
  },
  {
    day: "Day 3",
    title: "Leh",
    date: "09/06/2027",
    points: ["Transfer to Leh through mountain passes", "Acclimatization and overnight stay"],
  },
  {
    day: "Day 4",
    title: "Leh",
    date: "10/06/2027",
    points: ["Leh local sightseeing", "Overnight stay in Leh"],
  },
  {
    day: "Day 5",
    title: "Nubra Valley",
    date: "11/06/2027",
    points: ["Drive to Nubra Valley", "Camp or hotel stay in Nubra"],
  },
  {
    day: "Day 6",
    title: "Nubra Valley",
    date: "12/06/2027",
    points: ["Nubra local exploration", "Second overnight stay in Nubra Valley"],
  },
  {
    day: "Day 7",
    title: "Pangong Tso",
    date: "13/06/2027",
    points: ["Transfer to Pangong Tso", "Lakeside stay and leisure"],
  },
  {
    day: "Day 8",
    title: "Leh",
    date: "14/06/2027",
    points: ["Return to Leh", "Rest and local market time"],
  },
  {
    day: "Day 9",
    title: "Jispa",
    date: "15/06/2027",
    points: ["Drive toward Himachal via high passes", "Overnight stay in Jispa"],
  },
  {
    day: "Day 10",
    title: "Manali",
    date: "16/06/2027",
    points: ["Transfer to Manali", "Evening at leisure and overnight stay"],
  },
  {
    day: "Day 11",
    title: "Return",
    date: "19/06/2027",
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
  "Adventure Activities and ATV/Camel rides",
  "Personal Expenses",
  "Laundry & Shopping",
  "Extra Meals & Extra Water Bottles",
  "Oxygen/medical emergency charges if any",
];

const galleryItems = [
  { label: "Ladakh", src: "/ladakh.jpeg" },
  { label: "Leh", src: "/group3.jpeg" },
  { label: "Nubra Valley", src: "/group2.jpeg" },
  { label: "Pangong Tso", src: "/group4.jpeg" },
  { label: "Mountain Route", src: "/manali.jpeg" },
  { label: "Himalayan Drive", src: "/kashmir.jpeg" },
];

export default function LadakhPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        

        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">Important Information</h2>
              <div className="mt-6 space-y-4 text-white/80">
                <p><span className="font-semibold text-white">Package:</span> ₹34,000/-</p>
                <p><span className="font-semibold text-white">Journey Date:</span> 07/06/2027</p>
                <p><span className="font-semibold text-white">Return Date:</span> 19/06/2027</p>
                <p><span className="font-semibold text-white">Route Highlight:</span> Srinagar, Leh, Nubra Valley, Pangong Tso, Jispa, and Manali</p>
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



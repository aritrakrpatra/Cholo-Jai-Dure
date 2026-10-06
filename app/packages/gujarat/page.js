import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";

export const metadata = {
  title: "Gujarat",
  description: "A complete Gujarat discovery covering heritage, wildlife, temples, and coast with an October group departure.",
};

const itinerary = [
  { day: "Day 1", title: "Vadodara", points: ["Visit Statue of Unity", "Explore Aatapi Wonderland and Ajwa Lake", "Overnight stay in Vadodara"] },
  { day: "Day 2", title: "Vadodara to Ahmedabad", points: ["Transfer to Ahmedabad", "Visit Sabarmati Ashram, Adalaj Stepwell, and Akshardham Temple", "Overnight stay in Ahmedabad"] },
  { day: "Day 3", title: "Ahmedabad", points: ["Visit Sabarmati Riverfront and Atal Foot Bridge", "Explore Hutheesing Jain Temple, Law Garden, and Swaminarayan Temple", "Overnight stay in Ahmedabad"] },
  { day: "Day 4", title: "Ahmedabad to Bhavnagar", points: ["Transfer to Bhavnagar", "Visit Takhteshwar Temple, Victoria Park, and Gaurishankar Lake", "Overnight stay in Bhavnagar"] },
  { day: "Day 5", title: "Bhavnagar to Gir", points: ["Transfer to Gir", "Gir Jungle Safari and Devalia Park visit", "Overnight stay near Gir"] },
  { day: "Day 6", title: "Gir to Diu to Somnath", points: ["Visit Diu Beach, Nagoa Beach, and Diu Fort", "Darshan at Somnath Temple, Bhalka Tirth, and Triveni Sangam", "Overnight stay in Somnath"] },
  { day: "Day 7", title: "Somnath to Dwarka", points: ["Transfer to Dwarka", "Darshan at Dwarkadhish Temple and visit Gomti Ghat", "Overnight stay in Dwarka"] },
  { day: "Day 8", title: "Bet Dwarka Excursion", points: ["Visit Bet Dwarka, Nageshwar Jyotirlinga, and Rukmini Mata Temple", "Overnight stay in Dwarka"] },
  { day: "Day 9", title: "Dwarka to Rajkot", points: ["Transfer to Rajkot", "Visit Kaba Gandhi No Delo, Watson Museum, and Race Course", "Overnight stay in Rajkot"] },
  { day: "Day 10", title: "Return", points: ["Check-out and return journey", "Tour concludes with drop-off"] },
];

const departures = [
  "Journey: 16/10/2027 | Return: 27/10/2027",
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
  { label: "Vadodara", src: "/group3.jpeg" },
  { label: "Ahmedabad", src: "/group1.jpeg" },
  { label: "Gir National Park", src: "/northbengal.jpeg" },
  { label: "Diu Beach", src: "/group5.jpeg" },
  { label: "Somnath Temple", src: "/group4.jpeg" },
  { label: "Dwarkadhish Temple", src: "/group2.jpeg" },
];

export default function GujaratPage() {
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
                <p className="text-sm uppercase tracking-[0.3em] text-amber-300">10D / 9N Group Departure</p>
                <h1 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">Gujarat</h1>
                <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
                  A complete Gujarat discovery covering heritage, wildlife, temples, and coast across three group departure batches.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <p className="text-2xl font-semibold text-amber-200">Rs 30,000/- per person</p>
                  <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
                    Fixed Group Dates
                  </span>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <BookNowButton packageName="Gujarat" packageId="gujarat" />
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


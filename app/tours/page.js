"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";
import { allPackages as tours } from "@/app/data/packages";

const monthOrder = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MIN_BUDGET_LIMIT = 8000;
const MAX_BUDGET_LIMIT = 50000;

function parseTourPrice(priceText) {
  if (!priceText) return null;

  const match = String(priceText).match(/\d[\d,]*/);
  if (!match) return null;

  const parsed = Number(match[0].replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

const tourMonthsBySlug = {
  "tamilnadu-kerala": ["October", "November", "December", "January", "February", "March"],
  kashmir: ["April", "May", "June", "July", "August", "September"],
  "kashmir-vaishno-devi": ["April", "May", "June", "July", "August", "September"],
  nainital: ["March", "April", "May", "June", "September", "October"],
  "asam-arunachal": ["October", "November", "December", "January", "February", "March", "April"],
  "asam-meghalaya": ["October", "November", "December", "January", "February", "March", "April"],
  varanasi: ["October", "November", "December", "January", "February", "March"],
  puri: ["October", "November", "December", "January", "February", "March"],
  vizag: ["October", "November", "December", "January", "February"],
  "daringbari-gopalpur": ["October", "November", "December", "January", "February", "March"],
  goa: ["November", "December", "January", "February", "March"],
  rajasthan: ["October", "November", "December", "January", "February", "March"],
  ladakh: ["June", "July", "August", "September"],
  "spiti-valley": ["May", "June", "July", "August", "September", "October"],
  ujjain: ["October", "November", "December", "January", "February", "March"],
  "khajuraho-chitrakoot": ["October", "November", "December", "January", "February", "March"],
  gujarat: ["October", "November", "December", "January", "February", "March"],
  "do-dham-yatra": ["May", "June", "September", "October"],
  "kanha-bandhavgarh": ["October", "November", "December", "January", "February", "March", "April", "May"],
  "shimla-manali": ["March", "April", "May", "June", "September", "October", "November"],
  "south-india": ["October", "November", "December", "January", "February", "March"],
  "maharashtra-spiritual": ["October", "November", "December", "January", "February", "March"],
  "auli-chopta": ["October", "November", "December", "January", "February", "March"],
  darjeeling: ["March", "April", "May", "October", "November"],
  sikkim: ["March", "April", "May", "October", "November"],
  kerala: ["September", "October", "November", "December", "January", "February", "March"],
  "adiyogi-darshan": ["October", "November", "December", "January", "February", "March"],
  "amritsar-dalhousie-dharamshala": ["March", "April", "May", "October", "November"],
  andaman: ["October", "November", "December", "January", "February", "March", "April"],
  thailand: ["November", "December", "January", "February", "March"],
  vietnam: ["October", "November", "December", "January", "February", "March"],
  "amarnath-yatra": ["June", "July", "August"],
};

function getTourMonths(tour) {
  return tourMonthsBySlug[tour.slug] ?? monthOrder;
}

function isInternationalTour(tour) {
  return tour.category === "international";
}

export default function ToursPage() {
  const searchParams = useSearchParams();
  const tourCategory = searchParams.get("category") === "international" ? "international" : "domestic";
  const [query, setQuery] = useState("");
  const [tourType, setTourType] = useState("group");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [budgetValue, setBudgetValue] = useState(MAX_BUDGET_LIMIT);

  const filteredTours = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return tours.filter((tour) => {
      const matchesCategory = tourCategory === "international"
        ? isInternationalTour(tour)
        : !isInternationalTour(tour);

      const matchesQuery =
        !normalized ||
        tour.title.toLowerCase().includes(normalized) ||
        tour.subtitle.toLowerCase().includes(normalized);

      const matchesMonth =
        selectedMonth === "all" || getTourMonths(tour).includes(selectedMonth);

      const tourPrice = parseTourPrice(tour.price);
      const matchesBudget =
        tourPrice !== null &&
        tourPrice >= MIN_BUDGET_LIMIT &&
        tourPrice <= budgetValue;

      return matchesCategory && matchesQuery && matchesMonth && matchesBudget;
    });
  }, [query, selectedMonth, budgetValue, tourCategory]);

  return (
    <>
      <Navbar />
      <main className="theme-bg min-h-screen py-16 text-foreground sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Tour List</p>
            <h1 className="mt-4 text-2xl font-bold sm:text-4xl">
              {tourCategory === "international" ? "International Tour" : "Choose Your Tour"}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-(--muted) sm:text-base">
              {tourCategory === "international"
                ? "Explore our international tours and open any package card for full details."
                : "Search and pick a place. Clicking any card opens package details directly."}
            </p>
          </div>

          {tourCategory === "international" ? (
            <div>
              <div className="mb-8">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search place by name or duration"
                    className="w-full rounded-3xl border border-(--border) bg-(--surface) px-5 py-3 text-sm text-foreground outline-none placeholder:text-(--muted) focus:border-amber-300/60"
                  />
                  <select
                    value={selectedMonth}
                    onChange={(event) => setSelectedMonth(event.target.value)}
                    className="w-full rounded-3xl border border-(--border) bg-(--surface) px-5 py-3 text-sm text-foreground outline-none focus:border-amber-300/60"
                  >
                    <option value="all">All Months</option>
                    {monthOrder.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 rounded-3xl border border-(--border) bg-(--surface) p-4 sm:p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">Budget Filter</p>
                    <p className="text-xs text-(--muted)">
                      ₹{MIN_BUDGET_LIMIT.toLocaleString("en-IN")} - ₹{budgetValue.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs text-(--muted)">Move pointer from minimum to maximum budget</label>
                    <input
                      type="range"
                      min={MIN_BUDGET_LIMIT}
                      max={MAX_BUDGET_LIMIT}
                      step={1000}
                      value={budgetValue}
                      onChange={(event) => setBudgetValue(Number(event.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-amber-200/35 accent-amber-400"
                    />
                    <div className="mt-2 flex items-center justify-between text-xs text-(--muted)">
                      <span>₹{MIN_BUDGET_LIMIT.toLocaleString("en-IN")}</span>
                      <span>₹{MAX_BUDGET_LIMIT.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTours.map((tour) => (
                  <div
                    key={tour.slug}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-(--border) bg-(--surface-strong) transition hover:border-amber-300/40"
                  >
                    <Link href={tour.packagePath} className="block flex-1">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        width={640}
                        height={360}
                        className="h-36 w-full object-cover sm:h-28"
                      />
                      <div className="p-4">
                        <p className="text-[11px] uppercase tracking-[0.25em] text-amber-300">{tour.subtitle}</p>
                        <h2 className="mt-1 text-lg font-semibold text-foreground">{tour.title}</h2>
                        <p className="mt-1 text-sm text-(--muted)">{tour.price}</p>
                        <p className="mt-2 text-xs text-(--muted)">
                          Best months: {getTourMonths(tour).slice(0, 3).join(", ")}
                          {getTourMonths(tour).length > 3 ? "..." : ""}
                        </p>
                      </div>
                    </Link>
                    <div className="px-4 pb-4">
                      <BookNowButton
                        packageName={tour.title}
                        packageId={tour.slug}
                        variant="outline"
                        className="w-full text-xs py-2"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {filteredTours.length === 0 && (
                <p className="mt-8 text-center text-sm text-(--muted)">
                  No international tours found for this search and budget range.
                </p>
              )}
            </div>
          ) : (
            <>
              <div className="mb-8 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setTourType("group")}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    tourType === "group"
                      ? "bg-amber-400 text-slate-950"
                      : "border border-(--border) bg-(--surface) text-foreground hover:border-amber-300/50"
                  }`}
                >
                  Group Tour
                </button>
                <button
                  type="button"
                  onClick={() => setTourType("customize")}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    tourType === "customize"
                      ? "bg-amber-400 text-slate-950"
                      : "border border-(--border) bg-(--surface) text-foreground hover:border-amber-300/50"
                  }`}
                >
                  Customize Tour
                </button>
              </div>

              {tourType === "group" ? (
                <>
              <div className="mb-8">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search place by name or duration"
                    className="w-full rounded-3xl border border-(--border) bg-(--surface) px-5 py-3 text-sm text-foreground outline-none placeholder:text-(--muted) focus:border-amber-300/60"
                  />
                  <select
                    value={selectedMonth}
                    onChange={(event) => setSelectedMonth(event.target.value)}
                    className="w-full rounded-3xl border border-(--border) bg-(--surface) px-5 py-3 text-sm text-foreground outline-none focus:border-amber-300/60"
                  >
                    <option value="all">All Months</option>
                    {monthOrder.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 rounded-3xl border border-(--border) bg-(--surface) p-4 sm:p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">Budget Filter</p>
                    <p className="text-xs text-(--muted)">
                      ₹{MIN_BUDGET_LIMIT.toLocaleString("en-IN")} - ₹{budgetValue.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs text-(--muted)">Move pointer from minimum to maximum budget</label>
                    <input
                      type="range"
                      min={MIN_BUDGET_LIMIT}
                      max={MAX_BUDGET_LIMIT}
                      step={1000}
                      value={budgetValue}
                      onChange={(event) => setBudgetValue(Number(event.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-amber-200/35 accent-amber-400"
                    />
                    <div className="mt-2 flex items-center justify-between text-xs text-(--muted)">
                      <span>₹{MIN_BUDGET_LIMIT.toLocaleString("en-IN")}</span>
                      <span>₹{MAX_BUDGET_LIMIT.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTours.map((tour) => (
                  <div
                    key={tour.slug}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-(--border) bg-(--surface-strong) transition hover:border-amber-300/40"
                  >
                    <Link href={tour.packagePath} className="block flex-1">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        width={640}
                        height={360}
                        className="h-36 w-full object-cover sm:h-28"
                      />
                      <div className="p-4">
                        <p className="text-[11px] uppercase tracking-[0.25em] text-amber-300">{tour.subtitle}</p>
                        <h2 className="mt-1 text-lg font-semibold text-foreground">{tour.title}</h2>
                        <p className="mt-1 text-sm text-(--muted)">{tour.price}</p>
                        <p className="mt-2 text-xs text-(--muted)">
                          Best months: {getTourMonths(tour).slice(0, 3).join(", ")}
                          {getTourMonths(tour).length > 3 ? "..." : ""}
                        </p>
                      </div>
                    </Link>
                    <div className="px-4 pb-4">
                      <BookNowButton
                        packageName={tour.title}
                        packageId={tour.slug}
                        variant="outline"
                        className="w-full text-xs py-2"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {filteredTours.length === 0 && (
                <p className="mt-8 text-center text-sm text-(--muted)">
                  No tours found for this search and budget range.
                </p>
              )}
                </>
              ) : (
                <div className="theme-surface-strong rounded-3xl p-6 text-center sm:p-10">
                  <h2 className="text-xl font-semibold text-foreground">Customize Tour</h2>
                  <p className="mt-3 text-sm text-(--muted) sm:text-base">
                    Customize tour options will appear here. You can add the data anytime, and this section is ready for it.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

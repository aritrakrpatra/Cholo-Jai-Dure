"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";
import { visiblePackages as tours } from "@/app/data/packages";

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

function getTourMonths(tour) {
  return (tour.travelDateOptions ?? [])
    .filter((date) => typeof date === "string")
    .map((date) => monthOrder[Number(date.slice(5, 7)) - 1])
    .filter(Boolean);
}

function isInternationalTour(tour) {
  return tour.category === "international";
}

function formatTravelDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ToursPageContent() {
  const searchParams = useSearchParams();
  const tourCategory = searchParams.get("category") === "international" ? "international" : "domestic";
  const [query, setQuery] = useState("");
  const [tourType, setTourType] = useState("group");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [customEnquiry, setCustomEnquiry] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    travelDate: "",
    travelers: "",
    budget: "",
    preferences: "",
  });
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);
  const [enquiryStatus, setEnquiryStatus] = useState({ type: "", message: "" });
  const availableMonths = monthOrder.filter((month) =>
    tours.some((tour) => !isInternationalTour(tour) && getTourMonths(tour).includes(month)),
  );

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
        tourCategory === "international" ||
        selectedMonth === "all" ||
        getTourMonths(tour).includes(selectedMonth);

      return matchesCategory && matchesQuery && matchesMonth;
    });
  }, [query, selectedMonth, tourCategory]);

  function handleEnquiryChange(event) {
    const { name, value } = event.target;
    setCustomEnquiry((current) => ({ ...current, [name]: value }));
  }

  async function handleEnquirySubmit(event) {
    event.preventDefault();
    setEnquiryStatus({ type: "", message: "" });
    setIsSubmittingEnquiry(true);

    const message = [
      "Customized tour enquiry",
      `Destination: ${customEnquiry.destination || "Not specified"}`,
      `Travel date: ${customEnquiry.travelDate || "Flexible"}`,
      `Travelers: ${customEnquiry.travelers || "Not specified"}`,
      `Estimated budget per person: ${customEnquiry.budget || "Not specified"}`,
      `Preferences: ${customEnquiry.preferences || "Not specified"}`,
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customEnquiry.name,
          phone: customEnquiry.phone,
          email: customEnquiry.email,
          message,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setEnquiryStatus({ type: "error", message: result?.message || "Unable to send enquiry. Please try again." });
        return;
      }

      setEnquiryStatus({ type: "success", message: "Enquiry sent. Our team will contact you soon." });
      setCustomEnquiry({
        name: "",
        phone: "",
        email: "",
        destination: "",
        travelDate: "",
        travelers: "",
        budget: "",
        preferences: "",
      });
    } catch {
      setEnquiryStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setIsSubmittingEnquiry(false);
    }
  }

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
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search place by name or duration"
                  className="w-full rounded-3xl border border-(--border) bg-(--surface) px-5 py-3 text-sm text-foreground outline-none placeholder:text-(--muted) focus:border-amber-300/60"
                />
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
                  No international tours found for this search.
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
                    {availableMonths.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
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
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <p className="text-[11px] uppercase tracking-[0.25em] text-amber-300">{tour.subtitle}</p>
                          {Array.isArray(tour.travelDateOptions) && tour.travelDateOptions.length > 0 && (
                            <p className="text-[11px] font-semibold text-emerald-300">
                              DOJ: {tour.travelDateOptions.map(formatTravelDate).join(" / ")}
                            </p>
                          )}
                        </div>
                        <h2 className="mt-1 text-lg font-semibold text-foreground">{tour.title}</h2>
                        <p className="mt-1 text-sm text-(--muted)">{tour.price}</p>
                      </div>
                    </Link>
                    <div className="flex gap-2 px-4 pb-4">
                      <Link
                        href={tour.packagePath}
                        className="flex w-full items-center justify-center rounded-full border border-(--border) px-3 py-2 text-xs font-semibold text-foreground transition hover:border-amber-300/50"
                      >
                        Explore
                      </Link>
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
                  No tours found for this search.
                </p>
              )}
                </>
              ) : (
                <div className="theme-surface-strong rounded-3xl p-6 sm:p-8">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-foreground">Plan a Custom Tour</h2>
                    <p className="mt-2 text-sm text-(--muted) sm:text-base">
                      Share your trip details and our team will help plan an itinerary around you.
                    </p>
                  </div>
                  <form onSubmit={handleEnquirySubmit} className="grid gap-4 sm:grid-cols-2">
                    <input
                      name="name"
                      value={customEnquiry.name}
                      onChange={handleEnquiryChange}
                      placeholder="Your name"
                      autoComplete="name"
                      required
                      className="w-full rounded-2xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-foreground outline-none placeholder:text-(--muted) focus:border-amber-300/60"
                    />
                    <input
                      name="phone"
                      type="tel"
                      value={customEnquiry.phone}
                      onChange={handleEnquiryChange}
                      placeholder="Phone number"
                      autoComplete="tel"
                      required
                      className="w-full rounded-2xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-foreground outline-none placeholder:text-(--muted) focus:border-amber-300/60"
                    />
                    <input
                      name="email"
                      type="email"
                      value={customEnquiry.email}
                      onChange={handleEnquiryChange}
                      placeholder="Email address"
                      autoComplete="email"
                      required
                      className="w-full rounded-2xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-foreground outline-none placeholder:text-(--muted) focus:border-amber-300/60"
                    />
                    <input
                      name="destination"
                      value={customEnquiry.destination}
                      onChange={handleEnquiryChange}
                      placeholder="Destination or places to visit"
                      className="w-full rounded-2xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-foreground outline-none placeholder:text-(--muted) focus:border-amber-300/60"
                    />
                    <label className="grid gap-2 text-sm text-(--muted)">
                      Travel date
                      <input
                        name="travelDate"
                        type="date"
                        value={customEnquiry.travelDate}
                        onChange={handleEnquiryChange}
                        className="w-full rounded-2xl border border-(--border) bg-(--surface) px-4 py-3 text-foreground outline-none focus:border-amber-300/60"
                      />
                    </label>
                    <label className="grid gap-2 text-sm text-(--muted)">
                      Number of travelers
                      <input
                        name="travelers"
                        type="number"
                        min="1"
                        value={customEnquiry.travelers}
                        onChange={handleEnquiryChange}
                        placeholder="e.g. 4"
                        className="w-full rounded-2xl border border-(--border) bg-(--surface) px-4 py-3 text-foreground outline-none placeholder:text-(--muted) focus:border-amber-300/60"
                      />
                    </label>
                    <label className="grid gap-2 text-sm text-(--muted) sm:col-span-2">
                      Estimated budget per person
                      <input
                        name="budget"
                        value={customEnquiry.budget}
                        onChange={handleEnquiryChange}
                        placeholder="e.g. Rs 25,000"
                        className="w-full rounded-2xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-foreground outline-none placeholder:text-(--muted) focus:border-amber-300/60"
                      />
                    </label>
                    <label className="grid gap-2 text-sm text-(--muted) sm:col-span-2">
                      Trip preferences
                      <textarea
                        name="preferences"
                        value={customEnquiry.preferences}
                        onChange={handleEnquiryChange}
                        rows={4}
                        placeholder="Tell us about your preferred pace, activities, or accommodation"
                        className="w-full resize-y rounded-2xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-foreground outline-none placeholder:text-(--muted) focus:border-amber-300/60"
                      />
                    </label>
                    {enquiryStatus.message && (
                      <p
                        role="status"
                        className={`sm:col-span-2 rounded-2xl border px-4 py-3 text-sm ${
                          enquiryStatus.type === "success"
                            ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-700"
                            : "border-red-400/40 bg-red-500/10 text-red-700"
                        }`}
                      >
                        {enquiryStatus.message}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmittingEnquiry}
                      className="sm:col-span-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmittingEnquiry ? "Sending..." : "Send Custom Tour Enquiry"}
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default function ToursPage() {
  return (
    <Suspense fallback={null}>
      <ToursPageContent />
    </Suspense>
  );
}

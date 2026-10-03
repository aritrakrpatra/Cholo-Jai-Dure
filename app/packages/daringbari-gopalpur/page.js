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

export default function DaringbariGopalpurPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        

        
      </main>
    </>
  );
}

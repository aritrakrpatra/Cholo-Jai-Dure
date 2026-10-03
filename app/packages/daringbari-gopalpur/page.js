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

export default function DaringbariGopalpurPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        

        
      </main>
    </>
  );
}

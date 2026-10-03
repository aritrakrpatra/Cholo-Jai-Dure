import Navbar from "@/app/components/Navbar";
import RulesAndRegulations from "@/app/components/RulesAndRegulations";

export const metadata = {
  title: "Rules & Regulations",
  description: "Booking, payment, cancellation, and conduct rules for Cholo Jai Dure Tour & Travels.",
};

export default function RulesRegulationsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <section className="border-b border-white/10 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Travel Policy</p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">Rules & Regulation</h1>
            <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
              Please read the booking, payment, cancellation, and conduct guidelines below before confirming your tour.
            </p>
          </div>
        </section>

        <RulesAndRegulations />
      </main>
    </>
  );
}

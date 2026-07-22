import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import BookNowButton from "@/app/components/BookNowButton";
import { featuredPackages as featuredTours, getPackageBySlug } from "@/app/data/packages";

export function generateStaticParams() {
  const staticSlugs = ["do-dham-yatra", "gujarat"];
  return featuredTours
    .filter((tour) => !staticSlugs.includes(tour.slug))
    .map((tour) => ({ slug: tour.slug }));
}

export default async function PackageDetailsFallbackPage({ params }) {
  const { slug } = await params;
  const tour = getPackageBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Link
            href="/tours"
            className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-amber-300/40 hover:text-amber-200"
          >
            Back to Tours
          </Link>

          <article className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 sm:rounded-4xl">
            <Image
              src={tour.image}
              alt={tour.title}
              width={1600}
              height={900}
              className="h-48 w-full object-cover sm:h-64 md:h-80"
            />
            <div className="p-4 sm:p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">{tour.subtitle}</p>
              <h1 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">{tour.title} Package Details</h1>
              <p className="mt-4 text-lg text-white/70">{tour.description}</p>
              <p className="mt-5 text-xl font-semibold text-amber-200">{tour.price}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <BookNowButton packageName={tour.title} packageId={tour.slug} />
              </div>
              <p className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white/70">
                This package page is now active in the common package details format. A dedicated custom package layout can be added anytime.
              </p>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}

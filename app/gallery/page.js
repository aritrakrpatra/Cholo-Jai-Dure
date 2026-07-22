import Image from "next/image";
import Navbar from "../components/Navbar";

export default function CustomerGallery() {
  const images = [
    "/house-boat.jpeg",
    "/group1.jpeg",
    "/group2.jpeg",
    "/group3.jpeg",
    "/group4.jpeg",
    "/group5.jpeg",
    "/group6.jpeg",
    "/group7.jpeg",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl font-bold text-center mb-4 sm:text-4xl md:text-5xl sm:mb-8">
            Customer Gallery
          </h1>
          <p className="max-w-3xl mx-auto text-center text-sm text-white/70 mb-10 sm:text-lg sm:mb-12">
            Explore moments from our tours placed by happy customers and travel groups.
          </p>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Customer gallery ${index + 1}`}
                width={720}
                height={960}
                className="h-40 w-full rounded-2xl object-cover shadow-2xl transition-transform duration-500 hover:scale-105 sm:h-56 md:h-64 lg:h-72 sm:rounded-3xl"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

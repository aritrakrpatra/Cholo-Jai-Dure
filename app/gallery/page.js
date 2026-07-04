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

      <main className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-center mb-8">
            Customer Gallery
          </h1>
          <p className="max-w-3xl mx-auto text-center text-lg text-white/70 mb-12">
            Explore moments from our tours placed by happy customers and travel groups.
          </p>

          <div className="grid gap-4 md:grid-cols-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Customer gallery ${index + 1}`}
                className="h-72 w-full rounded-3xl object-cover shadow-2xl transition-transform duration-500 hover:scale-105"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

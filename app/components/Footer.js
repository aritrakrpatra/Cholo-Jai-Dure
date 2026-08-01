import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-black text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="order-1">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <div className="mt-4 space-y-2.5 text-sm">
              <Link href="/#home" className="block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">Home</Link>
              <Link href="/tours" className="block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">Tours</Link>
              <Link href="/#tours" className="block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">Date of Journey</Link>
              <Link href="/contact" className="block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">Feedback</Link>
              <Link href="/rules-regulations" className="block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">Rules &amp; Regulations</Link>
              <Link href="/contact" className="block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">Contact Us</Link>
            </div>
          </div>

          <div className="order-2">
            <h3 className="text-lg font-bold text-white">Services</h3>
            <div className="mt-4 space-y-2.5 text-sm">
              <p className="text-white/70">Group Tours</p>
              <p className="text-white/70">Customized Itinerary</p>
              <p className="text-white/70">Hotel Booking</p>
              <p className="text-white/70">Transport Assistance</p>
              <p className="text-white/70">Pilgrimage Packages</p>
            </div>
          </div>

          <div className="order-3 md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold text-white">Contact Us</h3>
            <div className="mt-4 space-y-2.5 text-sm text-white/70">
              <p>Zilla Parishad Market Complex, Midnapur</p>
              <p>Phone: +91 7478167607</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-sm text-white/70 sm:px-6">
        <p>© 2026 Cholo Jai Dure. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

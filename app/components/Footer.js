import Link from "next/link";
import { Phone } from "lucide-react";

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
              <Link href="/about-us" className="block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">About</Link>
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
              <a href="tel:+917478167607" aria-label="Call +91 7478167607" className="flex w-fit items-center gap-2 transition-colors hover:text-amber-300">
                <Phone className="h-4 w-4" aria-hidden="true" />
                +91 7478167607
              </a>
              <a href="tel:+917501307766" aria-label="Call +91 7501307766" className="flex w-fit items-center gap-2 transition-colors hover:text-amber-300">
                <Phone className="h-4 w-4" aria-hidden="true" />
                +91 7501307766
              </a>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://www.facebook.com/share/1FdjrmmgRX/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Facebook"
                  className="transition-colors hover:text-amber-300"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.5v2.1H7v3.2h2.9V21h3.6Z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/917478167607"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp at +91 7478167607"
                  className="transition-colors hover:text-amber-300"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d="M20.5 3.5A11.9 11.9 0 0 0 12.1 0C5.5 0 .1 5.4.1 12c0 2.1.5 4.1 1.6 5.9L0 24l6.2-1.6a12 12 0 0 0 5.9 1.5h.1c6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.7-8.4ZM12.1 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.3-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.8-9.8 2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.4-4.4 9.8-9.8 9.8Zm5.4-7.3c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.9-1.9-.2-.5-.5-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.3s1 2.6 1.1 2.8c.1.2 2 3.1 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.1-1.3-.1-.1-.3-.2-.6-.4Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}

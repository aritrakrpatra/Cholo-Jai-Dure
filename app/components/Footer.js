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
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <circle cx="12" cy="12" r="12" fill="#0866FF" />
                    <path fill="#fff" d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.5v2.1H7v3.2h2.9V21h3.6Z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/cholojaidure.in?psln=Zjc3NWtnZzY3NWph"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Instagram"
                  className="transition-colors hover:text-amber-300"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <defs>
                      <linearGradient id="instagram-brand-gradient" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFB800" />
                        <stop offset="0.5" stopColor="#FF315A" />
                        <stop offset="1" stopColor="#9B36D7" />
                      </linearGradient>
                    </defs>
                    <rect x="1" y="1" width="22" height="22" rx="6" fill="url(#instagram-brand-gradient)" />
                    <path fill="#fff" d="M8 5.5h8A2.5 2.5 0 0 1 18.5 8v8a2.5 2.5 0 0 1-2.5 2.5H8A2.5 2.5 0 0 1 5.5 16V8A2.5 2.5 0 0 1 8 5.5Zm0 1.6A.9.9 0 0 0 7.1 8v8a.9.9 0 0 0 .9.9h8a.9.9 0 0 0 .9-.9V8a.9.9 0 0 0-.9-.9H8Zm4 1.2a3.7 3.7 0 1 1 0 7.4 3.7 3.7 0 0 1 0-7.4Zm0 1.6a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2Zm4.2-2.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/cholojaidure/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LinkedIn"
                  className="transition-colors hover:text-amber-300"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <rect x="1" y="1" width="22" height="22" rx="4" fill="#0A66C2" />
                    <path fill="#fff" d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12ZM5.4 9.75h3.08V19H5.4V9.75Zm4.86 0h2.95v1.26h.04c.41-.78 1.42-1.6 2.92-1.6 3.12 0 3.7 2.05 3.7 4.72V19h-3.08v-4.31c0-1.03-.02-2.35-1.43-2.35-1.44 0-1.66 1.12-1.66 2.28V19h-3.08V9.75Z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/917478167607"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp at +91 7478167607"
                  className="transition-colors hover:text-amber-300"
                >
                  <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
                    <path fill="#25D366" d="M27.3 4.7A15.8 15.8 0 0 0 2.4 23.8L.2 31.8l8.2-2.1a15.8 15.8 0 0 0 7.6 1.9h.1A15.8 15.8 0 0 0 27.3 4.7ZM16 28.9a13 13 0 0 1-6.6-1.8l-.5-.3-4.9 1.3 1.3-4.8-.3-.5A13 13 0 1 1 16 28.9Zm7.1-9.8c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.8-1.1-1-1.8-2.2-2-2.6-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.6.1-.2 0-.5 0-.7-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.5-.3.4-1.2 1.2-1.2 3 0 1.8 1.3 3.5 1.5 3.8.2.2 2.5 3.8 6.1 5.3.9.4 1.6.6 2.1.7.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.7.3-.8.3-1.5.2-1.7-.1-.2-.3-.3-.7-.5Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/50">
        © 2026 Cholo Jai Dure Tour &amp; Travels. All rights reserved.
      </div>

      <a
        href="https://wa.me/917478167607"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Cholo Jai Dure on WhatsApp"
        title="Chat with us on WhatsApp"
        className="fixed bottom-5 right-5 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
          <path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L4 20l1.1-4a8.2 8.2 0 1 1 15.1-4.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M8.4 8.1c.2-.4.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.4.5 0 .5-.2 1-.6 1.3-.5.4-1.1.6-1.8.5-1.1-.2-2.4-.8-3.7-2-1.4-1.3-2.2-2.8-2.4-3.9-.1-.7.1-1.3.5-1.8l.2-.2Z" fill="currentColor" />
        </svg>
      </a>

    </footer>
  );
}

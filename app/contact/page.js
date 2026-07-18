"use client";

import { useState } from "react";
import { MapPin, Phone } from "lucide-react";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus({ type: "", message: "" });

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus({ type: "error", message: "Please fill in all fields before submitting." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitStatus({
          type: "error",
          message: result?.message || "Unable to send inquiry. Please try again.",
        });
        return;
      }

      setSubmitStatus({ type: "success", message: "Inquiry sent successfully. We will contact you soon." });
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch {
      setSubmitStatus({ type: "error", message: "Network error. Please try again in a moment." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="theme-bg min-h-screen text-foreground">
      <Navbar />

      <section className="py-16 pt-24 sm:py-24 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Contact</p>
            <h1 className="mt-4 text-3xl font-bold sm:text-5xl">Ready to start your journey?</h1>
            <p className="mx-auto mt-6 max-w-2xl text-(--muted)">
              Reach out for personalized trip planning, group bookings, and premium travel support.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="theme-surface-strong rounded-4xl p-6 sm:p-10">
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              <div className="mt-8 space-y-4 text-(--muted)">
                <p className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  Zilla Parishad Market Complex, Midnapur
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  7501307766
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  7478167607
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="theme-surface-strong space-y-4 rounded-4xl p-6 sm:p-10">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full rounded-3xl border border-(--border) bg-(--surface) px-5 py-4 text-foreground outline-none"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full rounded-3xl border border-(--border) bg-(--surface) px-5 py-4 text-foreground outline-none"
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full rounded-3xl border border-(--border) bg-(--surface) px-5 py-4 text-foreground outline-none"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Your Message"
                className="w-full rounded-3xl border border-(--border) bg-(--surface) px-5 py-4 text-foreground outline-none"
              />
              {submitStatus.message && (
                <p
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    submitStatus.type === "success"
                      ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
                      : "border-red-400/40 bg-red-500/10 text-red-200"
                  }`}
                >
                  {submitStatus.message}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-amber-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

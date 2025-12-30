"use client";

import { useState, useRef } from "react";
import ScrollAnimation from '../components/ScrollAnimation';

export default function ContactSection() {
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setStatus("✅ Message sent successfully!");
      if (formRef.current) {
        formRef.current.reset();
      }
    } else {
      setStatus("❌ Failed to send message.");
    }
  };

  return (
    <ScrollAnimation animationType="zoom-out">
      <section
        id="contact"
        className="bg-gradient-to-br from-black via-gray-800 to-green-700 text-white p-6 sm:p-8 lg:p-12 rounded-[32px] w-full shadow-2xl scroll-mt-24"
      >
        <ScrollAnimation animationType="fade-down" delay={100}>
          <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-12 drop-shadow-lg text-green-400">
            Let&apos;s Work Together
          </h2>
        </ScrollAnimation>

        <ScrollAnimation animationType="scale-in" delay={200}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white/5 p-5 sm:p-6 md:p-8 rounded-2xl shadow-xl space-y-6 hover:shadow-[0_0_25px_rgba(57,255,20,0.3)] transition-all duration-300"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-green-300 font-medium mb-2 text-sm sm:text-base"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl shadow-md bg-white/10 placeholder-green-200 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-green-300 font-medium mb-2 text-sm sm:text-base"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl shadow-md bg-white/10 placeholder-green-200 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-green-300 font-medium mb-2 text-sm sm:text-base"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="+91 1234567890"
                className="w-full px-4 py-3 rounded-xl shadow-md bg-white/10 placeholder-green-200 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-green-300 font-medium mb-2 text-sm sm:text-base"
              >
                Summary / Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                required
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-xl shadow-md bg-white/10 placeholder-green-200 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-emerald-400 text-white font-semibold px-6 py-3 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl text-sm sm:text-base"
              >
                Send Message
              </button>
              {status && (
                <p className="mt-4 text-green-300 text-sm sm:text-base">{status}</p>
              )}
            </div>
          </form>
        </ScrollAnimation>
      </section>
    </ScrollAnimation>
  );
}

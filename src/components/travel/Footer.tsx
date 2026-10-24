"use client";

import React, { useState } from "react";
import {
  IconCompass,
  IconMail,
  IconCheck,
  IconArrowRight,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandYoutube,
  IconShieldCheck,
} from "@tabler/icons-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer id="faq" className="bg-stone-950 border-t border-stone-800 text-stone-300">
      {/* Newsletter Invitation Section */}
      <div className="border-b border-stone-800/80 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <span>Privileged Invitations</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-3">
            Join the Lumina Collector&apos;s Circle
          </h3>
          <p className="text-stone-400 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed mb-8">
            Receive private preview invitations to limited departures, rare
            estate buyouts, and a $500 travel credit toward your inaugural bespoke voyage.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
              <IconCheck className="size-4 text-emerald-400" />
              <span>
                Welcome to the Collector&apos;s Circle. Your $500 voucher has been dispatched to {email}.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="max-w-md mx-auto flex items-center bg-stone-900/90 border border-stone-800 rounded-full p-1.5 focus-within:border-amber-500 transition-colors"
            >
              <div className="pl-3.5 pr-2 text-stone-500">
                <IconMail className="size-4" />
              </div>
              <input
                type="email"
                required
                placeholder="Enter your private email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-stone-100 text-xs flex-1 focus:outline-none placeholder-stone-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 shrink-0"
              >
                <span>Join</span>
                <IconArrowRight className="size-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center text-stone-950 shadow-md">
                <IconCompass className="size-4.5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-serif tracking-[0.2em] font-bold text-stone-50">
                LUMINA
              </span>
            </div>

            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
              Lumina Voyages &amp; Co. is a boutique expedition atelier crafting
              deeply transformative private journeys. Fully bonded, carbon-neutral,
              and dedicated to authentic conservation.
            </p>

            <div className="text-xs text-stone-400 space-y-1">
              <div>
                <span className="text-stone-300 font-medium">Global Ateliers:</span> London • New York • Tokyo • Zurich
              </div>
              <div>
                <span className="text-stone-300 font-medium">Private Concierge:</span> +44 (0) 20 7946 0912
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 text-stone-400">
              <a
                href="#"
                className="size-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Instagram"
              >
                <IconBrandInstagram className="size-4" />
              </a>
              <a
                href="#"
                className="size-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Facebook"
              >
                <IconBrandFacebook className="size-4" />
              </a>
              <a
                href="#"
                className="size-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="YouTube"
              >
                <IconBrandYoutube className="size-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Expeditions */}
          <div>
            <h4 className="font-serif text-stone-100 font-bold text-xs tracking-wider uppercase mb-4">
              Sanctuaries
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li>
                <a href="#destinations" className="hover:text-amber-400 transition-colors">
                  Amalfi &amp; Capri Odyssey
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-amber-400 transition-colors">
                  Kyoto Imperial Retreat
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-amber-400 transition-colors">
                  Swiss Alpine Chalets
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-amber-400 transition-colors">
                  Great Serengeti Safari
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-amber-400 transition-colors">
                  Santorini Cave Villas
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Experiences */}
          <div>
            <h4 className="font-serif text-stone-100 font-bold text-xs tracking-wider uppercase mb-4">
              Atelier
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li>
                <a href="#experience" className="hover:text-amber-400 transition-colors">
                  Private Aviation Charters
                </a>
              </li>
              <li>
                <a href="#bespoke-planner" className="hover:text-amber-400 transition-colors">
                  Bespoke Trip Customizer
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-amber-400 transition-colors">
                  Estate &amp; Yacht Buyouts
                </a>
              </li>
              <li>
                <a href="#stories" className="hover:text-amber-400 transition-colors">
                  Guest Chronicles
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-amber-400 transition-colors">
                  Sustainability &amp; Rewilding
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Accreditation */}
          <div>
            <h4 className="font-serif text-stone-100 font-bold text-xs tracking-wider uppercase mb-4">
              Credentials
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400 font-light">
              <div className="flex items-center gap-1.5 text-amber-300">
                <IconShieldCheck className="size-4" />
                <span className="font-medium">Virtuoso Ultraluxe</span>
              </div>
              <div>Condé Nast Top Specialist</div>
              <div>IATA &amp; ATOL Protected</div>
              <div>Gold-Standard 100% Carbon Offset</div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="mt-14 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <div>
            &copy; 2026 Lumina Voyages &amp; Co. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-stone-300">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300">Terms of Charter</a>
            <a href="#" className="hover:text-stone-300">Security &amp; Safety</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

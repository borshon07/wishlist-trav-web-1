"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  IconSearch,
  IconMapPin,
  IconCalendar,
  IconUsers,
  IconShieldCheck,
  IconSparkles,
  IconStarFilled,
  IconWorld,
} from "@tabler/icons-react";

interface HeroSectionProps {
  onSearch: (filters: { destination: string; category: string; guests: string }) => void;
  onExploreClick: () => void;
}

export function HeroSection({ onSearch, onExploreClick }: HeroSectionProps) {
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("");
  const [guests, setGuests] = useState("2 Travelers");
  const [season, setSeason] = useState("Summer 2026");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination, category, guests });
    onExploreClick();
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Hero Image with Rich Cinematic Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Luxury Mediterranean cliffside villa with infinity pool at golden hour"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center scale-105 animate-pulse duration-[10000ms]"
        />
        {/* Subtle multi-layer gradient overlays for maximum contrast and elegance */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-stone-950/30 to-stone-950/80" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Editorial Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-medium tracking-widest uppercase mb-6 shadow-lg shadow-black/40">
          <IconSparkles className="size-3.5 text-amber-400" />
          <span>Handcrafted Expeditions &amp; Private Sanctuaries</span>
        </div>

        {/* Master Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.12] max-w-4xl mb-6 text-glow">
          Curated Journeys to Earth&apos;s Most{" "}
          <span className="italic font-normal text-amber-200">
            Extraordinary
          </span>{" "}
          Horizons.
        </h1>

        {/* Narrative Subtitle */}
        <p className="text-stone-200 text-base sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10 text-stone-200/90 drop-shadow">
          Private aviation, cliffside villas, and privileged access to living
          cultural masters. Every itinerary is hand-tailored to your deepest wanderlust.
        </p>

        {/* Interactive Search Console Bar */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-stone-950/85 backdrop-blur-xl border border-stone-700/60 p-3 sm:p-4 rounded-2xl sm:rounded-full shadow-2xl shadow-black/80 flex flex-col sm:flex-row items-center gap-3 transition-all hover:border-amber-500/50"
        >
          {/* Destination Selector */}
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-stone-800 text-left">
            <IconMapPin className="size-5 text-amber-400 shrink-0" />
            <div className="flex flex-col flex-1">
              <label htmlFor="search-destination" className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                Destination
              </label>
              <select
                id="search-destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-transparent text-stone-100 text-sm font-medium focus:outline-none cursor-pointer pr-2"
              >
                <option value="" className="bg-stone-900 text-stone-200">
                  Any Sanctuary
                </option>
                <option value="Amalfi" className="bg-stone-900 text-stone-200">
                  Amalfi Coast, Italy
                </option>
                <option value="Kyoto" className="bg-stone-900 text-stone-200">
                  Kyoto &amp; Kanazawa, Japan
                </option>
                <option value="Swiss" className="bg-stone-900 text-stone-200">
                  Swiss Alps, Switzerland
                </option>
                <option value="Serengeti" className="bg-stone-900 text-stone-200">
                  Serengeti Safari, Tanzania
                </option>
                <option value="Santorini" className="bg-stone-900 text-stone-200">
                  Santorini &amp; Cyclades, Greece
                </option>
                <option value="Bali" className="bg-stone-900 text-stone-200">
                  Ubud Rainforest, Bali
                </option>
              </select>
            </div>
          </div>

          {/* Experience Category */}
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-stone-800 text-left">
            <IconWorld className="size-5 text-amber-400 shrink-0" />
            <div className="flex flex-col flex-1">
              <label htmlFor="search-category" className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                Experience Style
              </label>
              <select
                id="search-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent text-stone-100 text-sm font-medium focus:outline-none cursor-pointer pr-2"
              >
                <option value="" className="bg-stone-900 text-stone-200">
                  All Travel Styles
                </option>
                <option value="Coastal & Island" className="bg-stone-900 text-stone-200">
                  Coastal &amp; Island Yachting
                </option>
                <option value="Cultural Immersion" className="bg-stone-900 text-stone-200">
                  Cultural &amp; Heritage
                </option>
                <option value="Mountain Escapes" className="bg-stone-900 text-stone-200">
                  Alpine &amp; Mountain Chalet
                </option>
                <option value="Wildlife & Safari" className="bg-stone-900 text-stone-200">
                  Luxury Wilderness Safari
                </option>
                <option value="Wellness & Nature" className="bg-stone-900 text-stone-200">
                  Holistic Wellness &amp; Spa
                </option>
              </select>
            </div>
          </div>

          {/* Season & Duration */}
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-stone-800 text-left">
            <IconCalendar className="size-5 text-amber-400 shrink-0" />
            <div className="flex flex-col flex-1">
              <label htmlFor="search-season" className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                Departure Window
              </label>
              <select
                id="search-season"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="bg-transparent text-stone-100 text-sm font-medium focus:outline-none cursor-pointer pr-2"
              >
                <option value="Spring 2026" className="bg-stone-900 text-stone-200">
                  Spring 2026
                </option>
                <option value="Summer 2026" className="bg-stone-900 text-stone-200">
                  Summer 2026
                </option>
                <option value="Autumn 2026" className="bg-stone-900 text-stone-200">
                  Autumn 2026
                </option>
                <option value="Winter 2026/27" className="bg-stone-900 text-stone-200">
                  Winter 2026 / 2027
                </option>
              </select>
            </div>
          </div>

          {/* Travelers Counter */}
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 text-left">
            <IconUsers className="size-5 text-amber-400 shrink-0" />
            <div className="flex flex-col flex-1">
              <label htmlFor="search-guests" className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                Travelers
              </label>
              <select
                id="search-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-transparent text-stone-100 text-sm font-medium focus:outline-none cursor-pointer pr-2"
              >
                <option value="2 Travelers" className="bg-stone-900 text-stone-200">
                  2 Guests (Couple)
                </option>
                <option value="3-5 Small Group" className="bg-stone-900 text-stone-200">
                  3–5 Guests (Family)
                </option>
                <option value="6+ Private Party" className="bg-stone-900 text-stone-200">
                  6+ Guests (Villa Buyout)
                </option>
              </select>
            </div>
          </div>

          {/* Submit Search Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-bold text-xs tracking-wider uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <IconSearch className="size-4 stroke-[2.5]" />
            <span>Search</span>
          </button>
        </form>

        {/* Accolades and Trust Indicators */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 pt-8 border-t border-stone-800/80 w-full max-w-4xl text-left">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <IconStarFilled className="size-5" />
            </div>
            <div>
              <div className="text-stone-100 font-bold text-base">4.99 / 5.0</div>
              <div className="text-stone-400 text-xs font-light">1,200+ Discerning Guests</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <IconSparkles className="size-5" />
            </div>
            <div>
              <div className="text-stone-100 font-bold text-base">100% Bespoke</div>
              <div className="text-stone-400 text-xs font-light">Tailored To Your Desires</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <IconShieldCheck className="size-5" />
            </div>
            <div>
              <div className="text-stone-100 font-bold text-base">24/7 Concierge</div>
              <div className="text-stone-400 text-xs font-light">Dedicated Journey Guardian</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <IconWorld className="size-5" />
            </div>
            <div>
              <div className="text-stone-100 font-bold text-base">Carbon Neutral</div>
              <div className="text-stone-400 text-xs font-light">Gold-Standard Verified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  IconHeart,
  IconHeartFilled,
  IconStarFilled,
  IconMapPin,
  IconClock,
  IconUsers,
  IconArrowRight,
  IconSparkles,
  IconAdjustmentsHorizontal,
} from "@tabler/icons-react";
import { Destination, CURRENCIES } from "@/data/destinations";

interface DestinationsCatalogProps {
  destinations: Destination[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onSelectItinerary: (destination: Destination) => void;
  onOpenBooking: (tripTitle: string) => void;
  currentCurrency: string;
  initialSearchQuery?: string;
  initialCategory?: string;
}

const CATEGORIES = [
  "All Escapes",
  "Coastal & Island",
  "Cultural Immersion",
  "Mountain Escapes",
  "Wildlife & Safari",
  "Wellness & Nature",
];

const DURATION_FILTERS = [
  { label: "All Durations", min: 0, max: 99 },
  { label: "Under 7 Days", min: 0, max: 6 },
  { label: "7 – 8 Days", min: 7, max: 8 },
  { label: "9+ Days", min: 9, max: 99 },
];

export function DestinationsCatalog({
  destinations,
  wishlist,
  onToggleWishlist,
  onSelectItinerary,
  onOpenBooking,
  currentCurrency,
  initialSearchQuery = "",
  initialCategory = "",
}: DestinationsCatalogProps) {
  const [prevCategory, setPrevCategory] = useState(initialCategory);
  const [userCategory, setUserCategory] = useState<string | null>(null);

  if (initialCategory !== prevCategory) {
    setPrevCategory(initialCategory);
    setUserCategory(null);
  }

  const selectedCategory = userCategory ?? (initialCategory || "All Escapes");

  const [prevInitialQuery, setPrevInitialQuery] = useState(initialSearchQuery);
  const [userSearchQuery, setUserSearchQuery] = useState<string | null>(null);

  if (initialSearchQuery !== prevInitialQuery) {
    setPrevInitialQuery(initialSearchQuery);
    setUserSearchQuery(null);
  }

  const searchQuery = userSearchQuery ?? initialSearchQuery;
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(0);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "duration">("featured");

  // Currency multiplier helper
  const currencyInfo = useMemo(() => {
    return CURRENCIES.find((c) => c.code === currentCurrency) || CURRENCIES[0];
  }, [currentCurrency]);

  const formatPrice = (usd: number) => {
    const converted = Math.round(usd * currencyInfo.rate);
    return `${currencyInfo.symbol}${converted.toLocaleString()}`;
  };

  // Filter and sort logic
  const filteredDestinations = useMemo(() => {
    return destinations
      .filter((dest) => {
        // Category filter
        if (
          selectedCategory !== "All Escapes" &&
          dest.category !== selectedCategory
        ) {
          return false;
        }

        // Duration filter
        const durationRule = DURATION_FILTERS[selectedDurationIndex];
        if (
          dest.durationDays < durationRule.min ||
          dest.durationDays > durationRule.max
        ) {
          return false;
        }

        // Search Query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            dest.title.toLowerCase().includes(q) ||
            dest.location.toLowerCase().includes(q) ||
            dest.country.toLowerCase().includes(q) ||
            dest.highlights.some((h) => h.toLowerCase().includes(q));
          if (!match) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.priceUSD - b.priceUSD;
        if (sortBy === "price-desc") return b.priceUSD - a.priceUSD;
        if (sortBy === "duration") return a.durationDays - b.durationDays;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [
    destinations,
    selectedCategory,
    selectedDurationIndex,
    searchQuery,
    sortBy,
  ]);

  return (
    <section id="destinations" className="py-24 bg-stone-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
              <IconSparkles className="size-4" />
              <span>Curated Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
              Extraordinary Private Expeditions
            </h2>
            <p className="text-stone-400 text-base max-w-xl mt-3 font-light">
              Each journey is privately chartered with exclusive access to secluded estates,
              vetted naturalists, and Michelin-caliber gastronomic experiences.
            </p>
          </div>

          {/* Quick Search & Sort Control */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by country, title..."
                value={searchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className="bg-stone-950/80 border border-stone-800 text-stone-200 text-xs rounded-full py-2 pl-4 pr-9 focus:outline-none focus:border-amber-500 w-48 sm:w-60 placeholder-stone-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setUserSearchQuery("")}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "duration")}
              className="bg-stone-950/80 border border-stone-800 text-stone-200 text-xs rounded-full py-2 px-3.5 focus:outline-none focus:border-amber-500 cursor-pointer font-medium"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-stone-800/80 pb-4">
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All Escapes"
                ? destinations.length
                : destinations.filter((d) => d.category === cat).length;
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setUserCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  active
                    ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 font-semibold"
                    : "bg-stone-950/60 text-stone-400 hover:text-stone-200 hover:bg-stone-800/80 border border-stone-800/60"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    active ? "bg-stone-950/20 text-stone-950 font-bold" : "bg-stone-800 text-stone-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Duration Filter Bar */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 text-xs text-stone-400">
          <span className="flex items-center gap-1 font-semibold text-stone-300 mr-2 shrink-0">
            <IconClock className="size-3.5 text-amber-400" /> Duration:
          </span>
          {DURATION_FILTERS.map((d, idx) => (
            <button
              key={d.label}
              onClick={() => setSelectedDurationIndex(idx)}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer shrink-0 ${
                selectedDurationIndex === idx
                  ? "bg-stone-800 text-amber-300 font-semibold border border-stone-700"
                  : "hover:text-stone-200 hover:bg-stone-800/40"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Destination Cards Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-20 bg-stone-950/40 rounded-3xl border border-stone-800 p-8">
            <IconAdjustmentsHorizontal className="size-12 text-stone-600 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-stone-200 mb-2">
              No matching private expeditions found
            </h3>
            <p className="text-stone-400 text-sm max-w-md mx-auto mb-6 font-light">
              Try adjusting your category, duration, or search terms to view our
              curated itineraries.
            </p>
            <button
              onClick={() => {
                setUserCategory("All Escapes");
                setSelectedDurationIndex(0);
                setUserSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full bg-amber-500 text-stone-950 font-semibold text-xs tracking-wider uppercase"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => {
              const isSaved = wishlist.includes(dest.id);

              return (
                <div
                  key={dest.id}
                  className="group bg-stone-950/80 rounded-2xl overflow-hidden border border-stone-800/80 hover:border-amber-500/40 transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-amber-950/20"
                >
                  {/* Card Image Wrapper */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
                    <Image
                      src={dest.image}
                      alt={dest.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-stone-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
                        {dest.badge}
                      </span>

                      {/* Wishlist Heart Toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(dest.id);
                        }}
                        className={`size-9 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border ${
                          isSaved
                            ? "bg-rose-500/90 text-white border-rose-400 scale-105"
                            : "bg-stone-950/70 text-stone-300 hover:text-white border-white/20 hover:scale-105"
                        }`}
                        title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
                        aria-label="Save to wishlist"
                      >
                        {isSaved ? (
                          <IconHeartFilled className="size-4.5" />
                        ) : (
                          <IconHeart className="size-4.5" />
                        )}
                      </button>
                    </div>

                    {/* Bottom Image Metadata */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-stone-300 z-10">
                      <div className="flex items-center gap-1.5 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-stone-800">
                        <IconClock className="size-3.5 text-amber-400" />
                        <span>{dest.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-stone-800">
                        <IconUsers className="size-3.5 text-amber-400" />
                        <span>{dest.groupSize}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Location & Rating Header */}
                      <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                        <div className="flex items-center gap-1 text-stone-300 font-medium">
                          <IconMapPin className="size-3.5 text-amber-400" />
                          <span>{dest.location}</span>
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-stone-200">
                          <IconStarFilled className="size-3.5 text-amber-400" />
                          <span>{dest.rating.toFixed(2)}</span>
                          <span className="text-stone-500 font-normal">
                            ({dest.reviewsCount})
                          </span>
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-xl font-serif text-stone-100 font-semibold mb-2 group-hover:text-amber-300 transition-colors leading-snug">
                        {dest.title}
                      </h3>
                      <p className="text-stone-400 text-xs leading-relaxed mb-4 font-light">
                        {dest.subtitle}
                      </p>

                      {/* Signature Highlights */}
                      <div className="space-y-1.5 mb-6 pt-2 border-t border-stone-900">
                        {dest.highlights.slice(0, 3).map((h, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-[11px] text-stone-300"
                          >
                            <span className="text-amber-400 font-bold shrink-0 mt-0.5">
                              ✦
                            </span>
                            <span className="leading-snug">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                          From per guest
                        </div>
                        <div className="text-xl font-serif font-bold text-amber-300">
                          {formatPrice(dest.priceUSD)}
                          <span className="text-xs font-sans text-stone-400 font-normal ml-1">
                            {currencyInfo.code}
                          </span>
                        </div>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectItinerary(dest)}
                          className="px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-medium border border-stone-700/80 transition-all cursor-pointer"
                        >
                          Itinerary
                        </button>
                        <button
                          onClick={() => onOpenBooking(dest.title)}
                          className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer flex items-center gap-1"
                        >
                          <span>Inquire</span>
                          <IconArrowRight className="size-3 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

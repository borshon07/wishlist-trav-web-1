"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  IconX,
  IconClock,
  IconUsers,
  IconCheck,
  IconCalendar,
  IconPlane,
  IconHeart,
  IconHeartFilled,
  IconStarFilled,
  IconSparkles,
} from "@tabler/icons-react";
import { Destination, CURRENCIES } from "@/data/destinations";

interface JourneyItineraryModalProps {
  destination: Destination | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onOpenBooking: (tripTitle: string) => void;
  currentCurrency: string;
}

export function JourneyItineraryModal({
  destination,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onOpenBooking,
  currentCurrency,
}: JourneyItineraryModalProps) {
  useEffect(() => {
    if (!destination) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [destination, onClose]);

  if (!destination) return null;

  const currencyInfo =
    CURRENCIES.find((c) => c.code === currentCurrency) || CURRENCIES[0];
  const formattedPrice = `${currencyInfo.symbol}${Math.round(
    destination.priceUSD * currencyInfo.rate
  ).toLocaleString()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-stone-950 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 size-10 rounded-full bg-stone-950/80 backdrop-blur-md text-stone-200 hover:text-white border border-stone-700/80 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
          aria-label="Close modal"
        >
          <IconX className="size-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-80 w-full shrink-0">
          <Image
            src={destination.image}
            alt={destination.title}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

          {/* Floating Badges */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-amber-500 text-stone-950">
                {destination.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-stone-900/80 backdrop-blur-md text-stone-200 border border-stone-700">
                {destination.category}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-50 leading-tight">
              {destination.title}
            </h2>
            <p className="text-stone-300 text-sm mt-1 max-w-2xl font-light">
              {destination.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-stone-900/60 border border-stone-800 text-xs">
            <div className="flex items-center gap-2.5">
              <IconClock className="size-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">
                  Duration
                </span>
                <span className="text-stone-100 font-semibold">
                  {destination.duration}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <IconUsers className="size-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">
                  Party Size
                </span>
                <span className="text-stone-100 font-semibold">
                  {destination.groupSize}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <IconCalendar className="size-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">
                  Best Season
                </span>
                <span className="text-stone-100 font-semibold">
                  {destination.bestSeason}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <IconStarFilled className="size-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">
                  Guest Rating
                </span>
                <span className="text-stone-100 font-semibold">
                  {destination.rating} / 5.0 ({destination.reviewsCount} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Logistics & Aviation Note */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
            <IconPlane className="size-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-semibold text-amber-300">
                Aviation &amp; Arrival Logistics:{" "}
              </span>
              <span>{destination.flightTimeNote}</span>
            </div>
          </div>

          {/* Day-by-Day Itinerary Schedule */}
          <div>
            <div className="flex items-center gap-2 text-stone-100 font-serif text-xl mb-6">
              <IconSparkles className="size-5 text-amber-400" />
              <span>Day-by-Day Curated Experience</span>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-stone-800">
              {destination.itinerary.map((item) => (
                <div key={item.day} className="relative flex items-start gap-4 pl-1">
                  <div className="size-8 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center shrink-0 z-10 shadow-md">
                    {item.day}
                  </div>
                  <div className="bg-stone-900/50 border border-stone-800/80 rounded-2xl p-4 flex-1">
                    <h4 className="text-stone-100 font-serif text-base font-semibold mb-1">
                      Day {item.day}: {item.title}
                    </h4>
                    <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Included Luxury Inclusions */}
          <div className="pt-4 border-t border-stone-800">
            <h3 className="text-stone-100 font-serif text-lg mb-4">
              Privileged Inclusions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.included.map((inc, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 text-xs text-stone-300 p-2.5 rounded-xl bg-stone-900/40 border border-stone-800/50"
                >
                  <IconCheck className="size-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer Bar */}
        <div className="p-4 sm:p-6 bg-stone-950 border-t border-stone-800 flex items-center justify-between shrink-0">
          <div>
            <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
              All-inclusive private itinerary
            </div>
            <div className="text-2xl font-serif font-bold text-amber-300">
              {formattedPrice}{" "}
              <span className="text-xs font-sans text-stone-400 font-normal">
                {currencyInfo.code} / person
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleWishlist(destination.id)}
              className={`p-3 rounded-full border transition-all cursor-pointer ${
                isWishlisted
                  ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                  : "bg-stone-900 text-stone-400 hover:text-white border-stone-700"
              }`}
              title={isWishlisted ? "Saved" : "Save to wishlist"}
            >
              {isWishlisted ? (
                <IconHeartFilled className="size-5" />
              ) : (
                <IconHeart className="size-5" />
              )}
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenBooking(destination.title);
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Reserve Expedition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

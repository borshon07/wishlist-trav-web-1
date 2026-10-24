"use client";

import React, { useState, useMemo } from "react";
import {
  IconSparkles,
  IconCalculator,
  IconCheck,
  IconArrowRight,
} from "@tabler/icons-react";
import { DESTINATIONS_DATA, CURRENCIES } from "@/data/destinations";

interface TripCalculatorProps {
  currentCurrency: string;
  onOpenBookingWithCustom: (summary: string) => void;
}

const TIERS = [
  {
    id: "boutique",
    name: "Curated Boutique",
    multiplier: 1.0,
    desc: "5-star luxury suites, private bilingual guide, private Mercedes transfers.",
  },
  {
    id: "signature",
    name: "Signature Ultra-Luxe",
    multiplier: 1.45,
    desc: "Private villa buyout, chartered Riva boat/helicopter hop, 2 Michelin dinners.",
  },
  {
    id: "imperial",
    name: "Imperial & Private Aviation",
    multiplier: 2.1,
    desc: "Dedicated private aircraft, presidential residence, 24/7 personal butler.",
  },
];

const ADDONS = [
  {
    id: "heli",
    name: "Private Helicopter or Hot Air Balloon Flight",
    priceUSD: 950,
  },
  {
    id: "chef",
    name: "Personal Michelin-Trained Private Chef",
    priceUSD: 650,
  },
  {
    id: "wine",
    name: "Master Sommelier Historic Cellar Access",
    priceUSD: 550,
  },
  {
    id: "spa",
    name: "Comprehensive Thermal Hydrotherapy Pass",
    priceUSD: 400,
  },
];

export function TripCalculator({
  currentCurrency,
  onOpenBookingWithCustom,
}: TripCalculatorProps) {
  const [selectedDestId, setSelectedDestId] = useState(DESTINATIONS_DATA[0].id);
  const [days, setDays] = useState(7);
  const [guests, setGuests] = useState(2);
  const [selectedTierId, setSelectedTierId] = useState("signature");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["heli"]);

  const currencyInfo = useMemo(() => {
    return CURRENCIES.find((c) => c.code === currentCurrency) || CURRENCIES[0];
  }, [currentCurrency]);

  const selectedDest = useMemo(() => {
    return (
      DESTINATIONS_DATA.find((d) => d.id === selectedDestId) ||
      DESTINATIONS_DATA[0]
    );
  }, [selectedDestId]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Base daily rate calculation
  const calculatedCost = useMemo(() => {
    const baseDailyRate = selectedDest.priceUSD / selectedDest.durationDays;
    const tier = TIERS.find((t) => t.id === selectedTierId) || TIERS[1];

    const basePerPerson = baseDailyRate * days * tier.multiplier;
    const addonsPerPerson = selectedAddons.reduce((sum, addonId) => {
      const match = ADDONS.find((a) => a.id === addonId);
      return sum + (match ? match.priceUSD : 0);
    }, 0);

    const perPersonUSD = Math.round(basePerPerson + addonsPerPerson);
    const totalUSD = perPersonUSD * guests;

    return {
      perPerson: Math.round(perPersonUSD * currencyInfo.rate),
      total: Math.round(totalUSD * currencyInfo.rate),
      symbol: currencyInfo.symbol,
      code: currencyInfo.code,
    };
  }, [selectedDest, days, selectedTierId, selectedAddons, guests, currencyInfo]);

  const handleBook = () => {
    const tier = TIERS.find((t) => t.id === selectedTierId)?.name;
    const summary = `${selectedDest.title} (${days} Days, ${guests} Guests, ${tier} Tier, Add-ons: ${
      selectedAddons.length > 0 ? selectedAddons.join(", ") : "None"
    })`;
    onOpenBookingWithCustom(summary);
  };

  return (
    <section id="bespoke-planner" className="py-24 bg-stone-950 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-1/4 size-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 size-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
            <IconCalculator className="size-4" />
            <span>Interactive Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
            Design Your Bespoke Expedition
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-3 font-light">
            Tailor your desired sanctuary, duration, luxury tier, and exclusive
            privileges to receive an immediate transparent investment estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-7">
            {/* 1. Destination Select */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-3">
                1. Select Destination Sanctuary
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {DESTINATIONS_DATA.map((dest) => {
                  const active = selectedDestId === dest.id;
                  return (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => setSelectedDestId(dest.id)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        active
                          ? "bg-amber-500/15 border-amber-500 text-amber-300 shadow-md"
                          : "bg-stone-950/60 border-stone-800 text-stone-300 hover:border-stone-700"
                      }`}
                    >
                      <div className="text-xs font-serif font-bold truncate">
                        {dest.country}
                      </div>
                      <div className="text-[11px] text-stone-400 truncate mt-0.5">
                        {dest.location.split(",")[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Duration & Guest Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-stone-800/80">
              {/* Duration Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                  <span>2. Duration</span>
                  <span className="text-amber-400 font-bold">{days} Days</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={21}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                  <span>3 Days</span>
                  <span>10 Days</span>
                  <span>21 Days</span>
                </div>
              </div>

              {/* Guest Count */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                  <span>3. Travelers</span>
                  <span className="text-amber-400 font-bold">{guests} Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 4, 6, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        guests === num
                          ? "bg-amber-500 text-stone-950 border-amber-500"
                          : "bg-stone-950/60 border-stone-800 text-stone-400 hover:text-white"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Luxury Tier Selection */}
            <div className="pt-3 border-t border-stone-800/80">
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-3">
                4. Curation &amp; Service Tier
              </label>
              <div className="space-y-2.5">
                {TIERS.map((tier) => {
                  const active = selectedTierId === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        active
                          ? "bg-amber-500/15 border-amber-500 text-stone-100 shadow-md"
                          : "bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700"
                      }`}
                    >
                      <div className="flex-1 pr-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-serif font-bold ${
                              active ? "text-amber-300" : "text-stone-200"
                            }`}
                          >
                            {tier.name}
                          </span>
                          {tier.id === "signature" && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 uppercase font-bold tracking-wider">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-400 mt-0.5 font-light">
                          {tier.desc}
                        </p>
                      </div>
                      <div
                        className={`size-5 rounded-full border flex items-center justify-center shrink-0 ${
                          active
                            ? "border-amber-400 bg-amber-500 text-stone-950"
                            : "border-stone-700"
                        }`}
                      >
                        {active && <IconCheck className="size-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Bespoke Add-ons */}
            <div className="pt-3 border-t border-stone-800/80">
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-3">
                5. Add-on Experiences (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ADDONS.map((addon) => {
                  const active = selectedAddons.includes(addon.id);
                  const price = `${currencyInfo.symbol}${Math.round(
                    addon.priceUSD * currencyInfo.rate
                  ).toLocaleString()}`;
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border text-left flex items-start justify-between gap-2 transition-all cursor-pointer ${
                        active
                          ? "bg-stone-800/90 border-amber-500/60 text-stone-100"
                          : "bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-medium leading-snug">
                          {addon.name}
                        </div>
                        <div className="text-[10px] text-amber-400 font-semibold mt-1">
                          +{price} / person
                        </div>
                      </div>
                      <div
                        className={`size-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                          active
                            ? "bg-amber-500 border-amber-500 text-stone-950"
                            : "border-stone-700"
                        }`}
                      >
                        {active && <IconCheck className="size-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Investment Summary Sticky Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800/90 rounded-3xl p-6 sm:p-8 sticky top-28 shadow-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <IconSparkles className="size-4" />
              <span>Investment Estimate</span>
            </div>

            <div className="space-y-3 pb-6 border-b border-stone-800 text-xs">
              <div className="flex justify-between text-stone-300">
                <span className="text-stone-400">Chosen Sanctuary</span>
                <span className="font-semibold text-stone-100 text-right truncate max-w-[200px]">
                  {selectedDest.title}
                </span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span className="text-stone-400">Length &amp; Group</span>
                <span className="font-semibold text-stone-100">
                  {days} Days / {guests} Guests
                </span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span className="text-stone-400">Selected Tier</span>
                <span className="font-semibold text-amber-300">
                  {TIERS.find((t) => t.id === selectedTierId)?.name}
                </span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span className="text-stone-400">Add-on Inclusions</span>
                <span className="font-semibold text-stone-100">
                  {selectedAddons.length} Selected
                </span>
              </div>
            </div>

            {/* Price Output */}
            <div className="py-6 space-y-2">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium block">
                  Estimated Per Person
                </span>
                <div className="text-3xl font-serif font-bold text-amber-300">
                  {calculatedCost.symbol}
                  {calculatedCost.perPerson.toLocaleString()}{" "}
                  <span className="text-xs font-sans text-stone-400 font-normal">
                    {calculatedCost.code}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium block">
                  Total Private Party Investment ({guests} Guests)
                </span>
                <div className="text-lg font-serif font-semibold text-stone-200">
                  {calculatedCost.symbol}
                  {calculatedCost.total.toLocaleString()}{" "}
                  <span className="text-xs font-sans text-stone-400 font-normal">
                    {calculatedCost.code}
                  </span>
                </div>
              </div>
            </div>

            {/* Inclusions Guarantee */}
            <div className="text-[11px] text-stone-400 bg-stone-900/80 p-3.5 rounded-xl border border-stone-800 space-y-1.5 mb-6">
              <div className="flex items-center gap-1.5 text-stone-300 font-medium">
                <IconCheck className="size-3.5 text-amber-400" />
                <span>Includes dedicated 24/7 personal trip concierge</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300 font-medium">
                <IconCheck className="size-3.5 text-amber-400" />
                <span>100% Carbon-Neutral certified expedition offset</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleBook}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lock In Custom Proposal</span>
              <IconArrowRight className="size-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

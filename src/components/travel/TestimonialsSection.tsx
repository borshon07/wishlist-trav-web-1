"use client";

import React from "react";
import { IconStarFilled, IconQuote, IconCheck, IconAward } from "@tabler/icons-react";
import { TESTIMONIALS } from "@/data/destinations";

export function TestimonialsSection() {
  return (
    <section id="stories" className="py-24 bg-stone-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
            <IconAward className="size-4" />
            <span>Guest Chronicles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
            Memories of a Lifetime
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-3 font-light">
            Reflections from the distinguished travelers who have trusted Lumina
            Voyages with their most meaningful celebrations and journeys.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <IconStarFilled key={i} className="size-4" />
                    ))}
                  </div>
                  <IconQuote className="size-6 text-stone-700" />
                </div>

                <p className="text-stone-300 text-sm font-light leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-stone-100 font-serif font-bold text-sm">
                    {t.name}
                  </h4>
                  <div className="text-[11px] text-stone-400">{t.location}</div>
                  <div className="text-[10px] text-amber-400/90 font-medium mt-1">
                    ✦ {t.trip}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-stone-400 bg-stone-950 px-2.5 py-1 rounded-full border border-stone-800">
                  <IconCheck className="size-3 text-emerald-400" />
                  <span>Verified Guest</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Press Accolades Banner */}
        <div className="mt-16 pt-12 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs text-stone-400">
          <div>
            <span className="font-serif text-stone-200 text-base font-bold block mb-1">
              Condé Nast Traveler
            </span>
            <span className="text-[11px] text-amber-400">Top Travel Specialist 2026</span>
          </div>
          <div>
            <span className="font-serif text-stone-200 text-base font-bold block mb-1">
              Robb Report
            </span>
            <span className="text-[11px] text-amber-400">Best Bespoke Private Outfitter</span>
          </div>
          <div>
            <span className="font-serif text-stone-200 text-base font-bold block mb-1">
              Virtuoso Member
            </span>
            <span className="text-[11px] text-amber-400">Ultraluxe Verified Partner</span>
          </div>
          <div>
            <span className="font-serif text-stone-200 text-base font-bold block mb-1">
              Positive Planet
            </span>
            <span className="text-[11px] text-amber-400">100% Net Zero Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import {
  IconPlane,
  IconBed,
  IconSparkles,
  IconShieldCheck,
  IconCompass,
} from "@tabler/icons-react";

export function WhyLuminaSection() {
  const PILLARS = [
    {
      icon: IconPlane,
      title: "Private Aviation & VIP Helipads",
      desc: "Bypass crowded terminals. Seamless chartered Pilatus turboprops and twin-engine helicopters land you directly at cliffside private helipads and remote wilderness strips.",
      badge: "Zero Friction",
    },
    {
      icon: IconBed,
      title: "Secluded Private Sanctuaries",
      desc: "We curate exclusive estate buyouts, cliff-carved volcanic cave suites, and elevated Serengeti tented palaces with private plunge pools and dedicated household staff.",
      badge: "Pure Privacy",
    },
    {
      icon: IconSparkles,
      title: "Living Masters & Sacred Access",
      desc: "Unlock doors closed to the public: dawn tea ceremonies with 15th-generation tea masters, after-hours temple sanctuaries, and private volcanic wine cellars.",
      badge: "Privileged Access",
    },
    {
      icon: IconShieldCheck,
      title: "Dedicated Journey Guardian",
      desc: "From the moment you step out your front door, a 24/7 personal travel director oversees every luggage transfer, table reservation, and weather contingency.",
      badge: "24/7 Concierge",
    },
  ];

  return (
    <section id="experience" className="py-24 bg-stone-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
            <IconCompass className="size-4" />
            <span>The Lumina Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
            How True Luxury Travel is Defined
          </h2>
          <p className="text-stone-400 text-base mt-4 font-light">
            We don&apos;t sell packaged vacations. We orchestrate transformative,
            deeply private chapters in our travelers&apos; lives.
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-stone-950/70 border border-stone-800/80 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/20 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="size-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="size-6 stroke-[1.8]" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-900 text-stone-400 border border-stone-800">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-stone-100 mb-2.5 group-hover:text-amber-300 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs text-stone-400 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-900/80 flex items-center gap-1.5 text-[11px] text-amber-400 font-medium">
                  <span>Guaranteed Standard</span>
                  <span>✦</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

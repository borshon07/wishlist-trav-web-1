"use client";

import React, { useState, useEffect } from "react";
import {
  IconCompass,
  IconHeart,
  IconMenu2,
  IconX,
  IconSparkles,
  IconPhoneCall,
} from "@tabler/icons-react";
import { CURRENCIES } from "@/data/destinations";

interface NavbarProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenBooking: (prefillTrip?: string) => void;
  currentCurrency: string;
  onCurrencyChange: (code: string) => void;
}

export function Navbar({
  wishlistCount,
  onOpenWishlist,
  onOpenBooking,
  currentCurrency,
  onCurrencyChange,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center border-b border-stone-800 tracking-wider flex items-center justify-center gap-2">
        <IconSparkles className="size-3.5 text-amber-400 shrink-0" />
        <span className="font-light">
          2026/2027 Bespoke Expeditions Now Open for Reservation | 100% Carbon-Neutral Travel
        </span>
        <button
          onClick={() => onOpenBooking()}
          className="underline hover:text-amber-300 font-medium ml-2 cursor-pointer transition-colors"
        >
          Request Private Itinerary →
        </button>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-stone-950/90 backdrop-blur-md shadow-xl py-3 border-b border-stone-800/60"
            : "bg-stone-950/70 backdrop-blur-sm py-4 border-b border-stone-800/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Identity */}
          <a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer text-white select-none"
          >
            <div className="size-9 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <IconCompass className="size-5 text-stone-950 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif tracking-[0.22em] font-semibold text-stone-50 leading-none">
                LUMINA
              </span>
              <span className="text-[0.62rem] tracking-[0.35em] text-amber-400 font-medium uppercase mt-0.5">
                Voyages &amp; Co.
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300 tracking-wide">
            <a
              href="#destinations"
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Destinations
            </a>
            <a
              href="#experience"
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              The Experience
            </a>
            <a
              href="#bespoke-planner"
              className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1 text-amber-300 hover:text-amber-200"
            >
              <IconSparkles className="size-3.5" />
              Bespoke Planner
            </a>
            <a
              href="#stories"
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Traveler Stories
            </a>
            <a
              href="#faq"
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Concierge
            </a>
          </nav>

          {/* Header Action Tools */}
          <div className="flex items-center gap-3">
            {/* Currency Selector */}
            <div className="relative flex items-center text-xs">
              <select
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                aria-label="Select currency"
                className="appearance-none bg-stone-900 text-stone-200 border border-stone-800 rounded-full py-1.5 pl-3 pr-7 hover:border-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-400 text-xs cursor-pointer font-medium"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-stone-900 text-stone-200">
                    {c.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2.5 text-stone-400 text-[10px]">
                ▼
              </span>
            </div>

            {/* Wishlist Button with Counter */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-full bg-stone-900/90 text-stone-200 hover:text-amber-400 hover:bg-stone-800 border border-stone-800 transition-all cursor-pointer"
              title="Saved Journeys"
              aria-label="Wishlist"
            >
              <IconHeart className="size-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-bold text-[10px] size-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Inquire CTA Button */}
            <button
              onClick={() => onOpenBooking()}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-semibold text-xs tracking-wider uppercase shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <IconPhoneCall className="size-3.5" />
              <span>Inquire</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-stone-900 text-stone-300 hover:text-white border border-stone-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <IconX className="size-5" />
              ) : (
                <IconMenu2 className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-stone-950 border-b border-stone-800 px-6 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3 text-stone-200 font-medium text-base">
              <a
                href="#destinations"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400"
              >
                Destinations
              </a>
              <a
                href="#experience"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400"
              >
                The Experience
              </a>
              <a
                href="#bespoke-planner"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400 text-amber-300"
              >
                Bespoke Journey Planner
              </a>
              <a
                href="#stories"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400"
              >
                Traveler Stories
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-400"
              >
                Concierge &amp; FAQ
              </a>
            </nav>
            <div className="pt-3 border-t border-stone-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 rounded-full bg-amber-400 text-stone-950 font-semibold text-center text-xs tracking-wider uppercase"
              >
                Book Travel Consultation
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

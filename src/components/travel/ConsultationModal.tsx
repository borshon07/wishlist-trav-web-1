"use client";

import React, { useState, useEffect } from "react";
import {
  IconX,
  IconSparkles,
  IconCheck,
} from "@tabler/icons-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillTrip?: string;
}

export function ConsultationModal({
  isOpen,
  onClose,
  prefillTrip = "",
}: ConsultationModalProps) {
  const [userEditedTrip, setUserEditedTrip] = useState<string | null>(null);
  const [prevPrefill, setPrevPrefill] = useState(prefillTrip);

  if (prefillTrip !== prevPrefill) {
    setPrevPrefill(prefillTrip);
    setUserEditedTrip(null);
  }

  const trip = userEditedTrip ?? prefillTrip;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dates, setDates] = useState("Summer 2026");
  const [guests, setGuests] = useState("2 Guests (Couple)");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refCode, setRefCode] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate concierge reservation dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setRefCode(`LUM-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 900);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 size-9 rounded-full bg-stone-900 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close consultation modal"
        >
          <IconX className="size-4.5" />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="text-center py-6 space-y-4">
            <div className="size-16 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
              <IconCheck className="size-8 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Request Dispatched
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-50">
                Your Bespoke Journey Begins
              </h3>
            </div>

            <p className="text-xs text-stone-300 max-w-sm mx-auto leading-relaxed font-light">
              Thank you, <span className="font-semibold text-white">{fullName}</span>.
              A senior journey curator has received your inquiry for:
            </p>

            <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 text-amber-300 font-serif text-sm">
              {trip || "Custom Private Itinerary"}
            </div>

            <div className="text-xs text-stone-400">
              Private Reference:{" "}
              <span className="font-mono text-stone-200 font-bold tracking-wider">
                #{refCode}
              </span>
            </div>

            <p className="text-[11px] text-stone-400 max-w-xs mx-auto">
              Our travel director will contact you via email &amp; phone within 4
              hours to present initial flight, villa, and master-guide options.
            </p>

            <button
              onClick={handleReset}
              className="mt-4 px-7 py-2.5 rounded-full bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer"
            >
              Return to Catalog
            </button>
          </div>
        ) : (
          /* Consultation Form */
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <IconSparkles className="size-3.5" />
                <span>Bespoke Travel Consultation</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-50">
                Request a Private Proposal
              </h3>
              <p className="text-stone-400 text-xs mt-1 font-light">
                Our private curators craft each itinerary individually. No
                obligation, 100% confidential.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Selected Trip Display */}
              <div>
                <label className="block text-[10px] uppercase font-semibold text-stone-400 mb-1.5">
                  Expedition / Sanctuary
                </label>
                <input
                  type="text"
                  value={trip}
                  onChange={(e) => setUserEditedTrip(e.target.value)}
                  placeholder="e.g. Amalfi Coast & Capri Yacht Odyssey"
                  required
                  className="w-full bg-stone-900/80 border border-stone-800 rounded-xl py-2.5 px-3.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-stone-400 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Lord / Lady / Dr. / Full Name"
                    className="w-full bg-stone-900/80 border border-stone-800 rounded-xl py-2.5 px-3.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-stone-400 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-stone-900/80 border border-stone-800 rounded-xl py-2.5 px-3.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Phone & Party Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-stone-400 mb-1.5">
                    Telephone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-stone-900/80 border border-stone-800 rounded-xl py-2.5 px-3.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-stone-400 mb-1.5">
                    Party Size
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-stone-900/80 border border-stone-800 rounded-xl py-2.5 px-3.5 text-stone-100 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="2 Guests (Couple)">2 Guests (Couple)</option>
                    <option value="1 Guest (Solo Private)">1 Guest (Solo Private)</option>
                    <option value="3-5 Guests (Family)">3–5 Guests (Family)</option>
                    <option value="6-10 Guests (Villa Buyout)">6–10 Guests (Villa Buyout)</option>
                    <option value="10+ Extended Party">10+ Extended Party</option>
                  </select>
                </div>
              </div>

              {/* Travel Window */}
              <div>
                <label className="block text-[10px] uppercase font-semibold text-stone-400 mb-1.5">
                  Target Travel Window
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Spring 2026", "Summer 2026", "Autumn 2026", "Winter 2026/27"].map(
                    (w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setDates(w)}
                        className={`py-2 rounded-lg text-[11px] font-medium border transition-colors cursor-pointer ${
                          dates === w
                            ? "bg-amber-500 text-stone-950 border-amber-500 font-bold"
                            : "bg-stone-900/60 border-stone-800 text-stone-400 hover:text-white"
                        }`}
                      >
                        {w}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Bespoke Requests */}
              <div>
                <label className="block text-[10px] uppercase font-semibold text-stone-400 mb-1.5">
                  Special Wishes &amp; Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Honeymoon celebration, dietary requirements, private jet charter from London, specific anniversary date..."
                  className="w-full bg-stone-900/80 border border-stone-800 rounded-xl p-3 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50 mt-2"
              >
                {isSubmitting ? "Dispatching to Concierge..." : "Request Bespoke Itinerary & Quote"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useMemo, useEffect } from "react";
import Image from "next/image";
import {
  IconX,
  IconHeart,
  IconTrash,
  IconArrowRight,
  IconClock,
} from "@tabler/icons-react";
import { DESTINATIONS_DATA, Destination, CURRENCIES } from "@/data/destinations";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemoveItem: (id: string) => void;
  onSelectItinerary: (dest: Destination) => void;
  onOpenBookingWithWishlist: (tripList: string) => void;
  currentCurrency: string;
}

export function WishlistDrawer({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveItem,
  onSelectItinerary,
  onOpenBookingWithWishlist,
  currentCurrency,
}: WishlistDrawerProps) {
  const savedDestinations = useMemo(() => {
    return DESTINATIONS_DATA.filter((d) => wishlistIds.includes(d.id));
  }, [wishlistIds]);

  const currencyInfo = useMemo(() => {
    return CURRENCIES.find((c) => c.code === currentCurrency) || CURRENCIES[0];
  }, [currentCurrency]);

  const totalValue = useMemo(() => {
    const sumUSD = savedDestinations.reduce((acc, curr) => acc + curr.priceUSD, 0);
    return Math.round(sumUSD * currencyInfo.rate);
  }, [savedDestinations, currencyInfo]);

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

  const handleInquireAll = () => {
    const list = savedDestinations.map((d) => d.title).join(", ");
    onOpenBookingWithWishlist(`Wishlist Collection: ${list}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed Blurred Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-950 border-l border-stone-800 shadow-2xl flex flex-col justify-between">
          {/* Drawer Top Header */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <IconHeart className="size-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-100">
                  Saved Journeys
                </h3>
                <span className="text-xs text-stone-400 font-light">
                  {savedDestinations.length}{" "}
                  {savedDestinations.length === 1 ? "expedition" : "expeditions"} saved
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="size-8 rounded-full bg-stone-900 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close wishlist drawer"
            >
              <IconX className="size-4.5" />
            </button>
          </div>

          {/* Drawer Items Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedDestinations.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="size-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center mx-auto text-stone-600">
                  <IconHeart className="size-8" />
                </div>
                <h4 className="font-serif text-stone-200 text-base">
                  Your Wishlist is Empty
                </h4>
                <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
                  Click the heart icon on any expedition card to bookmark and
                  compare your dream itineraries.
                </p>
              </div>
            ) : (
              savedDestinations.map((item) => {
                const formattedPrice = `${currencyInfo.symbol}${Math.round(
                  item.priceUSD * currencyInfo.rate
                ).toLocaleString()}`;

                return (
                  <div
                    key={item.id}
                    className="p-3.5 bg-stone-900/60 border border-stone-800 rounded-2xl flex gap-3.5 group hover:border-amber-500/40 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="relative size-20 rounded-xl overflow-hidden shrink-0 bg-stone-800">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-serif font-bold text-stone-200 truncate">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-stone-500 hover:text-rose-400 p-0.5 transition-colors cursor-pointer shrink-0"
                            title="Remove from wishlist"
                          >
                            <IconTrash className="size-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-0.5">
                          <IconClock className="size-3 text-amber-400" />
                          <span>{item.duration}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-800/80">
                        <span className="text-xs font-bold text-amber-300">
                          {formattedPrice}{" "}
                          <span className="text-[10px] text-stone-400 font-normal">
                            {currencyInfo.code}
                          </span>
                        </span>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectItinerary(item);
                          }}
                          className="text-[11px] text-stone-300 hover:text-amber-400 font-medium underline cursor-pointer"
                        >
                          View Plan
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Bottom Bar */}
          {savedDestinations.length > 0 && (
            <div className="p-6 bg-stone-950 border-t border-stone-800 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">Total Wishlist Value</span>
                <span className="text-base font-serif font-bold text-amber-300">
                  {currencyInfo.symbol}
                  {totalValue.toLocaleString()}{" "}
                  <span className="text-xs font-sans text-stone-400 font-normal">
                    {currencyInfo.code}
                  </span>
                </span>
              </div>

              <button
                onClick={handleInquireAll}
                className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Inquire About Saved Journeys</span>
                <IconArrowRight className="size-4 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

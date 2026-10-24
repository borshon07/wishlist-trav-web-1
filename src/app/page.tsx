"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/travel/Navbar";
import { HeroSection } from "@/components/travel/HeroSection";
import { DestinationsCatalog } from "@/components/travel/DestinationsCatalog";
import { WhyLuminaSection } from "@/components/travel/WhyLuminaSection";
import { TripCalculator } from "@/components/travel/TripCalculator";
import { TestimonialsSection } from "@/components/travel/TestimonialsSection";
import { Footer } from "@/components/travel/Footer";
import { JourneyItineraryModal } from "@/components/travel/JourneyItineraryModal";
import { WishlistDrawer } from "@/components/travel/WishlistDrawer";
import { ConsultationModal } from "@/components/travel/ConsultationModal";
import { DESTINATIONS_DATA, Destination } from "@/data/destinations";
import { IconHeartFilled, IconCheck } from "@tabler/icons-react";

export default function Home() {
  const [wishlist, setWishlist] = useState<string[]>(["amalfi-coast", "kyoto-zen"]);
  const [currentCurrency, setCurrentCurrency] = useState("USD");
  const [selectedItinerary, setSelectedItinerary] = useState<Destination | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefillTrip, setBookingPrefillTrip] = useState("");
  const [heroSearchFilter, setHeroSearchFilter] = useState({
    destination: "",
    category: "",
    guests: "",
  });

  // Client hydration for saved preferences
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("lumina_wishlist");
      const savedCurrency = localStorage.getItem("lumina_currency");
      if (savedWishlist || savedCurrency) {
        requestAnimationFrame(() => {
          if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
          }
          if (savedCurrency) {
            setCurrentCurrency(savedCurrency);
          }
        });
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  // Save changes to localStorage
  const updateCurrency = (code: string) => {
    setCurrentCurrency(code);
    try {
      localStorage.setItem("lumina_currency", code);
    } catch {
      // Ignore
    }
  };

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleWishlist = (id: string) => {
    const dest = DESTINATIONS_DATA.find((d) => d.id === id);
    const title = dest ? dest.title : "Journey";

    setWishlist((prev) => {
      let updated: string[];
      if (prev.includes(id)) {
        showToast(`Removed "${title}" from your wishlist`);
        updated = prev.filter((item) => item !== id);
      } else {
        showToast(`Saved "${title}" to your wishlist`);
        updated = [...prev, id];
      }
      try {
        localStorage.setItem("lumina_wishlist", JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleOpenBooking = (prefill?: string) => {
    setBookingPrefillTrip(prefill || "");
    setIsBookingOpen(true);
  };

  const handleHeroSearch = (filters: { destination: string; category: string; guests: string }) => {
    setHeroSearchFilter(filters);
    const destElem = document.getElementById("destinations");
    if (destElem) {
      destElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToDestinations = () => {
    const destElem = document.getElementById("destinations");
    if (destElem) {
      destElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900/95 border border-amber-500/40 text-stone-100 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-200">
          <div className="size-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <IconCheck className="size-3.5 stroke-[2.5]" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Luxury Navigation */}
      <Navbar
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenBooking={handleOpenBooking}
        currentCurrency={currentCurrency}
        onCurrencyChange={updateCurrency}
      />

      {/* Hero Section */}
      <HeroSection
        onSearch={handleHeroSearch}
        onExploreClick={scrollToDestinations}
      />

      {/* Featured Expeditions Catalog */}
      <DestinationsCatalog
        destinations={DESTINATIONS_DATA}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onSelectItinerary={setSelectedItinerary}
        onOpenBooking={handleOpenBooking}
        currentCurrency={currentCurrency}
        initialSearchQuery={heroSearchFilter.destination}
        initialCategory={heroSearchFilter.category}
      />

      {/* The Lumina Standard / Service Pillars */}
      <WhyLuminaSection />

      {/* Interactive Bespoke Journey Planner & Calculator */}
      <TripCalculator
        currentCurrency={currentCurrency}
        onOpenBookingWithCustom={(summary) => handleOpenBooking(summary)}
      />

      {/* Traveler Stories & Accolades */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />

      {/* Detailed Itinerary Modal */}
      <JourneyItineraryModal
        destination={selectedItinerary}
        onClose={() => setSelectedItinerary(null)}
        isWishlisted={selectedItinerary ? wishlist.includes(selectedItinerary.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenBooking={handleOpenBooking}
        currentCurrency={currentCurrency}
      />

      {/* Saved Journeys Slide-over Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        onRemoveItem={handleToggleWishlist}
        onSelectItinerary={setSelectedItinerary}
        onOpenBookingWithWishlist={(list) => handleOpenBooking(list)}
        currentCurrency={currentCurrency}
      />

      {/* Private Consultation & Booking Modal */}
      <ConsultationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefillTrip={bookingPrefillTrip}
      />

      {/* Floating Wishlist Pill (Mobile & Quick Access) */}
      {wishlist.length > 0 && !isWishlistOpen && (
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-stone-900/90 hover:bg-stone-800 text-stone-100 border border-amber-500/40 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs font-semibold cursor-pointer hover:scale-105 active:scale-95 transition-all"
        >
          <IconHeartFilled className="size-4 text-rose-500" />
          <span>{wishlist.length} Saved {wishlist.length === 1 ? "Trip" : "Trips"}</span>
          <span className="text-[10px] text-amber-400 uppercase tracking-wider font-bold">
            Review
          </span>
        </button>
      )}
    </div>
  );
}

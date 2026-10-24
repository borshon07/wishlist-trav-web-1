export interface ItineraryItem {
  day: number;
  title: string;
  desc: string;
}

export interface Destination {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  country: string;
  category: 'Coastal & Island' | 'Cultural Immersion' | 'Mountain Escapes' | 'Wildlife & Safari' | 'Wellness & Nature';
  image: string;
  rating: number;
  reviewsCount: number;
  duration: string;
  durationDays: number;
  groupSize: string;
  priceUSD: number;
  featured: boolean;
  badge: string;
  bestSeason: string;
  flightTimeNote: string;
  highlights: string[];
  itinerary: ItineraryItem[];
  included: string[];
}

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: 'amalfi-coast',
    title: 'Amalfi Coast & Capri Private Yacht Odyssey',
    subtitle: 'Cliffside Sanctuaries, Limoncello Groves & Mediterranean Azure',
    location: 'Positano, Capri & Ravello',
    country: 'Italy',
    category: 'Coastal & Island',
    image: '/images/amalfi.jpg',
    rating: 4.98,
    reviewsCount: 142,
    duration: '8 Days / 7 Nights',
    durationDays: 8,
    groupSize: 'Private (2-8 guests)',
    priceUSD: 6450,
    featured: true,
    badge: 'Curator Signature',
    bestSeason: 'May – October',
    flightTimeNote: 'Direct helicopter from Naples Capodichino',
    highlights: [
      'Private 48ft Riva Yacht charter to secluded Capri coves',
      'Cliffside 2-Star Michelin private terrace tasting in Positano',
      'VIP evening access to 13th-century Villa Rufolo gardens',
      'Private sommelier tour through heroic mountain vineyards'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Helicopter Transfer to Cliffside Positano Estate',
        desc: 'Board your private helicopter from Naples directly to the cliffside estate helipad. Unwind with a chilled Franciacorta reception overlooking the emerald waters of Li Galli.'
      },
      {
        day: 2,
        title: 'Full-Day Riva Charter: Capri & Emerald Grottos',
        desc: 'Sail past iconic Faraglioni sea stacks. Swim in hidden turquoise lagoons, explore the secret Green Grotto, and anchor for seafood at a cliff-carved cove.'
      },
      {
        day: 3,
        title: 'Ravello Heights & Ancient Villa Rufolo Exclusives',
        desc: 'Climb into the clouds of Ravello with a master architectural historian. Experience private harpsichord performances in cloistered stone courtyards.'
      },
      {
        day: 4,
        title: 'Vintage Alfa Romeo Coastal Panorama & Cellar Reserves',
        desc: 'Pilot a hand-restored 1965 Alfa Romeo Spider along the serpentine corniche with our lead scout, concluding at a 300-year-old pre-phylloxera volcanic cellar.'
      }
    ],
    included: [
      '7 nights in bespoke cliffside villa with infinity plunge pool',
      'Private 48ft Riva Dolceriva charter with captain & steward',
      'All gourmet breakfasts & 3 Michelin-starred chef banquets',
      'Dedicated 24/7 private concierge & bilingual escort driver'
    ]
  },
  {
    id: 'kyoto-zen',
    title: 'Kyoto & Kanazawa Imperial Sanctuary',
    subtitle: 'Timeless Zen, Private Ryokan Onsen & Living Cultural Treasures',
    location: 'Kyoto, Arashiyama & Kanazawa',
    country: 'Japan',
    category: 'Cultural Immersion',
    image: '/images/kyoto.jpg',
    rating: 4.99,
    reviewsCount: 98,
    duration: '9 Days / 8 Nights',
    durationDays: 9,
    groupSize: 'Private (2-6 guests)',
    priceUSD: 7800,
    featured: true,
    badge: 'Ultra-Exclusive',
    bestSeason: 'March – May & Oct – Dec',
    flightTimeNote: 'VIP fast-track transfer from Kansai International',
    highlights: [
      'After-hours private meditation in 600-year-old Zen temple',
      'Sukiya-style Tea Ceremony with 15th-generation Grand Master',
      'Heritage wooden machiya & private thermal onsen bath suites',
      'Private artisan gold leaf & lacquer masterclass in Kanazawa'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Kyoto Heritage Arrival & Twilight Welcome',
        desc: 'Arrive via private luxury express. Check into your restored historic temple machiya, followed by a welcome Kaiseki feast by a National Living Treasure.'
      },
      {
        day: 2,
        title: 'Dawn at Bamboo Sanctuaries & Private Tea Pavilions',
        desc: 'Enter Arashiyama forest at first sunrise without a soul in sight. Sip hand-whisked ceremonial Uji matcha inside a secluded moss pavilion.'
      },
      {
        day: 3,
        title: 'Shinkansen Gran Class to Kanazawa Castle Town',
        desc: 'Travel in ultra-luxury first class to the preserved geisha districts of Higashi Chaya. Enjoy an exclusive gold leaf application atelier session.'
      },
      {
        day: 4,
        title: 'Alpine Onsen Immersion & 14-Course Forest Kaiseki',
        desc: 'Retreat to secluded cedar-forested thermal springs. Experience traditional mineral hydrotherapy and a multi-course dinner paired with vintage junmai daiginjo.'
      }
    ],
    included: [
      'Private luxury Ryokan suites with indoor/outdoor cypress onsen baths',
      'All Shinkansen Gran Class transfers & private Mercedes-Maybach ground transport',
      'Full daily Kaiseki dining experiences & sommelier pairings',
      'Personal bilingual historian & licensed Kyoto cultural master'
    ]
  },
  {
    id: 'swiss-alps',
    title: 'Swiss Alpine Majesty & Heliski Retreat',
    subtitle: 'Matterhorn Chalet, Glacier Flights & Thermal Forest Spas',
    location: 'Zermatt, Gornergrat & Valais',
    country: 'Switzerland',
    category: 'Mountain Escapes',
    image: '/images/swiss-alps.jpg',
    rating: 4.97,
    reviewsCount: 115,
    duration: '7 Days / 6 Nights',
    durationDays: 7,
    groupSize: 'Private (2-10 guests)',
    priceUSD: 8900,
    featured: true,
    badge: 'Winter & Autumn Classic',
    bestSeason: 'December – April & July – Sept',
    flightTimeNote: 'Private heli-transfer from Zurich or Geneva Airport',
    highlights: [
      'Ski-in/ski-out timber chalet facing the dramatic Matterhorn',
      'Private helicopter glacier flight over the Monte Rosa massif',
      'Open-air steaming cedar hot tub & outdoor roaring fire hearth',
      'Artisanal Valais truffle fondue paired with rare Swiss reserve vintages'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Glacier Express Excellence Class & Zermatt Arrival',
        desc: 'Glide through snow-clad mountain passes with 5-course gourmet dining aboard the iconic Excellence Class train. Private electric limousine escort to your chalet.'
      },
      {
        day: 2,
        title: 'Matterhorn Helicopter Tour & Untouched Powder Runs',
        desc: 'Board Air Zermatt directly from the mountain ridge. Touch down on virgin glacier slopes alongside your private IFMGA mountain guide.'
      },
      {
        day: 3,
        title: 'Alpine Botanicals Spa Day & Sunset Outdoor Hot Tub',
        desc: 'Recharge with personalized hot stone therapies infused with mountain arnica and pine. Sip vintage champagne in the outdoor steaming cedar tub as the Matterhorn turns gold.'
      },
      {
        day: 4,
        title: 'Torchlit Snowshoe Hike to High-Alpine Cabin Feast',
        desc: 'Traverse whispering pine forests by starlight to a hidden 2,200m wood cabin for melted Gruyère, shaved black truffles, and fireside storytelling.'
      }
    ],
    included: [
      'Full private buyout of luxury alpine timber chalet with private staff',
      'Daily ski passes with top-tier Stöckli performance equipment',
      'Private Air Zermatt helicopter flight for up to 6 guests',
      'Private chef preparing bespoke daily mountain breakfasts and dinners'
    ]
  },
  {
    id: 'serengeti-safari',
    title: 'The Great Serengeti & Ngorongoro Migration',
    subtitle: 'Luxury Tented Pavilions, Sunrise Ballooning & Big Five Tracking',
    location: 'Serengeti & Ngorongoro Crater',
    country: 'Tanzania',
    category: 'Wildlife & Safari',
    image: '/images/serengeti.jpg',
    rating: 5.0,
    reviewsCount: 86,
    duration: '8 Days / 7 Nights',
    durationDays: 8,
    groupSize: 'Private (2-6 guests)',
    priceUSD: 9600,
    featured: true,
    badge: 'Once-In-A-Lifetime',
    bestSeason: 'July – October & Jan – March',
    flightTimeNote: 'Private bush plane direct to Serengeti Seronera airstrip',
    highlights: [
      'Sunrise hot air balloon flight with champagne bush breakfast',
      'Private open-sided custom Land Cruiser with master naturalist tracker',
      'Elevated canvas suites with plunge pool overlooking acacia plains',
      'Exclusive permit descent into Ngorongoro Crater caldera'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Bush Plane Landing & First Game Drive',
        desc: 'Touch down on the golden savanna airstrip. Encounter elephants and zebras on the panoramic transfer to your private tented sanctuary.'
      },
      {
        day: 2,
        title: 'Dawn Hot Air Balloon Ascent Over the Migration',
        desc: 'Rise with the mist and drift silently above million-strong herds of wildebeest. Descend to a white-linen breakfast under ancient acacia trees.'
      },
      {
        day: 3,
        title: 'Deep Serengeti Big Cat Tracking & River Crossings',
        desc: 'Witness pride of lions and elusive leopards along the Mara riverbank with our master tracker equipped with high-powered Swarovski spotting optics.'
      },
      {
        day: 4,
        title: 'Ngorongoro Caldera Floor Expedition & Stargazing',
        desc: 'Descend 600 meters into the UNESCO crater to observe critically endangered black rhinos and pink flamingo flocks along Lake Magadi.'
      }
    ],
    included: [
      'All internal private bush flights and charter connections',
      'Exclusive luxury tented lodge accommodations with private verandas',
      'All national park conservation fees and crater floor descent permits',
      'Full-board gourmet cuisine, premium wines, and bush sundowners'
    ]
  },
  {
    id: 'santorini-cave',
    title: 'Aegean Caldera Dream & Secret Cyclades',
    subtitle: 'Whitewashed Cliffside Cave Suites & Private Catamaran Odyssey',
    location: 'Oia, Imerovigli & Milos',
    country: 'Greece',
    category: 'Coastal & Island',
    image: '/images/santorini.jpg',
    rating: 4.96,
    reviewsCount: 164,
    duration: '6 Days / 5 Nights',
    durationDays: 6,
    groupSize: 'Private (2-4 guests)',
    priceUSD: 5400,
    featured: false,
    badge: 'Romantic Reverie',
    bestSeason: 'April – October',
    flightTimeNote: 'VIP ramp transfer from Thira Airport',
    highlights: [
      'Carved whitewashed cave villa with heated cliffside plunge pool',
      'Sunset catamaran cruise around volcanic hot springs & Red Beach',
      'Private sommelier tasting of rare Assyrtiko in volcanic cellars',
      'Heli-hop to secluded Milos sea caves and lunar rock beaches'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Oia & Sunset Terrace Reception',
        desc: 'Private escort down the historic cobblestones of Oia to your secluded caldera-view cave suite. Savor chilled Santorini wines as the sun sets pink over the Aegean.'
      },
      {
        day: 2,
        title: 'Private Catamaran Voyage & Thermal Springs',
        desc: 'Cruise along the volcanic rim aboard a luxury lagoon catamaran. Snorkel around hidden sea caves and feast on fresh grilled Mediterranean lobster.'
      },
      {
        day: 3,
        title: 'Volcanic Terroir & Gourmet Vineyard Journey',
        desc: 'Discover 150-year-old ungrafted basket vines. Enjoy an exclusive candlelit wine pairing inside an ancient canava with Santorini\'s master vintners.'
      },
      {
        day: 4,
        title: 'Helicopter Transfer to Secret Milos Coves',
        desc: 'Fly across turquoise waters to the chalk-white lunar landscapes of Sarakiniko and secret pirate hideaways of Kleftiko.'
      }
    ],
    included: [
      '5 nights in an authentic caldera-edge cave suite with heated plunge pool',
      'Full-day private crewed catamaran sailing with gourmet barbecue',
      'VIP helicopter round-trip excursion to Milos',
      'Daily champagne breakfast served on your private panoramic terrace'
    ]
  },
  {
    id: 'bali-jungle',
    title: 'Ubud Rainforest Sanctuary & Sacred Waterfalls',
    subtitle: 'Biophilic Bamboo Villas, Sound Healing & Hidden Spas',
    location: 'Ubud, Ayung River & Munduk',
    country: 'Indonesia',
    category: 'Wellness & Nature',
    image: '/images/bali.jpg',
    rating: 4.95,
    reviewsCount: 129,
    duration: '7 Days / 6 Nights',
    durationDays: 7,
    groupSize: 'Private (2-6 guests)',
    priceUSD: 4200,
    featured: false,
    badge: 'Holistic Wellness',
    bestSeason: 'April – October',
    flightTimeNote: 'VIP fast-track escort through Denpasar Airport',
    highlights: [
      'Architectural bamboo palace suspended high over misty Ayung valley',
      'Private water cleansing ritual at sacred Tirta Empul spring',
      'Tibetan singing bowl sound immersion and herbal Ayurvedic spas',
      'Farm-to-table culinary workshop with organic permaculture chefs'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Sacred Valley Arrival & Blessing Ceremony',
        desc: 'Arrive at your hand-crafted bamboo architectural sanctuary. Welcome traditional flower blessing and sunset sound bath overlooking the jungle canopy.'
      },
      {
        day: 2,
        title: 'Dawn Purification Ritual & Secret Waterfall Trek',
        desc: 'Dawn private visit to a secluded jungle waterfall and holy spring with an honored village Balinese priest for a soul-cleansing water ceremony.'
      },
      {
        day: 3,
        title: 'Ayurvedic Botanical Spa & Treehouse Dining',
        desc: 'Indulge in a 4-hour wellness journey featuring native volcanic mud, warmed herbal oils, and organic culinary elixirs served in a suspended nest.'
      },
      {
        day: 4,
        title: 'Munduk Cloud Forest & Emerald Crater Lakes',
        desc: 'Journey into the cooler northern highlands to explore hidden coffee estates, misty crater lakes, and ancient rainforest pathways.'
      }
    ],
    included: [
      '6 nights in a private multi-tiered bamboo villa with private spring-fed pool',
      'Daily private yoga, breathwork, and master sound healing sessions',
      'All organic farm-to-table culinary experiences and wellness elixirs',
      'Private 4WD safari explorer with certified Balinese cultural guide'
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Eleanor & Marcus Vance',
    location: 'London, UK',
    trip: 'Amalfi Coast & Capri Odyssey',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quote: 'The helicopter transfer straight onto the cliffside helipad was surreal. Having the Riva yacht take us to sea caves where no tourist boats could enter was the highlight of our decade. Truly unmatched elegance.'
  },
  {
    id: 2,
    name: 'Julian Montgomery',
    location: 'Geneva, Switzerland',
    trip: 'Kyoto Imperial Sanctuary',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote: 'Meditation in the 600-year-old temple after the gates closed to the public was deeply moving. Lumina Voyages unlocks doors that simply do not exist for standard luxury travelers.'
  },
  {
    id: 3,
    name: 'Dr. Sophia & David Chen',
    location: 'San Francisco, USA',
    trip: 'Serengeti & Ngorongoro Safari',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    quote: 'Waking up to elephants drinking at the private waterhole directly in front of our elevated tent deck was pure magic. Our Maasai tracker was phenomenal. We booked our next journey before we even left!'
  }
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)' },
  { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', rate: 0.79, label: 'GBP (£)' },
  { code: 'AUD', symbol: 'A$', rate: 1.52, label: 'AUD (A$)' },
  { code: 'CAD', symbol: 'C$', rate: 1.38, label: 'CAD (C$)' },
];

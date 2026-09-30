import React, { useState, useMemo } from 'react';
import { Restaurant, Screen } from '../types';

interface ExploreNearbyProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onNavigate: (screen: Screen) => void;
  onApplyPerk: (code: string) => void;
  appliedPromo: string | null;
  currentAddress: string;
  onOpenAddress: () => void;
  searchQuery: string;
  hasActiveOrder?: boolean;
}

export const ExploreNearby: React.FC<ExploreNearbyProps> = ({
  restaurants,
  onSelectRestaurant,
  onNavigate,
  onApplyPerk,
  appliedPromo,
  currentAddress,
  onOpenAddress,
  searchQuery,
  hasActiveOrder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Flavors');
  const [fastestOnly, setFastestOnly] = useState<boolean>(false);
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState<boolean>(false);
  const [topRatedOnly, setTopRatedOnly] = useState<boolean>(false);
  const [under30Only, setUnder30Only] = useState<boolean>(false);
  const [openNow, setOpenNow] = useState<boolean>(true);
  const [offersOnly, setOffersOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'nearest' | 'rating' | 'price'>('nearest');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = useMemo(() => {
    const cats = [
      { name: 'Gourmet Burgers', icon: 'lunch_dining' },
      { name: 'Wood-fired Pizza', icon: 'local_pizza' },
      { name: 'Fresh Sushi', icon: 'set_meal' },
      { name: 'Asian Wok', icon: 'ramen_dining' },
      { name: 'Healthy Bowls', icon: 'spa' },
      { name: 'Artisanal Bakery', icon: 'bakery_dining' },
      { name: 'Mexican Tacos', icon: 'tapas' },
      { name: 'Italian Pasta', icon: 'dinner_dining' },
      { name: 'Indian Curries', icon: 'local_dining' },
    ];

    let totalDishes = 0;
    restaurants.forEach(r => totalDishes += r.menu.length);

    const mappedCats = cats.map(cat => {
      const matching = restaurants.filter(r =>
        r.tags.includes(cat.name) ||
        r.cuisine.toLowerCase().includes(cat.name.toLowerCase()) ||
        r.name.toLowerCase().includes(cat.name.toLowerCase())
      );
      const dishCount = matching.reduce((sum, r) => sum + r.menu.length, 0);
      return { ...cat, count: dishCount };
    });

    return [
      { name: 'All Flavors', icon: 'restaurant', count: totalDishes },
      ...mappedCats
    ];
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      // Category filter
      if (selectedCategory !== 'All Flavors') {
        const matchesCategory =
          r.tags.includes(selectedCategory) ||
          r.cuisine.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          r.name.toLowerCase().includes(selectedCategory.toLowerCase());
        if (!matchesCategory) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.trending.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)) ||
          r.menu.some((m) => m.name.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Quick filter pills
      const maxTimeMatch = r.deliveryTime.match(/-(\d+)/) || r.deliveryTime.match(/(\d+)/);
      const maxTime = maxTimeMatch ? parseInt(maxTimeMatch[1], 10) : 999;

      if (freeDeliveryOnly && r.deliveryFee > 0) return false;
      if (topRatedOnly && r.rating < 4.5) return false;
      if (fastestOnly && maxTime > 20) return false;
      if (under30Only && maxTime >= 30) return false;
      if (offersOnly && !r.perks?.length) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.deliveryFee - b.deliveryFee;
      // Default: nearest (by distance number)
      const distA = parseFloat(a.distance);
      const distB = parseFloat(b.distance);
      return distA - distB;
    });
  }, [
    restaurants,
    selectedCategory,
    searchQuery,
    freeDeliveryOnly,
    topRatedOnly,
    fastestOnly,
    under30Only,
    offersOnly,
    sortBy,
  ]);

  return (
    <div className="flex flex-col w-full">
      {/* Geolocation & Radius Sub-Header */}
      <section className="w-full bg-[#f2f3ff] px-4 sm:px-6 lg:px-8 py-4 border-b border-[#eaedff]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f97316]/15 text-[#f97316] shrink-0">
              <span className="material-symbols-outlined text-[24px]">near_me</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-[11px] text-[#8c7164] uppercase tracking-wider font-semibold">
                Active Geolocation
              </span>
              <div className="flex items-center gap-2">
                <h1 className="font-headline-sm text-lg text-[#131b2e] font-bold">
                  Near{' '}
                  <span className="text-[#f97316] underline decoration-[#f97316]/40 underline-offset-4">
                    {currentAddress}
                  </span>
                </h1>
                <button
                  onClick={onOpenAddress}
                  className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd] transition-colors font-label-sm text-xs flex items-center gap-1 cursor-pointer"
                  type="button"
                >
                  <span>Change</span>
                  <span className="material-symbols-outlined text-[14px]">swap_horiz</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">

            <button
              onClick={() => setFastestOnly(!fastestOnly)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full shadow-2xs font-label-md text-xs transition-colors cursor-pointer border ${
                fastestOnly
                  ? 'bg-[#006c49] text-white border-[#006c49]'
                  : 'bg-white text-[#131b2e] border-[#eaedff] hover:bg-[#eaedff]'
              }`}
              type="button"
            >
              <span className={`material-symbols-outlined text-[18px] ${fastestOnly ? 'text-white' : 'text-[#006c49]'}`}>
                bolt
              </span>
              <span>Fastest (&lt; 20 min)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Category Pills Strip */}
      <section className="w-full bg-white py-3.5 overflow-x-auto no-scrollbar border-b border-[#eaedff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2.5 min-w-max">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-label-md text-xs transition-all cursor-pointer shadow-2xs ${
                  isSelected
                    ? 'bg-[#131b2e] text-white'
                    : 'bg-[#faf8ff] text-[#131b2e] hover:bg-[#eaedff] border border-[#eaedff]'
                }`}
                type="button"
              >
                <span className={`material-symbols-outlined text-[18px] ${isSelected ? 'text-[#f97316]' : 'text-[#f97316]'}`}>
                  {cat.icon}
                </span>
                <span>{cat.name}</span>
                {cat.count && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isSelected ? 'bg-[#f97316] text-white' : 'bg-[#eaedff] text-[#131b2e]'
                    }`}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Filter Bar & Sort Options */}
      <section className="w-full bg-[#faf8ff] py-3 px-4 sm:px-6 lg:px-8 border-b border-[#eaedff]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setOffersOnly(!offersOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                offersOnly
                  ? 'bg-[#f97316] text-white'
                  : 'bg-white text-[#131b2e] border border-[#eaedff] hover:bg-[#eaedff]'
              }`}
              type="button"
            >
              <span className={`material-symbols-outlined text-[15px] ${offersOnly ? 'text-white' : 'text-[#f97316]'}`}>
                local_offer
              </span>
              <span>Offers &amp; Promos</span>
            </button>

            <button
              onClick={() => setFreeDeliveryOnly(!freeDeliveryOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                freeDeliveryOnly
                  ? 'bg-[#006c49] text-white'
                  : 'bg-white text-[#131b2e] border border-[#eaedff] hover:bg-[#eaedff]'
              }`}
              type="button"
            >
              <span className={`material-symbols-outlined text-[15px] ${freeDeliveryOnly ? 'text-white' : 'text-[#006c49]'}`}>
                moped
              </span>
              <span>₹0 Free Delivery</span>
            </button>

            <button
              onClick={() => setOpenNow(!openNow)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                openNow
                  ? 'bg-[#6ffbbe] text-[#002113]'
                  : 'bg-white text-[#131b2e] border border-[#eaedff] hover:bg-[#eaedff]'
              }`}
              type="button"
            >
              <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
              <span>Open Now</span>
            </button>

            <button
              onClick={() => setUnder30Only(!under30Only)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                under30Only
                  ? 'bg-[#9d4300] text-white'
                  : 'bg-white text-[#131b2e] border border-[#eaedff] hover:bg-[#eaedff]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[15px] text-[#8c7164]">schedule</span>
              <span>Under 30 Mins</span>
            </button>

            <button
              onClick={() => setTopRatedOnly(!topRatedOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                topRatedOnly
                  ? 'bg-[#f97316] text-white'
                  : 'bg-white text-[#131b2e] border border-[#eaedff] hover:bg-[#eaedff]'
              }`}
              type="button"
            >
              <span className={`material-symbols-outlined text-[15px] ${topRatedOnly ? 'text-white' : 'text-[#f97316]'}`}>
                star
              </span>
              <span>Top Rated 4.5+</span>
            </button>
          </div>

          {/* Sorting Control */}
          <div className="flex items-center gap-2">
            <span className="font-body-sm text-xs text-[#8c7164]">Sort:</span>
            <div className="inline-flex items-center gap-1 bg-white rounded-full p-1 border border-[#eaedff] shadow-2xs">
              <button
                onClick={() => setSortBy('nearest')}
                className={`px-2.5 py-1 rounded-full font-label-sm text-xs cursor-pointer transition-colors ${
                  sortBy === 'nearest'
                    ? 'bg-[#eaedff] text-[#9d4300] font-bold'
                    : 'text-[#584237] hover:text-[#131b2e]'
                }`}
                type="button"
              >
                Nearest First
              </button>
              <button
                onClick={() => setSortBy('rating')}
                className={`px-2.5 py-1 rounded-full font-label-sm text-xs cursor-pointer transition-colors ${
                  sortBy === 'rating'
                    ? 'bg-[#eaedff] text-[#9d4300] font-bold'
                    : 'text-[#584237] hover:text-[#131b2e]'
                }`}
                type="button"
              >
                Rating
              </button>
              <button
                onClick={() => setSortBy('price')}
                className={`px-2.5 py-1 rounded-full font-label-sm text-xs cursor-pointer transition-colors ${
                  sortBy === 'price'
                    ? 'bg-[#eaedff] text-[#9d4300] font-bold'
                    : 'text-[#584237] hover:text-[#131b2e]'
                }`}
                type="button"
              >
                Price
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Sidebar + Restaurant Cards */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar: Proximity Radar & Local Perk */}
        <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          {/* Proximity Radar Box */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#eaedff] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f97316] text-[22px]">radar</span>
                <span className="font-headline-sm text-base text-[#131b2e] font-bold">Proximity Radar</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#006c49]/10 text-[#006c49] font-label-sm text-xs font-semibold">
                8 active couriers
              </span>
            </div>

            {/* Radar Visual Container */}
            <div className="relative w-full h-56 rounded-xl overflow-hidden bg-[#e2e7ff] border border-[#dae2fd]">
              {/* Background Map Graphic Grid */}
              <div
                className="w-full h-full bg-cover bg-center opacity-85"
                style={{
                  backgroundImage: `radial-gradient(circle at center, #eaedff 0%, #dae2fd 100%)`,
                }}
              >
                {/* SVG Radar rings */}
                <svg className="w-full h-full absolute inset-0" viewBox="0 0 300 220">
                  <circle cx="150" cy="110" r="30" fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
                  <circle cx="150" cy="110" r="60" fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="4 3" opacity="0.3" />
                  <circle cx="150" cy="110" r="90" fill="none" stroke="#006c49" strokeWidth="1" opacity="0.2" />
                  {/* Radar sweep */}
                  <line x1="150" y1="110" x2="260" y2="40" stroke="#f97316" strokeWidth="1.5" opacity="0.6">
                    <animateTransform attributeName="transform" type="rotate" from="0 150 110" to="360 150 110" dur="4s" repeatCount="indefinite" />
                  </line>
                </svg>
              </div>

              {/* Center: You Are Here Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#f97316] opacity-75"></span>
                  <div className="w-7 h-7 rounded-full bg-[#f97316] border-2 border-white shadow-md flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[14px]">home</span>
                  </div>
                </div>
                <span className="mt-1 px-2 py-0.5 rounded-full bg-[#283044]/95 text-white font-label-sm text-[10px] font-bold shadow">
                  You Are Here
                </span>
              </div>

              {/* Active Courier 1 */}
              <div className="absolute top-6 left-8 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow text-[#131b2e] border border-[#eaedff]">
                <span className="material-symbols-outlined text-[14px] text-[#006c49]">two_wheeler</span>
                <span className="font-label-sm text-[11px] font-bold">0.4 mi</span>
              </div>

              {/* Restaurant Marker 1 */}
              <div className="absolute bottom-8 right-6 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow text-[#131b2e] border border-[#eaedff]">
                <span className="material-symbols-outlined text-[14px] text-[#f97316]">restaurant</span>
                <span className="font-label-sm text-[11px] font-bold">0.6 mi</span>
              </div>

              {/* Restaurant Marker 2 */}
              <div className="absolute top-8 right-8 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow text-[#131b2e] border border-[#eaedff]">
                <span className="material-symbols-outlined text-[14px] text-[#9d4300]">storefront</span>
                <span className="font-label-sm text-[11px] font-bold">1.1 mi</span>
              </div>
            </div>

            <p className="font-body-sm text-xs text-[#584237] leading-relaxed">
              Live dispatch cloud calculating traffic delays. Average arrival window:{' '}
              <strong className="text-[#131b2e]">18 minutes</strong>.
            </p>
          </div>

          {/* Local Perk Card */}
          <div className="bg-gradient-to-br from-[#ffdbca] via-[#ffdbca]/80 to-[#f2f3ff] rounded-2xl p-5 shadow-xs border border-[#ffb690]/40 flex flex-col gap-2">
            <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#783200] font-bold">
              Local Perk
            </span>
            <h2 className="font-headline-sm text-base text-[#341100] font-extrabold leading-tight">
              Zero delivery fee on your next 3 neighborhood orders
            </h2>
            <p className="font-body-sm text-xs text-[#584237]">
              Order within 1.5 miles to support hyper-local culinary artisans.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-label-md text-xs font-bold text-[#582200] bg-white/70 px-2.5 py-1 rounded-md">
                CODE: NEIGHBOR3
              </span>
              <button
                onClick={() => onApplyPerk('NEIGHBOR3')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold shadow transition-all cursor-pointer ${
                  appliedPromo === 'NEIGHBOR3'
                    ? 'bg-[#006c49] text-white'
                    : 'bg-[#f97316] text-white hover:bg-[#b02f00]'
                }`}
                type="button"
              >
                {appliedPromo === 'NEIGHBOR3' ? 'Applied ✓' : 'Apply'}
              </button>
            </div>
          </div>
        </aside>

        {/* Right Main Grid */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-headline-md text-2xl text-[#131b2e] font-extrabold">
                Gourmet Spots Ready to Prep
              </h2>
              <p className="font-body-sm text-xs text-[#8c7164]">
                Real-time kitchens cooking right now around Evergreen Terrace
              </p>
            </div>
            <span className="font-label-md text-xs text-[#584237] font-semibold">
              Showing {filteredRestaurants.length} matches
            </span>
          </div>

          {filteredRestaurants.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#eaedff]">
              <span className="material-symbols-outlined text-4xl text-[#8c7164] mb-2">search_off</span>
              <h3 className="font-headline-sm text-base text-[#131b2e] font-bold">No spots match your filters</h3>
              <p className="text-xs text-[#584237] mt-1">Try clearing some filters or searching for another dish or cuisine.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All Flavors');
                  setFreeDeliveryOnly(false);
                  setTopRatedOnly(false);
                  setFastestOnly(false);
                }}
                className="mt-4 px-4 py-2 rounded-full bg-[#f97316] text-white text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRestaurants.map((restaurant) => {
                const isFav = favorites[restaurant.id];
                return (
                  <article
                    key={restaurant.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col border border-[#eaedff] -translate-y-0 hover:-translate-y-1"
                  >
                    {/* Media container */}
                    <div className="relative w-full h-48 overflow-hidden bg-[#eaedff]">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={restaurant.image}
                        alt={restaurant.name}
                        loading="lazy"
                      />

                      {restaurant.badge && (
                        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#6ffbbe] text-[#002113] font-label-sm text-[10px] font-extrabold flex items-center gap-1 shadow-sm">
                          <span className="material-symbols-outlined text-[13px]">bolt</span>
                          {restaurant.badge}
                        </div>
                      )}

                      <button
                        aria-label="Favorite"
                        onClick={(e) => toggleFavorite(restaurant.id, e)}
                        className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center transition-colors shadow cursor-pointer ${
                          isFav ? 'text-[#ba1a1a]' : 'text-[#131b2e] hover:text-[#ba1a1a]'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {isFav ? 'favorite' : 'favorite_border'}
                        </span>
                      </button>

                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#131b2e] font-label-sm text-[11px] font-semibold shadow flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px] text-[#f97316]">schedule</span>
                          {restaurant.deliveryTime}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#131b2e] font-label-sm text-[11px] font-semibold shadow flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px] text-[#006c49]">near_me</span>
                          {restaurant.distance}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-headline-sm text-base text-[#131b2e] font-bold group-hover:text-[#9d4300] transition-colors">
                              {restaurant.name}
                            </h3>
                            <p className="font-body-sm text-xs text-[#584237] mt-0.5">
                              {restaurant.cuisine}
                            </p>
                          </div>
                          <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#006c49] text-white font-label-md text-xs font-bold shrink-0 shadow-2xs">
                            <span className="material-symbols-outlined text-[13px]">star</span>
                            <span>{restaurant.rating}</span>
                          </div>
                        </div>

                        {/* Perk pills */}
                        {restaurant.perks && (
                          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                            {restaurant.perks.map((perk, i) => (
                              <span
                                key={i}
                                className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] font-bold ${
                                  i === 0
                                    ? 'bg-[#ffdbca] text-[#783200]'
                                    : 'bg-[#eaedff] text-[#584237]'
                                }`}
                              >
                                {perk}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Trending Note */}
                        <div className="mt-3 p-2 rounded-lg bg-[#f2f3ff] text-[#584237] font-body-sm text-xs line-clamp-1 border border-[#eaedff]">
                          <span className="font-label-sm text-[10px] text-[#9d4300] font-extrabold uppercase mr-1">
                            Trending:
                          </span>
                          {restaurant.trending}
                        </div>
                      </div>

                      {/* Card Footer: Delivery Fee & View Menu CTA */}
                      <div className="pt-2.5 flex items-center justify-between border-t border-[#eaedff]">
                        <span
                          className={`font-label-md text-xs font-semibold ${
                            restaurant.deliveryFee === 0 ? 'text-[#006c49]' : 'text-[#584237]'
                          }`}
                        >
                          {restaurant.deliveryFee === 0 ? 'Free Delivery' : `₹${restaurant.deliveryFee} Delivery Fee`}
                        </span>
                        <button
                          onClick={() => onSelectRestaurant(restaurant)}
                          className="px-4 py-1.5 rounded-full bg-[#f97316] text-white font-label-md text-xs font-bold hover:bg-[#b02f00] transition-colors shadow-2xs cursor-pointer"
                          type="button"
                        >
                          View Menu
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Discover More Footer Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => alert('Loaded 42 additional culinary partners in your neighborhood!')}
              className="px-6 py-2.5 rounded-full bg-white text-[#131b2e] shadow-2xs hover:shadow-md transition-all font-label-md text-xs font-bold flex items-center gap-2 border border-[#eaedff] cursor-pointer"
              type="button"
            >
              <span>Discover 42 More Nearby Kitchens</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Floating Active Delivery Pill / Mini-Bar at bottom right */}
      {hasActiveOrder && (
        <aside className="fixed bottom-6 right-6 z-40 max-w-md w-full px-4 sm:px-0 pointer-events-none">
          <div className="pointer-events-auto bg-[#283044]/95 backdrop-blur-md text-[#eef0ff] p-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border border-white/10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex items-center justify-center shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f97316] opacity-75"></span>
                <div className="w-10 h-10 rounded-xl bg-[#f97316] flex items-center justify-center text-white shadow">
                  <span className="material-symbols-outlined text-[20px]">moped</span>
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-sm text-[10px] px-1.5 py-0.5 rounded bg-[#dae2fd]/20 text-[#eef0ff] font-bold">
                    #CD-8942
                  </span>
                  <span className="font-label-sm text-[11px] text-[#ffb690] font-bold">
                    14 min away
                  </span>
                </div>
                <span className="font-body-sm text-xs text-[#eef0ff]/80 truncate">
                  Courier Marco has left kitchen
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('live-tracking')}
              className="px-4 py-2 rounded-full bg-[#f97316] hover:bg-[#9d4300] transition-colors text-white font-label-sm text-xs font-bold tracking-wide shrink-0 shadow-md cursor-pointer"
            >
              Live Track
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};

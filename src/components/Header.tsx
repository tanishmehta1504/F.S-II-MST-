import React from 'react';
import { Screen } from '../types';

interface HeaderProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAddress: () => void;
  onOpenAuth: () => void;
  currentAddress: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  hasActiveOrder?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAddress,
  onOpenAuth,
  currentAddress,
  searchQuery,
  onSearchChange,
  hasActiveOrder,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf8ff]/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eaedff]">
      <div className="h-20 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand & Address */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => onNavigate('explore-and-nearby')}
            className="flex items-center gap-1 group text-left cursor-pointer"
          >
            <img
              alt="CraveDash Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XdK9stPibNzKXzQFIqKBUtdn-nsQA3-OiN9WGVebXyeyd0zZbnNJCGf2eksx5XcC1CVVuw99JkyIDcUR2wuYnt_yVBTuGPjrjpwRxXwgRCZushtJo3H3i-Y_WqImdieNHoDxJsuIczFQwWgdokxt5J4oRD9gWn7BNDVwAnEBOBDbErwORCpJWBg2FAg1IiHJ-4ZYs_9-jsImqa0F-EOj_srxNKSA-hpHOPMJGVeOEXUIc3fj1lyb-M5g0"
            />
            <span className="font-headline-sm text-lg text-[#131b2e] tracking-tight ml-1 font-bold">
              Crave<span className="text-[#f97316]">Dash</span>
            </span>
          </button>

          <button
            onClick={onOpenAddress}
            className="hidden xl:flex items-center gap-1.5 px-4 py-1.5 bg-[#f2f3ff] rounded-full hover:bg-[#eaedff] transition-colors text-left cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[#f97316] text-[18px]">location_on</span>
            <span className="font-label-sm text-[12px] text-[#584237]">
              Deliver to: <strong className="text-[#131b2e] font-label-md font-semibold">{currentAddress}</strong> • 15-20 min
            </span>
            <span className="material-symbols-outlined text-[#8c7164] text-[18px]">expand_more</span>
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-xl mx-2 hidden md:flex items-center">
          <div className="w-full flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.03)] border border-[#e2e7ff] focus-within:border-[#f97316] focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.15)] transition-all">
            <span className="material-symbols-outlined text-[#8c7164] text-[20px] shrink-0">search</span>
            <input
              className="w-full bg-transparent text-[#131b2e] placeholder:text-[#8c7164] text-sm focus:outline-none"
              placeholder="Search restaurants, cuisines, dishes..."
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button
              onClick={onOpenSearch}
              className="hidden lg:inline-flex items-center px-1.5 py-0.5 bg-[#eaedff] text-[#8c7164] rounded text-[11px] font-semibold hover:bg-[#dae2fd] transition-colors"
              title="Open search popup (Ctrl+K)"
            >
              Ctrl+K
            </button>
            <button
              onClick={onOpenSearch}
              className="p-1 rounded-full hover:bg-[#e2e7ff] transition-colors text-[#584237] hover:text-[#131b2e]"
              type="button"
              title="Filters"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
          </div>
        </div>

        {/* Nav Links, Active Delivery Pill, Cart, User Profile */}
        <div className="flex items-center gap-4 shrink-0">
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => onNavigate('explore-and-nearby')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                currentScreen === 'explore-and-nearby'
                  ? 'text-[#f97316] font-bold'
                  : 'text-[#584237] hover:text-[#131b2e]'
              }`}
            >
              Explore &amp; Nearby
            </button>
            <button
              onClick={() => onNavigate('live-tracking')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                currentScreen === 'live-tracking'
                  ? 'text-[#f97316] font-bold'
                  : 'text-[#584237] hover:text-[#131b2e]'
              }`}
            >
              Live Tracking
            </button>
            <button
              onClick={() => onNavigate('order-help-and-issues')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                currentScreen === 'order-help-and-issues'
                  ? 'text-[#f97316] font-bold'
                  : 'text-[#584237] hover:text-[#131b2e]'
              }`}
            >
              Order Help &amp; Issues
            </button>
          </nav>

          {/* Active Delivery Notification Pill */}
          {hasActiveOrder && (
            <button
              onClick={() => onNavigate('live-tracking')}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-[#ffdbca] hover:bg-[#ffb690] rounded-full transition-colors cursor-pointer shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse"></span>
              <span className="font-label-sm text-[12px] font-bold text-[#341100]">
                1 Active Delivery • 18 min
              </span>
            </button>
          )}

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            aria-label="Cart"
            className="relative p-2 rounded-full hover:bg-[#eaedff] transition-colors text-[#131b2e] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#f97316] text-white flex items-center justify-center font-bold text-[11px] shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile Avatar / Auth */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-[#f97316]/40 transition-all cursor-pointer"
            title="Profile &amp; Sign In"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shadow-xs border border-white"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-yrdKMPbQzVLg-cpWv8MxxsrLMTHN5l9BjoWxkcYvDuNkcasT0tGkytbaxQlOoQi7zSCTb1ZofQ6gz5Z7NxryqOBQjq--dPDN9Vlu99YQo9TzQoWhuhC-VZMIwgpYZBX3oEpGNDI1un1wzdo2F-uxv7_WkWWple0AR6PnBhnMQx5hrIzuZSImk7DB4wuK22RJ9ZQ9CgifabuIjmrChn4J_VmaSJBkWHK6pwuL85G68uUFouAumWH_"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

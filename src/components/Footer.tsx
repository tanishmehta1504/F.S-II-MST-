import React from 'react';
import { Screen } from '../types';

interface FooterProps {
  onNavigate: (screen: Screen) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] mt-12 border-t border-[#eaedff]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-md text-2xl text-[#131b2e] tracking-tight font-extrabold">
                Crave<span className="text-[#f97316]">Dash</span>
              </span>
            </div>
            <p className="font-body-md text-sm text-[#584237] max-w-sm leading-relaxed">
              Culinary precision meets real-time delivery logistics. Savor gourmet dining from premium city eateries directly to your doorstep in minutes.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="p-2 rounded-lg bg-[#f2f3ff] text-[#f97316]">
                <span className="material-symbols-outlined text-[24px]">support_agent</span>
              </div>
              <div>
                <span className="block font-label-sm text-[11px] text-[#584237] uppercase tracking-wider font-semibold">
                  24/7 Delivery Hotline
                </span>
                <a
                  href="tel:18002728332"
                  className="font-title-md text-base text-[#131b2e] font-bold hover:text-[#f97316] transition-colors"
                >
                  1-800-CRAVEDASH
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="font-label-md text-xs uppercase tracking-wider text-[#131b2e] font-bold">
              Discovery
            </span>
            <button
              onClick={() => onNavigate('explore-and-nearby')}
              className="text-left font-body-sm text-sm text-[#584237] hover:text-[#9d4300] transition-colors cursor-pointer"
            >
              Trending Restaurants
            </button>
            <button
              onClick={() => onNavigate('explore-and-nearby')}
              className="text-left font-body-sm text-sm text-[#584237] hover:text-[#9d4300] transition-colors cursor-pointer"
            >
              Curated Menus
            </button>
            <button
              onClick={() => onNavigate('explore-and-nearby')}
              className="text-left font-body-sm text-sm text-[#584237] hover:text-[#9d4300] transition-colors cursor-pointer"
            >
              Gourmet Essentials
            </button>
            <button
              onClick={() => onNavigate('explore-and-nearby')}
              className="text-left font-body-sm text-sm text-[#584237] hover:text-[#9d4300] transition-colors cursor-pointer"
            >
              Dietary &amp; Healthy
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="font-label-md text-xs uppercase tracking-wider text-[#131b2e] font-bold">
              Partner With Us
            </span>
            <button
              onClick={() => onNavigate('order-help-and-issues')}
              className="text-left font-body-sm text-sm text-[#584237] hover:text-[#9d4300] transition-colors cursor-pointer"
            >
              Become a Rider Partner
            </button>
            <button
              onClick={() => onNavigate('order-help-and-issues')}
              className="text-left font-body-sm text-sm text-[#584237] hover:text-[#9d4300] transition-colors cursor-pointer"
            >
              Merchant Kitchen Hub
            </button>
            <button
              onClick={() => onNavigate('order-help-and-issues')}
              className="text-left font-body-sm text-sm text-[#584237] hover:text-[#9d4300] transition-colors cursor-pointer"
            >
              Enterprise Catering
            </button>
            <button
              onClick={() => onNavigate('order-help-and-issues')}
              className="text-left font-body-sm text-sm text-[#584237] hover:text-[#9d4300] transition-colors cursor-pointer"
            >
              Courier Safety Code
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="font-label-md text-xs uppercase tracking-wider text-[#131b2e] font-bold">
              Experience Apps
            </span>
            <p className="font-body-sm text-sm text-[#584237]">
              Download our mobile app for instant live spatial order tracking.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <div
                onClick={() => alert('Download on App Store')}
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#eaedff] hover:bg-[#dae2fd] transition-colors cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[24px] text-[#131b2e]">phone_iphone</span>
                <div>
                  <span className="block font-label-sm text-[10px] text-[#584237] leading-none">Download on</span>
                  <span className="font-label-md text-xs font-bold text-[#131b2e]">App Store</span>
                </div>
              </div>
              <div
                onClick={() => alert('Get it on Google Play')}
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#eaedff] hover:bg-[#dae2fd] transition-colors cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[24px] text-[#131b2e]">android</span>
                <div>
                  <span className="block font-label-sm text-[10px] text-[#584237] leading-none">Get it on</span>
                  <span className="font-label-md text-xs font-bold text-[#131b2e]">Google Play</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#eaedff] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-body-sm text-xs text-[#584237]">
              © 2026 CraveDash Inc. All culinary rights reserved.
            </span>
            <div className="flex items-center gap-1.5 text-[#584237]">
              <span className="font-label-sm text-[11px] px-2 py-0.5 rounded bg-[#f2f3ff] font-medium">Apple Pay</span>
              <span className="font-label-sm text-[11px] px-2 py-0.5 rounded bg-[#f2f3ff] font-medium">Google Pay</span>
              <span className="font-label-sm text-[11px] px-2 py-0.5 rounded bg-[#f2f3ff] font-medium">Visa / Mastercard</span>
            </div>
          </div>
          <div className="flex items-center gap-6 font-body-sm text-xs text-[#584237]">
            <button
              onClick={() => onNavigate('order-help-and-issues')}
              className="hover:text-[#131b2e] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('order-help-and-issues')}
              className="hover:text-[#131b2e] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onNavigate('order-help-and-issues')}
              className="hover:text-[#131b2e] transition-colors cursor-pointer"
            >
              Dispatch Security
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

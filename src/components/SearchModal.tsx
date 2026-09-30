import React, { useState, useEffect } from 'react';
import { Restaurant } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurants: Restaurant[];
  onSelectRestaurant: (r: Restaurant) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  restaurants,
  onSelectRestaurant,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Toggle search modal
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(query.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
      r.menu.some((m) => m.name.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-[#eaedff] overflow-hidden flex flex-col animate-scale-up">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#eaedff] flex items-center gap-3 bg-[#faf8ff]">
          <span className="material-symbols-outlined text-[#f97316] text-[22px]">search</span>
          <input
            autoFocus
            type="text"
            placeholder="Type a restaurant, dish, or cuisine (e.g. Wagyu, Sushi, Pizza)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#131b2e] placeholder:text-[#8c7164] focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded bg-[#eaedff] text-[10px] text-[#8c7164] font-bold">ESC</kbd>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#eaedff] text-[#584237] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Results Stream */}
        <div className="max-h-96 overflow-y-auto p-4 flex flex-col gap-2">
          {results.length === 0 ? (
            <div className="text-center py-8 text-[#8c7164] text-xs">
              No matching spots or dishes found for "{query}".
            </div>
          ) : (
            results.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  onSelectRestaurant(r);
                  onClose();
                }}
                className="p-3 rounded-2xl bg-[#faf8ff] hover:bg-[#f2f3ff] transition-colors border border-[#eaedff] flex items-center justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-12 h-12 rounded-xl object-cover border border-[#eaedff]"
                  />
                  <div>
                    <h4 className="font-title-md text-xs font-bold text-[#131b2e] group-hover:text-[#9d4300] transition-colors">
                      {r.name}
                    </h4>
                    <span className="block font-body-sm text-[11px] text-[#584237]">{r.cuisine}</span>
                    <span className="block text-[10px] text-[#8c7164]">{r.trending}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <div className="flex items-center gap-1 text-xs font-bold text-[#006c49]">
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    <span>{r.rating}</span>
                  </div>
                  <span className="text-[11px] text-[#584237]">{r.deliveryTime}</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

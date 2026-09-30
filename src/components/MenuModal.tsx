import React, { useState } from 'react';
import { Restaurant, MenuItem } from '../types';

interface MenuModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, restaurant: Restaurant) => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({ restaurant, onClose, onAddToCart }) => {
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  if (!restaurant) return null;

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item, restaurant);
    setAddedItemId(item.id);
    setTimeout(() => {
      setAddedItemId(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-[#eaedff] my-8 flex flex-col max-h-[85vh]">
        {/* Banner with close */}
        <div className="relative h-48 w-full bg-[#eaedff] shrink-0">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-[#131b2e]/50 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#131b2e] flex items-center justify-center shadow transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white flex flex-col">
            <span className="font-label-sm text-[10px] text-[#ffdbca] uppercase tracking-wider font-bold">
              {restaurant.cuisine}
            </span>
            <h2 className="font-headline-md text-xl sm:text-2xl font-extrabold text-white">
              {restaurant.name}
            </h2>
            <div className="flex items-center gap-3 text-xs mt-1 text-[#dae2fd]">
              <span className="flex items-center gap-1 font-bold text-amber-300">
                <span className="material-symbols-outlined text-[14px]">star</span>
                {restaurant.rating}
              </span>
              <span>•</span>
              <span>{restaurant.deliveryTime}</span>
              <span>•</span>
              <span>{restaurant.distance}</span>
            </div>
          </div>
        </div>

        {/* Menu Dish List */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
            <h3 className="font-headline-sm text-sm uppercase tracking-wider text-[#9d4300] font-extrabold">
              Curated Offerings
            </h3>
            <span className="text-xs text-[#584237]">{restaurant.menu.length} Chef Specialties</span>
          </div>

          <div className="flex flex-col gap-3">
            {restaurant.menu.map((dish) => {
              const isJustAdded = addedItemId === dish.id;
              return (
                <div
                  key={dish.id}
                  className="p-4 rounded-2xl bg-[#faf8ff] hover:bg-[#f2f3ff] transition-colors border border-[#eaedff] flex items-start justify-between gap-4"
                >
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-title-md text-sm font-bold text-[#131b2e]">{dish.name}</h4>
                      {dish.isPopular && (
                        <span className="px-2 py-0.5 rounded-full bg-[#ffdbca] text-[#341100] text-[10px] font-bold">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="font-body-sm text-xs text-[#584237] mt-1 leading-relaxed">
                      {dish.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="font-headline-sm text-sm font-extrabold text-[#131b2e]">
                        ₹{dish.price}
                      </span>
                      {dish.calories && (
                        <span className="font-label-sm text-[11px] text-[#8c7164]">
                          {dish.calories}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAdd(dish)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-2xs cursor-pointer shrink-0 flex items-center gap-1 ${
                      isJustAdded
                        ? 'bg-[#006c49] text-white scale-105'
                        : 'bg-[#f97316] text-white hover:bg-[#9d4300]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isJustAdded ? 'check' : 'add'}
                    </span>
                    <span>{isJustAdded ? 'Added' : 'Add to Order'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

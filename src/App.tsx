import { useState, useEffect } from 'react';
import { Screen, Restaurant, CartItem, MenuItem } from './types';
import { INITIAL_RESTAURANTS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ExploreNearby } from './components/ExploreNearby';
import { LiveTracking } from './components/LiveTracking';
import { OrderHelpIssues } from './components/OrderHelpIssues';
import { AuthModal } from './components/AuthModal';
import { CartDrawer } from './components/CartDrawer';
import { MenuModal } from './components/MenuModal';
import { AddressModal } from './components/AddressModal';
import { SearchModal } from './components/SearchModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('explore-and-nearby');
  const [restaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);
  const [currentAddress, setCurrentAddress] = useState<string>('742 Evergreen Terr, Apt 4B');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('NEIGHBOR3');
  const [, setUserEmail] = useState<string>('alex.morgan@craver.io');

  // Initial Cart empty
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hasActiveOrder, setHasActiveOrder] = useState(false);

  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item: MenuItem, restaurant: Restaurant) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: 1,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
        },
      ];
    });
  };

  const handleApplyPromo = (code: string) => {
    setAppliedPromo(code);
  };

  const handleSelectRestaurantFromSearch = (r: Restaurant) => {
    setSelectedRestaurant(r);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-body-md antialiased selection:bg-[#ffdbca] selection:text-[#341100]">
      {/* Top Universal App Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAddress={() => setIsAddressOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentAddress={currentAddress}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        hasActiveOrder={hasActiveOrder}
      />

      {/* Main Screen Router View */}
      <main className="w-full pt-20 flex-1">
        {currentScreen === 'explore-and-nearby' && (
          <ExploreNearby
            restaurants={restaurants}
            onSelectRestaurant={(r) => setSelectedRestaurant(r)}
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onApplyPerk={handleApplyPromo}
            appliedPromo={appliedPromo}
            currentAddress={currentAddress}
            onOpenAddress={() => setIsAddressOpen(true)}
            searchQuery={searchQuery}
            hasActiveOrder={hasActiveOrder}
          />
        )}

        {currentScreen === 'live-tracking' && (
          <LiveTracking
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            currentAddress={currentAddress}
          />
        )}

        {currentScreen === 'order-help-and-issues' && (
          <OrderHelpIssues
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer across all main views */}
      <Footer
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onCheckout={() => {
          setHasActiveOrder(true);
          setCart([]);
        }}
      />

      {/* Restaurant Menu Modal */}
      <MenuModal
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Location / Address Change Modal */}
      <AddressModal
        isOpen={isAddressOpen}
        onClose={() => setIsAddressOpen(false)}
        currentAddress={currentAddress}
        onSelectAddress={setCurrentAddress}
      />

      {/* Quick Search / Command Palette Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        restaurants={restaurants}
        onSelectRestaurant={handleSelectRestaurantFromSearch}
      />

      {/* Auth / Sign In Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(email) => {
          setUserEmail(email);
        }}
      />
    </div>
  );
}

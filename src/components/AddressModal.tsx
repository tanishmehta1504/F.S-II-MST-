import React, { useState } from 'react';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAddress: string;
  onSelectAddress: (addr: string) => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  currentAddress,
  onSelectAddress,
}) => {
  const [customInput, setCustomInput] = useState('');

  if (!isOpen) return null;

  const savedAddresses = [
    { label: 'Home', address: '742 Evergreen Terr, Apt 4B', tag: 'Default', icon: 'home' },
    { label: 'Work / Studio', address: '120 Congress Ave, Suite 500', tag: 'Austin', icon: 'work' },
    { label: 'Gym / Club', address: '88 Barton Springs Rd, Locker #12', tag: 'Quick Drop', icon: 'fitness_center' },
  ];

  const handleChoose = (addr: string) => {
    onSelectAddress(addr);
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    onSelectAddress(customInput.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#eaedff] flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f97316]">location_on</span>
            <h3 className="font-headline-sm text-base text-[#131b2e] font-extrabold">Delivery Location</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#f2f3ff] text-[#584237]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="font-label-sm text-[11px] text-[#8c7164] uppercase tracking-wider font-semibold">
            Saved Locations
          </span>
          {savedAddresses.map((sa) => (
            <button
              key={sa.address}
              onClick={() => handleChoose(sa.address)}
              className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                currentAddress === sa.address
                  ? 'bg-[#ffdbca] border-[#ffb690]'
                  : 'bg-[#f2f3ff] hover:bg-[#eaedff] border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#f97316] shadow-2xs">
                  <span className="material-symbols-outlined text-[16px]">{sa.icon}</span>
                </div>
                <div>
                  <span className="font-label-md text-xs font-bold text-[#131b2e]">{sa.label}</span>
                  <span className="block font-body-sm text-[11px] text-[#584237]">{sa.address}</span>
                </div>
              </div>
              <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-white text-[#584237] font-semibold">
                {sa.tag}
              </span>
            </button>
          ))}
        </div>

        <form onSubmit={handleCustomSubmit} className="pt-2 flex flex-col gap-2 border-t border-[#eaedff]">
          <span className="font-label-sm text-[11px] text-[#8c7164] uppercase tracking-wider font-semibold">
            Enter New Address
          </span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. 500 South Congress, Apt 3A"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#eaedff] text-xs text-[#131b2e] focus:outline-none focus:border-[#f97316]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#f97316] hover:bg-[#9d4300] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Set
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

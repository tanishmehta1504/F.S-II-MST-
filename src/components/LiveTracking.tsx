import React, { useState, useRef, useEffect } from 'react';
import { Screen, ChatMessage } from '../types';
import { INITIAL_CHAT } from '../data/mockData';

interface LiveTrackingProps {
  onNavigate: (screen: Screen) => void;
  currentAddress: string;
}

export const LiveTracking: React.FC<LiveTrackingProps> = ({ onNavigate, currentAddress }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [inputText, setInputText] = useState('');
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [etaMinutes, setEtaMinutes] = useState(14);
  const [deliveryStep, setDeliveryStep] = useState<number>(3); // 1: Confirmed, 2: Kitchen, 3: Dispatched, 4: Delivered
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isTrafficLayer, setIsTrafficLayer] = useState(true);
  const [is3DMode, setIs3DMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [courierPosition, setCourierPosition] = useState({ x: 520, y: 395 });
  const [courierSpeed, setCourierSpeed] = useState(22);
  const [showEditNoteModal, setShowEditNoteModal] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState('Standard Gate. Gate code is #4021. Leave by the front door safe box.');
  const [noteDraft, setNoteDraft] = useState(deliveryNote);
  const [isCalling, setIsCalling] = useState(false);

  const chatStreamRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatStreamRef.current) {
      chatStreamRef.current.scrollTop = chatStreamRef.current.scrollHeight;
    }
  }, [messages]);

  // Gentle courier movement simulation along the delivery route
  useEffect(() => {
    const interval = setInterval(() => {
      setCourierPosition((prev) => {
        // Minor dynamic jitter / progression along the route towards destination (470, 680)
        const nextY = prev.y < 640 ? prev.y + 1.2 : 395;
        const nextX = prev.x > 480 ? prev.x - 0.4 : 520;
        return { x: nextX, y: nextY };
      });
      setCourierSpeed((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(16, Math.min(28, prev + delta));
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    showToast('Tracking link copied! Share with family or neighbors.');
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      name: 'You',
      text: inputText.trim(),
      time: 'Just now',
      status: 'Sent',
    };

    setMessages((prev) => [...prev, userMsg]);
    const sentText = inputText.trim();
    setInputText('');

    // Simulate Courier auto-response
    setTimeout(() => {
      let reply = 'Got it, thanks! Approaching your street now.';
      if (sentText.toLowerCase().includes('gate') || sentText.toLowerCase().includes('code')) {
        reply = 'Noted the gate code #4021! I will key it in upon arrival.';
      } else if (sentText.toLowerCase().includes('door')) {
        reply = 'Will place safely right by your doorstep and take a photo.';
      } else if (sentText.toLowerCase().includes('call')) {
        reply = 'Will give you a quick buzz as soon as I pull up to the curb.';
      }

      const courierReply: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'courier',
        name: 'MV',
        text: reply,
        time: 'Just now',
        status: 'Delivered',
      };
      setMessages((prev) => [...prev, courierReply]);
    }, 1500);
  };

  const handlePresetClick = (msg: string) => {
    setInputText(msg);
  };

  const handleCallCourier = () => {
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
      showToast('Encrypted voice line connected to Marcus Vance.');
    }, 1800);
  };

  const handleSaveNote = () => {
    setDeliveryNote(noteDraft);
    setShowEditNoteModal(false);
    showToast('Delivery instructions updated for courier.');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Top Metabar: Live Session Context & Real-Time Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => onNavigate('explore-and-nearby')}
              className="flex items-center gap-1 text-[#584237] hover:text-[#9d4300] transition-colors font-label-md text-xs font-bold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Feed</span>
            </button>
            <span className="text-[#e0c0b1]">•</span>
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-lg text-[#131b2e] font-bold tracking-tight">
                The Rustic Truffle Burger Co.
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#131b2e] font-label-sm text-[11px] font-bold">
                Order #CD-8942
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eaedff] text-[#131b2e] font-label-sm text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#006c49] animate-ping"></span>
              <span>Telemetry Active: GPS High-Precision</span>
            </div>
            <button
              onClick={handleShareLink}
              className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white shadow-xs hover:shadow-md transition-all text-[#131b2e] font-label-sm text-xs font-bold border border-[#eaedff] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-[#f97316]">share</span>
              <span>Share Live Link</span>
            </button>
          </div>
        </div>

        {/* Main Live Workspace: 2-Column Split Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Interactive Courier & Order Hub (5 cols on 12-col grid) */}
          <div className="xl:col-span-5 flex flex-col gap-5">
            {/* Big Prominent ETA Card */}
            <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-xs border border-[#eaedff]">
              {/* Ambient Glow Accent */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#ffdbca] blur-3xl opacity-60 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-[#ffdbca] text-[#341100] font-label-sm text-[10px] font-extrabold uppercase tracking-wider">
                        Live Route
                      </span>
                      <span className="font-body-sm text-xs text-[#584237]">Placed at 7:15 PM</span>
                    </div>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-display-lg text-5xl text-[#9d4300] tracking-tight font-extrabold">
                        {etaMinutes}
                      </span>
                      <span className="font-headline-md text-2xl text-[#9d4300] font-bold">mins</span>
                    </div>

                    <p className="font-title-md text-sm text-[#006c49] flex items-center gap-1 mt-0.5 font-bold">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      <span>Estimated Delivery: 7:44 PM • On schedule</span>
                    </p>
                  </div>

                  {/* Animated Radial Speed Gauge */}
                  <div className="hidden sm:flex flex-col items-center justify-center p-3 rounded-2xl bg-[#f2f3ff] text-center border border-[#eaedff] relative">
                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-[#dae2fd]"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                      <path
                        className="text-[#f97316] transition-all duration-500"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray={`${Math.round((courierSpeed / 30) * 100)}, 100`}
                        strokeLinecap="round"
                        strokeWidth="3.5"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="font-label-md text-xs text-[#131b2e] font-extrabold leading-none">
                        {courierSpeed}
                      </span>
                      <span className="font-label-sm text-[8px] text-[#584237] uppercase font-bold">mph</span>
                    </div>
                    <span className="font-label-sm text-[10px] text-[#584237] mt-1 font-semibold">1.2 mi away</span>
                  </div>
                </div>

                {/* Dynamic 4-Step Progress Tracker */}
                <div className="pt-2">
                  <div className="relative flex items-center justify-between w-full">
                    {/* Track Line Backdrop */}
                    <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-1 bg-[#dae2fd] rounded-full z-0"></div>
                    {/* Track Line Active */}
                    <div
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-1 bg-[#006c49] rounded-full z-0 transition-all duration-700"
                      style={{
                        width:
                          deliveryStep === 1 ? '15%' : deliveryStep === 2 ? '42%' : deliveryStep === 3 ? '68%' : '100%',
                      }}
                    ></div>

                    {/* Step 1: Confirmed */}
                    <button
                      onClick={() => setDeliveryStep(1)}
                      className="relative z-10 flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#006c49] text-white flex items-center justify-center shadow-xs">
                        <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                      </div>
                      <span className="font-label-sm text-[11px] text-[#131b2e] font-semibold whitespace-nowrap">
                        Confirmed
                      </span>
                    </button>

                    {/* Step 2: Kitchen */}
                    <button
                      onClick={() => setDeliveryStep(2)}
                      className="relative z-10 flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shadow-xs ${
                          deliveryStep >= 2 ? 'bg-[#006c49] text-white' : 'bg-[#eaedff] text-[#8c7164]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">soup_kitchen</span>
                      </div>
                      <span className="font-label-sm text-[11px] text-[#131b2e] font-semibold whitespace-nowrap">
                        Kitchen Ready
                      </span>
                    </button>

                    {/* Step 3: Dispatched (Active Pulse) */}
                    <button
                      onClick={() => setDeliveryStep(3)}
                      className="relative z-10 flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <div className="relative flex items-center justify-center">
                        {deliveryStep === 3 && (
                          <span className="absolute w-9 h-9 rounded-full bg-[#f97316]/30 animate-ping"></span>
                        )}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md ${
                            deliveryStep >= 3 ? 'bg-[#f97316] text-white' : 'bg-[#eaedff] text-[#8c7164]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">electric_moped</span>
                        </div>
                      </div>
                      <span className="font-label-sm text-[11px] text-[#9d4300] font-bold whitespace-nowrap">
                        Dispatched
                      </span>
                    </button>

                    {/* Step 4: Delivered */}
                    <button
                      onClick={() => setDeliveryStep(4)}
                      className="relative z-10 flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          deliveryStep === 4 ? 'bg-[#006c49] text-white shadow-md' : 'bg-[#eaedff] text-[#8c7164]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">home</span>
                      </div>
                      <span className="font-label-sm text-[11px] text-[#584237] font-semibold whitespace-nowrap">
                        Delivered
                      </span>
                    </button>
                  </div>
                </div>

                {/* Destination & ETA Micro-Banner */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff]">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[#f97316] text-[18px] shrink-0">pin_drop</span>
                    <span className="font-body-sm text-xs text-[#131b2e] truncate">
                      Drop-off: <strong>{currentAddress}</strong>
                    </span>
                  </div>
                  <span className="shrink-0 px-2 py-0.5 rounded bg-[#eaedff] text-[#584237] font-label-sm text-[10px] font-bold">
                    Standard Gate
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Courier Profile Card */}
            <div className="rounded-2xl bg-white p-5 shadow-xs border border-[#eaedff]">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-14 h-14 rounded-full object-cover shadow-xs border-2 border-white"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_R5ZNNaOQbAN3QV6LxLYJHvJpbps4lJXgCUerl5PkZgJ7w4WJXTm3ODN8YiGhb68gwHmi87eIlozKO9O2VHx5JfjO32BGFlvI4Hjn_40niPBhjWOlq5sMT1tAKiBaSCyZmKRyS3aA7NZjKlVBvwfGZsn4IrFZzju_BZ54Fs9HzeAisr3EHY0p7Me-KQaZpeG1oVKpvLIlR06FrT9oPmlrIySxJ3SuXAds-0ejp4gJbVmh5lWDiK50"
                      alt="Marcus Vance"
                    />
                    <div
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#006c49] text-white flex items-center justify-center text-[10px] shadow"
                      title="Verified Pro Courier"
                    >
                      <span className="material-symbols-outlined text-[12px] font-bold">verified</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-title-md text-base text-[#131b2e] font-extrabold">Marcus Vance</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#6ffbbe] text-[#002113] font-label-sm text-[10px] font-extrabold">
                        Pro Courier
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[#584237] font-body-sm text-xs">
                      <span className="flex items-center gap-0.5 text-[#9d4300] font-bold">
                        <span className="material-symbols-outlined text-[14px]">star</span>
                        <span>4.98</span>
                      </span>
                      <span>•</span>
                      <span>3,420+ deliveries</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 font-label-sm text-xs text-[#584237]">
                      <span className="material-symbols-outlined text-[15px] text-[#8c7164]">two_wheeler</span>
                      <span>
                        Silver E-Scooter • Plate: <strong className="text-[#131b2e]">CRV-92</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Courier Direct Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCallCourier}
                    aria-label="Call Courier"
                    className="w-10 h-10 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] flex items-center justify-center transition-colors shadow-xs cursor-pointer border border-[#eaedff]"
                    type="button"
                    title="Call Marcus Vance"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isCalling ? 'ring_volume' : 'call'}
                    </span>
                  </button>
                  <button
                    onClick={() => alert('Opening Emergency Dispatch Hotline: 1-800-CRAVEDASH (Available 24/7)')}
                    aria-label="Emergency Help"
                    className="w-10 h-10 rounded-full bg-[#ffdad6] hover:bg-[#ffb5a0] text-[#93000a] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                    title="Safety Assistance"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">shield</span>
                  </button>
                </div>
              </div>

              {/* Live Chat / Courier Communication Box */}
              <div className="rounded-2xl bg-[#f2f3ff] p-3.5 flex flex-col gap-3 border border-[#eaedff]">
                <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
                  <div className="flex items-center gap-1.5 font-label-sm text-xs text-[#584237]">
                    <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
                    <span>Marcus is active now</span>
                  </div>
                  <span className="font-label-sm text-[10px] text-[#8c7164] font-medium">Encrypted Channel</span>
                </div>

                {/* Message Stream Area */}
                <div
                  ref={chatStreamRef}
                  className="flex flex-col gap-2.5 max-h-52 overflow-y-auto pr-1 no-scrollbar"
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2 ${
                        msg.sender === 'user' ? 'justify-end self-end max-w-[85%]' : 'max-w-[90%]'
                      }`}
                    >
                      {msg.sender === 'courier' && (
                        <div className="w-6 h-6 rounded-full bg-[#dae2fd] text-[#f97316] flex items-center justify-center shrink-0 text-[10px] font-extrabold shadow-2xs">
                          {msg.name}
                        </div>
                      )}
                      <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : ''}`}>
                        <div
                          className={`p-3 rounded-2xl shadow-2xs ${
                            msg.sender === 'user'
                              ? 'rounded-br-none bg-[#f97316] text-white'
                              : 'rounded-tl-none bg-white text-[#131b2e] border border-[#eaedff]'
                          }`}
                        >
                          <p className="font-body-sm text-xs leading-relaxed">{msg.text}</p>
                        </div>
                        <span className="font-label-sm text-[10px] text-[#8c7164] mt-0.5 px-1">
                          {msg.time} {msg.status ? `• ${msg.status}` : ''}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Preset Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
                  {[
                    'Gate code is #4021',
                    'Please leave at door',
                    'Please ring bell twice',
                    'Call when downstairs',
                  ].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handlePresetClick(preset)}
                      className="shrink-0 px-3 py-1 rounded-full bg-white hover:bg-[#eaedff] text-[#131b2e] font-label-sm text-[11px] font-semibold shadow-2xs border border-[#eaedff] transition-colors cursor-pointer"
                      type="button"
                    >
                      {preset.replace('Please ', '')}
                    </button>
                  ))}
                </div>

                {/* Input Box */}
                <form onSubmit={handleSendChat} className="flex items-center gap-2 pt-1">
                  <input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 bg-white text-[#131b2e] placeholder:text-[#8c7164] rounded-full px-4 py-2 text-xs font-body-sm focus:outline-none shadow-2xs border border-[#eaedff] focus:border-[#f97316]"
                    placeholder="Type a message to Marcus..."
                    type="text"
                  />
                  <button
                    aria-label="Send Message"
                    className="w-8 h-8 rounded-full bg-[#f97316] hover:bg-[#9d4300] text-white flex items-center justify-center shrink-0 shadow-2xs transition-all cursor-pointer"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[16px]">send</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary Collapsible Dropdown */}
            <div className="rounded-2xl bg-white shadow-xs border border-[#eaedff] overflow-hidden">
              <button
                onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                className="w-full p-4 flex items-center justify-between hover:bg-[#f2f3ff] transition-colors text-left cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#f2f3ff] text-[#f97316]">
                    <span className="material-symbols-outlined text-[22px]">receipt_long</span>
                  </div>
                  <div>
                    <span className="font-title-md text-sm text-[#131b2e] font-bold">
                      Order Summary (3 items)
                    </span>
                    <span className="block font-body-sm text-xs text-[#584237]">
                      The Rustic Truffle Burger Co.
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-title-md text-base text-[#131b2e] font-extrabold">₹847</span>
                  <span
                    className={`material-symbols-outlined text-[#8c7164] transition-transform duration-300 ${
                      isSummaryOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </div>
              </button>

              {/* Dropdown Body */}
              {isSummaryOpen && (
                <div className="px-4 pb-4 flex flex-col gap-2.5 border-t border-[#eaedff] pt-3">
                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <span className="font-label-md text-xs px-2 py-0.5 rounded bg-[#eaedff] text-[#131b2e] font-bold">
                        1x
                      </span>
                      <div>
                        <span className="font-body-md text-xs text-[#131b2e] font-semibold">
                          Double Truffle Wagyu Burger
                        </span>
                        <span className="block font-body-sm text-[11px] text-[#584237]">
                          Brioche, Porcini aioli, aged Gruyère
                        </span>
                      </div>
                    </div>
                    <span className="font-label-md text-xs text-[#131b2e] font-bold">₹480</span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <span className="font-label-md text-xs px-2 py-0.5 rounded bg-[#eaedff] text-[#131b2e] font-bold">
                        1x
                      </span>
                      <div>
                        <span className="font-body-md text-xs text-[#131b2e] font-semibold">
                          Truffle Parmesan Fries
                        </span>
                        <span className="block font-body-sm text-[11px] text-[#584237]">
                          Rosemary sea salt, roasted garlic dip
                        </span>
                      </div>
                    </div>
                    <span className="font-label-md text-xs text-[#131b2e] font-bold">₹185</span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <span className="font-label-md text-xs px-2 py-0.5 rounded bg-[#eaedff] text-[#131b2e] font-bold">
                        1x
                      </span>
                      <div>
                        <span className="font-body-md text-xs text-[#131b2e] font-semibold">
                          Salted Caramel Shake
                        </span>
                        <span className="block font-body-sm text-[11px] text-[#584237]">
                          Madagascar vanilla, pretzel crumble
                        </span>
                      </div>
                    </div>
                    <span className="font-label-md text-xs text-[#131b2e] font-bold">₹120</span>
                  </div>

                  <div className="pt-2 border-t border-[#eaedff] flex flex-col gap-1 text-[#584237] font-body-sm text-xs">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹785</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery &amp; Service Fee</span>
                      <span>₹62</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#131b2e] pt-1 border-t border-[#eaedff]">
                      <span>Total Paid (Apple Pay)</span>
                      <span className="text-[#f97316] font-extrabold">₹847</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Issue Reporting & Escalation Links */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onNavigate('order-help-and-issues')}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#584237] hover:text-[#131b2e] font-label-md text-xs font-bold transition-colors text-center shadow-xs border border-[#eaedff] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">report_problem</span>
                <span>Report Delivery Issue</span>
              </button>

              <button
                onClick={() => setShowEditNoteModal(true)}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#584237] hover:text-[#131b2e] font-label-md text-xs font-bold transition-colors text-center shadow-xs border border-[#eaedff] cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-[#8c7164]">note_alt</span>
                <span>Edit Instructions</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Large Full-Bleed Map View (7 cols on 12-col grid) */}
          <div className="xl:col-span-7 relative min-h-[640px] h-[780px] rounded-3xl overflow-hidden bg-[#eaedff] shadow-sm border border-[#eaedff] flex flex-col">
            {/* Stylized Vector Map Canvas Container */}
            <div
              className={`relative w-full h-full overflow-hidden select-none bg-[#ecebf7] transition-transform duration-500 ${
                is3DMode ? 'perspective-1000 rotate-x-12' : ''
              }`}
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Interactive Map SVG Visual Representation */}
              <svg
                className="w-full h-full object-cover"
                preserveAspectRatio="xMidYMid slice"
                viewBox="0 0 900 780"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Map Gradients */}
                  <linearGradient id="routeGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#9d4300" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#006c49" />
                  </linearGradient>
                  <linearGradient id="riverGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#dae2fd" />
                    <stop offset="100%" stopColor="#eaedff" />
                  </linearGradient>
                  <filter id="mapShadow" width="140%" height="140%" x="-20%" y="-20%">
                    <feDropShadow dx="0" dy="6" floodColor="#131b2e" floodOpacity="0.18" stdDeviation="6" />
                  </filter>
                </defs>

                {/* Background District Polygons */}
                <rect fill="#f4f4fa" height="780" width="900" />

                {/* City Parks & Green Zones */}
                <path d="M 60,80 Q 180,60 220,160 T 120,320 T 30,240 Z" fill="#e2f5ea" opacity="0.9" />
                <path d="M 620,420 Q 780,390 840,490 T 730,680 T 590,610 Z" fill="#e2f5ea" opacity="0.9" />
                <path d="M 450,80 Q 560,90 540,200 T 410,240 T 380,140 Z" fill="#e2f5ea" opacity="0.7" />

                {/* Urban Waterway / River */}
                <path
                  d="M -20,540 C 240,480 320,620 540,560 C 720,510 820,580 940,540 L 940,630 C 820,670 700,590 540,640 C 320,710 210,580 -20,640 Z"
                  fill="url(#riverGradient)"
                />

                {/* Urban Grid Street Network (Warm Neutral Roads) */}
                <g opacity="0.95" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12">
                  <path d="M -40,120 L 940,160" />
                  <path d="M -40,280 L 940,310" />
                  <path d="M -40,440 L 940,430" />
                  <path d="M -40,690 L 940,680" />
                  <path d="M 160,-30 L 190,820" />
                  <path d="M 360,-30 L 380,820" />
                  <path d="M 580,-30 L 590,820" />
                  <path d="M 760,-30 L 740,820" />
                </g>

                {/* Secondary Street Lines */}
                <g opacity="0.75" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6">
                  <path d="M 60,30 L 400,280" />
                  <path d="M 280,290 L 780,180" />
                  <path d="M 120,440 L 380,680" />
                  <path d="M 400,430 L 680,690" />
                  <path d="M 590,290 L 920,430" />
                </g>

                {/* Street Name Typography Accents */}
                <text fill="#8c7164" fontSize="11" fontWeight="700" letterSpacing="1" opacity="0.6" x="210" y="145">
                  ELMWOOD BYPASS
                </text>
                <text fill="#8c7164" fontSize="11" fontWeight="700" letterSpacing="1" opacity="0.6" x="610" y="300">
                  OAK AVE BRIDGE (CONGESTED)
                </text>
                <text fill="#8c7164" fontSize="11" fontWeight="700" letterSpacing="1" opacity="0.6" x="440" y="675">
                  EVERGREEN TERRACE
                </text>

                {/* Bridges over the river */}
                <rect fill="#dae2fd" height="18" rx="3" stroke="#8c7164" strokeWidth="2" width="36" x="362" y="590" />
                <rect fill="#dae2fd" height="18" rx="3" stroke="#8c7164" strokeWidth="2" width="36" x="670" y="542" />

                {/* Traffic heatmap overlay if active */}
                {isTrafficLayer && (
                  <path
                    d="M 590,290 L 780,305"
                    stroke="#ba1a1a"
                    strokeWidth="8"
                    opacity="0.45"
                    strokeLinecap="round"
                  />
                )}

                {/* Active Delivery Polyline Route (Bypass Path) */}
                <path
                  d="M 180,150 L 280,155 L 375,220 L 460,310 L 520,380 L 520,470 L 490,560 L 480,630 L 470,680"
                  fill="none"
                  id="deliveryRouteBackdrop"
                  opacity="0.75"
                  stroke="#ffdbca"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="12"
                />
                <path
                  d="M 180,150 L 280,155 L 375,220 L 460,310 L 520,380 L 520,470 L 490,560 L 480,630 L 470,680"
                  fill="none"
                  id="deliveryRouteActive"
                  stroke="url(#routeGradient)"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="5"
                />

                {/* RESTAURANT ORIGIN PIN (Rustic Truffle) */}
                <g filter="url(#mapShadow)" transform="translate(180, 150)">
                  <circle fill="#ffffff" r="18" />
                  <circle fill="#9d4300" r="14" />
                  <text
                    fill="#ffffff"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                    x="0"
                    y="5"
                  >
                    RT
                  </text>
                  <rect fill="#131b2e" height="30" rx="8" width="170" x="-85" y="-55" />
                  <polygon fill="#131b2e" points="-6,-25 6,-25 0,-18" />
                  <text
                    fill="#ffffff"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="10"
                    fontWeight="600"
                    textAnchor="middle"
                    x="0"
                    y="-35"
                  >
                    The Rustic Truffle (Origin)
                  </text>
                </g>

                {/* LIVE COURIER PIN & RADAR (Marcus on Scooter) */}
                <g
                  filter="url(#mapShadow)"
                  transform={`translate(${courierPosition.x}, ${courierPosition.y})`}
                  className="transition-transform duration-1000 ease-out"
                >
                  {/* Expanding Pulse Radar Waves */}
                  <circle fill="#f97316" opacity="0.22" r="34">
                    <animate attributeName="r" dur="2.4s" repeatCount="indefinite" values="20;50;20" />
                    <animate attributeName="opacity" dur="2.4s" repeatCount="indefinite" values="0.35;0;0.35" />
                  </circle>
                  <circle fill="#ffffff" r="22" />
                  <circle fill="#f97316" r="18" />
                  <polygon fill="#f97316" points="0,-24 -6,-16 6,-16" />
                  <circle fill="#ffffff" r="8" />
                  <circle fill="#f97316" r="3.5" />

                  {/* Live Courier Speed & Range Tag */}
                  <g transform="translate(28, -24)">
                    <rect fill="#ffffff" filter="url(#mapShadow)" height="42" rx="8" width="130" x="0" y="0" />
                    <circle cx="14" cy="21" fill="#006c49" r="5" />
                    <text fill="#131b2e" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="700" x="26" y="17">
                      Marcus Vance
                    </text>
                    <text fill="#8c7164" fontFamily="Inter" fontSize="10" fontWeight="500" x="26" y="32">
                      {courierSpeed} mph • 1.2 mi away
                    </text>
                  </g>
                </g>

                {/* DESTINATION PIN (User Home: 742 Evergreen) */}
                <g filter="url(#mapShadow)" transform="translate(470, 680)">
                  <circle fill="#006c49" opacity="0.2" r="22">
                    <animate attributeName="r" dur="2s" repeatCount="indefinite" values="16;36;16" />
                  </circle>
                  <circle fill="#ffffff" r="18" />
                  <circle fill="#006c49" r="14" />
                  <path d="M -6,1 L 0,-5 L 6,1 L 4,1 L 4,6 L -4,6 L -4,1 Z" fill="#ffffff" />
                  <rect fill="#131b2e" height="28" rx="6" width="160" x="-80" y="24" />
                  <polygon fill="#131b2e" points="-6,24 6,24 0,18" />
                  <text
                    fill="#ffffff"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="10"
                    fontWeight="600"
                    textAnchor="middle"
                    x="0"
                    y="42"
                  >
                    742 Evergreen Terr (You)
                  </text>
                </g>
              </svg>
            </div>

            {/* Floating Map Overlay: Top-Right Weather & Conditions Pill */}
            <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2 pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md text-[#131b2e] border border-[#eaedff]">
                <span className="material-symbols-outlined text-[#f97316] text-[18px]">wb_sunny</span>
                <span className="font-label-sm text-xs font-semibold">Clear Sky • 68°F • Wind 4mph</span>
              </div>
              <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ffdbca] text-[#341100] shadow-xs border border-[#ffb690]/40">
                <span className="material-symbols-outlined text-[16px] text-[#9d4300]">traffic</span>
                <span className="font-label-sm text-xs font-bold">Oak Ave Delay: Rerouted via Elmwood (+3 min)</span>
              </div>
            </div>

            {/* Floating Map Controls: Right-Side Toolbar */}
            <div className="absolute bottom-20 right-4 z-20 flex flex-col gap-2">
              <button
                onClick={() => {
                  setCourierPosition({ x: 520, y: 395 });
                  setZoomLevel(1.1);
                  showToast('Centered map view on Marcus Vance.');
                }}
                aria-label="Center on Courier"
                className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md hover:bg-[#eaedff] text-[#f97316] shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer border border-[#eaedff]"
                title="Center on Marcus"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">near_me</span>
              </button>

              <div className="flex flex-col rounded-full bg-white/95 backdrop-blur-md shadow-md overflow-hidden border border-[#eaedff]">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                  aria-label="Zoom In"
                  className="w-11 h-11 hover:bg-[#eaedff] text-[#131b2e] flex items-center justify-center transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
                <div className="w-full h-px bg-[#eaedff]"></div>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
                  aria-label="Zoom Out"
                  className="w-11 h-11 hover:bg-[#eaedff] text-[#131b2e] flex items-center justify-center transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
              </div>

              <button
                onClick={() => setIs3DMode(!is3DMode)}
                aria-label="Toggle 3D View"
                className={`w-11 h-11 rounded-full shadow-md flex items-center justify-center transition-colors cursor-pointer border ${
                  is3DMode
                    ? 'bg-[#f97316] text-white border-[#f97316]'
                    : 'bg-white/95 backdrop-blur-md hover:bg-[#eaedff] text-[#131b2e] border-[#eaedff]'
                }`}
                title="Toggle 3D Tilt"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">3d_rotation</span>
              </button>

              <button
                onClick={() => {
                  setIsTrafficLayer(!isTrafficLayer);
                  showToast(isTrafficLayer ? 'Traffic overlay hidden.' : 'Traffic layer active.');
                }}
                aria-label="Traffic Layer"
                className={`w-11 h-11 rounded-full shadow-md flex items-center justify-center transition-colors cursor-pointer border ${
                  isTrafficLayer
                    ? 'bg-[#6cf8bb] text-[#00714d] border-[#006c49]/30'
                    : 'bg-white text-[#131b2e] border-[#eaedff]'
                }`}
                title="Traffic Layer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">layers</span>
              </button>
            </div>

            {/* Floating Map Overlay: Bottom Telemetry Strip */}
            <div className="absolute bottom-4 left-4 right-16 sm:right-20 z-20">
              <div className="p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-[#eaedff] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#9d4300] shrink-0 border border-[#eaedff]">
                    <span className="material-symbols-outlined text-[20px]">route</span>
                  </div>
                  <div className="truncate">
                    <span className="block font-label-md text-xs text-[#131b2e] font-extrabold truncate">
                      Navigating: Elmwood Bypass to 742 Evergreen
                    </span>
                    <span className="block font-body-sm text-[11px] text-[#584237] truncate">
                      Next turn in 450 ft: Turn right onto Birch Hollow Ln
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded bg-[#6ffbbe] text-[#002113] font-label-sm text-[10px] font-bold">
                    Safe Temp Insulated Bag
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#eaedff] text-[#584237] font-label-sm text-[10px] font-bold">
                    Battery: 92%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Instructions Modal */}
      {showEditNoteModal && (
        <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-[#eaedff]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline-sm text-lg text-[#131b2e] font-extrabold flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f97316]">edit_note</span>
                Edit Delivery Instructions
              </h3>
              <button
                onClick={() => setShowEditNoteModal(false)}
                className="p-1 rounded-full hover:bg-[#f2f3ff] text-[#584237]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-xs text-[#584237] mb-3">
              Update instructions for Marcus Vance. He will be notified instantly on his device.
            </p>
            <textarea
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] text-xs text-[#131b2e] focus:outline-none focus:border-[#f97316]"
            />
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                onClick={() => setShowEditNoteModal(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#584237] hover:bg-[#f2f3ff]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-5 py-2 rounded-full bg-[#f97316] text-white text-xs font-bold hover:bg-[#9d4300] shadow"
              >
                Save Instructions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 transform transition-all duration-300 pointer-events-none">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#283044] text-[#eef0ff] shadow-2xl border border-white/10">
            <span className="material-symbols-outlined text-[#6ffbbe] text-[18px]">check_circle</span>
            <span className="font-label-md text-xs font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Screen, IssueProofPhoto } from '../types';
import { INITIAL_PROOF_PHOTOS } from '../data/mockData';

interface OrderHelpIssuesProps {
  onNavigate: (screen: Screen) => void;
}

export const OrderHelpIssues: React.FC<OrderHelpIssuesProps> = ({ onNavigate }) => {
  const [selectedIncidentTypes, setSelectedIncidentTypes] = useState<string[]>([
    'Damaged / Spilled Food',
  ]);
  const [issueDescription, setIssueDescription] = useState<string>(
    'The Double Truffle Wagyu Burger arrived with the box completely smashed. The drink lid was unsealed inside the paper sack, soaking the brioche bun and fries in cold cola.'
  );
  const [photos, setPhotos] = useState<IssueProofPhoto[]>(INITIAL_PROOF_PHOTOS);
  const [resolutionMethod, setResolutionMethod] = useState<string>('credit');
  const [previewPhoto, setPreviewPhoto] = useState<IssueProofPhoto | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showAgentModal, setShowAgentModal] = useState<boolean>(false);
  const [agentChat, setAgentChat] = useState<{ sender: string; text: string; time: string }[]>([
    {
      sender: 'Elena Ramos',
      text: 'Hello! This is Elena, General Manager at The Rustic Truffle Burger Co. We see your issue report regarding Order #CD-8942. I am ready to review your claim right now.',
      time: 'Just now',
    },
  ]);
  const [agentInput, setAgentInput] = useState('');

  const toggleIncidentType = (type: string) => {
    setSelectedIncidentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const newPhoto: IssueProofPhoto = {
      id: `proof-${Date.now()}`,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      status: 'Upload Complete',
      url: URL.createObjectURL(file),
    };
    setPhotos((prev) => [...prev, newPhoto]);
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIncidentTypes.length === 0) {
      alert('Please select at least one incident type.');
      return;
    }
    if (issueDescription.trim().length < 20) {
      alert('Please describe what went wrong in detail (at least 20 characters).');
      return;
    }
    setIsSubmitted(true);
  };

  const handleSendAgentChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentInput.trim()) return;
    const msg = { sender: 'You', text: agentInput.trim(), time: 'Just now' };
    setAgentChat((prev) => [...prev, msg]);
    setAgentInput('');

    setTimeout(() => {
      setAgentChat((prev) => [
        ...prev,
        {
          sender: 'Elena Ramos',
          text: 'Thank you for explaining. Your photo evidence clearly displays the package breach. We have verified your claim and approved immediate resolution.',
          time: 'Just now',
        },
      ]);
    }, 1200);
  };

  const incidentTypes = [
    {
      title: 'Missing Items',
      desc: 'Forgot drinks, dipping sauces, or sides',
      icon: 'remove_shopping_cart',
    },
    {
      title: 'Wrong Item Received',
      desc: 'Different burger, toppings, or meal',
      icon: 'change_circle',
    },
    {
      title: 'Damaged / Spilled Food',
      desc: 'Packaging crushed, liquid spilled inside bag',
      icon: 'liquor',
    },
    {
      title: 'Quality / Temp Issue',
      desc: 'Arrived cold, undercooked, or stale',
      icon: 'thermostat',
    },
    {
      title: 'Extreme Delay',
      desc: 'Arrived 45+ minutes after estimated ETA',
      icon: 'history_toggle_off',
    },
    {
      title: 'Other Issue',
      desc: 'Courier conduct, incorrect drop location, etc.',
      icon: 'help_outline',
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-[#584237] font-label-sm text-xs uppercase tracking-wider"
            >
              <button
                onClick={() => onNavigate('explore-and-nearby')}
                className="hover:text-[#9d4300] transition-colors cursor-pointer"
              >
                Orders
              </button>
              <span className="material-symbols-outlined text-[#8c7164] text-[14px]">chevron_right</span>
              <button
                onClick={() => onNavigate('live-tracking')}
                className="font-label-md text-xs text-[#131b2e] font-bold hover:underline cursor-pointer"
              >
                #CD-8942
              </button>
              <span className="material-symbols-outlined text-[#8c7164] text-[14px]">chevron_right</span>
              <span className="text-[#f97316] font-label-md text-xs font-bold">Report Problem</span>
            </nav>

            <h1 className="font-display-lg text-3xl sm:text-4xl text-[#131b2e] tracking-tight font-extrabold">
              Need Help with Your Order?{' '}
              <span className="text-[#f97316] inline-block font-headline-md text-xl align-middle ml-2 px-3 py-0.5 rounded-full bg-[#ffdbca] text-[#341100]">
                Resolution Center
              </span>
            </h1>

            <p className="font-body-md text-sm text-[#584237] max-w-2xl leading-relaxed">
              Quickly resolve discrepancies, spills, or quality problems with verified photo evidence. Most claims resolve in under 7 minutes.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl shadow-xs border border-[#eaedff] self-start md:self-auto">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006c49] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#006c49]"></span>
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-[10px] text-[#584237] uppercase tracking-wider font-semibold">
                Live Concierge
              </span>
              <span className="font-label-md text-xs text-[#131b2e] font-bold">
                Elena (Kitchen Mgr) &amp; Agent Online
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Dispute Form & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Step 1: Incident Types */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eaedff] flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-label-sm text-xs uppercase tracking-wider text-[#9d4300] font-extrabold">
                  1. Select Incident Type
                </span>
                <span className="font-body-sm text-xs text-[#8c7164]">Select one or multiple issues</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {incidentTypes.map((item) => {
                  const isSelected = selectedIncidentTypes.includes(item.title);
                  return (
                    <button
                      key={item.title}
                      onClick={() => toggleIncidentType(item.title)}
                      className={`group p-4 rounded-2xl text-left transition-all flex flex-col gap-1 cursor-pointer border ${
                        isSelected
                          ? 'bg-[#ffdbca] text-[#341100] border-[#ffb690] shadow-xs'
                          : 'bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] border-transparent'
                      }`}
                      type="button"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`material-symbols-outlined text-[24px] ${
                            isSelected ? 'text-[#9d4300]' : 'text-[#f97316]'
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span
                          className={`material-symbols-outlined text-[18px] transition-colors ${
                            isSelected ? 'text-[#9d4300]' : 'text-transparent'
                          }`}
                        >
                          check_circle
                        </span>
                      </div>
                      <span className={`font-label-lg text-sm font-bold ${isSelected ? 'text-[#341100]' : 'text-[#131b2e]'}`}>
                        {item.title}
                      </span>
                      <span className={`font-body-sm text-xs ${isSelected ? 'text-[#783200]' : 'text-[#584237]'}`}>
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Message & Photo Proof */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eaedff] flex flex-col gap-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-label-sm text-xs uppercase tracking-wider text-[#9d4300] font-extrabold">
                  2. Message &amp; Photo Proof
                </span>
                <span className="font-label-sm text-xs px-2.5 py-0.5 rounded-full bg-[#6ffbbe] text-[#002113] font-bold">
                  Verification Speeds Resolution by 3x
                </span>
              </div>

              {/* Textarea */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-lg text-xs font-bold text-[#131b2e] flex items-center justify-between" htmlFor="issue-detail">
                  <span>Describe what went wrong in detail</span>
                  <span className="font-body-sm text-xs text-[#8c7164]">Minimum 20 characters</span>
                </label>
                <textarea
                  id="issue-detail"
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  rows={4}
                  className="w-full p-4 rounded-2xl bg-[#f2f3ff] text-[#131b2e] font-body-md text-xs sm:text-sm placeholder:text-[#8c7164] focus:outline-none focus:bg-white focus:border-[#f97316] border border-[#eaedff] transition-all leading-relaxed"
                  placeholder="e.g., The Double Truffle Wagyu Burger was missing the truffle aioli, and the drink lid was cracked with partial spill in the bag..."
                />
                <span className="text-[11px] text-[#8c7164] text-right">
                  {issueDescription.length} characters entered
                </span>
              </div>

              {/* Photo Proof Zone */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-lg text-xs font-bold text-[#131b2e]">
                    Attach Photo Proof (PNG or JPG)
                  </span>
                  <span className="font-body-sm text-xs text-[#8c7164]">Max 10MB per file</span>
                </div>

                {/* Upload drag/drop area */}
                <label className="p-6 rounded-2xl bg-[#f2f3ff] border-2 border-dashed border-[#dae2fd] hover:border-[#f97316] flex flex-col items-center justify-center text-center gap-2 transition-colors cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-full bg-[#ffdbca] flex items-center justify-center text-[#9d4300] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">add_a_photo</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-title-md text-xs sm:text-sm font-bold text-[#131b2e]">
                      Drag and drop PNG or JPG photos of packaging, receipt, and affected items
                    </span>
                    <span className="font-body-sm text-xs text-[#584237]">
                      High-clarity angles of seals, broken packaging, and food labels recommended
                    </span>
                  </div>
                  <span className="mt-1 px-4 py-1.5 bg-white rounded-full font-label-md text-xs font-bold text-[#131b2e] shadow-2xs border border-[#eaedff] flex items-center gap-1.5 group-hover:bg-[#eaedff]">
                    <span className="material-symbols-outlined text-[16px] text-[#f97316]">folder_open</span>
                    <span>Browse Files</span>
                  </span>
                </label>

                {/* Uploaded Photos Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="p-3 bg-[#f2f3ff] rounded-2xl flex items-center gap-3 border border-[#eaedff]"
                    >
                      <div className="w-16 h-16 rounded-xl bg-white overflow-hidden shrink-0 relative border border-[#eaedff]">
                        <img
                          src={photo.url}
                          alt={photo.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#006c49] rounded-full flex items-center justify-center text-white">
                          <span className="material-symbols-outlined text-[10px] font-bold">check</span>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-label-md text-xs font-bold text-[#131b2e] truncate">
                          {photo.name}
                        </span>
                        <span className="font-body-sm text-[11px] text-[#584237]">
                          {photo.size} • {photo.status}
                        </span>
                        <div className="flex items-center gap-3 mt-1.5">
                          <button
                            onClick={() => setPreviewPhoto(photo)}
                            className="font-label-sm text-[11px] text-[#9d4300] hover:underline flex items-center gap-0.5 cursor-pointer font-bold"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[13px]">visibility</span> Preview
                          </button>
                          <button
                            onClick={() => handleRemovePhoto(photo.id)}
                            className="font-label-sm text-[11px] text-[#ba1a1a] hover:underline flex items-center gap-0.5 cursor-pointer font-bold"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[13px]">delete</span> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Educational Notice */}
                <div className="p-3.5 rounded-2xl bg-[#eaedff] flex items-start gap-3 border border-[#dae2fd]">
                  <span className="material-symbols-outlined text-[#9d4300] text-[20px] shrink-0 mt-0.5">
                    info
                  </span>
                  <p className="font-body-sm text-xs text-[#584237] leading-relaxed">
                    <strong className="text-[#131b2e] font-semibold">Why we ask for photos:</strong> Photo proof helps our restaurant partners quickly process instant replacements, partial refunds, or CraveDash credit within 5-10 minutes without waiting on phone support callbacks.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Preferred Compensation / Resolution */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eaedff] flex flex-col gap-4">
              <span className="font-label-sm text-xs uppercase tracking-wider text-[#9d4300] font-extrabold">
                3. Preferred Compensation / Resolution
              </span>

              <div className="flex flex-col gap-3" role="radiogroup">
                {/* Option 1: CraveDash Wallet Credit */}
                <label
                  onClick={() => setResolutionMethod('credit')}
                  className={`p-4 rounded-2xl flex items-start gap-3.5 cursor-pointer transition-colors border ${
                    resolutionMethod === 'credit'
                      ? 'bg-[#ffdbca] border-[#ffb690]'
                      : 'bg-[#f2f3ff] hover:bg-[#eaedff] border-transparent'
                  }`}
                >
                  <input
                    type="radio"
                    name="resolution"
                    checked={resolutionMethod === 'credit'}
                    onChange={() => setResolutionMethod('credit')}
                    className="mt-1 accent-[#9d4300] cursor-pointer"
                  />
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="font-label-lg text-sm font-bold text-[#341100]">
                        Instant CraveDash Wallet Credit
                      </span>
                      <span className="font-label-sm text-[10px] px-2 py-0.5 rounded-full bg-[#006c49] text-white uppercase font-extrabold tracking-wider">
                        Fastest • Immediate
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-[#783200] mt-1">
                      100% item cost credited immediately +{' '}
                      <span className="font-bold text-[#341100]">₹150 CraveDash Courtesy Voucher</span> added to your account balance for your next order.
                    </p>
                  </div>
                </label>

                {/* Option 2: Original Payment Method */}
                <label
                  onClick={() => setResolutionMethod('refund')}
                  className={`p-4 rounded-2xl flex items-start gap-3.5 cursor-pointer transition-colors border ${
                    resolutionMethod === 'refund'
                      ? 'bg-[#ffdbca] border-[#ffb690]'
                      : 'bg-[#f2f3ff] hover:bg-[#eaedff] border-transparent'
                  }`}
                >
                  <input
                    type="radio"
                    name="resolution"
                    checked={resolutionMethod === 'refund'}
                    onChange={() => setResolutionMethod('refund')}
                    className="mt-1 accent-[#9d4300] cursor-pointer"
                  />
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-sm font-bold text-[#131b2e]">
                        Original Payment Method Refund
                      </span>
                      <span className="font-label-sm text-xs text-[#8c7164]">3–5 Business Days</span>
                    </div>
                    <p className="font-body-sm text-xs text-[#584237] mt-1">
                      Direct refund sent back to your Visa card ending in •••• 4092 according to bank clearing schedules.
                    </p>
                  </div>
                </label>

                {/* Option 3: Redelivery */}
                <label
                  onClick={() => setResolutionMethod('redelivery')}
                  className={`p-4 rounded-2xl flex items-start gap-3.5 cursor-pointer transition-colors border ${
                    resolutionMethod === 'redelivery'
                      ? 'bg-[#ffdbca] border-[#ffb690]'
                      : 'bg-[#f2f3ff] hover:bg-[#eaedff] border-transparent'
                  }`}
                >
                  <input
                    type="radio"
                    name="resolution"
                    checked={resolutionMethod === 'redelivery'}
                    onChange={() => setResolutionMethod('redelivery')}
                    className="mt-1 accent-[#9d4300] cursor-pointer"
                  />
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-sm font-bold text-[#131b2e]">
                        Request Urgent Priority Redelivery
                      </span>
                      <span className="font-label-sm text-xs text-[#006c49] font-bold">
                        Priority Driver Assigned
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-[#584237] mt-1">
                      Kitchen will freshly remake damaged or missing dishes and dispatch a hot-bag express courier directly to your address.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submission Button & Guarantee Tag */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSubmit}
                className="w-full py-4 px-8 bg-[#f97316] hover:bg-[#9d4300] text-white rounded-full font-headline-sm text-base transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer font-bold active:scale-[0.99]"
                type="button"
              >
                <span className="material-symbols-outlined text-[22px]">verified</span>
                <span>Submit Issue Report &amp; Photo Proof</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[#584237] text-center">
                <span className="material-symbols-outlined text-[#006c49] text-[18px]">verified_user</span>
                <span className="font-label-sm text-xs">
                  Backed by CraveDash 100% Taste &amp; Accuracy Guarantee • Automated merchant escrow protection
                </span>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Order Details, Concierge Speed, 3-Step Process */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Order Details Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eaedff] flex flex-col gap-4">
              <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
                <span className="font-label-sm text-xs uppercase tracking-wider text-[#8c7164] font-bold">
                  Order Details
                </span>
                <span className="font-label-sm text-xs px-2 py-0.5 rounded bg-[#eaedff] text-[#131b2e] font-bold">
                  Delivered
                </span>
              </div>

              <div className="flex gap-3.5 items-center">
                <div className="w-14 h-14 rounded-2xl bg-[#eaedff] overflow-hidden shrink-0 border border-[#dae2fd]">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjA--wcpk5rJZ4xxXs0ZT6fta_90T1-Z4EUHqrxGA4iUSmXzfAzVRpEfcnWFMBgPGliEMXh-ZEOWIiHzuuLA30NYjT0wwtpGPPDWx7e5n8hMBg4ZmsV6zG3K0m4z12BoUk6lrAcDlQMlcT7SAxqrvOJLMfYP5UWS7woaMyCbOlFv1wBR6cK6x8mW-5pWckJRHITiLB9xyk6RZSgIslGI2gjVNWhPZnOMyy1DjLTirwG9FADQEvOIPo"
                    alt="The Rustic Truffle Burger Co."
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <h2 className="font-title-md text-sm text-[#131b2e] font-bold truncate">
                    The Rustic Truffle Burger Co.
                  </h2>
                  <span className="font-body-sm text-xs text-[#584237]">Today at 7:45 PM • Order #CD-8942</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2 border-t border-[#eaedff]">
                <span className="font-label-sm text-[11px] text-[#8c7164] uppercase tracking-wider font-semibold">
                  Itemized Breakdown
                </span>
                <div className="flex items-center justify-between text-xs py-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-label-md px-1.5 py-0.5 rounded bg-[#eaedff] text-[#131b2e] font-bold">
                      1x
                    </span>
                    <span className="font-body-md text-[#131b2e] font-medium">Double Truffle Wagyu Burger</span>
                  </div>
                  <span className="font-label-md text-[#131b2e] font-bold">₹499</span>
                </div>

                <div className="flex items-center justify-between text-xs py-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-label-md px-1.5 py-0.5 rounded bg-[#eaedff] text-[#131b2e] font-bold">
                      1x
                    </span>
                    <span className="font-body-md text-[#131b2e] font-medium">Parmesan Truffle Fries</span>
                  </div>
                  <span className="font-label-md text-[#131b2e] font-bold">₹199</span>
                </div>

                <div className="flex items-center justify-between text-xs py-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-label-md px-1.5 py-0.5 rounded bg-[#eaedff] text-[#131b2e] font-bold">
                      1x
                    </span>
                    <span className="font-body-md text-[#131b2e] font-medium">Artisanal Sparkling Cola</span>
                  </div>
                  <span className="font-label-md text-[#131b2e] font-bold">₹149</span>
                </div>

                <div className="pt-2 mt-1 flex items-center justify-between bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff]">
                  <span className="font-label-md text-xs text-[#131b2e] font-bold">Total Paid</span>
                  <span className="font-title-md text-base text-[#131b2e] font-extrabold">₹847</span>
                </div>
              </div>
            </div>

            {/* Dispute Resolution Speed & Manager Profile */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eaedff] flex flex-col gap-4">
              <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
                <span className="font-label-sm text-xs uppercase tracking-wider text-[#8c7164] font-bold">
                  Dispute Resolution Speed
                </span>
                <span className="flex items-center gap-1 font-label-sm text-xs text-[#006c49] font-bold">
                  <span className="material-symbols-outlined text-[14px]">bolt</span> Real-Time Channel
                </span>
              </div>

              <div className="flex items-center gap-3.5 bg-[#f2f3ff] p-3.5 rounded-2xl border border-[#eaedff]">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white shadow-2xs">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-10Qz_3NwO2P50sHz9tZ8LrdScJVkI7PGrF-YDYkbEBfZoLlDYHwNpuBdBFn5vanL2d30OKjaOxIQ5QPEy28yc53_B21iVLP8PdOQxfmMtyWKzNxmmbpNGLUh6qcp4OCXYW32EDyDhggR6IPhydaEu9Nhgs3RafqSsOnKiOVnHOwExGQUPf8EP8HBNDIEmaBXyVDHGDPEGDEPE-zEIy0i6ZlCqhpI5WvfdNVwYeK219IMENAseery"
                    alt="Elena Ramos"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-xs font-bold text-[#131b2e]">Elena Ramos</span>
                  <span className="font-body-sm text-[11px] text-[#584237]">General Manager • Rustic Truffle</span>
                  <span className="font-label-sm text-[10px] text-[#006c49] flex items-center gap-1 mt-0.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
                    Typically responds in &lt; 4 minutes
                  </span>
                </div>
              </div>

              {/* What Happens After Submission */}
              <div className="flex flex-col gap-2.5 pt-1">
                <span className="font-label-sm text-[11px] text-[#8c7164] uppercase tracking-wider font-semibold">
                  What Happens After Submission
                </span>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#ffdbca] text-[#9d4300] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <p className="font-body-sm text-xs text-[#584237] leading-relaxed">
                    <strong className="text-[#131b2e]">Immediate Notification:</strong> Elena and the kitchen supervisor receive your photo evidence directly on their expedite terminal.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#ffdbca] text-[#9d4300] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <p className="font-body-sm text-xs text-[#584237] leading-relaxed">
                    <strong className="text-[#131b2e]">Autonomous Approval:</strong> If damage is evident, compensation or remake is sanctioned instantly with zero haggling.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#ffdbca] text-[#9d4300] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <p className="font-body-sm text-xs text-[#584237] leading-relaxed">
                    <strong className="text-[#131b2e]">Live Chat Activation:</strong> A direct line opens on this screen if clarification or delivery notes are required.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowAgentModal(true)}
                  className="w-full py-2.5 px-4 rounded-full bg-[#eaedff] hover:bg-[#dae2fd] transition-colors font-label-md text-xs font-bold text-[#131b2e] flex items-center justify-center gap-2 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#f97316]">headset_mic</span>
                  <span>Speak to 24/7 CraveDash Agent Now</span>
                </button>
              </div>
            </div>

            {/* Courier Logistics Verification Card */}
            <div className="bg-[#f2f3ff] rounded-2xl p-4 flex items-center gap-3.5 border border-[#eaedff]">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#f97316] shadow-2xs border border-[#eaedff]">
                <span className="material-symbols-outlined text-[22px]">electric_bike</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-xs font-bold text-[#131b2e]">Courier: Marcus K.</span>
                <span className="font-body-sm text-[11px] text-[#584237]">
                  Insulated thermal tote verified • Priority logistics tag
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Preview Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 bg-[#131b2e]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-lg w-full shadow-2xl border border-[#eaedff] flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <span className="font-headline-sm text-sm font-bold text-[#131b2e] truncate">
                {previewPhoto.name}
              </span>
              <button
                onClick={() => setPreviewPhoto(null)}
                className="p-1 rounded-full hover:bg-[#eaedff] text-[#584237] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="w-full max-h-96 rounded-xl overflow-hidden bg-[#f2f3ff] flex items-center justify-center">
              <img
                src={previewPhoto.url}
                alt={previewPhoto.name}
                className="w-full h-full object-contain max-h-80"
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setPreviewPhoto(null)}
                className="px-4 py-1.5 rounded-full bg-[#131b2e] text-white text-xs font-bold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submission Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 bg-[#131b2e]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#eaedff] flex flex-col items-center text-center gap-4 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-[#6ffbbe] text-[#002113] flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[32px] font-bold">check_circle</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-[11px] uppercase tracking-wider text-[#9d4300] font-bold">
                Claim #CLM-8942-A Submitted
              </span>
              <h2 className="font-headline-md text-2xl text-[#131b2e] font-extrabold">
                Issue Under Express Review
              </h2>
              <p className="font-body-sm text-xs text-[#584237] mt-1 leading-relaxed">
                Elena Ramos and CraveDash resolution concierge have received your report and photos.
                {resolutionMethod === 'credit' &&
                  ' ₹847 item credit + ₹150 courtesy voucher will be deposited directly into your CraveDash wallet within 4 minutes.'}
                {resolutionMethod === 'refund' &&
                  ' Refund of ₹847 has been initiated to your Visa ending in •••• 4092.'}
                {resolutionMethod === 'redelivery' &&
                  ' Kitchen is preparing fresh replacement items. An express courier has been tagged.'}
              </p>
            </div>

            <div className="w-full p-4 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] flex items-center justify-between text-left">
              <div>
                <span className="block font-label-md text-xs font-bold text-[#131b2e]">Estimated Resolution:</span>
                <span className="text-[11px] text-[#006c49] font-bold">3 minutes 40 seconds remaining</span>
              </div>
              <span className="material-symbols-outlined text-[#006c49] text-[24px]">timer</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full mt-2">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onNavigate('live-tracking');
                }}
                className="flex-1 py-3 px-4 rounded-full bg-[#f97316] text-white font-label-md text-xs font-bold hover:bg-[#9d4300] transition-colors shadow cursor-pointer"
              >
                Track Live Status
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setShowAgentModal(true);
                }}
                className="flex-1 py-3 px-4 rounded-full bg-[#eaedff] text-[#131b2e] font-label-md text-xs font-bold hover:bg-[#dae2fd] transition-colors cursor-pointer"
              >
                Open Live Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Concierge Chat Modal */}
      {showAgentModal && (
        <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#eaedff] overflow-hidden flex flex-col h-[520px]">
            {/* Header */}
            <div className="p-4 bg-[#f2f3ff] border-b border-[#eaedff] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-10Qz_3NwO2P50sHz9tZ8LrdScJVkI7PGrF-YDYkbEBfZoLlDYHwNpuBdBFn5vanL2d30OKjaOxIQ5QPEy28yc53_B21iVLP8PdOQxfmMtyWKzNxmmbpNGLUh6qcp4OCXYW32EDyDhggR6IPhydaEu9Nhgs3RafqSsOnKiOVnHOwExGQUPf8EP8HBNDIEmaBXyVDHGDPEGDEPE-zEIy0i6ZlCqhpI5WvfdNVwYeK219IMENAseery"
                  alt="Elena"
                  className="w-9 h-9 rounded-full object-cover border border-white"
                />
                <div>
                  <span className="block font-headline-sm text-xs font-bold text-[#131b2e]">
                    Elena Ramos • Kitchen GM
                  </span>
                  <span className="block font-body-sm text-[10px] text-[#006c49] font-semibold">
                    Online • Order #CD-8942 Escalation
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowAgentModal(false)}
                className="p-1 rounded-full hover:bg-white text-[#584237] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-[#faf8ff]">
              {agentChat.map((c, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${c.sender === 'You' ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] font-bold text-[#8c7164] px-1">{c.sender}</span>
                  <div
                    className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                      c.sender === 'You'
                        ? 'bg-[#f97316] text-white rounded-br-none'
                        : 'bg-white text-[#131b2e] rounded-tl-none border border-[#eaedff] shadow-2xs'
                    }`}
                  >
                    {c.text}
                  </div>
                  <span className="text-[9px] text-[#8c7164] mt-0.5 px-1">{c.time}</span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendAgentChat} className="p-3 bg-white border-t border-[#eaedff] flex items-center gap-2">
              <input
                value={agentInput}
                onChange={(e) => setAgentInput(e.target.value)}
                placeholder="Reply to Elena..."
                className="flex-1 px-4 py-2 rounded-full bg-[#f2f3ff] text-xs text-[#131b2e] focus:outline-none focus:border-[#f97316] border border-[#eaedff]"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-[#f97316] text-white flex items-center justify-center shrink-0 hover:bg-[#9d4300]"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

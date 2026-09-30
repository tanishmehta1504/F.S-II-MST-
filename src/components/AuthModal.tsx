import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userEmail: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [identifier, setIdentifier] = useState('alex.morgan@craver.io');
  const [password, setPassword] = useState('password12345');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: identifier.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Authentication failed');
        return;
      }

      onSuccess(data.user.identifier);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Network error connecting to backend.');
    }
  };

  const handleSocialLogin = (provider: string) => {
    onSuccess(`${provider.toLowerCase()}.user@cravedash.io`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl my-8">
        {/* Close Button Floating */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-30 w-9 h-9 rounded-full bg-white text-[#131b2e] hover:bg-[#eaedff] shadow-lg flex items-center justify-center transition-colors cursor-pointer border border-[#eaedff]"
          type="button"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Dual Column Authentication Card */}
        <div className="relative w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px] border border-[#eaedff]">
          {/* Left Column: Immersive Brand & Culinary Showcase */}
          <div className="lg:col-span-5 relative flex flex-col justify-between p-8 bg-[#e2e7ff] overflow-hidden">
            {/* Background Imagery with Gradient Scrim */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0vGXLDmsKb5sGDABRwTtgSWLx3yUiRBFGhO_5vTbyZfOvoPgvrE9rqUvQJjpD8eOUqi80fcvAp9VlUrOGCQPz9CueknK4z4cdUdNmZt-1PtCu4jZXCqnX6Fzu6fFI56h9KlqWptOsCew-GH7W4xw46a5RuPZWuJFjXJrZ2HcBFXnotQcE32DcESZYvLqOeQqqM6x-fYjQvpHxiVZNQSL-V90CXHrn1IV0tnw9UdUVwNIAR4ZS_-y8')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-[#131b2e]/75 to-[#131b2e]/40"></div>

            {/* Top Header & Logo Area */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xs">
                <img
                  alt="CraveDash Logo"
                  className="w-6 h-6 rounded-md object-contain"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1XdK9stPibNzKXzQFIqKBUtdn-nsQA3-OiN9WGVebXyeyd0zZbnNJCGf2eksx5XcC1CVVuw99JkyIDcUR2wuYnt_yVBTuGPjrjpwRxXwgRCZushtJo3H3i-Y_WqImdieNHoDxJsuIczFQwWgdokxt5J4oRD9gWn7BNDVwAnEBOBDbErwORCpJWBg2FAg1IiHJ-4ZYs_9-jsImqa0F-EOj_srxNKSA-hpHOPMJGVeOEXUIc3fj1lyb-M5g0"
                />
                <span className="font-headline-sm text-sm text-[#131b2e] font-bold tracking-tight">CraveDash</span>
              </div>
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-white bg-[#f97316] px-3 py-1 rounded-full font-bold shadow-xs">
                VIP Express
              </span>
            </div>

            {/* Mid Content: Value Highlights & Badges */}
            <div className="relative z-10 my-auto py-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-white">
                <span className="material-symbols-outlined text-[#6ffbbe] text-[16px]">verified</span>
                <span className="font-label-md text-xs font-bold">Verified Taste Discovery</span>
              </div>

              <h1 className="font-display-lg text-3xl sm:text-4xl text-white leading-tight tracking-tight font-extrabold">
                Craving <br />
                <span className="text-[#ffb690]">unmatched</span> <br />
                delight?
              </h1>

              <p className="font-body-md text-xs sm:text-sm text-[#dae2fd] max-w-xs leading-relaxed">
                From Michelin-star bistros to neighborhood sweet spots, delivered hot right to your doorstep.
              </p>

              {/* Delivery Telemetry Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white">
                  <span className="material-symbols-outlined text-amber-300 text-[16px]">bolt</span>
                  <span className="font-label-md text-[11px] font-bold">Avg 24 min delivery</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white">
                  <span className="material-symbols-outlined text-[#6ffbbe] text-[16px]">storefront</span>
                  <span className="font-label-md text-[11px] font-bold">450+ Local spots</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white">
                  <span className="material-symbols-outlined text-[#6cf8bb] text-[16px]">health_and_safety</span>
                  <span className="font-label-md text-[11px] font-bold">100% Contactless</span>
                </div>
              </div>
            </div>

            {/* Bottom Testimonial */}
            <div className="relative z-10 bg-white/15 backdrop-blur-md p-4 rounded-2xl text-white border border-white/10">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[14px]">star</span>
                  ))}
                  <span className="font-label-sm text-[11px] text-white ml-1 font-bold">5.0 (42k+ orders)</span>
                </div>
                <span className="font-label-sm text-[10px] text-[#6ffbbe] font-bold">12m ago</span>
              </div>
              <p className="font-body-sm text-xs italic text-white/90">
                “CraveDash gets my wood-fired Neapolitan pizza here still sizzling and crispy every single time.”
              </p>
              <div className="flex items-center gap-2.5 mt-2.5">
                <img
                  className="w-7 h-7 rounded-full object-cover border border-white"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB30jdDHiH0qWA9_jREIF1XfWTLpgwf9taZzfDNG_GMebgsMJdNzMowexUuLTpauDm4E855bGlf1X0ZjGJrA3kyuzk6ZSHL6fuEUhI7Z2H5-Bl5XXB9Api12q82fCGyghneOoCE3lVAY5te47T57EbDQGNvVzeDcLY0AqYMX3H8OjyTYxfQVGrK-ArPIA2-Oz1K2goNuaXE_8qvPCiuJBBtFvGB3SJs3Rha_lkA559d5_p3XuWxMRbC"
                  alt="Elena Rostova"
                />
                <div>
                  <p className="font-label-sm text-xs font-bold text-white">Elena Rostova</p>
                  <p className="font-body-sm text-[10px] text-[#dae2fd]">Food Blogger &amp; Top Craver</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Form Panel */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
            {/* Top Prompt */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[#584237]">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span className="font-label-sm text-xs font-semibold">Secure Portal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-body-sm text-xs text-[#584237]">
                  {isSignUp ? 'Already have an account?' : 'New hungry soul?'}
                </span>
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="font-label-md text-xs font-bold text-[#f97316] hover:text-[#9d4300] transition-colors cursor-pointer"
                  type="button"
                >
                  {isSignUp ? 'Sign in' : 'Create account'}
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="max-w-md w-full mx-auto my-auto py-4">
              <div className="inline-flex items-center gap-2 bg-[#ffdbca]/60 text-[#341100] px-3 py-1 rounded-full mb-3 shadow-2xs">
                <span className="material-symbols-outlined text-[#f97316] text-[16px]">local_offer</span>
                <span className="font-label-sm text-[11px] font-bold">Get 20% off your first 3 orders with sign-in</span>
              </div>

              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#131b2e] tracking-tight font-extrabold mb-1">
                {isSignUp ? 'Create CraveDash Account' : 'Welcome back to CraveDash'}
              </h2>
              <p className="font-body-md text-xs sm:text-sm text-[#584237] mb-5">
                Sign in to access your saved spots, orders, and custom crave lists.
              </p>

              {/* 1-Click Social Sign-in */}
              <div className="grid grid-cols-3 gap-2.5 mb-5">
                {/* Google */}
                <button
                  onClick={() => handleSocialLogin('Google')}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#f2f3ff] hover:bg-[#eaedff] rounded-xl transition-all text-[#131b2e] font-label-md text-xs font-bold shadow-2xs border border-[#eaedff] cursor-pointer"
                  type="button"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                  <span>Google</span>
                </button>

                {/* Apple */}
                <button
                  onClick={() => handleSocialLogin('Apple')}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#f2f3ff] hover:bg-[#eaedff] rounded-xl transition-all text-[#131b2e] font-label-md text-xs font-bold shadow-2xs border border-[#eaedff] cursor-pointer"
                  type="button"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.66-1.06 1.73-.93 2.76.99.08 2.02-.51 2.64-1.26z" />
                  </svg>
                  <span>Apple</span>
                </button>

                {/* Phone OTP */}
                <button
                  onClick={() => handleSocialLogin('Phone')}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#f2f3ff] hover:bg-[#eaedff] rounded-xl transition-all text-[#131b2e] font-label-md text-xs font-bold shadow-2xs border border-[#eaedff] cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#006c49]">sms</span>
                  <span>OTP Pin</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center mb-5">
                <div className="w-full h-px bg-[#eaedff]"></div>
                <span className="absolute bg-white px-3 font-label-sm text-[10px] text-[#8c7164] uppercase tracking-wider">
                  Or continue with email / phone
                </span>
              </div>

              {/* Form fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-label-md text-xs text-[#131b2e] mb-1 font-bold" htmlFor="identifier">
                    Email Address or Phone
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[#8c7164] text-[18px]">
                      mail
                    </span>
                    <input
                      id="identifier"
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="name@domain.com or +1 (555) 000-0000"
                      className="w-full pl-10 pr-10 py-3 bg-[#f2f3ff] focus:bg-white text-[#131b2e] rounded-xl font-body-md text-xs sm:text-sm border border-[#eaedff] focus:border-[#f97316] outline-none transition-all shadow-2xs"
                    />
                    <span className="material-symbols-outlined absolute right-3.5 text-[#006c49] text-[18px]">
                      check_circle
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-label-md text-xs text-[#131b2e] font-bold" htmlFor="password">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Password recovery link sent to your registered contact.')}
                      className="font-label-sm text-[11px] text-[#9d4300] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[#8c7164] text-[18px]">
                      key
                    </span>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-10 pr-10 py-3 bg-[#f2f3ff] focus:bg-white text-[#131b2e] rounded-xl font-body-md text-xs sm:text-sm border border-[#eaedff] focus:border-[#f97316] outline-none transition-all shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-[#8c7164] hover:text-[#131b2e] p-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={keepSignedIn}
                      onChange={(e) => setKeepSignedIn(e.target.checked)}
                      className="w-4 h-4 accent-[#f97316] rounded cursor-pointer"
                    />
                    <span className="font-body-sm text-xs text-[#131b2e]">Keep me signed in for 30 days</span>
                  </label>
                  <span className="font-label-sm text-[10px] text-[#006c49] bg-[#6ffbbe]/30 px-2 py-0.5 rounded font-bold">
                    Fast Re-order
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#f97316] hover:bg-[#9d4300] text-white font-headline-sm text-sm rounded-full transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer font-bold active:scale-[0.99]"
                >
                  <span>Sign In to Order Food</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </form>

              {/* Fast Re-order Note */}
              <div className="mt-4 p-3 bg-[#f2f3ff] rounded-xl flex items-center gap-2.5 border border-[#eaedff]">
                <span className="material-symbols-outlined text-[#f97316] text-[18px]">electric_bolt</span>
                <p className="font-body-sm text-xs text-[#584237]">
                  Previous active order found in <span className="font-bold text-[#131b2e]">Downtown Austin</span>. Instant delivery available.
                </p>
              </div>
            </div>

            {/* Footer Trust Strip */}
            <div className="pt-4 border-t border-[#eaedff] flex flex-col sm:flex-row items-center justify-between text-[#8c7164] font-body-sm text-xs gap-2">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#006c49] text-[16px]">verified_user</span>
                <span>256-bit Bank Grade SSL Encryption</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hover:text-[#131b2e] cursor-pointer">Privacy Policy</span>
                <span>•</span>
                <span className="hover:text-[#131b2e] cursor-pointer">Terms of Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

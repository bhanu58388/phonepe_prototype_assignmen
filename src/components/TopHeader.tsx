import React from 'react';
import { QrCode, Bell, HelpCircle, Volume2, VolumeX, Smartphone, Monitor, ChevronDown } from 'lucide-react';
import { PhonePeLogo } from './PhonePeLogo';

interface TopHeaderProps {
  userName: string;
  location?: string;
  isSoundboxEnabled: boolean;
  onToggleSoundbox: () => void;
  onOpenScanner: () => void;
  onOpenMyQr: () => void;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
  onOpenHelp: () => void;
  isFrameMode: boolean;
  onToggleFrameMode: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  userName,
  location = 'Indiranagar, Bengaluru',
  isSoundboxEnabled,
  onToggleSoundbox,
  onOpenScanner,
  onOpenMyQr,
  onOpenProfile,
  onOpenNotifications,
  onOpenHelp,
  isFrameMode,
  onToggleFrameMode,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#5f259f] text-white shadow-md transition-colors">
      {/* Top action row */}
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        {/* Left: User Avatar & Location */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={onOpenProfile}
            className="relative w-10 h-10 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center font-bold text-sm tracking-wide hover:bg-white/30 transition-transform active:scale-95 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            title="Profile & Settings"
            aria-label="User Profile"
          >
            <span>{userName.charAt(0)}</span>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#5f259f]" />
          </button>

          <div
            onClick={onOpenProfile}
            className="flex flex-col cursor-pointer text-left truncate group"
          >
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold leading-tight text-white/90 group-hover:text-white truncate max-w-[130px] sm:max-w-[180px]">
                {location}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-white/70 group-hover:text-white shrink-0" />
            </div>
            <span className="text-[10px] text-white/70 leading-tight">Add Address</span>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Soundbox audio toggle */}
          <button
            onClick={onToggleSoundbox}
            className={`p-2 rounded-full transition-all ${
              isSoundboxEnabled
                ? 'bg-amber-400 text-slate-900 shadow-sm'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
            title={isSoundboxEnabled ? 'PhonePe SmartSpeaker Voice Alert: Active' : 'Soundbox Alerts Muted'}
            aria-label="Toggle SmartSpeaker Voice"
          >
            {isSoundboxEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* QR Scanner trigger */}
          <button
            onClick={onOpenScanner}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            title="Scan any QR code"
            aria-label="Scan QR Code"
          >
            <QrCode className="w-5 h-5" />
          </button>

          {/* Notification bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-[#5f259f]" />
          </button>

          {/* Help button */}
          <button
            onClick={onOpenHelp}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            title="Help & Support"
            aria-label="Customer support"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Desktop Responsive / Phone frame switcher */}
          <button
            onClick={onToggleFrameMode}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 text-xs text-white/90 font-medium transition-all ml-1"
            title={isFrameMode ? 'Switch to Full-Width View' : 'Switch to Smartphone Frame View'}
          >
            {isFrameMode ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span className="text-[11px]">Wide</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="text-[11px]">Phone</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

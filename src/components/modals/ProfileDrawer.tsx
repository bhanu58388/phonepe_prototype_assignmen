import React from 'react';
import {
  X,
  User,
  QrCode,
  Landmark,
  ShieldCheck,
  Volume2,
  Moon,
  Sun,
  Smartphone,
  Monitor,
  ChevronRight,
  LogOut,
  Award,
} from 'lucide-react';
import { BankAccount } from '../../types/phonepe';
import { speakSoundbox, playPhonePeChime } from '../../utils/soundbox';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  phone: string;
  upiId: string;
  bankAccounts: BankAccount[];
  isSoundboxEnabled: boolean;
  onToggleSoundbox: () => void;
  soundboxLanguage: 'hi' | 'en';
  onChangeSoundboxLanguage: (lang: 'hi' | 'en') => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isFrameMode: boolean;
  onToggleFrameMode: () => void;
  onOpenMyQr: () => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  userName,
  phone,
  upiId,
  bankAccounts,
  isSoundboxEnabled,
  onToggleSoundbox,
  soundboxLanguage,
  onChangeSoundboxLanguage,
  isDarkMode,
  onToggleDarkMode,
  isFrameMode,
  onToggleFrameMode,
  onOpenMyQr,
}) => {
  if (!isOpen) return null;

  const handleTestAudio = () => {
    speakSoundbox(500, soundboxLanguage);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 h-full overflow-y-auto flex flex-col shadow-2xl border-l border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white transition-colors">
        {/* Top Header */}
        <div className="p-5 bg-[#5f259f] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center font-bold text-lg">
              {userName.charAt(0)}
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight">{userName}</h2>
              <p className="text-xs text-white/80">{phone}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-5 space-y-4 flex-1">
          {/* UPI ID & QR Snippet */}
          <div
            onClick={() => {
              onClose();
              onOpenMyQr();
            }}
            className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 flex items-center justify-between cursor-pointer hover:border-[#5f259f] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#5f259f] text-white flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">My QR & UPI ID</p>
                <p className="font-mono text-[11px] text-[#5f259f] dark:text-[#c084fc] font-medium">
                  {upiId}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Linked Bank Accounts */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Payment Methods
            </h3>
            <div className="space-y-2">
              {bankAccounts.map((b) => (
                <div
                  key={b.id}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-lg ${b.logoBg} text-white flex items-center justify-center font-bold text-xs`}
                    >
                      <Landmark className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">{b.bankName}</p>
                      <p className="text-[10px] text-slate-500">•••• {b.last4Digits} · {b.accountType}</p>
                    </div>
                  </div>
                  {b.isPrimary && (
                    <span className="text-[10px] font-bold text-[#5f259f] dark:text-[#c084fc] bg-purple-100 dark:bg-purple-900/60 px-2 py-0.5 rounded-full">
                      Primary
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* PhonePe SmartSpeaker Settings */}
          <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-bold">SmartSpeaker Audio Alert</span>
              </div>
              <button
                onClick={onToggleSoundbox}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  isSoundboxEnabled ? 'bg-[#5f259f]' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    isSoundboxEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Voice Language</span>
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => onChangeSoundboxLanguage('hi')}
                  className={`px-2 py-1 rounded text-[11px] font-bold ${
                    soundboxLanguage === 'hi'
                      ? 'bg-[#5f259f] text-white'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Hindi
                </button>
                <button
                  onClick={() => onChangeSoundboxLanguage('en')}
                  className={`px-2 py-1 rounded text-[11px] font-bold ${
                    soundboxLanguage === 'en'
                      ? 'bg-[#5f259f] text-white'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            <button
              onClick={handleTestAudio}
              className="w-full py-1.5 rounded-xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 text-xs font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-100/50 transition-colors"
            >
              🔊 Test Soundbox Announcement
            </button>
          </div>

          {/* App Preferences */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Preferences
            </h3>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <div className="flex items-center gap-2.5 text-xs font-semibold">
                {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                <span>Dark Theme</span>
              </div>
              <button
                onClick={onToggleDarkMode}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  isDarkMode ? 'bg-[#5f259f]' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    isDarkMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Viewport Frame Mode Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <div className="flex items-center gap-2.5 text-xs font-semibold">
                {isFrameMode ? <Smartphone className="w-4 h-4 text-[#5f259f]" /> : <Monitor className="w-4 h-4 text-slate-500" />}
                <span>Mobile Shell Frame</span>
              </div>
              <button
                onClick={onToggleFrameMode}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  isFrameMode ? 'bg-[#5f259f]' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    isFrameMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-400">
          PhonePe Version 24.11 · 100% NPCI & RBI Regulated
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Flashlight, Image as ImageIcon, QrCode, Sparkles, Check } from 'lucide-react';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanResult: (merchant: {
    name: string;
    upiId: string;
    amount?: number;
    avatarBg: string;
  }) => void;
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  onScanResult,
}) => {
  const [torchOn, setTorchOn] = useState(false);
  const [customUpi, setCustomUpi] = useState('');

  if (!isOpen) return null;

  const demoMerchants = [
    {
      name: 'Sharma Chai & Snacks',
      upiId: 'sharmachai@ybl',
      amount: 30,
      avatarBg: 'bg-amber-600',
    },
    {
      name: 'D-Mart Supermarket',
      upiId: 'dmart.indiranagar@hdfcbank',
      amount: 840,
      avatarBg: 'bg-emerald-600',
    },
    {
      name: 'Apollo Pharmacy 24x7',
      upiId: 'apollopharmacy@hdfcbank',
      amount: 450,
      avatarBg: 'bg-teal-600',
    },
    {
      name: 'Shell Petrol Pump',
      upiId: 'shellindiranagar@oksbi',
      amount: 650,
      avatarBg: 'bg-yellow-600',
    },
  ];

  const handleSimulateScan = (merchant: typeof demoMerchants[0]) => {
    onScanResult(merchant);
  };

  const handleCustomScan = () => {
    if (!customUpi.trim()) return;
    const clean = customUpi.trim();
    onScanResult({
      name: clean.includes('@') ? clean.split('@')[0] : 'Scanned Merchant',
      upiId: clean.includes('@') ? clean : `${clean}@ybl`,
      avatarBg: 'bg-[#5f259f]',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between text-white animate-in fade-in duration-200">
      {/* Top controls */}
      <div className="p-4 flex items-center justify-between z-10">
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close scanner"
        >
          <X className="w-5 h-5" />
        </button>
        <span className="text-sm font-bold tracking-tight">Scan any QR code</span>
        <button
          onClick={() => setTorchOn(!torchOn)}
          className={`p-2 rounded-full transition-all ${
            torchOn ? 'bg-amber-400 text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          title="Flashlight"
          aria-label="Toggle flashlight"
        >
          <Flashlight className="w-5 h-5" />
        </button>
      </div>

      {/* Camera Viewfinder Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
        {/* Flashlight screen tint */}
        {torchOn && (
          <div className="absolute inset-0 bg-amber-500/10 pointer-events-none" />
        )}

        {/* Viewfinder Reticle */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl border-2 border-white/40 overflow-hidden flex items-center justify-center shadow-2xl bg-black/40">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#a855f7] rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#a855f7] rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#a855f7] rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#a855f7] rounded-br-xl" />

          {/* Animated Laser Scanning Line */}
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#a855f7] to-transparent shadow-lg shadow-[#a855f7] animate-[bounce_2.5s_infinite]" />

          {/* Center hint */}
          <div className="text-center p-4">
            <QrCode className="w-12 h-12 text-white/30 mx-auto mb-2" />
            <p className="text-xs text-white/70">Align QR code inside the frame to pay</p>
          </div>
        </div>

        <p className="text-xs text-white/80 mt-4 text-center">
          Works with PhonePe, Google Pay, Paytm, BHIM & all UPI QR codes
        </p>
      </div>

      {/* Bottom Panel with Preset Demos & Custom QR */}
      <div className="p-5 bg-slate-950/90 border-t border-slate-800 rounded-t-3xl max-w-md mx-auto w-full z-10">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Quick Scan Demo Presets
          </span>
          <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>1-Tap Test</span>
          </span>
        </div>

        {/* Quick Demo Merchant Chips */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {demoMerchants.map((m) => (
            <button
              key={m.upiId}
              onClick={() => handleSimulateScan(m)}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-[#5f259f]/30 border border-slate-800 hover:border-[#5f259f] text-left transition-all active:scale-95"
            >
              <p className="text-xs font-semibold text-white truncate">{m.name}</p>
              <p className="text-[11px] text-emerald-400 font-bold tabular-nums">
                ₹{m.amount}
              </p>
            </button>
          ))}
        </div>

        {/* Custom UPI string scanner */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Or type custom UPI ID / Shop name"
            value={customUpi}
            onChange={(e) => setCustomUpi(e.target.value)}
            className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-[#5f259f]"
          />
          <button
            onClick={handleCustomScan}
            disabled={!customUpi.trim()}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#5f259f] disabled:opacity-40 text-white"
          >
            Scan
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Delete, Check, Lock, ShieldAlert } from 'lucide-react';

interface UpiPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  amount?: number;
  bankName?: string;
  pinLength?: number;
  onSuccess: (pin: string) => void;
}

export const UpiPinModal: React.FC<UpiPinModalProps> = ({
  isOpen,
  onClose,
  title = 'Paying to Merchant',
  subtitle,
  amount,
  bankName = 'State Bank of India •••• 4821',
  pinLength = 4,
  onSuccess,
}) => {
  const [pin, setPin] = useState<string>('');

  React.useEffect(() => {
    if (isOpen) {
      setPin('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleKeyPress = (num: number) => {
    if (pin.length < pinLength) {
      const newPin = pin + num.toString();
      setPin(newPin);
      if (newPin.length === pinLength) {
        setTimeout(() => {
          onSuccess(newPin);
        }, 250);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleConfirm = () => {
    if (pin.length === pinLength) {
      onSuccess(pin);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-slate-950 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 flex flex-col justify-between min-h-[520px]">
        {/* Top Info Header */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold tracking-wider text-[11px] uppercase">
                BHIM UPI Secure PIN
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center py-4">
            <p className="text-xs text-slate-400">{title}</p>
            {amount !== undefined && (
              <p className="text-2xl font-black text-white mt-0.5 tabular-nums">
                ₹{amount.toLocaleString('en-IN')}
              </p>
            )}
            <p className="text-[11px] text-slate-400 mt-1">{bankName}</p>

            <div className="mt-6">
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-300">
                Enter {pinLength}-Digit UPI PIN
              </span>

              {/* Pin indicator dots */}
              <div className="flex items-center justify-center gap-4 mt-4">
                {Array.from({ length: pinLength }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-150 ${
                      i < pin.length
                        ? 'bg-white scale-110 shadow-sm shadow-white/50'
                        : 'border-2 border-slate-700 bg-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security Alert Note */}
        <div className="py-2 px-3 bg-slate-900/80 rounded-xl border border-slate-800/80 flex items-center gap-2 text-[10px] text-slate-400 my-1">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Never share your UPI PIN with anyone, even PhonePe representatives.</span>
        </div>

        {/* Virtual Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleKeyPress(num)}
              className="h-13 rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-lg font-bold text-white transition-all flex items-center justify-center shadow-xs"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={handleDelete}
            className="h-13 rounded-2xl bg-slate-900/60 hover:bg-slate-800 active:bg-slate-700 text-slate-400 hover:text-white transition-all flex items-center justify-center"
            aria-label="Delete"
          >
            <Delete className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleKeyPress(0)}
            className="h-13 rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-lg font-bold text-white transition-all flex items-center justify-center"
          >
            0
          </button>
          <button
            type="button"
            disabled={pin.length !== pinLength}
            onClick={handleConfirm}
            className="h-13 rounded-2xl bg-[#5f259f] hover:bg-[#702ebd] active:bg-[#4f1a87] disabled:opacity-30 disabled:pointer-events-none text-white transition-all flex items-center justify-center font-bold"
            aria-label="Submit PIN"
          >
            <Check className="w-6 h-6 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};

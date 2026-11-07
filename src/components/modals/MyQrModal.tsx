import React, { useState } from 'react';
import { X, Copy, Check, Download, Share2, ShieldCheck, IndianRupee } from 'lucide-react';
import { PhonePeLogo } from '../PhonePeLogo';

interface MyQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  upiId: string;
}

export const MyQrModal: React.FC<MyQrModalProps> = ({
  isOpen,
  onClose,
  userName,
  upiId,
}) => {
  const [copied, setCopied] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isAmountSet, setIsAmountSet] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    alert(`PhonePe QR for ${userName} (${upiId}) saved!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#5f259f] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PhonePeLogo size="sm" showText={false} />
            <span className="text-sm font-bold">Receive Money</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Card Body */}
        <div className="p-6 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6b2aa8] to-[#551d8f] text-white flex items-center justify-center text-lg font-bold shadow-md">
            {userName.charAt(0)}
          </div>
          <h2 className="text-base font-bold mt-2">{userName}</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-mono text-xs text-slate-600 dark:text-slate-400 font-semibold">
              {upiId}
            </span>
            <button
              onClick={handleCopy}
              className="p-1 text-[#5f259f] dark:text-[#c084fc] hover:bg-purple-50 dark:hover:bg-purple-950/40 rounded transition-colors"
              title="Copy UPI ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* QR Code Container */}
          <div className="relative mt-5 p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-inner flex flex-col items-center justify-center">
            {/* Crisp SVG QR Code graphic with PhonePe center logo */}
            <svg
              className="w-48 h-48 sm:w-52 sm:h-52"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* QR Pattern simulated with crisp vector elements */}
              <rect width="200" height="200" fill="white" />
              {/* Corner 1 */}
              <rect x="15" y="15" width="45" height="45" rx="8" fill="#5f259f" />
              <rect x="25" y="25" width="25" height="25" rx="4" fill="white" />
              <rect x="31" y="31" width="13" height="13" rx="2" fill="#5f259f" />

              {/* Corner 2 */}
              <rect x="140" y="15" width="45" height="45" rx="8" fill="#5f259f" />
              <rect x="150" y="25" width="25" height="25" rx="4" fill="white" />
              <rect x="156" y="31" width="13" height="13" rx="2" fill="#5f259f" />

              {/* Corner 3 */}
              <rect x="15" y="140" width="45" height="45" rx="8" fill="#5f259f" />
              <rect x="25" y="150" width="25" height="25" rx="4" fill="white" />
              <rect x="31" y="156" width="13" height="13" rx="2" fill="#5f259f" />

              {/* Data Blocks */}
              <rect x="75" y="20" width="10" height="10" fill="#333" />
              <rect x="95" y="20" width="10" height="20" fill="#333" />
              <rect x="115" y="25" width="15" height="10" fill="#333" />
              <rect x="70" y="45" width="15" height="15" fill="#333" />
              <rect x="100" y="55" width="10" height="10" fill="#333" />

              <rect x="20" y="75" width="10" height="15" fill="#333" />
              <rect x="40" y="70" width="20" height="10" fill="#333" />
              <rect x="25" y="100" width="15" height="10" fill="#333" />
              <rect x="50" y="95" width="15" height="25" fill="#333" />

              <rect x="145" y="75" width="15" height="15" fill="#333" />
              <rect x="170" y="80" width="15" height="10" fill="#333" />
              <rect x="140" y="100" width="10" height="20" fill="#333" />
              <rect x="160" y="110" width="25" height="15" fill="#333" />

              <rect x="75" y="140" width="15" height="10" fill="#333" />
              <rect x="100" y="145" width="25" height="15" fill="#333" />
              <rect x="70" y="165" width="20" height="20" fill="#333" />
              <rect x="110" y="170" width="15" height="15" fill="#333" />
              <rect x="140" y="145" width="20" height="10" fill="#333" />
              <rect x="165" y="160" width="20" height="25" fill="#333" />

              {/* Center Logo Box */}
              <rect x="75" y="75" width="50" height="50" rx="12" fill="#5f259f" />
              <text
                x="100"
                y="108"
                fill="white"
                fontSize="26"
                fontWeight="bold"
                fontFamily="sans-serif"
                textAnchor="middle"
              >
                पे
              </text>
            </svg>

            {isAmountSet && customAmount && (
              <div className="absolute bottom-2 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                Paying ₹{customAmount}
              </div>
            )}
          </div>

          {/* Set Amount option */}
          <div className="mt-3 w-full">
            {!isAmountSet ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Set custom amount (optional)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-[#5f259f]"
                />
                {customAmount && (
                  <button
                    onClick={() => setIsAmountSet(true)}
                    className="px-3 py-1.5 bg-[#5f259f] text-white text-xs font-semibold rounded-xl"
                  >
                    Apply
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold px-2">
                <span>Preset Amount: ₹{customAmount}</span>
                <button
                  onClick={() => {
                    setIsAmountSet(false);
                    setCustomAmount('');
                  }}
                  className="text-slate-400 hover:text-slate-600 underline"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Trust badge */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Accept payments from any UPI application</span>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 w-full mt-5">
            <button
              onClick={handleCopy}
              className="py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy UPI'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="py-2.5 rounded-xl bg-[#5f259f] text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#521f8b] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Save QR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

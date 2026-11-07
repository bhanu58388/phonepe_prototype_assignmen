import React, { useEffect } from 'react';
import { Check, Share2, Copy, Gift, ArrowRight, RotateCcw, Download } from 'lucide-react';
import { playPhonePeChime, speakSoundbox } from '../../utils/soundbox';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: {
    recipientName: string;
    recipientUpiId: string;
    amount: number;
    transactionId: string;
    upiRefId: string;
    timestamp: string;
    bankAccount: string;
    note?: string;
  } | null;
  onOpenScratchCard: () => void;
  isSoundboxEnabled: boolean;
  soundboxLanguage: 'hi' | 'en';
  onRepeatPayment?: () => void;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isOpen,
  onClose,
  details,
  onOpenScratchCard,
  isSoundboxEnabled,
  soundboxLanguage,
  onRepeatPayment,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (isOpen && details) {
      if (isSoundboxEnabled) {
        speakSoundbox(details.amount, soundboxLanguage);
      } else {
        playPhonePeChime();
      }
    }
  }, [isOpen, details, isSoundboxEnabled, soundboxLanguage]);

  if (!isOpen || !details) return null;

  const handleCopyDetails = () => {
    const text = `PhonePe Payment Receipt\nPaid: ₹${details.amount}\nTo: ${details.recipientName} (${details.recipientUpiId})\nTxn ID: ${details.transactionId}\nUPI Ref: ${details.upiRefId}\nTime: ${details.timestamp}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[95vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors">
        {/* Top Green Success Banner */}
        <div className="bg-gradient-to-b from-[#1fa35b] to-[#178548] text-white p-6 text-center relative">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center mx-auto mb-3 shadow-md animate-in zoom-in-50 duration-300">
            <Check className="w-9 h-9 text-white stroke-[3.5]" />
          </div>

          <p className="text-xs uppercase tracking-widest font-semibold text-white/90">
            Payment Successful
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-1 text-white tabular-nums drop-shadow-xs">
            ₹{details.amount.toLocaleString('en-IN')}
          </h1>
          <p className="text-xs text-white/90 mt-1">
            Paid to <span className="font-semibold">{details.recipientName}</span>
          </p>
        </div>

        {/* Receipt Details Card */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700 dark:text-slate-300">
          {/* Scratch Card CTA Banner */}
          <div
            onClick={onOpenScratchCard}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white flex items-center justify-between cursor-pointer shadow-md shadow-amber-500/20 hover:scale-[1.01] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl shrink-0">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">You won a Scratch Card!</p>
                <p className="text-[10px] text-amber-100">Tap to scratch and reveal your cashback</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 shrink-0 text-white" />
          </div>

          {/* Transaction Metadata Grid */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Paid To</span>
              <span className="font-semibold text-slate-900 dark:text-white text-right">
                {details.recipientName}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">UPI ID</span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                {details.recipientUpiId}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Debited From</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {details.bankAccount}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 dark:text-slate-400">Transaction ID</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">
                {details.transactionId}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">UPI Ref / UTR No</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">
                {details.upiRefId}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Date & Time</span>
              <span className="text-slate-700 dark:text-slate-300">{details.timestamp}</span>
            </div>

            {details.note && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Note</span>
                <span className="text-slate-800 dark:text-slate-200 italic">{details.note}</span>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleCopyDetails}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-xs text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied Receipt' : 'Share Receipt'}</span>
            </button>

            {onRepeatPayment && (
              <button
                onClick={onRepeatPayment}
                className="flex-1 py-2.5 px-3 rounded-xl border border-[#5f259f]/30 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 font-semibold text-xs text-[#5f259f] dark:text-[#c084fc] flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Pay Again</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer Done Button */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full h-11 rounded-xl bg-[#5f259f] hover:bg-[#521f8b] text-white font-bold text-xs tracking-wider uppercase transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Sparkles, Check, Gift, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScratchCard } from '../../types/phonepe';

interface ScratchCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: ScratchCard;
  onClaimCashback: (cardId: string, amount: number) => void;
}

export const ScratchCardModal: React.FC<ScratchCardModalProps> = ({
  isOpen,
  onClose,
  card,
  onClaimCashback,
}) => {
  const [isRevealed, setIsRevealed] = useState(card.isScratched);
  const [claimed, setClaimed] = useState(false);

  React.useEffect(() => {
    setIsRevealed(card.isScratched);
    setClaimed(false);
  }, [card, isOpen]);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#5f259f', '#fbbf24', '#10b981', '#ec4899'],
    });
  };

  const handleScratch = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      triggerConfetti();
    }
  };

  const handleClaim = () => {
    onClaimCashback(card.id, card.amountWon);
    setClaimed(true);
    triggerConfetti();
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 text-center relative flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#5f259f] text-white flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
            <Gift className="w-4 h-4 text-amber-300" />
            <span>PhonePe Rewards</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scratch Surface Card */}
        <div className="p-6 flex flex-col items-center">
          <div
            onClick={handleScratch}
            className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-lg border-2 border-amber-300/60 cursor-pointer select-none group"
          >
            {/* The revealed prize layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 dark:from-amber-950 dark:via-amber-900 dark:to-amber-800 flex flex-col items-center justify-center p-4 text-slate-900 dark:text-white">
              <div className="w-14 h-14 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center mb-2 shadow-sm">
                <Sparkles className="w-7 h-7 text-amber-900" />
              </div>
              <p className="text-xs uppercase font-extrabold tracking-wider text-amber-800 dark:text-amber-300">
                You Won
              </p>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white my-1 tabular-nums">
                ₹{card.amountWon}
              </h2>
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                Cashback Voucher
              </p>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 max-w-[180px]">
                {card.title}
              </p>
            </div>

            {/* The scratchable overlay layer */}
            {!isRevealed && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#6b2aa8] via-[#5f259f] to-[#471578] flex flex-col items-center justify-center p-4 text-white transition-opacity duration-300 group-hover:opacity-95">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/30 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Gift className="w-8 h-8 text-amber-300" />
                </div>
                <p className="text-sm font-bold">Tap to Scratch</p>
                <p className="text-[11px] text-purple-200 mt-1">Unlock your exclusive cashback</p>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="w-full mt-6">
            {!isRevealed ? (
              <button
                onClick={handleScratch}
                className="w-full h-11 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-900 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20"
              >
                Scratch Now
              </button>
            ) : claimed ? (
              <div className="h-11 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Cashback Added to Wallet!</span>
              </div>
            ) : (
              <button
                onClick={handleClaim}
                className="w-full h-11 rounded-xl bg-[#5f259f] hover:bg-[#521f8b] active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#5f259f]/20 flex items-center justify-center gap-2"
              >
                <span>Claim ₹{card.amountWon} to Wallet</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

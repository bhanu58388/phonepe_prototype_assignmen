import React from 'react';
import { Wallet, Zap, CreditCard, ChevronRight, Plus } from 'lucide-react';

interface WalletLiteBarProps {
  walletBalance: number;
  upiLiteBalance: number;
  onTopupWallet: () => void;
  onManageUpiLite: () => void;
  onLinkRupay: () => void;
}

export const WalletLiteBar: React.FC<WalletLiteBarProps> = ({
  walletBalance,
  upiLiteBalance,
  onTopupWallet,
  onManageUpiLite,
  onLinkRupay,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {/* PhonePe Wallet */}
      <div
        onClick={onTopupWallet}
        className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-[#5f259f]/40 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-[#5f259f] dark:text-[#c084fc] flex items-center justify-center shrink-0">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">PhonePe Wallet</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
              ₹{walletBalance.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-[#5f259f] dark:text-[#a855f7] bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 rounded-lg group-hover:bg-[#5f259f] group-hover:text-white transition-colors">
          <Plus className="w-3.5 h-3.5" />
          <span>Top-up</span>
        </div>
      </div>

      {/* UPI Lite */}
      <div
        onClick={onManageUpiLite}
        className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-emerald-500/40 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>UPI Lite</span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 dark:bg-emerald-900/40 px-1 rounded">
                PIN-less
              </span>
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
              ₹{upiLiteBalance.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
          <span>Add</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

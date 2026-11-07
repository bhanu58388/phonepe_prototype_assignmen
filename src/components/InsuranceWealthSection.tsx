import React from 'react';
import { ShieldCheck, Coins, TrendingUp, Gift, Users, ChevronRight, Award } from 'lucide-react';

interface InsuranceWealthSectionProps {
  onOpenGold: () => void;
  onOpenInsurance: () => void;
  onOpenMutualFunds: () => void;
  onOpenRewards: () => void;
  onOpenReferral: () => void;
  goldPricePerGram?: number;
}

export const InsuranceWealthSection: React.FC<InsuranceWealthSectionProps> = ({
  onOpenGold,
  onOpenInsurance,
  onOpenMutualFunds,
  onOpenRewards,
  onOpenReferral,
  goldPricePerGram = 7485,
}) => {
  return (
    <div className="space-y-3">
      {/* Insurance & Investments Quick Cards */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Insurance & Wealth
          </h2>
          <span className="text-[11px] text-slate-400 font-medium">Certified & Safe</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* 24K Digital Gold */}
          <div
            onClick={onOpenGold}
            className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/60 dark:from-amber-950/30 dark:to-amber-900/20 border border-amber-200/70 dark:border-amber-800/40 cursor-pointer hover:shadow-xs transition-all group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                <Coins className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-900/60 px-1.5 py-0.5 rounded">
                24K 99.9%
              </span>
            </div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Digital Gold</div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 flex items-center gap-1">
              <span>₹{goldPricePerGram.toLocaleString('en-IN')}/gm</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">+0.8%</span>
            </div>
          </div>

          {/* Insurance Hub */}
          <div
            onClick={onOpenInsurance}
            className="p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/60 dark:from-indigo-950/30 dark:to-indigo-900/20 border border-indigo-200/70 dark:border-indigo-800/40 cursor-pointer hover:shadow-xs transition-all group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-200/60 dark:bg-indigo-900/60 px-1.5 py-0.5 rounded">
                Instant Policy
              </span>
            </div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Insurance</div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
              Bike, Car, Health & Term
            </div>
          </div>
        </div>

        {/* Mutual Funds strip */}
        <div
          onClick={onOpenMutualFunds}
          className="mt-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#5f259f]/10 text-[#5f259f] dark:text-[#c084fc] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Top Performing Mutual Funds & SIPs
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                Start investing from ₹100/month with zero commission
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        </div>
      </section>

      {/* Rewards & Referral Section */}
      <section className="grid grid-cols-2 gap-2.5">
        <div
          onClick={onOpenRewards}
          className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-3 cursor-pointer hover:border-amber-400/50 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-white">
              <span>Rewards</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              2 Unclaimed Cards
            </div>
          </div>
        </div>

        <div
          onClick={onOpenReferral}
          className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-3 cursor-pointer hover:border-indigo-400/50 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-[#5f259f] text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Refer & Earn</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              Get ₹100 Cashback
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { Coins, TrendingUp, ShieldCheck, ArrowRight, Sparkles, Plus, Check } from 'lucide-react';

interface WealthTabProps {
  currentGoldGrams: number;
  goldPricePerGram?: number;
  onBuyGold: (amount: number, grams: number) => void;
  onStartSip: (fundName: string, amount: number) => void;
}

export const WealthTab: React.FC<WealthTabProps> = ({
  currentGoldGrams,
  goldPricePerGram = 7485,
  onBuyGold,
  onStartSip,
}) => {
  const [buyMode, setBuyMode] = useState<'rupees' | 'grams'>('rupees');
  const [amountInput, setAmountInput] = useState<string>('500');

  const goldValue = currentGoldGrams * goldPricePerGram;

  const calculatedGrams =
    buyMode === 'rupees'
      ? (parseFloat(amountInput) || 0) / goldPricePerGram
      : parseFloat(amountInput) || 0;

  const calculatedCost =
    buyMode === 'rupees'
      ? parseFloat(amountInput) || 0
      : (parseFloat(amountInput) || 0) * goldPricePerGram;

  const handleExecuteBuyGold = () => {
    if (calculatedCost <= 0) return;
    onBuyGold(calculatedCost, calculatedGrams);
  };

  const mutualFunds = [
    {
      name: 'Nippon India Small Cap Fund',
      category: 'Equity: Small Cap',
      return3y: '+28.4%',
      rating: '5 Star',
      minSip: 100,
    },
    {
      name: 'HDFC Index Nifty 50 Plan',
      category: 'Index Fund',
      return3y: '+18.2%',
      rating: '5 Star',
      minSip: 500,
    },
    {
      name: 'Parag Parikh Flexi Cap Fund',
      category: 'Equity: Flexi Cap',
      return3y: '+22.6%',
      rating: '5 Star',
      minSip: 1000,
    },
  ];

  return (
    <div className="space-y-3.5 pb-20">
      {/* 24K Gold Banner */}
      <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 bg-slate-900 relative">
        <img
          src="/src/assets/images/phonepe_gold_wealth_1794048618762.jpg"
          alt="24K Digital Gold"
          referrerPolicy="no-referrer"
          className="w-full aspect-[16/8] sm:aspect-[16/7] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
          <p className="text-white text-xs sm:text-sm font-bold">
            24K 99.99% Pure Physical Gold
          </p>
          <p className="text-white/80 text-[11px]">
            Stored safely in MMTC-PAMP BRINK'S bank-grade insured vaults
          </p>
        </div>
      </div>

      {/* User's Gold Locker & Live Price Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">
              My Gold Locker
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                {currentGoldGrams.toFixed(3)} gm
              </span>
              <span className="text-xs font-semibold text-slate-500 tabular-nums">
                ≈ ₹{goldValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-medium">Live Gold Rate</span>
            <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
              ₹{goldPricePerGram.toLocaleString('en-IN')}/gm
            </span>
            <span className="text-[10px] text-emerald-600 block font-semibold">+0.8% Today</span>
          </div>
        </div>

        {/* Buy Gold Input */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Buy 24K Gold</span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
              <button
                onClick={() => {
                  setBuyMode('rupees');
                  setAmountInput('500');
                }}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  buyMode === 'rupees'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                In Rupees (₹)
              </button>
              <button
                onClick={() => {
                  setBuyMode('grams');
                  setAmountInput('0.1');
                }}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  buyMode === 'grams'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                In Grams (gm)
              </button>
            </div>
          </div>

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
              {buyMode === 'rupees' ? '₹' : 'gm'}
            </span>
            <input
              type="number"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              className="w-full pl-9 pr-24 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-sm tabular-nums focus:outline-none focus:border-amber-500"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-500 tabular-nums">
              {buyMode === 'rupees'
                ? `≈ ${calculatedGrams.toFixed(4)} gm`
                : `≈ ₹${calculatedCost.toLocaleString('en-IN')}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {[100, 500, 1000, 2000].map((val) => (
              <button
                key={val}
                onClick={() => {
                  setBuyMode('rupees');
                  setAmountInput(val.toString());
                }}
                className="flex-1 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950 text-slate-700 dark:text-slate-300"
              >
                ₹{val}
              </button>
            ))}
          </div>

          <button
            onClick={handleExecuteBuyGold}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-98 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all"
          >
            <span>Proceed to Buy 24K Gold (₹{calculatedCost.toFixed(0)})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top Performing Mutual Funds Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Top Mutual Funds SIP
          </h2>
          <span className="text-[11px] text-emerald-600 font-semibold">Zero Commission</span>
        </div>

        <div className="space-y-2.5">
          {mutualFunds.map((fund) => (
            <div
              key={fund.name}
              className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between gap-3"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{fund.name}</p>
                <p className="text-[10px] text-slate-500">
                  {fund.category} · Min SIP ₹{fund.minSip}/mo
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {fund.return3y}
                </span>
                <span className="text-[9px] text-slate-400 block">3Y Annualised</span>
                <button
                  onClick={() => onStartSip(fund.name, fund.minSip)}
                  className="mt-1 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-[#5f259f] text-white hover:bg-[#521f8b]"
                >
                  Invest
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

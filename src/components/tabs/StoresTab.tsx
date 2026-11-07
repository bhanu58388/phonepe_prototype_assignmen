import React, { useState } from 'react';
import { Search, MapPin, Star, QrCode, ArrowRight, ShoppingBag, Coffee, Pill, Fuel, Store } from 'lucide-react';
import { NEARBY_MERCHANTS } from '../../data/mockData';
import { Merchant } from '../../types/phonepe';

interface StoresTabProps {
  onPayMerchant: (merchant: Merchant) => void;
  onOpenScanner: () => void;
}

export const StoresTab: React.FC<StoresTabProps> = ({ onPayMerchant, onOpenScanner }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Stores' },
    { id: 'tea', label: 'Tea & Snacks' },
    { id: 'grocery', label: 'Groceries' },
    { id: 'pharmacy', label: 'Pharmacy' },
    { id: 'fuel', label: 'Fuel' },
    { id: 'food', label: 'Restaurants' },
  ];

  const filtered = NEARBY_MERCHANTS.filter((m) => {
    const matchCat =
      selectedCategory === 'all' ||
      (selectedCategory === 'tea' && m.category.includes('Tea')) ||
      (selectedCategory === 'grocery' && m.category.includes('Groceries')) ||
      (selectedCategory === 'pharmacy' && m.category.includes('Medical')) ||
      (selectedCategory === 'fuel' && m.category.includes('Fuel')) ||
      (selectedCategory === 'food' && m.category.includes('Cuisine'));

    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.address.toLowerCase().includes(search.toLowerCase());

    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-3.5 pb-20">
      {/* Search & Location Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-[#5f259f] shrink-0" />
            <span>Stores around Indiranagar (within 2 km)</span>
          </div>
          <button
            onClick={onOpenScanner}
            className="flex items-center gap-1 text-[11px] font-bold text-[#5f259f] dark:text-[#a855f7] hover:underline"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Scan QR</span>
          </button>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search stores, restaurants, groceries near you"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#5f259f]"
          />
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-[#5f259f] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stores List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Nearby Merchants Accepting PhonePe ({filtered.length})
        </h2>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.map((merchant) => (
            <div
              key={merchant.id}
              className="py-3 flex items-center justify-between gap-3 -mx-2 px-2 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-11 h-11 rounded-2xl ${merchant.avatarBg} text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0`}
                >
                  <Store className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {merchant.name}
                    </p>
                    <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.2 rounded shrink-0">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      <span>{merchant.rating}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    {merchant.category} · {merchant.address}
                  </p>
                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                    {merchant.distance} away · PhonePe QR Accepted
                  </span>
                </div>
              </div>

              <button
                onClick={() => onPayMerchant(merchant)}
                className="px-3.5 py-1.5 rounded-xl bg-[#5f259f] hover:bg-[#521f8b] active:scale-95 text-white font-bold text-xs shrink-0 transition-transform shadow-xs"
              >
                Pay Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Search, ArrowUpRight, ArrowDownLeft, Filter, Calendar, RotateCcw, Download } from 'lucide-react';
import { Transaction } from '../../types/phonepe';

interface HistoryTabProps {
  transactions: Transaction[];
  onSelectTransaction: (txn: Transaction) => void;
  onRepeatPayment: (txn: Transaction) => void;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({
  transactions,
  onSelectTransaction,
  onRepeatPayment,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'debit' | 'credit' | 'bill'>('all');
  const [search, setSearch] = useState('');

  const filtered = transactions.filter((t) => {
    const matchFilter =
      filterType === 'all' ||
      (filterType === 'debit' && t.type === 'debit') ||
      (filterType === 'credit' && t.type === 'credit') ||
      (filterType === 'bill' && (t.category === 'bill' || t.category === 'recharge'));

    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      t.upiRefId.includes(search) ||
      (t.note && t.note.toLowerCase().includes(search.toLowerCase()));

    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-3.5 pb-20">
      {/* Search & Filter Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Transaction History</h2>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, UPI ID, or UTR number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#5f259f]"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All' },
            { id: 'debit', label: 'Paid (-)' },
            { id: 'credit', label: 'Received (+)' },
            { id: 'bill', label: 'Bills & Recharges' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as typeof filterType)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === tab.id
                  ? 'bg-[#5f259f] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Transactions ({filtered.length})
          </span>
          <span className="text-[11px] text-slate-400">Statement</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p className="text-sm font-semibold">No transactions found</p>
            <p className="text-xs mt-1">Try adjusting your filters or search keywords</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((txn) => {
              const isCredit = txn.type === 'credit';
              return (
                <div
                  key={txn.id}
                  onClick={() => onSelectTransaction(txn)}
                  className="py-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/50 -mx-2 px-2 rounded-xl transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-xs ${
                        txn.avatarBg || (isCredit ? 'bg-emerald-600' : 'bg-slate-700')
                      }`}
                    >
                      {isCredit ? (
                        <ArrowDownLeft className="w-5 h-5 text-emerald-100 stroke-[2.5]" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-slate-100 stroke-[2.5]" />
                      )}
                    </div>

                    <div className="truncate">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        {txn.title}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {txn.date} · {txn.bankAccount}
                      </p>
                      {txn.note && (
                        <p className="text-[10px] text-slate-400 italic truncate mt-0.5">
                          "{txn.note}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p
                      className={`text-xs sm:text-sm font-extrabold tabular-nums ${
                        isCredit
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {isCredit ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                    </p>

                    <div className="flex items-center justify-end gap-1.5 mt-0.5">
                      {!isCredit && txn.category === 'upi' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRepeatPayment(txn);
                          }}
                          className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#5f259f] dark:text-[#a855f7] hover:underline"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                          <span>Repeat</span>
                        </button>
                      )}
                      <span className="text-[10px] text-slate-400">Success</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

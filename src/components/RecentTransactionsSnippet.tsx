import React from 'react';
import { ArrowUpRight, ArrowDownLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Transaction } from '../types/phonepe';

interface RecentTransactionsSnippetProps {
  transactions: Transaction[];
  onViewAll: () => void;
  onSelectTransaction: (txn: Transaction) => void;
  onRepeatPayment: (txn: Transaction) => void;
}

export const RecentTransactionsSnippet: React.FC<RecentTransactionsSnippetProps> = ({
  transactions,
  onViewAll,
  onSelectTransaction,
  onRepeatPayment,
}) => {
  const recentItems = transactions.slice(0, 4);

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Recent Activity
        </h2>
        <button
          onClick={onViewAll}
          className="flex items-center gap-0.5 text-xs font-semibold text-[#5f259f] dark:text-[#a855f7] hover:underline"
        >
          <span>View History</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
        {recentItems.map((txn) => {
          const isCredit = txn.type === 'credit';
          return (
            <div
              key={txn.id}
              onClick={() => onSelectTransaction(txn)}
              className="py-2.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/50 -mx-2 px-2 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0 ${
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
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {txn.title}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {txn.date} · {txn.bankAccount}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p
                  className={`text-xs sm:text-sm font-bold tabular-nums ${
                    isCredit ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {isCredit ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                </p>

                {!isCredit && txn.category === 'upi' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRepeatPayment(txn);
                    }}
                    className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#5f259f] dark:text-[#a855f7] hover:underline mt-0.5"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Repeat</span>
                  </button>
                ) : (
                  <span className="text-[10px] text-slate-400">Completed</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

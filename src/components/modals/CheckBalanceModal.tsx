import React, { useState } from 'react';
import { X, Landmark, Wallet, Zap, ChevronRight, Check, Loader2, ArrowRight } from 'lucide-react';
import { BankAccount } from '../../types/phonepe';

interface CheckBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  bankAccounts: BankAccount[];
  walletBalance: number;
  upiLiteBalance: number;
  onRequirePin: (accountName: string, onPinEntered: () => void) => void;
}

export const CheckBalanceModal: React.FC<CheckBalanceModalProps> = ({
  isOpen,
  onClose,
  bankAccounts,
  walletBalance,
  upiLiteBalance,
  onRequirePin,
}) => {
  const [revealedBanks, setRevealedBanks] = useState<{ [id: string]: boolean }>({});
  const [loadingBankId, setLoadingBankId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCheckBank = (bank: BankAccount) => {
    onRequirePin(`${bank.bankName} •••• ${bank.last4Digits}`, () => {
      setLoadingBankId(bank.id);
      setTimeout(() => {
        setLoadingBankId(null);
        setRevealedBanks((prev) => ({ ...prev, [bank.id]: true }));
      }, 700);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors">
        {/* Header */}
        <div className="px-5 py-4 bg-[#5f259f] text-white flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold">Check Bank Balance</h2>
            <p className="text-[11px] text-white/80">Fetch real-time balance via UPI</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bank List */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Linked Bank Accounts
            </h3>
            <div className="space-y-2.5">
              {bankAccounts.map((bank) => {
                const isRevealed = revealedBanks[bank.id];
                const isLoading = loadingBankId === bank.id;

                return (
                  <div
                    key={bank.id}
                    className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${bank.logoBg} text-white flex items-center justify-center font-bold text-sm shadow-xs`}
                      >
                        <Landmark className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          {bank.bankName}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {bank.accountType} A/C · •••• {bank.last4Digits}
                        </p>
                      </div>
                    </div>

                    <div>
                      {isLoading ? (
                        <div className="flex items-center gap-1.5 text-xs text-[#5f259f] font-semibold">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Fetching...</span>
                        </div>
                      ) : isRevealed ? (
                        <div className="text-right">
                          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                            ₹{bank.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </p>
                          <span className="text-[10px] text-slate-400">Available</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleCheckBank(bank)}
                          className="px-3 py-1.5 rounded-xl bg-[#5f259f] hover:bg-[#521f8b] active:scale-95 text-white font-semibold text-xs transition-transform"
                        >
                          Check
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prepaid Wallets */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Wallets & Lite
            </h3>
            <div className="space-y-2.5">
              {/* PhonePe Wallet */}
              <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#5f259f] text-white flex items-center justify-center">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      PhonePe Wallet
                    </p>
                    <p className="text-[11px] text-slate-500">Prepaid Balance</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                    ₹{walletBalance.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-emerald-600 font-semibold">Ready to Use</span>
                </div>
              </div>

              {/* UPI Lite */}
              <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      PhonePe UPI Lite
                    </p>
                    <p className="text-[11px] text-slate-500">PIN-less Wallet</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                    ₹{upiLiteBalance.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-emerald-600 font-semibold">No PIN needed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

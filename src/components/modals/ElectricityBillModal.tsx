import React, { useState } from 'react';
import { X, Zap, Check, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface ElectricityBillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPayBill: (billDetails: {
    billerName: string;
    consumerId: string;
    amount: number;
    dueDate: string;
  }) => void;
}

export const ElectricityBillModal: React.FC<ElectricityBillModalProps> = ({
  isOpen,
  onClose,
  onPayBill,
}) => {
  const [biller, setBiller] = useState('Bangalore Electricity Supply (BESCOM)');
  const [consumerId, setConsumerId] = useState('0842019942');
  const [fetchedBill, setFetchedBill] = useState<{
    amount: number;
    customerName: string;
    dueDate: string;
    billNumber: string;
  } | null>({
    amount: 1840,
    customerName: 'Karthik M G',
    dueDate: '15 Nov 2026',
    billNumber: 'BSC-2026-88190',
  });

  if (!isOpen) return null;

  const billers = [
    'Bangalore Electricity Supply (BESCOM)',
    'Tata Power - Mumbai',
    'Adani Electricity Mumbai Ltd',
    'MSEDCL (Maharashtra State Electricity)',
    'BSES Rajdhani - Delhi',
  ];

  const handlePay = () => {
    if (!fetchedBill) return;
    onPayBill({
      billerName: biller,
      consumerId,
      amount: fetchedBill.amount,
      dueDate: fetchedBill.dueDate,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors">
        {/* Header */}
        <div className="px-5 py-4 bg-[#5f259f] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-300" />
            <h2 className="text-base font-bold">Electricity Bill Payment</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Electricity Provider */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Electricity Board
            </label>
            <select
              value={biller}
              onChange={(e) => setBiller(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#5f259f]"
            >
              {billers.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Consumer Account Number */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Consumer Account ID
            </label>
            <input
              type="text"
              value={consumerId}
              onChange={(e) => setConsumerId(e.target.value)}
              placeholder="e.g. 0842019942"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono font-semibold focus:outline-none focus:border-[#5f259f]"
            />
          </div>

          {/* Fetched Bill Details */}
          {fetchedBill && (
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-800 dark:text-amber-300 font-bold uppercase tracking-wider">
                  Bill Amount Due
                </span>
                <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums">
                  ₹{fetchedBill.amount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 pt-1 border-t border-amber-200/60 dark:border-amber-900/40">
                <div className="flex justify-between">
                  <span>Consumer Name:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {fetchedBill.customerName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Due Date:</span>
                  <span className="font-semibold text-rose-600 dark:text-rose-400">
                    {fetchedBill.dueDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Bill Reference:</span>
                  <span className="font-mono">{fetchedBill.billNumber}</span>
                </div>
              </div>
            </div>
          )}

          {/* Trust guarantee */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Instant confirmation & official receipt via Bharat BillPay (BBPS)</span>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <button
              onClick={handlePay}
              className="w-full h-12 rounded-xl bg-[#5f259f] hover:bg-[#521f8b] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#5f259f]/25 transition-all"
            >
              <span>Pay ₹{fetchedBill?.amount} via UPI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

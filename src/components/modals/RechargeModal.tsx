import React, { useState } from 'react';
import { X, Smartphone, Check, Sparkles, ArrowRight } from 'lucide-react';
import { RECHARGE_PLANS } from '../../data/mockData';
import { RechargePlan } from '../../types/phonepe';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToPayPlan: (plan: RechargePlan, phoneNumber: string) => void;
}

export const RechargeModal: React.FC<RechargeModalProps> = ({
  isOpen,
  onClose,
  onProceedToPayPlan,
}) => {
  const [operator, setOperator] = useState<'Jio' | 'Airtel' | 'Vi'>('Jio');
  const [phone, setPhone] = useState('98450 12345');
  const [selectedPlan, setSelectedPlan] = useState<RechargePlan>(RECHARGE_PLANS[0]);

  if (!isOpen) return null;

  const filteredPlans = RECHARGE_PLANS.filter((p) => p.operator === operator);

  const handleRecharge = () => {
    if (!phone || phone.length < 10) return;
    onProceedToPayPlan(selectedPlan, phone);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors">
        {/* Header */}
        <div className="px-5 py-4 bg-[#5f259f] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            <h2 className="text-base font-bold">Mobile Recharge</h2>
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
          {/* Mobile Number Input */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Mobile Number
            </label>
            <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">+91</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter 10 digit number"
                className="flex-1 text-sm font-semibold bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Operator Switcher */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Select Operator
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Jio', 'Airtel', 'Vi'] as const).map((op) => (
                <button
                  key={op}
                  onClick={() => {
                    setOperator(op);
                    const matching = RECHARGE_PLANS.find((p) => p.operator === op);
                    if (matching) setSelectedPlan(matching);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    operator === op
                      ? 'border-[#5f259f] bg-purple-50 dark:bg-purple-950/40 text-[#5f259f] dark:text-[#c084fc] shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>

          {/* Plans List */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Recommended Plans
            </label>

            <div className="space-y-2.5">
              {filteredPlans.map((plan) => {
                const isSelected = selectedPlan.id === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#5f259f] bg-purple-50/70 dark:bg-purple-950/30 ring-1 ring-[#5f259f]'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-black text-slate-900 dark:text-white tabular-nums">
                            ₹{plan.price}
                          </span>
                          {plan.tag && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                              {plan.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-1">
                          {plan.data} · {plan.calls} · {plan.validity}
                        </p>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-[#5f259f] bg-[#5f259f] text-white'
                            : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-500 mt-1.5 line-clamp-1">
                      {plan.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pay CTA */}
          <div className="pt-2">
            <button
              onClick={handleRecharge}
              className="w-full h-12 rounded-xl bg-[#5f259f] hover:bg-[#521f8b] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#5f259f]/25 transition-all"
            >
              <span>Pay ₹{selectedPlan.price} & Recharge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

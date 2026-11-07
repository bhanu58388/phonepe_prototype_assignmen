import React, { useState } from 'react';
import { ShieldCheck, HeartPulse, Bike, Car, UserCheck, CheckCircle2, ArrowRight, Shield } from 'lucide-react';

interface InsuranceTabProps {
  onBuyInsurance: (policy: { type: string; premium: number; coverage: string }) => void;
}

export const InsuranceTab: React.FC<InsuranceTabProps> = ({ onBuyInsurance }) => {
  const [selectedPlan, setSelectedPlan] = useState<'bike' | 'car' | 'health' | 'life'>('bike');

  const plans = {
    bike: {
      title: 'Two Wheeler (Bike) Insurance',
      icon: Bike,
      premium: 457,
      coverage: 'Comprehensive Damage + Third Party',
      features: ['Instant Policy without Inspection', 'Cashless Repairs in 5,000+ Garages', 'Zero Paperwork in 2 Mins'],
    },
    car: {
      title: 'Four Wheeler (Car) Insurance',
      icon: Car,
      premium: 2094,
      coverage: 'Zero Depreciation + Roadside Assist',
      features: ['Zero Dep Cover included', '24x7 Roadside Breakdown Support', 'Up to 50% No Claim Bonus'],
    },
    health: {
      title: 'Family Health Insurance',
      icon: HeartPulse,
      premium: 650,
      coverage: '₹1 Crore Sum Insured Protection',
      features: ['Cashless Treatment in 10,000+ Hospitals', 'No Pre-Medical Tests for under 45', 'Tax Benefits under Sec 80D'],
    },
    life: {
      title: 'Term Life Insurance',
      icon: UserCheck,
      premium: 490,
      coverage: '₹50 Lakhs Family Financial Security',
      features: ['100% Payout on Terminal Illness', 'Fixed Premium throughout Tenure', 'Immediate nominee security'],
    },
  };

  const active = plans[selectedPlan];

  return (
    <div className="space-y-3.5 pb-20">
      {/* Visual Insurance Banner */}
      <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 bg-slate-900 relative">
        <img
          src="/src/assets/images/phonepe_insurance_banner_1794048618402.jpg"
          alt="PhonePe Insurance"
          referrerPolicy="no-referrer"
          className="w-full aspect-[16/8] sm:aspect-[16/7] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
          <p className="text-white text-xs sm:text-sm font-bold">
            India's Most Trusted Insurance Platform
          </p>
          <p className="text-white/80 text-[11px]">
            Over 3 Crore+ policies issued with 98.4% claim settlement ratio
          </p>
        </div>
      </div>

      {/* Plan Category Switcher */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          Select Protection Type
        </h2>

        <div className="grid grid-cols-4 gap-2">
          {(['bike', 'car', 'health', 'life'] as const).map((key) => {
            const item = plans[key];
            const Icon = item.icon;
            const isSelected = selectedPlan === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedPlan(key)}
                className={`p-2.5 rounded-xl flex flex-col items-center text-center transition-all border ${
                  isSelected
                    ? 'border-[#5f259f] bg-purple-50 dark:bg-purple-950/40 text-[#5f259f] dark:text-[#c084fc] shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-5 h-5 mb-1 stroke-[2.2]" />
                <span className="text-[11px] font-bold capitalize">{key}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Plan Details */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {active.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{active.coverage}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 block">Starting at</span>
            <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums">
              ₹{active.premium}
            </span>
            <span className="text-[10px] text-slate-400 block">/ year</span>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {active.features.map((feat, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button
            onClick={() =>
              onBuyInsurance({
                type: active.title,
                premium: active.premium,
                coverage: active.coverage,
              })
            }
            className="w-full h-12 rounded-xl bg-[#5f259f] hover:bg-[#521f8b] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#5f259f]/25 transition-all"
          >
            <span>Get Instant Policy (₹{active.premium})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  Smartphone,
  Tv,
  Zap,
  CreditCard,
  Home,
  Car,
  Flame,
  LayoutGrid,
} from 'lucide-react';

interface RechargeBillsSectionProps {
  onOpenMobileRecharge: () => void;
  onOpenElectricity: () => void;
  onOpenDth: () => void;
  onOpenCreditCard: () => void;
  onOpenFastag: () => void;
  onOpenRent: () => void;
  onOpenGas: () => void;
  onOpenSeeAll: () => void;
}

export const RechargeBillsSection: React.FC<RechargeBillsSectionProps> = ({
  onOpenMobileRecharge,
  onOpenElectricity,
  onOpenDth,
  onOpenCreditCard,
  onOpenFastag,
  onOpenRent,
  onOpenGas,
  onOpenSeeAll,
}) => {
  const items = [
    {
      id: 'recharge',
      label: 'Mobile Recharge',
      icon: Smartphone,
      onClick: onOpenMobileRecharge,
      badge: 'Popular',
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40',
    },
    {
      id: 'dth',
      label: 'DTH',
      icon: Tv,
      onClick: onOpenDth,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40',
    },
    {
      id: 'electricity',
      label: 'Electricity',
      icon: Zap,
      onClick: onOpenElectricity,
      badge: 'Due',
      badgeColor: 'bg-amber-100 text-amber-800',
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40',
    },
    {
      id: 'credit-card',
      label: 'Credit Card Bill',
      icon: CreditCard,
      onClick: onOpenCreditCard,
      color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40',
    },
    {
      id: 'rent',
      label: 'Rent Payment',
      icon: Home,
      onClick: onOpenRent,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40',
    },
    {
      id: 'fastag',
      label: 'FASTag Recharge',
      icon: Car,
      onClick: onOpenFastag,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      id: 'gas',
      label: 'Book Cylinder',
      icon: Flame,
      onClick: onOpenGas,
      color: 'text-orange-600 bg-orange-50 dark:bg-orange-950/40',
    },
    {
      id: 'all',
      label: 'See All',
      icon: LayoutGrid,
      onClick: onOpenSeeAll,
      color: 'text-[#5f259f] bg-purple-50 dark:bg-purple-950/40',
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Recharge & Pay Bills
        </h2>
        <button
          onClick={onOpenSeeAll}
          className="text-[11px] font-semibold text-[#5f259f] dark:text-[#a855f7] hover:underline"
        >
          My Bills (1)
        </button>
      </div>

      <div className="grid grid-cols-4 gap-y-3.5 gap-x-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className="flex flex-col items-center text-center group relative focus:outline-none"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center group-hover:scale-105 group-active:scale-95 transition-all shadow-xs`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>

              {item.badge && (
                <span
                  className={`absolute -top-1.5 right-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                    item.badgeColor || 'bg-rose-500 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              <span className="text-[11px] font-medium text-slate-800 dark:text-slate-200 mt-1.5 leading-tight line-clamp-2 px-0.5">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

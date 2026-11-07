import React from 'react';
import { Home, Store, ShieldCheck, TrendingUp, History } from 'lucide-react';

export type TabType = 'home' | 'stores' | 'insurance' | 'wealth' | 'history';

interface BottomNavBarProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  unseenHistoryCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onChangeTab,
  unseenHistoryCount = 0,
}) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'stores' as TabType, label: 'Stores', icon: Store },
    { id: 'insurance' as TabType, label: 'Insurance', icon: ShieldCheck },
    { id: 'wealth' as TabType, label: 'Wealth', icon: TrendingUp },
    { id: 'history' as TabType, label: 'History', icon: History },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-all relative ${
                isActive
                  ? 'text-[#5f259f] dark:text-[#c084fc] font-bold'
                  : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'scale-100 stroke-[1.8]'
                  }`}
                />
                {tab.id === 'history' && unseenHistoryCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 leading-none">
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-[#5f259f] dark:bg-[#c084fc] mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

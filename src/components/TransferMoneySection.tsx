import React from 'react';
import { Smartphone, Building2, ArrowLeftRight, Landmark, QrCode, Copy, Check } from 'lucide-react';

interface TransferMoneySectionProps {
  upiId: string;
  onSendToContact: () => void;
  onSendToBank: () => void;
  onSendToSelf: () => void;
  onCheckBalance: () => void;
  onOpenMyQr: () => void;
}

export const TransferMoneySection: React.FC<TransferMoneySectionProps> = ({
  upiId,
  onSendToContact,
  onSendToBank,
  onSendToSelf,
  onCheckBalance,
  onOpenMyQr,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const actionButtons = [
    {
      id: 'mobile',
      label: 'To Mobile Number',
      icon: Smartphone,
      onClick: onSendToContact,
    },
    {
      id: 'bank',
      label: 'To Bank / UPI ID',
      icon: Building2,
      onClick: onSendToBank,
    },
    {
      id: 'self',
      label: 'To Self Account',
      icon: ArrowLeftRight,
      onClick: onSendToSelf,
    },
    {
      id: 'balance',
      label: 'Check Balance',
      icon: Landmark,
      onClick: onCheckBalance,
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Transfer Money
        </h2>
        <button
          onClick={onOpenMyQr}
          className="flex items-center gap-1 text-[11px] font-semibold text-[#5f259f] dark:text-[#a855f7] hover:underline"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>My QR</span>
        </button>
      </div>

      {/* 4 Iconic Transfer Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {actionButtons.map((btn) => {
          const Icon = btn.icon;
          return (
            <button
              key={btn.id}
              onClick={btn.onClick}
              className="flex flex-col items-center text-center group focus:outline-none"
            >
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-b from-[#6b2aa8] to-[#551d8f] text-white flex items-center justify-center shadow-md shadow-[#5f259f]/20 group-hover:scale-105 group-active:scale-95 transition-all">
                <Icon className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-slate-800 dark:text-slate-200 mt-2 leading-tight line-clamp-2 px-0.5">
                {btn.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* UPI ID Bar */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl px-3 py-2">
        <div className="flex items-center gap-2 truncate">
          <span className="font-semibold text-slate-800 dark:text-slate-200 shrink-0">UPI ID:</span>
          <span className="font-mono text-[11px] text-[#5f259f] dark:text-[#c084fc] font-medium truncate">
            {upiId}
          </span>
        </div>
        <button
          onClick={handleCopyUpi}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-[#5f259f] shrink-0 ml-2"
          title="Copy UPI ID"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600 text-[10px]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};

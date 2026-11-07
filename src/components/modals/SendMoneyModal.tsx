import React, { useState } from 'react';
import { X, Search, User, ShieldCheck, Check, ArrowRight, Wallet, Zap, Landmark } from 'lucide-react';
import { BankAccount, Contact } from '../../types/phonepe';

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: Contact[];
  bankAccounts: BankAccount[];
  walletBalance: number;
  upiLiteBalance: number;
  initialRecipient?: { name: string; upiId: string; phone?: string; avatarBg?: string; amount?: number } | null;
  onInitiatePayment: (paymentDetails: {
    recipientName: string;
    recipientUpiId: string;
    amount: number;
    note: string;
    selectedAccount: string;
    avatarBg: string;
  }) => void;
}

export const SendMoneyModal: React.FC<SendMoneyModalProps> = ({
  isOpen,
  onClose,
  contacts,
  bankAccounts,
  walletBalance,
  upiLiteBalance,
  initialRecipient,
  onInitiatePayment,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [manualRecipient, setManualRecipient] = useState<{ name: string; upiId: string; avatarBg?: string } | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [selectedAccount, setSelectedAccount] = useState<string>('State Bank of India •••• 4821');

  // Sync initial recipient if passed (e.g. from QR scan or recent transaction)
  React.useEffect(() => {
    if (initialRecipient) {
      setManualRecipient({
        name: initialRecipient.name,
        upiId: initialRecipient.upiId,
        avatarBg: initialRecipient.avatarBg,
      });
      setSelectedContact(null);
      if (initialRecipient.amount) {
        setAmount(initialRecipient.amount.toString());
      }
    } else {
      setManualRecipient(null);
      setSelectedContact(null);
      setAmount('');
      setNote('');
    }
  }, [initialRecipient, isOpen]);

  if (!isOpen) return null;

  const currentRecipient = manualRecipient || (selectedContact ? {
    name: selectedContact.name,
    upiId: selectedContact.upiId,
    avatarBg: selectedContact.avatarBg,
  } : null);

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.upiId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectContact = (c: Contact) => {
    setSelectedContact(c);
    setManualRecipient(null);
    if (c.recentAmount && !amount) {
      setAmount(c.recentAmount.toString());
    }
  };

  const handleAddManualUpi = () => {
    if (!searchQuery.trim()) return;
    const isPhone = /^[0-9+ ]{10,14}$/.test(searchQuery.trim());
    const cleanInput = searchQuery.trim();
    setManualRecipient({
      name: isPhone ? `Mobile (${cleanInput})` : cleanInput.split('@')[0],
      upiId: cleanInput.includes('@') ? cleanInput : `${cleanInput.replace(/\D/g, '')}@ybl`,
      avatarBg: 'bg-[#5f259f]',
    });
    setSelectedContact(null);
  };

  const presetAmounts = [100, 500, 1000, 2000];

  const handleProceed = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) return;
    if (!currentRecipient) return;

    onInitiatePayment({
      recipientName: currentRecipient.name,
      recipientUpiId: currentRecipient.upiId,
      amount: numAmount,
      note: note.trim() || 'Payment via PhonePe UPI',
      selectedAccount,
      avatarBg: currentRecipient.avatarBg || 'bg-[#5f259f]',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors">
        {/* Header */}
        <div className="px-5 py-4 bg-[#5f259f] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold">
              {currentRecipient ? 'Enter Amount' : 'To Mobile or UPI ID'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-5 overflow-y-auto space-y-4 text-slate-800 dark:text-slate-200">
          {!currentRecipient ? (
            <>
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter Name, Mobile Number or UPI ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddManualUpi()}
                  className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#5f259f] dark:focus:border-[#a855f7]"
                />
                {searchQuery.trim().length > 3 && (
                  <button
                    onClick={handleAddManualUpi}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-semibold bg-[#5f259f] text-white rounded-lg hover:bg-[#6f2dbd]"
                  >
                    Pay
                  </button>
                )}
              </div>

              {/* Recent Contacts */}
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Recent Contacts
                </p>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => handleSelectContact(contact)}
                      className="py-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 -mx-2 px-2 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full ${contact.avatarBg} text-white flex items-center justify-center font-bold text-sm shadow-xs`}
                        >
                          {contact.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                            {contact.name}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {contact.phone} · <span className="font-mono">{contact.upiId}</span>
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Selected Recipient Card */}
              <div className="flex items-center justify-between p-3.5 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-100 dark:border-purple-900/50">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-full ${
                      currentRecipient.avatarBg || 'bg-[#5f259f]'
                    } text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0`}
                  >
                    {currentRecipient.name.charAt(0)}
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {currentRecipient.name}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-mono truncate">
                      {currentRecipient.upiId}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Banking Name Verified</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedContact(null);
                    setManualRecipient(null);
                  }}
                  className="text-xs text-[#5f259f] dark:text-[#c084fc] font-semibold hover:underline shrink-0 ml-2"
                >
                  Change
                </button>
              </div>

              {/* Amount Input */}
              <div className="text-center py-2">
                <label className="text-xs text-slate-500 font-medium block mb-1">
                  ENTER AMOUNT (INR)
                </label>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-3xl font-bold text-slate-800 dark:text-white">₹</span>
                  <input
                    type="number"
                    autoFocus
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-48 text-4xl font-extrabold text-slate-900 dark:text-white text-center bg-transparent border-b-2 border-[#5f259f] focus:outline-none pb-1 tabular-nums"
                  />
                </div>

                {/* Preset Chips */}
                <div className="flex items-center justify-center gap-2 mt-3">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAmount(amt.toString())}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:text-[#5f259f] text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      +₹{amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Note Input */}
              <div>
                <input
                  type="text"
                  placeholder="Add a message or note (e.g. Dinner split, Rent)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#5f259f]"
                />
              </div>

              {/* Debited Bank Account Picker */}
              <div className="pt-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                  Pay Using
                </label>

                <div className="space-y-2">
                  {bankAccounts.map((bank) => (
                    <label
                      key={bank.id}
                      onClick={() => setSelectedAccount(`${bank.bankName} •••• ${bank.last4Digits}`)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedAccount.includes(bank.last4Digits)
                          ? 'border-[#5f259f] bg-purple-50/60 dark:bg-purple-950/30'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg ${bank.logoBg} text-white flex items-center justify-center font-bold text-xs`}
                        >
                          <Landmark className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            {bank.bankName} •••• {bank.last4Digits}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {bank.accountType} A/C · A/C Balance: ₹{bank.balance.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedAccount.includes(bank.last4Digits)
                            ? 'border-[#5f259f] bg-[#5f259f] text-white'
                            : 'border-slate-400'
                        }`}
                      >
                        {selectedAccount.includes(bank.last4Digits) && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </label>
                  ))}

                  {/* UPI Lite Option */}
                  <label
                    onClick={() => setSelectedAccount('PhonePe UPI Lite')}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedAccount === 'PhonePe UPI Lite'
                        ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          PhonePe UPI Lite
                        </p>
                        <p className="text-[11px] text-emerald-600 font-medium">
                          No UPI PIN needed · Balance: ₹{upiLiteBalance}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedAccount === 'PhonePe UPI Lite'
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-slate-400'
                      }`}
                    >
                      {selectedAccount === 'PhonePe UPI Lite' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </label>

                  {/* PhonePe Wallet Option */}
                  <label
                    onClick={() => setSelectedAccount('PhonePe Wallet')}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedAccount === 'PhonePe Wallet'
                        ? 'border-[#5f259f] bg-purple-50/60 dark:bg-purple-950/30'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#5f259f] text-white flex items-center justify-center">
                        <Wallet className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          PhonePe Wallet
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Available: ₹{walletBalance.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedAccount === 'PhonePe Wallet'
                          ? 'border-[#5f259f] bg-[#5f259f] text-white'
                          : 'border-slate-400'
                      }`}
                    >
                      {selectedAccount === 'PhonePe Wallet' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </label>
                </div>
              </div>

              {/* Proceed Button */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={!amount || parseFloat(amount) <= 0}
                  onClick={handleProceed}
                  className="w-full h-12 rounded-xl bg-[#5f259f] hover:bg-[#521f8b] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#5f259f]/25 transition-all"
                >
                  <span>PROCEED TO PAY ₹{amount || '0'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

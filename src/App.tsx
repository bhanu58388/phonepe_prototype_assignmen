import React, { useState, useEffect } from 'react';
import {
  INITIAL_USER,
  INITIAL_BANK_ACCOUNTS,
  INITIAL_CONTACTS,
  INITIAL_TRANSACTIONS,
  INITIAL_SCRATCH_CARDS,
  RECHARGE_PLANS,
  NEARBY_MERCHANTS,
} from './data/mockData';
import { BankAccount, Contact, Merchant, RechargePlan, ScratchCard, Transaction } from './types/phonepe';
import { TopHeader } from './components/TopHeader';
import { TransferMoneySection } from './components/TransferMoneySection';
import { WalletLiteBar } from './components/WalletLiteBar';
import { PromoCarousel } from './components/PromoCarousel';
import { RechargeBillsSection } from './components/RechargeBillsSection';
import { InsuranceWealthSection } from './components/InsuranceWealthSection';
import { RecentTransactionsSnippet } from './components/RecentTransactionsSnippet';
import { BottomNavBar, TabType } from './components/BottomNavBar';
import { SendMoneyModal } from './components/modals/SendMoneyModal';
import { UpiPinModal } from './components/modals/UpiPinModal';
import { PaymentSuccessModal } from './components/modals/PaymentSuccessModal';
import { ScratchCardModal } from './components/modals/ScratchCardModal';
import { QrScannerModal } from './components/modals/QrScannerModal';
import { MyQrModal } from './components/modals/MyQrModal';
import { CheckBalanceModal } from './components/modals/CheckBalanceModal';
import { RechargeModal } from './components/modals/RechargeModal';
import { ElectricityBillModal } from './components/modals/ElectricityBillModal';
import { ProfileDrawer } from './components/modals/ProfileDrawer';
import { StoresTab } from './components/tabs/StoresTab';
import { InsuranceTab } from './components/tabs/InsuranceTab';
import { WealthTab } from './components/tabs/WealthTab';
import { HistoryTab } from './components/tabs/HistoryTab';
import { PhonePeLogo } from './components/PhonePeLogo';
import { PhonePeWebsite } from './components/website/PhonePeWebsite';
import { Wifi, Signal, Battery, Smartphone, Globe, ArrowLeft } from 'lucide-react';

export default function App() {
  // Mode: 'website' (Official Web Portal) vs 'app' (Mobile Phone App Simulator)
  const [currentMode, setCurrentMode] = useState<'website' | 'app'>('website');

  // Application Data State
  const [user, setUser] = useState(INITIAL_USER);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(INITIAL_BANK_ACCOUNTS);
  const [contacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [scratchCards, setScratchCards] = useState<ScratchCard[]>(INITIAL_SCRATCH_CARDS);
  const [goldPrice, setGoldPrice] = useState(7485);

  // Active Navigation Tab inside App
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Preferences
  const [isSoundboxEnabled, setIsSoundboxEnabled] = useState(true);
  const [soundboxLanguage, setSoundboxLanguage] = useState<'hi' | 'en'>('hi');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFrameMode, setIsFrameMode] = useState(true);

  // Modals Visibility
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [sendModalRecipient, setSendModalRecipient] = useState<{
    name: string;
    upiId: string;
    avatarBg?: string;
    amount?: number;
  } | null>(null);

  const [isUpiPinModalOpen, setIsUpiPinModalOpen] = useState(false);
  const [pendingPinAction, setPendingPinAction] = useState<{
    title: string;
    amount?: number;
    bankName: string;
    onPinSuccess: () => void;
  } | null>(null);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successDetails, setSuccessDetails] = useState<{
    recipientName: string;
    recipientUpiId: string;
    amount: number;
    transactionId: string;
    upiRefId: string;
    timestamp: string;
    bankAccount: string;
    note?: string;
  } | null>(null);

  const [isScratchModalOpen, setIsScratchModalOpen] = useState(false);
  const [activeScratchCard, setActiveScratchCard] = useState<ScratchCard>(INITIAL_SCRATCH_CARDS[0]);

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isMyQrOpen, setIsMyQrOpen] = useState(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [isElectricityModalOpen, setIsElectricityModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle Payment Initiation from SendMoneyModal
  const handleInitiatePayment = (payment: {
    recipientName: string;
    recipientUpiId: string;
    amount: number;
    note: string;
    selectedAccount: string;
    avatarBg: string;
  }) => {
    setIsSendModalOpen(false);

    if (payment.selectedAccount === 'PhonePe UPI Lite') {
      finalizePayment(payment);
      return;
    }

    setPendingPinAction({
      title: `Paying ${payment.recipientName}`,
      amount: payment.amount,
      bankName: payment.selectedAccount,
      onPinSuccess: () => finalizePayment(payment),
    });
    setIsUpiPinModalOpen(true);
  };

  // Finalize payment transaction
  const finalizePayment = (payment: {
    recipientName: string;
    recipientUpiId: string;
    amount: number;
    note: string;
    selectedAccount: string;
    avatarBg: string;
  }) => {
    const txnId = `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const upiRef = `63${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const now = new Date();
    const timeString = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newTxn: Transaction = {
      id: txnId,
      title: `Paid to ${payment.recipientName}`,
      subtitle: `Debited from ${payment.selectedAccount}`,
      amount: payment.amount,
      type: 'debit',
      category: 'upi',
      date: timeString,
      timestamp: now.toISOString(),
      status: 'success',
      receiver: `${payment.recipientName} (${payment.recipientUpiId})`,
      upiRefId: upiRef,
      bankAccount: payment.selectedAccount,
      note: payment.note,
      avatarBg: payment.avatarBg,
    };

    if (payment.selectedAccount === 'PhonePe Wallet') {
      setUser((prev) => ({ ...prev, walletBalance: Math.max(0, prev.walletBalance - payment.amount) }));
    } else if (payment.selectedAccount === 'PhonePe UPI Lite') {
      setUser((prev) => ({ ...prev, upiLiteBalance: Math.max(0, prev.upiLiteBalance - payment.amount) }));
    } else {
      setBankAccounts((prev) =>
        prev.map((b) =>
          payment.selectedAccount.includes(b.last4Digits)
            ? { ...b, balance: Math.max(0, b.balance - payment.amount) }
            : b
        )
      );
    }

    setTransactions((prev) => [newTxn, ...prev]);

    const newScratch: ScratchCard = {
      id: `sc-${Date.now()}`,
      title: `Cashback for payment to ${payment.recipientName}`,
      brand: 'PhonePe Rewards',
      amountWon: Math.floor(15 + Math.random() * 40),
      code: `REWARD${Math.floor(1000 + Math.random() * 9000)}`,
      isScratched: false,
      description: 'Exclusive cashback on your successful UPI transfer',
    };
    setScratchCards((prev) => [newScratch, ...prev]);
    setActiveScratchCard(newScratch);

    setSuccessDetails({
      recipientName: payment.recipientName,
      recipientUpiId: payment.recipientUpiId,
      amount: payment.amount,
      transactionId: txnId,
      upiRefId: upiRef,
      timestamp: timeString,
      bankAccount: payment.selectedAccount,
      note: payment.note,
    });
    setIsSuccessModalOpen(true);
  };

  const handleClaimCashback = (cardId: string, amount: number) => {
    setScratchCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isScratched: true } : c))
    );
    setUser((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance + amount,
    }));

    const cbTxn: Transaction = {
      id: `CB-${Date.now().toString().slice(-8)}`,
      title: 'Cashback from PhonePe',
      subtitle: 'Credited to PhonePe Wallet',
      amount,
      type: 'credit',
      category: 'cashback',
      date: 'Just Now',
      timestamp: new Date().toISOString(),
      status: 'success',
      sender: 'PhonePe Rewards Bonanza',
      upiRefId: `63${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      bankAccount: 'PhonePe Wallet',
      note: 'Scratch Card Reward',
      avatarBg: 'bg-[#5f259f]',
    };
    setTransactions((prev) => [cbTxn, ...prev]);
  };

  const handleOpenSendWithRecipient = (recipient: {
    name: string;
    upiId: string;
    avatarBg?: string;
    amount?: number;
  }) => {
    setSendModalRecipient(recipient);
    setIsSendModalOpen(true);
  };

  const handleRepeatPayment = (txn: Transaction) => {
    handleOpenSendWithRecipient({
      name: txn.title.replace('Paid to ', ''),
      upiId: txn.receiver?.split('(')[1]?.replace(')', '') || 'merchant@ybl',
      avatarBg: txn.avatarBg,
      amount: txn.amount,
    });
  };

  const handleBannerAction = (action: string) => {
    if (action === 'transfer') {
      setSendModalRecipient(null);
      setIsSendModalOpen(true);
    } else if (action === 'travel') {
      setActiveTab('stores');
    } else if (action === 'gold') {
      setActiveTab('wealth');
    } else if (action === 'insurance') {
      setActiveTab('insurance');
    }
  };

  const handleMobileRechargePlan = (plan: RechargePlan, phoneNumber: string) => {
    setIsRechargeModalOpen(false);
    handleInitiatePayment({
      recipientName: `${plan.operator} Prepaid (${phoneNumber})`,
      recipientUpiId: `${plan.operator.toLowerCase()}recharge@billdesk`,
      amount: plan.price,
      note: `${plan.validity} · ${plan.data} Pack`,
      selectedAccount: 'State Bank of India •••• 4821',
      avatarBg: 'bg-indigo-600',
    });
  };

  const handleElectricityBillPay = (bill: {
    billerName: string;
    consumerId: string;
    amount: number;
    dueDate: string;
  }) => {
    setIsElectricityModalOpen(false);
    handleInitiatePayment({
      recipientName: bill.billerName,
      recipientUpiId: 'bescom.electricity@billdesk',
      amount: bill.amount,
      note: `Bill Account: ${bill.consumerId}`,
      selectedAccount: 'HDFC Bank •••• 9920',
      avatarBg: 'bg-amber-600',
    });
  };

  const handleBuyGold = (amount: number, grams: number) => {
    handleInitiatePayment({
      recipientName: `MMTC-PAMP 24K Gold (${grams.toFixed(3)} gm)`,
      recipientUpiId: 'mmtcpamp.gold@icici',
      amount,
      note: '24K 99.9% Pure Gold Vault Storage',
      selectedAccount: 'State Bank of India •••• 4821',
      avatarBg: 'bg-yellow-600',
    });
    setUser((prev) => ({
      ...prev,
      goldGrams: prev.goldGrams + grams,
    }));
  };

  const handleStartSip = (fundName: string, amount: number) => {
    handleInitiatePayment({
      recipientName: fundName,
      recipientUpiId: 'mf.sip@billdesk',
      amount,
      note: 'Monthly Mutual Fund SIP',
      selectedAccount: 'State Bank of India •••• 4821',
      avatarBg: 'bg-[#5f259f]',
    });
  };

  const handlePayMerchant = (merchant: Merchant) => {
    handleOpenSendWithRecipient({
      name: merchant.name,
      upiId: merchant.upiId,
      avatarBg: merchant.avatarBg,
    });
  };

  const handleScanResult = (merchant: {
    name: string;
    upiId: string;
    amount?: number;
    avatarBg: string;
  }) => {
    setIsScannerOpen(false);
    handleOpenSendWithRecipient(merchant);
  };

  const handleTopupWallet = () => {
    handleInitiatePayment({
      recipientName: 'PhonePe Wallet Top-up',
      recipientUpiId: 'wallet.topup@phonepe',
      amount: 500,
      note: 'Wallet Balance Top-up',
      selectedAccount: 'State Bank of India •••• 4821',
      avatarBg: 'bg-[#5f259f]',
    });
    setUser((prev) => ({ ...prev, walletBalance: prev.walletBalance + 500 }));
  };

  const handleManageUpiLite = () => {
    handleInitiatePayment({
      recipientName: 'Add Money to UPI Lite',
      recipientUpiId: 'upilite.topup@phonepe',
      amount: 200,
      note: 'PIN-less UPI Lite Wallet',
      selectedAccount: 'State Bank of India •••• 4821',
      avatarBg: 'bg-emerald-600',
    });
    setUser((prev) => ({ ...prev, upiLiteBalance: prev.upiLiteBalance + 200 }));
  };

  return (
    <div className="min-h-screen bg-[#ede9f6] dark:bg-slate-950 flex flex-col items-center justify-start transition-colors selection:bg-[#5f259f]/20 selection:text-[#5f259f]">
      {/* Floating Mode Switcher Bar */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900/90 text-white shadow-2xl backdrop-blur-md border border-slate-700">
        <button
          onClick={() => setCurrentMode('website')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            currentMode === 'website'
              ? 'bg-[#5f259f] text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Website</span>
        </button>

        <button
          onClick={() => setCurrentMode('app')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            currentMode === 'app'
              ? 'bg-[#5f259f] text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>App Simulator</span>
        </button>
      </div>

      {/* VIEW 1: OFFICIAL WEBSITE PORTAL */}
      {currentMode === 'website' ? (
        <PhonePeWebsite
          onLaunchAppSimulator={() => setCurrentMode('app')}
          goldPricePerGram={goldPrice}
          userWalletBalance={user.walletBalance}
        />
      ) : (
        /* VIEW 2: INTERACTIVE SMARTPHONE APP SIMULATOR */
        <div className="w-full flex flex-col items-center justify-start p-0 md:p-6 min-h-screen">
          {/* Top Bar on Desktop App View */}
          <div className="hidden md:flex items-center justify-between w-full max-w-md lg:max-w-4xl mb-3 px-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentMode('website')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#5f259f] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Website</span>
              </button>
              <PhonePeLogo size="sm" textColor="text-slate-900 dark:text-white" />
            </div>

            <button
              onClick={() => setIsFrameMode(!isFrameMode)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-[#5f259f] transition-all"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#5f259f]" />
              <span>{isFrameMode ? 'Wide Layout' : 'Phone Shell'}</span>
            </button>
          </div>

          {/* Main App Container */}
          <div
            className={`w-full transition-all duration-300 ${
              isFrameMode
                ? 'max-w-[430px] rounded-none sm:rounded-[44px] shadow-2xl border-0 sm:border-[8px] sm:border-slate-800 dark:sm:border-slate-700 bg-white dark:bg-slate-950 overflow-hidden relative'
                : 'max-w-4xl rounded-2xl shadow-xl bg-white dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800'
            }`}
          >
            {/* Status Bar */}
            {isFrameMode && (
              <div className="bg-[#5f259f] text-white px-6 pt-3 pb-1 flex items-center justify-between text-xs select-none">
                <span className="font-bold tracking-tight text-[11px]">09:41</span>
                <div className="w-20 h-4 bg-black/40 rounded-full mx-auto" />
                <div className="flex items-center gap-1.5 text-white/90">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            {/* Sticky Top Header */}
            <TopHeader
              userName={user.name}
              isSoundboxEnabled={isSoundboxEnabled}
              onToggleSoundbox={() => setIsSoundboxEnabled(!isSoundboxEnabled)}
              onOpenScanner={() => setIsScannerOpen(true)}
              onOpenMyQr={() => setIsMyQrOpen(true)}
              onOpenProfile={() => setIsProfileOpen(true)}
              onOpenNotifications={() => setActiveTab('history')}
              onOpenHelp={() => setIsProfileOpen(true)}
              isFrameMode={isFrameMode}
              onToggleFrameMode={() => setIsFrameMode(!isFrameMode)}
            />

            {/* Scrollable Viewport Content */}
            <main className="p-3.5 sm:p-4 space-y-3.5 overflow-y-auto max-h-[calc(100vh-140px)] sm:max-h-[760px] no-scrollbar">
              {activeTab === 'home' && (
                <>
                  <TransferMoneySection
                    upiId={user.upiId}
                    onSendToContact={() => {
                      setSendModalRecipient(null);
                      setIsSendModalOpen(true);
                    }}
                    onSendToBank={() => {
                      setSendModalRecipient(null);
                      setIsSendModalOpen(true);
                    }}
                    onSendToSelf={() => setIsBalanceModalOpen(true)}
                    onCheckBalance={() => setIsBalanceModalOpen(true)}
                    onOpenMyQr={() => setIsMyQrOpen(true)}
                  />

                  <WalletLiteBar
                    walletBalance={user.walletBalance}
                    upiLiteBalance={user.upiLiteBalance}
                    onTopupWallet={handleTopupWallet}
                    onManageUpiLite={handleManageUpiLite}
                    onLinkRupay={() => setIsBalanceModalOpen(true)}
                  />

                  <PromoCarousel onSelectBannerAction={handleBannerAction} />

                  <RechargeBillsSection
                    onOpenMobileRecharge={() => setIsRechargeModalOpen(true)}
                    onOpenElectricity={() => setIsElectricityModalOpen(true)}
                    onOpenDth={() => setIsRechargeModalOpen(true)}
                    onOpenCreditCard={() => setIsElectricityModalOpen(true)}
                    onOpenFastag={() => setIsRechargeModalOpen(true)}
                    onOpenRent={() => {
                      setSendModalRecipient(null);
                      setIsSendModalOpen(true);
                    }}
                    onOpenGas={() => setIsElectricityModalOpen(true)}
                    onOpenSeeAll={() => setIsElectricityModalOpen(true)}
                  />

                  <InsuranceWealthSection
                    onOpenGold={() => setActiveTab('wealth')}
                    onOpenInsurance={() => setActiveTab('insurance')}
                    onOpenMutualFunds={() => setActiveTab('wealth')}
                    onOpenRewards={() => setIsScratchModalOpen(true)}
                    onOpenReferral={() => {
                      alert('Referral link copied! Invite friends to earn ₹100.');
                    }}
                    goldPricePerGram={goldPrice}
                  />

                  <RecentTransactionsSnippet
                    transactions={transactions}
                    onViewAll={() => setActiveTab('history')}
                    onSelectTransaction={(txn) => {
                      setSuccessDetails({
                        recipientName: txn.title.replace('Paid to ', '').replace('Received from ', ''),
                        recipientUpiId: txn.receiver || txn.sender || 'upi@phonepe',
                        amount: txn.amount,
                        transactionId: txn.id,
                        upiRefId: txn.upiRefId,
                        timestamp: txn.date,
                        bankAccount: txn.bankAccount,
                        note: txn.note,
                      });
                      setIsSuccessModalOpen(true);
                    }}
                    onRepeatPayment={handleRepeatPayment}
                  />
                </>
              )}

              {activeTab === 'stores' && (
                <StoresTab
                  onPayMerchant={handlePayMerchant}
                  onOpenScanner={() => setIsScannerOpen(true)}
                />
              )}

              {activeTab === 'insurance' && (
                <InsuranceTab
                  onBuyInsurance={(policy) => {
                    handleInitiatePayment({
                      recipientName: `PhonePe Insurance (${policy.type})`,
                      recipientUpiId: 'insurance.premium@phonepe',
                      amount: policy.premium,
                      note: policy.coverage,
                      selectedAccount: 'State Bank of India •••• 4821',
                      avatarBg: 'bg-indigo-600',
                    });
                  }}
                />
              )}

              {activeTab === 'wealth' && (
                <WealthTab
                  currentGoldGrams={user.goldGrams}
                  goldPricePerGram={goldPrice}
                  onBuyGold={handleBuyGold}
                  onStartSip={handleStartSip}
                />
              )}

              {activeTab === 'history' && (
                <HistoryTab
                  transactions={transactions}
                  onSelectTransaction={(txn) => {
                    setSuccessDetails({
                      recipientName: txn.title.replace('Paid to ', '').replace('Received from ', ''),
                      recipientUpiId: txn.receiver || txn.sender || 'upi@phonepe',
                      amount: txn.amount,
                      transactionId: txn.id,
                      upiRefId: txn.upiRefId,
                      timestamp: txn.date,
                      bankAccount: txn.bankAccount,
                      note: txn.note,
                    });
                    setIsSuccessModalOpen(true);
                  }}
                  onRepeatPayment={handleRepeatPayment}
                />
              )}
            </main>

            {/* Bottom 5-Tab Navigation Bar */}
            <BottomNavBar
              activeTab={activeTab}
              onChangeTab={setActiveTab}
              unseenHistoryCount={0}
            />
          </div>
        </div>
      )}

      {/* Interactive Modals (Shared across website & app) */}
      <SendMoneyModal
        isOpen={isSendModalOpen}
        onClose={() => {
          setIsSendModalOpen(false);
          setSendModalRecipient(null);
        }}
        contacts={contacts}
        bankAccounts={bankAccounts}
        walletBalance={user.walletBalance}
        upiLiteBalance={user.upiLiteBalance}
        initialRecipient={sendModalRecipient}
        onInitiatePayment={handleInitiatePayment}
      />

      <UpiPinModal
        isOpen={isUpiPinModalOpen}
        onClose={() => {
          setIsUpiPinModalOpen(false);
          setPendingPinAction(null);
        }}
        title={pendingPinAction?.title}
        amount={pendingPinAction?.amount}
        bankName={pendingPinAction?.bankName}
        onSuccess={() => {
          setIsUpiPinModalOpen(false);
          pendingPinAction?.onPinSuccess();
          setPendingPinAction(null);
        }}
      />

      <PaymentSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        details={successDetails}
        onOpenScratchCard={() => {
          setIsSuccessModalOpen(false);
          setIsScratchModalOpen(true);
        }}
        isSoundboxEnabled={isSoundboxEnabled}
        soundboxLanguage={soundboxLanguage}
        onRepeatPayment={() => {
          setIsSuccessModalOpen(false);
          if (successDetails) {
            handleOpenSendWithRecipient({
              name: successDetails.recipientName,
              upiId: successDetails.recipientUpiId,
              amount: successDetails.amount,
            });
          }
        }}
      />

      <ScratchCardModal
        isOpen={isScratchModalOpen}
        onClose={() => setIsScratchModalOpen(false)}
        card={activeScratchCard}
        onClaimCashback={handleClaimCashback}
      />

      <QrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanResult={handleScanResult}
      />

      <MyQrModal
        isOpen={isMyQrOpen}
        onClose={() => setIsMyQrOpen(false)}
        userName={user.name}
        upiId={user.upiId}
      />

      <CheckBalanceModal
        isOpen={isBalanceModalOpen}
        onClose={() => setIsBalanceModalOpen(false)}
        bankAccounts={bankAccounts}
        walletBalance={user.walletBalance}
        upiLiteBalance={user.upiLiteBalance}
        onRequirePin={(accountName, onPinSuccess) => {
          setPendingPinAction({
            title: `Fetching Balance`,
            bankName: accountName,
            onPinSuccess,
          });
          setIsUpiPinModalOpen(true);
        }}
      />

      <RechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
        onProceedToPayPlan={handleMobileRechargePlan}
      />

      <ElectricityBillModal
        isOpen={isElectricityModalOpen}
        onClose={() => setIsElectricityModalOpen(false)}
        onPayBill={handleElectricityBillPay}
      />

      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userName={user.name}
        phone={user.phone}
        upiId={user.upiId}
        bankAccounts={bankAccounts}
        isSoundboxEnabled={isSoundboxEnabled}
        onToggleSoundbox={() => setIsSoundboxEnabled(!isSoundboxEnabled)}
        soundboxLanguage={soundboxLanguage}
        onChangeSoundboxLanguage={setSoundboxLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isFrameMode={isFrameMode}
        onToggleFrameMode={() => setIsFrameMode(!isFrameMode)}
        onOpenMyQr={() => setIsMyQrOpen(true)}
      />
    </div>
  );
}

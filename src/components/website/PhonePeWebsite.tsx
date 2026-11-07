import React, { useState } from 'react';
import {
  ShieldCheck,
  Smartphone,
  Building2,
  Coins,
  HeartPulse,
  Volume2,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  QrCode,
  Zap,
  Lock,
  Globe,
  Award,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Play,
  RotateCcw,
} from 'lucide-react';
import { PhonePeLogo } from '../PhonePeLogo';
import { playPhonePeChime, speakSoundbox } from '../../utils/soundbox';

interface PhonePeWebsiteProps {
  onLaunchAppSimulator: () => void;
  goldPricePerGram?: number;
  userWalletBalance: number;
}

export const PhonePeWebsite: React.FC<PhonePeWebsiteProps> = ({
  onLaunchAppSimulator,
  goldPricePerGram = 7485,
  userWalletBalance,
}) => {
  const [activeSoundboxLang, setActiveSoundboxLang] = useState<'hi' | 'en'>('hi');
  const [soundboxPlaying, setSoundboxPlaying] = useState(false);
  const [sipMonthly, setSipMonthly] = useState<number>(2500);
  const [sipYears, setSipYears] = useState<number>(5);

  // Play Soundbox Demo
  const handlePlaySoundbox = (lang: 'hi' | 'en') => {
    setActiveSoundboxLang(lang);
    setSoundboxPlaying(true);
    speakSoundbox(500, lang);
    setTimeout(() => setSoundboxPlaying(false), 2400);
  };

  // SIP Calculator Math (15% annual expected return for diversified equity/gold)
  const monthlyRate = 0.15 / 12;
  const totalMonths = sipYears * 12;
  const totalInvested = sipMonthly * totalMonths;
  const estimatedFutureValue = Math.round(
    sipMonthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate)
  );
  const wealthGain = estimatedFutureValue - totalInvested;

  return (
    <div className="w-full bg-[#fdfbfd] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* 1. TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single element Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <PhonePeLogo size="md" textColor="text-slate-950 dark:text-white" />
          </div>

          {/* Zone 2: Clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#consumer" className="hover:text-[#5f259f] dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
              Consumer Payments
            </a>
            <a href="#business" className="hover:text-[#5f259f] dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
              Business & SmartSpeaker
            </a>
            <a href="#wealth" className="hover:text-[#5f259f] dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
              Gold & Insurance
            </a>
            <a href="#calculator" className="hover:text-[#5f259f] dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
              SIP Calculator
            </a>
            <a href="#scale" className="hover:text-[#5f259f] dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
              Scale & Trust
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onLaunchAppSimulator}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#5f259f] hover:bg-[#521f8b] active:scale-95 rounded-xl shadow-md shadow-[#5f259f]/20 transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <Smartphone className="w-4 h-4" />
              <span>Launch App Simulator</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:py-20 bg-gradient-to-b from-[#f7f3fd] via-white to-white dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Statement */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#5f259f] dark:text-[#c084fc] bg-purple-100/70 dark:bg-purple-950/50 px-3 py-1.5 rounded-full border border-[#5f259f]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>India's #1 Digital Payments & Fintech Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
              At the Heart of India's Digital Payments Revolution
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Over 50 crore registered users and 3.8 crore businesses rely on PhonePe daily for instantaneous UPI transfers, utility bill recharges, 24K pure digital gold, and SmartSpeaker voice alert confirmations.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onLaunchAppSimulator}
                className="px-6 py-3.5 rounded-xl bg-[#5f259f] hover:bg-[#521f8b] active:scale-95 text-white font-bold text-sm shadow-lg shadow-[#5f259f]/25 transition-all flex items-center gap-2"
              >
                <span>Try Live App Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#business"
                className="px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-[#5f259f] font-semibold text-sm transition-all"
              >
                For Businesses & Merchants
              </a>
            </div>

            {/* Micro SmartSpeaker Audio Test Bar */}
            <div className="pt-4 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Hear Soundbox:</span>
              <button
                onClick={() => handlePlaySoundbox('hi')}
                className="px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-bold hover:bg-amber-200 transition-colors flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hindi Alert</span>
              </button>
              <button
                onClick={() => handlePlaySoundbox('en')}
                className="px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-[#5f259f] dark:text-[#c084fc] font-bold hover:bg-purple-200 transition-colors flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>English Alert</span>
              </button>
            </div>
          </div>

          {/* Right Hero Visual: Architectural Fintech Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900">
              <img
                src="/src/assets/images/phonepe_website_hero_1794050900837.jpg"
                alt="PhonePe Fintech Headquarters"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-white/90 uppercase tracking-wider">
                    Live Payment Processing
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">48% of All India UPI Transactions</h3>
                <p className="text-xs text-white/80 mt-1">
                  Processing ₹200+ Lakh Crore in annualized payments with 99.99% core banking uptime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCALE & TRUST METRICS STRIP */}
      <section id="scale" className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
            <div className="pt-4 md:pt-0">
              <p className="text-3xl lg:text-4xl font-extrabold text-[#5f259f] dark:text-[#c084fc] tabular-nums">
                50+ Crore
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                Registered Users
              </p>
              <p className="text-[11px] text-slate-500">1 in every 4 Indians uses PhonePe</p>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6">
              <p className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                3.8+ Crore
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                Merchants Across India
              </p>
              <p className="text-[11px] text-slate-500">Present across 99% of Indian PIN codes</p>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6">
              <p className="text-3xl lg:text-4xl font-extrabold text-[#5f259f] dark:text-[#c084fc] tabular-nums">
                ₹200+ Lakh Cr
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                Annualized Volume
              </p>
              <p className="text-[11px] text-slate-500">Driving cashless digital trade nationwide</p>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6">
              <p className="text-3xl lg:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                100% Secure
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                RBI & NPCI Regulated
              </p>
              <p className="text-[11px] text-slate-500">PCI-DSS Level 1 bank-grade data security</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE CONSUMER CAPABILITIES (BENTO GRID WITH EDITORIAL 01-04 NUMBERING) */}
      <section id="consumer" className="py-16 lg:py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5f259f] dark:text-[#c084fc]">
            Consumer Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Everything You Need for Everyday Finance
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Seamless payments, utility recharges, wealth accumulation, and family protection in one app.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Instant UPI & RuPay Credit Cards (Span 8) */}
          <div className="md:col-span-8 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  01. Instant UPI Transfers
                </span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
                  Zero Transfer Fees
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Send Money Directly from Bank Account to Any UPI App
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Transfer money via mobile number, bank account, or scan any QR code. Link your RuPay Credit Cards to UPI for easy merchant credit payments with up to 50 days interest-free period.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                <p className="text-xs font-bold text-slate-900 dark:text-white">To Any UPI ID</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Google Pay, Paytm, BHIM</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                <p className="text-xs font-bold text-slate-900 dark:text-white">UPI Lite</p>
                <p className="text-[11px] text-slate-500 mt-0.5">PIN-less payments to ₹500</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                <p className="text-xs font-bold text-slate-900 dark:text-white">RuPay on UPI</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Credit card tap & scan</p>
              </div>
            </div>
          </div>

          {/* Card 2: Bharat BillPay (Span 4) */}
          <div className="md:col-span-4 p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-950 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">
                02. Utility Recharges
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Recharge & Pay 300+ Utility Bills
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Instant mobile recharge for Jio, Airtel, Vi. Pay electricity, water, gas cylinder, credit card bills, and FASTag with auto-reminders so you never incur late fees.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-indigo-200/50 dark:border-indigo-900/40">
              <span className="text-xs font-bold text-[#5f259f] dark:text-[#c084fc]">
                Bharat BillPay Certified
              </span>
              <Zap className="w-5 h-5 text-amber-500" />
            </div>
          </div>

          {/* Card 3: 24K Pure Digital Gold (Span 6) */}
          <div className="md:col-span-6 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  03. Wealth & Gold
                </span>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded">
                  24K 99.99% Pure
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Start Investing in 24K Physical Gold from Just ₹10
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Buy, sell, or request doorstep physical coin delivery. All gold is 100% insured and stored in bank-grade vaults managed by MMTC-PAMP.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Live Gold Market Price</p>
                <p className="text-lg font-black text-amber-700 dark:text-amber-400 tabular-nums">
                  ₹{goldPricePerGram.toLocaleString('en-IN')}/gm
                </p>
              </div>
              <button
                onClick={onLaunchAppSimulator}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"
              >
                Buy in App
              </button>
            </div>
          </div>

          {/* Card 4: Paperless Insurance (Span 6) */}
          <div className="md:col-span-6 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  04. Insurance Protection
                </span>
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 rounded">
                  Instant Policy
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Comprehensive Protection in 2 Minutes with Zero Paperwork
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Protect your bike from ₹457/yr, car with cashless zero-depreciation coverage, and family health with up to ₹1 Crore cover across 10,000+ networked hospitals.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>98.4% Claim Settlement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Inspection for Renewal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PHONPE SMARTSPEAKER / SOUNDBOX FOR MERCHANTS */}
      <section id="business" className="py-16 bg-[#5f259f] text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              For India's Merchants & Retailers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              PhonePe SmartSpeaker: Voice Alerts in 11+ Indian Languages
            </h2>
            <p className="text-base text-white/85 leading-relaxed max-w-xl">
              Eliminate payment fraud and the need to repeatedly check SMS. The PhonePe SmartSpeaker announces payment confirmation loudly and instantly in your preferred language.
            </p>

            {/* Interactive Voice Test Bench */}
            <div className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Test SmartSpeaker Announcement:</span>
                <span className="text-amber-300 font-mono text-[11px]">4G Sim Included</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handlePlaySoundbox('hi')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeSoundboxLang === 'hi'
                      ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                      : 'bg-white/15 text-white hover:bg-white/25'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Hindi: "PhonePe par ₹500 prapt hue"</span>
                </button>

                <button
                  onClick={() => handlePlaySoundbox('en')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeSoundboxLang === 'en'
                      ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                      : 'bg-white/15 text-white hover:bg-white/25'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>English: "Payment of ₹500 received"</span>
                </button>
              </div>

              <p className="text-[11px] text-white/70">
                *Click either button above to hear the authentic PhonePe dual-tone harmonic chime and clear voice broadcast!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div>
                <p className="text-2xl font-black text-amber-300 tabular-nums">1.2 Cr+</p>
                <p className="text-xs text-white/80">SmartSpeakers Installed</p>
              </div>
              <div>
                <p className="text-2xl font-black text-amber-300 tabular-nums">4 Days</p>
                <p className="text-xs text-white/80">Battery Backup</p>
              </div>
              <div>
                <p className="text-2xl font-black text-amber-300 tabular-nums">0.5s</p>
                <p className="text-xs text-white/80">Audio Settlement Speed</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/10 rounded-3xl p-8 border border-white/20 text-center">
            <div className="w-20 h-20 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Volume2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold">Request a SmartSpeaker for Your Store</h3>
            <p className="text-xs text-white/80 mt-2">
              Get free delivery and installation within 24 hours anywhere in India with zero security deposit.
            </p>
            <button
              onClick={onLaunchAppSimulator}
              className="mt-6 w-full py-3 rounded-xl bg-white text-[#5f259f] font-bold text-xs uppercase tracking-wider hover:bg-white/90 shadow-md transition-all"
            >
              Order SmartSpeaker Now
            </button>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE WEALTH & SIP CALCULATOR */}
      <section id="calculator" className="py-16 lg:py-24 max-w-7xl mx-auto px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#5f259f] dark:text-[#c084fc]">
                Wealth Growth Calculator
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Calculate Returns on Mutual Funds & 24K Gold
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                See how small monthly SIP investments compound over time with disciplined investing on PhonePe.
              </p>
            </div>

            {/* Slider 1: Monthly Investment */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Monthly Investment</span>
                <span className="text-[#5f259f] dark:text-[#c084fc] tabular-nums text-sm">
                  ₹{sipMonthly.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="25000"
                step="500"
                value={sipMonthly}
                onChange={(e) => setSipMonthly(Number(e.target.value))}
                className="w-full accent-[#5f259f] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹500</span>
                <span>₹10,000</span>
                <span>₹25,000</span>
              </div>
            </div>

            {/* Slider 2: Investment Horizon */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Time Period</span>
                <span className="text-[#5f259f] dark:text-[#c084fc] tabular-nums text-sm">
                  {sipYears} Years ({sipYears * 12} Months)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={sipYears}
                onChange={(e) => setSipYears(Number(e.target.value))}
                className="w-full accent-[#5f259f] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 Year</span>
                <span>5 Years</span>
                <span>15 Years</span>
              </div>
            </div>
          </div>

          {/* Calculator Output Card */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 space-y-4">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-purple-200/50 dark:border-purple-900/40">
              <div>
                <p className="text-xs text-slate-500">Invested Amount</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
                  ₹{totalInvested.toLocaleString('en-IN')}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Est. Returns (@15% p.a.)</p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  +₹{wealthGain.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
                Total Estimated Value
              </p>
              <h3 className="text-3xl sm:text-4xl font-black text-[#5f259f] dark:text-[#c084fc] mt-1 tabular-nums">
                ₹{estimatedFutureValue.toLocaleString('en-IN')}
              </h3>
            </div>

            <button
              onClick={onLaunchAppSimulator}
              className="w-full h-11 rounded-xl bg-[#5f259f] hover:bg-[#521f8b] active:scale-95 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <span>Start ₹{sipMonthly}/mo SIP in App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. LAUNCH APP SIMULATOR CALLOUT BANNER */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-[#391263] to-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto shadow-inner">
            <Smartphone className="w-7 h-7 text-amber-300" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Experience the Complete PhonePe Smartphone App
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
            Test the live UPI transfers, interactive QR code scanner, UPI PIN pad, recharge plans, 24K gold buying, and scratch cards directly in the interactive simulator.
          </p>
          <div className="pt-2">
            <button
              onClick={onLaunchAppSimulator}
              className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-950 font-extrabold text-sm shadow-xl transition-all inline-flex items-center gap-2"
            >
              <span>Launch Live Mobile Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. QUIET CORPORATE FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="font-bold text-white mb-3">Consumer Solutions</p>
              <ul className="space-y-2">
                <li><a href="#consumer" className="hover:text-white transition-colors">Instant UPI Payments</a></li>
                <li><a href="#consumer" className="hover:text-white transition-colors">Mobile Recharge & DTH</a></li>
                <li><a href="#consumer" className="hover:text-white transition-colors">Electricity & Water Bills</a></li>
                <li><a href="#wealth" className="hover:text-white transition-colors">24K 99.99% Digital Gold</a></li>
                <li><a href="#wealth" className="hover:text-white transition-colors">Mutual Funds & SIPs</a></li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-white mb-3">Business Solutions</p>
              <ul className="space-y-2">
                <li><a href="#business" className="hover:text-white transition-colors">PhonePe SmartSpeaker</a></li>
                <li><a href="#business" className="hover:text-white transition-colors">Payment Gateway for Web & App</a></li>
                <li><a href="#business" className="hover:text-white transition-colors">Offline QR for Retailers</a></li>
                <li><a href="#business" className="hover:text-white transition-colors">PhonePe POS Terminal</a></li>
                <li><a href="#business" className="hover:text-white transition-colors">Merchant Working Capital</a></li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-white mb-3">Insurance</p>
              <ul className="space-y-2">
                <li><a href="#consumer" className="hover:text-white transition-colors">Bike & Two Wheeler</a></li>
                <li><a href="#consumer" className="hover:text-white transition-colors">Car & Commercial Vehicle</a></li>
                <li><a href="#consumer" className="hover:text-white transition-colors">Family Health Insurance</a></li>
                <li><a href="#consumer" className="hover:text-white transition-colors">Term Life Insurance</a></li>
                <li><a href="#consumer" className="hover:text-white transition-colors">International Travel Cover</a></li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-white mb-3">Compliance & Trust</p>
              <ul className="space-y-2">
                <li>RBI Authorized Prepaid Issuer</li>
                <li>NPCI Certified UPI Partner</li>
                <li>IRDAI Direct Insurance Broker</li>
                <li>AMFI Registered Mutual Fund Distributor</li>
                <li>Grievance Officer: Indiranagar, Bengaluru</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <PhonePeLogo size="sm" showText={false} />
              <span>© 2026 PhonePe Private Limited. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>·</span>
              <span>Terms of Service</span>
              <span>·</span>
              <span>Dispute Resolution</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

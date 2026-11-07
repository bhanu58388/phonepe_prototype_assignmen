export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: 'debit' | 'credit';
  category: 'upi' | 'recharge' | 'bill' | 'gold' | 'cashback' | 'merchant';
  date: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
  sender?: string;
  receiver?: string;
  upiRefId: string;
  bankAccount: string;
  note?: string;
  avatarBg?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountType: 'Savings' | 'Salary' | 'Current';
  last4Digits: string;
  balance: number;
  ifsc: string;
  isPrimary: boolean;
  logoBg: string;
  upiId: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  upiId: string;
  avatarBg: string;
  recentAmount?: number;
}

export interface ScratchCard {
  id: string;
  title: string;
  brand: string;
  amountWon: number;
  code: string;
  isScratched: boolean;
  description: string;
}

export interface RechargePlan {
  id: string;
  operator: 'Jio' | 'Airtel' | 'Vi';
  price: number;
  validity: string;
  data: string;
  calls: string;
  description: string;
  tag?: string;
}

export interface Merchant {
  id: string;
  name: string;
  category: string;
  distance: string;
  address: string;
  rating: number;
  upiId: string;
  avatarBg: string;
}

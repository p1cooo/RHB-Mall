export interface User {
  email: string;
  name: string;
  tier: 'Silver' | 'Gold' | 'Platinum';
  points: number;
}

export interface Voucher {
  id: string;
  title: string;
  category: 'Fashion' | 'Dining' | 'Services' | 'Parking' | 'Beverage';
  pointsCost: number;
  description: string;
  image: string; // Tailwind bg color or emoji or icon name
  code: string;
  status: 'available' | 'used';
  expiryDate: string;
  redeemedAt?: string;
}

export interface Store {
  id: string;
  name: string;
  category: string;
  logo: string; // Emoji or abbreviation
  logoBg: string; // CSS color class
  location: string;
  contact: string;
  hours: string;
  description: string;
  featuredPromo?: string;
}

export interface Transaction {
  id: string;
  storeName: string;
  amount: number;
  pointsEarned: number;
  date: string;
  category: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  nickname: string;
  type: string;
  color: string;
  status: 'Parked' | 'Vehicle Exited';
  entryTime?: string;
  exitTime?: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'promo' | 'reward' | 'reminder' | 'campaign';
  isRead: boolean;
}

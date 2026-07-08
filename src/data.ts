import { Store, Voucher, Transaction, Vehicle, Notification } from './types';

export const INITIAL_STORES: Store[] = [
  {
    id: 'nike',
    name: 'Nike',
    category: 'Sports & Activewear',
    logo: '👟',
    logoBg: 'bg-zinc-900 text-white',
    location: 'First Floor, F-102',
    contact: '+60 3-2282 3902',
    hours: '10:00 AM - 10:00 PM',
    description: 'Experience the latest innovation in Nike running, training, and lifestyle gear. Elevate your potential with premium products tailored for athletes.',
    featuredPromo: 'End of Season Sale: Up to 40% off on premium running shoes.'
  },
  {
    id: 'uniqlo',
    name: 'Uniqlo',
    category: 'Fashion & Apparel',
    logo: '🔴',
    logoBg: 'bg-red-600 text-white',
    location: 'Ground Floor, G-22 & G-23',
    contact: '+60 3-2284 1221',
    hours: '10:00 AM - 10:00 PM',
    description: 'LifeWear is clothing designed to make everyone’s life better. Simple, high-quality, everyday clothing with a practical sense of beauty.',
    featuredPromo: 'Weekend Deals: AIRism shirts from RM59.'
  },
  {
    id: 'starbucks',
    name: 'Starbucks Coffee',
    category: 'Beverage & Cafe',
    logo: '☕',
    logoBg: 'bg-emerald-800 text-white',
    location: 'Ground Floor, G-05 (Al Fresco)',
    contact: '+60 3-2287 0108',
    hours: '7:30 AM - 11:00 PM',
    description: 'Since 1971, Starbucks Coffee Company has been committed to ethically sourcing and roasting high-quality arabica coffee. Enjoy signature hand-crafted beverages.',
    featuredPromo: 'Buy 1 Free 1 on any Summer Frappuccino series.'
  },
  {
    id: 'popular',
    name: 'Popular Bookstore',
    category: 'Books & Stationery',
    logo: '📚',
    logoBg: 'bg-red-500 text-white',
    location: 'Second Floor, S-201',
    contact: '+60 3-2283 5510',
    hours: '10:00 AM - 10:00 PM',
    description: 'Your one-stop destination for English, Malay, and Chinese books, educational materials, stationeries, CD-RAMS, multimedia products, and gifts.',
    featuredPromo: 'Members’ Exclusive: 20% off on all award-winning novels.'
  },
  {
    id: 'watsons',
    name: 'Watsons Pharmacy',
    category: 'Health & Beauty',
    logo: '💚',
    logoBg: 'bg-teal-600 text-white',
    location: 'Lower Ground, LG-45',
    contact: '+60 3-2282 1190',
    hours: '10:00 AM - 10:00 PM',
    description: 'Watsons is Asia’s leading health and beauty retailer, currently operating over 16,000 stores. Discover personal care, cosmetics, and wellness essentials.',
    featuredPromo: 'Mix and Match: Save 50% on second skincare item.'
  },
  {
    id: 'hm',
    name: 'H&M',
    category: 'Fashion & Apparel',
    logo: '👗',
    logoBg: 'bg-red-700 text-white',
    location: 'Ground & First Floor, G-12 & F-12',
    contact: '+60 3-2289 8891',
    hours: '10:00 AM - 10:00 PM',
    description: 'H&M offers fashion and quality at the best price in a sustainable way. Browse modern wardrobe staples, office attire, and casual street wear for all.',
    featuredPromo: 'Selected items from RM29. Recycle your clothes for a 15% voucher.'
  }
];

export const INITIAL_REDEEMABLE_VOUCHERS: Voucher[] = [
  {
    id: 'v_fashion_5',
    title: 'RM5 Fashion Voucher',
    category: 'Fashion',
    pointsCost: 300,
    description: 'Get RM5 off on your purchase at any participating fashion store, including Uniqlo, H&M, and Zara. Minimum spend of RM50.',
    image: '🎟️',
    code: 'RHBFASH5',
    status: 'available',
    expiryDate: '2026-12-31'
  },
  {
    id: 'v_dining_10',
    title: 'RM10 Dining Voucher',
    category: 'Dining',
    pointsCost: 550,
    description: 'Enjoy RM10 savings at any dining or food outlet in RHB Mall. Applicable for both dine-in and takeaways. No minimum spend.',
    image: '🍔',
    code: 'RHBDINE10',
    status: 'available',
    expiryDate: '2026-11-30'
  },
  {
    id: 'v_coffee_free',
    title: 'Free Coffee Voucher',
    category: 'Beverage',
    pointsCost: 200,
    description: 'Redeem one (1) complimentary Tall-sized hand-crafted hot coffee at Starbucks RHB Mall branch. Excludes seasonal promotional drinks.',
    image: '☕',
    code: 'RHBFREECOF',
    status: 'available',
    expiryDate: '2026-09-30'
  },
  {
    id: 'v_parking_free',
    title: 'Free Parking Voucher',
    category: 'Parking',
    pointsCost: 150,
    description: 'Enjoy free parking for up to 3 hours on your next visit to RHB Mall. Redeem via app and register plate number before exiting.',
    image: '🚗',
    code: 'RHBPARKFREE',
    status: 'available',
    expiryDate: '2026-10-15'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_1',
    storeName: 'Nike Store',
    amount: 350.00,
    pointsEarned: 525, // 350 * 1.5 (Gold Member multiplier)
    date: '2026-06-28 15:42',
    category: 'Sports & Activewear'
  },
  {
    id: 'tx_2',
    storeName: 'Uniqlo',
    amount: 120.00,
    pointsEarned: 180, // 120 * 1.5
    date: '2026-06-25 18:10',
    category: 'Fashion & Apparel'
  },
  {
    id: 'tx_3',
    storeName: 'Starbucks Coffee',
    amount: 25.00,
    pointsEarned: 37, // 25 * 1.5 rounded or similar
    date: '2026-06-20 11:24',
    category: 'Beverage & Cafe'
  }
];

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'veh_1',
    plateNumber: 'VCD 8839',
    nickname: 'Sarah\'s Benz',
    type: 'Sedan',
    color: 'Obsidian Black',
    status: 'Parked',
    entryTime: '2026-07-01 12:15 PM'
  },
  {
    id: 'veh_2',
    plateNumber: 'WQX 921',
    nickname: 'Civic Daily',
    type: 'Sedan',
    color: 'Sonic Gray',
    status: 'Vehicle Exited',
    entryTime: '2026-06-28 02:10 PM',
    exitTime: '2026-06-28 05:45 PM'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    title: '🎉 Birthday Reward Incoming!',
    description: 'Happy early birthday from RHB Mall! Enjoy an RM15 Birthday Voucher and double points on all your shopping during your birthday month.',
    time: '2 hours ago',
    type: 'reward',
    isRead: false
  },
  {
    id: 'notif_2',
    title: '⚡ 2x Double Points Campaign',
    description: 'Earn 2x points on all apparel stores this coming weekend! Includes Nike, Uniqlo, and H&M. Do not miss out.',
    time: '1 day ago',
    type: 'campaign',
    isRead: false
  },
  {
    id: 'notif_3',
    title: '☕ Starbuck BOGO Alert',
    description: 'Buy 1 Free 1 Frappuccino on Starbucks between 2PM - 5PM today. Just present your Gold Membership screen.',
    time: '2 days ago',
    type: 'promo',
    isRead: true
  },
  {
    id: 'notif_4',
    title: '🎟️ Voucher Expiring Soon',
    description: 'Your redeemed Free Coffee Voucher expires in 3 days. Visit Starbucks at the Al Fresco ground floor to use it.',
    time: '4 days ago',
    type: 'reminder',
    isRead: true
  }
];

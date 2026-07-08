import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home as HomeIcon, 
  Store as StoreIcon, 
  Ticket, 
  User as UserIcon, 
  Car, 
  History, 
  Award, 
  Megaphone, 
  Bell, 
  LogOut, 
  Search, 
  Plus, 
  X, 
  ArrowRight, 
  Mail, 
  Lock, 
  CheckCircle, 
  ChevronRight, 
  Phone, 
  Clock, 
  MapPin, 
  Sparkles, 
  HelpCircle, 
  Eye, 
  EyeOff,
  UserCheck,
  Percent,
  CalendarCheck,
  Sliders,
  Volume2,
  Trash2,
  Settings,
  RotateCcw,
  Shield,
  Languages,
  VolumeX
} from 'lucide-react';

import { User, Voucher, Store, Transaction, Vehicle, Notification } from './types';
import { 
  INITIAL_STORES, 
  INITIAL_REDEEMABLE_VOUCHERS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_VEHICLES, 
  INITIAL_NOTIFICATIONS 
} from './data';

import PhoneSimulator from './components/PhoneSimulator';
import MembershipCard from './components/MembershipCard';
import CashierSimulator from './components/CashierSimulator';

// Interactive Customer Live Concierge Chatbot Component for help center simulation
function SupportChatSection() {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string }>>([
    { sender: 'agent', text: "Hello! I am RHB Mall's automated loyalty assistant. How can I help you today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');
    setIsTyping(true);

    // Dynamic responses for testing flows
    setTimeout(() => {
      let reply = "I've logged your query with our mall customer relations team. They will respond shortly!";
      const lower = userMsg.toLowerCase();
      if (lower.includes('point') || lower.includes('claim') || lower.includes('mata')) {
        reply = "Mata ganjaran (points) can be claimed by scanning your home screen Loyalty QR Code at participating registers before checking out. It rewards 1 point for every RM1!";
      } else if (lower.includes('park') || lower.includes('plate') || lower.includes('car') || lower.includes('parking') || lower.includes('kereta')) {
        reply = "You can register up to 3 license plates on your Profile tab. Parking bills are automatically calculated and can be waived using points!";
      } else if (lower.includes('voucher') || lower.includes('claim') || lower.includes('kupon')) {
        reply = "Vouchers can be unlocked via the Catalog tab. Once claimed, go to the Home tab's My Vouchers tray, open the barcode, and present it to checkout!";
      } else if (lower.includes('biometric') || lower.includes('face') || lower.includes('finger') || lower.includes('touch')) {
        reply = "Face ID and Touch ID can be tested on our premium apple-style login terminal. Just click the respective icons for simulated instant entry!";
      }

      setMessages(prev => [...prev, { sender: 'agent', text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-3xs flex flex-col gap-3 mt-1">
      <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <h4 className="text-[10px] font-black text-[#1C1C1E] uppercase tracking-wider">Live Concierge Chatbot</h4>
      </div>

      {/* Messages list */}
      <div className="flex flex-col gap-2 h-40 overflow-y-auto p-1 text-[11px] no-scrollbar">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-xl px-3 py-2 leading-relaxed font-medium ${
              m.sender === 'user' 
                ? 'bg-[#1C1C1E] text-white rounded-tr-none' 
                : 'bg-slate-100 text-slate-800 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-500 max-w-[85%] rounded-xl px-3 py-1.5 text-[10px] rounded-tl-none font-bold animate-pulse">
              Concierge is typing...
            </div>
          </div>
        )}
      </div>

      {/* Inputs */}
      <form onSubmit={handleSend} className="flex gap-2 border-t border-slate-100 pt-2.5">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask about points, parking, vouchers..."
          className="flex-1 bg-[#F2F2F7] border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A028] font-semibold text-slate-800"
        />
        <button
          type="submit"
          className="bg-[#1C1C1E] hover:bg-black text-white px-3 rounded-xl text-xs font-black cursor-pointer shadow-xs"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default function App() {
  // --- Persistent & Local App State ---
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('rhb_mall_user');
    if (saved) return JSON.parse(saved);
    return {
      email: 'sarah.lim@gmail.com',
      name: 'Sarah Lim',
      tier: 'Gold',
      points: 3450
    };
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('rhb_mall_transactions');
    if (saved) return JSON.parse(saved);
    return INITIAL_TRANSACTIONS;
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('rhb_mall_vehicles');
    if (saved) return JSON.parse(saved);
    return INITIAL_VEHICLES;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('rhb_mall_notifications');
    if (saved) return JSON.parse(saved);
    return INITIAL_NOTIFICATIONS;
  });

  // Redeemed vouchers list
  const [myVouchers, setMyVouchers] = useState<Voucher[]>(() => {
    const saved = localStorage.getItem('rhb_mall_my_vouchers');
    if (saved) return JSON.parse(saved);
    // Seed one free parking voucher that's available, and one used RM10 Dining voucher
    return [
      {
        id: 'v_parking_free_seed',
        title: 'Free Parking Voucher',
        category: 'Parking',
        pointsCost: 150,
        description: 'Enjoy free parking for up to 3 hours on your next visit to RHB Mall.',
        image: '🚗',
        code: 'RHBPARKFREE-SEED',
        status: 'available',
        expiryDate: '2026-10-15',
        redeemedAt: '2026-06-28 12:00'
      },
      {
        id: 'v_dining_10_seed',
        title: 'RM10 Dining Voucher',
        category: 'Dining',
        pointsCost: 550,
        description: 'Enjoy RM10 savings at any dining or food outlet in RHB Mall.',
        image: '🍔',
        code: 'RHBDINE10-USED',
        status: 'used',
        expiryDate: '2026-06-30',
        redeemedAt: '2026-06-25 14:15'
      }
    ];
  });

  // --- UI Layout & Navigation States ---
  const [activeTab, setActiveTab] = useState<'home' | 'directory' | 'vouchers' | 'profile'>('home');
  const [authScreen, setAuthScreen] = useState<'login' | 'signup' | null>(null); // Null means logged in
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  
  // Voucher filters
  const [voucherFilter, setVoucherFilter] = useState<'redeem' | 'my-available' | 'my-used'>('redeem');

  // Directory filters
  const [directorySearch, setDirectorySearch] = useState('');
  const [directoryCategory, setDirectoryCategory] = useState('All');

  // Modals & Detail Drawers
  const [openQRModal, setOpenQRModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [openVehicleModal, setOpenVehicleModal] = useState(false);
  const [openTiersModal, setOpenTiersModal] = useState(false);
  const [openTransactionsModal, setOpenTransactionsModal] = useState(false);
  const [openPromoModal, setOpenPromoModal] = useState<{ title: string; storeId: string; description: string; promoText: string; image: string } | null>(null);
  const [openNotificationsModal, setOpenNotificationsModal] = useState(false);

  // Form Fields
  const [newVehiclePlate, setNewVehiclePlate] = useState('');
  const [newVehicleNickname, setNewVehicleNickname] = useState('');
  const [newVehicleType, setNewVehicleType] = useState('Sedan');
  const [newVehicleColor, setNewVehicleColor] = useState('');

  // Auth Inputs
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Voucher Code Barcode Reveal Modal
  const [activeBarcodeVoucher, setActiveBarcodeVoucher] = useState<Voucher | null>(null);

  // --- Remember Me & Authentication States ---
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem('rhb_mall_remember_me') === 'true';
  });
  const [openSupportModal, setOpenSupportModal] = useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const [biometricScanType, setBiometricScanType] = useState<'FaceID' | 'Fingerprint' | null>(null);
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [biometricScanSuccess, setBiometricScanSuccess] = useState(false);
  
  // --- Terms & Conditions Modal States ---
  const [openTermsModal, setOpenTermsModal] = useState(false);
  const [termsLanguage, setTermsLanguage] = useState<'en' | 'ms' | 'zh'>('en');
  const [termsShowFull, setTermsShowFull] = useState(false);
  const [isReadingTerms, setIsReadingTerms] = useState(false); // Audio play state
  
  // --- Notification states & settings ---
  const [notifSettingsEnabled, setNotifSettingsEnabled] = useState(true);
  const [notifMutedCategories, setNotifMutedCategories] = useState<string[]>([]);
  const [notifCategories, setNotifCategories] = useState({
    promotions: true,
    arrivals: true,
    events: true,
    updates: true,
  });
  const [notifSoundType, setNotifSoundType] = useState<'bell' | 'chime' | 'vibes' | 'none'>('bell');
  const [notifStyleMode, setNotifStyleMode] = useState<'story' | 'concise'>('story');
  const [notifActiveTab, setNotifActiveTab] = useState<'alerts' | 'settings' | 'recycle'>('alerts');
  const [aiPersonalization, setAiPersonalization] = useState(true);
  const [aiInterest, setAiInterest] = useState<'Fashion' | 'Dining' | 'All'>('All');
  const [deletedNotifs, setDeletedNotifs] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('rhb_mall_deleted_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Save states to localStorage whenever they change ---
  useEffect(() => {
    localStorage.setItem('rhb_mall_remember_me', String(rememberMe));
  }, [rememberMe]);

  useEffect(() => {
    localStorage.setItem('rhb_mall_deleted_notifications', JSON.stringify(deletedNotifs));
  }, [deletedNotifs]);
  useEffect(() => {
    if (user) {
      localStorage.setItem('rhb_mall_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rhb_mall_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('rhb_mall_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('rhb_mall_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('rhb_mall_my_vouchers', JSON.stringify(myVouchers));
  }, [myVouchers]);

  useEffect(() => {
    localStorage.setItem('rhb_mall_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // --- Dynamic Tier Calculation and Auto-upgrade ---
  const calculateTierFromPoints = (points: number): 'Silver' | 'Gold' | 'Platinum' => {
    if (points >= 5000) return 'Platinum';
    if (points >= 1000) return 'Gold';
    return 'Silver';
  };

  // Helper to show a feedback toast
  const showToastMessage = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sound play helper utilizing Web Audio API for high-fidelity custom visual audio experience
  const playNotificationSound = (type: 'bell' | 'chime' | 'vibes' | 'none') => {
    if (type === 'none') return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'bell') {
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'chime') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
        
        setTimeout(() => {
          const ctx2 = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc2 = ctx2.createOscillator();
          const gain2 = ctx2.createGain();
          osc2.connect(gain2);
          gain2.connect(ctx2.destination);
          osc2.frequency.setValueAtTime(880, ctx2.currentTime); // A5
          gain2.gain.setValueAtTime(0.15, ctx2.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.01, ctx2.currentTime + 0.3);
          osc2.start();
          osc2.stop(ctx2.currentTime + 0.3);
        }, 120);
      } else if (type === 'vibes') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {
      console.log('AudioContext not supported or blocked by browser policies', e);
    }
  };

  // TTS Read aloud summary of Terms & Conditions
  const toggleSpeechSummary = () => {
    if (isReadingTerms) {
      window.speechSynthesis.cancel();
      setIsReadingTerms(false);
    } else {
      const summaryText = {
        en: "RHB Mall Loyalty Program. First, points are credited instantly upon checkout. Second, rewards are subject to tier-based multipliers. Third, we protect your personal shopping data.",
        ms: "Program Kesetiaan RHB Mall. Pertama, mata ganjaran dikreditkan serta-merta semasa pembayaran. Kedua, ganjaran tertakluk kepada pengganda mengikut tahap keahlian. Ketiga, kami melindungi data peribadi anda.",
        zh: "RHB商场忠诚度计划。第一，积分在结账时即时入账。第二，奖励受会员级别倍数限制。第三，我们安全保护您的个人购物数据。"
      }[termsLanguage];
      
      const utterance = new SpeechSynthesisUtterance(summaryText);
      utterance.lang = termsLanguage === 'en' ? 'en-US' : termsLanguage === 'ms' ? 'ms-MY' : 'zh-CN';
      utterance.onend = () => setIsReadingTerms(false);
      utterance.onerror = () => setIsReadingTerms(false);
      window.speechSynthesis.speak(utterance);
      setIsReadingTerms(true);
    }
  };

  // --- Handlers & Simulators ---
  
  // 1. Transaction collection flow from Cashier simulator
  const handleAddTransaction = (storeName: string, amount: number, pointsEarned: number, category: string) => {
    if (!user) return;

    // Create transaction
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      storeName,
      amount,
      pointsEarned,
      date: nowStr,
      category
    };

    // Update point balance & check tier
    const updatedPoints = user.points + pointsEarned;
    const oldTier = user.tier;
    const newTier = calculateTierFromPoints(updatedPoints);

    setTransactions(prev => [newTx, ...prev]);
    setUser(prev => prev ? {
      ...prev,
      points: updatedPoints,
      tier: newTier
    } : null);

    // Trigger double notification logic on tier shift!
    if (oldTier !== newTier) {
      const isUp = 
        (oldTier === 'Silver' && (newTier === 'Gold' || newTier === 'Platinum')) ||
        (oldTier === 'Gold' && newTier === 'Platinum');
      
      const title = isUp ? `📈 Level Up: ${newTier} Member!` : `Membership Updated to ${newTier}`;
      const description = isUp 
        ? `Amazing! Your points balance reached ${updatedPoints.toLocaleString()} pts, automatically elevating you to the luxurious ${newTier} tier with a higher multiplier!`
        : `Your membership tier status was adjusted.`;

      const newNotif: Notification = {
        id: `notif_tier_${Date.now()}`,
        title,
        description,
        time: 'Just now',
        type: 'reward',
        isRead: false
      };
      setNotifications(prev => [newNotif, ...prev]);
      showToastMessage(`🎉 Congratulations! You upgraded to ${newTier} Member!`, 'success');
    } else {
      showToastMessage(`Earned +${pointsEarned} pts at ${storeName}!`, 'success');
    }
  };

  // 2. Parking Registration Limit & Simulated Exit
  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (vehicles.length >= 3) {
      showToastMessage('Registration limit reached. Maximum of 3 vehicles allowed.', 'error');
      setOpenVehicleModal(false);
      return;
    }

    if (!newVehiclePlate.trim() || !newVehicleColor.trim()) {
      showToastMessage('Please enter plate number and vehicle color.', 'error');
      return;
    }

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString();
    const newVeh: Vehicle = {
      id: `veh_${Date.now()}`,
      plateNumber: newVehiclePlate.toUpperCase(),
      nickname: newVehicleNickname.trim() || `${newVehicleColor} ${newVehicleType}`,
      type: newVehicleType,
      color: newVehicleColor,
      status: 'Parked',
      entryTime: `${new Date().toISOString().substring(0, 10)} ${nowStr.split(' ')[0]}`
    };

    setVehicles(prev => [...prev, newVeh]);
    showToastMessage(`Vehicle ${newVehiclePlate.toUpperCase()} registered successfully!`);
    
    // Reset forms
    setNewVehiclePlate('');
    setNewVehicleNickname('');
    setNewVehicleColor('');
    setOpenVehicleModal(false);
  };

  const handleSimulateVehicleExit = (vehicleId: string) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setVehicles(prev => prev.map(v => {
      if (v.id === vehicleId) {
        return {
          ...v,
          status: 'Vehicle Exited',
          exitTime: `Today, ${nowStr}`
        };
      }
      return v;
    }));
    
    const exitedVeh = vehicles.find(v => v.id === vehicleId);
    showToastMessage(`Parking exit logged: ${exitedVeh?.plateNumber} exited safely.`, 'info');
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    setVehicles(prev => prev.filter(v => v.id !== vehicleId));
    showToastMessage('Vehicle removed from profile.', 'info');
  };

  // 3. Voucher Point-Redemption Flow
  const handleRedeemVoucher = (voucher: Voucher) => {
    if (!user) {
      showToastMessage('Please log in first to redeem vouchers.', 'error');
      return;
    }

    if (user.points < voucher.pointsCost) {
      showToastMessage(`Insufficient loyalty points. You need ${voucher.pointsCost - user.points} more points.`, 'error');
      return;
    }

    // Deduct points
    const remainingPoints = user.points - voucher.pointsCost;
    const newTier = calculateTierFromPoints(remainingPoints);

    setUser(prev => prev ? {
      ...prev,
      points: remainingPoints,
      tier: newTier
    } : null);

    // Add to My Vouchers list
    const redeemedCode = `${voucher.code}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const newRedeemedVoucher: Voucher = {
      ...voucher,
      id: `myv_${Date.now()}`,
      code: redeemedCode,
      status: 'available',
      redeemedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setMyVouchers(prev => [newRedeemedVoucher, ...prev]);

    // Create Notification about redemption
    const newNotif: Notification = {
      id: `notif_v_${Date.now()}`,
      title: `🎟️ Voucher Redeemed: ${voucher.title}`,
      description: `You successfully exchanged ${voucher.pointsCost} pts for a ${voucher.title}. Find it under "My Vouchers" and scan at checkout before expiry!`,
      time: 'Just now',
      type: 'reward',
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToastMessage(`Successfully redeemed ${voucher.title}!`, 'success');
  };

  const handleUseVoucher = (myVoucherId: string) => {
    setMyVouchers(prev => prev.map(v => {
      if (v.id === myVoucherId) {
        return { ...v, status: 'used' };
      }
      return v;
    }));
    showToastMessage('Voucher successfully marked as Used!', 'success');
    setActiveBarcodeVoucher(null);
  };

  // 4. Notifications management
  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToastMessage('All notifications marked as read.', 'info');
  };

  const handleDeleteNotification = (id: string) => {
    const target = notifications.find(n => n.id === id);
    if (target) {
      setNotifications(prev => prev.filter(n => n.id !== id));
      setDeletedNotifs(prev => [target, ...prev]);
      showToastMessage('Notification moved to Recycle Bin.', 'info');
    }
  };

  const handleRestoreNotification = (id: string) => {
    const target = deletedNotifs.find(n => n.id === id);
    if (target) {
      setDeletedNotifs(prev => prev.filter(n => n.id !== id));
      setNotifications(prev => [target, ...prev]);
      showToastMessage('Notification restored successfully.', 'success');
    }
  };

  const handleClearNotifications = () => {
    if (notifications.length > 0) {
      setDeletedNotifs(prev => [...notifications, ...prev]);
      setNotifications([]);
      showToastMessage('All notifications moved to Recycle Bin.', 'info');
    }
  };

  const handleEmptyRecycleBin = () => {
    setDeletedNotifs([]);
    showToastMessage('Recycle Bin emptied permanently.', 'info');
  };

  const handleAISweepOldAlerts = () => {
    // Automatically sweep notifications containing "day" or "days" or "week" as "old" notifications
    const oldAlerts = notifications.filter(n => 
      n.time.includes('day') || n.time.includes('days') || n.time.includes('week') || n.time.includes('ago') && !n.time.includes('2 hours')
    );
    
    if (oldAlerts.length === 0) {
      showToastMessage('No old notifications found to sweep.', 'info');
      return;
    }

    setNotifications(prev => prev.filter(n => !oldAlerts.some(o => o.id === n.id)));
    setDeletedNotifs(prev => [...oldAlerts, ...prev]);
    showToastMessage(`AI swept ${oldAlerts.length} older alert(s) to Recycle Bin.`, 'success');
  };

  // 5. Auth (Login & Register) flows
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      showToastMessage('Please enter both email and password.', 'error');
      return;
    }

    // Custom flow helper: If signing in, restore Sarah's defaults or make a new customized one
    let targetName = 'Sarah Lim';
    let targetPoints = 3450;
    let targetTier: 'Silver' | 'Gold' | 'Platinum' = 'Gold';

    if (authEmail.toLowerCase().includes('sarah')) {
      targetName = 'Sarah Lim';
      targetPoints = 3450;
      targetTier = 'Gold';
    } else {
      // Create new profile based on email prefix
      const prefix = authEmail.split('@')[0];
      targetName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      targetPoints = 1500;
      targetTier = 'Gold';
    }

    setUser({
      email: authEmail,
      name: targetName,
      points: targetPoints,
      tier: targetTier
    });

    setAuthScreen(null); // Return to app
    showToastMessage(`Welcome back, ${targetName}!`, 'success');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword || !authName.trim()) {
      showToastMessage('Please fill in all requested fields.', 'error');
      return;
    }

    setUser({
      email: authEmail,
      name: authName.trim(),
      points: 500, // Gift 500 starting loyalty points for signing up!
      tier: 'Silver'
    });

    // Create welcome promo notification
    const welcomeNotif: Notification = {
      id: `notif_w_${Date.now()}`,
      title: '🎁 Welcome Loyalty Gift!',
      description: `Welcome to RHB Mall family, ${authName}! We have credited 500 free loyalty points to your brand new Digital Card. Start shopping to earn more!`,
      time: 'Just now',
      type: 'reward',
      isRead: false
    };
    setNotifications(prev => [welcomeNotif, ...prev]);

    setAuthScreen(null); // Return to app
    showToastMessage(`Account created! +500 Welcome Points awarded!`, 'success');
  };

  const handleLogout = () => {
    setUser(null);
    setAuthScreen('login');
    showToastMessage('Logged out successfully.', 'info');
  };

  // Filter stores
  const filteredStores = useMemo(() => {
    return INITIAL_STORES.filter(store => {
      const matchSearch = store.name.toLowerCase().includes(directorySearch.toLowerCase()) || 
                          store.category.toLowerCase().includes(directorySearch.toLowerCase()) ||
                          store.location.toLowerCase().includes(directorySearch.toLowerCase());
      
      const matchCategory = directoryCategory === 'All' || 
                            store.category.includes(directoryCategory) ||
                            (directoryCategory === 'Fashion' && store.category.includes('Apparel')) ||
                            (directoryCategory === 'Beverage' && store.category.includes('Cafe')) ||
                            (directoryCategory === 'Health' && store.category.includes('Beauty'));
      
      return matchSearch && matchCategory;
    });
  }, [directorySearch, directoryCategory]);

  return (
    <PhoneSimulator>
      {/* Absolute Toast Overlay */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 12, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute top-14 left-4 right-4 z-50 pointer-events-none"
          >
            <div className={`p-3.5 rounded-2xl shadow-xl backdrop-blur-md border flex items-center gap-2.5 text-xs font-semibold ${
              toast.type === 'success' 
                ? 'bg-emerald-500/95 text-white border-emerald-400'
                : toast.type === 'error'
                  ? 'bg-rose-500/95 text-white border-rose-400'
                  : 'bg-slate-900/95 text-white border-slate-800'
            }`}>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <CheckCircle className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="flex-1">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RENDER BODY BASED ON LOGIN STATUS */}
      {authScreen === 'login' && (
        <div id="login-page" className="flex-1 bg-white px-6 py-6 flex flex-col justify-between overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-5 mt-3">
            {/* Top Toolbar with Help */}
            <div className="flex justify-end">
              <button
                onClick={() => setOpenSupportModal(true)}
                className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full cursor-pointer transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#C5A028]" />
                <span>Help & Support</span>
              </button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-[22px] bg-gradient-to-tr from-[#D4AF37] to-[#C5A028] shadow-md shadow-[#C5A028]/20 flex items-center justify-center text-white text-3xl font-extrabold mx-auto mb-2">
                R
              </div>
              <h2 className="text-xl font-black tracking-tight text-[#1C1C1E]">RHB Mall</h2>
              <p className="text-[#8E8E93] text-[11px] mt-0.5">Sleek Digital Loyalty Ecosystem</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-3.5 mt-2">
              <div>
                <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="sarah.lim@gmail.com"
                    required
                    className="w-full bg-[#F2F2F7] border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A028] font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#F2F2F7] border border-slate-200 rounded-2xl pl-10 pr-10 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A028] font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password Toolbar */}
              <div className="flex items-center justify-between px-0.5 text-xs font-bold text-slate-500">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#C5A028] focus:ring-[#C5A028] border-slate-300 w-4 h-4 cursor-pointer"
                  />
                  <span>Remember Me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setOpenForgotPasswordModal(true)}
                  className="text-[#C5A028] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#1C1C1E] text-white rounded-2xl py-3 text-xs font-bold shadow-md hover:bg-black mt-1 cursor-pointer"
              >
                Sign In
              </motion.button>
            </form>

            {/* MODERN BIOMETRIC & GOOGLE LOGIN OPTIONS */}
            <div className="mt-3">
              <div className="flex items-center gap-2 text-slate-300 text-[10px] font-bold uppercase tracking-wider mb-2.5">
                <div className="flex-1 h-px bg-slate-100" />
                <span>Or Express Biometrics</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {/* Face ID Option */}
                <button
                  type="button"
                  onClick={() => {
                    setBiometricScanType('FaceID');
                    setBiometricScanning(true);
                    setBiometricScanSuccess(false);
                    playNotificationSound('chime');
                    // Simulate automatic successful login after scanning sequence
                    setTimeout(() => {
                      setBiometricScanSuccess(true);
                      playNotificationSound('bell');
                      setTimeout(() => {
                        setBiometricScanning(false);
                        // Log in as Sarah
                        setUser({
                          email: 'sarah.lim@gmail.com',
                          name: 'Sarah Lim',
                          points: 3450,
                          tier: 'Gold'
                        });
                        setAuthScreen(null);
                        showToastMessage('Face ID login successful!', 'success');
                      }, 1000);
                    }, 2200);
                  }}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200/60 p-2.5 rounded-2xl flex flex-col items-center gap-1 cursor-pointer transition-colors"
                >
                  <span className="text-xl">👤</span>
                  <span className="text-[9px] font-black text-slate-700">Face ID</span>
                </button>

                {/* Fingerprint Option */}
                <button
                  type="button"
                  onClick={() => {
                    setBiometricScanType('Fingerprint');
                    setBiometricScanning(true);
                    setBiometricScanSuccess(false);
                    playNotificationSound('chime');
                    // Simulate automatic successful login after scanning sequence
                    setTimeout(() => {
                      setBiometricScanSuccess(true);
                      playNotificationSound('bell');
                      setTimeout(() => {
                        setBiometricScanning(false);
                        // Log in as Sarah
                        setUser({
                          email: 'sarah.lim@gmail.com',
                          name: 'Sarah Lim',
                          points: 3450,
                          tier: 'Gold'
                        });
                        setAuthScreen(null);
                        showToastMessage('Fingerprint login successful!', 'success');
                      }, 1000);
                    }, 2200);
                  }}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200/60 p-2.5 rounded-2xl flex flex-col items-center gap-1 cursor-pointer transition-colors"
                >
                  <span className="text-xl">👆</span>
                  <span className="text-[9px] font-black text-slate-700">Touch ID</span>
                </button>

                {/* Google Account */}
                <button
                  type="button"
                  onClick={() => {
                    playNotificationSound('vibes');
                    showToastMessage('Connecting Google Account...', 'info');
                    setTimeout(() => {
                      setUser({
                        email: 'google.guest@gmail.com',
                        name: 'Google Guest',
                        points: 1200,
                        tier: 'Gold'
                      });
                      setAuthScreen(null);
                      showToastMessage('Signed in via Google Account!', 'success');
                    }, 1200);
                  }}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200/60 p-2.5 rounded-2xl flex flex-col items-center gap-1 cursor-pointer transition-colors"
                >
                  <span className="text-xl">🌐</span>
                  <span className="text-[9px] font-black text-slate-700">Google</span>
                </button>
              </div>
            </div>

            {/* Design Tester Notice */}
            <div className="bg-[#C5A028]/10 rounded-2xl p-3 border border-[#C5A028]/20 flex gap-2.5 items-start mt-1">
              <Sparkles className="w-4 h-4 text-[#C5A028] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-extrabold text-[#C5A028]">Loyalty Demo Profile</p>
                <p className="text-[9px] text-[#C5A028]/90 leading-normal mt-0.5">
                  Use <strong>sarah.lim@gmail.com</strong> for instant Gold tier credentials, or tap any of the biometric logs to simulate rapid secure entry!
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-xs text-slate-500">
              Don't have an account?{' '}
              <button 
                onClick={() => {
                  setAuthScreen('signup');
                  setAuthEmail('');
                  setAuthPassword('');
                }} 
                className="font-black text-[#C5A028] hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      )}

      {authScreen === 'signup' && (
        <div id="signup-page" className="flex-1 bg-white px-6 py-8 flex flex-col justify-between">
          <div className="flex flex-col gap-5 mt-4">
            <div className="text-center">
              <h2 className="text-2xl font-black tracking-tight text-[#1C1C1E]">Join RHB Mall</h2>
              <p className="text-slate-400 text-xs mt-1">Create your smart membership account</p>
            </div>

            <form onSubmit={handleSignup} className="flex flex-col gap-3.5 mt-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-3.5 text-slate-400 w-4.5 h-4.5" />
                  <input
                    type="text"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="Sarah Lim"
                    required
                    className="w-full bg-[#F2F2F7] border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 text-slate-400 w-4.5 h-4.5" />
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="sarah.lim@gmail.com"
                    required
                    className="w-full bg-[#F2F2F7] border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 text-slate-400 w-4.5 h-4.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#F2F2F7] border border-slate-200 rounded-2xl pl-11 pr-11 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 leading-relaxed px-1">
                By creating an account, you agree to RHB Mall's{" "}
                <button
                  type="button"
                  onClick={() => setOpenTermsModal(true)}
                  className="font-black text-[#C5A028] hover:underline inline-block align-baseline cursor-pointer"
                >
                  Loyalty Terms & Conditions
                </button>
                . You will automatically receive <strong>500 welcome points</strong>!
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#1C1C1E] text-white rounded-2xl py-3.5 text-sm font-bold shadow-md hover:bg-black mt-1 cursor-pointer"
              >
                Create Account
              </motion.button>
            </form>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <button 
                onClick={() => {
                  setAuthScreen('login');
                  setAuthEmail('');
                  setAuthPassword('');
                }} 
                className="font-bold text-[#C5A028] hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      )}

      {/* MAIN LOGGED-IN VIEWPORT */}
      {!authScreen && user && (
        <div className="flex-grow flex flex-col justify-between bg-[#F2F2F7]">
          
          {/* TOP APP HEADER BAR */}
          <div className="bg-white px-5 py-3.5 flex items-center justify-between border-b border-[#F2F2F7] shrink-0 sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#D4AF37] to-[#C5A028] flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
                R
              </div>
              <span className="font-extrabold text-[#1C1C1E] tracking-tight text-base">RHB Mall</span>
            </div>

            {/* Notification alert icon */}
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpenNotificationsModal(true)}
                className="relative p-2 rounded-xl bg-[#F2F2F7] hover:bg-[#E5E5EA] text-[#1C1C1E] transition-colors cursor-pointer"
              >
                <Bell className="w-4.5 h-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </motion.button>
            </div>
          </div>

          {/* MAIN CONTAINER PANEL */}
          <div className="flex-grow overflow-y-auto no-scrollbar">

            {/* SCREEN 1: HOME PAGE */}
            {activeTab === 'home' && (
              <div id="home-screen" className="flex flex-col gap-1 pb-6">
                
                {/* Dynamic Welcome Greeting */}
                <div className="px-5 pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-[#8E8E93] font-bold uppercase tracking-wider">Membership Tier</p>
                    <h1 className="text-xl font-black text-[#1C1C1E] tracking-tight mt-0.5">{user.tier} Member</h1>
                  </div>
                  <span className="text-xs font-semibold bg-white text-[#1C1C1E] px-3.5 py-1.5 rounded-full border border-slate-200/60 flex items-center gap-1.5 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A028]" />
                    Hi, {user.name.split(' ')[0]}
                  </span>
                </div>

                {/* DIGITAL MEMBERSHIP CARD */}
                <MembershipCard 
                  user={user} 
                  onOpenQR={() => setOpenQRModal(true)} 
                  onOpenTiers={() => setOpenTiersModal(true)} 
                />

                {/* QUICK ACTION GRID (2x4) */}
                <div className="px-5 py-3.5">
                  <h3 className="text-[10px] font-black text-[#8E8E93] uppercase tracking-widest mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-4 gap-3">
                    
                    {/* 1. Parking */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setOpenVehicleModal(true)}
                      className="bg-white border border-slate-100/50 rounded-[18px] p-2 flex flex-col items-center justify-center text-center shadow-2xs hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-[14px] bg-[#F2F2F7] text-[#1C1C1E] flex items-center justify-center mb-1.5">
                        <Car className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-medium text-[#1C1C1E] tracking-tight leading-none">Parking</span>
                    </motion.button>

                    {/* 2. Transactions */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setOpenTransactionsModal(true)}
                      className="bg-white border border-slate-100/50 rounded-[18px] p-2 flex flex-col items-center justify-center text-center shadow-2xs hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-[14px] bg-[#F2F2F7] text-[#1C1C1E] flex items-center justify-center mb-1.5">
                        <History className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-medium text-[#1C1C1E] tracking-tight leading-none">Activity</span>
                    </motion.button>

                    {/* 3. Vouchers (Catalog) */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveTab('vouchers');
                        setVoucherFilter('redeem');
                      }}
                      className="bg-white border border-slate-100/50 rounded-[18px] p-2 flex flex-col items-center justify-center text-center shadow-2xs hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-[14px] bg-[#F2F2F7] text-[#1C1C1E] flex items-center justify-center mb-1.5">
                        <Ticket className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-medium text-[#1C1C1E] tracking-tight leading-none">Vouchers</span>
                    </motion.button>

                    {/* 4. My Vouchers */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveTab('vouchers');
                        setVoucherFilter('my-available');
                      }}
                      className="bg-white border border-slate-100/50 rounded-[18px] p-2 flex flex-col items-center justify-center text-center shadow-2xs hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-[14px] bg-[#F2F2F7] text-[#1C1C1E] flex items-center justify-center mb-1.5">
                        <Percent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-medium text-[#1C1C1E] tracking-tight leading-none">Rewards</span>
                    </motion.button>

                    {/* 5. Stores Directory */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab('directory')}
                      className="bg-white border border-slate-100/50 rounded-[18px] p-2 flex flex-col items-center justify-center text-center shadow-2xs hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-[14px] bg-[#F2F2F7] text-[#1C1C1E] flex items-center justify-center mb-1.5">
                        <StoreIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-medium text-[#1C1C1E] tracking-tight leading-none">Stores</span>
                    </motion.button>

                    {/* 6. Membership Tiers info */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setOpenTiersModal(true)}
                      className="bg-white border border-slate-100/50 rounded-[18px] p-2 flex flex-col items-center justify-center text-center shadow-2xs hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-[14px] bg-[#F2F2F7] text-[#1C1C1E] flex items-center justify-center mb-1.5">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-medium text-[#1C1C1E] tracking-tight leading-none">Tiers</span>
                    </motion.button>

                    {/* 7. Promotions List */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setOpenPromoModal({
                          title: 'Special Summer Deals',
                          storeId: 'nike',
                          description: 'Discover massive savings across top fashion, cafe, and athletic merchants in RHB Mall this weekend! Earn double loyalty points on select fashion purchases.',
                          promoText: 'Summer Double-Up Extravaganza',
                          image: '🛍️'
                        });
                      }}
                      className="bg-white border border-slate-100/50 rounded-[18px] p-2 flex flex-col items-center justify-center text-center shadow-2xs hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-[14px] bg-[#F2F2F7] text-[#1C1C1E] flex items-center justify-center mb-1.5">
                        <Megaphone className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-medium text-[#1C1C1E] tracking-tight leading-none">Deals</span>
                    </motion.button>

                    {/* 8. User Profile shortcut */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab('profile')}
                      className="bg-white border border-slate-100/50 rounded-[18px] p-2 flex flex-col items-center justify-center text-center shadow-2xs hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-[14px] bg-[#F2F2F7] text-[#1C1C1E] flex items-center justify-center mb-1.5">
                        <UserIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-medium text-[#1C1C1E] tracking-tight leading-none">Profile</span>
                    </motion.button>

                  </div>
                </div>

                {/* BOTTOM SECTION: SCROLLABLE PROMOTION BANNERS */}
                <div className="px-5 mt-2 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Seasonal Highlights</h3>
                    <span className="text-[11px] text-amber-600 font-bold">Slide to view</span>
                  </div>

                  {/* Horizontal Scroll wrapper */}
                  <div className="flex gap-4 overflow-x-auto no-scrollbar pb-3 px-0.5 -mx-1">
                    
                    {/* Banner 1: Nike Sale */}
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setOpenPromoModal({
                        title: 'Nike End of Season Sale',
                        storeId: 'nike',
                        description: 'Nike is offering massive clearance on running sneakers, training apparel, and activewear accessories. Upgrade your athletic gear today!',
                        promoText: 'Up to 40% OFF Premium Gear',
                        image: '👟'
                      })}
                      className="w-[280px] shrink-0 h-[125px] bg-gradient-to-r from-zinc-900 to-slate-800 rounded-2xl p-4.5 flex flex-col justify-between text-white shadow-md relative overflow-hidden cursor-pointer"
                    >
                      <div className="absolute right-2 bottom-0 text-7xl opacity-10 font-black pointer-events-none">NIKE</div>
                      <div>
                        <span className="text-[9px] font-extrabold uppercase bg-white/25 px-2 py-0.5 rounded-full tracking-wider">LIMITED TIME</span>
                        <h4 className="text-base font-extrabold tracking-tight mt-1.5">Nike End-Season Sale</h4>
                      </div>
                      <p className="text-[11px] text-zinc-300 font-semibold flex items-center gap-1">
                        <span>Get Up to 40% off</span>
                        <ChevronRight className="w-3 h-3" />
                      </p>
                    </motion.div>

                    {/* Banner 2: Starbucks BOGO */}
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setOpenPromoModal({
                        title: 'Starbucks Buy 1 Free 1',
                        storeId: 'starbucks',
                        description: 'Sip on hand-crafted Summer Frappuccinos! Buy any promotional Frappuccino beverage and get the second one entirely free. Exclusive to Gold & Platinum loyalty tiers.',
                        promoText: 'Frappuccino Buy 1 Free 1',
                        image: '☕'
                      })}
                      className="w-[280px] shrink-0 h-[125px] bg-gradient-to-r from-emerald-800 to-teal-700 rounded-2xl p-4.5 flex flex-col justify-between text-white shadow-md relative overflow-hidden cursor-pointer"
                    >
                      <div className="absolute right-2 bottom-0 text-7xl opacity-10 pointer-events-none">☕</div>
                      <div>
                        <span className="text-[9px] font-extrabold uppercase bg-white/20 px-2 py-0.5 rounded-full tracking-wider">BOGO ALERT</span>
                        <h4 className="text-base font-extrabold tracking-tight mt-1.5">Starbucks Buy 1 Free 1</h4>
                      </div>
                      <p className="text-[11px] text-emerald-100 font-semibold flex items-center gap-1">
                        <span>Tap to claim code</span>
                        <ChevronRight className="w-3 h-3" />
                      </p>
                    </motion.div>

                    {/* Banner 3: Uniqlo Weekend deals */}
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setOpenPromoModal({
                        title: 'Uniqlo Weekend Deals',
                        storeId: 'uniqlo',
                        description: 'Restock your wardrobe essentials. Enjoy exclusive seasonal pricing on AIRism innerwear, premium linen shirts, and high-stretch denim jackets. Minimal designs, ultimate comfort.',
                        promoText: 'AIRism from RM59',
                        image: '🔴'
                      })}
                      className="w-[280px] shrink-0 h-[125px] bg-gradient-to-r from-red-600 to-rose-500 rounded-2xl p-4.5 flex flex-col justify-between text-white shadow-md relative overflow-hidden cursor-pointer"
                    >
                      <div className="absolute right-2 bottom-0 text-7xl opacity-10 pointer-events-none">U</div>
                      <div>
                        <span className="text-[9px] font-extrabold uppercase bg-white/20 px-2 py-0.5 rounded-full tracking-wider">WEEKEND SPEC</span>
                        <h4 className="text-base font-extrabold tracking-tight mt-1.5">Uniqlo Comfort Deals</h4>
                      </div>
                      <p className="text-[11px] text-red-100 font-semibold flex items-center gap-1">
                        <span>View items inside</span>
                        <ChevronRight className="w-3 h-3" />
                      </p>
                    </motion.div>

                  </div>
                </div>

                {/* VISUAL REASSURANCE TIPS */}
                <div className="mx-5 mt-2 p-4 bg-white border border-slate-100 rounded-2xl flex items-start gap-3 shadow-xs">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Quick Loyalty Multiplier Rule</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                      Sarah Lim is currently on the <span className="font-semibold text-slate-800">Gold Tier (1.5x)</span>. Every RM1 spent awards 1.5 points. Hit 5,000 points to unlock Platinum (2x)!
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* SCREEN 2: STORE DIRECTORY */}
            {activeTab === 'directory' && (
              <div id="directory-screen" className="px-5 py-4 flex flex-col gap-4">
                <div>
                  <h1 className="text-xl font-black text-slate-900 tracking-tight">Mall Directory</h1>
                  <p className="text-xs text-slate-400 mt-0.5">Explore premium stores at RHB Mall</p>
                </div>

                {/* Modern search bar */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-3 text-slate-400 w-4.5 h-4.5" />
                  <input
                    type="text"
                    value={directorySearch}
                    onChange={(e) => setDirectorySearch(e.target.value)}
                    placeholder="Search stores, tags, locations..."
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-slate-400 font-medium shadow-xs"
                  />
                  {directorySearch && (
                    <button 
                      onClick={() => setDirectorySearch('')}
                      className="absolute right-3.5 top-3 text-slate-400 focus:outline-none cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {['All', 'Fashion', 'Sports', 'Beverage', 'Health', 'Books'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setDirectoryCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        directoryCategory === cat
                          ? 'bg-slate-900 text-white'
                          : 'bg-white text-slate-600 border border-slate-100 shadow-2xs hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Directory Store List */}
                <div className="flex flex-col gap-3">
                  {filteredStores.length > 0 ? (
                    filteredStores.map(store => (
                      <motion.div
                        key={store.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedStore(store)}
                        className="bg-white border border-slate-100/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        {/* Store Icon */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${store.logoBg}`}>
                          {store.logo}
                        </div>
                        {/* Store details info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-extrabold text-sm text-slate-900 truncate tracking-tight">{store.name}</h3>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{store.category}</p>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{store.location}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 shrink-0" />
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-white border border-slate-100 rounded-2xl">
                      <p className="text-xs text-slate-400">No matching merchants found.</p>
                      <button 
                        onClick={() => { setDirectorySearch(''); setDirectoryCategory('All'); }}
                        className="text-xs text-amber-600 font-bold mt-2 hover:underline cursor-pointer"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* SCREEN 3: VOUCHERS MARKETPLACE */}
            {activeTab === 'vouchers' && (
              <div id="vouchers-screen" className="px-5 py-4 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">Mall Vouchers</h1>
                    <p className="text-xs text-slate-400 mt-0.5">Redeem points or view active coupons</p>
                  </div>
                  {/* Small Points box */}
                  <div className="bg-amber-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                    <span>{user.points.toLocaleString()}</span>
                    <span className="text-[10px] font-normal">pts</span>
                  </div>
                </div>

                {/* Sub-tab Filter Switch */}
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setVoucherFilter('redeem')}
                    className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      voucherFilter === 'redeem'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Redeem Rewards
                  </button>
                  <button
                    onClick={() => setVoucherFilter('my-available')}
                    className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer relative ${
                      voucherFilter.startsWith('my')
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    My Vouchers
                    {myVouchers.filter(v => v.status === 'available').length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[8px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full border border-white">
                        {myVouchers.filter(v => v.status === 'available').length}
                      </span>
                    )}
                  </button>
                </div>

                {/* Catalog view: REDEEMABLE VOUCHERS */}
                {voucherFilter === 'redeem' && (
                  <div className="flex flex-col gap-3">
                    {INITIAL_REDEEMABLE_VOUCHERS.map(voucher => {
                      const canAfford = user.points >= voucher.pointsCost;
                      return (
                        <div
                          key={voucher.id}
                          className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 shadow-2xs relative overflow-hidden"
                        >
                          {/* Left icon circle */}
                          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl shrink-0">
                            {voucher.image}
                          </div>

                          {/* Info section */}
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                              {voucher.category}
                            </span>
                            <h3 className="font-extrabold text-sm text-slate-900 mt-1 tracking-tight">{voucher.title}</h3>
                            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{voucher.description}</p>
                            
                            <div className="flex items-center gap-1 mt-2">
                              <span className="text-xs font-extrabold text-slate-900">{voucher.pointsCost}</span>
                              <span className="text-[10px] text-slate-500">points</span>
                            </div>
                          </div>

                          {/* Action button */}
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            disabled={!canAfford}
                            onClick={() => handleRedeemVoucher(voucher)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer ${
                              canAfford 
                                ? 'bg-slate-900 text-white hover:bg-slate-800' 
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            Redeem
                          </motion.button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Sub-tab view: MY REDEEMED VOUCHERS */}
                {voucherFilter.startsWith('my') && (
                  <div className="flex flex-col gap-4">
                    {/* Tiny state togglers for my vouchers */}
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => setVoucherFilter('my-available')}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          voucherFilter === 'my-available'
                            ? 'bg-slate-900 text-white'
                            : 'bg-white text-slate-500 border border-slate-100 shadow-2xs'
                        }`}
                      >
                        Available
                      </button>
                      <button
                        onClick={() => setVoucherFilter('my-used')}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          voucherFilter === 'my-used'
                            ? 'bg-slate-900 text-white'
                            : 'bg-white text-slate-500 border border-slate-100 shadow-2xs'
                        }`}
                      >
                        Used / Expired
                      </button>
                    </div>

                    {/* Vouchers list filtered */}
                    {myVouchers.filter(v => 
                      voucherFilter === 'my-available' ? v.status === 'available' : v.status === 'used'
                    ).length > 0 ? (
                      <div className="flex flex-col gap-3">
                        {myVouchers
                          .filter(v => voucherFilter === 'my-available' ? v.status === 'available' : v.status === 'used')
                          .map(voucher => (
                            <div
                              key={voucher.id}
                              className={`border rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs relative overflow-hidden transition-all duration-300 ${
                                voucher.status === 'used'
                                  ? 'bg-slate-100/50 border-slate-200/50 opacity-60'
                                  : 'bg-white border-slate-100 hover:border-slate-200'
                              }`}
                            >
                              {/* Left icon */}
                              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0">
                                {voucher.image}
                              </div>

                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-extrabold text-sm text-slate-900 tracking-tight">{voucher.title}</h4>
                                <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">{voucher.description}</p>
                                <div className="flex items-center gap-2 mt-2 text-[9px] text-slate-400 font-bold">
                                  <span>CODE: {voucher.code}</span>
                                  <span>•</span>
                                  <span>EXP: {voucher.expiryDate}</span>
                                </div>
                              </div>

                              {/* Open QR / barcode button */}
                              {voucher.status === 'available' ? (
                                <motion.button
                                  whileTap={{ scale: 0.92 }}
                                  onClick={() => setActiveBarcodeVoucher(voucher)}
                                  className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-extrabold text-xs shrink-0 cursor-pointer"
                                >
                                  Use
                                </motion.button>
                              ) : (
                                <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-200/50 px-2.5 py-1 rounded-lg shrink-0">
                                  Used
                                </span>
                              )}
                            </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 bg-white border border-slate-100 rounded-2xl">
                        <p className="text-xs text-slate-400">
                          {voucherFilter === 'my-available' 
                            ? 'No active vouchers available.' 
                            : 'No history of used vouchers.'}
                        </p>
                        {voucherFilter === 'my-available' && (
                          <button 
                            onClick={() => setVoucherFilter('redeem')}
                            className="text-xs text-amber-600 font-bold mt-2 hover:underline cursor-pointer"
                          >
                            Redeem a Reward Now
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* SCREEN 4: USER PROFILE */}
            {activeTab === 'profile' && (
              <div id="profile-screen" className="px-5 py-4 flex flex-col gap-5 pb-6">
                
                {/* Visual Avatar Card */}
                <div className="bg-white border border-slate-100 rounded-[28px] p-5 flex items-center gap-4 shadow-2xs">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white font-extrabold flex items-center justify-center text-xl shadow-md">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h2 className="text-base font-extrabold tracking-tight text-slate-900">{user.name}</h2>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{user.email}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {user.tier} Tier
                      </span>
                    </div>
                  </div>
                </div>

                {/* Points Card */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-4.5 text-white flex justify-between items-center shadow-md">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Loyalty Wallet</span>
                    <p className="text-2xl font-black mt-0.5">{user.points.toLocaleString()} pts</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('vouchers');
                      setVoucherFilter('redeem');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                  >
                    Browse Catalog
                  </button>
                </div>

                {/* Sub Menu Links */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-1">Ecosystem Controls</h3>
                  
                  {/* 1. Vehicle Registration */}
                  <button
                    onClick={() => setOpenVehicleModal(true)}
                    className="bg-white border border-slate-100 rounded-2xl px-4 py-3.5 flex items-center justify-between text-left shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                        <Car className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800">My Registered Vehicles</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">{vehicles.length} plate codes saved</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4.5 h-4.5 text-slate-300" />
                  </button>

                  {/* 2. Transaction Logs */}
                  <button
                    onClick={() => setOpenTransactionsModal(true)}
                    className="bg-white border border-slate-100 rounded-2xl px-4 py-3.5 flex items-center justify-between text-left shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-violet-50 text-violet-600 rounded-xl">
                        <History className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800">Loyalty Transactions History</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">View purchase points logs</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4.5 h-4.5 text-slate-300" />
                  </button>

                  {/* 3. Membership Tier Rules */}
                  <button
                    onClick={() => setOpenTiersModal(true)}
                    className="bg-white border border-slate-100 rounded-2xl px-4 py-3.5 flex items-center justify-between text-left shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                        <Award className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800">Ecosystem Tier Structure</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">RM1 spent = 1 pt. Silver, Gold, Platinum</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4.5 h-4.5 text-slate-300" />
                  </button>

                  {/* 4. Loyalty Terms & Conditions */}
                  <button
                    onClick={() => setOpenTermsModal(true)}
                    className="bg-white border border-slate-100 rounded-2xl px-4 py-3.5 flex items-center justify-between text-left shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-50 text-[#C5A028] rounded-xl">
                        <Shield className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800">Loyalty Terms & Conditions</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">Usable simplified summaries & translations</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4.5 h-4.5 text-slate-300" />
                  </button>
                </div>

                {/* Bottom App Controls */}
                <div className="flex flex-col gap-2 mt-2">
                  <div className="p-4 bg-white border border-slate-100 rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-800">Simulate Push Notifications</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal mb-3">
                      You can trigger a birthday-multiplier purchase simulation inside Sarah's loyalty barcode scanner popup.
                    </p>
                  </div>

                  {/* Logout Button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="w-full py-3 rounded-2xl border border-rose-100 hover:bg-rose-50/50 text-rose-600 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out of Profile</span>
                  </motion.button>
                </div>

                <div className="text-center text-[10px] text-slate-400 font-semibold mt-4">
                  RHB Mall Prototype v2.1 • Design Thinking Spec
                </div>
              </div>
            )}

          </div>

          {/* APP BOTTOM NAVIGATION TAB-BAR */}
          <div className="bg-white/95 backdrop-blur-md border-t border-slate-100 h-[68px] px-6 flex items-center justify-between shrink-0 sticky bottom-0 z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
            
            {/* Tab 1: Home */}
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                activeTab === 'home' ? 'text-[#C5A028]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <HomeIcon className="w-5.5 h-5.5" strokeWidth={activeTab === 'home' ? 2.5 : 2} />
              <span className="text-[9px] font-bold uppercase tracking-wider">Home</span>
            </button>

            {/* Tab 2: Directory */}
            <button
              onClick={() => setActiveTab('directory')}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                activeTab === 'directory' ? 'text-[#C5A028]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <StoreIcon className="w-5.5 h-5.5" strokeWidth={activeTab === 'directory' ? 2.5 : 2} />
              <span className="text-[9px] font-bold uppercase tracking-wider">Stores</span>
            </button>

            {/* Tab 3: Vouchers */}
            <button
              onClick={() => setActiveTab('vouchers')}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-colors relative ${
                activeTab === 'vouchers' ? 'text-[#C5A028]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Ticket className="w-5.5 h-5.5" strokeWidth={activeTab === 'vouchers' ? 2.5 : 2} />
              <span className="text-[9px] font-bold uppercase tracking-wider">Vouchers</span>
              {myVouchers.filter(v => v.status === 'available').length > 0 && (
                <span className="absolute top-0 right-1 bg-emerald-500 text-white text-[8px] w-2 h-2 rounded-full border border-white" />
              )}
            </button>

            {/* Tab 4: Profile */}
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                activeTab === 'profile' ? 'text-[#C5A028]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <UserIcon className="w-5.5 h-5.5" strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
              <span className="text-[9px] font-bold uppercase tracking-wider">Profile</span>
            </button>

          </div>

        </div>
      )}

      {/* --- ALL APP OVERLAY MODALS & SHEETS (iOS Styled Drawers) --- */}
      <AnimatePresence>
        
        {/* 1. DIGITAL MEMBERSHIP QR SCANNER MODAL & CASHIER SIMULATOR */}
        {openQRModal && user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end"
          >
            {/* Tap outside to close background */}
            <div className="absolute inset-0" onClick={() => setOpenQRModal(false)} />

            {/* Slide-up content sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white rounded-t-[32px] p-6 z-10 flex flex-col gap-5 max-h-[90%] overflow-y-auto no-scrollbar shadow-2xl relative border-t border-slate-100"
            >
              {/* iOS bar notch handle */}
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto self-center shrink-0" />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">Your Member QR Code</h3>
                  <p className="text-xs text-slate-400">Present to cashier to scan & collect points</p>
                </div>
                <button
                  onClick={() => setOpenQRModal(false)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Digital Barcode / QR display section */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col items-center justify-center text-center">
                
                {/* Simulated high contrast QR Code block */}
                <div className="w-48 h-48 bg-white rounded-xl border border-slate-200 p-3 flex items-center justify-center relative shadow-xs">
                  {/* Outer QR corners */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-3 border-l-3 border-slate-900" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-3 border-r-3 border-slate-900" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-3 border-l-3 border-slate-900" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-3 border-r-3 border-slate-900" />
                  
                  {/* High quality Mock Vector QR matrix using layout blocks */}
                  <div className="grid grid-cols-5 gap-1.5 w-36 h-36 opacity-90">
                    <div className="bg-slate-900 rounded-xs" />
                    <div className="bg-slate-900 rounded-xs" />
                    <div className="bg-slate-100" />
                    <div className="bg-slate-900 rounded-xs" />
                    <div className="bg-slate-900 rounded-xs" />

                    <div className="bg-slate-100" />
                    <div className="bg-slate-100" />
                    <div className="bg-slate-900 rounded-xs" />
                    <div className="bg-slate-100" />
                    <div className="bg-slate-100" />

                    <div className="bg-slate-900 rounded-xs" />
                    <div className="bg-slate-100" />
                    <div className="bg-slate-900 rounded-xs" />
                    <div className="bg-slate-900 rounded-xs" />
                    <div className="bg-slate-100" />

                    <div className="bg-slate-100" />
                    <div className="bg-slate-900 rounded-xs" />
                    <div className="bg-slate-100" />
                    <div className="bg-slate-100" />
                    <div className="bg-slate-900 rounded-xs" />

                    <div className="bg-slate-900 rounded-xs" />
                    <div className="bg-slate-900 rounded-xs" />
                    <div className="bg-slate-100" />
                    <div className="bg-slate-900 rounded-xs" />
                    <div className="bg-slate-900 rounded-xs" />
                  </div>
                </div>

                <p className="text-xs font-mono font-black tracking-widest text-slate-700 mt-3 uppercase">
                  RHB-MEMBER-{user.name.split(' ')[0].toUpperCase()}-G92A
                </p>
                <p className="text-[10px] text-slate-400 mt-1">Updates every 60s for security</p>
              </div>

              {/* CASHIER SIMULATOR COMPONENT */}
              <CashierSimulator
                user={user}
                stores={INITIAL_STORES}
                onAddTransaction={handleAddTransaction}
                onClose={() => setOpenQRModal(false)}
              />
            </motion.div>
          </motion.div>
        )}

        {/* 2. VEHICLE PARKING MANAGER MODAL */}
        {openVehicleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end"
          >
            <div className="absolute inset-0" onClick={() => setOpenVehicleModal(false)} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white rounded-t-[32px] p-6 z-10 flex flex-col gap-4 max-h-[90%] overflow-y-auto no-scrollbar shadow-2xl relative"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto self-center shrink-0" />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">Vehicle Parking</h3>
                  <p className="text-xs text-slate-400">Register vehicles and simulate mall departures</p>
                </div>
                <button
                  onClick={() => setOpenVehicleModal(false)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Vehicles list */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saved Vehicles ({vehicles.length}/3)</span>
                  <span className="text-[10px] text-slate-400">Limit: 3 registered</span>
                </div>

                {vehicles.length > 0 ? (
                  vehicles.map(v => (
                    <div
                      key={v.id}
                      className={`p-4 rounded-2xl border flex items-center justify-between shadow-2xs transition-all duration-300 ${
                        v.status === 'Vehicle Exited'
                          ? 'bg-slate-50 border-slate-200 text-slate-400'
                          : 'bg-white border-blue-100 hover:border-blue-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Status Icon */}
                        <div className={`p-2 rounded-xl shrink-0 ${
                          v.status === 'Vehicle Exited' ? 'bg-slate-200 text-slate-400' : 'bg-blue-50 text-blue-600'
                        }`}>
                          <Car className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black uppercase tracking-wide">{v.plateNumber}</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              v.status === 'Vehicle Exited' 
                                ? 'bg-slate-200 text-slate-500' 
                                : 'bg-blue-100 text-blue-700 animate-pulse'
                            }`}>
                              {v.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{v.nickname} • {v.color} {v.type}</p>
                          <p className="text-[9px] text-slate-400 mt-1">
                            {v.status === 'Parked' ? `Entered: ${v.entryTime}` : `Exited: ${v.exitTime}`}
                          </p>
                        </div>
                      </div>

                      {/* Action trigger */}
                      <div className="flex items-center gap-2">
                        {v.status === 'Parked' && (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSimulateVehicleExit(v.id)}
                            className="px-2.5 py-1.5 bg-slate-900 text-white rounded-xl text-[10px] font-bold shadow-xs hover:bg-slate-800 cursor-pointer"
                          >
                            Exit
                          </motion.button>
                        )}
                        <button
                          onClick={() => handleDeleteVehicle(v.id)}
                          className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 bg-slate-50 border border-slate-100 rounded-2xl">
                    <p className="text-xs text-slate-400">No registered vehicles found.</p>
                  </div>
                )}
              </div>

              {/* Registration Form (Only if < 3 vehicles) */}
              {vehicles.length < 3 ? (
                <form onSubmit={handleAddVehicle} className="bg-slate-50 rounded-2xl p-4.5 border border-slate-200/50 flex flex-col gap-3 mt-1">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5 text-blue-600" />
                    <span>Register New Vehicle</span>
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Plate Number</label>
                      <input
                        type="text"
                        value={newVehiclePlate}
                        onChange={(e) => setNewVehiclePlate(e.target.value)}
                        placeholder="WQX 9211"
                        maxLength={10}
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-black tracking-wide focus:outline-none uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Vehicle Nickname</label>
                      <input
                        type="text"
                        value={newVehicleNickname}
                        onChange={(e) => setNewVehicleNickname(e.target.value)}
                        placeholder="Civic Sedan"
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Vehicle Color</label>
                      <input
                        type="text"
                        value={newVehicleColor}
                        onChange={(e) => setNewVehicleColor(e.target.value)}
                        placeholder="Metallic Silver"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Vehicle Type</label>
                      <select
                        value={newVehicleType}
                        onChange={(e) => setNewVehicleType(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold focus:outline-none"
                      >
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Coupe">Coupe / Sports</option>
                        <option value="EV / Hybrid">EV / Hybrid</option>
                      </select>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-2 bg-slate-900 text-white rounded-xl font-extrabold text-xs shadow-xs hover:bg-slate-800 mt-2 cursor-pointer"
                  >
                    Save Vehicle to Profile
                  </motion.button>
                </form>
              ) : (
                <div className="p-3 bg-amber-50 rounded-xl text-[11px] text-amber-700/95 leading-normal border border-amber-100 mt-1">
                  💡 Max registration reached. Delete a vehicle if you wish to register a different license plate code.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* 3. TRANSACTION HISTORY LIST MODAL */}
        {openTransactionsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end"
          >
            <div className="absolute inset-0" onClick={() => setOpenTransactionsModal(false)} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white rounded-t-[32px] p-6 z-10 flex flex-col gap-4 max-h-[90%] overflow-y-auto no-scrollbar shadow-2xl relative"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto self-center shrink-0" />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">Ecosystem Ledger</h3>
                  <p className="text-xs text-slate-400">All points transactions logged inside RHB Mall</p>
                </div>
                <button
                  onClick={() => setOpenTransactionsModal(false)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Transactions List */}
              <div className="flex flex-col gap-3">
                {transactions.length > 0 ? (
                  transactions.map(tx => (
                    <div
                      key={tx.id}
                      className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-extrabold text-sm shrink-0">
                          {tx.storeName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-900 tracking-tight">{tx.storeName}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">{tx.date} • Spent RM {tx.amount.toFixed(2)}</p>
                        </div>
                      </div>

                      {/* Points Added */}
                      <span className="text-xs font-extrabold text-emerald-600 shrink-0">
                        +{tx.pointsEarned} pts
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-slate-50 border border-slate-100 rounded-2xl">
                    <p className="text-xs text-slate-400">No registered transactions logged yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* 4. MEMBERSHIP TIERS EXPLAINER MODAL */}
        {openTiersModal && user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end"
          >
            <div className="absolute inset-0" onClick={() => setOpenTiersModal(false)} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white rounded-t-[32px] p-6 z-10 flex flex-col gap-4 max-h-[90%] overflow-y-auto no-scrollbar shadow-2xl relative"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto self-center shrink-0" />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">Ecosystem Tier Structure</h3>
                  <p className="text-xs text-slate-400">Unlock multipliers and birthday benefits</p>
                </div>
                <button
                  onClick={() => setOpenTiersModal(false)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Tiers List */}
              <div className="flex flex-col gap-3.5 mt-2">
                
                {/* Silver Card */}
                <div className={`p-4 rounded-2xl border flex flex-col gap-2 relative overflow-hidden ${
                  user.tier === 'Silver' ? 'border-slate-400 bg-slate-50' : 'border-slate-100 bg-white'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                      🥈 Silver Member
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">0+ points</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-slate-500 text-[11px] mt-1">
                    <span className="font-medium">Points Multiplier: <strong>1.0x</strong></span>
                    <span className="font-medium">Birthday Bonus: <strong>Double pts</strong></span>
                  </div>
                </div>

                {/* Gold Card */}
                <div className={`p-4 rounded-2xl border flex flex-col gap-2 relative overflow-hidden ${
                  user.tier === 'Gold' ? 'border-amber-400 bg-amber-50/40 shadow-sm' : 'border-slate-100 bg-white'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-amber-700 flex items-center gap-1">
                      🥇 Gold Member {user.tier === 'Gold' && '⭐'}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">1,000+ points</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-slate-500 text-[11px] mt-1">
                    <span className="font-medium text-amber-850">Points Multiplier: <strong className="text-amber-700">1.5x</strong></span>
                    <span className="font-medium text-slate-600">Birthday Reward: <strong>RM15 voucher</strong></span>
                  </div>
                </div>

                {/* Platinum Card */}
                <div className={`p-4 rounded-2xl border flex flex-col gap-2 relative overflow-hidden ${
                  user.tier === 'Platinum' ? 'border-neutral-800 bg-neutral-900 text-white shadow-md' : 'border-slate-100 bg-white'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-black flex items-center gap-1 ${
                      user.tier === 'Platinum' ? 'text-amber-300' : 'text-neutral-800'
                    }`}>
                      💎 Platinum Member {user.tier === 'Platinum' && '🔥'}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      user.tier === 'Platinum' ? 'bg-zinc-800 text-amber-300' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      5,000+ points
                    </span>
                  </div>
                  <div className={`grid grid-cols-2 gap-3 text-[11px] mt-1 ${
                    user.tier === 'Platinum' ? 'text-neutral-300' : 'text-slate-500'
                  }`}>
                    <span className="font-medium">Points Multiplier: <strong className={user.tier === 'Platinum' ? 'text-amber-300' : 'text-slate-800'}>2.0x</strong></span>
                    <span className="font-medium">VIP Lounges: <strong>Unlimited Access</strong></span>
                  </div>
                </div>

              </div>

              {/* Point Rules Footer */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl mt-2 text-[11px] text-slate-500 leading-relaxed flex flex-col gap-1.5">
                <span className="font-bold text-slate-800">Ecosystem Multipliers Example:</span>
                <span>• Silver: RM100 spent = 100 points</span>
                <span>• Gold: RM100 spent = 150 points</span>
                <span>• Platinum: RM100 spent = 200 points</span>
                <span className="text-emerald-600 font-semibold mt-1">🎂 Celebrate your Birthday Month: Double points on all purchases and RM15 free shopping voucher!</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* 5. STORE DETAILS DRAWER */}
        {selectedStore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end"
          >
            <div className="absolute inset-0" onClick={() => setSelectedStore(null)} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white rounded-t-[32px] p-6 z-10 flex flex-col gap-4 max-h-[90%] overflow-y-auto no-scrollbar shadow-2xl relative"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto self-center shrink-0" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${selectedStore.logoBg}`}>
                    {selectedStore.logo}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">{selectedStore.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{selectedStore.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStore(null)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Store details info list */}
              <div className="flex flex-col gap-3 mt-1.5 text-xs text-slate-600 leading-relaxed">
                <p>{selectedStore.description}</p>

                <div className="h-px bg-slate-100 my-1" />

                <div className="grid grid-cols-2 gap-3 font-semibold text-slate-800">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-slate-400">Mall Location</p>
                      <p className="text-xs">{selectedStore.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-slate-400">Opening Hours</p>
                      <p className="text-xs">{selectedStore.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 font-semibold text-slate-800 mt-1">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-400">Contact Number</p>
                    <p className="text-xs">{selectedStore.contact}</p>
                  </div>
                </div>

                {selectedStore.featuredPromo && (
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 mt-2 flex gap-3">
                    <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-amber-900 text-xs">Featured Loyalty Promotion</h4>
                      <p className="text-amber-800 text-[11px] mt-0.5 leading-normal">{selectedStore.featuredPromo}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* 6. SEASONAL PROMOTIONS HIGHLIGHTS MODAL */}
        {openPromoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end"
          >
            <div className="absolute inset-0" onClick={() => setOpenPromoModal(null)} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white rounded-t-[32px] p-6 z-10 flex flex-col gap-4 max-h-[90%] overflow-y-auto no-scrollbar shadow-2xl relative"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto self-center shrink-0" />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">{openPromoModal.title}</h3>
                  <p className="text-xs text-slate-400">Ecosystem Promotional Highlight</p>
                </div>
                <button
                  onClick={() => setOpenPromoModal(null)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Graphic container */}
              <div className="bg-gradient-to-tr from-amber-500 to-amber-600 rounded-2xl h-32 flex flex-col items-center justify-center text-white p-4 relative overflow-hidden shadow-xs">
                <div className="absolute right-0 bottom-0 text-9xl opacity-10 pointer-events-none">🛍️</div>
                <span className="text-3xl">{openPromoModal.image}</span>
                <span className="text-sm font-extrabold tracking-tight mt-2 uppercase">{openPromoModal.promoText}</span>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed">
                <p className="font-semibold text-slate-800 text-sm mb-1">Offer Details:</p>
                <p>{openPromoModal.description}</p>

                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl mt-3 text-[10px] flex items-center gap-2">
                  <CalendarCheck className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                  <span>Valid exclusively at RHB Mall outlets. Present your membership card to register purchase.</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button
                    onClick={() => {
                      const targetStore = INITIAL_STORES.find(s => s.id === openPromoModal.storeId);
                      if (targetStore) setSelectedStore(targetStore);
                      setOpenPromoModal(null);
                    }}
                    className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-50 transition-colors text-center cursor-pointer"
                  >
                    View Store Info
                  </button>
                  <button
                    onClick={() => {
                      setOpenPromoModal(null);
                      setOpenQRModal(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors text-center cursor-pointer"
                  >
                    Scan Loyalty Card
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* 7. ALL NOTIFICATIONS DIALOG MODAL */}
        {openNotificationsModal && (() => {
          // Dynamic category maps
          const categoryMap = {
            promo: 'Promotions',
            reminder: 'New Arrivals',
            campaign: 'Events',
            reward: 'Membership Updates'
          };
          const categoryKeyMap = {
            promo: 'promotions',
            reminder: 'arrivals',
            campaign: 'events',
            reward: 'updates'
          } as const;

          // Compute filtered notifications
          const filteredNotifications = (() => {
            if (!notifSettingsEnabled) return [];

            let list = notifications.filter(notif => {
              const catKey = categoryKeyMap[notif.type];
              return notifCategories[catKey] === true;
            });

            // Filter out muted categories
            list = list.filter(notif => {
              const catName = categoryMap[notif.type];
              return !notifMutedCategories.includes(catName);
            });

            // Dynamic AI prioritization sorting
            if (aiPersonalization) {
              return [...list].sort((a, b) => {
                const isAFeatured = aiInterest !== 'All' && (
                  (aiInterest === 'Fashion' && (a.description.toLowerCase().includes('uniqlo') || a.description.toLowerCase().includes('nike') || a.description.toLowerCase().includes('apparel') || a.description.toLowerCase().includes('fashion'))) ||
                  (aiInterest === 'Dining' && (a.description.toLowerCase().includes('starbucks') || a.description.toLowerCase().includes('coffee') || a.description.toLowerCase().includes('frappuccino') || a.description.toLowerCase().includes('dining') || a.description.toLowerCase().includes('burger')))
                );
                const isBFeatured = aiInterest !== 'All' && (
                  (aiInterest === 'Fashion' && (b.description.toLowerCase().includes('uniqlo') || b.description.toLowerCase().includes('nike') || b.description.toLowerCase().includes('apparel') || b.description.toLowerCase().includes('fashion'))) ||
                  (aiInterest === 'Dining' && (b.description.toLowerCase().includes('starbucks') || b.description.toLowerCase().includes('coffee') || b.description.toLowerCase().includes('frappuccino') || b.description.toLowerCase().includes('dining') || b.description.toLowerCase().includes('burger')))
                );
                if (isAFeatured && !isBFeatured) return -1;
                if (!isAFeatured && isBFeatured) return 1;
                return 0;
              });
            }

            return list;
          })();

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end"
            >
              <div className="absolute inset-0" onClick={() => setOpenNotificationsModal(false)} />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="bg-[#F2F2F7] rounded-t-[32px] p-5 z-10 flex flex-col gap-4 max-h-[92%] overflow-y-auto no-scrollbar shadow-2xl relative"
              >
                {/* Drag handle */}
                <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto self-center shrink-0 mb-1" />

                {/* Header */}
                <div className="flex items-center justify-between px-1">
                  <div>
                    <h3 className="text-base font-black text-[#1C1C1E] tracking-tight">Notification Center</h3>
                    <p className="text-[10px] text-slate-500 font-medium">Smart alerts & lifestyle reminders</p>
                  </div>
                  <button
                    onClick={() => setOpenNotificationsModal(false)}
                    className="p-1.5 rounded-full bg-white text-slate-500 hover:bg-slate-200 cursor-pointer shadow-xs"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Main Tab Controls */}
                <div className="grid grid-cols-3 bg-white p-1 rounded-xl shadow-xs text-xs font-bold text-slate-600">
                  <button
                    onClick={() => setNotifActiveTab('alerts')}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      notifActiveTab === 'alerts' ? 'bg-[#1C1C1E] text-white shadow-xs' : 'hover:bg-slate-50 text-slate-500'
                    }`}
                  >
                    <span>Alerts ({filteredNotifications.length})</span>
                  </button>
                  <button
                    onClick={() => setNotifActiveTab('settings')}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      notifActiveTab === 'settings' ? 'bg-[#1C1C1E] text-white shadow-xs' : 'hover:bg-slate-50 text-slate-500'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => setNotifActiveTab('recycle')}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      notifActiveTab === 'recycle' ? 'bg-[#1C1C1E] text-white shadow-xs' : 'hover:bg-slate-50 text-slate-500'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Recycle ({deletedNotifs.length})</span>
                  </button>
                </div>

                {/* NOTIFICATIONS TAB CONTENT */}
                {notifActiveTab === 'alerts' && (
                  <div className="flex flex-col gap-4">
                    {/* Inbox Filters, Settings, Actions bar */}
                    <div className="flex items-center justify-between px-1 bg-white p-2.5 rounded-2xl shadow-2xs border border-slate-100">
                      {/* Concise/Story toggle */}
                      <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[9px] font-bold">
                        <button
                          onClick={() => setNotifStyleMode('story')}
                          className={`px-2 py-1 rounded-md transition-colors ${
                            notifStyleMode === 'story' ? 'bg-white text-[#1C1C1E] shadow-xs' : 'text-slate-500'
                          }`}
                        >
                          Story Card
                        </button>
                        <button
                          onClick={() => setNotifStyleMode('concise')}
                          className={`px-2 py-1 rounded-md transition-colors ${
                            notifStyleMode === 'concise' ? 'bg-white text-[#1C1C1E] shadow-xs' : 'text-slate-500'
                          }`}
                        >
                          Concise Row
                        </button>
                      </div>

                      {/* Clear, Sweep actions */}
                      <div className="flex items-center gap-2 text-[10px] font-bold">
                        {filteredNotifications.length > 0 && (
                          <>
                            <button
                              onClick={handleAISweepOldAlerts}
                              className="text-[#C5A028] hover:text-[#A4821E] flex items-center gap-0.5 cursor-pointer"
                              title="Sweeps notifications older than 2 hours directly into the Recycle Bin"
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>AI Clean</span>
                            </button>
                            <span className="text-slate-200">|</span>
                            <button onClick={handleMarkAllRead} className="text-slate-500 hover:text-slate-800 cursor-pointer">Read All</button>
                            <span className="text-slate-200">|</span>
                            <button onClick={handleClearNotifications} className="text-rose-600 hover:text-rose-800 cursor-pointer">Dismiss All</button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Notification Alerts List */}
                    <div className="flex flex-col gap-2.5">
                      {filteredNotifications.length > 0 ? (
                        filteredNotifications.map(notif => {
                          const catName = categoryMap[notif.type];
                          const isPrioritized = aiPersonalization && aiInterest !== 'All' && (
                            (aiInterest === 'Fashion' && (notif.description.toLowerCase().includes('uniqlo') || notif.description.toLowerCase().includes('nike') || notif.description.toLowerCase().includes('apparel') || notif.description.toLowerCase().includes('fashion'))) ||
                            (aiInterest === 'Dining' && (notif.description.toLowerCase().includes('starbucks') || notif.description.toLowerCase().includes('coffee') || notif.description.toLowerCase().includes('frappuccino') || notif.description.toLowerCase().includes('dining') || notif.description.toLowerCase().includes('burger')))
                          );

                          return (
                            <motion.div
                              key={notif.id}
                              layoutId={notif.id}
                              className={`rounded-2xl transition-all relative overflow-hidden bg-white border shadow-3xs flex ${
                                notifStyleMode === 'story' ? 'p-4 flex-col gap-2' : 'p-2.5 items-center justify-between gap-3'
                              } ${
                                notif.isRead ? 'border-slate-100 opacity-80' : 'border-[#C5A028]/20 bg-gradient-to-r from-white via-white to-amber-50/10'
                              }`}
                            >
                              {/* Header for story mode */}
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  {/* Custom bullet categories */}
                                  <div className={`text-sm p-1.5 rounded-lg flex items-center justify-center ${
                                    notif.type === 'reward' ? 'bg-amber-100 text-amber-600' :
                                    notif.type === 'campaign' ? 'bg-purple-100 text-purple-600' :
                                    notif.type === 'promo' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'
                                  }`}>
                                    {notif.type === 'reward' ? '🎁' :
                                     notif.type === 'campaign' ? '📅' :
                                     notif.type === 'promo' ? '⚡' : '☕'}
                                  </div>
                                  <div>
                                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">{catName}</span>
                                    {notifStyleMode === 'concise' && (
                                      <h4 className="text-xs font-extrabold text-slate-900 tracking-tight leading-none mt-0.5">{notif.title}</h4>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  {/* AI Priority Highlight */}
                                  {isPrioritized && (
                                    <span className="text-[8px] bg-gradient-to-r from-amber-500 to-[#C5A028] text-white px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5 shadow-3xs">
                                      <Sparkles className="w-2 h-2" />
                                      <span>AI Pick</span>
                                    </span>
                                  )}

                                  {/* Time */}
                                  <span className="text-[9px] text-slate-400 font-bold">{notif.time}</span>
                                </div>
                              </div>

                              {/* Description */}
                              {notifStyleMode === 'story' ? (
                                <div>
                                  <h4 className="text-xs font-black text-slate-950 tracking-tight leading-snug">{notif.title}</h4>
                                  <p className="text-[10px] text-slate-500 mt-1.5 leading-normal font-medium">{notif.description}</p>
                                </div>
                              ) : (
                                <p className="text-[10px] text-slate-400 flex-1 leading-normal truncate max-w-[140px]">{notif.description}</p>
                              )}

                              {/* Controls */}
                              <div className="flex items-center justify-between border-t border-slate-100 pt-2 mt-1 text-[9px] font-semibold">
                                <div className="flex items-center gap-2">
                                  {/* Mute toggle button */}
                                  <button
                                    onClick={() => {
                                      setNotifMutedCategories(prev => 
                                        prev.includes(catName) ? prev.filter(c => c !== catName) : [...prev, catName]
                                      );
                                      showToastMessage(`Muted all alerts for ${catName}`, 'info');
                                    }}
                                    className="text-slate-400 hover:text-[#C5A028] flex items-center gap-1 cursor-pointer"
                                  >
                                    <VolumeX className="w-3 h-3 shrink-0" />
                                    <span>Mute Alerts</span>
                                  </button>
                                </div>

                                <div className="flex items-center gap-3">
                                  {/* Delete button */}
                                  <button
                                    onClick={() => handleDeleteNotification(notif.id)}
                                    className="text-rose-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    <span>Dismiss</span>
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })
                      ) : (
                        <div className="text-center py-12 bg-white rounded-2xl border border-slate-150">
                          <p className="text-xs text-slate-400 font-medium">No alerts matches your filters.</p>
                          <p className="text-[10px] text-slate-300 mt-1">Try enabling more categories in settings!</p>
                        </div>
                      )}
                    </div>

                    {/* RECYCLE BIN ACCORDION SECTION */}
                    <div className="bg-white rounded-2xl p-4.5 border border-slate-150 shadow-xs mt-2">
                      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2">
                          <Trash2 className="w-4 h-4 text-slate-500" />
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Recently Deleted ({deletedNotifs.length})</h4>
                        </div>
                        {deletedNotifs.length > 0 && (
                          <button
                            onClick={handleEmptyRecycleBin}
                            className="text-[10px] text-rose-600 font-bold hover:underline cursor-pointer"
                          >
                            Empty Bin
                          </button>
                        )}
                      </div>

                      {deletedNotifs.length > 0 ? (
                        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1 no-scrollbar">
                          {deletedNotifs.slice(0, 3).map(dn => (
                            <div key={dn.id} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[10px]">
                              <div className="flex-1 pr-3">
                                <span className="font-bold text-slate-800 block truncate">{dn.title}</span>
                                <span className="text-[9px] text-slate-400 block">{dn.time}</span>
                              </div>
                              <button
                                onClick={() => handleRestoreNotification(dn.id)}
                                className="flex items-center gap-1 text-[#C5A028] font-bold bg-[#C5A028]/10 hover:bg-[#C5A028]/20 px-2 py-1 rounded-lg cursor-pointer shrink-0"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Restore</span>
                              </button>
                            </div>
                          ))}
                          {deletedNotifs.length > 3 && (
                            <button
                              onClick={() => setNotifActiveTab('recycle')}
                              className="text-center text-[10px] font-bold text-[#C5A028] hover:underline pt-1.5"
                            >
                              View all {deletedNotifs.length} recently deleted notifications
                            </button>
                          )}
                        </div>
                      ) : (
                        <p className="text-[10px] text-slate-400 text-center py-2">Recycle Bin is empty.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* RECYCLE TAB CONTENT */}
                {notifActiveTab === 'recycle' && (
                  <div className="flex flex-col gap-4 animate-fadeIn">
                    <div className="bg-white rounded-2xl p-4.5 border border-slate-150 shadow-xs">
                      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2">
                          <Trash2 className="w-4 h-4 text-[#C5A028]" />
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Recycle Bin ({deletedNotifs.length})</h4>
                        </div>
                        {deletedNotifs.length > 0 && (
                          <button
                            onClick={handleEmptyRecycleBin}
                            className="text-[10px] text-rose-600 font-bold hover:underline cursor-pointer"
                          >
                            Empty Bin Permanently
                          </button>
                        )}
                      </div>

                      {deletedNotifs.length > 0 ? (
                        <div className="flex flex-col gap-2.5">
                          {deletedNotifs.map(dn => {
                            const catName = categoryMap[dn.type] || 'Alert';
                            return (
                              <div key={dn.id} className="flex flex-col gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-md">{catName}</span>
                                  <span className="text-[9px] text-slate-400 font-bold">{dn.time}</span>
                                </div>
                                <div>
                                  <span className="font-extrabold text-slate-900 block">{dn.title}</span>
                                  <p className="text-[10px] text-slate-500 mt-1 leading-normal font-medium">{dn.description}</p>
                                </div>
                                <div className="flex items-center justify-end gap-2 border-t border-slate-200/40 pt-2.5 mt-1">
                                  <button
                                    onClick={() => {
                                      setDeletedNotifs(prev => prev.filter(n => n.id !== dn.id));
                                      showToastMessage('Notification permanently deleted.', 'info');
                                    }}
                                    className="text-[9px] text-rose-600 font-black hover:text-rose-800 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100 cursor-pointer"
                                  >
                                    Delete Permanently
                                  </button>
                                  <button
                                    onClick={() => handleRestoreNotification(dn.id)}
                                    className="flex items-center gap-1 text-[#C5A028] font-bold bg-[#C5A028]/10 hover:bg-[#C5A028]/20 px-2.5 py-1 rounded-lg cursor-pointer"
                                  >
                                    <RotateCcw className="w-3 h-3" />
                                    <span>Restore</span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <span className="text-3xl block mb-2">🗑️</span>
                          <p className="text-xs text-slate-400 font-medium">Recycle Bin is empty.</p>
                          <p className="text-[10px] text-slate-300 mt-1">Notifications you dismiss will appear here for easy restoration.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* SETTINGS TAB CONTENT */}
                {notifActiveTab === 'settings' && (
                  <div className="flex flex-col gap-4 bg-white p-4.5 rounded-2xl border border-slate-150 shadow-xs">
                    {/* Global Toggle */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-xs font-black text-slate-900 block">Allow Mall Alerts</span>
                        <span className="text-[10px] text-slate-400">Master push notifications permission</span>
                      </div>
                      <button
                        onClick={() => {
                          setNotifSettingsEnabled(!notifSettingsEnabled);
                          playNotificationSound('vibes');
                        }}
                        className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none cursor-pointer ${
                          notifSettingsEnabled ? 'bg-[#C5A028]' : 'bg-slate-200'
                        }`}
                      >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${
                          notifSettingsEnabled ? 'translate-x-4' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    {notifSettingsEnabled && (
                      <>
                        {/* Categories Multiselect */}
                        <div className="flex flex-col gap-2.5 border-b border-slate-100 pb-4">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Alert Channels</span>
                          
                          <div className="grid grid-cols-2 gap-2.5">
                            {Object.keys(notifCategories).map(key => {
                              const typedKey = key as keyof typeof notifCategories;
                              const labelMap = {
                                promotions: '⚡ Promotions',
                                arrivals: '🛍️ New Arrivals',
                                events: '📅 Mall Events',
                                updates: '🎁 Membership Updates'
                              };

                              return (
                                <button
                                  key={typedKey}
                                  onClick={() => {
                                    setNotifCategories(prev => ({ ...prev, [typedKey]: !prev[typedKey] }));
                                    playNotificationSound('vibes');
                                  }}
                                  className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer text-[10px] font-bold flex items-center justify-between ${
                                    notifCategories[typedKey] 
                                      ? 'border-[#C5A028] bg-[#C5A028]/5 text-[#1C1C1E]' 
                                      : 'border-slate-200 bg-white text-slate-500'
                                  }`}
                                >
                                  <span>{labelMap[typedKey]}</span>
                                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                    notifCategories[typedKey] ? 'border-[#C5A028] bg-[#C5A028]' : 'border-slate-300'
                                  }`}>
                                    {notifCategories[typedKey] && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* AI PERSONALIZATION BLOCK */}
                        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 pt-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-[#C5A028]" />
                                <span className="text-xs font-black text-slate-900">AI Personalization</span>
                              </div>
                              <span className="text-[9px] text-slate-400 block mt-0.5">Automatically prioritize relevant alerts first</span>
                            </div>
                            <button
                              onClick={() => {
                                setAiPersonalization(!aiPersonalization);
                                playNotificationSound('vibes');
                              }}
                              className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none cursor-pointer ${
                                aiPersonalization ? 'bg-indigo-600' : 'bg-slate-200'
                              }`}
                            >
                              <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${
                                aiPersonalization ? 'translate-x-4' : 'translate-x-0'
                              }`} />
                            </button>
                          </div>

                          {aiPersonalization && (
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-150 text-[10px]">
                              <span className="font-bold text-slate-500 block mb-1.5">Your Shopper Interest Bias:</span>
                              <div className="grid grid-cols-3 gap-2">
                                {['All', 'Fashion', 'Dining'].map(interest => (
                                  <button
                                    key={interest}
                                    onClick={() => {
                                      setAiInterest(interest as any);
                                      playNotificationSound('chime');
                                    }}
                                    className={`py-1.5 px-2 rounded-lg text-center font-bold transition-all cursor-pointer ${
                                      aiInterest === interest 
                                        ? 'bg-slate-900 text-white shadow-xs' 
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                                  >
                                    {interest}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* SOUND EFFECTS SELECTOR */}
                        <div className="flex flex-col gap-2 pt-1">
                          <div className="flex items-center gap-1.5">
                            <Volume2 className="w-4 h-4 text-slate-600" />
                            <span className="text-xs font-black text-slate-900">Custom Alert Chimes</span>
                          </div>
                          <span className="text-[9px] text-slate-400">Synthesize audio feedback for notifications</span>
                          
                          <div className="grid grid-cols-4 gap-2 mt-1">
                            {[
                              { id: 'bell', label: 'Traditional 🔔' },
                              { id: 'chime', label: 'Sleek ⚡' },
                              { id: 'vibes', label: 'Mellow 🍃' },
                              { id: 'none', label: 'Silent 🔇' }
                            ].map(item => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  setNotifSoundType(item.id as any);
                                  playNotificationSound(item.id as any);
                                }}
                                className={`py-2 px-1 text-center rounded-xl transition-all border font-bold text-[9px] flex flex-col gap-1 items-center cursor-pointer ${
                                  notifSoundType === item.id 
                                    ? 'border-[#C5A028] bg-[#C5A028]/10 text-[#C5A028]' 
                                    : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                                }`}
                              >
                                <span>{item.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })()}

        {/* HELP & SUPPORT DIALOG MODAL */}
        {openSupportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end"
          >
            <div className="absolute inset-0" onClick={() => setOpenSupportModal(false)} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-[#F2F2F7] rounded-t-[32px] p-5 z-10 flex flex-col gap-4 max-h-[92%] overflow-y-auto no-scrollbar shadow-2xl relative text-left"
            >
              {/* Drag handle */}
              <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto self-center shrink-0 mb-1" />

              {/* Header */}
              <div className="flex items-center justify-between px-1">
                <div>
                  <h3 className="text-base font-black text-[#1C1C1E] tracking-tight">Mall Loyalty Help Center</h3>
                  <p className="text-[10px] text-slate-500 font-medium">Resolving loyalty and ecosystem questions</p>
                </div>
                <button
                  onClick={() => setOpenSupportModal(false)}
                  className="p-1.5 rounded-full bg-white text-slate-500 hover:bg-slate-200 cursor-pointer shadow-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* FAQ Section */}
              <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-3xs flex flex-col gap-3">
                <h4 className="text-xs font-black text-[#1C1C1E] uppercase tracking-wider border-b border-slate-100 pb-1.5">Frequently Asked Questions</h4>
                
                <div className="flex flex-col gap-3 text-[11px]">
                  <div>
                    <span className="font-extrabold text-slate-900 block">Q: How do I collect loyalty points?</span>
                    <span className="text-slate-500 block mt-0.5 leading-normal font-medium">Simply present your personal Membership QR code found on the Home Screen at any participating retailer register prior to making payment.</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">Q: How does Smart Parking work?</span>
                    <span className="text-slate-500 block mt-0.5 leading-normal font-medium">Register your active license plate under Profile &gt; My Registered Vehicles. Gates will read your plate automatically, and your points can be used to offset fees.</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">Q: Do my points expire?</span>
                    <span className="text-slate-500 block mt-0.5 leading-normal font-medium">Yes, point balances remain valid for a period of exactly 12 months from the date of credit.</span>
                  </div>
                </div>
              </div>

              {/* SIMULATED LIVE SUPPORT CHAT */}
              <SupportChatSection />
            </motion.div>
          </motion.div>
        )}

        {/* FORGOT PASSWORD DIALOG MODAL */}
        {openForgotPasswordModal && (() => {
          const [forgotEmail, setForgotEmail] = useState('');
          const [resetDispatched, setResetDispatched] = useState(false);

          const handleResetSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            setResetDispatched(true);
            playNotificationSound('bell');
          };

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end"
            >
              <div className="absolute inset-0" onClick={() => setOpenForgotPasswordModal(false)} />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="bg-white rounded-t-[32px] p-6 z-10 flex flex-col gap-4 shadow-2xl relative text-left"
              >
                {/* Drag handle */}
                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto self-center shrink-0 mb-1" />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">Account Recovery</h3>
                    <p className="text-[10px] text-slate-400">Reset your digital membership passcode</p>
                  </div>
                  <button
                    onClick={() => setOpenForgotPasswordModal(false)}
                    className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {!resetDispatched ? (
                  <form onSubmit={handleResetSubmit} className="flex flex-col gap-4 mt-2">
                    <div>
                      <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Registered Email</label>
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="sarah.lim@gmail.com"
                        required
                        className="w-full bg-[#F2F2F7] border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A028] font-semibold text-slate-800"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#1C1C1E] text-white rounded-2xl text-xs font-bold hover:bg-black shadow-xs cursor-pointer"
                    >
                      Dispatch Verification Code
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6 flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 text-xl font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900">Recovery Instructions Sent!</h4>
                      <p className="text-[10px] text-slate-400 leading-normal mt-1 max-w-[240px] mx-auto">
                        A secure pass-code reset credential link has been dispatched to <strong>{forgotEmail || 'sarah.lim@gmail.com'}</strong>.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setResetDispatched(false);
                        setOpenForgotPasswordModal(false);
                      }}
                      className="mt-2 text-xs font-bold text-[#C5A028] hover:underline"
                    >
                      Return to Sign In
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })()}

        {/* TERMS & CONDITIONS EXPERIENCES MODAL */}
        {openTermsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end"
          >
            <div className="absolute inset-0" onClick={() => setOpenTermsModal(false)} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-[#F2F2F7] rounded-t-[32px] p-5 z-10 flex flex-col gap-4 max-h-[92%] overflow-y-auto no-scrollbar shadow-2xl relative text-left"
            >
              {/* Drag handle */}
              <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto self-center shrink-0 mb-1" />

              {/* Header */}
              <div className="flex items-center justify-between px-1">
                <div>
                  <h3 className="text-base font-black text-[#1C1C1E] tracking-tight">Ecosystem Legal Terms</h3>
                  <p className="text-[10px] text-slate-500 font-medium">Clear, transparent & user-centered disclosures</p>
                </div>
                <button
                  onClick={() => {
                    // Cancel speech if active
                    window.speechSynthesis.cancel();
                    setIsReadingTerms(false);
                    setOpenTermsModal(false);
                  }}
                  className="p-1.5 rounded-full bg-white text-slate-500 hover:bg-slate-200 cursor-pointer shadow-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tool bar: Translation + Text-To-Speech audio player */}
              <div className="flex items-center justify-between bg-white p-2.5 rounded-2xl shadow-2xs border border-slate-100 text-xs">
                {/* Languages switcher */}
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[9px] font-bold">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'ms', label: 'Melayu' },
                    { code: 'zh', label: '中文' }
                  ].map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setTermsLanguage(lang.code as any);
                        // Cancel current speech so it can restart if clicked again
                        window.speechSynthesis.cancel();
                        setIsReadingTerms(false);
                      }}
                      className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                        termsLanguage === lang.code ? 'bg-white text-[#1C1C1E] shadow-xs' : 'text-slate-500'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>

                {/* TTS Reader Trigger */}
                <button
                  onClick={toggleSpeechSummary}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-[10px] cursor-pointer transition-all ${
                    isReadingTerms 
                      ? 'bg-amber-100 text-[#C5A028] animate-pulse' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {isReadingTerms ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isReadingTerms ? 'Mute Summary' : 'Listen Summary'}</span>
                </button>
              </div>

              {/* Simplified Overview Highlights Section */}
              <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-3xs flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5 text-indigo-600">
                  <Shield className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Simplified Highlights Summary</span>
                </div>

                <div className="text-[11px] font-medium leading-relaxed text-slate-600 flex flex-col gap-2">
                  <p className="text-slate-800 font-extrabold">
                    {{
                      en: "We believe terms should be readable. Here are the 3 key clauses explained in human terms:",
                      ms: "Kami percaya terma harus mudah dibaca. Berikut adalah 3 klausa utama yang diterangkan secara ringkas:",
                      zh: "我们认为条款应当易于阅读。以下是用通俗语言解释的 3 个关键条款："
                    }[termsLanguage]}
                  </p>

                  <div className="list-disc pl-4 space-y-1.5 text-slate-500">
                    {{
                      en: (
                        <ul className="list-disc space-y-1">
                          <li><strong>Points Collection:</strong> You receive 1 loyalty credit point for every <strong>RM1.00</strong> spent at participating partners. Credits validity is 12 months.</li>
                          <li><strong>Tier Upgrade Rules:</strong> Status tiers Silver, Gold, and Platinum recalculate automatically upon point accruals.</li>
                          <li><strong>License Plate Privacy:</strong> Plate coordinates scanned at automatic gates are encrypted and strictly used to deduct parking fees.</li>
                        </ul>
                      ),
                      ms: (
                        <ul className="list-disc space-y-1">
                          <li><strong>Pengumpulan Mata:</strong> Anda menerima 1 mata ganjaran bagi setiap <strong>RM1.00</strong> dibelanjakan. Tempoh sah mata ganjaran ialah 12 bulan.</li>
                          <li><strong>Kenaikan Tahap Ahli:</strong> Status Silver, Gold, dan Platinum dikemas kini automatik berdasarkan jumlah mata terkumpul.</li>
                          <li><strong>Privasi Nombor Plat:</strong> Data imbasan plat kereta di pintu pagar diletakkan dalam kod rahsia dan digunakan untuk parkir sahaja.</li>
                        </ul>
                      ),
                      zh: (
                        <ul className="list-disc space-y-1">
                          <li><strong>积分赚取:</strong> 在合作商家每消费 <strong>RM1.00</strong> 即可获得 1 积分。积分有效期为 12 个月。</li>
                          <li><strong>会员级别升级:</strong> 银卡、金卡及白金卡会员等级随积分累计自动刷新。</li>
                          <li><strong>车牌号隐私安全:</strong> 闸机自动扫出的车牌号信息皆进行强加密，且仅用于抵扣停车费。</li>
                        </ul>
                      )
                    }[termsLanguage]}
                  </div>
                </div>
              </div>

              {/* Full terms accordion section */}
              <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-3xs flex flex-col gap-2">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Legal Document details</span>
                  <button
                    onClick={() => setTermsShowFull(!termsShowFull)}
                    className="text-[10px] text-[#C5A028] font-bold hover:underline cursor-pointer"
                  >
                    {termsShowFull ? 'Show Less' : 'Expand All Details'}
                  </button>
                </div>

                <div className={`text-[10px] text-slate-500 font-medium leading-relaxed flex flex-col gap-2 overflow-hidden transition-all ${
                  termsShowFull ? 'max-h-80 overflow-y-auto pr-1' : 'max-h-16'
                }`}>
                  {{
                    en: (
                      <>
                        <p><strong>1. Introduction</strong>: Welcome to the RHB Mall Digital Loyalty Application. By registering, you agree to form a legally binding contract governed by the laws of Malaysia.</p>
                        <p><strong>2. Point Accuracy</strong>: RHB Mall and retail merchants reserve the right to audit, correct, or reverse point logs if anomalies, coupon fraud, or checkout cancellations are discovered.</p>
                        <p><strong>3. Smart Parking & Auto-Deductions</strong>: Parking billing systems query your plate dynamically upon arrival. Registered vehicles will have fees deducted automatically if loyalty points are available and auto-claim is activated.</p>
                        <p><strong>4. Liability & Account Termination</strong>: Accounts displaying suspicious receipt collection behaviors will be flagged for investigation. Point collections may be frozen during audit proceedings.</p>
                      </>
                    ),
                    ms: (
                      <>
                        <p><strong>1. Pengenalan</strong>: Selamat datang ke Aplikasi Kesetiaan RHB Mall. Pendaftaran anda menandakan persetujuan rasmi terhadap kontrak terma perkhidmatan Malaysia.</p>
                        <p><strong>2. Ketepatan Mata</strong>: RHB Mall berhak mengaudit, memperbetulkan atau membatalkan mata sekiranya berlaku salah laku transaksi atau pemulangan barangan.</p>
                        <p><strong>3. Parkir Pintar & Potongan Automatik</strong>: Sistem mengesan plat kereta semasa masuk. Potongan mata ganjaran berlaku automatik sekiranya baki mata mencukupi dan fungsi diaktifkan.</p>
                        <p><strong>4. Penamatan Akaun</strong>: Sebarang aktiviti pengumpulan resit meragukan akan digantung untuk siasatan lanjut oleh pihak pengurusan.</p>
                      </>
                    ),
                    zh: (
                      <>
                        <p><strong>1. 介绍</strong>: 欢迎注册 RHB Mall 数字化忠诚度系统。注册即表示您同意签署受马来西亚法律管辖且具有法律约束力的协议条款。</p>
                        <p><strong>2. 积分准确性</strong>: 如果发现系统故障、退货或欺诈，RHB Mall 商家有权审核、修正或撤销任何积分入账记录。</p>
                        <p><strong>3. 智能无感停车抵扣</strong>: 闸机摄像头在车辆进入时会自动提取车牌。若开启自动抵扣且账户内有可用积分，将自动扣除相应积分以抵扣停车费。</p>
                        <p><strong>4. 账户停用条款</strong>: 若账户存在恶意刷单、搜集他人小票等异常积分行为，账户可能被暂时冻结以配合审计调查。</p>
                      </>
                    )
                  }[termsLanguage]}
                </div>
              </div>

              {/* Acknowledge Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setIsReadingTerms(false);
                  setOpenTermsModal(false);
                }}
                className="w-full bg-[#1C1C1E] text-white py-3 rounded-2xl text-xs font-bold shadow-md hover:bg-black mt-1 cursor-pointer"
              >
                Accept and Acknowledge
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* APPLE BIOMETRIC SYSTEM SCAN OVERLAY */}
        {biometricScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 z-55 flex flex-col items-center justify-center p-8"
          >
            <div className="text-center flex flex-col items-center gap-6">
              {/* Biometric visual ring animation */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Outer scanning loader rings */}
                <motion.div 
                  animate={biometricScanSuccess ? { scale: [1, 1.1, 1], rotate: 360 } : { rotate: 360 }}
                  transition={biometricScanSuccess ? { duration: 0.6 } : { repeat: Infinity, duration: 2, ease: 'linear' }}
                  className={`absolute inset-0 rounded-full border-2 border-dashed ${
                    biometricScanSuccess ? 'border-emerald-500' : 'border-[#C5A028]'
                  }`} 
                />
                
                {/* Inner scanner icon */}
                <motion.div
                  animate={!biometricScanSuccess ? { scale: [1, 1.05, 1] } : { scale: 1.2 }}
                  transition={{ repeat: !biometricScanSuccess ? Infinity : 0, duration: 1.5 }}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg ${
                    biometricScanSuccess ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-[#C5A028]'
                  }`}
                >
                  {biometricScanSuccess ? (
                    '✓'
                  ) : biometricScanType === 'FaceID' ? (
                    '👤'
                  ) : (
                    '👆'
                  )}
                </motion.div>

                {/* Cyber scanner light effect */}
                {!biometricScanSuccess && (
                  <motion.div
                    animate={{ y: [-40, 40, -40] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="absolute left-4 right-4 h-0.5 bg-[#C5A028] opacity-70 blur-xs"
                  />
                )}
              </div>

              <div>
                <h3 className="text-base font-black text-white tracking-tight">
                  {biometricScanSuccess 
                    ? 'Security Verified' 
                    : `Authenticating ${biometricScanType === 'FaceID' ? 'Face ID' : 'Touch ID'}...`}
                </h3>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] leading-relaxed mx-auto font-medium">
                  {biometricScanSuccess 
                    ? 'Access granted. Welcome back!' 
                    : `Connecting secure local Keychain for hardware biometrics...`}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 8. BARCODE REVEAL / CASHIER SIMULATION MARK AS USED */}
        {activeBarcodeVoucher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-center p-6"
          >
            <div className="absolute inset-0" onClick={() => setActiveBarcodeVoucher(null)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 z-10 flex flex-col gap-4 max-w-sm mx-auto shadow-2xl relative text-center border border-slate-100"
            >
              <div className="flex justify-between items-center text-left">
                <div>
                  <h3 className="text-sm font-black text-slate-950">Voucher Checkout Barcode</h3>
                  <p className="text-[10px] text-slate-400">Scan at participating merchant registers</p>
                </div>
                <button
                  onClick={() => setActiveBarcodeVoucher(null)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Voucher visual details */}
              <div className="p-3 bg-slate-50 rounded-2xl flex items-center gap-3 text-left border border-slate-100">
                <span className="text-3xl">{activeBarcodeVoucher.image}</span>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 tracking-tight">{activeBarcodeVoucher.title}</h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1">{activeBarcodeVoucher.description}</p>
                </div>
              </div>

              {/* Barcode representation */}
              <div className="p-4 bg-white border border-slate-150 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-xs">
                {/* Visual Barcode bars */}
                <div className="w-full h-16 flex items-stretch gap-[2px] opacity-90 px-2 my-2 bg-white">
                  {[...Array(38)].map((_, i) => {
                    const seed = (i * 29) % 7;
                    let width = 'w-[1px]';
                    if (seed === 0) width = 'w-[3px] bg-slate-900';
                    else if (seed === 1) width = 'w-[1px] bg-slate-900';
                    else if (seed === 2) width = 'w-[2px] bg-slate-900';
                    else if (seed === 3) width = 'w-[1px] bg-slate-100';
                    else if (seed === 4) width = 'w-[4px] bg-slate-900';
                    else if (seed === 5) width = 'w-[2px] bg-slate-100';
                    else width = 'w-[1px] bg-slate-900';

                    return <div key={i} className={`h-full ${width}`} />;
                  })}
                </div>
                
                <span className="font-mono text-xs font-black text-slate-700 tracking-widest">{activeBarcodeVoucher.code}</span>
              </div>

              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-[10px] text-indigo-700/90 leading-relaxed text-left">
                👉 <strong>Tester Quick Option:</strong> If you are testing this flow, click the button below to simulate the merchant's register scanning this voucher, marking it as used.
              </div>

              {/* Mark as used trigger */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUseVoucher(activeBarcodeVoucher.id)}
                className="w-full py-3 bg-slate-950 text-white rounded-2xl text-xs font-bold shadow-md hover:bg-slate-800 cursor-pointer"
              >
                Simulate Cashier Redemption Scan
              </motion.button>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </PhoneSimulator>
  );
}

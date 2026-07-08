import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Store, User } from '../types';

interface CashierSimulatorProps {
  user: User;
  stores: Store[];
  onAddTransaction: (storeName: string, amount: number, points: number, category: string) => void;
  onClose: () => void;
}

export default function CashierSimulator({ user, stores, onAddTransaction, onClose }: CashierSimulatorProps) {
  const [selectedStoreId, setSelectedStoreId] = useState(stores[0]?.id || 'nike');
  const [amountStr, setAmountStr] = useState('120');
  const [isBirthday, setIsBirthday] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState({ earnedPoints: 0, finalAmount: 0 });

  const selectedStore = stores.find(s => s.id === selectedStoreId) || stores[0];

  // Determine multiplier
  let multiplier = 1;
  if (user.tier === 'Gold') multiplier = 1.5;
  if (user.tier === 'Platinum') multiplier = 2;

  const calculatedBasePoints = Math.round(parseFloat(amountStr || '0') * multiplier);
  const finalPointsEarned = isBirthday ? calculatedBasePoints * 2 : calculatedBasePoints;

  const handleSimulateScan = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid purchase amount.');
      return;
    }

    onAddTransaction(
      selectedStore.name,
      amount,
      finalPointsEarned,
      selectedStore.category
    );

    setSuccessDetails({
      earnedPoints: finalPointsEarned,
      finalAmount: amount
    });
    
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-6 bg-slate-50 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center"
      >
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">Purchase Scanned!</h3>
        <p className="text-sm text-slate-500 mt-1.5 max-w-xs">
          The simulated checkout at <strong>{selectedStore.name}</strong> was successful.
        </p>

        {/* Receipt Recap */}
        <div className="my-5 p-4 bg-white rounded-xl border border-slate-100 shadow-sm w-full max-w-xs text-left text-xs font-mono flex flex-col gap-2">
          <div className="flex justify-between border-b border-dashed border-slate-200 pb-2">
            <span className="font-semibold uppercase text-slate-400">Merchant</span>
            <span className="text-slate-800 font-bold">{selectedStore.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Spent Amount</span>
            <span className="text-slate-800 font-bold">RM {successDetails.finalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tier Multiplier ({user.tier})</span>
            <span className="text-slate-800">{multiplier}x</span>
          </div>
          {isBirthday && (
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>🎂 Birthday Bonus</span>
              <span>2x Double!</span>
            </div>
          )}
          <div className="flex justify-between items-center border-t border-dashed border-slate-200 pt-2 text-sm mt-1">
            <span className="font-bold text-slate-800">Points Awarded</span>
            <span className="text-emerald-600 font-black text-base flex items-center gap-1">
              +{successDetails.earnedPoints} pts
            </span>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-full max-w-xs py-3 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-md hover:bg-slate-800 cursor-pointer"
        >
          Return to Dashboard
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="bg-slate-100/80 rounded-2xl p-4.5 border border-slate-200/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-[#C5A028]/10 text-[#C5A028] rounded-lg">
          <ShoppingBag className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Cashier Simulator Tool</h4>
          <p className="text-[10px] text-slate-500">Test points calculations and tier progression live</p>
        </div>
      </div>

      <form onSubmit={handleSimulateScan} className="flex flex-col gap-3">
        {/* Merchant Dropdown */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Select Merchant Store
          </label>
          <select
            value={selectedStoreId}
            onChange={(e) => setSelectedStoreId(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-400"
          >
            {stores.map(store => (
              <option key={store.id} value={store.id}>
                {store.logo} {store.name} ({store.location})
              </option>
            ))}
          </select>
        </div>

        {/* Spend Amount */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Purchase Spend (RM)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">RM</span>
              <input
                type="number"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                placeholder="100"
                min="1"
                required
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
            </div>
          </div>

          {/* Point Multiplier Estimation */}
          <div className="bg-white rounded-xl border border-slate-200 p-2 flex flex-col justify-center">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Estimated Points</span>
            <span className="text-sm font-black text-[#C5A028] flex items-center gap-1 mt-0.5">
              +{finalPointsEarned} <span className="text-[10px] font-normal text-slate-500">pts</span>
            </span>
          </div>
        </div>

        {/* Birthday Mode Checkbox */}
        <label className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-2.5 cursor-pointer hover:bg-slate-50 transition-colors">
          <input
            type="checkbox"
            checked={isBirthday}
            onChange={(e) => setIsBirthday(e.target.checked)}
            className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500"
          />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
              🎂 Birthday Purchase?
            </span>
            <span className="text-[9px] text-slate-400">Double Points Campaign Active (2x multiplier)</span>
          </div>
        </label>

        {/* Active multipliers disclaimer info */}
        <div className="flex items-start gap-1.5 p-2 bg-slate-50 rounded-xl text-[10px] text-slate-500">
          <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span>
            Based on Sarah's <strong className="text-slate-800">{user.tier} Membership</strong>, she earns a <strong className="text-slate-800">{multiplier}x</strong> multiplier.
          </span>
        </div>

        {/* Scan Trigger Button */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-xl bg-[#1C1C1E] text-white font-bold text-xs shadow-sm hover:bg-black transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simulate QR Scan by Cashier</span>
        </motion.button>
      </form>
    </div>
  );
}

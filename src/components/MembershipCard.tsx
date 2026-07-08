import React from 'react';
import { motion } from 'motion/react';
import { QrCode, Sparkles, ShieldCheck } from 'lucide-react';
import { User } from '../types';

interface MembershipCardProps {
  user: User;
  onOpenQR: () => void;
  onOpenTiers: () => void;
}

export default function MembershipCard({ user, onOpenQR, onOpenTiers }: MembershipCardProps) {
  // Determine card style based on user tier
  const isSilver = user.tier === 'Silver';
  const isGold = user.tier === 'Gold';
  const isPlatinum = user.tier === 'Platinum';

  // Points target for next tier
  let nextTierName = '';
  let pointsNeeded = 0;
  let progressPct = 100;

  if (isSilver) {
    nextTierName = 'Gold';
    pointsNeeded = Math.max(0, 1000 - user.points);
    progressPct = Math.min(100, (user.points / 1000) * 100);
  } else if (isGold) {
    nextTierName = 'Platinum';
    pointsNeeded = Math.max(0, 5000 - user.points);
    progressPct = Math.min(100, (user.points / 5000) * 100);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="px-5 py-4 w-full"
    >
      {/* Outer Card container with modern soft shadow */}
      <div 
        id="loyalty-card"
        className={`relative h-[220px] rounded-[24px] overflow-hidden p-6 flex flex-col justify-between transition-all duration-500 ${
          isSilver 
            ? 'bg-gradient-to-tr from-slate-300 via-slate-100 to-slate-200 text-slate-800 border border-slate-200/50 shadow-lg' 
            : isGold 
              ? 'bg-gradient-to-br from-[#D4AF37] to-[#C5A028] text-white border border-[#D4AF37]/50 shadow-[0_10px_20px_rgba(197,160,40,0.3)]' 
              : 'bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950 text-white border border-zinc-800 shadow-xl'
        }`}
      >
        {/* Decorative light reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform -skew-x-12 translate-x-1/2" />
        
        {/* Sparkles / Hologram effect */}
        <div className="absolute top-0 right-0 p-12 opacity-20 pointer-events-none">
          <Sparkles className="w-24 h-24 stroke-[1]" />
        </div>

        {/* Card Header */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <div className={`p-1.5 rounded-xl ${isSilver ? 'bg-slate-800/10' : isGold ? 'bg-white/20' : 'bg-zinc-800'}`}>
              <ShieldCheck className="w-5 h-5 text-current" />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase">RHB MALL</span>
          </div>
          
          {/* Tier Badge */}
          <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full ${
            isSilver 
              ? 'bg-slate-800/10 text-slate-800' 
              : isGold 
                ? 'bg-white/20 text-white' 
                : 'bg-gradient-to-r from-amber-400 to-yellow-300 text-neutral-900 shadow-sm'
          }`}>
            {user.tier} MEMBER
          </span>
        </div>

        {/* Card Middle: Balance */}
        <div className="z-10 mt-2">
          <p className={`text-[10px] uppercase tracking-wider font-semibold ${isSilver ? 'text-slate-600' : isGold ? 'text-amber-100/80' : 'text-zinc-400'}`}>
            Loyalty points
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold tracking-tight font-sans">
              {user.points.toLocaleString()}
            </span>
            <span className="text-xs font-medium">pts</span>
          </div>
        </div>

        {/* Card Footer: User Info & QR Button */}
        <div className="flex items-end justify-between z-10 mt-auto">
          <div>
            <p className={`text-[9px] uppercase tracking-wider ${isSilver ? 'text-slate-600' : isGold ? 'text-amber-100/70' : 'text-zinc-400'}`}>
              Cardholder
            </p>
            <p className="text-base font-bold tracking-tight">{user.name}</p>
          </div>

          {/* Quick-Scan QR Icon Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onOpenQR}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-semibold text-xs shadow-md backdrop-blur-md transition-colors cursor-pointer ${
              isSilver 
                ? 'bg-slate-800 text-white hover:bg-slate-900' 
                : isGold 
                  ? 'bg-white text-[#C5A028] hover:bg-slate-50' 
                  : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Show QR</span>
          </motion.button>
        </div>
      </div>

      {/* Progress to Next Tier indicator */}
      {!isPlatinum && (
        <div className="mt-3.5 px-2 flex flex-col gap-1.5" onClick={onOpenTiers}>
          <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
            <span>Progress to <strong className="text-slate-800 font-semibold">{nextTierName} Member</strong></span>
            <span>{pointsNeeded.toLocaleString()} pts left</span>
          </div>
          {/* Custom micro progress bar */}
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                isSilver 
                  ? 'bg-slate-400' 
                  : 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028]'
              }`} 
            />
          </div>
        </div>
      )}

      {/* Platinum status text if highest tier */}
      {isPlatinum && (
        <div className="mt-3.5 px-2 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Congratulations! You hold our highest <strong className="text-zinc-800 font-bold">Platinum</strong> tier tier-multiplier (2.0x points).</span>
        </div>
      )}
    </motion.div>
  );
}

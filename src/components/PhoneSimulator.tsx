import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneSimulatorProps {
  children: React.ReactNode;
}

export default function PhoneSimulator({ children }: PhoneSimulatorProps) {
  const [time, setTime] = useState('14:20');

  useEffect(() => {
    // Update simulated time based on actual clock
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center p-0 md:p-6 select-none font-sans overflow-hidden">
      {/* Phone Case */}
      <div className="relative w-full md:w-[412px] md:h-[846px] md:rounded-[48px] bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] flex flex-col transition-all duration-300 border-8 border-[#1C1C1E] overflow-hidden">
        
        {/* Dynamic Island / Camera Notch (Desktop only) */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1C1C1E] rounded-full z-50 hidden md:flex items-center justify-between px-4">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
          <div className="w-3 h-1 rounded-full bg-neutral-900/50" />
        </div>

        {/* Screen Container */}
        <div className="relative w-full h-full bg-[#F2F2F7] flex flex-col overflow-hidden text-[#1C1C1E] flex-grow">
          
          {/* iOS Top Status Bar (Responsive) */}
          <div className="h-11 bg-white px-6 flex items-center justify-between z-40 shrink-0 text-[#1C1C1E] border-b border-[#F2F2F7]">
            {/* Left side: Time */}
            <span className="text-xs font-semibold tracking-tight">{time}</span>
            
            {/* Right side: Indicators */}
            <div className="flex items-center gap-1.5 text-[#1C1C1E]">
              <Signal className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span className="text-[10px] font-bold tracking-tighter">5G</span>
              <Wifi className="w-3.5 h-3.5" strokeWidth={2.5} />
              <div className="flex items-center gap-0.5">
                <span className="text-[9px] font-bold">98%</span>
                <Battery className="w-5 h-3.5" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Actual Application Viewport */}
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar bg-[#F2F2F7]">
            {children}
          </div>

          {/* iOS Bottom Swipe Indicator */}
          <div className="h-5 bg-white flex items-center justify-center shrink-0 z-40 border-t border-[#F2F2F7]/50">
            <div className="w-28 h-1 bg-[#1C1C1E]/20 rounded-full" />
          </div>

        </div>
      </div>
    </div>
  );
}

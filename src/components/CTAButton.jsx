import React, { useState } from 'react';
import { ArrowRight, Send, ShieldAlert, Clock, Check } from 'lucide-react';
import { PAYMENT_URL, DM_HANDLE, RESPONSE_TIME } from '../config';
import { buyNow } from '../utils/buy';

export default function CTAButton({ 
  text = "GET THIS EBOOK", 
  subtext = null, 
  variant = "primary", 
  className = "",
  iconType = "send",
  showSubtext = true,
  showNoReturnBadge = true
}) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    buyNow();
    setClicked(true);
    setTimeout(() => setClicked(false), 3000);
  };

  const baseStyles = "inline-flex items-center justify-center font-black transition-all duration-300 rounded-xl cursor-pointer select-none text-center shadow-lg active:scale-95 group";
  
  const variants = {
    hero: "px-8 py-4 text-base sm:text-lg bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 hover:from-amber-400 hover:to-yellow-400 shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 border border-amber-300/40",
    primary: "px-7 py-3.5 text-base bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/25 hover:shadow-amber-400/35 hover:-translate-y-0.5 border border-amber-300/30",
    secondary: "px-6 py-3 text-sm sm:text-base bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-400/30 hover:border-amber-400/60 shadow-slate-950/50",
    sticky: "px-5 py-2.5 text-xs sm:text-sm bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-amber-400/30",
    nav: "px-4 py-2 text-xs sm:text-sm bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-amber-400/20"
  };

  return (
    <div className="inline-flex flex-col items-center max-w-full">
      <a
        href={PAYMENT_URL}
        onClick={handleClick}
        className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="flex items-center gap-2">
          {clicked ? (
            <>
              <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
              <span>OPENING INSTAGRAM DM...</span>
            </>
          ) : (
            <>
              {iconType === "send" && (
                <Send className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
              )}
              {iconType === "arrow" && (
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
              )}
              <span>{text}</span>
            </>
          )}
        </span>
      </a>

      {/* Response time & DM subtext */}
      {showSubtext && (
        subtext ? (
          <span className="text-xs text-slate-400 mt-2 font-medium tracking-wide text-center">
            {subtext}
          </span>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 font-medium">
            <Clock className="w-3 h-3 text-amber-400 shrink-0" />
            <span>Opens DM @{DM_HANDLE} with pre-typed message • Replies {RESPONSE_TIME.toLowerCase()}</span>
          </div>
        )
      )}

      {/* Visibly prominent No Return Policy notice */}
      {showNoReturnBadge && (
        <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-amber-400/90 tracking-wide uppercase">
          <ShieldAlert className="w-3 h-3 text-amber-400 shrink-0" />
          <span>Strict No-Return / No-Refund Policy</span>
        </div>
      )}
    </div>
  );
}

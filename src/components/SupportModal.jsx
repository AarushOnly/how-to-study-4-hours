import React, { useState } from 'react';
import { X, Heart, Copy, Check, ExternalLink } from 'lucide-react';
import { UPI_SUPPORT } from '../config';
import { isMobileDevice, getUpiDeepLink } from '../utils/device';

export default function SupportModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const isMobile = isMobileDevice();

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(UPI_SUPPORT.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDirectUpiPay = () => {
    window.location.href = getUpiDeepLink();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-md w-full bg-slate-900 rounded-3xl border border-amber-500/30 p-5 sm:p-8 shadow-2xl text-center max-h-[95vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Close support modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-3 sm:mb-4 shadow-lg">
          <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-amber-400/20 stroke-amber-400" />
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
          {isMobile ? "Pay / Support via UPI" : "Scan QR to Support"}
        </h3>
        <p className="text-xs text-slate-300 mb-5 leading-relaxed">
          {isMobile 
            ? "Tap below to launch your phone's UPI app (Google Pay, PhonePe, Paytm, BHIM) or copy the UPI ID." 
            : "Scan this UPI QR code using any payment app on your smartphone to support independent student productivity research."}
        </p>

        {/* Mobile Direct Action Button */}
        {isMobile && (
          <div className="mb-5">
            <button
              onClick={handleDirectUpiPay}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black text-sm sm:text-base uppercase tracking-wide shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 stroke-[2.5]" />
              <span>OPEN WITH ANY UPI APP</span>
            </button>
            <p className="text-[11px] text-amber-400/90 font-medium mt-1.5">
              Prompts your phone to choose Google Pay, PhonePe, Paytm, etc.
            </p>
          </div>
        )}

        {/* QR Code Container */}
        <div className="relative mx-auto max-w-[240px] sm:max-w-[260px] p-3 rounded-2xl bg-white shadow-xl mb-4 border-2 border-amber-400/30">
          <img 
            src={UPI_SUPPORT.qrImage} 
            alt="UPI QR Code - Aarush Yadav" 
            className="w-full h-auto object-contain rounded-xl"
          />
        </div>

        {/* UPI Details & Copy Box */}
        <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 mb-4 flex items-center justify-between gap-2 text-left">
          <div className="overflow-hidden">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Payee: {UPI_SUPPORT.name}
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold text-amber-400 truncate block">
              {UPI_SUPPORT.upiId}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy UPI</span>
              </>
            )}
          </button>
        </div>

        {/* App badges */}
        <div className="text-center">
          <span className="text-[11px] text-slate-400 block mb-2 font-medium">
            Supported Apps:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {UPI_SUPPORT.apps.map((app) => (
              <span 
                key={app} 
                className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700"
              >
                {app}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
          Thank you for supporting focused student productivity! 🙏
        </div>

      </div>
    </div>
  );
}

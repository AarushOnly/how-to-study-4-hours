import React, { useState, useEffect } from 'react';
import { CheckCircle2, ExternalLink, X } from 'lucide-react';
import { DM_HANDLE } from '../config';

export default function ToastNotification() {
  const [toastData, setToastData] = useState(null);

  useEffect(() => {
    const handleBuyNowEvent = (e) => {
      setToastData(e.detail);
      // Auto-dismiss after 6 seconds
      const timer = setTimeout(() => {
        setToastData(null);
      }, 6000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('ebook:buy-now', handleBuyNowEvent);
    return () => window.removeEventListener('ebook:buy-now', handleBuyNowEvent);
  }, []);

  if (!toastData) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-amber-400/40 rounded-2xl p-4 shadow-2xl shadow-black/60 flex items-start gap-3 text-left">
        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5 border border-emerald-500/20">
          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
        </div>

        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Opening Instagram DMs...
            </span>
            <button
              onClick={() => setToastData(null)}
              className="text-slate-400 hover:text-white p-1 -mr-1 -mt-1 cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-white font-semibold mt-1">
            "{toastData.message}"
          </p>

          <p className="text-[11px] text-slate-300 mt-1 leading-snug">
            Directly opening your chat with <span className="text-amber-300 font-bold">@{DM_HANDLE}</span> with this pre-typed message. Just tap Send!
          </p>

          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center gap-3">
            <a
              href={toastData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Tap to Open DM</span>
            </a>
            <span className="text-slate-600 text-[10px]">•</span>
            <span className="text-[10px] text-slate-400">
              Personal reply within 24h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

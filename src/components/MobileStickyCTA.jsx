import React, { useState, useEffect } from 'react';
import CTAButton from './CTAButton';

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero (approx 500px)
      const scrolled = window.scrollY > 450;
      // Hide if near the very bottom where the final CTA is visible
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
      setIsVisible(scrolled && !isNearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-slate-950/95 backdrop-blur-lg border-t border-amber-500/30 shadow-[0_-8px_30px_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              ₹59 • DM @deepfocusacademy
            </span>
          </div>
          <span className="text-[10px] text-slate-300 font-medium truncate">
            Replies in 24h • Strict No-Return Policy
          </span>
        </div>
        <CTAButton 
          text="GET NOW • ₹59" 
          variant="sticky" 
          className="text-xs px-4 py-2.5 whitespace-nowrap"
          showSubtext={false}
          showNoReturnBadge={false}
        />
      </div>
    </div>
  );
}

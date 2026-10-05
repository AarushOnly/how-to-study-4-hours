import React, { useState } from 'react';
import { BookOpen, Heart, ShieldAlert } from 'lucide-react';
import CTAButton from './CTAButton';
import LegalModal from './LegalModal';
import { BRAND_INFO } from '../config';
import { handleSupportClick } from '../utils/device';

export default function Footer({ onNavigateThankYou, onOpenSupport }) {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-20 md:pb-12 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Final CTA Bar */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center mb-16 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block mb-2">
                Join Serious Aspirants Today
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Build Your 4-Hour Daily Focus Fortress
              </h3>
              <p className="text-sm text-slate-300 mb-6">
                Start tomorrow morning with a clear desk, your phone locked away, and your Lead Domino ready.
              </p>
              
              <div className="mb-4">
                <CTAButton 
                  text="GET THIS EBOOK NOW • ₹59" 
                  variant="hero"
                  showNoReturnBadge={true}
                />
              </div>

              {/* Support / Tip button */}
              {onOpenSupport && (
                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-center">
                  <button
                    onClick={() => handleSupportClick(onOpenSupport)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-amber-300 bg-slate-950 border border-amber-400/30 hover:border-amber-400 hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-amber-400/20 text-amber-400" />
                    <span>Appreciate this work? Tip / Support via UPI</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Footer Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-800/80">
            
            {/* Brand Logo & Tagline */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-black">
                  <BookOpen className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="font-extrabold text-base tracking-tight text-white uppercase">
                  {BRAND_INFO.name}
                </span>
              </div>
              <p className="text-xs text-amber-400/90 font-medium tracking-wide">
                "{BRAND_INFO.series}"
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Empowering Indian aspirants with practical, distraction-free productivity systems.
              </p>
            </div>

            {/* Legal & Navigation Links */}
            <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold">
              <button
                onClick={() => setActiveModal('returns')}
                className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1 font-bold"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>No-Return Policy</span>
              </button>
              <span className="text-slate-700">•</span>
              <button
                onClick={() => setActiveModal('privacy')}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span className="text-slate-700">•</span>
              <button
                onClick={() => setActiveModal('terms')}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Terms
              </button>
              <span className="text-slate-700">•</span>
              <button
                onClick={() => setActiveModal('contact')}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Contact
              </button>
              {onOpenSupport && (
                <>
                  <span className="text-slate-700">•</span>
                  <button
                    onClick={() => handleSupportClick(onOpenSupport)}
                    className="text-amber-400/90 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Heart className="w-3.5 h-3.5 fill-amber-400/20" />
                    <span>Support via UPI</span>
                  </button>
                </>
              )}
              {onNavigateThankYou && (
                <>
                  <span className="text-slate-700">•</span>
                  <button
                    onClick={onNavigateThankYou}
                    className="text-slate-500 hover:text-amber-400 transition-colors cursor-pointer font-mono text-[11px]"
                  >
                    [Download Page]
                  </button>
                </>
              )}
            </div>

          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
            <p>
              Copyright © {BRAND_INFO.copyrightYear} {BRAND_INFO.name}. All rights reserved.
            </p>
            <p className="text-[11px] text-amber-400/80 font-medium">
              Strict No-Return / No-Refund Policy applies to all digital downloads.
            </p>
          </div>

        </div>
      </footer>

      {/* Render Legal / Policy / Contact Modal */}
      <LegalModal 
        modalType={activeModal} 
        onClose={() => setActiveModal(null)} 
      />
    </>
  );
}

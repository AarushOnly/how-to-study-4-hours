import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Download, Zap, Tag } from 'lucide-react';
import CTAButton from './CTAButton';
import { BOOK_PRICE } from '../config';

export default function CTA() {
  const ninetyDayImpact = [
    "360 Hours of pure, undistracted learning in 90 days",
    "Over 5,000 practice problems solved & logged in your Galti Diary",
    "Your entire syllabus mastered, revised, and locked into permanent memory",
    "Total confidence when you walk through the doors of the examination hall"
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative border-t border-slate-800 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-slate-900/90 to-slate-950 border border-amber-500/30 shadow-2xl text-center relative overflow-hidden">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Your Future Self Will Thank You
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Stop Collecting Study Advice. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400">
              Start Building Focus.
            </span>
          </h2>

          {/* Supporting Copy */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            You don't need another timetable video. You need a system you can actually execute.
          </p>

          {/* 90-Day Vision Callout (from Page 43) */}
          <div className="max-w-2xl mx-auto mb-10 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block mb-3">
              Where You Will Be 90 Days From Today (Page 43):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ninetyDayImpact.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 font-medium leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Callout */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-950 border border-amber-400/40 text-center mb-6 shadow-xl">
            <Tag className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Complete Manual & Bonuses:
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400">
              {BOOK_PRICE.display}
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              (59 Rupees • One-Time Access)
            </span>
          </div>

          {/* CTA Action */}
          <div className="flex flex-col items-center justify-center gap-4 mb-6">
            <CTAButton 
              text={`GET THIS EBOOK NOW • ${BOOK_PRICE.display}`} 
              variant="hero"
              showNoReturnBadge={true}
            />
          </div>

          {/* Transparent Policy Callout Banner */}
          <div className="max-w-xl mx-auto p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 text-center mb-6">
            <span className="font-bold text-amber-400 block mb-1">
              ⚠️ Strict No-Return & No-Refund Policy
            </span>
            <span>
              Due to the nature of instant downloadable digital ebooks, all purchases are final and non-refundable. Clicking the button directly opens your Instagram chat with <strong>@deepfocusacademy</strong> with your pre-typed message asking for the ₹59 ebook. Simply hit send in your DM—I reply within 24 hours.
            </span>
          </div>

          {/* Guarantees / Reassurance */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Download className="w-4 h-4 text-amber-400" />
              Direct Digital PDF Access
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Printable Trackers Included
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              Direct 1-on-1 DM Assistance
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

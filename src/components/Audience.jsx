import React from 'react';
import { CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

export default function Audience() {
  const forYouPoints = [
    "You sit at your study desk for 8 to 12 hours but end up with barely 90 minutes of true mental progress.",
    "Your smartphone keeps pulling your focus into Instagram Reels, YouTube Shorts, or Telegram groups.",
    "You repeatedly procrastinate because the first 15 minutes of studying feel exhausting and painful.",
    "You struggle to study inside a noisy Indian household with pressure cookers, TV serials, or frequent errands.",
    "You want a tactical, executable daily operating system rather than another 40-minute motivational video.",
    "You are preparing for demanding exams (JEE, NEET, UPSC, CA, GATE, CAT, SSC, Boards) or aiming to build serious academic discipline."
  ];

  const notForYouPoints = [
    "You are looking for a magic exam shortcut, overnight trick, or effortless cheat code.",
    "You expect guaranteed ranks, marks, or admission outcomes without putting in the mental sweat.",
    "You want to passively collect study techniques without actually moving your phone to another room.",
    "You only want temporary emotional motivation and have no intention of using the daily checklists."
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-950 relative border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Transparent Positioning
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Is This Ebook Right For You?
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            We believe in complete honesty. This manual is a practical field blueprint, not an entertainment book.
          </p>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* WHO THIS IS FOR */}
          <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-emerald-500/30 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    This Is For You If...
                  </h3>
                  <span className="text-xs text-emerald-400 font-medium">Ready to build genuine discipline</span>
                </div>
              </div>

              <ul className="space-y-4">
                {forYouPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200 leading-relaxed font-normal">
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 text-xs text-emerald-300 font-medium text-center">
              ✓ Designed specifically for your daily study challenges
            </div>
          </div>

          {/* WHO THIS IS NOT FOR */}
          <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-rose-900/40 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    This Is NOT For You If...
                  </h3>
                  <span className="text-xs text-rose-400 font-medium">Please do not purchase if this applies</span>
                </div>
              </div>

              <ul className="space-y-4">
                {notForYouPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300 leading-relaxed">
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 text-xs text-slate-400 text-center italic">
              We do not promise magical overnight miracles; only structured habits that work when implemented.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

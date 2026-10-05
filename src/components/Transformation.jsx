import React from 'react';
import { XCircle, CheckCircle, Target } from 'lucide-react';
import CTAButton from './CTAButton';

export default function Transformation() {
  const beforePoints = [
    "Phone rests 5 inches away on your study table",
    "Constant WhatsApp notifications and 15-second checks",
    "Binge-watching YouTube 'Study Strategy' & routine videos",
    "Coloring textbooks with neon highlighters (Fluency Illusion)",
    "Sitting 10–12 hours at a desk with barely 90 mins real output",
    "Waking up with decision fatigue: 'What should I study today?'"
  ];

  const afterPoints = [
    "Phone air-gapped in another room or handed over to parents",
    "Monastic desk + 3M Earplug Sandwich for an acoustic shield",
    "Disciplined 30-Day fast from empty motivational videos",
    "Active retrieval: Closed-Book Blurting & Feynman teaching",
    "4 pure, stopwatch-measured net hours of deep problem solving",
    "Lead Domino set the night before: open book, page & question ready"
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <Target className="w-3.5 h-3.5" />
            The Real-World Shift
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            From Distracted Study Sessions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400">
              → 4 Hours of Real Work
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            You don't need willpower. You need an airtight study environment and an active cognitive system.
          </p>
        </div>

        {/* Before / After Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          
          {/* Before Card */}
          <div className="rounded-2xl p-6 sm:p-8 bg-rose-950/20 border border-rose-900/40 relative">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-rose-900/30">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 border border-rose-500/30">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  The Distracted Routine
                </h3>
                <span className="text-xs text-rose-300 font-medium">Pseudo-Work & Brain Fog</span>
              </div>
            </div>

            <ul className="space-y-4">
              {beforePoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300 leading-snug">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After Card */}
          <div className="rounded-2xl p-6 sm:p-8 bg-emerald-950/20 border border-emerald-800/50 relative shadow-xl shadow-emerald-950/10">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-800/30">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  The 4-Hour Focus System
                </h3>
                <span className="text-xs text-emerald-300 font-medium">Deliberate Practice & Retention</span>
              </div>
            </div>

            <ul className="space-y-4">
              {afterPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-200 font-medium leading-snug">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* The Cal Newport Formula Banner (from Page 7) */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 block mb-1">
                The Cal Newport Formula for Exam Success (Page 7)
              </span>
              <div className="inline-block p-3 my-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-base sm:text-lg text-amber-300 font-bold">
                Real Learning = Time Spent × Intensity of Focus
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                • 10 Hours @ 2/10 Intensity (phone on table, distracted, sleepy) = <strong className="text-white">20 Units</strong><br />
                • 4 Hours @ 9.5/10 Intensity (zero phone, full focus, problem solving) = <strong className="text-emerald-400">38 Units</strong>
              </p>
              <p className="text-xs text-slate-400 mt-2 italic">
                In half the desk time, you achieve nearly double the actual retention—and keep your evenings free for family, exercise, and 8 hours of sleep.
              </p>
            </div>

            {/* CTA Placement #2 */}
            <div className="shrink-0 flex flex-col items-center">
              <CTAButton 
                text="GET THIS EBOOK" 
                variant="primary"
                showNoReturnBadge={true}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

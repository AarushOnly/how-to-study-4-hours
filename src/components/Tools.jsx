import React, { useState } from 'react';
import { 
  Printer, 
  CheckSquare, 
  ClipboardList, 
  Table, 
  Check 
} from 'lucide-react';
import CTAButton from './CTAButton';

export default function Tools() {
  // Interactive checklist state for interactive demo
  const [checkedItems, setCheckedItems] = useState({
    phone: true,
    desk: true,
    noise: false,
    water: true,
    rough: true,
    domino: true,
    timer: false
  });

  const toggleCheck = (key) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const checklist = [
    { key: "phone", label: "Phone Handed Over / Air-Gapped", detail: "Given to parents or locked in another room on silent mode." },
    { key: "desk", label: "Monastic Desk Ready", detail: "Only ONE textbook, ONE notebook, ONE pen on table. Zero clutter." },
    { key: "noise", label: "Noise Shield Active", detail: "3M foam earplugs inserted + over-ear headphones with Brown Noise queued." },
    { key: "water", label: "Hydration Placed", detail: "1-liter water bottle on desk with pinch of salt/electrolytes." },
    { key: "rough", label: "Distraction Rough Copy Open", detail: "Blank rough notepad and pen ready on your right side." },
    { key: "domino", label: "Lead Domino Set", detail: "Exact starting page and question number clearly marked." },
    { key: "timer", label: "Timer Ready", detail: "Stopwatch / timer set for Block 1. Ready to launch!" },
  ];

  return (
    <section id="tools" className="py-20 sm:py-28 bg-slate-900/60 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <Printer className="w-3.5 h-3.5" />
            Printable Field Toolkit
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Turn the Ebook Into a Daily System
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Chapter 17 includes print-ready templates designed to be pinned above your study desk so you never rely on fickle motivation.
          </p>
        </div>

        {/* Tools Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Tool 1: Interactive Pre-Study Flight Checklist */}
          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  TOOL 01 • CHAPTER 17
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  Interactive Demo
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-amber-400" />
                The 5-Minute Pre-Study Flight Checklist
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Check every single box 5 minutes before your 4-hour study session begins:
              </p>

              <div className="space-y-2.5">
                {checklist.map((item) => (
                  <div
                    key={item.key}
                    onClick={() => toggleCheck(item.key)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 select-none ${
                      checkedItems[item.key]
                        ? 'bg-amber-500/10 border-amber-500/30 text-white'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                      checkedItems[item.key] 
                        ? 'bg-amber-400 border-amber-400 text-slate-950 font-black' 
                        : 'border-slate-600 bg-slate-950'
                    }`}>
                      {checkedItems[item.key] && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className={`font-semibold ${checkedItems[item.key] ? 'text-amber-300' : 'text-slate-300'}`}>
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {item.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
              Printable PDF format ready to stick on your wall
            </div>
          </div>

          {/* Tool 2: Daily 4-Hour Study Planner & Stopwatch Log */}
          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  TOOL 02 • CHAPTER 17
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  Stopwatch Protocol
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-amber-400" />
                Daily 4-Hour Study Planner & Stopwatch Log
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Measures pure net hours, eliminates fake sitting, and locks tomorrow's Lead Domino.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex justify-between text-slate-400 pb-1 mb-1 border-b border-slate-800 text-[11px]">
                    <span>BLOCK 1 (90m / 50m)</span>
                    <span className="text-amber-400 font-bold">Hardest Theory</span>
                  </div>
                  <div className="text-slate-200">Chapter: Electromagnetism</div>
                  <div className="text-emerald-400 text-[11px] mt-1">[✓] Net Stopwatch Logged: 90 / 90 mins</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex justify-between text-slate-400 pb-1 mb-1 border-b border-slate-800 text-[11px]">
                    <span>BLOCK 2 (90m / 50m)</span>
                    <span className="text-amber-400 font-bold">Active PYQs & Drills</span>
                  </div>
                  <div className="text-slate-200">Target: Solve 35 Questions</div>
                  <div className="text-emerald-400 text-[11px] mt-1">[✓] Correct: 31 / 35 | Net: 90 mins</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex justify-between text-slate-400 pb-1 mb-1 border-b border-slate-800 text-[11px]">
                    <span>BLOCK 3 (60m / 50m)</span>
                    <span className="text-amber-400 font-bold">Galti Diary Analysis</span>
                  </div>
                  <div className="text-slate-200">Mistakes Logged: 4 | Formulas Tested</div>
                  <div className="text-emerald-400 text-[11px] mt-1">[✓] Net Stopwatch Logged: 60 / 60 mins</div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                  <span className="font-bold block text-[11px] text-amber-400">RAAT KI TAIYARI (LEAD DOMINO):</span>
                  <span className="text-[11px]">Book: NCERT Physics • Opening: Page 84, Q#1</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
              Replaces vague desk sitting with unshakeable daily accountability
            </div>
          </div>

          {/* Tool 3: Galti Diary Template */}
          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  TOOL 03 • CHAPTER 17
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  AIR 1 Format
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-2">
                <Table className="w-5 h-5 text-amber-400" />
                The Official Galti Diary Template
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Sample format straight from page 42 of the manual to turn errors into top percentiles:
              </p>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between font-mono text-[11px] text-amber-400 mb-1">
                    <span>Oct 12 • Q.14</span>
                    <span className="text-slate-400">Physics: Inclined Plane</span>
                  </div>
                  <div className="text-rose-400 text-[11px] mb-1">
                    <strong>Mistake:</strong> Calculation blunder; forgot cos θ factor.
                  </div>
                  <div className="text-emerald-300 text-[11px] bg-slate-950 p-2 rounded border border-slate-800 font-mono">
                    <strong>Rule:</strong> Always resolve normal force perpendicular to incline (N = mg cos θ).
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between font-mono text-[11px] text-amber-400 mb-1">
                    <span>Oct 12 • Q.29</span>
                    <span className="text-slate-400">Chemistry: Cannizzaro</span>
                  </div>
                  <div className="text-rose-400 text-[11px] mb-1">
                    <strong>Mistake:</strong> Misread: picked compound WITH alpha hydrogen.
                  </div>
                  <div className="text-emerald-300 text-[11px] bg-slate-950 p-2 rounded border border-slate-800 font-mono">
                    <strong>Rule:</strong> Cannizzaro occurs ONLY in aldehydes WITHOUT alpha hydrogens!
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
              Review 15 pages of mistakes instead of 1,000 pages of notes before exam day
            </div>
          </div>

        </div>

        {/* CTA Placement #4 (After bonuses/tools) */}
        <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-amber-500/15 border border-amber-500/30 text-center shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block mb-1">
              Field Trackers Included in Digital Download
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Get the Complete 43-Page Ebook & Printables
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Immediate access • Only ₹59 (One-time) • Optimized for phones, tablets & desktops
            </p>
          </div>

          <div className="shrink-0">
            <CTAButton 
              text="GET THIS EBOOK • ₹59" 
              variant="hero"
              showNoReturnBadge={true}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

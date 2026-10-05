import React, { useState } from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function StudySchedules() {
  const [activeTab, setActiveTab] = useState(0);

  const schedules = [
    {
      id: "90-90-60",
      title: "The 90-90-60 Power Schedule",
      subtitle: "Best for Theory-Heavy Subjects, NCERT Memorization, UPSC & Medical Syllabi",
      summary: "Based on natural 90-minute human Ultradian Rhythms. Finishes your complete 4-hour study quota by 1:20 PM before lunch.",
      tag: "Theory & Revision",
      blocks: [
        { time: "08:00 – 08:30", label: "Morning Priming (30m)", desc: "Hydrate, wash face, desk check, open exact chapter. Zero phone, zero social media.", type: "prep" },
        { time: "08:30 – 10:00", label: "Block 1: Hardest Theory (90m)", desc: "Master new, complex concepts (e.g. Electromagnetism, Genetics, Articles). Phone locked.", type: "focus" },
        { time: "10:00 – 10:25", label: "Reset Break (25m)", desc: "Balcony panoramic gaze, fresh air, light stretch. SCREEN-FREE BREAK.", type: "break" },
        { time: "10:25 – 11:55", label: "Block 2: Active Practice (90m)", desc: "Solve question sets, answer PYQs, draw diagrams from memory. Stopwatch running.", type: "focus" },
        { time: "11:55 – 12:20", label: "Rest & Reset (25m)", desc: "Cold water face splash, green tea or chai, rest eyes and posture.", type: "break" },
        { time: "12:20 – 13:20", label: "Block 3: Revision & Flashcards (60m)", desc: "Review mistakes from Block 2, test memory on formulas, set tomorrow's starting target.", type: "focus" },
        { time: "13:20", label: "Day's Work Done! 🎉", desc: "4.0 Pure hours logged in your study diary. Desk cleared. Rest of the day is 100% guilt-free!", type: "complete" }
      ],
      takeaway: "By 1:20 PM your core study quota is in the bank while others are still scrolling reels or struggling to start."
    },
    {
      id: "50-10-quad",
      title: "The 50/10 Quad Flow",
      subtitle: "Best for Mathematics, Physics, Numerical Sets, and Speed Practice",
      summary: "Traditional 25m Pomodoro interrupts numerical flow. The Quad Flow gives 50 minutes of deep problem-solving with a strict 10m recharge.",
      tag: "Numericals & Speed",
      blocks: [
        { time: "09:00 – 09:50", label: "Quad 1: Formula Revision & Warmup (50m)", desc: "Rapid 15-question warmup and formula sheet recall. (Followed by 10m water/stretch break).", type: "focus" },
        { time: "10:00 – 10:50", label: "Quad 2: Advanced Numerical Sets (50m)", desc: "High-difficulty multi-concept problem solving. (Followed by 10m cold-water eye splash).", type: "focus" },
        { time: "11:00 – 11:50", label: "Quad 3: Timed Speed Drill (50m)", desc: "Exam-speed drill: 30 questions under strict 45-minute countdown. (Followed by 10m sky gaze).", type: "focus" },
        { time: "12:00 – 12:50", label: "Quad 4: Error Log Analysis (50m)", desc: "MANDATORY: Dissect every wrong answer and log into your Galti Diary. Never skip Quad 4!", type: "focus" },
        { time: "12:50", label: "Session Complete! 🏁", desc: "Total: 200 minutes pure problem solving + 40 minutes restorative rest.", type: "complete" }
      ],
      takeaway: "Quad 4 is where rank improvement actually happens: 50 minutes dissecting mistakes teaches more than solving 100 easy questions."
    },
    {
      id: "2x2-split",
      title: "The Morning & Night Split (2x2)",
      subtitle: "Best for Students Attending College, School, or Offline Coaching Centers",
      summary: "Cramming 4 continuous hours after an exhausting 8-hour day causes burnout. The 2x2 anchors your study into two distinct 2-hour blocks.",
      tag: "Coaching & College",
      blocks: [
        { time: "06:00 – 08:00", label: "Anchor 1: Dawn Fortress (2 Hours)", desc: "High-energy theory & hard topics before the house wakes up. Fresh mind, zero fatigue. Revise lecture notes in advance.", type: "focus" },
        { time: "08:30 – 17:30", label: "The Day Shift (9 Hours)", desc: "College lectures, offline coaching classes, commute, and lunch.", type: "day" },
        { time: "17:30 – 18:30", label: "The Energy Reset (1 Hour)", desc: "Power nap, cold face wash, chai, decompress from commute. No studying during this hour.", type: "break" },
        { time: "18:30 – 20:30", label: "Anchor 2: Dusk Fortress (2 Hours)", desc: "GOLDEN RULE: Active pencil-on-paper problem solving ONLY (homework, DPPs, mock sets). Never read dense theory when tired!", type: "focus" },
        { time: "20:30", label: "Quota Complete! 🌟", desc: "4.0 Hours logged despite a full day of offline coaching and classes.", type: "complete" }
      ],
      takeaway: "The physical act of pencil-on-paper problem solving in the evening keeps your brain alert even when tired from travel."
    }
  ];

  const currentSchedule = schedules[activeTab];

  return (
    <section id="timetables" className="py-20 sm:py-28 bg-slate-900/60 relative border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-4">
            <Clock className="w-3.5 h-3.5" />
            Tested Schedules
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            The 3 Proven 4-Hour Study Timetables
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            One size does NOT fit all. Choose the exact timetable engineered for your specific subject type and daily routine.
          </p>
        </div>

        {/* Schedule Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {schedules.map((sched, idx) => (
            <button
              key={sched.id}
              onClick={() => setActiveTab(idx)}
              className={`px-4 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center gap-2.5 border ${
                activeTab === idx
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-400/20 scale-105'
                  : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{sched.title.split(':')[0]}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold uppercase ${
                activeTab === idx ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-amber-300'
              }`}>
                {sched.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Schedule Display Card */}
        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Header of Active Schedule */}
          <div className="mb-8 pb-6 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                {currentSchedule.tag} Blueprint
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                {currentSchedule.title}
              </h3>
              <p className="text-sm font-medium text-slate-300">
                {currentSchedule.subtitle}
              </p>
            </div>
            <div className="text-xs text-slate-400 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 max-w-sm">
              {currentSchedule.summary}
            </div>
          </div>

          {/* Timeline Sequence */}
          <div className="space-y-3.5">
            {currentSchedule.blocks.map((block, bIdx) => {
              const isComplete = block.type === "complete";
              const isBreak = block.type === "break" || block.type === "prep";
              const isDay = block.type === "day";

              return (
                <div 
                  key={bIdx}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isComplete
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                      : isDay
                      ? 'bg-slate-900/40 border-slate-800/60 text-slate-400'
                      : isBreak 
                      ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                      : 'bg-slate-900/90 border-slate-700/80 text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-xs sm:text-sm font-bold px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-amber-300">
                      {block.time}
                    </span>
                    <span className={`text-sm sm:text-base font-bold ${isComplete ? 'text-amber-300' : 'text-white'}`}>
                      {block.label}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 sm:text-right max-w-lg">
                    {block.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Takeaway */}
          <div className="mt-8 p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              <strong className="text-white">Why This Produces Results: </strong> 
              {currentSchedule.takeaway}
            </p>
          </div>

          {/* Honesty Note */}
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 justify-center">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Choose the schedule that matches your reality. Never force a schedule that fights your coaching or college commitments.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}

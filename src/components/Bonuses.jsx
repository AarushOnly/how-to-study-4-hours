import React from 'react';
import { 
  Send, 
  Sun, 
  EyeOff, 
  BookMarked, 
  Timer, 
  PlayCircle, 
  ShieldCheck, 
  TrendingUp, 
  Gift, 
  Zap 
} from 'lucide-react';

export default function Bonuses() {
  const bonusHacks = [
    {
      num: "01",
      icon: Send,
      title: 'The "Telegram Ghost Mode" Protocol',
      tag: "Digital Hygiene",
      desc: 'Mute and archive all 30 study channels. Set a single 15-minute download window once a week at 8:00 PM. Download the exact required DPP and immediately exit. Stop wasting 2 hours a day on group arguments and exam rumors. Hoarding 500 PDFs will not clear your exam; mastering 1 PDF will.'
    },
    {
      num: "02",
      icon: Sun,
      title: "Exam Hall Circadian Alignment",
      tag: "Biological Tuning",
      desc: 'Most national Indian exams run 9:00 AM – 12:00 PM and 2:00 PM – 5:00 PM. If you nap between 2 PM and 4 PM, your brain will enter sleep-mode in the exam hall! Train your 4-hour study blocks during the exact hours of your future exam shift.'
    },
    {
      num: "03",
      icon: EyeOff,
      title: 'The "Greyscale" Screen Trick',
      tag: "Phone De-Addiction",
      desc: 'Turn your smartphone display to Black & White (Greyscale in Accessibility settings). Without vibrant red notifications and flashy thumbnail colors, Instagram and YouTube instantly feel lifeless and boring—dropping usage by ~40% overnight.'
    },
    {
      num: "04",
      icon: BookMarked,
      title: 'The "Galti Diary" (Silly Mistake Notebook)',
      tag: "AIR 1 Secret",
      desc: 'The #1 habit used by top rankers. A dedicated 100-page notebook recording: (1) Question Topic, (2) Why did I get it wrong (calculation blunder, formula misremembered), and (3) The Correct Rule in 1 Line. Reviewing 15 pages of mistakes jumps your percentile.'
    },
    {
      num: "05",
      icon: Timer,
      title: 'The "Stopwatch Net-Study Rule"',
      tag: "Time Honesty",
      desc: 'Stop measuring gross sitting time. Place an inexpensive digital stopwatch next to your notebook. Start only when pen touches paper; pause the exact second you stand up or look away. Aim for 4 pure, paused-free net hours.'
    },
    {
      num: "06",
      icon: PlayCircle,
      title: 'The "No-Strategy-Video" Fast',
      tag: "Focus Recovery",
      desc: 'Take an immediate 30-Day Fast from "AIR 1 Routine" and "Syllabus in 30 Days" videos. They provide fake dopamine and pseudo-productivity. No YouTube video can replace you sitting in a chair solving 50 numerical problems with your own hand.'
    },
    {
      num: "07",
      icon: ShieldCheck,
      title: 'The "Sharma Ji Ka Beta" Mental Shield',
      tag: "Psychological Immunity",
      desc: 'Handle parental comparisons and fear with a mindset shift: A mock test is not a judgment of your intelligence; it is simply a medical blood test report diagnosing which vitamin or concept is deficient so you can prescribe the remedy.'
    },
    {
      num: "08",
      icon: TrendingUp,
      title: "The Emergency 7-Day Jumpstart Calibration Plan",
      tag: "Habit Ramp-Up",
      desc: 'If your study routine is completely collapsed, do not force 4 hours on Day 1. Follow the exact 7-day progressive ladder: Day 1 (60m) → Day 2 (90m) → Day 3 (150m) → Day 4 (180m) → Day 5 (210m) → Day 6 (240m full protocol) → Day 7 (celebrate & plan).'
    }
  ];

  return (
    <section id="bonuses" className="py-20 sm:py-28 bg-slate-950 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            Hidden Tactical Toolkit
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            PLUS: 8 Hidden Bonus Hacks
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Rarely discussed on social media because they aren't flashy—yet these exact 8 shortcuts are considered holy scripture among top 1% rankers.
          </p>
        </div>

        {/* 8 Bonus Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bonusHacks.map((hack) => {
            const Icon = hack.icon;
            return (
              <div 
                key={hack.num}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 hover:bg-slate-900 transition-all duration-300 group flex flex-col justify-between shadow-lg shadow-black/40 relative overflow-hidden"
              >
                {/* Subtle Card Glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-amber-400/90 tracking-tighter">
                      #{hack.num}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                      {hack.tag}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-300 mb-3 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors leading-snug">
                    {hack.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {hack.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-xs font-semibold text-amber-400/90">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Unfair Advantage</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

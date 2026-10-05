import React from 'react';
import { 
  ShieldAlert, 
  Layers, 
  Lock, 
  Timer, 
  FileText, 
  BookMarked, 
  CheckSquare, 
  Moon, 
  Sparkles,
  Zap
} from 'lucide-react';

export default function StudySystems() {
  const systems = [
    {
      name: "The 20-Second Friction Rule",
      tag: "Environmental Design",
      icon: ShieldAlert,
      desc: "Make any distraction take more than 20 seconds of physical effort to reach. Your brain's impulsive dopamine craving dies down before you can give in."
    },
    {
      name: "The Monastic Desk",
      tag: "Workspace Sanctity",
      icon: Layers,
      desc: "Strip your study table down to ONE book, ONE notebook, ONE pen, and ONE water bottle. Eliminating visual clutter stops subconscious subject anxiety."
    },
    {
      name: "The Phone Lockdown Protocol",
      tag: "Digital Air-Gap",
      icon: Lock,
      desc: "Physically place your phone in another room, hand it to your parents until 12:30 PM, or power it off so you cannot reflexively unlock it."
    },
    {
      name: "The 10-Minute Momentum Rule",
      tag: "Overcoming Laziness",
      icon: Timer,
      desc: "Bargain with your brain to do just 10 minutes on one page. Once the initial biological noradrenaline resistance passes, deep focus flows effortlessly."
    },
    {
      name: "Closed-Book Blurting",
      tag: "Active Recall",
      icon: FileText,
      desc: "Read a section, slam the textbook completely shut, write down everything from pure memory on rough paper, and verify your exact knowledge gaps in red ink."
    },
    {
      name: 'The "Distraction Rough Copy"',
      tag: "Mental Loop Closer",
      icon: BookMarked,
      desc: "Keep a scratch pad to your right. The moment a stray errand or anxiety pops in, write it in 3 words to close the mental loop and keep studying."
    },
    {
      name: 'The "Galti Diary" (Silly Mistake Log)',
      tag: "Error Eradication",
      icon: CheckSquare,
      desc: "Log every incorrect question with its exact topic, why you made the mistake, and the 1-line corrective rule. Eliminating known blunders jumps your percentile."
    },
    {
      name: 'The "Lead Domino" (Raat Ki Taiyari)',
      tag: "Zero Morning Friction",
      icon: Zap,
      desc: "Before sleeping, open tomorrow morning's book to the exact page with a sticky note marking Question #1. You wake up and start instantly without deciding."
    },
    {
      name: "5-Minute Nightly Shutdown Ritual",
      tag: "Memory Consolidation",
      icon: Moon,
      desc: "Log net hours, clear your desk, set tomorrow's lead domino, and recite the mental closure sentence so your brain enters deep memory-building sleep."
    }
  ];

  return (
    <section id="systems" className="py-20 sm:py-28 bg-slate-950 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Field-Tested Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Featured Systems You Will Master
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            No vague philosophy. These are the exact tactical routines that turn chaotic days into 4 hours of pure, unbroken output.
          </p>
        </div>

        {/* 9 Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((sys, idx) => {
            const Icon = sys.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-amber-400/40 hover:bg-slate-900 transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-black/50"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:border-amber-400/40 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                      {sys.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {sys.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {sys.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-slate-500 group-hover:text-amber-400/80 transition-colors">
                  <span className="text-[11px] font-mono uppercase tracking-wider">System #{idx + 1}</span>
                  <span className="text-xs font-bold">Included in Ebook →</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

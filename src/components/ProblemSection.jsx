import React from 'react';
import { 
  Smartphone, 
  Flame, 
  MessageSquare, 
  BrainCircuit, 
  Volume2, 
  Highlighter, 
  Clock, 
  Moon, 
  AlertTriangle
} from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: Smartphone,
      title: 'The "Just 10 Seconds" Trap',
      quote: '"Let me quickly see who messaged on WhatsApp."',
      desc: 'Science shows attention is like wet chewing gum. A 15-second glance leaves mental "attention residue" that keeps your working memory at a 30% discount for the next 20 to 30 minutes.'
    },
    {
      icon: Flame,
      title: 'Dopamine Hijacking & Morning Scrolls',
      quote: 'Waking up and checking Reels before getting out of bed.',
      desc: 'Short videos flood your brain with effortless dopamine every 15 seconds. When you sit with a motionless NCERT textbook an hour later, your brain feels restless, bored, and agitated.'
    },
    {
      icon: MessageSquare,
      title: 'The Telegram PDF Hoarding Trap',
      quote: 'Joined 30 study channels, collected 500 PDFs, read none.',
      desc: 'Students spend 2 hours every day reading student arguments, cut-off rumors, and downloading test series they will never solve instead of doing pencil-on-paper work.'
    },
    {
      icon: Volume2,
      title: 'Noisy Indian Household Chaos',
      quote: 'Pressure cooker whistles, TV serials, and sudden errands.',
      desc: 'You sit down to understand an organic chemistry reaction, and suddenly the kitchen cooker whistles, street vendors shout outside, or you are sent to the local shop for dahi.'
    },
    {
      icon: BrainCircuit,
      title: 'Noradrenaline Agitation & Daydreaming',
      quote: '"Aaj mood nahi ban raha... shaam ko padhenge."',
      desc: 'The first 15 minutes of any study session trigger biological brain friction (noradrenaline). Average students run away to their phones; toppers push through the warm-up engine.'
    },
    {
      icon: Highlighter,
      title: 'The "Fluency Illusion" Coloring Book',
      quote: 'Turning your textbook into neon yellow, pink and green art.',
      desc: 'Re-reading and highlighting gives a false feeling of mastery. Your brain recognizes words easily, but in the exam hall you cannot retrieve formulas out of thin air.'
    },
    {
      icon: Clock,
      title: 'The 12-Hour "Sitting" vs. "Studying" Scam',
      quote: '"Bhai, aaj maine library mein 14 ghante study ki!"',
      desc: 'Most 12-hour library marathons contain barely 90 minutes of true high-intensity work. The rest is daydreaming, looking at the syllabus, heavy food comas, and pseudo-work.'
    },
    {
      icon: Moon,
      title: 'All-Nighters That Erase Your Memory',
      quote: 'Drinking 4 cups of chai and studying till 5:00 AM.',
      desc: 'Neuroscience proves memories are not stored at your desk—they are locked into long-term neocortex memory during slow-wave deep sleep. Sleeping only 4 hours deletes up to 70% of what you studied.'
    }
  ];

  return (
    <section id="problem" className="py-20 sm:py-28 bg-slate-900/60 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            The Real Cause of Study Frustration
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
            You're Not Lazy. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-amber-500">
              Your Study Environment Is Fighting You.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            In cramped study cubicles across Kota, Mukherjee Nagar, Hyderabad, Pune, and bedrooms at home, millions of sincere aspirants sit with high hopes—only to find their focus hijacked by biological friction and digital traps.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800/90 hover:border-slate-700 hover:bg-slate-950 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-lg hover:shadow-black/40"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:border-amber-500/40 transition-all mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
                    {prob.title}
                  </h3>

                  <p className="text-xs font-mono text-slate-400 italic bg-slate-900/60 p-2 rounded-lg border border-slate-800/60 mb-3">
                    {prob.quote}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {prob.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Frank message callout from Page 3 */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/30 text-center max-w-4xl mx-auto shadow-xl">
          <p className="text-xs font-bold tracking-widest uppercase text-amber-400 mb-2">
            A Frank Message to Every Indian Aspirant
          </p>
          <blockquote className="text-base sm:text-lg text-slate-200 font-medium italic leading-relaxed">
            "You don't need a 16-hour fake study routine. You don't need to watch another 30-minute 'Topper's Daily Routine' or 'Best Time Table' video on YouTube. You just need <strong className="text-amber-300 font-bold not-italic">4 honest, laser-focused, phone-free hours</strong> every day. Those 4 real hours will change your marks, your rank, and your life."
          </blockquote>
          <p className="text-xs text-slate-400 mt-3 font-semibold">
            — Deep Focus Student Academy (Page 3)
          </p>
        </div>

      </div>
    </section>
  );
}

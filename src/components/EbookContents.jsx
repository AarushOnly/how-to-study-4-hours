import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Bookmark } from 'lucide-react';
import CTAButton from './CTAButton';

export default function EbookContents() {
  const [openPart, setOpenPart] = useState(0);

  const parts = [
    {
      partNumber: "PART I",
      title: "The Truth About Your Brain & Distractions",
      summary: "Understand the neuroscience of cheap dopamine, pseudo-work, and why human willpower alone cannot overcome a smartphone.",
      chapters: [
        {
          num: "Chapter 1",
          title: "The 12-Hour Study Scam vs. The 4-Hour Secret",
          desc: "Why sitting 14 hours at a library desk is fake pseudo-work. Anders Ericsson's 4-hour cognitive limit and Cal Newport's Real Learning formula."
        },
        {
          num: "Chapter 2",
          title: "Why Your Mind Keeps Wandering Every 10 Minutes",
          desc: "How 15-second Reels rewire your dopamine baseline. The fatal 'Waking Scroll' error and the Golden 60–90 Minute morning rule."
        },
        {
          num: "Chapter 3",
          title: 'The Danger of "Just Checking for 10 Seconds"',
          desc: "Dr. Sophie Leroy's Attention Residue theory (sticky chewing gum brain), Dr. Gloria Mark's 23-minute recovery rule, and why a phone face-down on your desk leeches IQ."
        }
      ]
    },
    {
      partNumber: "PART II",
      title: "Creating Your Distraction-Free Study Zone",
      summary: "Make distraction physically impossible to reach, survive noisy households, and lock down digital study tools.",
      chapters: [
        {
          num: "Chapter 4",
          title: "The 20-Second Friction Rule & Monastic Desk",
          desc: "Add 20+ seconds of physical friction to kill impulses. The 3-step phone lockdown (almirah, 'Mummy/Papa handover' till 12:30 PM, or power off). Strip your desk to 1 book, 1 notebook, 1 pen, 1 water bottle."
        },
        {
          num: "Chapter 5",
          title: "Taming the Digital Demons (Phone, Telegram & YouTube)",
          desc: "How to attend online coaching without getting trapped. Set up an 'Exam-Only' Android Second Space / Work Profile, use Download & Airplane Mode, and strict blockers."
        },
        {
          num: "Chapter 6",
          title: "Beating Noisy Indian Homes & Street Noise",
          desc: "The ₹100 Topper Acoustic Shield: 3M foam earplugs inside the ear + over-ear headphones playing continuous Brown Noise. The 'Study Flag' door sign and the 5:00 AM Brahma Muhurta shift."
        }
      ]
    },
    {
      partNumber: "PART III",
      title: "The 3 Proven 4-Hour Study Timetables",
      summary: "Three distinct, flexible scheduling architectures designed for different student scenarios—plus how to overcome the agonizing first 15 minutes.",
      chapters: [
        {
          num: "Chapter 7",
          title: "Timetable 1: The 90-90-60 Power Schedule",
          desc: "Gold standard for theory-heavy syllabi (Biology, History, NCERT, UPSC). 90m hardest theory, 25m screen-free rest, 90m active practice, 25m reset, 60m revision. Finished by 1:20 PM."
        },
        {
          num: "Chapter 8",
          title: "Timetable 2: The 50/10 Quad Flow",
          desc: "Engineered for Mathematics, Physics, and numerical drills. Why 25m Pomodoros interrupt math flow. Four 50m blocks + 10m breaks, including the mandatory Quad 4 Error Log Analysis."
        },
        {
          num: "Chapter 9",
          title: "Timetable 3: The Morning & Night Split (2x2)",
          desc: "Designed for students with college or offline coaching. Anchor 1: Dawn Fortress (6–8 AM high-energy theory) + Anchor 2: Dusk Fortress (6:30–8:30 PM pencil-on-paper problem sets)."
        },
        {
          num: "Chapter 10",
          title: "Surviving the First 15 Minutes of Agony",
          desc: "Understanding the biological Noradrenaline warm-up. The '10-Minute Momentum Rule' bargain and setting tomorrow's 'Lead Domino' (Raat Ki Taiyari) to kill morning hesitation."
        }
      ]
    },
    {
      partNumber: "PART IV",
      title: "How Toppers Actually Study: Tactics & Hacks",
      summary: "Replace passive highlighting with high-yield active recall and learn the exact screen-free break protocols.",
      chapters: [
        {
          num: "Chapter 11",
          title: "Stop Highlighting! Use Active Recall",
          desc: "Dr. Jeffrey Karpicke's study on the Fluency Illusion. Master the 3 retrieval methods: Closed-Book Blurting, Feynman Technique (teach simply in Hindi/English), and PYQ-First rule."
        },
        {
          num: "Chapter 12",
          title: 'The "Distraction Rough Copy" & Urge Surfing',
          desc: "The analog brain-dump pad to capture stray thoughts in 3 words and close the mental loop. Brown University's 90-second Urge Surfing protocol to let phone cravings pass."
        },
        {
          num: "Chapter 13",
          title: "What to Do in Breaks (Hint: NEVER Touch Phone!)",
          desc: "Why scrolling during breaks wipes newly learned memory and depletes dopamine. The 4 screen-free break activities: Panoramic Vision, Cold Water Splash, and 10-Minute NSDR."
        }
      ]
    },
    {
      partNumber: "PART V",
      title: "Food, Chai, Sleep & Energy",
      summary: "Master the biological engine: defeat the afternoon rice slump, optimize caffeine timing, and let deep sleep lock your knowledge.",
      chapters: [
        {
          num: "Chapter 14",
          title: 'Beating the Afternoon "Rice / Paratha" Sleep Slump',
          desc: "The science of reactive hypoglycemia (food coma). Light protein lunches vs. evening feasts. Smart chai rules (no chai first 60m, sugar cuts, 4 PM caffeine curfew, and 2% dehydration cliff)."
        },
        {
          num: "Chapter 15",
          title: "Why All-Nighters Destroy Your Exam Rank",
          desc: "Dr. Matthew Walker's discovery: Hippocampus (RAM) to Neocortex (Hard Drive) memory consolidation during Slow-Wave Sleep. The 5-Minute Nightly Shutdown Ritual."
        }
      ]
    },
    {
      partNumber: "PART VI",
      title: "8 Hidden Bonus Hacks & Field Toolkit",
      summary: "The unpublicized tactics used by top 1% rankers to manage Telegram, circadian rhythm, mistake tracking, and parental expectations.",
      chapters: [
        {
          num: "Chapter 16",
          title: "8 Hidden Bonus Hacks Used by Top 1% Rankers",
          desc: "Telegram Ghost Mode, Exam Hall Circadian Alignment, Greyscale Screen Trick, Galti Diary, Stopwatch Net-Study Rule, No-Strategy-Video Fast, Sharma Ji Ka Beta Mental Shield, and 7-Day Jumpstart Plan."
        },
        {
          num: "Chapter 17",
          title: "Printable Field Tools & Daily Trackers",
          desc: "5-Minute Pre-Study Flight Checklist, Daily 4-Hour Study Planner & Stopwatch Log, and Galti Diary Template. Ready to print and stick on your desk."
        }
      ]
    }
  ];

  return (
    <section id="contents" className="py-20 sm:py-28 bg-slate-900/40 relative border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Complete Curriculum
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            What's Inside The Ebook
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A 6-part, 17-chapter manual built exclusively on realistic, field-tested systems for Indian aspirants.
          </p>
        </div>

        {/* Accordion / Parts List */}
        <div className="space-y-4 mb-16">
          {parts.map((part, index) => {
            const isOpen = openPart === index;
            return (
              <div 
                key={part.partNumber}
                className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden transition-colors hover:border-slate-700"
              >
                {/* Part Header Button */}
                <button
                  onClick={() => setOpenPart(isOpen ? -1 : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="shrink-0 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-mono font-bold border border-amber-500/20">
                      {part.partNumber}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {part.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-1 sm:line-clamp-none">
                        {part.summary}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 p-2 rounded-lg bg-slate-900 text-slate-400 border border-slate-800">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-amber-400" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Chapters Drawer */}
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-slate-800/80 bg-slate-900/30">
                    <div className="space-y-4 pt-2">
                      {part.chapters.map((ch, chIdx) => (
                        <div 
                          key={chIdx}
                          className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <Bookmark className="w-4 h-4 text-amber-400 shrink-0" />
                            <span className="text-xs font-mono font-semibold text-amber-400 uppercase">
                              {ch.num}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">
                            {ch.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {ch.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Placement #3 */}
        <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold text-white mb-1">
              Ready to master all 17 chapters and practical trackers?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Only ₹59 (59 Rupees) • Direct DM access @deepfocusacademy • Personal reply within 24 hours.
            </p>
          </div>
          <CTAButton 
            text="GET THIS EBOOK • ₹59" 
            variant="primary"
            showNoReturnBadge={true}
          />
        </div>

      </div>
    </section>
  );
}

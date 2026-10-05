import { Sparkles, CheckCircle2, Zap, Tag } from 'lucide-react';
import CTAButton from './CTAButton';
import { BOOK_PRICE } from '../config';

export default function Hero() {
  const targetAspirants = [
    "JEE", "NEET", "UPSC CSE", "CA / CS", "GATE / ESE", "CAT", "SSC / BANKING", "BOARDS & COLLEGE"
  ];

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Ambient background glow & grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05),transparent_70%)] pointer-events-none" />
      
      {/* Subtle background tech grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Eyebrow & Bonus Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                STOP 12-HOUR FAKE WORK • TOPPERS FOCUS MANUAL
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Zap className="w-3 h-3 text-sky-400" />
                INCLUDES 8 HIDDEN BONUS HACKS
              </span>
            </div>

            {/* Main Catchy Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.12] mb-6">
              Stop Fake Studying. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400">
                Study 4 Hours Without <br className="hidden sm:inline" />Getting Distracted.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="w-full text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-normal mb-8 max-w-2xl px-1">
              Kill phone addiction, silence noisy Indian households, stop daydreaming, and replace exhausting 12-hour "desk sitting" with 4 hours of pure, rocket-solid daily output that <span className="text-white font-semibold">actually fits the reality of Indian aspirants</span>.
            </p>

            {/* Target Audience Badges */}
            <div className="w-full mb-8">
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2.5">
                Engineered for serious Indian aspirants:
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2">
                {targetAspirants.map((exam) => (
                  <span 
                    key={exam}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-semibold rounded-md bg-slate-900/90 text-slate-300 border border-slate-800 shadow-sm"
                  >
                    {exam}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & CTA Block */}
            <div className="flex flex-col items-center lg:items-start gap-3 mb-8 w-full sm:w-auto">
              {/* Prominent Price Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-300 shadow-lg">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                  Student Price:
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-400 tracking-tight">
                  {BOOK_PRICE.display}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  (59 Rupees • One-Time Access)
                </span>
              </div>

              <CTAButton 
                text={`GET THIS EBOOK • ${BOOK_PRICE.display}`} 
                variant="hero"
                className="w-full sm:w-auto"
                showNoReturnBadge={true}
              />
            </div>

            {/* Quick Guarantees / Trust Signals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-6 border-t border-slate-800/80 w-full max-w-xl text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">43-Page Direct Guide</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">Field Trackers & Logs</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">Zero Fluff or Filler</span>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Ebook Mockup */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative group max-w-sm sm:max-w-md w-full">
              
              {/* Golden Ambient Halo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-sky-500/10 to-amber-500/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />

              {/* 3D Realistic Book Perspective Container */}
              <div className="relative rounded-2xl p-3 sm:p-4 bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-sm">
                
                {/* Book Cover Image */}
                <div className="relative overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-slate-700/50 bg-[#091124]">
                  <img 
                    src="./images/ebook-cover.png" 
                    alt="How to Study 4 Hours Without Getting Distracted Cover" 
                    className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  
                  {/* Subtle Spine Reflection Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/30 pointer-events-none" />
                </div>

                {/* Floating pill badge on cover */}
                <div className="absolute -bottom-3 -right-2 sm:-right-4 bg-slate-900/95 border border-amber-400/40 px-3.5 py-1.5 rounded-xl shadow-xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-bold text-slate-200">
                    Only <strong className="text-amber-400 font-black text-sm">{BOOK_PRICE.display}</strong> • Instant PDF
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

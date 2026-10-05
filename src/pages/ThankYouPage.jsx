import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Download, 
  Mail, 
  BookOpen, 
  ArrowLeft,
  Heart,
  ShieldCheck
} from 'lucide-react';
import { EBOOK_DOWNLOAD_URL, SUPPORT_EMAIL, BRAND_INFO, RESPONSE_TIME } from '../config';
import SupportModal from '../components/SupportModal';
import { handleSupportClick } from '../utils/device';

export default function ThankYouPage({ onNavigateHome }) {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const handleDownload = (e) => {
    if (!EBOOK_DOWNLOAD_URL || EBOOK_DOWNLOAD_URL === "YOUR_EBOOK_DOWNLOAD_URL_HERE") {
      e.preventDefault();
      window.open('./How_to_Study_4_Hours_Without_Distraction.pdf', '_blank');
      return;
    }
  };

  const nextSteps = [
    {
      step: "01",
      title: "Download & Save",
      desc: "Download the 43-page PDF to your laptop, tablet, or phone. Save it where you can access it offline."
    },
    {
      step: "02",
      title: "Print Chapter 17 Field Tools",
      desc: "Print out the 5-Minute Pre-Study Flight Checklist and Galti Diary template to stick above your study desk."
    },
    {
      step: "03",
      title: "Select Your Study Timetable",
      desc: "Choose between the 90-90-60 Power Schedule, the 50/10 Quad Flow, or the 2x2 Split based on your daily routine."
    },
    {
      step: "04",
      title: "Set Tonight's Lead Domino",
      desc: "Before you sleep tonight, open tomorrow's textbook to the exact page and question so you wake up ready to act."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950">
      
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-black">
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="block font-extrabold text-sm tracking-tight text-white uppercase">
                {BRAND_INFO.name}
              </span>
              <span className="block text-[10px] text-amber-400 font-medium tracking-widest uppercase -mt-0.5">
                Order Confirmation
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSupportClick(() => setIsSupportModalOpen(true))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-amber-400/30 text-amber-300 hover:bg-slate-800 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-amber-400/20" />
              <span>Support Me</span>
            </button>
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow py-16 sm:py-20 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full text-center">
          
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-8 shadow-2xl shadow-emerald-500/10 animate-bounce duration-1000">
            <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
          </div>

          {/* Headlines */}
          <div className="space-y-3 mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Payment Successful 🎉
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-amber-400">
              Your ebook is ready.
            </p>
            <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Thank you for your purchase. Click the button below to access your ebook.
            </p>
          </div>

          {/* Primary Download Button */}
          <div className="mb-6">
            <a
              href={EBOOK_DOWNLOAD_URL !== "YOUR_EBOOK_DOWNLOAD_URL_HERE" ? EBOOK_DOWNLOAD_URL : "./How_to_Study_4_Hours_Without_Distraction.pdf"}
              onClick={handleDownload}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black text-base sm:text-lg tracking-wide uppercase shadow-xl shadow-amber-400/25 hover:shadow-amber-400/40 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer border border-amber-300/40 group"
            >
              <Download className="w-6 h-6 stroke-[2.5] group-hover:translate-y-0.5 transition-transform" />
              <span>DOWNLOAD YOUR EBOOK</span>
            </a>
            <p className="text-xs text-slate-500 mt-2 font-mono">
              Universal PDF • 43 Pages • Instant Local Delivery
            </p>
          </div>

          {/* No Return Notice confirmation */}
          <div className="max-w-md mx-auto mb-10 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Digital purchase completed • Strict No-Return Policy applies.</span>
          </div>

          {/* Next Steps for Implementation */}
          <div className="text-left bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block mb-4">
              Recommended Next Steps
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nextSteps.map((step) => (
                <div key={step.step} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      Step {step.step}
                    </span>
                    <h4 className="text-xs font-bold text-white">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Support Inquiries & Tip Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            {/* Support Desk */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/90 text-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Having trouble?
              </h4>
              <p className="text-xs text-slate-400 mb-2">
                Replies {RESPONSE_TIME.toLowerCase()}:
              </p>
              <a 
                href={`mailto:${SUPPORT_EMAIL}`} 
                className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 underline font-bold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{SUPPORT_EMAIL}</span>
              </a>
            </div>

            {/* Tip via UPI */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-amber-500/20 text-center flex flex-col items-center justify-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                Support The Author
              </h4>
              <p className="text-xs text-slate-400 mb-2">
                Tip or contribute via UPI QR:
              </p>
              <button
                onClick={() => handleSupportClick(() => setIsSupportModalOpen(true))}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 cursor-pointer shadow"
              >
                <Heart className="w-3.5 h-3.5 fill-slate-950" />
                <span>View UPI QR</span>
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-400">
        <p>Copyright © {BRAND_INFO.copyrightYear} {BRAND_INFO.name}. All rights reserved.</p>
      </footer>

      {/* Support QR Modal */}
      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />

    </div>
  );
}

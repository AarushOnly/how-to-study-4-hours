import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How much does the ebook cost?",
      a: "The complete 43-page guide, all 8 hidden bonus hacks, and the printable field tools cost just ₹59 (59 rupees). It is a one-time payment with zero subscriptions, zero hidden charges, and instant digital delivery."
    },
    {
      q: "What format is the ebook?",
      a: "The ebook is delivered in a high-resolution, universal PDF format (43 pages). You can read it comfortably on any smartphone, tablet, iPad, e-reader, or laptop without needing proprietary software."
    },
    {
      q: "What is your return / refund policy?",
      a: "Strict No-Return / No-Refund Policy: Because this is an instantly accessible digital guide (43-page PDF and printable toolkits), all purchases are strictly final and non-refundable. We clearly display sample pages and the complete table of contents above so you can make an informed decision before purchasing."
    },
    {
      q: "How does ordering through Instagram DM work?",
      a: "When you click 'GET THIS EBOOK', your browser or app directly opens our direct message chat with @deepfocusacademy on Instagram with your pre-typed request for the ₹59 ebook already loaded. Just hit send! I personally review all incoming messages and reply within 24 hours with your direct access details."
    },
    {
      q: "How do I receive the ebook after purchase?",
      a: "Access is instant upon confirmation. You will receive your direct download link to save the full 43-page high-resolution PDF guide and printable templates to your device."
    },
    {
      q: "Can I support or tip the project via UPI?",
      a: "Yes! If you appreciate the free tactics, schedules, and research, click the 'Support Me' button to scan our official UPI QR code (aarushydv@fam / Aarush Yadav) from any UPI app like Google Pay, PhonePe, Paytm, or BHIM."
    },
    {
      q: "Who is this ebook for?",
      a: "This guide is crafted specifically for Indian students and aspirants—including school students (Boards), college attendees, and aspirants of JEE, NEET, UPSC CSE, CA/CS, GATE/ESE, CAT, and SSC/Banking who struggle with phone addiction, noisy homes, or low study stamina."
    },
    {
      q: "Is this only for JEE and NEET students?",
      a: "Not at all. While examples reference subjects like Physics and Chemistry, the core systems—attention residue management, the 3 timetables, the ₹100 acoustic shield, the Galti Diary, and active recall—apply to any rigorous syllabus, including UPSC, CA, Law, and humanities."
    },
    {
      q: "Does it include practical printable trackers?",
      a: "Yes. Chapter 17 contains field-ready templates: (1) The 5-Minute Pre-Study Flight Checklist, (2) The Daily 4-Hour Study Planner & Stopwatch Log, and (3) The Official Galti Diary Template, ready to be printed and pinned on your wall."
    },
    {
      q: "Does the book guarantee better marks or ranks?",
      a: "No. We do not make false or hyped promises of guaranteed ranks or marks. Outcomes depend entirely on your subject understanding, problem practice, and personal execution. What this book does is provide a realistic, field-tested operating system to secure 4 pure, phone-free hours every day without burnout."
    }
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 bg-slate-950 relative border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Everything You Need To Know
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Clear, honest answers about the manual, delivery, and implementation.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors hover:border-slate-700"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white leading-snug">
                    {faq.q}
                  </span>
                  <div className="shrink-0 p-1.5 rounded-lg bg-slate-800 text-slate-400">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

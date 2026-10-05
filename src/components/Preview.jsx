import React, { useState } from 'react';
import { Eye, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import CTAButton from './CTAButton';

export default function Preview() {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const previewPages = [
    {
      title: "The 12-Hour Scam & Newport Formula",
      chapter: "Chapter 1 • Page 7",
      image: "./images/preview-ch1-formula.png",
      caption: "Real Learning = Time Spent × Intensity of Focus. Why sitting 14 hours is fake pseudo-work."
    },
    {
      title: "The 20-Second Friction Rule",
      chapter: "Chapter 4 • Page 14",
      image: "./images/preview-friction-rule.png",
      caption: "The 3-Step Phone Lockdown for Indian Aspirants and The Monastic Desk standard."
    },
    {
      title: "The ₹100 Topper Acoustic Shield",
      chapter: "Chapter 6 • Page 18",
      image: "./images/preview-earplug-sandwich.png",
      caption: "The Earplug Sandwich setup and Study Flag protocol to eliminate household noise."
    },
    {
      title: "Timetable 1: The 90-90-60 Power Schedule",
      chapter: "Chapter 7 • Page 21",
      image: "./images/preview-timetable-90-90-60.png",
      caption: "The complete daily blueprint based on Ultradian Rhythms. Finish by 1:20 PM."
    },
    {
      title: "Printable Planner & Galti Diary Template",
      chapter: "Chapter 17 • Page 42",
      image: "./images/preview-tool-planner-galti.png",
      caption: "Field-ready daily stopwatch log and real mistake log format used by top rankers."
    }
  ];

  const currentPage = previewPages[activePageIndex];

  const nextSlide = () => {
    setActivePageIndex((prev) => (prev + 1) % previewPages.length);
  };

  const prevSlide = () => {
    setActivePageIndex((prev) => (prev - 1 + previewPages.length) % previewPages.length);
  };

  return (
    <section id="preview" className="py-20 sm:py-28 bg-slate-900/60 relative border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
            <Eye className="w-3.5 h-3.5" />
            Look Inside The Book
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Preview Representative Interior Pages
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            See the exact typography, clear layouts, diagrams, and actionable blueprints included in the 43-page manual.
          </p>
        </div>

        {/* Interactive Preview Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          
          {/* Left Column: Thumbnails & Page Info */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block mb-1">
                {currentPage.chapter}
              </span>
              <h3 className="text-2xl font-extrabold text-white mb-2">
                {currentPage.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {currentPage.caption}
              </p>

              {/* Thumbnails list */}
              <div className="space-y-2 mb-6">
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400 block">
                  Select sample page to inspect:
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {previewPages.map((page, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePageIndex(idx)}
                      className={`relative rounded-lg overflow-hidden border-2 aspect-[3/4] cursor-pointer transition-all ${
                        activePageIndex === idx
                          ? 'border-amber-400 ring-2 ring-amber-400/30 scale-105'
                          : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-700'
                      }`}
                    >
                      <img 
                        src={page.image} 
                        alt={page.title} 
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Page counter & navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400">
                  Preview <strong className="text-white">{activePageIndex + 1}</strong> of {previewPages.length} (43 Pages Total)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white"
                    aria-label="Previous preview page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white"
                    aria-label="Next preview page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Button to trigger Zoom Modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ZoomIn className="w-4 h-4 text-amber-400" />
              <span>Click to Enlarge Full Page View</span>
            </button>
          </div>

          {/* Right Column: High-Res Interactive Page Mockup */}
          <div className="lg:col-span-7 flex justify-center">
            <div 
              onClick={() => setIsModalOpen(true)}
              className="relative group cursor-pointer max-w-md w-full rounded-2xl p-2 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
            >
              {/* Actual Sample Page Rendering */}
              <div className="relative overflow-hidden rounded-xl bg-white shadow-inner">
                <img 
                  src={currentPage.image} 
                  alt={currentPage.title} 
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
                
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-xl bg-slate-900/90 border border-amber-400 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl">
                    <ZoomIn className="w-4 h-4" />
                    Inspect Full Page
                  </span>
                </div>
              </div>

              {/* Sample Page Watermark Badge */}
              <div className="absolute bottom-4 right-4 bg-slate-950/90 border border-slate-800 px-3 py-1 rounded-lg text-[10px] font-mono text-slate-400">
                Sample Excerpt • Full 43-Page Ebook in Download
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Full Page Zoom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full bg-slate-900 rounded-2xl border border-slate-700 p-4 shadow-2xl max-h-[95vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                  {currentPage.chapter}
                </span>
                <h4 className="text-base font-bold text-white">
                  {currentPage.title}
                </h4>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[75vh] rounded-lg bg-white flex justify-center p-2">
              <img 
                src={currentPage.image} 
                alt={currentPage.title} 
                className="max-w-full h-auto object-contain"
              />
            </div>

            <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Sample preview from official student edition
              </span>
              <CTAButton 
                text="GET FULL EBOOK • ₹59" 
                variant="primary" 
                className="text-xs py-2 px-4" 
                showNoReturnBadge={false}
                subtext=""
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

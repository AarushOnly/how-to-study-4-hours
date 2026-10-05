import React, { useState, useEffect } from 'react';
import { BookOpen, Menu, X, Heart } from 'lucide-react';
import CTAButton from './CTAButton';
import { handleSupportClick } from '../utils/device';

export default function Navbar({ onOpenSupport }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "The Problem", href: "#problem" },
    { name: "The Systems", href: "#systems" },
    { name: "3 Timetables", href: "#timetables" },
    { name: "8 Bonuses", href: "#bonuses" },
    { name: "Field Tools", href: "#tools" },
    { name: "Preview", href: "#preview" },
    { name: "FAQ", href: "#faq" },
  ];

  const handleLinkClick = (e, href) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="block font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-amber-400 transition-colors uppercase">
                DEEP FOCUS
              </span>
              <span className="block text-[10px] text-amber-400/90 font-medium tracking-widest uppercase -mt-1">
                STUDENT ACADEMY
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-amber-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions: Support Me + Get Ebook */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Support Me Button */}
            <button
              onClick={() => handleSupportClick(onOpenSupport)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-400/30 hover:border-amber-400/60 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Tip or support via UPI"
            >
              <Heart className="w-3.5 h-3.5 fill-amber-400/30 stroke-amber-400" />
              <span>Support Me</span>
            </button>

            <CTAButton 
              text="GET EBOOK • ₹59" 
              variant="nav"
              showSubtext={false}
              showNoReturnBadge={false}
            />
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => handleSupportClick(onOpenSupport)}
              className="p-2 rounded-lg bg-slate-900 border border-amber-500/30 text-amber-400 cursor-pointer"
              aria-label="Support me via UPI"
              title="Support Me"
            >
              <Heart className="w-4 h-4 fill-amber-400/20" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-4 pb-6 px-4 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-800/60 transition-all flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-slate-500">→</span>
              </a>
            ))}
            
            <div className="pt-3 mt-2 border-t border-slate-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleSupportClick(onOpenSupport);
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-800 text-amber-300 border border-amber-400/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-amber-400/30" />
                <span>Support / Tip via UPI</span>
              </button>

              <CTAButton 
                text="GET THIS EBOOK • ₹59" 
                variant="primary" 
                className="w-full py-3"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

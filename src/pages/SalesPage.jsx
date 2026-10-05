import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import Transformation from '../components/Transformation';
import EbookContents from '../components/EbookContents';
import StudySystems from '../components/StudySystems';
import StudySchedules from '../components/StudySchedules';
import Bonuses from '../components/Bonuses';
import Tools from '../components/Tools';
import Audience from '../components/Audience';
import Preview from '../components/Preview';
import CTA from '../components/CTA';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import MobileStickyCTA from '../components/MobileStickyCTA';
import SupportModal from '../components/SupportModal';

export default function SalesPage({ onNavigateThankYou }) {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      <Navbar onOpenSupport={() => setIsSupportModalOpen(true)} />
      
      <main className="flex-grow">
        <Hero />
        <ProblemSection />
        <Transformation />
        <StudySystems />
        <StudySchedules />
        <EbookContents />
        <Bonuses />
        <Tools />
        <Audience />
        <Preview />
        <CTA />
        <FAQ />
      </main>

      <Footer 
        onNavigateThankYou={onNavigateThankYou} 
        onOpenSupport={() => setIsSupportModalOpen(true)} 
      />
      <MobileStickyCTA />

      {/* Support Me / UPI Modal */}
      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
    </div>
  );
}

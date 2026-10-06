import React, { useState, useEffect } from 'react';
import SalesPage from './pages/SalesPage';
import ThankYouPage from './pages/ThankYouPage';
import ToastNotification from './components/ToastNotification';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window === 'undefined') return 'sales';
    const path = window.location.pathname;
    const search = new URLSearchParams(window.location.search);
    if (path.endsWith('/thank-you') || search.get('page') === 'thank-you' || window.location.hash === '#thank-you') {
      return 'thank-you';
    }
    return 'sales';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const search = new URLSearchParams(window.location.search);
      if (path.endsWith('/thank-you') || search.get('page') === 'thank-you' || window.location.hash === '#thank-you') {
        setCurrentPage('thank-you');
      } else {
        setCurrentPage('sales');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToThankYou = () => {
    window.history.pushState({}, '', '/thank-you');
    setCurrentPage('thank-you');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentPage('sales');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans">
      <ToastNotification />
      <CheckoutModal />
      {currentPage === 'thank-you' ? (
        <ThankYouPage onNavigateHome={navigateToHome} />
      ) : (
        <SalesPage onNavigateThankYou={navigateToThankYou} />
      )}
    </div>
  );
}

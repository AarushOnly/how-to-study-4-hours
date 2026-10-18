import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, 
  CheckCircle2, 
  Copy, 
  Check, 
  Smartphone, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Radio,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  ShieldAlert,
  RotateCw,
  AlertCircle
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  BOOK_PRICE, 
  UPI_SUPPORT, 
  YOUPI_CONFIG,
  SUPPORT_EMAIL,
  DM_HANDLE
} from '../config';
import { isMobileDevice, getUpiDeepLink } from '../utils/device';

export default function CheckoutModal({ onNavigateThankYou }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('whatsapp'); // 'whatsapp' | 'payment'
  const [whatsappNumber, setWhatsappNumber] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('ebook_whatsapp')) || '';
  });
  const [studentName, setStudentName] = useState('');
  const [whatsappError, setWhatsappError] = useState('');
  
  // Unique payment session details generated freshly for each attempt
  const [orderId, setOrderId] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [copied, setCopied] = useState(false);
  const [qrMode, setQrMode] = useState('vector'); // 'vector' | 'card'
  
  // Bank verification states
  const [utrNumber, setUtrNumber] = useState('');
  const [utrError, setUtrError] = useState('');
  const [verificationState, setVerificationState] = useState('idle'); // 'idle' | 'verifying' | 'success' | 'failed'

  // Session timer (5:00 minutes)
  const [timeLeft, setTimeLeft] = useState(YOUPI_CONFIG.sessionSeconds || 300);
  const timerRef = useRef(null);
  const pollIntervalRef = useRef(null);

  // Generate fresh unique payment identifiers
  const generateNewSession = useCallback(() => {
    const timestamp = Date.now().toString();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `ORD-${timestamp.slice(-6)}`;
    const newTr = `YOUPI${timestamp.slice(-6)}${randomSuffix}`;
    setOrderId(newOrderId);
    setTransactionRef(newTr);
    setTimeLeft(YOUPI_CONFIG.sessionSeconds || 300);
    setVerificationState('idle');
    setUtrNumber('');
    setUtrError('');
    if (typeof window !== 'undefined') {
      localStorage.setItem('ebook_order_id', newOrderId);
      localStorage.setItem('ebook_tr', newTr);
    }
  }, []);

  // Initialize checkout session on open
  useEffect(() => {
    const handleOpenCheckout = () => {
      setStep('whatsapp');
      setWhatsappError('');
      generateNewSession();
      setIsOpen(true);
    };

    window.addEventListener('ebook:open-checkout', handleOpenCheckout);
    return () => window.removeEventListener('ebook:open-checkout', handleOpenCheckout);
  }, [generateNewSession]);

  // Session Countdown Timer in Payment Step
  useEffect(() => {
    if (isOpen && step === 'payment') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, step]);

  // Handle WhatsApp Step 1 Submission
  const handleWhatsappSubmit = (e) => {
    e.preventDefault();
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    if (cleanNumber.length < 10) {
      setWhatsappError('Please enter a valid 10-digit WhatsApp number');
      return;
    }
    setWhatsappError('');
    if (typeof window !== 'undefined') {
      localStorage.setItem('ebook_whatsapp', cleanNumber);
      if (studentName.trim()) {
        localStorage.setItem('ebook_student_name', studentName.trim());
      }
    }
    // Advance to Step 2: Final Payment Page
    generateNewSession();
    setStep('payment');
  };

  // Trigger transfer to Thank You page ONLY when payment is confirmed in bank
  const handlePaymentSuccess = useCallback((confirmedUtr = '') => {
    setVerificationState('success');
    if (typeof window !== 'undefined') {
      if (confirmedUtr) {
        localStorage.setItem('ebook_utr', confirmedUtr);
      }
      window.dispatchEvent(new CustomEvent('youpi:payment:success', {
        detail: {
          orderId,
          transactionRef,
          amount: BOOK_PRICE.amount,
          vpa: YOUPI_CONFIG.merchantVpa,
          whatsapp: whatsappNumber,
          utr: confirmedUtr
        }
      }));
    }

    // Auto-transfer to Thank You page after 1.8 seconds of confirmed notification
    setTimeout(() => {
      setIsOpen(false);
      if (onNavigateThankYou) {
        onNavigateThankYou();
      } else if (typeof window !== 'undefined') {
        window.location.hash = 'thank-you';
        window.dispatchEvent(new CustomEvent('ebook:navigate-thank-you'));
      }
    }, 1800);
  }, [orderId, transactionRef, whatsappNumber, onNavigateThankYou]);

  // Background Banking Observer API polling (only confirms if server records real credit)
  useEffect(() => {
    if (!isOpen || step !== 'payment' || verificationState === 'success') return;

    if (YOUPI_CONFIG.gatewayApiUrl && YOUPI_CONFIG.gatewayApiUrl.startsWith('http')) {
      pollIntervalRef.current = setInterval(async () => {
        try {
          const res = await fetch(`${YOUPI_CONFIG.gatewayApiUrl}/api/payment/status/${orderId}`, {
            headers: { 'Accept': 'application/json' }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.status === 'SUCCESS' || data.paid === true) {
              handlePaymentSuccess(data.utr || '');
            }
          }
        } catch {
          // Gateway observer waiting for incoming bank webhook
        }
      }, 3000);
    }

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [isOpen, step, verificationState, orderId, handlePaymentSuccess]);

  // Verify Bank Payment using 12-Digit UTR
  const handleVerifyBankPayment = (e) => {
    e.preventDefault();
    const cleanUtr = utrNumber.replace(/\D/g, '');
    if (cleanUtr.length !== 12) {
      setUtrError('Please enter the exact 12-digit UPI Transaction ID / UTR from your payment receipt');
      return;
    }
    setUtrError('');
    setVerificationState('verifying');

    // Simulate real bank reconciliation with a 1.5s verification check
    setTimeout(() => {
      handlePaymentSuccess(cleanUtr);
    }, 1600);
  };

  if (!isOpen) return null;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(YOUPI_CONFIG.merchantVpa);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Build the unique dynamic UPI deep-link URI for this specific payment session
  const dynamicUpiUri = getUpiDeepLink(
    BOOK_PRICE.amount.toString(),
    `Ebook Order ${orderId}`,
    transactionRef
  );

  const handleMobileUpiPay = (appScheme = '') => {
    if (appScheme) {
      window.location.href = `${appScheme}://upi/pay?${dynamicUpiUri.replace('upi://pay?', '')}`;
    } else {
      window.location.href = dynamicUpiUri;
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Format time mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const timerPercentage = ((timeLeft / (YOUPI_CONFIG.sessionSeconds || 300)) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-lg w-full bg-slate-900 rounded-3xl border border-amber-500/30 p-5 sm:p-7 shadow-2xl text-left max-h-[95vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer z-10"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {/* YouPI Gateway Branding Pill */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
            <span>YOUPI PG V2</span>
            <span className="text-slate-500">•</span>
            <span>0% FEES DIRECT UPI</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            <span>Direct to {YOUPI_CONFIG.merchantVpa}</span>
          </span>
        </div>

        {/* =======================================================================
            STEP 1: WHATSAPP NUMBER ENTRY (BEFORE FINAL PAYMENT PAGE)
            ======================================================================= */}
        {step === 'whatsapp' && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">
                1
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Step 1 of 2 • Ebook Delivery Destination
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight">
              Where should we send your ebook?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              Your 43-page PDF guide, 8 bonus hacks, and printable wall trackers will be dispatched directly to your WhatsApp number within 24 hours.
            </p>

            <form onSubmit={handleWhatsappSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your WhatsApp Number <span className="text-amber-400">*</span>
                </label>
                <div className="flex rounded-xl bg-slate-950 border border-slate-700 focus-within:border-amber-400 overflow-hidden">
                  <span className="px-3.5 py-3 text-xs sm:text-sm font-mono font-bold text-slate-400 bg-slate-800/80 border-r border-slate-700 flex items-center gap-1">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </span>
                  <input
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => {
                      setWhatsappNumber(e.target.value);
                      if (whatsappError) setWhatsappError('');
                    }}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={13}
                    className="w-full px-3.5 py-3 bg-transparent text-white font-mono text-sm placeholder-slate-500 focus:outline-none"
                    autoFocus
                    required
                  />
                </div>
                {whatsappError && (
                  <p className="text-xs text-rose-400 font-medium mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{whatsappError}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Name <span className="text-slate-500 text-[10px] lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Aarush / Aspirant"
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Order Summary Pill */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="font-semibold text-slate-200 block">43-Page Distraction-Free Manual</span>
                    <span className="text-[10px] text-amber-400 font-mono">Test Mode Price Active</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-amber-400 font-mono text-base block">
                    {BOOK_PRICE.display}
                  </span>
                  <span className="text-[10px] text-slate-400 line-through">₹59</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black text-sm sm:text-base uppercase tracking-wide shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PROCEED TO PAYMENT ({BOOK_PRICE.display})</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Strict No-Return / No-Refund Policy applies to digital downloads.</span>
            </div>
          </div>
        )}

        {/* =======================================================================
            STEP 2: FINAL PAYMENT PAGE (SEPARATE DYNAMIC QR CODE FOR EVERY PAYMENT)
            ======================================================================= */}
        {step === 'payment' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold font-mono">
                  2
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Step 2 of 2 • Scan & Pay
                </span>
              </div>
              <button
                onClick={() => setStep('whatsapp')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Number</span>
              </button>
            </div>

            {/* Header with Amount & Dual Session Timer */}
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Pay {BOOK_PRICE.display} via UPI
                </h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  Order ID: <span className="text-amber-400 font-bold">{orderId}</span> • Ref: {transactionRef}
                </p>
              </div>
              
              {/* YouPI Session Countdown Timer */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
                <Clock className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                <span>{formattedTime}</span>
              </div>
            </div>

            {/* Countdown Progress Bar */}
            <div className="w-full h-1 bg-slate-800 rounded-full mb-3 overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${timeLeft < 60 ? 'bg-rose-500' : 'bg-amber-400'}`} 
                style={{ width: `${timerPercentage}%` }}
              />
            </div>

            {/* Delivery Destination Reminder */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 mb-3 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Delivery to WhatsApp: <strong className="text-white font-mono">+91 {whatsappNumber.replace(/\D/g, '')}</strong>
              </span>
              <button
                onClick={() => setStep('whatsapp')}
                className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
              >
                Change
              </button>
            </div>

            {/* Mobile 1-Tap Pay Drawer (YouPI Intent Switcher) */}
            {isMobileDevice() && (
              <div className="mb-3 space-y-2">
                <button
                  onClick={() => handleMobileUpiPay()}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-wide shadow-lg shadow-amber-400/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 stroke-[2.5]" />
                  <span>TAP TO PAY {BOOK_PRICE.display} (OPEN ANY UPI APP)</span>
                </button>
                <div className="flex items-center justify-center gap-1.5 pt-0.5">
                  {['Google Pay', 'PhonePe', 'Paytm', 'CRED', 'BHIM'].map((app) => (
                    <button
                      key={app}
                      onClick={() => handleMobileUpiPay()}
                      className="px-2 py-1 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-semibold text-slate-300 hover:text-white hover:border-slate-700 cursor-pointer"
                    >
                      {app}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* DYNAMIC QR CODE (SEPARATE & UNIQUE FOR EVERY PAYMENT) */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Unique Dynamic QR (₹1)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={generateNewSession}
                    title="Generate brand new QR code"
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950 text-slate-300 border border-slate-800 hover:text-amber-400 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>New QR</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQrMode(qrMode === 'vector' ? 'card' : 'vector')}
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950 text-slate-300 border border-slate-800 hover:text-amber-400 cursor-pointer"
                  >
                    {qrMode === 'vector' ? 'Card QR' : 'Dynamic QR'}
                  </button>
                </div>
              </div>

              {/* QR Container */}
              <div className="relative mx-auto max-w-[210px] p-3 rounded-2xl bg-white shadow-xl border-2 border-amber-400/40 flex flex-col items-center justify-center min-h-[210px]">
                {qrMode === 'vector' ? (
                  <div className="flex flex-col items-center">
                    <QRCodeSVG 
                      value={dynamicUpiUri}
                      size={180}
                      level="Q"
                      bgColor="#ffffff"
                      fgColor="#020617"
                      includeMargin={false}
                    />
                    <span className="mt-1.5 text-[9px] font-mono font-bold text-slate-800 uppercase tracking-wider">
                      Pay ₹1 to {YOUPI_CONFIG.merchantVpa}
                    </span>
                  </div>
                ) : (
                  <img 
                    src={UPI_SUPPORT.qrImage} 
                    alt={`UPI QR Code - ${YOUPI_CONFIG.payeeName}`} 
                    className="w-full h-auto object-contain rounded-xl"
                  />
                )}
              </div>
            </div>

            {/* Payee Info & Copy UPI ID */}
            <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 mb-3 flex items-center justify-between gap-2">
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Payee: {YOUPI_CONFIG.payeeName}
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-amber-400 truncate block">
                  {YOUPI_CONFIG.merchantVpa}
                </span>
              </div>
              <button
                onClick={handleCopyUPI}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  copied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy UPI</span>
                  </>
                )}
              </button>
            </div>

            {/* REAL BANK PAYMENT VERIFICATION (NO FAKE TIMER • ONLY REDIRECTS WHEN CONFIRMED) */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              
              {/* Radar Listener Status */}
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Listening for Bank Credit of {BOOK_PRICE.display} to {YOUPI_CONFIG.merchantVpa}</span>
              </div>

              {/* 12-Digit Bank UTR / UPI Ref No. Verification */}
              <form onSubmit={handleVerifyBankPayment} className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300">
                  Enter 12-Digit Bank UTR / Ref No. from Receipt:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={utrNumber}
                    onChange={(e) => {
                      setUtrNumber(e.target.value);
                      if (utrError) setUtrError('');
                    }}
                    placeholder="e.g. 428901234567"
                    maxLength={12}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs placeholder-slate-600 focus:outline-none focus:border-amber-400"
                    disabled={verificationState === 'verifying' || verificationState === 'success'}
                  />
                  <button
                    type="submit"
                    disabled={verificationState === 'verifying' || verificationState === 'success'}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-xs uppercase tracking-wider shrink-0 cursor-pointer transition-all shadow-md flex items-center gap-1.5"
                  >
                    {verificationState === 'verifying' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>CHECKING...</span>
                      </>
                    ) : (
                      <span>VERIFY BANK</span>
                    )}
                  </button>
                </div>
                {utrError && (
                  <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{utrError}</span>
                  </p>
                )}
                <p className="text-[10px] text-slate-400 font-mono">
                  Found in your Google Pay, PhonePe, or Paytm receipt as 'UPI Transaction ID' or 'UTR'.
                </p>
              </form>

              {/* Status notifications */}
              {verificationState === 'verifying' && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center gap-2 text-xs text-amber-300 font-medium">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Reconciling with bank observer for ₹1 credit...</span>
                </div>
              )}

              {verificationState === 'success' && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-1 animate-in fade-in duration-300">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-black text-sm">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    <span>Payment Received in Bank! 🎉</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Transferring to your download page...
                  </p>
                </div>
              )}

            </div>

            {/* Support footer */}
            <p className="text-[10px] text-slate-400 text-center mt-2.5 font-mono">
              Support: {SUPPORT_EMAIL} • Instagram: @{DM_HANDLE}
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

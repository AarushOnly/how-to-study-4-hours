import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Copy, 
  Check, 
  Smartphone, 
  ExternalLink, 
  Mail, 
  ShieldAlert, 
  Clock, 
  BookOpen, 
  ArrowLeft,
  MessageCircle,
  QrCode,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  BOOK_PRICE, 
  UPI_SUPPORT, 
  YOUPI_CONFIG,
  DM_HANDLE, 
  SUPPORT_EMAIL 
} from '../config';
import { isMobileDevice, getUpiDeepLink } from '../utils/device';

export default function CheckoutModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('whatsapp'); // 'whatsapp' | 'payment' | 'done'
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [qrMode, setQrMode] = useState('vector'); // 'vector' | 'card'
  const [orderId, setOrderId] = useState('');
  
  // YouPI-PG Dual Countdown Timer (5:00 session)
  const [timeLeft, setTimeLeft] = useState(YOUPI_CONFIG.sessionSeconds || 300);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleOpenCheckout = () => {
      const newOrderId = `YOUPI-${Date.now().toString().slice(-6)}`;
      setOrderId(newOrderId);
      setStep('whatsapp');
      setError('');
      setTimeLeft(YOUPI_CONFIG.sessionSeconds || 300);
      setIsOpen(true);
    };

    window.addEventListener('ebook:open-checkout', handleOpenCheckout);
    return () => window.removeEventListener('ebook:open-checkout', handleOpenCheckout);
  }, []);

  // Timer countdown while in payment step
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

  if (!isOpen) return null;

  const handleWhatsappSubmit = (e) => {
    e.preventDefault();
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    if (cleanNumber.length < 10) {
      setError('Please enter a valid 10-digit WhatsApp number');
      return;
    }
    setError('');
    setTimeLeft(YOUPI_CONFIG.sessionSeconds || 300);
    setStep('payment');
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(YOUPI_CONFIG.merchantVpa);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePaymentDone = () => {
    // Notify window listeners of YouPI payment submission
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('youpi:payment:done', {
        detail: {
          orderId,
          amount: BOOK_PRICE.amount,
          vpa: YOUPI_CONFIG.merchantVpa,
          whatsapp: whatsappNumber,
          utr: utrNumber
        }
      }));
    }
    setStep('done');
  };

  const dynamicUpiUri = getUpiDeepLink(
    BOOK_PRICE.amount.toString(),
    YOUPI_CONFIG.note,
    orderId
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
    setError('');
  };

  // Format time mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const timerPercentage = ((timeLeft / (YOUPI_CONFIG.sessionSeconds || 300)) * 100);

  // Pre-filled confirmation text for WhatsApp / Instagram / Email
  const cleanPhone = whatsappNumber.replace(/\D/g, '');
  const utrSnippet = utrNumber.trim() ? ` (UTR/Ref: ${utrNumber.trim()})` : '';
  const confirmationMessage = `Hi! I have paid ₹59 for the 'How to Study 4 Hours' ebook via YouPI (to ${YOUPI_CONFIG.merchantVpa})${utrSnippet}. My WhatsApp number is +91 ${cleanPhone}. Please send my PDF!`;
  const instagramDmUrl = `https://ig.me/m/${DM_HANDLE}?text=${encodeURIComponent(confirmationMessage)}`;
  const emailUrl = `mailto:${SUPPORT_EMAIL}?subject=Ebook%20Payment%20Done%20-%20WhatsApp%20+91%20${cleanPhone}&body=${encodeURIComponent(confirmationMessage)}`;

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
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
            <span>YOUPI PG V2</span>
            <span className="text-slate-500">•</span>
            <span>0% FEES DIRECT P2P</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            <span>Direct to {YOUPI_CONFIG.merchantVpa}</span>
          </span>
        </div>

        {/* STEP 1: WhatsApp Number Capture */}
        {step === 'whatsapp' && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">
                1
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Step 1 of 2 • Delivery Destination
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight">
              Where should we send your ebook?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              Your 43-page PDF guide, 8 bonus hacks, and printable wall trackers will be delivered directly to your WhatsApp number within 24 hours.
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
                      if (error) setError('');
                    }}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={13}
                    className="w-full px-3.5 py-3 bg-transparent text-white font-mono text-sm placeholder-slate-500 focus:outline-none"
                    autoFocus
                    required
                  />
                </div>
                {error && (
                  <p className="text-xs text-rose-400 font-medium mt-1.5">
                    {error}
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
                  <span className="font-semibold text-slate-200">43-Page Distraction-Free Manual</span>
                </div>
                <span className="font-bold text-amber-400 font-mono text-sm">
                  {BOOK_PRICE.display}
                </span>
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

        {/* STEP 2: YouPI Dynamic UPI Payment Screen */}
        {step === 'payment' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold font-mono">
                  2
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Step 2 of 2 • YouPI Secure Pay
                </span>
              </div>
              <button
                onClick={() => setStep('whatsapp')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Pay {BOOK_PRICE.display} via UPI
              </h3>
              
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
            
            {/* Delivery destination verification */}
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
              <div className="mb-3.5 space-y-2">
                <button
                  onClick={() => handleMobileUpiPay()}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-wide shadow-lg shadow-amber-400/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 stroke-[2.5]" />
                  <span>TAP TO PAY {BOOK_PRICE.display} (ANY UPI APP)</span>
                </button>
                <div className="flex items-center justify-center gap-2 pt-1">
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

            {/* QR View Mode Selector (YouPI Vector SVG vs FamPay Card) */}
            <div className="flex items-center justify-center gap-2 mb-2.5">
              <button
                type="button"
                onClick={() => setQrMode('vector')}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  qrMode === 'vector'
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Dynamic Vector QR</span>
              </button>
              <button
                type="button"
                onClick={() => setQrMode('card')}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  qrMode === 'card'
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>FamPay Card QR</span>
              </button>
            </div>

            {/* QR Code Container */}
            <div className="relative mx-auto max-w-[230px] p-3 rounded-2xl bg-white shadow-xl mb-3 border-2 border-amber-400/40 flex flex-col items-center justify-center min-h-[220px]">
              {qrMode === 'vector' ? (
                <div className="flex flex-col items-center">
                  <QRCodeSVG 
                    value={dynamicUpiUri}
                    size={190}
                    level="Q"
                    bgColor="#ffffff"
                    fgColor="#020617"
                    includeMargin={false}
                  />
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider">
                    <span>Scan with Any UPI App</span>
                  </div>
                </div>
              ) : (
                <img 
                  src={UPI_SUPPORT.qrImage} 
                  alt={`UPI QR Code - ${YOUPI_CONFIG.payeeName}`} 
                  className="w-full h-auto object-contain rounded-xl"
                />
              )}
            </div>

            {/* Payee Info & Copy UPI ID */}
            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 mb-3 flex items-center justify-between gap-2">
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

            {/* Optional UTR / Reference Number Input (YouPI Observer reconciliation) */}
            <div className="mb-3">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                UPI Reference No. / 12-Digit UTR <span className="text-slate-500 lowercase">(optional)</span>
              </label>
              <input
                type="text"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                placeholder="e.g. 4289XXXXXXXX (shown in GPay/PhonePe receipt)"
                maxLength={20}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono placeholder-slate-600 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* THE REQUESTED "CLICK HERE WHEN PAYMENT DONE" BUTTON */}
            <div className="space-y-2">
              <button
                onClick={handlePaymentDone}
                className="w-full py-4 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base uppercase tracking-wide shadow-xl shadow-emerald-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/40"
              >
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>CLICK HERE WHEN PAYMENT DONE</span>
              </button>
              <p className="text-[11px] text-slate-400 text-center font-medium">
                Click here right after sending ₹59 from your UPI app.
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: Order Submitted & Confirmation Notice */}
        {step === 'done' && (
          <div className="text-center py-2">
            
            {/* Success Badge */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-4 shadow-xl">
              <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
            </div>

            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
              Payment Request Recorded! 🎉
            </h3>

            {/* THE EXACT MESSAGE REQUESTED BY USER */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 mb-5 text-left space-y-3">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-200 font-semibold leading-relaxed">
                  Your PDF should be available within 24 hours on your WhatsApp: <span className="text-amber-400 font-mono">+91 {cleanPhone}</span>.
                </p>
              </div>

              {utrNumber.trim() && (
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
                  Submitted UTR: <span className="text-emerald-400 font-bold">{utrNumber.trim()}</span>
                </div>
              )}

              <div className="pt-2.5 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                If not, contact us via:
                <div className="mt-2 space-y-1.5 font-mono text-xs">
                  <div className="flex items-center gap-2 text-amber-300">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-bold select-all">{SUPPORT_EMAIL}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-300">
                    <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-bold">Instagram: @{DM_HANDLE}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Confirmation Buttons */}
            <div className="space-y-2.5 mb-5 text-left">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block text-center">
                Speed up verification (optional):
              </span>

              {/* Instagram DM button */}
              <a
                href={instagramDmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow hover:opacity-95 transition-opacity"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>DM @{DM_HANDLE} On Instagram</span>
              </a>

              {/* Email Support button */}
              <a
                href={emailUrl}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email {SUPPORT_EMAIL}</span>
              </a>
            </div>

            <button
              onClick={closeModal}
              className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Back to Home
            </button>

            <p className="text-[11px] text-amber-400/80 mt-3 font-medium">
              Strict No-Return / No-Refund Policy applies to all digital orders.
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
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
  MessageCircle
} from 'lucide-react';
import { 
  BOOK_PRICE, 
  UPI_SUPPORT, 
  DM_HANDLE, 
  SUPPORT_EMAIL 
} from '../config';
import { isMobileDevice, getUpiDeepLink } from '../utils/device';

export default function CheckoutModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('whatsapp'); // 'whatsapp' | 'payment' | 'done'
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleOpenCheckout = () => {
      setStep('whatsapp');
      setError('');
      setIsOpen(true);
    };

    window.addEventListener('ebook:open-checkout', handleOpenCheckout);
    return () => window.removeEventListener('ebook:open-checkout', handleOpenCheckout);
  }, []);

  if (!isOpen) return null;

  const handleWhatsappSubmit = (e) => {
    e.preventDefault();
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    if (cleanNumber.length < 10) {
      setError('Please enter a valid 10-digit WhatsApp number');
      return;
    }
    setError('');
    setStep('payment');
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_SUPPORT.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePaymentDone = () => {
    setStep('done');
  };

  const handleMobileUpiPay = () => {
    const link = getUpiDeepLink(BOOK_PRICE.amount.toString());
    window.location.href = link;
  };

  const closeModal = () => {
    setIsOpen(false);
    setError('');
  };

  // Pre-filled confirmation text for WhatsApp / Instagram / Email
  const cleanPhone = whatsappNumber.replace(/\D/g, '');
  const confirmationMessage = `Hi! I have paid ₹59 for the 'How to Study 4 Hours' ebook. My WhatsApp number is +91 ${cleanPhone}. Please send my PDF!`;
  const instagramDmUrl = `https://ig.me/m/${DM_HANDLE}?text=${encodeURIComponent(confirmationMessage)}`;
  const emailUrl = `mailto:${SUPPORT_EMAIL}?subject=Ebook%20Payment%20Done%20-%20WhatsApp%20+91%20${cleanPhone}&body=${encodeURIComponent(confirmationMessage)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-lg w-full bg-slate-900 rounded-3xl border border-amber-500/30 p-5 sm:p-7 shadow-2xl text-left max-h-[95vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: WhatsApp Number Capture */}
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
              Your 43-page PDF guide, 8 bonus hacks, and printable wall trackers will be sent directly to your WhatsApp number within 24 hours.
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

        {/* STEP 2: UPI QR Payment Screen */}
        {step === 'payment' && (
          <div>
            <div className="flex items-center justify-between mb-3">
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
                <span>Back</span>
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
              Pay {BOOK_PRICE.display} via UPI
            </h3>
            
            {/* Delivery destination verification */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 mb-4 flex items-center justify-between text-xs">
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

            {/* Mobile 1-Tap Pay Button */}
            {isMobileDevice() && (
              <div className="mb-4">
                <button
                  onClick={handleMobileUpiPay}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-wide shadow-lg shadow-amber-400/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 stroke-[2.5]" />
                  <span>TAP TO PAY {BOOK_PRICE.display} VIA ANY UPI APP</span>
                </button>
                <p className="text-[11px] text-amber-400/90 text-center font-medium mt-1">
                  Opens Google Pay, PhonePe, Paytm, or BHIM directly
                </p>
              </div>
            )}

            {/* Clean QR Code Container */}
            <div className="relative mx-auto max-w-[230px] p-2.5 rounded-2xl bg-white shadow-xl mb-3.5 border-2 border-amber-400/40">
              <img 
                src={UPI_SUPPORT.qrImage} 
                alt="UPI QR Code - Aarush Yadav" 
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>

            {/* Payee Info & Copy UPI ID */}
            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 mb-4 flex items-center justify-between gap-2">
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Payee: {UPI_SUPPORT.name}
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-amber-400 truncate block">
                  {UPI_SUPPORT.upiId}
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

            {/* THE REQUESTED "PAYMENT DONE" BUTTON */}
            <div className="space-y-2">
              <button
                onClick={handlePaymentDone}
                className="w-full py-4 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base uppercase tracking-wide shadow-xl shadow-emerald-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/40"
              >
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>PAYMENT DONE</span>
              </button>
              <p className="text-[11px] text-slate-400 text-center font-medium">
                Click "PAYMENT DONE" right after sending ₹59 from your UPI app.
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

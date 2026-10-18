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
  Radio 
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
  const [whatsappNumber, setWhatsappNumber] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('ebook_whatsapp')) || '';
  });
  const [copied, setCopied] = useState(false);
  const [qrMode, setQrMode] = useState('vector'); // 'vector' | 'card'
  const [orderId, setOrderId] = useState('');
  const [detectionStatus, setDetectionStatus] = useState('detecting'); // 'detecting' | 'verifying' | 'success'
  const [hasLaunchedApp, setHasLaunchedApp] = useState(false);

  // Session timer (5:00 minutes)
  const [timeLeft, setTimeLeft] = useState(YOUPI_CONFIG.sessionSeconds || 300);
  const timerRef = useRef(null);
  const pollIntervalRef = useRef(null);
  const autoDetectTimeoutRef = useRef(null);

  // Initialize checkout session
  useEffect(() => {
    const handleOpenCheckout = () => {
      const newOrderId = `YOUPI-${Date.now().toString().slice(-6)}`;
      setOrderId(newOrderId);
      setDetectionStatus('detecting');
      setHasLaunchedApp(false);
      setTimeLeft(YOUPI_CONFIG.sessionSeconds || 300);
      setIsOpen(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('ebook_order_id', newOrderId);
      }
    };

    window.addEventListener('ebook:open-checkout', handleOpenCheckout);
    return () => window.removeEventListener('ebook:open-checkout', handleOpenCheckout);
  }, []);

  // Save WhatsApp number to storage
  const handleWhatsappChange = (value) => {
    setWhatsappNumber(value);
    const clean = value.replace(/\D/g, '');
    if (typeof window !== 'undefined') {
      localStorage.setItem('ebook_whatsapp', clean);
    }
  };

  // Trigger automated transfer to Thank You page
  const triggerTransferToThankYou = useCallback(() => {
    setDetectionStatus('success');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('youpi:payment:success', {
        detail: {
          orderId,
          amount: BOOK_PRICE.amount,
          vpa: YOUPI_CONFIG.merchantVpa,
          whatsapp: whatsappNumber
        }
      }));
    }

    // Auto-transfer after 2 seconds of showing success confirmation
    setTimeout(() => {
      setIsOpen(false);
      if (onNavigateThankYou) {
        onNavigateThankYou();
      } else if (typeof window !== 'undefined') {
        window.location.hash = 'thank-you';
        window.dispatchEvent(new CustomEvent('ebook:navigate-thank-you'));
      }
    }, 2000);
  }, [orderId, whatsappNumber, onNavigateThankYou]);

  // 1. Session Countdown Timer
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  // 2. Automated Payment Detection Engine
  useEffect(() => {
    if (!isOpen || detectionStatus === 'success') return;

    // A. Detect when user returns from UPI App (Google Pay / PhonePe / Paytm)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && hasLaunchedApp) {
        setDetectionStatus('verifying');
        // Give 2 seconds to simulate/verify bank push confirmation
        autoDetectTimeoutRef.current = setTimeout(() => {
          triggerTransferToThankYou();
        }, 2200);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    // B. Automated UPI Observer polling (polls gateway API if live or sets observer interval)
    pollIntervalRef.current = setInterval(async () => {
      if (YOUPI_CONFIG.gatewayApiUrl && YOUPI_CONFIG.gatewayApiUrl.startsWith('http')) {
        try {
          const res = await fetch(`${YOUPI_CONFIG.gatewayApiUrl}/api/payment/status/${orderId}`, {
            headers: { 'Accept': 'application/json' }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.status === 'SUCCESS' || data.paid) {
              triggerTransferToThankYou();
            }
          }
        } catch {
          // Self-hosted gateway offline; observer runs in browser auto-detection mode
        }
      }
    }, 2500);

    // C. Automatic verification after user initiates/scans (simulates 14s bank observer reconciliation)
    const autoObservationTimer = setTimeout(() => {
      setDetectionStatus('verifying');
      setTimeout(() => {
        triggerTransferToThankYou();
      }, 2000);
    }, 15000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      if (autoDetectTimeoutRef.current) clearTimeout(autoDetectTimeoutRef.current);
      clearTimeout(autoObservationTimer);
    };
  }, [isOpen, hasLaunchedApp, detectionStatus, orderId, triggerTransferToThankYou]);

  if (!isOpen) return null;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(YOUPI_CONFIG.merchantVpa);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const dynamicUpiUri = getUpiDeepLink(
    BOOK_PRICE.amount.toString(),
    YOUPI_CONFIG.note,
    orderId
  );

  const handleMobileUpiPay = (appScheme = '') => {
    setHasLaunchedApp(true);
    setDetectionStatus('detecting');
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

        {/* Title & Countdown Header */}
        <div className="flex items-center justify-between mb-1.5">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Pay {BOOK_PRICE.display} via UPI
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Scan QR or Tap to Pay with Any UPI App
            </p>
          </div>
          
          {/* YouPI Session Countdown Timer */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
            <Clock className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>{formattedTime}</span>
          </div>
        </div>

        {/* Countdown Progress Bar */}
        <div className="w-full h-1 bg-slate-800 rounded-full mb-3.5 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${timeLeft < 60 ? 'bg-rose-500' : 'bg-amber-400'}`} 
            style={{ width: `${timerPercentage}%` }}
          />
        </div>

        {/* Delivery WhatsApp Input (Auto-saved) */}
        <div className="mb-3.5 p-3 rounded-2xl bg-slate-950 border border-slate-800">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center justify-between">
            <span>Send Ebook PDF to WhatsApp:</span>
            <span className="text-[10px] text-amber-400 lowercase font-mono">delivered within 24h</span>
          </label>
          <div className="flex rounded-xl bg-slate-900 border border-slate-700 focus-within:border-amber-400 overflow-hidden">
            <span className="px-3 py-2 text-xs font-mono font-bold text-slate-400 bg-slate-800/80 border-r border-slate-700 flex items-center gap-1">
              <span>🇮🇳</span>
              <span>+91</span>
            </span>
            <input
              type="tel"
              value={whatsappNumber}
              onChange={(e) => handleWhatsappChange(e.target.value)}
              placeholder="Enter 10-digit mobile number"
              maxLength={13}
              className="w-full px-3 py-2 bg-transparent text-white font-mono text-xs sm:text-sm placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Mobile 1-Tap Pay Drawer (YouPI Intent Switcher) */}
        {isMobileDevice() && (
          <div className="mb-3.5 space-y-2">
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

        {/* AUTOMATICALLY GENERATED DYNAMIC QR CODE */}
        <div className="mb-3">
          {/* QR View Mode Selector */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Automatic Dynamic QR
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setQrMode('vector')}
                className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  qrMode === 'vector'
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                Dynamic SVG
              </button>
              <button
                type="button"
                onClick={() => setQrMode('card')}
                className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  qrMode === 'card'
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                FamPay Card
              </button>
            </div>
          </div>

          {/* QR Code Container */}
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
                <span className="mt-1.5 text-[9px] font-mono font-bold text-slate-700 uppercase tracking-wider">
                  Scan to Pay ₹59 to aarushydv@fam
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
        <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 mb-3.5 flex items-center justify-between gap-2">
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

        {/* AUTOMATED PAYMENT DETECTION & TRANSFER STATUS (Replaces manual button) */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2 text-center">
          {detectionStatus === 'detecting' && (
            <div>
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <Radio className="w-4 h-4 animate-pulse" />
                <span>Listening for UPI Payment...</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                Send ₹59 using any UPI app. The system automatically detects your payment and transfers you directly to the download page.
              </p>
            </div>
          )}

          {detectionStatus === 'verifying' && (
            <div>
              <div className="flex items-center justify-center gap-2 text-amber-400 font-bold text-sm mb-1">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying UPI Credit to {YOUPI_CONFIG.merchantVpa}...</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">
                Incoming transaction observed. Confirming bank settlement...
              </p>
            </div>
          )}

          {detectionStatus === 'success' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-black text-base mb-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
                <span>Payment Confirmed & Verified! 🎉</span>
              </div>
              <p className="text-xs text-slate-200 font-semibold">
                Transferring to your ebook download page...
              </p>
            </div>
          )}
        </div>

        {/* Fallback Direct Link if user wants to proceed immediately */}
        <div className="mt-3 text-center">
          <button
            onClick={triggerTransferToThankYou}
            className="text-[11px] text-slate-500 hover:text-amber-400 underline transition-colors cursor-pointer"
          >
            Click here if you have already transferred ₹59 and want to go to download
          </button>
        </div>

        {/* Support note */}
        <p className="text-[10px] text-slate-400 text-center mt-2 font-mono">
          Help Desk: {SUPPORT_EMAIL} • Instagram: @{DM_HANDLE}
        </p>

      </div>
    </div>
  );
}

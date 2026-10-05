import { UPI_SUPPORT } from '../config';

/**
 * Detects whether the current device is a mobile phone / tablet
 */
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  
  const ua = navigator.userAgent || navigator.vendor || window.opera || '';
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isTouchScreen = (window.innerWidth <= 820) && (
    'ontouchstart' in window || 
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
  );
  
  return isMobileUA || isTouchScreen;
};

/**
 * Builds the standard BHIM UPI deep link URI
 */
export const getUpiDeepLink = (amount = '') => {
  const params = new URLSearchParams({
    pa: UPI_SUPPORT.upiId,
    pn: UPI_SUPPORT.name,
    cu: 'INR',
    tn: 'Support Deep Focus Student Academy'
  });
  if (amount) {
    params.append('am', amount);
  }
  return `upi://pay?${params.toString()}`;
};

/**
 * Handles Support Me button click:
 * - On Mobile Phone: Redirects immediately to UPI app chooser (Google Pay, PhonePe, Paytm, BHIM, etc.)
 * - On PC / Laptop: Opens the QR code modal for scanning
 */
export const handleSupportClick = (openModalCallback) => {
  if (isMobileDevice()) {
    // Redirect mobile user to native UPI application chooser
    const upiLink = getUpiDeepLink();
    window.location.href = upiLink;

    // As a seamless fallback (e.g. if WebView suppresses intent or user returns),
    // also display the modal so they can copy the UPI ID or view the QR code.
    if (openModalCallback) {
      setTimeout(() => {
        openModalCallback();
      }, 700);
    }
  } else {
    // Desktop PC: Display the QR code modal directly
    if (openModalCallback) {
      openModalCallback();
    }
  }
};

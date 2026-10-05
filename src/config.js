// ============================================================================
// CONFIGURATION SETTINGS
// ============================================================================

/**
 * 1. DM REDIRECT & PAYMENT CONFIGURATION
 * When users click "GET NOW" or "GET THIS EBOOK", they are redirected 
 * to your DM @deepfocusacademy with a pre-typed message.
 */
export const DM_HANDLE = "deepfocusacademy";

/**
 * 2. BOOK PRICING
 * 59 Rupees one-time payment for the entire 43-page guide + field tools
 */
export const BOOK_PRICE = {
  amount: 59,
  currencySymbol: "₹",
  display: "₹59",
  label: "Only ₹59",
  fullText: "₹59 Only (One-Time Payment)"
};

// Pre-typed message directly asking for the book
export const PRETYPED_MESSAGE = 
  "Hi! I want to buy your ebook 'How to Study 4 Hours Without Getting Distracted' (₹59). Please share access & payment details.";

// Direct Instagram DM link (ig.me directly opens chat thread with prefilled text)
export const INSTAGRAM_DM_URL = `https://ig.me/m/${DM_HANDLE}?text=${encodeURIComponent(PRETYPED_MESSAGE)}`;

// Official Instagram profile URL fallback
export const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${DM_HANDLE}/`;

// Telegram fallback link if preferred
export const TELEGRAM_DM_URL = `https://t.me/${DM_HANDLE}?text=${encodeURIComponent(PRETYPED_MESSAGE)}`;

// Active destination for Buy Now / Get Now: DIRECTLY OPENS INSTAGRAM DMS WITH PRETYPED MESSAGE
export const PAYMENT_URL = INSTAGRAM_DM_URL;

/**
 * 2. EBOOK_DOWNLOAD_URL
 * Direct PDF download link used on the /thank-you page after successful purchase.
 */
export const EBOOK_DOWNLOAD_URL = "./How_to_Study_4_Hours_Without_Distraction.pdf";

/**
 * 3. SUPPORT_EMAIL & RESPONSE TIME
 */
export const SUPPORT_EMAIL = "deepfocusacademy@gmail.com";
export const RESPONSE_TIME = "Within 24 hours";

/**
 * 4. STRICT NO-RETURN POLICY NOTICE
 * Clearly and visibly displayed across all purchase points.
 */
export const NO_RETURN_POLICY = 
  "Strict No-Return / No-Refund Policy: Due to the instant digital nature of this 43-page PDF guide and field templates, all sales are strictly final and non-refundable.";

/**
 * 5. UPI "SUPPORT ME" CONFIGURATION
 */
export const UPI_SUPPORT = {
  name: "Aarush Yadav",
  upiId: "aarushydv@fam",
  qrImage: "./images/upi-qr.png",
  apps: ["Google Pay", "PhonePe", "PayTM", "BHIM UPI", "Amazon Pay"]
};

// Brand and metadata
export const BRAND_INFO = {
  name: "Deep Focus Student Academy",
  series: "Practical Productivity & Exam Mastery Series",
  bookTitle: "HOW TO STUDY 4 HOURS WITHOUT GETTING DISTRACTED",
  bookSubtitle: "The Real-World System for Indian Students to Build Rocket-Solid Concentration, Master Tough Syllabi, and Stop Wasting Time on Screen Loops",
  copyrightYear: "2026",
};

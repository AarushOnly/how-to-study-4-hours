/**
 * Triggers the seamless WhatsApp -> UPI Payment -> Payment Done checkout flow
 */
export function buyNow() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ebook:open-checkout'));
  }
}

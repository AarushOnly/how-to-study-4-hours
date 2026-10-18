/**
 * Triggers the seamless YouPI-PG UPI Checkout flow (WhatsApp -> Dynamic UPI QR -> Verification)
 */
export function buyNow() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ebook:open-checkout'));
    window.dispatchEvent(new CustomEvent('youpi:checkout:open', {
      detail: {
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        amount: 59,
        vpa: 'aarushydv@fam'
      }
    }));
  }
}

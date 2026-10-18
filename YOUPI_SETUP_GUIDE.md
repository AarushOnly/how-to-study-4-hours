# ⚡ YouPI-PG V2 Integration & Self-Hosting Guide

This website is integrated with **[YouPI-PG V2](https://github.com/youpi-pg/YouPI-PG)** — the sovereign, zero-platform-fee UPI payment gateway designed for direct Indian bank settlement.

---

## 💸 1. Your Payment Details Configured
* **Merchant VPA (UPI ID):** `aarushydv@fam`
* **Payee Name:** `AARUSH YADAV`
* **Product Price:** ₹59 (One-Time Payment)
* **Transaction Fee:** **0.0%** (Every rupee goes directly to `aarushydv@fam` via NPCI UPI rails)
* **Settlement:** Instant Direct-to-Account P2P settlement

---

## 🚀 2. Frontend Features Integrated on the Website

1. **Universal One-Script & Button Attributes:**
   * All checkout buttons are tagged with `data-youpi-pay`, `data-order-id`, `data-amount="59.00"`, `data-currency="INR"`, and `data-vpa="aarushydv@fam"`.
   * Dispatches standard YouPI custom events: `ebook:open-checkout`, `youpi:checkout:open`, and `youpi:payment:done`.

2. **WhatsApp Pre-Checkout Capture (Berry Protocol):**
   * Students enter their 10-digit WhatsApp number (+91) before payment.
   * Ensures instant, verified PDF delivery destination.

3. **Dynamic Vector SVG QR Code Engine:**
   * Real-time vector QR generated matching standard NPCI ISO format:
     ```text
     upi://pay?pa=aarushydv@fam&pn=AARUSH%20YADAV&am=59.00&cu=INR&tn=Deep%20Focus%20Ebook&tr=YOUPI-XXXXXX
     ```
   * Includes 1-click toggle to view the uploaded FamPay QR card.

4. **1-Tap Mobile Drawer & App Switcher:**
   * When viewed on smartphones, provides 1-tap launcher for:
     * Google Pay
     * PhonePe
     * Paytm
     * CRED
     * BHIM UPI

5. **YouPI Dual Countdown Timers:**
   * 05:00 dynamic payment session timer with animated progress bar.

6. **UTR / UPI Reference Number Reconciliation:**
   * Allows students to paste their 12-digit UTR from their bank/UPI app receipt, matching YouPI's bank observer format.

7. **The Requested Confirmation Action:**
   * Button: **`"CLICK HERE WHEN PAYMENT DONE"`**
   * Displays the delivery notice:
     > *"Your PDF should be available within 24 hours on your WhatsApp: +91 [phone]. If not, contact us via: integral7535@gmail.com and my instagram handle (@deepfocusacademy)."*

---

## 🛠️ 3. (Optional) Running the Full YouPI Backend Server

If you wish to run the self-hosted **YouPI-PG backend server** for automated Android SMS/Gmail verification:

### Step 1: Clone the YouPI-PG Repository
```bash
git clone https://github.com/youpi-pg/YouPI-PG.git
cd YouPI-PG
npm install
```

### Step 2: Configure `.env`
```env
# Set your merchant receiving VPA
MERCHANT_VPA=aarushydv@fam
MERCHANT_NAME="Aarush Yadav"

# Server Ports
PORT_CONTROL_CENTER=6000
PORT_PAYMENT_API=6001
PORT_CHECKOUT=6004

# Database
DB_CLIENT=sqlite
DB_FILE=./data/youpi_pg.sqlite
```

### Step 3: Start YouPI Gateway
```bash
npm run dev
```

### Step 4: Link Your Gateway URL
In [`src/config.js`](file:///c:/Users/Studio-D94/Documents/Antigravity/ebook/src/config.js), update:
```javascript
export const YOUPI_CONFIG = {
  gatewayApiUrl: "https://your-youpi-domain.com", // Your hosted YouPI URL
  merchantVpa: "aarushydv@fam",
  payeeName: "AARUSH YADAV",
  amount: 59,
  ...
};
```

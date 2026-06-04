// ═══════════════════════════════════════════════════════════════════
//  dsaflow.app — Razorpay Payment Module
//  ► Replace RAZORPAY_KEY_ID with your actual Razorpay Key ID
//  ► Create a Razorpay account at https://razorpay.com
//  ► For testing, use test keys from Razorpay dashboard
// ═══════════════════════════════════════════════════════════════════

// ── CONFIGURE YOUR RAZORPAY KEY ────────────────────────────────────
const RAZORPAY_KEY_ID = 'rzp_live_StXUp3supvsh2Y'; // ← LIVE Key
// ─────────────────────────────────────────────────────────────────

const AMOUNT_PAISE   = 9900;  // ₹99 in paise
const CURRENCY       = 'INR';
const PRODUCT_NAME   = 'dsaflow.app — Lifetime Access';
const DESCRIPTION    = 'Unlock unlimited DSA learning, visualizations & placement prep';

/**
 * Opens Razorpay checkout. Resolves with paymentId on success.
 * @param {Object} user  - { name, email, whatsapp }
 * @returns {Promise<string>} paymentId
 */
export function openRazorpayCheckout(user) {
  return new Promise((resolve, reject) => {

    // If Razorpay is not configured, use demo mode
    if (RAZORPAY_KEY_ID === 'rzp_test_YOUR_KEY_HERE') {
      const confirmed = confirm(
        '⚠️ Demo Mode: Razorpay key not configured.\n\n' +
        'In demo mode, clicking OK will simulate a successful ₹99 payment.\n\n' +
        'To enable real payments, add your Razorpay key in modules/payment/payment.js'
      );
      if (confirmed) {
        resolve('demo_pay_' + Date.now());
      } else {
        reject(new Error('Payment cancelled.'));
      }
      return;
    }

    if (typeof Razorpay === 'undefined') {
      reject(new Error('Razorpay SDK not loaded. Check your internet connection.'));
      return;
    }

    const options = {
      key:         RAZORPAY_KEY_ID,
      amount:      AMOUNT_PAISE,
      currency:    CURRENCY,
      name:        'dsaflow.app',
      description: DESCRIPTION,
      image:       '', // add your logo URL here
      prefill: {
        name:    user.name  || '',
        email:   user.email || '',
        contact: user.whatsapp || ''
      },
      notes: {
        product: PRODUCT_NAME,
        userId:  user.uid || ''
      },
      theme: {
        color: '#7c4dff'
      },
      handler: function(response) {
        // Payment success
        resolve(response.razorpay_payment_id);
      },
      modal: {
        ondismiss: function() {
          reject(new Error('Payment cancelled.'));
        }
      }
    };

    try {
      const rzp = new Razorpay(options);
      rzp.on('payment.failed', (resp) => {
        reject(new Error(resp.error.description || 'Payment failed.'));
      });
      rzp.open();
    } catch (e) {
      reject(e);
    }
  });
}

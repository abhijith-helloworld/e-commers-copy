'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShieldCheck, CreditCard, Wallet, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react'
import { useCart } from '@/components/cart/CartProvider'
import styles from './checkout.module.css'

export default function CheckoutPage() {
  const router = useRouter()
  // Correctly destructure from useCart
  const { cartItems = [], totalPrice = 0, clearCart } = useCart() || {}
  
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [popup, setPopup] = useState(null)
  const [isAuthChecking, setIsAuthChecking] = useState(true)

  // Auth Guard
  useEffect(() => {
    const isLogged = localStorage.getItem('spicezone-auth') === 'true'
    if (!isLogged) {
      router.push('/auth/login')
    } else {
      setIsAuthChecking(false)
    }
  }, [router])

  const closePopup = () => {
    const action = popup?.action
    setPopup(null)
    if (action === 'redirect_home') {
      if (clearCart) clearCart()
      router.push('/')
    }
  }

  // Fallback calculation in case totalPrice isn't available
  const calculatedTotal = cartItems.reduce((total, item) => total + (item.price * (item.qty || 1)), 0)
  const finalTotal = totalPrice || calculatedTotal
  const shipping = finalTotal > 1500 ? 0 : 50; 

  const handleCheckout = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Ensure Razorpay script is fully loaded
    const scriptLoaded = await new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

    if (!scriptLoaded) {
      setPopup({ type: 'error', title: 'Connection Issue', message: 'Failed to load the secure checkout. Please check your internet connection.' });
      setIsProcessing(false);
      return;
    }

    try {
      // Create backend secure order
      const orderAmount = finalTotal + shipping;
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: orderAmount }),
      });
      const order = await res.json();

      // Setup Razorpay checkout options natively
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_1234abcd",
        amount: order.amount,
        currency: order.currency,
        name: "The Spices Zone",
        description: "Premium Spice Order",
        image: "/spice-turmeric.png",
        order_id: order.id.startsWith("order_mock_") ? undefined : order.id, // Bypass if mocked securely
        handler: function (response) {
          setPopup({
            type: 'success',
            title: 'Payment Successful',
            message: `Your payment was processed perfectly! Your transaction ID is ${response.razorpay_payment_id}. Your premium spices are being prepared!`,
            action: 'redirect_home'
          });
        },
        prefill: {
          name: "Culinary Connoisseur",
          email: "customer@spiceszone.com",
          contact: "9999999999",
        },
        theme: {
          color: "#C0533A", // Terracotta styling
        },
      };

      const paymentObject = new window.Razorpay(options);
      
      paymentObject.on("payment.failed", function (response) {
        setPopup({ type: 'error', title: 'Payment Failed', message: `Reason: ${response.error.description}` });
      });
      
      paymentObject.open();

    } catch (err) {
      console.error(err);
      setPopup({ type: 'error', title: 'System Error', message: 'Failed to initiate secure checkout process!' });
    } finally {
      setIsProcessing(false);
    }
  }

  // Show a blank/loading screen while checking auth to prevent layout flashing
  if (isAuthChecking) {
    return <div style={{ minHeight: '100vh', backgroundColor: 'var(--cream)' }} />
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.checkoutContainer}>
         <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h1 className={styles.title}>Your Cart is <span className={styles.titleAccent}>Empty</span></h1>
            <p style={{ marginTop: '1rem', color: 'var(--bark-light)' }}>Add some spices to your cart to proceed with checkout.</p>
            <Link href="/shop" style={{ display: 'inline-block', marginTop: '2rem', padding: '0.8rem 2rem', background: 'var(--terracotta)', color: 'white', borderRadius: '4px' }}>
              Return to Shop
            </Link>
         </div>
      </div>
    )
  }

  return (
    <div className={styles.checkoutContainer}>
      <div className="container">
        
        <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--bark)', marginBottom: '2rem', fontWeight: '500' }}>
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>
            Secure <span className={styles.titleAccent}>Checkout</span>
          </h1>
        </header>

        <form className={styles.content} onSubmit={handleCheckout}>
          {/* Left Column: Forms */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>1. Shipping Details</h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>First Name</label>
                <input required type="text" className={styles.input} placeholder="John" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name</label>
                <input required type="text" className={styles.input} placeholder="Doe" />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Email Address</label>
                <input required type="email" className={styles.input} placeholder="john@example.com" />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Street Address</label>
                <input required type="text" className={styles.input} placeholder="123 Spice Route" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>City</label>
                <input required type="text" className={styles.input} placeholder="Mumbai" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Postal Code</label>
                <input required type="text" className={styles.input} placeholder="400001" />
              </div>
            </div>

            <h2 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>2. Payment Method</h2>
            <div className={styles.paymentMethods}>
              <div 
                className={`${styles.paymentMethod} ${paymentMethod === 'card' ? styles.active : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard size={20} /> Credit Card
              </div>
              <div 
                className={`${styles.paymentMethod} ${paymentMethod === 'upi' ? styles.active : ''}`}
                onClick={() => setPaymentMethod('upi')}
              >
                <Wallet size={20} /> UPI / Net Banking
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className={styles.formGrid} style={{ marginTop: '1.5rem' }}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Card Number</label>
                  <input required type="text" className={styles.input} placeholder="0000 0000 0000 0000" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Expiry Date</label>
                  <input required type="text" className={styles.input} placeholder="MM/YY" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>CVV</label>
                  <input required type="text" className={styles.input} placeholder="123" />
                </div>
              </div>
            )}
            
            {paymentMethod === 'upi' && (
              <div className={styles.formGrid} style={{ marginTop: '1.5rem' }}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>UPI ID</label>
                  <input required type="text" className={styles.input} placeholder="john@upi" />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className={styles.summarySection}>
            <h2 className={styles.sectionTitle} style={{ borderBottom: 'none' }}>Order Summary</h2>
            
            <div className={styles.cartItems}>
              {cartItems.map((item, idx) => (
                <div key={idx} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemMeta}>Qty: {item.qty || 1} • {item.weight || '100g'}</span>
                  </div>
                  <span className={styles.itemPrice}>₹{item.price * (item.qty || 1)}</span>
                </div>
              ))}
            </div>

            <div className={styles.totals}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>₹{finalTotal}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                <span>Total</span>
                <span>₹{finalTotal + shipping}</span>
              </div>
            </div>

            <button type="submit" className={styles.checkoutBtn} disabled={isProcessing}>
              <ShieldCheck size={20} />
              {isProcessing ? 'Processing Order...' : `Pay ₹${finalTotal + shipping}`}
            </button>
            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--sage)' }}>
              🔒 256-bit SSL Encrypted Secure Checkout
            </p>
          </div>
        </form>
      </div>
      
      {/* Custom Popup Modal */}
      {popup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <div className={`${styles.popupIcon} ${styles[popup.type]}`}>
              {popup.type === 'success' ? <ShieldCheck size={32} /> : <XCircle size={32} />}
            </div>
            <h3 className={styles.popupTitle}>{popup.title}</h3>
            <p className={styles.popupMessage}>{popup.message}</p>
            <button className={`${styles.popupBtn} ${styles[popup.type]}`} onClick={closePopup}>
              {popup.type === 'success' ? 'Continue Shopping' : 'Try Again'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

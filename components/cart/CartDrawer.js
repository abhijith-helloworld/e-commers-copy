'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from './CartProvider'
import styles from './CartDrawer.module.css'

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQty, totalPrice } = useCart()

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`${styles.drawer} ${isCartOpen ? styles.open : ''}`}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
        id="cart-drawer"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <ShoppingBag size={20} className={styles.bagIcon} />
            <h2 className={styles.title}>Your Cart</h2>
            {cartItems.length > 0 && (
              <span className={styles.count}>{cartItems.length}</span>
            )}
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            id="cart-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className={styles.body}>
          {cartItems.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🛒</div>
              <p className={styles.emptyTitle}>Your cart is empty</p>
              <p className={styles.emptyText}>Add some spices to get started!</p>
              <Link href="/shop" className={styles.shopBtn} onClick={() => setIsCartOpen(false)}>
                Browse Spices
              </Link>
            </div>
          ) : (
            <ul className={styles.itemList} aria-label="Cart items">
              {cartItems.map(item => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.itemImg}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="80px"
                    />
                  </div>

                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemVariant}>{item.variant || '100g'}</p>

                    <div className={styles.itemRow}>
                      {/* Qty Controls */}
                      <div className={styles.qtyControl}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus size={12} />
                        </button>
                        <span className={styles.qty}>{item.qty}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className={styles.itemPrice}>
                        ₹{(item.price * item.qty).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotal}>
              <span>Subtotal</span>
              <span className={styles.subtotalPrice}>₹{totalPrice.toFixed(0)}</span>
            </div>
            <p className={styles.shipping}>Free shipping on orders above ₹999</p>

            <Link
              href="/checkout"
              className={styles.checkoutBtn}
              onClick={() => setIsCartOpen(false)}
              id="checkout-btn"
            >
              Proceed to Checkout
              <ArrowRight size={16} />
            </Link>

            <button
              className={styles.continueBtn}
              onClick={() => setIsCartOpen(false)}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X, ChevronDown, User } from 'lucide-react'
import { useCart } from '@/components/cart/CartProvider'
import CartDrawer from '@/components/cart/CartDrawer'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Shop', href: '/shop', hasDropdown: true, items: [
    { label: 'All Spices', href: '/shop' },
    { label: 'Whole Spices', href: '/shop?category=whole' },
    { label: 'Ground Spices', href: '/shop?category=ground' },
    { label: 'Spice Blends', href: '/shop?category=blends' },
    { label: 'Gift Sets', href: '/shop?category=gifts' },
  ]},
  { label: 'Origins', href: '/origins' },
  { label: 'Recipes', href: '/recipes' },
  { label: 'Our Story', href: '/about' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { totalItems, setIsCartOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Auth Listener
    setTimeout(() => setIsLoggedIn(localStorage.getItem('spicezone-auth') === 'true'), 0)
    const handleAuthChange = () => setIsLoggedIn(localStorage.getItem('spicezone-auth') === 'true')
    window.addEventListener('auth-change', handleAuthChange)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('auth-change', handleAuthChange)
    }
  }, [])



  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  return (
    <>
      <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`} role="banner">
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="The Spices Zone - Home">
            <span className={styles.logoIcon}>✦</span>
            <div className={styles.logoText}>
              <span className={styles.logoMain}>The Spices Zone</span>
              <span className={styles.logoSub}>Organic · Artisan · Pure</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className={styles.navItem}
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href={link.href} className={styles.navLink} id={`nav-${link.label.toLowerCase()}`}>
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={14} className={styles.chevron} />}
                </Link>

                {link.hasDropdown && activeDropdown === link.label && (
                  <div className={styles.dropdown} role="menu">
                    {link.items.map(item => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={styles.dropdownItem}
                        role="menuitem"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className={styles.actions}>


            {/* Cart */}
            <button
              className={styles.cartBtn}
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open cart — ${totalItems} items`}
              id="cart-btn"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className={styles.cartBadge} aria-live="polite">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Auth Component directly next to CTA */}
            {isLoggedIn ? (
              <button 
                className={styles.iconBtn} 
                onClick={() => {
                  localStorage.removeItem('spicezone-auth')
                  window.dispatchEvent(new Event('auth-change'))
                }}
                aria-label="Logout"
                style={{ color: 'var(--terracotta)' }}
                title="Logout"
              >
                <User size={20} />
              </button>
            ) : (
              <Link href="/auth/login" className={styles.iconBtn} aria-label="Sign in" title="Sign In">
                <User size={20} />
              </Link>
            )}

            {/* CTA */}
            <Link href="/shop" className={styles.ctaBtn} id="nav-shop-cta">
              Shop Now
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className={styles.mobileToggle}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
              id="mobile-menu-btn"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileOpen ? styles.mobileMenuOpen : ''}`} aria-hidden={!isMobileOpen}>
        <div className={styles.mobileMenuInner}>
          <div className={styles.mobileLogoRow}>
            <Link href="/" className={styles.logo} onClick={() => setIsMobileOpen(false)}>
              <span className={styles.logoIcon}>✦</span>
              <div className={styles.logoText}>
                <span className={styles.logoMain}>The Spices Zone</span>
              </div>
            </Link>
          </div>

          <nav className={styles.mobileNav}>
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.hasDropdown && (
                  <div className={styles.mobileSubLinks}>
                    {link.items.map(sub => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className={styles.mobileSubLink}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className={styles.mobileCta}>
            <Link href="/shop" className={styles.mobileCtaBtn} onClick={() => setIsMobileOpen(false)}>
              Shop All Spices
            </Link>
          </div>
        </div>
      </div>

      {isMobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setIsMobileOpen(false)} aria-hidden="true" />
      )}

      <CartDrawer />
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X, ChevronDown, User, LogOut } from 'lucide-react'
import { useCart } from '@/components/cart/CartProvider'
import CartDrawer from '@/components/cart/CartDrawer'
import {
  AUTH_CHANGE_EVENT,
  clearAuthSession,
  fetchLoggedInUserProfile,
  getStoredAuthUser,
  isUserAuthenticated,
  logoutUserFromServer,
} from '@/lib/auth-session'
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

const getUserDisplayName = (user) => {
  if (!user || typeof user !== 'object') return 'My Account'

  const fullName = [user.firstname, user.lastname].filter(Boolean).join(' ').trim()
  return user.username || fullName || user.email || 'My Account'
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAuthResolved, setIsAuthResolved] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const { totalItems, setIsCartOpen } = useCart()

  useEffect(() => {
    let isMounted = true

    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })

    const syncAuthState = async () => {
      const authenticated = isUserAuthenticated()
      if (!isMounted) return

      setIsLoggedIn(authenticated)

      if (!authenticated) {
        setUserProfile(null)
        setIsAuthResolved(true)
        return
      }

      setIsAuthResolved(true)

      const cachedUser = getStoredAuthUser()
      if (cachedUser) {
        setUserProfile(cachedUser)
      }

      try {
        const profile = await fetchLoggedInUserProfile()
        if (!isMounted) return
        setUserProfile(profile)
      } catch (error) {
        if (!isMounted) return

        if (error?.status === 401) {
          clearAuthSession()
          setUserProfile(null)
          return
        }

        if (!cachedUser) {
          setUserProfile(null)
        }
      }
    }

    const handleAuthChange = () => {
      void syncAuthState()
    }

    void syncAuthState()
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange)

    return () => {
      isMounted = false
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange)
    }
  }, [])

  const handleLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)

    try {
      await logoutUserFromServer()
    } catch (error) {
      // Keep UX smooth: even if server logout fails, clear local session.
      console.error('Logout API error:', error)
    } finally {
      clearAuthSession()
      setIsLoggedIn(false)
      setUserProfile(null)
      setIsAuthResolved(true)
      setIsLoggingOut(false)
      setIsMobileOpen(false)
    }
  }

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  useEffect(() => {
    const closeMenuOnDesktop = () => {
      if (window.innerWidth > 900) {
        setIsMobileOpen(false)
      }
    }

    closeMenuOnDesktop()
    window.addEventListener('resize', closeMenuOnDesktop, { passive: true })
    return () => window.removeEventListener('resize', closeMenuOnDesktop)
  }, [])

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

            {isLoggedIn && userProfile && (
              <div className={styles.userMeta} aria-live="polite">
                <span className={styles.userName}>{getUserDisplayName(userProfile)}</span>
                {userProfile.email && <span className={styles.userEmail}>{userProfile.email}</span>}
              </div>
            )}

            {/* Auth Component directly next to CTA */}
            {isAuthResolved && (
              isLoggedIn ? (
                <button
                  className={styles.logoutBtn}
                  onClick={handleLogout}
                  aria-label="Logout"
                  title="Logout"
                  disabled={isLoggingOut}
                >
                  <LogOut size={16} />
                  <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
              ) : (
                <Link href="/auth/login" className={styles.iconBtn} aria-label="Sign in" title="Sign In">
                  <User size={20} />
                </Link>
              )
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

          {isLoggedIn && userProfile && (
            <div className={styles.mobileUserCard}>
              <span className={styles.mobileUserName}>{getUserDisplayName(userProfile)}</span>
              {userProfile.email && <span className={styles.mobileUserEmail}>{userProfile.email}</span>}
            </div>
          )}

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
            {isAuthResolved && isLoggedIn && (
              <button
                type="button"
                className={styles.mobileLogoutBtn}
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut size={16} />
                <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              </button>
            )}

            <Link href="/shop" className={styles.mobileCtaBtn} onClick={() => setIsMobileOpen(false)}>
              Shop All Spices
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${styles.mobileOverlay} ${isMobileOpen ? styles.mobileOverlayOpen : ''}`}
        onClick={() => setIsMobileOpen(false)}
        aria-hidden={!isMobileOpen}
      />

      <CartDrawer />
    </>
  )
}

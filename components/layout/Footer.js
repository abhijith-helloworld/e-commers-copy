'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import styles from './Footer.module.css'

// Inline SVGs for social icons
function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function TwitterIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const footerLinks = {
  shop: [
    { label: 'All Spices', href: '/shop' },
    { label: 'Whole Spices', href: '/shop?category=whole' },
    { label: 'Ground Spices', href: '/shop?category=ground' },
    { label: 'Spice Blends', href: '/shop?category=blends' },
    { label: 'Gift Sets', href: '/shop?category=gifts' },
  ],
  explore: [
    { label: 'Our Story', href: '/about' },
    { label: 'Origins', href: '/origins' },
    { label: 'Recipes', href: '/recipes' },
    { label: 'Blog', href: '/blog' },
    { label: 'Press', href: '/press' },
  ],
  support: [
    { label: 'FAQs', href: '/faq' },
    { label: 'Shipping Policy', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Track Order', href: '/track' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Newsletter Banner */}
      <div className={styles.newsletter}>
        <div className={`container ${styles.newsletterInner}`}>
          <div className={styles.newsletterText}>
            <span className={styles.newsletterLabel}>Join the Spice Club</span>
            <h2 className={styles.newsletterTitle}>
              Get 15% off your first order
            </h2>
            <p className={styles.newsletterSub}>
              Weekly spice stories, recipes & exclusive offers.
            </p>
          </div>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()} aria-label="Newsletter signup">
            <input
              type="email"
              placeholder="Your email address"
              className={styles.newsletterInput}
              aria-label="Email address"
              id="newsletter-email"
              required
            />
            <button type="submit" className={styles.newsletterBtn} id="newsletter-submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand Column */}
            <div className={styles.brandCol}>
              <Link href="/" className={styles.footerLogo} aria-label="The Spices Zone home">
                <span className={styles.logoIcon}>✦</span>
                <div>
                  <div className={styles.logoMain}>The Spices Zone</div>
                  <div className={styles.logoClaim}>Farm to Kitchen · Est. 2020</div>
                </div>
              </Link>
              <p className={styles.brandDesc}>
                We source the world&apos;s finest organic spices directly from small family farms,
                preserving traditional harvesting methods to deliver pure, potent flavours.
              </p>

              {/* Contact Info */}
              <div className={styles.contactInfo}>
                <a href="mailto:hello@spiceszone.in" className={styles.contactItem}>
                  <Mail size={14} /> hello@spiceszone.in
                </a>
                <a href="tel:+911800123456" className={styles.contactItem}>
                  <Phone size={14} /> +91 1800 123 456
                </a>
                <span className={styles.contactItem}>
                  <MapPin size={14} /> Mumbai, India
                </span>
              </div>

              <div className={styles.social}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Follow on Instagram" id="footer-instagram">
                  <InstagramIcon size={18} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Follow on Facebook" id="footer-facebook">
                  <FacebookIcon size={18} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Follow on Twitter" id="footer-twitter">
                  <TwitterIcon size={18} />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className={styles.linksCol}>
              <h3 className={styles.colTitle}>Shop</h3>
              <ul className={styles.linksList}>
                {footerLinks.shop.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.footerLink}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linksCol}>
              <h3 className={styles.colTitle}>Explore</h3>
              <ul className={styles.linksList}>
                {footerLinks.explore.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.footerLink}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linksCol}>
              <h3 className={styles.colTitle}>Support</h3>
              <ul className={styles.linksList}>
                {footerLinks.support.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.footerLink}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomInner}`}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} The Spices Zone. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy" className={styles.bottomLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.bottomLink}>Terms of Service</Link>
            <Link href="/sitemap" className={styles.bottomLink}>Sitemap</Link>
          </div>
          <div className={styles.certifications}>
            <span className={styles.cert}>🌿 100% Organic</span>
            <span className={styles.cert}>⭐ FSSAI Certified</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
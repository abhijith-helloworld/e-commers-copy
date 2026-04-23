'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import styles from './Hero.module.css'

const stats = [
  { value: '200+', label: 'Spice Varieties' },
  { value: '50+', label: 'Farm Partners' },
  { value: '12', label: 'Countries' },
  { value: '4.9★', label: 'Customer Rating' },
]

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToProducts = () => {
    document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero} aria-label="Hero section" id="hero">
      {/* Background Image */}
      <div className={styles.bgWrapper}>
        <Image
          src="/hero-spices.png"
          alt="Scattered whole organic spices including turmeric, star anise, cinnamon, cardamom, and saffron on cream linen"
          fill
          priority
          quality={95}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="100vw"
        />
        {/* Gradient Overlays */}
        <div className={styles.overlayLeft} />
        <div className={styles.overlayBottom} />
        <div className={styles.overlayTop} />
      </div>

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={`${styles.textBlock} ${isVisible ? styles.visible : ''}`}>
          {/* Eyebrow */}
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>Certified Organic · Direct from Farms</span>
          </div>

          {/* Headline */}
          <h1 className={styles.headline}>
            <span className={styles.headlineSmall}>The World&apos;s Finest</span>
            <span className={styles.headlineLarge}>Organic</span>
            <span className={styles.headlineAccent}>Spices</span>
          </h1>

          {/* Sub-headline */}
          <p className={styles.subheadline}>
            Handpicked from the world&apos;s most fertile spice regions. 
            Every jar captures centuries of tradition, 
            pure flavour, and uncompromising quality.
          </p>

          {/* CTA Buttons */}
          <div className={styles.ctas}>
            <Link href="/shop" className={styles.ctaPrimary} id="hero-shop-btn">
              Explore Collection
              <ArrowRight size={18} />
            </Link>
            <Link href="/about" className={styles.ctaSecondary} id="hero-story-btn">
              Our Story
            </Link>
          </div>

          {/* Trust Badges */}
          <div className={styles.trust}>
            <span className={styles.trustItem}>🌿 100% Organic</span>
            <span className={styles.trustDivider}>·</span>
            <span className={styles.trustItem}>🚚 Free Delivery ₹999+</span>
            <span className={styles.trustDivider}>·</span>
            <span className={styles.trustItem}>🔄 Easy Returns</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className={`${styles.statsBar} ${isVisible ? styles.statsVisible : ''}`}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <div key={stat.label} className={styles.statItem} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        className={styles.scrollIndicator}
        onClick={scrollToProducts}
        aria-label="Scroll to products"
        id="hero-scroll-btn"
      >
        <span className={styles.scrollText}>Discover</span>
        <div className={styles.scrollIcon}>
          <ChevronDown size={20} />
        </div>
      </button>
    </section>
  )
}

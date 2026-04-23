'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import styles from './Testimonials.module.css'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    title: 'Home Chef, Mumbai',
    avatar: '👩‍🍳',
    rating: 5,
    text: 'I have tried dozens of spice brands over the years, but The Spices Zone is in a class of its own. Their Kashmiri saffron is absolutely breathtaking — deep red threads with an intense aroma that transforms my biryanis completely.',
    product: 'Kashmir Saffron',
  },
  {
    id: 2,
    name: 'Chef Arjun Mehta',
    title: 'Executive Chef, Taj Hotels',
    avatar: '👨‍🍳',
    rating: 5,
    text: 'In a professional kitchen, consistency is everything. The Spices Zone delivers batch after batch of perfect quality. The lab testing gives me confidence that I am serving guests the purest ingredients. A genuine game-changer.',
    product: 'Whole Spice Collection',
  },
  {
    id: 3,
    name: 'Ananya Krishnan',
    title: 'Food Blogger & Recipe Developer',
    avatar: '✍️',
    rating: 5,
    text: 'The turmeric is so vibrant it practically glows! You can genuinely taste the difference compared to supermarket brands. My audience noticed a huge improvement in my recipe photos too — the colour is extraordinary.',
    product: 'Pure Turmeric Powder',
  },
  {
    id: 4,
    name: 'Ravi Patel',
    title: 'Ayurvedic Practitioner, Bangalore',
    avatar: '🌿',
    rating: 5,
    text: 'For therapeutic use, purity and potency are non-negotiable. The detailed provenance info and lab certificates for each product give me complete confidence when recommending these spices to my patients.',
    product: 'Green Cardamom',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent(c => (c + 1) % testimonials.length)

  const t = testimonials[current]

  return (
    <section className={styles.section} aria-label="Customer testimonials" id="testimonials">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>What Customers Say</span>
          <h2 className={styles.title}>
            Loved by <em>Thousands</em> of
            <br /> Spice Enthusiasts
          </h2>
        </div>

        {/* Testimonial Showcase */}
        <div className={styles.showcase}>
          <div className={styles.quoteIcon}>
            <Quote size={32} />
          </div>

          <blockquote className={styles.quote} key={t.id}>
            <p className={styles.quoteText}>&quot;{t.text}&quot;</p>

            <footer className={styles.quoteFooter}>
              <span className={styles.avatar}>{t.avatar}</span>
              <div className={styles.authorInfo}>
                <cite className={styles.name}>{t.name}</cite>
                <span className={styles.authorTitle}>{t.title}</span>
                <span className={styles.authorProduct}>Purchased: {t.product}</span>
              </div>
              <div className={styles.stars}>
                {'★'.repeat(t.rating)}
              </div>
            </footer>
          </blockquote>

          {/* Navigation */}
          <div className={styles.nav}>
            <button
              className={styles.navBtn}
              onClick={prev}
              aria-label="Previous testimonial"
              id="testimonial-prev"
            >
              <ChevronLeft size={20} />
            </button>

            <div className={styles.dots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  id={`testimonial-dot-${i}`}
                />
              ))}
            </div>

            <button
              className={styles.navBtn}
              onClick={next}
              aria-label="Next testimonial"
              id="testimonial-next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Mini Cards Row */}
        <div className={styles.miniCards}>
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              className={`${styles.miniCard} ${i === current ? styles.miniCardActive : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`View testimonial from ${item.name}`}
            >
              <span className={styles.miniAvatar}>{item.avatar}</span>
              <div>
                <p className={styles.miniName}>{item.name}</p>
                <p className={styles.miniRole}>{item.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

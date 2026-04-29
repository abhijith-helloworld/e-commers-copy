import Link from 'next/link'
import styles from './Categories.module.css'

const categories = [
  {
    id: 'whole',
    name: 'Whole Spices',
    desc: 'Breathtaking peppercorns, robust cinnamon sticks, and premium cardamom pods sourced directly from artisanal estates.',
    emoji: '🌶️',
    count: '48 Products',
    color: 'terracotta',
    href: '/shop?category=whole',
  },
  {
    id: 'ground',
    name: 'Ground & Powders',
    desc: 'Fine-milled for maximum flavour release',
    emoji: '✨',
    count: '62 Products',
    color: 'turmeric',
    href: '/shop?category=ground',
  },
  {
    id: 'blends',
    name: 'Spice Blends',
    desc: 'Artisan masalas crafted from traditional recipes',
    emoji: '🫙',
    count: '24 Products',
    color: 'sage',
    href: '/shop?category=blends',
  },
  {
    id: 'rare',
    name: 'Rare & Exotic',
    desc: 'Mongra saffron, real vanilla, and rare finds',
    emoji: '💎',
    count: '18 Products',
    color: 'bark',
    href: '/shop?category=rare',
  },
  {
    id: 'gifts',
    name: 'Gift Collections',
    desc: 'Beautifully curated spice sets perfect for every occasion',
    emoji: '🎁',
    count: '12 Sets',
    color: 'linen',
    href: '/shop?category=gifts',
  },
]

export default function Categories() {
  return (
    <section className={styles.section} id="categories" aria-label="Shop by category">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Explore the Collection</span>
          <h2 className={styles.title}>
            Shop by <em>Category</em>
          </h2>
        </div>

        <div className={styles.grid}>
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`${styles.card} ${styles[`card--${cat.color}`]}`}
              id={`category-${cat.id}`}
              aria-label={`Browse ${cat.name}`}
              style={{ '--card-delay': `${index * 0.08}s` }}
            >
              <div className={styles.cardEmoji}>{cat.emoji}</div>
              
              <div className={styles.cardContent}>
                <span className={styles.cardCount}>{cat.count}</span>
                <h3 className={styles.cardName}>{cat.name}</h3>
                <p className={styles.cardDesc}>{cat.desc}</p>
              </div>

              <div className={styles.cardArrow} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
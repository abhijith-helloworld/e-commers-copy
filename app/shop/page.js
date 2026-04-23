'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { ShoppingBag, Star, Filter } from 'lucide-react'
import { useCart } from '@/components/cart/CartProvider'
import styles from './shop.module.css'
import encyclopediaData from './prodect.json'

// Dynamically map the provided JSON list to the internal shop schema with fallback image/pricing
const allProducts = encyclopediaData.entries.map((entry, idx) => {
  const fallbackImages = ['/spice-turmeric.png', '/spice-cardamom.png', '/spice-saffron.png'];
  
  return {
    id: entry.id,
    name: entry.name,
    scientific_name: entry.scientific_name,
    origin: entry.origin,
    // Creating some categories based on heat_level for filtering purpose
    category: entry.heat_level === 'None' ? 'Aromatics & Sweet' : 'Pungent & Spicy', 
    price: 199 + (idx * 50),
    originalPrice: 249 + (idx * 50),
    weight: "100g",
    rating: 4.7 + (idx % 3) * 0.1,
    reviews: 120 + (idx * 45),
    image: fallbackImages[idx % fallbackImages.length],
    badge: entry.heat_level !== 'None' ? entry.heat_level : 'Organic',
    badgeColor: entry.heat_level !== 'None' ? 'terracotta' : 'sage',
    description: `A fragrant spice best served as ${entry.best_form.toLowerCase()}. Excellent for ${entry.common_uses.join(', ')}. Shelf life: ${entry.shelf_life_months} months.`,
    flavor_profile: entry.flavor_profile
  };
});


function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', gap: '2px', color: '#E4A832' }} aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={12}
          fill={i <= Math.floor(rating) ? 'currentColor' : 'none'}
          color="currentColor"
        />
      ))}
    </div>
  )
}

export default function ShopPage() {
  const { addToCart } = useCart()
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeOrigin, setActiveOrigin] = useState('All')

  // Dynamically extract unique categories and origins from the encyclopedia JSON mapping
  const CATEGORIES = useMemo(() => ['All', ...new Set(allProducts.map(p => p.category))], [])
  const ORIGINS = useMemo(() => ['All', ...new Set(allProducts.map(p => p.origin))], [])

  // Filter products based on selected category and origin
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchCategory = activeCategory === 'All' || product.category === activeCategory
      const matchOrigin = activeOrigin === 'All' || product.origin === activeOrigin
      return matchCategory && matchOrigin
    })
  }, [activeCategory, activeOrigin])

  return (
    <div className={styles.shopContainer}>
      <div className="container">
        
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>
            Global Spice <span className={styles.titleAccent}>Encyclopedia</span>
          </h1>
          <p className={styles.subtitle}>
            Explore v{encyclopediaData.version} of our collection. Discover the scientific roots, flavor profiles, and origins of the world&apos;s most essential spices.
          </p>
        </header>

        <div className={styles.content}>
          {/* Sidebar Navigation / Filters */}
          <aside className={styles.sidebar}>
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Category</h3>
              <div className={styles.filterList}>
                {CATEGORIES.map(category => (
                  <label key={category} className={`${styles.filterLabel} ${activeCategory === category ? styles.activeFilter : ''}`}>
                    <input 
                      type="radio" 
                      name="category" 
                      value={category}
                      checked={activeCategory === category}
                      onChange={(e) => setActiveCategory(e.target.value)}
                      className={styles.filterCheckbox}
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Origin</h3>
              <div className={styles.filterList}>
                {ORIGINS.map(origin => (
                  <label key={origin} className={`${styles.filterLabel} ${activeOrigin === origin ? styles.activeFilter : ''}`}>
                    <input 
                      type="radio" 
                      name="origin" 
                      value={origin}
                      checked={activeOrigin === origin}
                      onChange={(e) => setActiveOrigin(e.target.value)}
                      className={styles.filterCheckbox}
                    />
                    {origin}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main>
            {filteredProducts.length > 0 ? (
              <div className={styles.grid}>
                {filteredProducts.map((product, index) => (
                  <article
                    key={product.id}
                    className={styles.card}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image */}
                    <div className={styles.imageWrapper}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />

                      {product.badge && (
                        <span className={`${styles.badge} ${styles[`badge--${product.badgeColor}`]}`}>
                          {product.badge}
                        </span>
                      )}

                      <div className={styles.overlay}>
                        <button
                          className={styles.quickAdd}
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingBag size={16} />
                          <span>Add to Cart</span>
                        </button>
                      </div>

                      {product.originalPrice && (
                        <span className={styles.discount}>
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className={styles.info}>
                      <div className={styles.origin}>
                        <span className={styles.originDot} />
                        {product.origin}
                      </div>

                      <h3 className={styles.name}>
                        {product.name} 
                        <span style={{ fontSize: '0.85rem', color: 'var(--bark-light)', fontStyle: 'italic', display: 'block', fontWeight: '400' }}>
                          ({product.scientific_name})
                        </span>
                      </h3>
                      
                      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                        {product.flavor_profile.map((flavor, i) => (
                          <span key={i} style={{ fontSize: '0.7rem', backgroundColor: 'var(--linen)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                            {flavor}
                          </span>
                        ))}
                      </div>

                      <p className={styles.description}>{product.description}</p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <StarRating rating={product.rating} />
                        <span style={{ fontSize: '0.8rem', color: 'var(--bark-light)' }}>({product.reviews})</span>
                      </div>

                      {/* Footer / Pricing */}
                      <div className={styles.footer}>
                        <div className={styles.pricing}>
                          <span className={styles.price}>₹{product.price}</span>
                          <span className={styles.originalPrice}>₹{product.originalPrice}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--bark-light)' }}>{product.weight}</span>
                        </div>
                        <button
                          className={styles.addBtn}
                          onClick={() => addToCart(product)}
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <ShoppingBag size={15} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <Filter size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <h3>No Spices Found</h3>
                <p>We couldn&apos;t find any spices matching your current filters.</p>
                <button 
                  onClick={() => { setActiveCategory('All'); setActiveOrigin('All'); }}
                  style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    background: 'var(--terracotta)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

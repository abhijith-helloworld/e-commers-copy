'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Star } from 'lucide-react'
import { useCart } from '@/components/cart/CartProvider'
import styles from './FeaturedProducts.module.css'
import encyclopediaData from '@/app/shop/prodect.json'

// Parse top 3 products from JSON for Featured Section
const products = encyclopediaData.entries.slice(0, 3).map((entry, idx) => {
  const fallbackImages = ['/spice-turmeric.png', '/spice-cardamom.png', '/spice-saffron.png'];
  
  return {
    id: entry.id,
    name: entry.name,
    origin: entry.origin,
    price: 349 + (idx * 150),
    originalPrice: 420 + (idx * 150),
    weight: "100g",
    rating: 4.8 + (idx % 3) * 0.1,
    reviews: 120 + (idx * 45),
    image: fallbackImages[idx % fallbackImages.length],
    badge: entry.heat_level !== 'None' ? entry.heat_level : 'Premium',
    badgeColor: entry.heat_level !== 'None' ? 'terracotta' : 'sage',
    description: `A beautiful spice with ${entry.flavor_profile.join(', ').toLowerCase()} notes.`,
    tags: entry.flavor_profile.slice(0, 2),
  };
});

function StarRating({ rating }) {
  return (
    <div className={styles.stars} aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={12}
          fill={i <= Math.floor(rating) ? 'currentColor' : 'none'}
          className={i <= Math.floor(rating) ? styles.starFilled : styles.star}
        />
      ))}
    </div>
  )
}

export default function FeaturedProducts() {
  const { addToCart } = useCart()

  return (
    <section className={styles.section} id="featured-products" aria-label="Featured Products">
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Curated Selection</span>
          <h2 className={styles.title}>
            Our Finest
            <span className={styles.titleAccent}> Spices</span>
          </h2>
          <p className={styles.subtitle}>
            Each batch is tested for purity, potency, and provenance.
            No fillers. No preservatives. Just pure spice.
          </p>
        </div>

        {/* Products Grid */}
        <div className={styles.grid}>
          {products.map((product, index) => (
            <article
              key={product.id}
              className={styles.card}
              style={{ animationDelay: `${index * 0.15}s` }}
              aria-label={product.name}
            >
              {/* Image */}
              <div className={styles.imageWrapper}>
                <Image
                  src={product.image}
                  alt={`${product.name} from ${product.origin}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Badge */}
                <span className={`${styles.badge} ${styles[`badge--${product.badgeColor}`]}`}>
                  {product.badge}
                </span>

                {/* Quick Add Overlay */}
                <div className={styles.overlay}>
                  <button
                    className={styles.quickAdd}
                    onClick={() => addToCart(product)}
                    aria-label={`Quick add ${product.name} to cart`}
                    id={`quick-add-${product.id}`}
                  >
                    <ShoppingBag size={16} />
                    <span>Add to Cart</span>
                  </button>
                </div>

                {/* Discount */}
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

                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>

                {/* Tags */}
                <div className={styles.tags}>
                  {product.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                {/* Rating */}
                <div className={styles.ratingRow}>
                  <StarRating rating={product.rating} />
                  <span className={styles.ratingValue}>{product.rating}</span>
                  <span className={styles.ratingCount}>({product.reviews})</span>
                </div>

                {/* Price & CTA */}
                <div className={styles.footer}>
                  <div className={styles.pricing}>
                    <span className={styles.price}>₹{product.price}</span>
                    <span className={styles.originalPrice}>₹{product.originalPrice}</span>
                    <span className={styles.weight}>{product.weight}</span>
                  </div>
                  <button
                    className={styles.addBtn}
                    onClick={() => addToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                    id={`add-to-cart-${product.id}`}
                  >
                    <ShoppingBag size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All */}
        <div className={styles.viewAll}>
          <Link href="/shop" className={styles.viewAllBtn} id="view-all-products">
            View All Spices
            <span className={styles.viewAllArrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

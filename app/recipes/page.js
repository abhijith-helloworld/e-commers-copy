import PageHeader from '@/components/layout/PageHeader'
import styles from './recipes.module.css'
import Image from 'next/image'

export const metadata = {
  title: 'Spice Recipes — The Spices Zone',
  description: 'Discover how to use our premium organic spices in your kitchen with our collection of traditional and modern recipes.',
}

export default function RecipesPage() {
  const recipes = [
    {
      title: 'Golden Turmeric Latte',
      time: '10 mins',
      level: 'Easy',
      spices: ['Turmeric', 'Green Cardamom', 'Black Pepper'],
      desc: 'A warm, soothing drink packed with anti-inflammatory benefits and aromatic heartiness.',
      image: '/spice-turmeric.png'
    },
    {
      title: 'Saffron & Honey Roast Chicken',
      time: '1.5 hours',
      level: 'Intermediate',
      spices: ['Saffron', 'Smoked Paprika', 'Sumac'],
      desc: 'A floral, earthy, and slightly tart roast with a vibrant golden glaze that impresses any guest.',
      image: '/spice-saffron.png'
    },
    {
      title: 'Traditional Masala Chai',
      time: '15 mins',
      level: 'Easy',
      spices: ['Green Cardamom', 'Ginger', 'Black Peppercorn', 'Cinnamon'],
      desc: 'The soul of Indian mornings. A robust blend of whole spices that warms you from the inside out.',
      image: '/spice-cardamom.png'
    },
    {
      title: 'Moroccan Spiced Chickpeas',
      time: '45 mins',
      level: 'Intermediate',
      spices: ['Cumin', 'Cinnamon', 'Turmeric'],
      desc: 'An earthy, smoky, and slightly sweet vegetarian dish that showcases the depth of Middle Eastern blends.',
      image: '/spice-spread.png'
    }
  ]

  return (
    <main>
      <PageHeader 
        title="Kitchen inspiration" 
        subtitle="Unleash the full potential of your spice cabinet with our curated recipes, from ancient traditions to modern fusion."
        bgImage="/spice-bg.png"
      />

      <section className={styles.categories}>
        <div className="container">
          <div className={styles.catGrid}>
            <button className={`${styles.catBtn} ${styles.active}`}>All Recipes</button>
            <button className={styles.catBtn}>Breakfast</button>
            <button className={styles.catBtn}>Main Course</button>
            <button className={styles.catBtn}>Desserts</button>
            <button className={styles.catBtn}>Drinks</button>
          </div>
        </div>
      </section>

      <section className={styles.recipeList}>
        <div className="container">
          <div className={styles.recipesGrid}>
            {recipes.map((recipe, i) => (
              <div key={i} className={styles.recipeCard}>
                <div className={styles.imageOverlay}>
                  <Image src={recipe.image} alt={recipe.title} width={400} height={300} className={styles.cardImg} />
                  <div className={styles.meta}>
                    <span>⏲ {recipe.time}</span>
                    <span>⭐ {recipe.level}</span>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.spiceTags}>
                    {recipe.spices.map((s, si) => (
                      <span key={si} className={styles.spiceTag}>{s}</span>
                    ))}
                  </div>
                  <h3 className={styles.recipeTitle}>{recipe.title}</h3>
                  <p className={styles.recipeDesc}>{recipe.desc}</p>
                  <button className={styles.readBtn}>View Full Recipe</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contribute}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Shared Your Spice Secrets?</h2>
            <p className={styles.ctaText}>Join our community of spice enthusiasts. Send us your unique recipes using our spices and get featured!</p>
            <button className={styles.ctaBtn}>Submit Recipe</button>
          </div>
        </div>
      </section>
    </main>
  )
}

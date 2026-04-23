import PageHeader from '@/components/layout/PageHeader'
import styles from './origins.module.css'
import Image from 'next/image'

export const metadata = {
  title: 'Global Origins — The Spices Zone',
  description: 'Explore the global regions where our organic spices are grown, from the tropical forests of Kerala to the mountain slopes of the Mediterranean.',
}

export default function OriginsPage() {
  const regions = [
    { 
      name: 'Kerala, India', 
      title: 'The Spice Garden', 
      description: 'The ancient home of black pepper and cardamom. The humid, tropical climate and rich soil of the Western Ghats produce the world\'s most potent aromatics.',
      featured: ['Black Peppercorn', 'Green Cardamom', 'Ginger'],
      image: '/spice-spread.png' // fallback
    },
    { 
      name: 'Madagascar', 
      title: 'Vanilla Forests', 
      description: 'Known for producing the world\'s finest Bourbon vanilla. Traditional hand-pollination and curing methods are preserved across generations of forest-dwellers.',
      featured: ['Vanilla Beans', 'Clove Buds', 'Allspice'],
      image: '/spice-saffron.png' // fallback
    },
    { 
      name: 'Mediterranean', 
      title: 'Herbal Slopes', 
      description: 'The dry, sun-drenched landscapes yield robust herbs with concentrated essential oils. Our oregano and thyme come from wild-harvested mountain slopes.',
      featured: ['Oregano', 'Wild Thyme', 'Rosemary'],
      image: '/spice-turmeric.png' // fallback
    },
    { 
      name: 'Sri Lanka', 
      title: 'Ceylon Cinnamon', 
      description: 'The native land of "True" Cinnamon. Our quills are hand-rolled by master artisans, resulting in a delicate, sweet, and complex profile.',
      featured: ['Ceylon Cinnamon', 'Nutmeg', 'Mace'],
      image: '/spice-cardamom.png' // fallback
    },
  ]

  return (
    <main>
      <PageHeader 
        title="World of Spices" 
        subtitle="Journey through the diverse regions that nurture our organic crops, each with its own unique soil, climate, and heritage."
        bgImage="/spice-bg.png"
      />

      <section className={styles.intro}>
        <div className="container">
          <div className={styles.introContent}>
            <h2 className={styles.introTitle}>Direct Farm Sourcing</h2>
            <p className={styles.introText}>
              Every spice in our collection is tracked to its specific origin. We believe that the geographical source (Terroir) 
              is essential to the flavor profile and potency of the spice.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.regionsSection}>
        <div className="container">
          <div className={styles.regionsGrid}>
            {regions.map((region, i) => (
              <div key={i} className={styles.regionCard}>
                <div className={styles.regionHeader}>
                  <span className={styles.regionName}>{region.name}</span>
                  <h3 className={styles.regionTitle}>{region.title}</h3>
                </div>
                <p className={styles.regionDesc}>{region.description}</p>
                <div className={styles.featuredSpices}>
                  <span className={styles.featuredLabel}>Best from here:</span>
                  <div className={styles.spiceTags}>
                    {region.featured.map((s, si) => (
                      <span key={si} className={styles.spiceTag}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className="container">
          <div className={styles.mapBox}>
            <div className={styles.mapContent}>
              <h2 className={styles.mapTitle}>Our Global Network</h2>
              <p className={styles.mapText}>Over 50 family-owned farms across 12 countries, preserving traditional methods of harvesting and curing.</p>
            </div>
            <div className={styles.mapGraphic}>
              {/* Replace with actual map or graphic */}
              <div className={styles.worldMap}>
                <Image src="/spice-bg.png" alt="World Map" fill className={styles.mapImg} />
                <div className={`${styles.point} ${styles.p1}`}>✦</div>
                <div className={`${styles.point} ${styles.p2}`}>✦</div>
                <div className={`${styles.point} ${styles.p3}`}>✦</div>
                <div className={`${styles.point} ${styles.p4}`}>✦</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

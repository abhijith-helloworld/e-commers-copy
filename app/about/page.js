import PageHeader from '@/components/layout/PageHeader'
import styles from './about.module.css'
import Image from 'next/image'

export const metadata = {
  title: 'Our Story — The Spices Zone',
  description: 'Learn about The Spices Zone, our origins, and our commitment to sourcing the finest organic spices direct from farms.',
}

export default function AboutPage() {
  const values = [
    { title: 'Source Purity', description: 'We only source spices from regions known for their climate, soil, and traditional harvesting methods.' },
    { title: 'Organic First', description: '100% of our catalogue is certified organic, ensuring no pesticides or chemical fertilizers touch your food.' },
    { title: 'Farm-Direct', description: 'By cutting out middlemen, we ensure farmers get a fair price while you get the freshest crops available.' },
  ]

  const timeline = [
    { year: '2020', event: 'Started under a small porch with just 5 essential Indian spices from local farms.' },
    { year: '2021', event: 'Partnered with over 50 family-owned spice farms across Southeast Asia and the Middle East.' },
    { year: '2022', event: 'Introduced our signature bespoke blending facility to create artisan masala mixes.' },
    { year: '2023', event: 'Launched The Spices Zone globally, shipping our handpicked selections to spice lovers worldwide.' },
  ]

  return (
    <main>
      <PageHeader 
        title="From the Soil of Traditions" 
        subtitle="Our journey of bringing the finest, purest, and most aromatic spices from farm to your kitchen."
        bgImage="/spice-bg.png"
      />

      <section className={styles.mission}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.textContent}>
              <span className={styles.sectionLabel}>The Mission</span>
              <h2 className={styles.sectionTitle}>Reviving Ancient Spiceways</h2>
              <p className={styles.text}>
                We believe spices are more than just seasonings; they are the soul of a dish and a portal to different cultures. 
                Our mission is to re-establish the connection between the grower and the cook, ensuring every pinch of spice in 
                your meal has a story and a pure origin.
              </p>
              <div className={styles.stats}>
                <div className={styles.statBlock}>
                  <div className={styles.statNum}>200+</div>
                  <div className={styles.statLabel}>Spice Varieties</div>
                </div>
                <div className={styles.statBlock}>
                  <div className={styles.statNum}>50+</div>
                  <div className={styles.statLabel}>Partner Farms</div>
                </div>
                <div className={styles.statBlock}>
                  <div className={styles.statNum}>100%</div>
                  <div className={styles.statLabel}>Pure Organic</div>
                </div>
              </div>
            </div>
            <div className={styles.imageContent}>
              <div className={styles.imageBox}>
                <div className={styles.imageFrame}></div>
                <Image src="/spice-spread.png" alt="Spice variety" width={500} height={600} priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={i} className={styles.valueCard}>
                <div className={styles.valueIcon}>✦</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueText}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.timelineSection}>
        <div className="container">
          <h2 className={styles.centerTitle}>Our Evolution</h2>
          <div className={styles.timeline}>
            {timeline.map((t, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.year}>{t.year}</div>
                <div className={styles.event}>{t.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

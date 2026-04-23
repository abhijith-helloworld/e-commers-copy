import styles from './Features.module.css'

const features = [
  {
    icon: '🌱',
    title: 'Certified Organic',
    desc: 'Every spice carries an organic certification. We work exclusively with farms that avoid synthetic pesticides and chemicals.',
    color: 'sage',
  },
  {
    icon: '🤝',
    title: 'Direct Trade',
    desc: 'We source directly from 50+ family farms across 12 countries, ensuring fair pay and cutting out unnecessary middlemen.',
    color: 'turmeric',
  },
  {
    icon: '🔬',
    title: 'Lab Tested',
    desc: 'Each batch undergoes rigorous third-party testing for purity, heavy metals, microbials, and curcumin/volatile oil content.',
    color: 'terracotta',
  },
  {
    icon: '📦',
    title: 'Freshness Sealed',
    desc: 'Our airtight, UV-blocking packaging locks in potency for up to 24 months. Every jar is filled to order when possible.',
    color: 'bark',
  },
]

export default function Features() {
  return (
    <section className={styles.section} aria-label="Why choose us" id="why-us">
      {/* Decorative background */}
      <div className={styles.bg}>
        <div className={styles.bgPattern} />
      </div>

      <div className="container">
        <div className={styles.inner}>
          {/* Left: Text */}
          <div className={styles.textSide}>
            <span className={styles.eyebrow}>The Spices Zone Difference</span>
            <h2 className={styles.title}>
              Why Chefs & Home Cooks
              <em className={styles.titleItalic}> Trust Us</em>
            </h2>
            <p className={styles.body}>
              We are obsessed with spice quality. From the soil to your kitchen, 
              every step is thoughtfully managed so you get the most flavourful, 
              nutritious, and honest spices money can buy.
            </p>

            <div className={styles.promise}>
              <div className={styles.promiseItem}>
                <span className={styles.promiseMark}>✓</span>
                <span>30-day satisfaction guarantee</span>
              </div>
              <div className={styles.promiseItem}>
                <span className={styles.promiseMark}>✓</span>
                <span>Free returns, no questions asked</span>
              </div>
              <div className={styles.promiseItem}>
                <span className={styles.promiseMark}>✓</span>
                <span>Detailed provenance on every product</span>
              </div>
            </div>
          </div>

          {/* Right: Features Grid */}
          <div className={styles.featureGrid}>
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`${styles.card} ${styles[`card--${f.color}`]}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={styles.cardIcon}>{f.icon}</div>
                <h3 className={styles.cardTitle}>{f.title}</h3>
                <p className={styles.cardDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

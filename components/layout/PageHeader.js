import styles from './PageHeader.module.css'

export default function PageHeader({ title, subtitle, bgImage = '/spice-bg.png' }) {
  return (
    <div className={styles.header} style={{ backgroundImage: `linear-gradient(to bottom, rgba(51, 51, 51, 0.4), rgba(51, 51, 51, 0.8)), url(${bgImage})` }}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.tagline}>The Spices Zone</div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.decorative}>✦</div>
        </div>
      </div>
    </div>
  )
}

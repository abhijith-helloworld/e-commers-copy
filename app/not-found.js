import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <div className={styles.decorativeLine}></div>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.description}>
          We couldn&apos;t find the spice you&apos;re looking for. It might have been moved,
          or perhaps it&apos;s a rare blend we haven&apos;t discovered yet.
        </p>
        <Link href="/" className={styles.button}>
          Return Home
        </Link>
      </div>
    </div>
  )
}

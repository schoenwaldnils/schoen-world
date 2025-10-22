import styles from './BackgroundBlobs.module.css'

export const BackgroundBlobs = () => {
  return (
    <div className={styles.container} aria-hidden="true">
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />
    </div>
  )
}

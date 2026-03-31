import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.bgCircle} ${styles.circle1}`}></div>
      <div className={`${styles.bgCircle} ${styles.circle2}`}></div>
      
      <div className={styles.heroContent}>
        <span className={styles.badge}>Technical Precision & Innovation</span>
        <h1 className={styles.title}>
          Advanced <span className={styles.highlight}>Chemical Solutions</span> for Modern Industry.
        </h1>
        <p className={styles.subtitle}>
          Leading the textile and printing sectors with high-performance auxiliaries, 
          pigment pastes, and sustainable chemical innovations engineered for results.
        </p>
        
        <div className={styles.ctaGroup}>
          <Link href="/products" className="btn-primary">
            Explore Catalog
          </Link>
          <Link href="/contact" className={styles.secondaryBtn}>
            Request Technical Quote
          </Link>
        </div>
      </div>
    </section>
  );
}

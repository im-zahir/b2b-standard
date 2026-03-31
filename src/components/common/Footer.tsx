import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandInfo}>
          <div className={styles.brandName}>
            <span>CHEMICO</span> INNOVATIONS
          </div>
          <p className={styles.description}>
            Technically sharp solutions for the textile, printing, and industrial sectors 
            in Bangladesh. Committed to technical precision and environmental excellence.
          </p>
        </div>
        
        <div className={styles.linkGroup}>
          <h4>Solutions</h4>
          <ul>
            <li><Link href="/products?category=textile">Textile Auxiliaries</Link></li>
            <li><Link href="/products?category=pigment">Pigment Pastes</Link></li>
            <li><Link href="/products?category=rubber">Rubber Pastes</Link></li>
            <li><Link href="/products?category=specialty">Specialty Chemicals</Link></li>
          </ul>
        </div>

        <div className={styles.linkGroup}>
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/sustainability">Sustainability</Link></li>
            <li><Link href="/contact">Contact Support</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className={styles.linkGroup}>
          <h4>Reach Us</h4>
          <ul>
            <li>Mitford, Dhaka, Bangladesh</li>
            <li>+880 1700-000000</li>
            <li>info@chemico-innovations.com</li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Chemico Innovations Bangladesh Ltd. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import styles from "./About.module.css";

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <section className={styles.aboutHero}>
        <div className="container">
          <span className={styles.subtitle}>Engineering Tomorrow's Chemicals</span>
          <h1 className={styles.title}>About Chemico Innovations</h1>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.textContent}>
              <h2>Technical Sharpness & Industrial Mission</h2>
              <p>
                Founded on the principles of technical precision and environmental
                stewardship, Chemico Innovations Bangladesh Ltd. has emerged as a 
                leading force in the textile and printing chemical sector.
              </p>
              <p>
                Our mission is to provide high-performance chemical auxiliaries that 
                enhance production efficiency while meeting the most stringent 
                international safety and quality standards.
              </p>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <h3>12+</h3>
                  <p>Years Excellence</p>
                </div>
                <div className={styles.statItem}>
                  <h3>200+</h3>
                  <p>Chemical Formulas</p>
                </div>
                <div className={styles.statItem}>
                  <h3>98%</h3>
                  <p>Client Retention</p>
                </div>
              </div>
            </div>
            <div className={styles.imageContent}>
              <img src="/about-lab.png" alt="Industrial Laboratory" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2rem' }}>State-of-the-Art Laboratory</h2>
            <p className={styles.description}>
              Our facility in Mitford, Dhaka, houses a modern R&D center where technicians 
              and chemists work tirelessly to innovate and refine our product catalog. 
              From high-opacity rubber pastes to water-saving textile auxiliaries, 
              everything we produce is born in the lab.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

import styles from "./TrustSection.module.css";

const trustItems = [
  {
    icon: "🔬",
    title: "Technical Sharpness",
    desc: "Engineered for technical precision. Each formula is tested for consistency and performance in industrial environments."
  },
  {
    icon: "🌱",
    title: "Sustainable Innovation",
    desc: "Committed to eco-friendly chemical solutions that reduce environmental impact without compromising industrial quality."
  },
  {
    icon: "🤝",
    title: "Reliable Partnership",
    desc: "More than a supplier, we are a technical partner providing ongoing laboratory support and custom formulations."
  }
];

export default function TrustSection() {
  return (
    <section className={styles.trust}>
      <div className="container">
        <div className={styles.grid}>
          {trustItems.map((item, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.iconWrapper}>{item.icon}</div>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

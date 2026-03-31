import Link from "next/link";
import styles from "./CategoryGrid.module.css";

const categories = [
  {
    id: "textile",
    title: "Textile Auxiliaries",
    count: "24 Products",
    image: "/textile-category.png",
  },
  {
    id: "pigment",
    title: "Pigment & Screen Printing",
    count: "18 Products",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rubber",
    title: "Rubber & Specialty Pastes",
    count: "12 Products",
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=800&auto=format&fit=crop",
  }
];

export default function CategoryGrid() {
  return (
    <section className={styles.categories}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>Solutions by Sector</span>
          <h2 className={styles.title}>Industrial Chemical Expertise</h2>
          <p className="description">
            High-performance formulas designed for precision, durability, 
            and technical excellence in the textile and printing industry.
          </p>
        </div>

        <div className={styles.grid}>
          {categories.map((cat) => (
            <Link href={`/products?category=${cat.id}`} key={cat.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={cat.image} alt={cat.title} />
              </div>
              <div className={styles.overlay}>
                <span className={styles.productCount}>{cat.count}</span>
                <h3 className={styles.categoryTitle}>{cat.title}</h3>
                <div className={styles.exploreBtn}>
                  Explore Technical Data &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

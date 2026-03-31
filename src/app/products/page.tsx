"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { mockProducts } from "@/lib/mockData";
import { getProducts, Product } from "@/lib/api";
import styles from "./Products.module.css";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  
  const [filter, setFilter] = useState<string | null>(initialCategory);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const data = await getProducts(filter);
      
      // If Supabase has data, use it; otherwise fallback to mock for demo
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        // Map mock products to the new format for fallback
        const fallback = filter 
          ? mockProducts.filter(p => p.category === filter)
          : mockProducts;
          
        setProducts(fallback.map(p => ({
          ...p,
          image_url: p.image // Adapting legacy field
        } as any)));
      }
      setLoading(false);
    }
    loadProducts();
  }, [filter]);

  const categories = [
    { id: null, label: "All Products" },
    { id: "textile", label: "Textile Auxiliaries" },
    { id: "pigment", label: "Pigment Pastes" },
    { id: "rubber", label: "Rubber Pastes" },
    { id: "specialty", label: "Specialty" }
  ];

  return (
    <>
      <section className={styles.productsHero}>
        <div className="container">
          <h1 className={styles.title}>Industrial Catalog</h1>
          <p className={styles.subtitle}>
            Explore our range of high-performance chemical solutions engineered 
            for the textile and screen printing industries.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.filterBar}>
            {categories.map(cat => (
              <button
                key={cat.id || "all"}
                onClick={() => setFilter(cat.id)}
                className={`${styles.filterBtn} ${filter === cat.id ? styles.activeFilter : ""}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              Gathering technical data...
            </div>
          ) : (
            <div className={styles.grid}>
              {products.map(product => (
                <Link href={`/products/${product.id}`} key={product.id} className={styles.productCard}>
                  <div className={styles.imageWrapper}>
                    <img src={product.image_url} alt={product.name} />
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.categoryTag}>{product.category}</span>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.description}>{product.description}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.viewBtn}>View Specifications &rarr;</span>
                      <span className={styles.idTag}>ID: {product.id.toString().substring(0, 8).toUpperCase()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function ProductsPage() {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<div>Loading Products...</div>}>
        <ProductsContent />
      </Suspense>
      <Footer />
    </main>
  );
}

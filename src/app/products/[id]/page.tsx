"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import WhatsAppFloat from "@/components/common/WhatsAppFloat";
import { mockProducts } from "@/lib/mockData";
import { getProductById, Product } from "@/lib/api";
import styles from "./ProductDetail.module.css";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      const data = await getProductById(id);
      
      if (data) {
        setProduct(data);
      } else {
        // Fallback for demo
        const fallback = mockProducts.find(p => p.id === id);
        if (fallback) {
          setProduct({
            ...fallback,
            image_url: fallback.image
          } as any);
        }
      }
      setLoading(false);
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <main>
        <Navbar />
        <section className={styles.detailHero}>
          <div className="container" style={{ textAlign: 'center', padding: '10rem' }}>
            <h1 style={{ color: 'var(--primary)' }}>Accessing Technical Specifications...</h1>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main>
        <Navbar />
        <section className={styles.detailHero}>
          <div className="container">
            <h1>Product Not Found</h1>
            <Link href="/products" className="btn-primary">Back to Catalog</Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <section className={styles.detailHero}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> / <Link href="/products">Products</Link> / {product.name}
          </div>
          
          <div className={styles.mainGrid}>
            <div className={styles.productImage}>
              <img src={product.image_url} alt={product.name} />
            </div>
            
            <div className={styles.productInfo}>
              <span className={styles.categoryLabel}>{product.category}</span>
              <h1 className={styles.productTitle}>{product.name}</h1>
              <p className={styles.desc}>{product.description}</p>
              
              <div className={styles.specsTable}>
                {product.specs && Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className={styles.specRow}>
                    <div className={styles.specLabel}>{key}</div>
                    <div className={styles.specValue}>{value}</div>
                  </div>
                ))}
              </div>
              
              <div className={styles.actionArea}>
                <a 
                  href={`https://wa.me/8801700000000?text=I'm%20interested%20in%20${product.name}%20(ID:%20${product.id})`}
                  className="btn-primary"
                  target="_blank"
                >
                  Instant Technical Inquiry
                </a>
                <button 
                  className={styles.datasheetBtn}
                  onClick={() => product.datasheet_url && window.open(product.datasheet_url)}
                >
                  📄 Download TDS/MSDS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

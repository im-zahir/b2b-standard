"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { getProducts, Product } from "@/lib/api";
import { mockProducts } from "@/lib/mockData";
import styles from "./Datasheets.module.css";

export default function DatasheetsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getProducts();
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        // Fallback
        setProducts(mockProducts.map(p => ({
          ...p,
          image_url: p.image
        } as any)));
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <Navbar />
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Datasheets Hub</h1>
          <p className={styles.description}>
            Access and download the latest Technical Data Sheets (TDS) and 
            Safety Data Sheets (SDS) for our industrial chemical catalog.
          </p>
        </div>
      </section>

      <section className={styles.tableContainer}>
        <div className="container">
          <div className={styles.tableHeader}>
            <h2>Technical Documentation</h2>
            <input 
              type="text" 
              className={styles.search} 
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
              Preparing document library...
            </div>
          ) : (
            <table className={styles.documentTable}>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Technical Data Sheet</th>
                  <th>Safety Data Sheet</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td><strong>{product.name}</strong></td>
                    <td><span className={styles.categoryTag}>{product.category}</span></td>
                    <td>
                      <a href={product.datasheet_url} className={styles.downloadLink}>
                        📄 Download TDS
                      </a>
                    </td>
                    <td>
                      <a href={product.datasheet_url} className={styles.downloadLink}>
                        📑 Download SDS
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/api";
import styles from "../Admin.module.css";

export default function AdminDatasheetsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getProducts();
      if (data) setProducts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className={styles.datasheets}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Technical Document Library</h2>
        <p style={{ color: 'var(--text-muted)' }}>Manage TDS/MSDS assets across your industrial catalog.</p>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Document URLs are currently managed within each individual product record. 
          Use the Product Portfolio Manager to update Technical Data Sheets.
        </p>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left' }}>
              <th style={{ padding: '1.5rem' }}>Associated Product</th>
              <th style={{ padding: '1.5rem' }}>Document Status</th>
              <th style={{ padding: '1.5rem', textAlign: 'right' }}>Management</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} style={{ padding: '3rem', textAlign: 'center', color: 'var(--primary)' }}>
                  Analyzing technical document links...
                </td>
              </tr>
            ) : products.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1.5rem' }}>
                  <strong>{product.name}</strong>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{product.category}</div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  {product.datasheet_url ? (
                    <span style={{ color: '#22c55e', fontWeight: 600 }}>Active Link (Cloudinary)</span>
                  ) : (
                    <span style={{ color: '#ef4444', fontWeight: 600 }}>Missing Datasheet</span>
                  )}
                </td>
                <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                  <a 
                    href={`/admin/products/${product.id}/edit`} 
                    style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600 }}
                  >
                    Edit Record
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

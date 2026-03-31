"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts, Product } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import styles from "../Admin.module.css";

export default function AdminProductsPage() {
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

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to PERMANENTLY delete this industrial product?")) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (!error) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert("System error: Unable to terminate product record.");
      }
    }
  };

  return (
    <div className={styles.products}>
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem' 
        }}
      >
        <h2>Technical Product Inventory</h2>
        <Link href="/admin/products/new" className="btn-primary">
          + Add Industrial Product
        </Link>
      </div>

      <div 
        className="glass-card" 
        style={{ padding: '0', overflow: 'hidden' }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left' }}>
              <th style={{ padding: '1.5rem' }}>Name</th>
              <th style={{ padding: '1.5rem' }}>Category</th>
              <th style={{ padding: '1.5rem' }}>ID</th>
              <th style={{ padding: '1.5rem' }}>Status</th>
              <th style={{ padding: '1.5rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: 'var(--primary)' }}>
                  Gathering current records...
                </td>
              </tr>
            ) : products.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1.5rem' }}>
                  <strong>{product.name}</strong>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{product.category}</span>
                </td>
                <td style={{ padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {product.id.toString().substring(0, 8).toUpperCase()}
                </td>
                <td style={{ padding: '1.5rem' }}>
                    <span style={{ color: '#22c55e' }}>Active</span>
                </td>
                <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <Link 
                      href={`/admin/products/${product.id}/edit`} 
                      style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600 }}
                    >
                      Edit Specifications
                    </Link>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

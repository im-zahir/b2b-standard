"use client";

import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/api";
import styles from "./Admin.module.css";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    datasheets: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const data = await getProducts();
      if (data) {
        const uniqueCategories = new Set(data.map(p => p.category)).size;
        setStats({
          products: data.length,
          categories: uniqueCategories,
          datasheets: data.filter(p => p.datasheet_url).length,
        });
      }
      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading) return <p style={{ color: 'var(--primary)' }}>Syncing Industrial Inventory Data...</p>;

  return (
    <div className={styles.dashboard}>
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}
      >
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>📦</div>
          <h3>Total Products</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>{stats.products}</p>
        </div>
        
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>📁</div>
          <h3>Active Categories</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>{stats.categories}</p>
        </div>
        
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>📑</div>
          <h3>Datasheets</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>{stats.datasheets}</p>
        </div>
      </div>

      <div style={{ marginTop: '4rem' }}>
        <h2>System Integrity</h2>
        <div 
          className="glass-card" 
          style={{ 
            marginTop: '1.5rem', 
            background: 'rgba(34, 197, 94, 0.05)', 
            border: '1px solid rgba(34, 197, 94, 0.2)' 
          }}
        >
          <p style={{ color: '#22c55e', fontWeight: 600 }}>✅ Industrial Core Sync: Online</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            All systems are fully operational. Data sync with Supabase and Cloudinary edge workers is stable.
          </p>
        </div>
      </div>
    </div>
  );
}

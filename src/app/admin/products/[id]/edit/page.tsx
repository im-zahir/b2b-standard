"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getProductById } from "@/lib/api";
import styles from "../../../Admin.module.css";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "textile",
    description: "",
    image_url: "",
    datasheet_url: "",
    specs_json: "{}"
  });

  useEffect(() => {
    async function loadProduct() {
      const product = await getProductById(id);
      if (product) {
        setFormData({
          name: product.name,
          category: product.category,
          description: product.description,
          image_url: product.image_url,
          datasheet_url: product.datasheet_url || "",
          specs_json: JSON.stringify(product.specs, null, 2)
        });
      }
      setLoading(false);
    }
    loadProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const specs = JSON.parse(formData.specs_json);
      const { error } = await supabase
        .from("products")
        .update({
          name: formData.name,
          category: formData.category,
          description: formData.description,
          image_url: formData.image_url,
          datasheet_url: formData.datasheet_url,
          specs
        })
        .eq("id", id);

      if (error) throw error;
      router.push("/admin/products");
    } catch (err) {
      alert("Validation Error: Invalid Technical Specifications JSON format or Industrial Database error.");
      setSaving(false);
    }
  };

  if (loading) return <p style={{ color: 'var(--primary)', padding: '5rem' }}>Accessing Secure Product Data...</p>;

  return (
    <div className={styles.editProduct}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem' }}>Edit Industrial Product</h2>
        <p style={{ color: 'var(--text-muted)' }}>Updating technical chemical assets for ID: {id.toUpperCase()}</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="formGroup">
            <label>Product Name</label>
            <input 
              type="text" 
              className={styles.inputField}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required 
            />
          </div>
          <div className="formGroup">
            <label>Category Sector</label>
            <select 
              className={styles.selectField}
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="textile">Textile Auxiliaries</option>
              <option value="pigment">Pigment Pastes</option>
              <option value="rubber">Rubber Pastes</option>
              <option value="specialty">Specialty Chemicals</option>
            </select>
          </div>
        </div>

        <div className="formGroup" style={{ marginTop: '1.5rem' }}>
          <label>Industrial Description</label>
          <textarea 
            className={styles.textareaField}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          ></textarea>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
          <div className="formGroup">
            <label>Technical Image URL</label>
            <input 
              type="url" 
              className={styles.inputField}
              value={formData.image_url}
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              required 
            />
          </div>
          <div className="formGroup">
            <label>Datasheet PDF URL</label>
            <input 
              type="url" 
              className={styles.inputField}
              value={formData.datasheet_url}
              onChange={(e) => setFormData({...formData, datasheet_url: e.target.value})}
            />
          </div>
        </div>

        <div className="formGroup" style={{ marginTop: '1.5rem' }}>
          <label>Technical Specifications (JSON)</label>
          <textarea 
            className={styles.textareaField}
            style={{ fontFamily: 'monospace', height: '200px', fontSize: '0.9rem' }}
            value={formData.specs_json}
            onChange={(e) => setFormData({...formData, specs_json: e.target.value})}
            required
          ></textarea>
        </div>

        <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'flex-end' }}>
          <button 
            type="button" 
            onClick={() => router.push("/admin/products")} 
            className={styles.cancelBtn}
          >
            Abort Changes
          </button>
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={saving}
          >
            {saving ? "Updating Portfolio..." : "Commit Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

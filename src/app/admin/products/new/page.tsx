"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "../../Admin.module.css";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "textile",
    description: "",
    image_url: "",
    datasheet_url: "",
    specs_json: '{"Appearance": "Liquid", "pH": "6.5"}'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const specs = JSON.parse(formData.specs_json);
      const { error } = await supabase.from("products").insert({
        name: formData.name,
        category: formData.category,
        description: formData.description,
        image_url: formData.image_url,
        datasheet_url: formData.datasheet_url,
        specs
      });

      if (error) throw error;
      router.push("/admin/products");
    } catch (err) {
      alert("Validation Error: Invalid Technical Specifications JSON format or Industrial Database error.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.newProduct}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem' }}>Configure Industrial Product</h2>
        <p style={{ color: 'var(--text-muted)' }}>Entry form for technical chemical data assets.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="formGroup">
            <label>Product Name</label>
            <input 
              type="text" 
              className={styles.inputField} 
              placeholder="e.g. HydroSoft Ultra"
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
            placeholder="Technical details and value proposition..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          ></textarea>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
          <div className="formGroup">
            <label>Technical Image URL (Cloudinary)</label>
            <input 
              type="url" 
              className={styles.inputField}
              placeholder="https://cloudinary.com/..."
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
              placeholder="https://storage.googleapis.com/..."
              value={formData.datasheet_url}
              onChange={(e) => setFormData({...formData, datasheet_url: e.target.value})}
            />
          </div>
        </div>

        <div className="formGroup" style={{ marginTop: '1.5rem' }}>
          <label>Technical Specifications (JSON)</label>
          <textarea 
            className={styles.textareaField}
            style={{ fontFamily: 'monospace', height: '150px', fontSize: '0.9rem' }}
            value={formData.specs_json}
            onChange={(e) => setFormData({...formData, specs_json: e.target.value})}
            required
          ></textarea>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Ensure the technical data is in a valid standard JSON object format.
          </p>
        </div>

        <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'flex-end' }}>
          <button 
            type="button" 
            onClick={() => router.push("/admin/products")} 
            className={styles.cancelBtn}
          >
            Cancel Session
          </button>
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? "Registering Formula..." : "Finalize Record"}
          </button>
        </div>
      </form>
    </div>
  );
}

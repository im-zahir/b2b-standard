"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../Admin.module.css";

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    company_name: "Chemico Innovations Bangladesh Ltd.",
    office_address: "Mitford, Dhaka-1100, Bangladesh",
    support_phone: "+880 1700-000000",
    support_email: "info@chemico-innovations.com",
    whatsapp_number: "8801700000000",
    maintenance_mode: false
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase
        .from("system_settings")
        .select("*")
        .eq("key", "maintenance_mode")
        .single();
      
      if (data) {
        setFormData(prev => ({ ...prev, maintenance_mode: data.value }));
      }
      setLoading(false);
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const { error } = await supabase
      .from("system_settings")
      .upsert({ key: "maintenance_mode", value: formData.maintenance_mode });

    if (!error) {
      alert("Industrial System Settings Updated Successfully.");
    } else {
      alert("Error updating infrastructure: " + error.message);
    }
    setSaving(false);
  };

  if (loading) return <p style={{ color: 'var(--primary)', padding: '5rem' }}>Accessing System Infrastructure...</p>;

  return (
    <div className={styles.settings}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Industrial System Settings</h2>
        <p style={{ color: 'var(--text-muted)' }}>Manage global company metadata and system environment.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="formGroup">
            <label>Registered Company Name</label>
            <input 
              type="text" 
              className={styles.inputField} 
              value={formData.company_name}
              onChange={(e) => setFormData({...formData, company_name: e.target.value})}
            />
          </div>
          <div className="formGroup">
            <label>Support Email Address</label>
            <input 
              type="email" 
              className={styles.inputField} 
              value={formData.support_email}
              onChange={(e) => setFormData({...formData, support_email: e.target.value})}
            />
          </div>
        </div>

        <div className="formGroup" style={{ marginTop: '1.5rem' }}>
          <label>Industrial Headquarters Address</label>
          <textarea 
            className={styles.textareaField}
            value={formData.office_address}
            onChange={(e) => setFormData({...formData, office_address: e.target.value})}
          ></textarea>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
          <div className="formGroup">
            <label>Technical Support Phone</label>
            <input 
              type="text" 
              className={styles.inputField} 
              value={formData.support_phone}
              onChange={(e) => setFormData({...formData, support_phone: e.target.value})}
            />
          </div>
          <div className="formGroup">
            <label>WhatsApp Redirect Number</label>
            <input 
              type="text" 
              className={styles.inputField} 
              value={formData.whatsapp_number}
              onChange={(e) => setFormData({...formData, whatsapp_number: e.target.value})}
            />
          </div>
        </div>

        <div style={{ marginTop: '2.5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
          <h3 style={{ color: formData.maintenance_mode ? '#ef4444' : 'inherit' }}>System Environment</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
            <input 
              type="checkbox" 
              checked={formData.maintenance_mode}
              onChange={(e) => setFormData({...formData, maintenance_mode: e.target.checked})}
              style={{ width: '24px', height: '24px', cursor: 'pointer' }}
            />
            <label style={{ margin: 0, fontWeight: 700 }}>
              {formData.maintenance_mode ? 'CRITICAL: MAINTENANCE MODE ACTIVE' : 'Activate Industrial Maintenance Mode'}
            </label>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            When active, the public website will be restricted to a specialized technical notice.
          </p>
        </div>

        <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'flex-end' }}>
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={saving}
          >
            {saving ? "Updating System..." : "Update Infrastructure Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}

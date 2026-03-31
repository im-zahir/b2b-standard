"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../Admin.module.css";

interface Inquiry {
  id: string;
  user_name: string;
  user_email: string;
  user_company: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInquiries() {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (data) setInquiries(data);
      setLoading(false);
    }
    loadInquiries();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("inquiries")
      .update({ status: newStatus })
      .eq("id", id);
      
    if (!error) {
      setInquiries(inquiries.map(inq => 
        inq.id === id ? { ...inq, status: newStatus } : inq
      ));
    }
  };

  return (
    <div className={styles.inquiries}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Technical Lead Management</h2>
        <p style={{ color: 'var(--text-muted)' }}>Incoming technical inquiries and support requests.</p>
      </div>

      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left' }}>
              <th style={{ padding: '1.5rem' }}>Company & Contact</th>
              <th style={{ padding: '1.5rem' }}>Message Detail</th>
              <th style={{ padding: '1.5rem' }}>Timestamp</th>
              <th style={{ padding: '1.5rem' }}>Status</th>
              <th style={{ padding: '1.5rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: 'var(--primary)' }}>
                  Retrieving incoming transmissions...
                </td>
              </tr>
            ) : inquiries.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No industrial inquiries recorded yet.
                </td>
              </tr>
            ) : inquiries.map(inq => (
              <tr key={inq.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{inq.user_company}</div>
                  <div style={{ fontSize: '0.85rem' }}>{inq.user_name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{inq.user_email}</div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <p style={{ fontSize: '0.9rem', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {inq.message}
                  </p>
                </td>
                <td style={{ padding: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {new Date(inq.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <span 
                    className={styles.statusTag}
                    style={{ 
                      background: inq.status === 'new' ? 'rgba(0, 210, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      color: inq.status === 'new' ? 'var(--primary)' : 'var(--text-muted)'
                    }}
                  >
                    {inq.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => updateStatus(inq.id, 'replied')}
                      className={styles.actionBtn}
                      disabled={inq.status === 'replied'}
                    >
                      ✓ Responded
                    </button>
                    <button 
                      onClick={() => updateStatus(inq.id, 'archived')}
                      className={styles.actionBtn}
                    >
                      Archive
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

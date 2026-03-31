"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./Login.module.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid industrial credentials. Access Denied.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <main className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logo} style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--primary)' }}>CHEMICO</span> ADMIN
          </div>
          <h1 className={styles.title}>Secure Access</h1>
          <p className={styles.subtitle}>Enter credentials to manage the industrial catalog.</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label>Work Email</label>
            <input 
              type="email" 
              className={styles.input} 
              placeholder="admin@chemico-innovations.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label>Secure Password</label>
            <input 
              type="password" 
              className={styles.input} 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button 
            type="submit" 
            className={`btn-primary ${styles.submitBtn}`}
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Authorize Access"}
          </button>
        </form>
      </div>
    </main>
  );
}

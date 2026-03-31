"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "./Admin.module.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
      } else {
        setAuthenticated(!!session);
      }
      setLoading(false);
    }
    checkAuth();
  }, [router, pathname]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
        <h2 style={{ color: 'var(--primary)' }}>Verifying Industrial Authorization...</h2>
      </div>
    );
  }

  if (!authenticated) {
    return null; // Prevents flash of content
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "📊" },
    { label: "Products", href: "/admin/products", icon: "📦" },
    { label: "Inquiries", href: "/admin/inquiries", icon: "✉️" },
    { label: "Datasheets", href: "/admin/datasheets", icon: "📑" },
    { label: "Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span style={{ color: 'var(--primary)' }}>CHEMICO</span> ADMIN
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`${styles.navItem} ${pathname === item.href ? styles.activeNavItem : ""}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      
      <main className={styles.main}>
        <header className={styles.topbar}>
          <h1 style={{ fontSize: '1.5rem' }}>Admin Dashboard</h1>
          <div className={styles.userProfile}>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Terminate Session
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}

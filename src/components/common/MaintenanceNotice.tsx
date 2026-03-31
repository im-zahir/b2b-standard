"use client";

import styles from "./Maintenance.module.css";

export default function MaintenanceNotice() {
  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.icon}>🛠️</div>
        <h1>Industrial System Upgrade</h1>
        <p>
          Chemico Innovations is currently performing essential industrial infrastructure 
          maintenance. Our product catalog and inquiry systems will return online shortly.
        </p>
        <div className={styles.contact}>
          <p>For urgent technical support:</p>
          <a href="mailto:info@chemico-innovations.com">info@chemico-innovations.com</a>
        </div>
      </div>
    </div>
  );
}

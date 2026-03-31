"use client";

import styles from "./WhatsAppFloat.module.css";

export default function WhatsAppFloat() {
  const whatsappNumber = "8801700000000";
  const message = "Hello Chemico Innovations! I'm interested in your industrial chemical solutions. Can you provide some technical data?";
  
  return (
    <a 
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappFloat}
      aria-label="Contact us on WhatsApp"
    >
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" className={styles.whatsappIcon} />
      <span className={styles.floatingLabel}>Technical Inquiry</span>
    </a>
  );
}

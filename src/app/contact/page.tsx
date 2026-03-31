"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import styles from "./Contact.module.css";

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_company: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS credentials missing.");
      alert("System configuration error. Please contact support via WhatsApp.");
      setLoading(false);
      return;
    }

    emailjs.sendForm(serviceId, templateId, form.current!, publicKey)
      .then((result) => {
          console.log("Email sent successfully:", result.text);
          setSuccess(true);
          setLoading(false);
          setFormData({ user_name: "", user_email: "", user_company: "", message: "" });
      }, (error) => {
          console.error("EmailJS Error:", error.text);
          setError(true);
          setLoading(false);
      });
  };

  return (
    <main>
      <Navbar />
      <section className={styles.contactHero}>
        <div className="container">
          <h1 className={styles.title}>Technical Support & Inquiries</h1>
          <p className={styles.subtitle}>
            Have a technical question or need a custom chemical formulation? 
            Our laboratory experts are ready to assist you.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.infoSection}>
              <h2>Contact Information</h2>
              <div className={styles.contactItem}>
                <div className={styles.icon}>📍</div>
                <div>
                  <div className={styles.itemLabel}>Headquarters</div>
                  <div className={styles.itemValue}>Mitford, Dhaka-1100, Bangladesh</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.icon}>📞</div>
                <div>
                  <div className={styles.itemLabel}>Technical Support</div>
                  <div className={styles.itemValue}>+880 1700-000000</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.icon}>✉️</div>
                <div>
                  <div className={styles.itemLabel}>Email Support</div>
                  <div className={styles.itemValue}>info@chemico-innovations.com</div>
                </div>
              </div>
            </div>

            <div className={styles.formCard}>
              {success ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                  <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Inquiry Sent Successfully</h3>
                  <p style={{ color: 'var(--text-muted)' }}>
                    Thank you for reaching out. Our technical team will review your 
                    requirements and respond within 24-48 hours.
                  </p>
                  <button 
                    onClick={() => setSuccess(false)} 
                    className="btn-primary" 
                    style={{ marginTop: '2rem' }}
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form ref={form} onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input 
                      name="user_name"
                      type="text" 
                      className={styles.input} 
                      placeholder="John Doe"
                      value={formData.user_name}
                      onChange={(e) => setFormData({...formData, user_name: e.target.value})}
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Work Email</label>
                    <input 
                      name="user_email"
                      type="email" 
                      className={styles.input} 
                      placeholder="john@company.com"
                      value={formData.user_email}
                      onChange={(e) => setFormData({...formData, user_email: e.target.value})}
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Company Name</label>
                    <input 
                      name="user_company"
                      type="text" 
                      className={styles.input} 
                      placeholder="Textile Ltd."
                      value={formData.user_company}
                      onChange={(e) => setFormData({...formData, user_company: e.target.value})}
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Tell us about your requirements</label>
                    <textarea 
                      name="message"
                      className={styles.textarea} 
                      placeholder="Describe the product or technical challenge you need help with..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                    ></textarea>
                  </div>
                  
                  {error && (
                    <p style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem' }}>
                      Failed to send message. Please try again or contact via WhatsApp.
                    </p>
                  )}

                  <button 
                    type="submit" 
                    className={`btn-primary ${styles.submitBtn}`}
                    disabled={loading}
                  >
                    {loading ? "Transmitting..." : "Send Technical Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

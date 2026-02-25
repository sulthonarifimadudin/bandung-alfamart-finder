import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Search, Navigation, Zap, Map, ArrowRight } from "lucide-react";
import heroBandung from "@/assets/hero-bandung.jpg";

const Homepage = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-inner">
          <div className="navbar-logo">
            <div className="navbar-logo-icon">
              <MapPin size={18} />
            </div>
            <span className="navbar-logo-text">AlfaMap</span>
          </div>
          <div className="navbar-links">
            <a href="#features" className="navbar-link">Fitur</a>
            <a href="#about" className="navbar-link">Tentang</a>
            <button className="navbar-cta" onClick={() => navigate("/map")}>
              Buka Peta
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-bg">
          <img src={heroBandung} alt="Kota Bandung" />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Pemetaan Realtime Alfamart Bandung
            </div>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Temukan{" "}
            <span className="hero-title-accent">Alfamart</span>
            <br />
            Terdekat di Bandung
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Jelajahi peta interaktif dengan lokasi lengkap seluruh gerai Alfamart
            di Kota Bandung. Cari, temukan, dan navigasi dengan mudah.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <button className="btn-hero btn-hero-primary" onClick={() => navigate("/map")}>
              <Map size={18} />
              Jelajahi Peta
              <ArrowRight size={16} />
            </button>
            <a href="#features" className="btn-hero btn-hero-secondary">
              Pelajari Fitur
            </a>
          </motion.div>

          <motion.div
            className="stats-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="stat-item">
              <div className="stat-number">8+</div>
              <div className="stat-label">Lokasi Terdaftar</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Gratis Digunakan</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Akses Kapanpun</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section" id="features">
        <div className="features-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="section-label">✨ Fitur Unggulan</div>
            <h2 className="section-title">Semua yang Kamu Butuhkan</h2>
            <p className="section-subtitle">
              Dirancang untuk memudahkan pencarian lokasi Alfamart di seluruh penjuru Kota Bandung.
            </p>
          </motion.div>

          <div className="features-grid">
            {[
              {
                icon: <Map size={24} />,
                title: "Peta Interaktif",
                desc: "Peta OpenStreetMap yang bisa di-zoom, geser, dan eksplorasi bebas dengan tampilan yang detail.",
              },
              {
                icon: <Search size={24} />,
                title: "Pencarian Cepat",
                desc: "Cari lokasi Alfamart berdasarkan nama atau alamat secara instan tanpa delay.",
              },
              {
                icon: <Navigation size={24} />,
                title: "Navigasi Otomatis",
                desc: "Klik lokasi dan peta langsung terbang ke titik yang dipilih dengan animasi smooth.",
              },
              {
                icon: <MapPin size={24} />,
                title: "Info Lengkap",
                desc: "Setiap marker menampilkan nama, alamat, dan koordinat GPS yang akurat.",
              },
              {
                icon: <Zap size={24} />,
                title: "Super Cepat",
                desc: "Dibangun dengan teknologi modern React JS untuk performa yang optimal.",
              },
              {
                icon: <MapPin size={24} />,
                title: "Data Terpercaya",
                desc: "Lokasi Alfamart terverifikasi dengan koordinat yang akurat di Kota Bandung.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="about">
        <p className="footer-text">
          © 2026 <a href="/">AlfaMap</a> — Pemetaan Lokasi Alfamart di Kota Bandung.
          <br />
          Dibuat dengan ❤️ menggunakan React JS & OpenStreetMap.
        </p>
      </footer>
    </div>
  );
};

export default Homepage;

import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/vendor/Header';
import { getVendorProfile } from "../../api/vendor.api";
import './VendorHome.css';

const VendorHome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const vendorData = async () => {
      try {
        setLoading(true);

        // ✅ Read updated data first
        const storedVendor = localStorage.getItem("vendorProfile");

        if (storedVendor) {
          setVendor(JSON.parse(storedVendor));
        } else {
          const res = await getVendorProfile();
          setVendor(res.data);

          // ✅ FIX: do NOT use stale vendor state
          console.log("Vendor logo:", res.data?.logo);

          localStorage.setItem("vendorProfile", JSON.stringify(res.data));
        }

      } catch (err) {
        console.log(err.message);
        setError("Failed to load vendor data");
      } finally {
        setLoading(false);
      }
    };

    vendorData();
  }, []);

  // ---------------- SAFE UI STATES ----------------
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // ✅ FIX: proper redirect logic
  if (!vendor) {
    navigate("/vendor/login");
    return null;
  }

  return (
    <div className="vendor-home">
      <Header currentPath={location.pathname} />

      <main className="vendor-home-main">

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">

              {/* ✅ TITLE + FORMULA ICON */}
              <div className="vendor-title-row">
                <h1 className="vendor-title">{vendor.businessName}</h1>

                <div className="vendor-title-icon">
                  {/* ✅ FIX: null-safe logo rendering */}
                  {vendor?.logo && (
                    <img
                      src={vendor.logo}
                      alt="Vendor Logo"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: "50%"
                      }}
                    />
                  )}
                </div>
              </div>

              <p className="vendor-subtitle">{vendor.category}</p>

              <p className="vendor-description">
                {vendor.description}
              </p>

              <div className="vendor-meta">
                <span className="meta-item">📍 {vendor.location}</span>
                <span className="meta-item">
                  📅 Since {vendor?.createdAt?.slice(0, 4)}
                </span>
              </div>

              <div className="skills-badges">
                <span className="skill-badge">Race Parts</span>
                <span className="skill-badge">Custom Fab</span>
                <span className="skill-badge">Chassis Work</span>
                <span className="skill-badge">Performance</span>
              </div>

              <div className="action-buttons">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/vendor/profile/edit')}
                >
                  ✏️ Edit Vendor Profile
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/vendor/product')}
                >
                  ➕ Add New Product / Service
                </button>
              </div>
            </div>

            {/* Hero icon (kept for glow balance) */}
            <div className="hero-icon">
              <div className="icon-circle">
                <div className="icon-inner">🏎️</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <h3 className="stat-label">Products Listed</h3>
            <p className="stat-value">{productCount}</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💬</div>
            <h3 className="stat-label">Active Quotes</h3>
            <p className="stat-value">0</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <h3 className="stat-label">Response Time</h3>
            <p className="stat-value">0h</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👁️</div>
            <h3 className="stat-label">Profile Views</h3>
            <p className="stat-value">0</p>
          </div>
        </section>

        {/* Products and Quotes Section */}
        <div className="main-content-grid">

          {/* Products */}
          <section className="products-section">
            <h2 className="section-title">Your Products & Services</h2>

            <div className="products-list">
              {/* Placeholder for future product cards */}
            </div>

            <button className="btn btn-primary btn-full-width">
              Manage All Listings
            </button>
          </section>

          {/* Quotes */}
          <section className="quotes-section">
            <h2 className="section-title">Recent Quotes & Inquiries</h2>

            <div className="quotes-list">
              {/* Placeholder for future quotes */}
            </div>

            <button className="btn btn-primary btn-full-width">
              View All Quotes & Inquiries
            </button>
          </section>
        </div>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="quick-actions-grid">
            <button className="action-btn" onClick={() => navigate('/vendor/profile')}>
              <span className="action-icon">📝</span>
              <span className="action-label">Update Business Info</span>
            </button>

            <button className="action-btn" onClick={() => navigate('/vendor/profile/edit')}>
              <span className="action-icon">📄</span>
              <span className="action-label">Upload Verification Documents</span>
            </button>

            <button className="action-btn" onClick={() => navigate('/vendor/profile/edit')}>
              <span className="action-icon">🖼️</span>
              <span className="action-label">Add New Banner / Logo</span>
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="vendor-footer">
          <div className="footer-content">
            <div className="footer-status">
              <span className="status-badge online">● ONLINE</span>
              <span className="status-text">0 Teams Connected</span>
            </div>
            <div className="footer-links">
              <a href="#support" className="footer-link">Support / Help</a>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default VendorHome;

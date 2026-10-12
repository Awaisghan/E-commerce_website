import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowUpRight, Heart, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">
                <Leaf size={20} />
              </span>
              <span className="footer-logo-text">VERDANT</span>
            </Link>
            <p className="footer-bio">
              Mindfully curated e-commerce elevating everyday lifestyles with sustainable beauty,
              modern fashion, ergonomic living essentials, and refined accessories.
            </p>

            <div className="footer-contact-info">
              <div className="contact-item">
                <MapPin size={16} className="contact-icon" />
                <span>Pabbi Peshawar, KPK, Pakistan</span>
              </div>
              <div className="contact-item">
                <Mail size={16} className="contact-icon" />
                <span>awaisghani442@gmail.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} className="contact-icon" />
                <span>+92 3159352386</span>
              </div>
            </div>

            <div className="footer-social-links">


              <a href="https://www.facebook.com/CodxPy/" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.704 0-1.028.145-1.222.378-.291.35-.333.916-.333 1.87v1.732h3.992l-.535 3.667h-3.457v7.98z" />
                </svg>
              </a>
            </div>
          </div>


          {/* Shop Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Shop Collections</h4>
            <ul className="footer-links-list">
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/category/electronics">Electronics & Audio</Link></li>
              <li><Link to="/category/fashion">Sustainable Fashion</Link></li>
              <li><Link to="/category/mens-clothing">Men's Wardrobe</Link></li>
              <li><Link to="/category/womens-clothing">Women's Collection</Link></li>
              <li><Link to="/category/beauty-personal-care">Clean Beauty & Skin</Link></li>
              <li><Link to="/category/home-living">Home & Living</Link></li>
              <li><Link to="/category/accessories">Accessories & Watches</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="footer-col">
            <h4 className="footer-col-title">Customer Care</h4>
            <ul className="footer-links-list">
              <li><Link to="/contact">Track Your Order</Link></li>
              <li><Link to="/contact">Shipping Information</Link></li>
              <li><Link to="/contact">Returns & Exchanges</Link></li>
              <li><Link to="/contact">Help Center & FAQ</Link></li>
              <li><Link to="/contact">Size & Fit Guide</Link></li>
              <li><Link to="/contact">Carbon-Neutral Pledge</Link></li>
              <li><Link to="/contact">Contact Concierge</Link></li>
            </ul>
          </div>

          {/* About & Philosophy */}
          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links-list">
              <li><Link to="/about">Our Story & Heritage</Link></li>
              <li><Link to="/about">Conscious Materials</Link></li>
              <li><Link to="/about">Ethical Supply Chain</Link></li>
              <li><Link to="/about">Careers at VERDANT</Link></li>
              <li><Link to="/about">Press & Editorial</Link></li>
              <li><Link to="/about">Retail Partners</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © 2025 VERDANT Inc. All rights reserved. Designed by Muhammad Awais Ghani.
          </p>



          <div className="footer-legal-links">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
            <span>•</span>
            <a href="#cookies">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

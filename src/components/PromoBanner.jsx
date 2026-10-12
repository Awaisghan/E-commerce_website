import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag, Clock, Sparkles } from 'lucide-react';
import './PromoBanner.css';

export default function PromoBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('VERDANT25');
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section className="promo-banner-section">
      <div className="container">
        <div className="promo-card">
          <div className="promo-content">
            <div className="promo-badge">
              <Sparkles size={14} />
              <span>LIMITED SEASONAL DROP</span>
            </div>

            <h2 className="promo-title">
              Up to <span className="highlight-text">40% Off</span> Select Sustainable Collections
            </h2>

            <p className="promo-desc">
              Refresh your daily rituals with conscious beauty, ergonomic living essentials, 
              and timeless wardrobe basics. Claim an additional 15% discount with exclusive code.
            </p>

            <div className="promo-coupon-box">
              <div className="coupon-code-wrap">
                <Tag size={16} className="coupon-icon" />
                <span className="coupon-code">VERDANT25</span>
              </div>
              <button 
                type="button" 
                className="coupon-copy-btn" 
                onClick={handleCopyCode}
              >
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            <div className="promo-actions">
              <Link to="/shop" className="btn btn-primary">
                Shop The Sale <ArrowRight size={17} />
              </Link>
              <Link to="/category/beauty-personal-care" className="btn btn-outline">
                Explore Beauty
              </Link>
            </div>
          </div>

          <div className="promo-visual">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop"
              alt="Special Seasonal Promotion"
              className="promo-img"
            />
            <div className="promo-tag-pill">
              <Clock size={15} /> Ends Sunday Midnight
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

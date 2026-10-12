import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AnnouncementBar.css';

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar" role="region" aria-label="Announcement">
      <div className="container announcement-content">
        <div className="announcement-badge">
          <Sparkles size={13} className="sparkle-icon" />
          <span>SPRING EDIT</span>
        </div>
        <p className="announcement-text">
          Complimentary Carbon-Neutral Shipping on all orders above $150 • Code: <strong>VERDANT15</strong>
        </p>
        <Link to="/shop" className="announcement-link">
          Explore Collection <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

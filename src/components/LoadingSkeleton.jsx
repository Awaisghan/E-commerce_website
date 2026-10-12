import React from 'react';
import './LoadingSkeleton.css';

export default function LoadingSkeleton({ count = 8, type = 'card' }) {
  if (type === 'details') {
    return (
      <div className="skeleton-details-container">
        <div className="skeleton skeleton-details-gallery"></div>
        <div className="skeleton-details-info">
          <div className="skeleton skeleton-line-sm" style={{ width: '30%' }}></div>
          <div className="skeleton skeleton-line-lg" style={{ width: '80%', height: '36px' }}></div>
          <div className="skeleton skeleton-line-md" style={{ width: '40%' }}></div>
          <div className="skeleton skeleton-block" style={{ height: '100px', margin: '20px 0' }}></div>
          <div className="skeleton skeleton-line-lg" style={{ width: '60%', height: '48px' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="skeleton-card">
          <div className="skeleton skeleton-media"></div>
          <div className="skeleton-body">
            <div className="skeleton-row">
              <div className="skeleton skeleton-tag"></div>
              <div className="skeleton skeleton-star"></div>
            </div>
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-title-short"></div>
            <div className="skeleton skeleton-price"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

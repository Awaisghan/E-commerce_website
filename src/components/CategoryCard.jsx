import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './CategoryCard.css';

export default function CategoryCard({ category }) {
  if (!category) return null;

  return (
    <Link to={`/category/${category.slug}`} className="category-card">
      <div className="category-card-image-wrap">
        <img
          src={category.image}
          alt={category.name}
          className="category-card-img"
          loading="lazy"
        />
        <div className="category-card-overlay"></div>
      </div>

      <div className="category-card-content">
        <div className="category-card-text">
          <span className="category-card-count">{category.count || 'Collection'}</span>
          <h3 className="category-card-name">{category.name}</h3>
        </div>
        <div className="category-card-arrow">
          <ArrowUpRight size={18} />
        </div>
      </div>
    </Link>
  );
}

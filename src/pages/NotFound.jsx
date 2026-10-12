import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, Home, ShoppingBag } from 'lucide-react';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-page-root">
      <div className="container notfound-content">
        <div className="notfound-icon-wrap">
          <Leaf size={48} className="leaf-404" />
        </div>
        <span className="notfound-code">404 ERROR</span>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-desc">
          The page or product you are looking for may have been moved, renamed, or is temporarily unavailable in our current seasonal edit.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} /> Return Home
          </Link>
          <Link to="/shop" className="btn btn-secondary btn-lg">
            <ShoppingBag size={18} /> Explore Catalog
          </Link>
        </div>

        <div className="notfound-links-strip">
          <span>Popular Collections:</span>
          <Link to="/category/electronics">Electronics</Link>
          <Link to="/category/fashion">Fashion</Link>
          <Link to="/category/beauty-personal-care">Clean Beauty</Link>
          <Link to="/category/home-living">Home & Living</Link>
        </div>
      </div>
    </div>
  );
}

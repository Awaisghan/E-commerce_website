import React from 'react';
import ProductCard from './ProductCard';
import LoadingSkeleton from './LoadingSkeleton';
import { PackageOpen } from 'lucide-react';
import './ProductGrid.css';

export default function ProductGrid({ 
  products = [], 
  loading = false, 
  skeletonCount = 8,
  emptyMessage = "No products found matching your criteria." 
}) {
  if (loading) {
    return <LoadingSkeleton count={skeletonCount} />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty">
        <div className="empty-icon-wrap">
          <PackageOpen size={48} className="empty-icon" />
        </div>
        <h3 className="empty-title">No Products Found</h3>
        <p className="empty-desc">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

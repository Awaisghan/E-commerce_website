import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Star,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { getProductsByCategory, CATEGORY_MAPPINGS, FALLBACK_IMAGE } from '../services/productApi';
import { formatPrice } from '../utils/formatPrice';
import './Category.css';

export default function Category() {
  const { category: categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & sorting
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);

  const categoryMeta = CATEGORY_MAPPINGS[categorySlug] || {
    name: categorySlug ? categorySlug.replace(/-/g, ' ').toUpperCase() : 'Category',
    description: `Curated assortment of premier items in ${categorySlug ? categorySlug.replace(/-/g, ' ') : ''}.`,
    bannerImg: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400&auto=format&fit=crop',
    subCategories: []
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductsByCategory(categorySlug, { limit: 50, skip: 0 })
      .then(res => {
        setProducts(res.products || []);
      })
      .catch(err => {
        console.error('Failed to load category products', err);
        setError('Failed to fetch category products');
      })
      .finally(() => setLoading(false));
  }, [categorySlug]);

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $25', value: '0-25', min: 0, max: 25 },
    { label: '$25 to $50', value: '25-50', min: 25, max: 50 },
    { label: '$50 to $100', value: '50-100', min: 50, max: 100 },
    { label: 'Over $100', value: '100-plus', min: 100, max: Infinity }
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Price range filter
    if (selectedPriceRange !== 'all') {
      const range = priceRanges.find(r => r.value === selectedPriceRange);
      if (range) {
        result = result.filter(p => p.price >= range.min && p.price <= range.max);
      }
    }

    // Rating filter
    if (minRating > 0) {
      result = result.filter(p => (p.rating || 0) >= minRating);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, selectedPriceRange, minRating, sortBy]);

  const visibleProducts = filteredProducts.slice(0, displayCount);

  const handleResetFilters = () => {
    setSelectedPriceRange('all');
    setMinRating(0);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedPriceRange !== 'all' || minRating > 0 || sortBy !== 'featured';

  return (
    <div className="category-page-root">
      {/* Category Hero Banner */}
      <div 
        className="category-hero-banner"
        style={{ backgroundImage: `url(${categoryMeta.bannerImg || FALLBACK_IMAGE})` }}
      >
        <div className="category-banner-overlay"></div>
        <div className="container category-banner-content">
          <div className="category-breadcrumbs">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/shop">Shop</Link>
            <ChevronRight size={14} />
            <span>{categoryMeta.name}</span>
          </div>

          <div className="category-badge-pill">
            <Sparkles size={14} /> CURATED COLLECTION
          </div>

          <h1 className="category-page-title">{categoryMeta.name}</h1>
          <p className="category-page-description">{categoryMeta.description}</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="container category-main-container">
        {/* Mobile Filter & Sort Controls */}
        <div className="category-mobile-controls">
          <button 
            type="button" 
            className="mobile-filter-trigger"
            onClick={() => setMobileFilterOpen(true)}
          >
            <SlidersHorizontal size={18} />
            <span>Filters {hasActiveFilters && '(Active)'}</span>
          </button>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-dropdown"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>
        </div>

        <div className="category-layout">
          {/* Sidebar */}
          <aside className={`category-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
              <div className="sidebar-title">
                <Filter size={18} />
                <h3>Filters</h3>
              </div>
              <div className="sidebar-actions">
                {hasActiveFilters && (
                  <button type="button" className="btn-reset-filters" onClick={handleResetFilters}>
                    <RotateCcw size={14} /> Reset
                  </button>
                )}
                {mobileFilterOpen && (
                  <button 
                    type="button" 
                    className="sidebar-close-btn"
                    onClick={() => setMobileFilterOpen(false)}
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <h4 className="filter-group-title">Price Range</h4>
              <div className="filter-radio-group">
                {priceRanges.map((range) => (
                  <label 
                    key={range.value} 
                    className={`filter-radio-label ${selectedPriceRange === range.value ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="catPriceRange"
                      value={range.value}
                      checked={selectedPriceRange === range.value}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="filter-group">
              <h4 className="filter-group-title">Customer Rating</h4>
              <div className="rating-options">
                {[0, 4.5, 4.0, 3.0].map((starVal) => (
                  <button
                    key={starVal}
                    type="button"
                    className={`rating-filter-chip ${minRating === starVal ? 'active' : ''}`}
                    onClick={() => setMinRating(starVal)}
                  >
                    {starVal === 0 ? (
                      'All Ratings'
                    ) : (
                      <>
                        <Star size={14} fill="#F59E0B" color="#F59E0B" />
                        <span>{starVal}+ Stars</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {mobileFilterOpen && (
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '20px' }}
                onClick={() => setMobileFilterOpen(false)}
              >
                Apply Filters ({filteredProducts.length})
              </button>
            )}
          </aside>

          {/* Products Content */}
          <main className="category-content">
            <div className="category-toolbar-desktop">
              <div className="results-count">
                Showing <strong>{visibleProducts.length}</strong> of <strong>{filteredProducts.length}</strong> items in <em>{categoryMeta.name}</em>
              </div>

              <div className="sort-wrapper">
                <span className="sort-label">Sort by:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-dropdown"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="title">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>

            <ProductGrid 
              products={visibleProducts} 
              loading={loading} 
              skeletonCount={8}
              emptyMessage={`No products found in ${categoryMeta.name} matching your active filters.`}
            />

            {!loading && visibleProducts.length < filteredProducts.length && (
              <div className="load-more-container">
                <button 
                  type="button" 
                  className="btn btn-secondary btn-lg"
                  onClick={() => setDisplayCount(prev => prev + 12)}
                >
                  Load More Products ({filteredProducts.length - visibleProducts.length} Remaining)
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

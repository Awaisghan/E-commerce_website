import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  ChevronDown, 
  Star,
  Check
} from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { getProducts, getCategories } from '../services/productApi';
import { formatPrice } from '../utils/formatPrice';
import './Shop.css';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);

  // Available categories list
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    // Fetch a broad catalog (100 items from DummyJSON to allow rich filtering)
    setLoading(true);
    getProducts({ limit: 100, skip: 0 })
      .then(res => {
        setAllProducts(res.products || []);
      })
      .catch(err => {
        console.error('Failed to load shop products', err);
        setError('Failed to load product catalog');
      })
      .finally(() => setLoading(false));

    getCategories()
      .then(cats => {
        if (Array.isArray(cats)) {
          setCategoriesList(cats);
        }
      })
      .catch(err => console.error('Failed to load categories', err));
  }, []);

  // Update category if URL param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Price range options
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $25', value: '0-25', min: 0, max: 25 },
    { label: '$25 to $50', value: '25-50', min: 25, max: 50 },
    { label: '$50 to $100', value: '50-100', min: 50, max: 100 },
    { label: 'Over $100', value: '100-plus', min: 100, max: Infinity }
  ];

  // Filtered & Sorted products computation
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

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
  }, [allProducts, selectedCategory, selectedPriceRange, minRating, sortBy]);

  const visibleProducts = filteredProducts.slice(0, displayCount);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setMinRating(0);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedPriceRange !== 'all' || minRating > 0 || sortBy !== 'featured';

  return (
    <div className="shop-page-root">
      {/* Category banner */}
      <div className="shop-banner">
        <div className="container">
          <div className="shop-banner-content">
            <span className="section-tag">CATALOG ARCHIVE</span>
            <h1 className="shop-banner-title">Conscious Lifestyle Essentials</h1>
            <p className="shop-banner-desc">
              Explore our full collection of mindfully designed apparel, organic skincare, 
              innovative technology, and home accoutrements.
            </p>
          </div>
        </div>
      </div>

      <div className="container shop-main-container">
        {/* Mobile Filter & Sort Bar */}
        <div className="shop-mobile-controls">
          <button 
            type="button" 
            className="mobile-filter-trigger"
            onClick={() => setMobileFilterOpen(true)}
          >
            <SlidersHorizontal size={18} />
            <span>Filters {hasActiveFilters && '(Active)'}</span>
          </button>

          <div className="shop-sort-mobile-select">
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
        </div>

        <div className="shop-layout">
          {/* Sidebar Filters (Desktop) */}
          <aside className={`shop-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
              <div className="sidebar-title">
                <Filter size={18} />
                <h3>Filters</h3>
              </div>
              <div className="sidebar-actions">
                {hasActiveFilters && (
                  <button type="button" className="btn-reset-filters" onClick={handleResetFilters}>
                    <RotateCcw size={14} /> Clear All
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

            {/* Category Filter */}
            <div className="filter-group">
              <h4 className="filter-group-title">Categories</h4>
              <div className="filter-options-list">
                <button
                  type="button"
                  className={`filter-option-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  <span>All Categories</span>
                  <span className="count-pill">{allProducts.length}</span>
                </button>

                {categoriesList.slice(0, 10).map((cat, idx) => {
                  const slug = typeof cat === 'object' ? cat.slug : cat;
                  const name = typeof cat === 'object' ? cat.name : cat;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`filter-option-btn ${selectedCategory === slug ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(slug)}
                    >
                      <span>{name}</span>
                      {selectedCategory === slug && <Check size={14} className="check-icon" />}
                    </button>
                  );
                })}
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
                      name="priceRange"
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
              <h4 className="filter-group-title">Minimum Rating</h4>
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

          {/* Catalog Content Area */}
          <main className="shop-content">
            {/* Desktop Top Toolbar */}
            <div className="shop-toolbar-desktop">
              <div className="results-count">
                Showing <strong>{visibleProducts.length}</strong> of <strong>{filteredProducts.length}</strong> products
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

            {/* Product Grid */}
            <ProductGrid 
              products={visibleProducts} 
              loading={loading} 
              skeletonCount={12}
              emptyMessage="No products match your selected filters. Try broadening your criteria or reset filters."
            />

            {/* Load More Button */}
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

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Star, X, RotateCcw, ArrowRight } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { searchProducts } from '../services/productApi';
import './SearchResults.css';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    if (!query) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    searchProducts(query, { limit: 50 })
      .then(res => {
        setProducts(res.products || []);
      })
      .catch(err => {
        console.error('Search error', err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $25', value: '0-25', min: 0, max: 25 },
    { label: '$25 to $50', value: '25-50', min: 25, max: 50 },
    { label: '$50 to $100', value: '50-100', min: 50, max: 100 },
    { label: 'Over $100', value: '100-plus', min: 100, max: Infinity }
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedPriceRange !== 'all') {
      const range = priceRanges.find(r => r.value === selectedPriceRange);
      if (range) {
        result = result.filter(p => p.price >= range.min && p.price <= range.max);
      }
    }

    if (minRating > 0) {
      result = result.filter(p => (p.rating || 0) >= minRating);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [products, selectedPriceRange, minRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedPriceRange('all');
    setMinRating(0);
    setSortBy('relevance');
  };

  return (
    <div className="search-page-root">
      <div className="search-header-banner">
        <div className="container">
          <span className="section-tag">SEARCH RESULTS</span>
          <h1 className="search-query-title">
            {query ? `Results for "${query}"` : 'Search Our Catalog'}
          </h1>
          <p className="search-result-count">
            Found <strong>{filteredProducts.length}</strong> matching products
          </p>
        </div>
      </div>

      <div className="container search-body-container">
        {/* Quick Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-filter-pills">
            <span className="filter-label">Filter:</span>
            {priceRanges.map((range) => (
              <button
                key={range.value}
                type="button"
                className={`search-filter-pill ${selectedPriceRange === range.value ? 'active' : ''}`}
                onClick={() => setSelectedPriceRange(range.value)}
              >
                {range.label}
              </button>
            ))}

            {(selectedPriceRange !== 'all' || minRating > 0) && (
              <button type="button" className="clear-filter-btn" onClick={handleResetFilters}>
                <RotateCcw size={14} /> Clear
              </button>
            )}
          </div>

          <div className="search-sort-wrap">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-dropdown"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <ProductGrid 
          products={filteredProducts} 
          loading={loading}
          skeletonCount={8}
          emptyMessage={`No items found matching "${query}". Try searching for categories like beauty, laptops, shoes, or shirts.`}
        />

        {!loading && filteredProducts.length === 0 && (
          <div className="search-suggested-links">
            <p>Or explore our popular collections:</p>
            <div className="suggested-buttons">
              <Link to="/category/electronics" className="btn btn-secondary btn-sm">Electronics</Link>
              <Link to="/category/fashion" className="btn btn-secondary btn-sm">Fashion</Link>
              <Link to="/category/beauty-personal-care" className="btn btn-secondary btn-sm">Beauty</Link>
              <Link to="/shop" className="btn btn-primary btn-sm">View All Products</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

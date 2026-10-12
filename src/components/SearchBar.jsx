import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { searchProducts } from '../services/productApi';
import { formatPrice } from '../utils/formatPrice';
import './SearchBar.css';

export default function SearchBar({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSuggestions([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Live search debounce
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchProducts(query, { limit: 5 });
        setSuggestions(res.products || []);
      } catch (err) {
        console.error('Search suggestion error', err);
      } finally {
        setLoading(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectProduct = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  const popularSearches = ['Sneakers', 'Perfume', 'Laptop', 'Moisturizer', 'Watch', 'Sofa'];

  if (!isOpen) return null;

  return (
    <div className="search-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <form onSubmit={handleSubmit} className="search-input-wrapper">
            <Search size={22} className="search-input-icon" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands, essentials..."
              className="search-field"
              aria-label="Search"
            />
            {loading && <Loader2 size={18} className="search-spinner" />}
            {query && !loading && (
              <button 
                type="button" 
                className="search-clear-btn" 
                onClick={() => setQuery('')}
                aria-label="Clear search input"
              >
                <X size={18} />
              </button>
            )}
          </form>

          <button 
            type="button" 
            className="search-close-btn" 
            onClick={onClose}
            aria-label="Close search dialog"
          >
            <X size={24} />
          </button>
        </div>

        {/* Quick searches */}
        {!query && (
          <div className="search-popular-section">
            <div className="popular-title">
              <Sparkles size={14} /> Popular Searches
            </div>
            <div className="popular-tags">
              {popularSearches.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="popular-tag-btn"
                  onClick={() => {
                    setQuery(tag);
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions list */}
        {suggestions.length > 0 && (
          <div className="search-results-list">
            <div className="search-results-label">Instant Matches</div>
            {suggestions.map((item) => (
              <div 
                key={item.id} 
                className="search-result-item"
                onClick={() => handleSelectProduct(item.id)}
              >
                <img 
                  src={item.thumbnail || item.images?.[0]} 
                  alt={item.title} 
                  className="search-item-img"
                  loading="lazy"
                />
                <div className="search-item-details">
                  <h4 className="search-item-title">{item.title}</h4>
                  <p className="search-item-meta">{item.category} • {formatPrice(item.price)}</p>
                </div>
                <ArrowRight size={16} className="search-item-arrow" />
              </div>
            ))}

            <button 
              type="button" 
              className="view-all-results-btn"
              onClick={handleSubmit}
            >
              See all results for "{query}" <ArrowRight size={15} />
            </button>
          </div>
        )}

        {query.length >= 2 && !loading && suggestions.length === 0 && (
          <div className="search-no-results">
            <p>No products found for "<strong>{query}</strong>"</p>
            <span className="search-hint">Try searching for generic keywords like "phone", "beauty", or "shirt"</span>
          </div>
        )}
      </div>
    </div>
  );
}

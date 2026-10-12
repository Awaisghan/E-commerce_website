import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, calculateDiscountPrice } from '../utils/formatPrice';
import { FALLBACK_IMAGE } from '../services/productApi';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const discount = product.discountPercentage ? Math.round(product.discountPercentage) : 0;
  const originalPrice = discount > 0 ? calculateDiscountPrice(product.price, discount) : product.price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const imgSrc = imageError 
    ? FALLBACK_IMAGE 
    : (product.thumbnail || product.images?.[0] || FALLBACK_IMAGE);

  return (
    <div className="product-card card-base">
      <div className="product-card-media">
        <Link to={`/product/${product.id}`} className="product-img-link">
          <img
            src={imgSrc}
            alt={product.title}
            className="product-card-img"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        </Link>

        {/* Badges */}
        <div className="product-badges">
          {discount > 0 && (
            <span className="badge badge-sale">-{discount}% OFF</span>
          )}
          {product.rating >= 4.5 && (
            <span className="badge badge-trending">TOP RATED</span>
          )}
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="card-floating-actions">
          <button
            type="button"
            className={`card-action-btn ${inWishlist ? 'active-wishlist' : ''}`}
            onClick={handleToggleWishlist}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            title="Wishlist"
          >
            <Heart size={18} fill={inWishlist ? "#E06D6D" : "none"} color={inWishlist ? "#E06D6D" : "currentColor"} />
          </button>
          
          <Link
            to={`/product/${product.id}`}
            className="card-action-btn"
            aria-label="View product details"
            title="Quick View"
          >
            <Eye size={18} />
          </Link>
        </div>

        {/* Quick Add Button on Hover / Bottom of Media */}
        <div className="card-quick-add">
          <button
            type="button"
            className={`quick-add-btn ${isAdded ? 'added' : ''}`}
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
          >
            {isAdded ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={16} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-category-tag">{product.category}</span>
          <div className="product-rating">
            <Star size={14} className="star-icon" fill="#F59E0B" color="#F59E0B" />
            <span className="rating-val">{product.rating ? product.rating.toFixed(1) : '4.5'}</span>
            <span className="rating-count">({product.reviews?.length || (product.id % 20) + 5})</span>
          </div>
        </div>

        <h3 className="product-card-title">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>

        <div className="product-pricing">
          <span className="current-price">{formatPrice(product.price)}</span>
          {discount > 0 && (
            <span className="original-price">{formatPrice(originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

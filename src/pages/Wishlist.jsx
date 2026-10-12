import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './Wishlist.css';

export default function Wishlist() {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    wishlist.forEach(item => {
      addToCart(item, 1);
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page-root">
        <div className="container">
          <div className="wishlist-empty card-base">
            <div className="empty-heart-wrap">
              <Heart size={54} />
            </div>
            <h2>Your Wishlist is Empty</h2>
            <p>Save items you love by tapping the heart icon on any product.</p>
            <Link to="/shop" className="btn btn-primary btn-lg">
              Discover Curations <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page-root">
      <div className="container">
        <div className="wishlist-header">
          <div>
            <span className="section-tag">SAVED ITEMS</span>
            <h1 className="wishlist-title">Your Curated Wishlist ({wishlist.length})</h1>
          </div>

          <div className="wishlist-actions-bar">
            <button 
              type="button" 
              className="btn btn-primary btn-sm"
              onClick={handleAddAllToCart}
            >
              <ShoppingBag size={15} /> Move All to Cart
            </button>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={clearWishlist}
            >
              <Trash2 size={15} /> Clear List
            </button>
          </div>
        </div>

        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

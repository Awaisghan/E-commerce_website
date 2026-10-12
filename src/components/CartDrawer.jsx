import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  CheckCircle2,
  ShieldCheck 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import './CartDrawer.css';

export default function CartDrawer({ onCheckoutClick }) {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    isFreeShipping,
    freeShippingProgress,
    totalItems
  } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="cart-drawer-overlay" onClick={closeCart} role="dialog" aria-modal="true">
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} className="header-cart-icon" />
            <h3>Your Shopping Bag</h3>
            <span className="cart-header-count">({totalItems})</span>
          </div>
          <button 
            type="button" 
            className="cart-close-btn" 
            onClick={closeCart}
            aria-label="Close cart drawer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="shipping-progress-box">
          <div className="shipping-text">
            {isFreeShipping ? (
              <span className="shipping-unlocked">
                <CheckCircle2 size={16} /> You've earned <strong>Free Carbon-Neutral Shipping</strong>!
              </span>
            ) : (
              <span>
                <Truck size={16} /> Add <strong>{formatPrice(remainingForFreeShipping)}</strong> more for Free Shipping
              </span>
            )}
          </div>
          <div className="progress-bar-track">
            <div 
              className={`progress-bar-fill ${isFreeShipping ? 'unlocked' : ''}`}
              style={{ width: `${freeShippingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-icon-wrap">
                <ShoppingBag size={48} />
              </div>
              <h4>Your bag is currently empty</h4>
              <p>Looks like you haven't added anything to your cart yet.</p>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => {
                  closeCart();
                  navigate('/shop');
                }}
              >
                Start Exploring
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.itemKey} className="cart-item-row">
                  <Link 
                    to={`/product/${item.id}`} 
                    className="cart-item-thumb-link"
                    onClick={closeCart}
                  >
                    <img 
                      src={item.thumbnail || item.images?.[0]} 
                      alt={item.title} 
                      className="cart-item-thumb" 
                    />
                  </Link>

                  <div className="cart-item-info">
                    <div className="cart-item-header">
                      <Link 
                        to={`/product/${item.id}`} 
                        className="cart-item-title"
                        onClick={closeCart}
                      >
                        {item.title}
                      </Link>
                      <button
                        type="button"
                        className="cart-remove-btn"
                        onClick={() => removeFromCart(item.itemKey)}
                        aria-label={`Remove ${item.title}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {item.selectedVariant && (
                      <span className="cart-item-variant">Variant: {item.selectedVariant}</span>
                    )}

                    <div className="cart-item-bottom">
                      {/* Quantity Controls */}
                      <div className="quantity-stepper">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="cart-item-price">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-line">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">{formatPrice(subtotal)}</span>
            </div>
            <p className="summary-note">Taxes and shipping calculated at checkout.</p>

            <div className="cart-drawer-buttons">
              <button
                type="button"
                className="btn btn-primary btn-checkout"
                onClick={() => {
                  closeCart();
                  if (onCheckoutClick) onCheckoutClick();
                }}
              >
                Proceed to Checkout <ArrowRight size={17} />
              </button>

              <Link
                to="/cart"
                className="btn btn-secondary btn-view-cart"
                onClick={closeCart}
              >
                View Full Bag
              </Link>
            </div>

            <div className="cart-security-badge">
              <ShieldCheck size={16} />
              <span>Guaranteed Safe & Secure Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

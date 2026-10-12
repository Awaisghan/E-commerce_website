import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Tag, 
  Truck, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import './Cart.css';

export default function Cart({ onOpenCheckout }) {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    shipping, 
    tax, 
    total,
    isFreeShipping,
    freeShippingThreshold,
    freeShippingProgress
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'VERDANT15') {
      setAppliedPromo({ code, discountPercent: 15 });
    } else if (code === 'VERDANT25') {
      setAppliedPromo({ code, discountPercent: 25 });
    } else {
      setPromoError('Invalid coupon code. Try VERDANT15 or VERDANT25');
    }
  };

  const discountAmount = appliedPromo 
    ? (subtotal * (appliedPromo.discountPercent / 100)) 
    : 0;

  const finalSubtotal = subtotal - discountAmount;
  const finalTotal = finalSubtotal + shipping + tax;
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  if (cart.length === 0) {
    return (
      <div className="cart-page-root">
        <div className="container">
          <div className="cart-empty-container card-base">
            <div className="empty-bag-icon-wrap">
              <ShoppingBag size={56} />
            </div>
            <h2>Your Shopping Bag is Empty</h2>
            <p>You haven't added any products to your bag yet. Explore our sustainable edits.</p>
            <Link to="/shop" className="btn btn-primary btn-lg">
              Explore Our Collection <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-root">
      <div className="container">
        <div className="cart-page-header">
          <div>
            <span className="section-tag">SHOPPING BAG</span>
            <h1 className="cart-page-title">Review Your Selections ({cart.length} items)</h1>
          </div>
          <button type="button" className="clear-cart-text-btn" onClick={clearCart}>
            Empty Bag
          </button>
        </div>

        {/* Free Shipping Alert */}
        <div className="cart-shipping-banner">
          <div className="shipping-banner-text">
            {isFreeShipping ? (
              <span className="unlocked-text">
                <CheckCircle2 size={18} /> You've qualified for <strong>Free Carbon-Neutral Shipping</strong>!
              </span>
            ) : (
              <span>
                <Truck size={18} /> Add <strong>{formatPrice(remainingForFree)}</strong> more to unlock Free Worldwide Shipping
              </span>
            )}
          </div>
          <div className="cart-progress-track">
            <div 
              className={`cart-progress-fill ${isFreeShipping ? 'unlocked' : ''}`}
              style={{ width: `${freeShippingProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="cart-layout-grid">
          {/* Items Table */}
          <div className="cart-items-table card-base">
            <div className="cart-table-head">
              <span className="col-product">Product</span>
              <span className="col-price">Price</span>
              <span className="col-qty">Quantity</span>
              <span className="col-total">Total</span>
              <span className="col-action"></span>
            </div>

            <div className="cart-table-body">
              {cart.map((item) => (
                <div key={item.itemKey} className="cart-row">
                  <div className="col-product product-cell">
                    <Link to={`/product/${item.id}`} className="cart-item-img-link">
                      <img src={item.thumbnail || item.images?.[0]} alt={item.title} />
                    </Link>
                    <div className="product-cell-info">
                      <Link to={`/product/${item.id}`} className="cart-item-name">
                        {item.title}
                      </Link>
                      <span className="cart-item-cat">{item.category}</span>
                      {item.selectedVariant && (
                        <span className="cart-item-var">Variant: {item.selectedVariant}</span>
                      )}
                    </div>
                  </div>

                  <div className="col-price price-cell">
                    {formatPrice(item.price)}
                  </div>

                  <div className="col-qty qty-cell">
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
                  </div>

                  <div className="col-total total-cell">
                    {formatPrice(item.price * item.quantity)}
                  </div>

                  <div className="col-action action-cell">
                    <button
                      type="button"
                      className="remove-line-btn"
                      onClick={() => removeFromCart(item.itemKey)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-table-footer">
              <Link to="/shop" className="continue-shopping-link">
                <ArrowLeft size={16} /> Continue Browsing
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="cart-summary-panel">
            <div className="card-base summary-card">
              <h3 className="summary-title">Order Summary</h3>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="promo-form">
                <div className="promo-input-wrap">
                  <Tag size={16} className="promo-icon" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon code (VERDANT15)"
                    className="promo-input"
                  />
                  <button type="submit" className="promo-apply-btn">
                    Apply
                  </button>
                </div>
                {promoError && <span className="promo-msg error">{promoError}</span>}
                {appliedPromo && (
                  <span className="promo-msg success">
                    Code {appliedPromo.code} applied! (-{appliedPromo.discountPercent}%)
                  </span>
                )}
              </form>

              <div className="summary-calc-rows">
                <div className="calc-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {appliedPromo && (
                  <div className="calc-row discount-row">
                    <span>Discount ({appliedPromo.discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="calc-row">
                  <span>Carbon-Neutral Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>

                <div className="calc-row">
                  <span>Estimated Tax (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                <div className="calc-row grand-total-row">
                  <span>Estimated Total</span>
                  <span className="grand-total-val">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-lg checkout-action-btn"
                onClick={onOpenCheckout}
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <div className="summary-badges">
                <div className="badge-line">
                  <ShieldCheck size={16} />
                  <span>256-bit Secure Encryption</span>
                </div>
                <div className="badge-line">
                  <Truck size={16} />
                  <span>Doorstep Courier Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

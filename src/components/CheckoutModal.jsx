import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Truck, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import './CheckoutModal.css';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, subtotal, shipping, tax, total, clearCart } = useCart();
  const [step, setStep] = useState('form'); // 'form' or 'success'
  const [formData, setFormData] = useState({
    name: 'Eleanor Vance',
    email: 'eleanor@example.com',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    zip: '94107',
    paymentMethod: 'card'
  });
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedOrderNum = `VRD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);
    setStep('success');
    clearCart();
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="checkout-modal-backdrop" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-modal-header">
          <div className="checkout-header-title">
            <ShieldCheck size={22} className="shield-icon" />
            <h3>{step === 'form' ? 'Express Secure Checkout' : 'Order Confirmed!'}</h3>
          </div>
          <button type="button" className="checkout-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="checkout-body-grid">
              {/* Shipping info */}
              <div className="checkout-fields">
                <h4 className="checkout-section-title">Shipping Address</h4>
                <div className="field-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="field-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="field-group">
                  <label>Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="field-row">
                  <div className="field-group">
                    <label>City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="field-group">
                    <label>Postal / Zip Code</label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <h4 className="checkout-section-title" style={{ marginTop: '20px' }}>Payment Method</h4>
                <div className="payment-options">
                  <label className={`payment-pill ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    />
                    <CreditCard size={18} /> Credit / Debit Card
                  </label>
                  <label className={`payment-pill ${formData.paymentMethod === 'apple' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'apple'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'apple' })}
                    />
                    Apple Pay
                  </label>
                  <label className={`payment-pill ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    />
                    Cash on Delivery
                  </label>
                </div>
              </div>

              {/* Order mini summary */}
              <div className="checkout-order-summary">
                <h4 className="checkout-section-title">Order Overview ({cart.length} items)</h4>
                <div className="checkout-items-preview">
                  {cart.map((item) => (
                    <div key={item.itemKey} className="checkout-mini-item">
                      <img src={item.thumbnail || item.images?.[0]} alt={item.title} />
                      <div className="mini-item-details">
                        <span className="mini-item-title">{item.title}</span>
                        <span className="mini-item-qty">Qty: {item.quantity}</span>
                      </div>
                      <span className="mini-item-price">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="checkout-totals">
                  <div className="checkout-calc-row">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="checkout-calc-row">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                  <div className="checkout-calc-row">
                    <span>Estimated Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="checkout-calc-row total-row">
                    <span>Total Due</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary place-order-btn">
                  Complete Purchase ({formatPrice(total)}) <ArrowRight size={18} />
                </button>
                <p className="checkout-demo-notice">
                  * Demo Store Demonstration: No actual payment will be processed.
                </p>
              </div>
            </div>
          </form>
        ) : (
          <div className="checkout-success-view">
            <div className="success-icon-wrap">
              <CheckCircle2 size={56} className="order-check-icon" />
            </div>
            <h2>Thank You for Your Order!</h2>
            <p className="order-receipt-number">
              Order Confirmation #: <strong>{orderNumber}</strong>
            </p>
            <p className="order-success-desc">
              We have received your order and sent a receipt confirmation to <strong>{formData.email}</strong>. 
              Your items are being mindfully prepared and packaged with recyclable materials.
            </p>
            <div className="order-benefits-strip">
              <div className="strip-item"><Truck size={16} /> Carbon-Neutral Shipping</div>
              <div className="strip-item"><ShieldCheck size={16} /> 30-Day Return Guarantee</div>
            </div>
            <button type="button" className="btn btn-primary btn-lg" onClick={handleClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

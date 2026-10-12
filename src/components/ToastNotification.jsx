import React from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ToastNotification.css';

export default function ToastNotification() {
  const { notification, openCart } = useCart();

  if (!notification) return null;

  return (
    <div className="toast-notification-wrap">
      <div className="toast-notification">
        <CheckCircle2 size={20} className="toast-check-icon" />
        <div className="toast-body">
          <p className="toast-message">{notification.message}</p>
        </div>
        <button 
          type="button" 
          className="toast-view-cart-btn"
          onClick={openCart}
        >
          View Bag
        </button>
      </div>
    </div>
  );
}

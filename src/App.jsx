import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import './App.css';

// Components
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ScrollToTop from './components/ScrollToTop';
import ToastNotification from './components/ToastNotification';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Category from './pages/Category';
import ProductDetails from './pages/ProductDetails';
import SearchResults from './pages/SearchResults';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <div className="app-container">
            {/* Top Announcement */}
            <AnnouncementBar />

            {/* Sticky Navigation */}
            <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

            {/* Modals & Drawers */}
            <SearchBar 
              isOpen={isSearchOpen} 
              onClose={() => setIsSearchOpen(false)} 
            />

            <CartDrawer 
              onCheckoutClick={() => setIsCheckoutOpen(true)} 
            />

            <CheckoutModal 
              isOpen={isCheckoutOpen} 
              onClose={() => setIsCheckoutOpen(false)} 
            />

            {/* Toast Notifications */}
            <ToastNotification />

            {/* Scroll Restorer */}
            <ScrollToTop />

            {/* Main Page Routing */}
            <main className="app-main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/category/:category" element={<Category />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/search" element={<SearchResults />} />
                <Route 
                  path="/cart" 
                  element={<Cart onOpenCheckout={() => setIsCheckoutOpen(true)} />} 
                />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

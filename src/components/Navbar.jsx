import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Leaf, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Navbar.css';

export default function Navbar({ onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const location = useLocation();

  const { totalItems, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
    setAccountModalOpen(false);
  }, [location.pathname]);

  const categoryItems = [
    { name: 'All Products', path: '/shop' },
    { name: 'Electronics', path: '/category/electronics' },
    { name: 'Fashion & Apparel', path: '/category/fashion' },
    { name: "Men's Clothing", path: '/category/mens-clothing' },
    { name: "Women's Clothing", path: '/category/womens-clothing' },
    { name: 'Accessories & Watches', path: '/category/accessories' },
    { name: 'Home & Living', path: '/category/home-living' },
    { name: 'Beauty & Personal Care', path: '/category/beauty-personal-care' },
  ];

  return (
    <>
      <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="navbar-logo" aria-label="VERDANT Home">
            <span className="logo-icon-wrapper">
              <Leaf size={22} className="logo-icon" />
            </span>
            <div className="logo-text-group">
              <span className="logo-brand">VERDANT</span>
              <span className="logo-subtext">LIVING</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
              Home
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Shop All
            </NavLink>

            {/* Categories Dropdown */}
            <div 
              className="nav-item-dropdown"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button 
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/category') ? 'active' : ''}`}
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                aria-expanded={categoriesDropdownOpen}
              >
                Categories <ChevronDown size={15} className={`dropdown-chevron ${categoriesDropdownOpen ? 'open' : ''}`} />
              </button>

              {categoriesDropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-grid">
                    {categoryItems.map((cat, idx) => (
                      <Link 
                        key={idx} 
                        to={cat.path} 
                        className="dropdown-item"
                        onClick={() => setCategoriesDropdownOpen(false)}
                      >
                        <span className="dropdown-dot"></span>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                  <div className="dropdown-featured-card">
                    <span className="tag-curated">CURATED EDIT</span>
                    <p className="card-tagline">Conscious luxury, sustainably packaged.</p>
                    <Link to="/category/beauty-personal-care" className="card-link">
                      Explore Organic Beauty <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
          </nav>

          {/* Action Icons */}
          <div className="navbar-actions">
            {/* Search Trigger */}
            <button 
              className="action-btn"
              onClick={onOpenSearch}
              aria-label="Search Catalog"
              title="Search"
            >
              <Search size={21} />
            </button>

            {/* Account Trigger */}
            <div className="account-wrapper">
              <button 
                className="action-btn"
                onClick={() => setAccountModalOpen(!accountModalOpen)}
                aria-label="User Account"
                title="Account"
              >
                <User size={21} />
              </button>

              {accountModalOpen && (
                <div className="account-popover">
                  <div className="account-popover-header">
                    <p className="user-greeting">Welcome to VERDANT</p>
                    <p className="user-sub">Manage your orders and profile</p>
                  </div>
                  <div className="account-popover-actions">
                    <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>Sign In / Register</button>
                    <Link to="/wishlist" className="account-link-item" onClick={() => setAccountModalOpen(false)}>
                      My Wishlist ({wishlistCount})
                    </Link>
                    <Link to="/cart" className="account-link-item" onClick={() => setAccountModalOpen(false)}>
                      View Cart ({totalItems})
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="action-btn wishlist-btn" 
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart size={21} />
              {wishlistCount > 0 && (
                <span className="badge-count wishlist-badge">{wishlistCount}</span>
              )}
            </Link>

            {/* Shopping Cart Drawer Trigger */}
            <button 
              className="action-btn cart-btn"
              onClick={openCart}
              aria-label="Shopping Cart Drawer"
              title="Shopping Cart"
            >
              <ShoppingBag size={21} />
              {totalItems > 0 && (
                <span className="badge-count cart-badge">{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="navbar-logo">
                <span className="logo-icon-wrapper">
                  <Leaf size={20} className="logo-icon" />
                </span>
                <span className="logo-brand">VERDANT</span>
              </div>
              <button 
                className="close-drawer-btn" 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mobile-search-box">
              <button className="mobile-search-btn" onClick={() => { setMobileMenuOpen(false); onOpenSearch(); }}>
                <Search size={18} />
                <span>Search collection...</span>
              </button>
            </div>

            <nav className="mobile-nav-links">
              <Link to="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/shop" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>All Products</Link>
              
              <div className="mobile-section-divider">Categories</div>
              {categoryItems.slice(1).map((cat, idx) => (
                <Link 
                  key={idx} 
                  to={cat.path} 
                  className="mobile-category-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}

              <div className="mobile-section-divider">Company</div>
              <Link to="/about" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link to="/contact" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Contact Support</Link>
              <Link to="/wishlist" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Wishlist ({wishlistCount})
              </Link>
            </nav>

            <div className="mobile-drawer-footer">
              <p className="mobile-footer-text">Green living curated for you</p>
              <button 
                className="btn btn-primary btn-sm" 
                style={{ width: '100%' }}
                onClick={() => { setMobileMenuOpen(false); openCart(); }}
              >
                Open Cart ({totalItems})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

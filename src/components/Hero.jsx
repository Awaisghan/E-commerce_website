import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Star, 
  ArrowUpRight,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Hero.css';

const HERO_SLIDES = [
  {
    id: 1,
    tag: "SPRING / SUMMER 2026 EDIT",
    title: "Elevated Living,",
    highlight: "Mindfully Curated.",
    description: "Discover exceptional craftsmanship across certified clean beauty, modern tailored silhouettes, smart tech, and artisanal home sanctuaries.",
    primaryBtn: { text: "Shop New Season", link: "/shop" },
    secondaryBtn: { text: "Explore Beauty", link: "/category/beauty-personal-care" },
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    spotlight: {
      category: "Clean Beauty",
      title: "Essence Botanical Elixir",
      price: "$19.99",
      originalPrice: "$24.99",
      rating: "4.9",
      tag: "Top Rated",
      productId: 1
    }
  },
  {
    id: 2,
    tag: "SUSTAINABLE WARDROBE CAPSULE",
    title: "Timeless Comfort,",
    highlight: "Pure Materials.",
    description: "Architectural cuts and breathable certified organic textiles woven for seamless daily grace and longevity.",
    primaryBtn: { text: "Discover Fashion", link: "/category/fashion" },
    secondaryBtn: { text: "Men's Apparel", link: "/category/mens-clothing" },
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    spotlight: {
      category: "Apparel",
      title: "Relaxed Linen Overshirt",
      price: "$48.00",
      originalPrice: "$62.00",
      rating: "4.8",
      tag: "-22% OFF",
      productId: 8
    }
  },
  {
    id: 3,
    tag: "SANCTUARY & LIVING ACCENTS",
    title: "Harmonic Spaces,",
    highlight: "Enduring Form.",
    description: "Ground your living space with handcrafted ceramic stoneware, ergonomic accents, and ambient lifestyle devices.",
    primaryBtn: { text: "Shop Home & Living", link: "/category/home-living" },
    secondaryBtn: { text: "Accessories", link: "/category/accessories" },
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    spotlight: {
      category: "Home Decor",
      title: "Nordic Stoneware Vessel",
      price: "$34.50",
      originalPrice: "$45.00",
      rating: "5.0",
      tag: "Artisan Pick",
      productId: 11
    }
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { openCart } = useCart();

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = HERO_SLIDES[currentSlide];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section 
      className="hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Hero Showcase"
    >
      {/* Ambient background glow elements */}
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>

      <div className="container hero-container">
        {/* Left Column: Editorial & CTA */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse-dot"></span>
            <Sparkles size={13} className="badge-sparkle-icon" />
            <span>{slide.tag}</span>
          </div>

          <h1 className="hero-title" key={`title-${slide.id}`}>
            {slide.title} <br />
            <span className="hero-highlight">{slide.highlight}</span>
          </h1>

          <p className="hero-description" key={`desc-${slide.id}`}>
            {slide.description}
          </p>

          <div className="hero-actions">
            <Link to={slide.primaryBtn.link} className="btn btn-primary btn-lg hero-cta-btn">
              <span>{slide.primaryBtn.text}</span>
              <ArrowRight size={18} />
            </Link>
            <Link to={slide.secondaryBtn.link} className="btn btn-secondary btn-lg hero-secondary-btn">
              <span>{slide.secondaryBtn.text}</span>
            </Link>
          </div>

          {/* Quick Categories Micro-Pills */}
          <div className="hero-trending-tags">
            <span className="tags-label">Trending Now:</span>
            <div className="tags-chips">
              <Link to="/category/beauty-personal-care" className="tag-chip">Organic Skincare</Link>
              <Link to="/category/electronics" className="tag-chip">Smart Tech</Link>
              <Link to="/category/fashion" className="tag-chip">Summer Linens</Link>
              <Link to="/category/accessories" className="tag-chip">Watches</Link>
            </div>
          </div>

          {/* Social Proof & Customer Avatars */}
          <div className="hero-trust-bar">
            <div className="avatar-stack">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" alt="Customer" className="avatar-item" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" alt="Customer" className="avatar-item" />
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop" alt="Customer" className="avatar-item" />
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop" alt="Customer" className="avatar-item" />
            </div>

            <div className="trust-text-group">
              <div className="trust-rating-row">
                <div className="stars-mini">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <span className="rating-score">4.9/5 Rating</span>
              </div>
              <p className="trust-sub">Joined by <strong>42,000+</strong> conscious living enthusiasts</p>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Stage & Spotlight Card */}
        <div className="hero-stage">
          <div className="hero-visual-frame">
            {/* Main Stage Image */}
            <div className="stage-image-container">
              <img
                key={slide.image}
                src={slide.image}
                alt={slide.title}
                className="stage-main-img"
              />
              <div className="stage-image-overlay"></div>
            </div>

            {/* Top Floating Badge: Carbon-Neutral Pledge */}
            <div className="stage-badge-top">
              <div className="stage-badge-icon">
                <Leaf size={16} />
              </div>
              <div>
                <span className="stage-badge-title">100% Carbon-Neutral</span>
                <span className="stage-badge-desc">Zero emissions global shipping</span>
              </div>
            </div>

            {/* Bottom Spotlight Card */}
            <div className="stage-spotlight-card">
              <div className="spotlight-header">
                <span className="spotlight-cat">{slide.spotlight.category}</span>
                <span className="badge badge-sale">{slide.spotlight.tag}</span>
              </div>

              <h4 className="spotlight-title">{slide.spotlight.title}</h4>

              <div className="spotlight-pricing-row">
                <div className="spotlight-prices">
                  <span className="spotlight-price">{slide.spotlight.price}</span>
                  <span className="spotlight-old-price">{slide.spotlight.originalPrice}</span>
                </div>
                <div className="spotlight-stars">
                  <Star size={13} fill="#F59E0B" color="#F59E0B" />
                  <span>{slide.spotlight.rating}</span>
                </div>
              </div>

              <Link to={`/product/${slide.spotlight.productId}`} className="spotlight-action-btn">
                <span>View Product</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* Slide Navigation Controls */}
            <div className="stage-nav-controls">
              <button 
                type="button" 
                onClick={handlePrev} 
                className="nav-arrow-btn"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="slide-dots">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`slide-dot ${currentSlide === idx ? 'active' : ''}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    <span className="dot-inner"></span>
                  </button>
                ))}
              </div>

              <button 
                type="button" 
                onClick={handleNext} 
                className="nav-arrow-btn"
                aria-label="Next Slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

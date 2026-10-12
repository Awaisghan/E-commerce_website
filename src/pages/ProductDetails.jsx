import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, 
  Star, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Check, 
  ChevronRight, 
  Plus, 
  Minus, 
  Share2,
  Sparkles,
  Info,
  Clock,
  Box
} from 'lucide-react';
import { getProductById, getProductsByCategory, FALLBACK_IMAGE } from '../services/productApi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, calculateDiscountPrice } from '../utils/formatPrice';
import ProductGrid from '../components/ProductGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import './ProductDetails.css';

const RECENTLY_VIEWED_KEY = 'verdant_recently_viewed';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Default');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'reviews', 'shipping'

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setLoading(true);
    setError(null);
    setQuantity(1);
    setActiveImageIndex(0);

    getProductById(id)
      .then(data => {
        setProduct(data);
        // Track recently viewed
        try {
          const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
          let list = stored ? JSON.parse(stored) : [];
          list = [data, ...list.filter(item => item.id !== data.id)].slice(0, 6);
          localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(list));
          setRecentlyViewed(list.filter(item => item.id !== data.id));
        } catch (e) {
          console.error('Recently viewed error', e);
        }

        // Fetch related products
        if (data.category) {
          getProductsByCategory(data.category, { limit: 4 })
            .then(res => {
              const filtered = (res.products || []).filter(p => p.id !== data.id);
              setRelatedProducts(filtered.slice(0, 4));
            })
            .catch(() => {});
        }
      })
      .catch(err => {
        console.error('Failed to load product details', err);
        setError('Product not found or unavailable');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '60px 24px' }}>
        <LoadingSkeleton type="details" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist or has been archived.</p>
        <Link to="/shop" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.thumbnail || FALLBACK_IMAGE];

  const currentImage = images[activeImageIndex] || images[0] || FALLBACK_IMAGE;
  const inWishlist = isInWishlist(product.id);
  const discount = product.discountPercentage ? Math.round(product.discountPercentage) : 0;
  const originalPrice = discount > 0 ? calculateDiscountPrice(product.price, discount) : product.price;

  // Variants options
  const variants = ['Olive Green', 'Ivory Mist', 'Natural Linen', 'Obsidian Black'];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div className="product-details-page">
      {/* Breadcrumbs */}
      <div className="product-breadcrumbs-wrap">
        <div className="container breadcrumb-container">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop">Shop</Link>
          <ChevronRight size={14} />
          <Link to={`/category/${product.category}`}>{product.category}</Link>
          <ChevronRight size={14} />
          <span className="current-crumb">{product.title}</span>
        </div>
      </div>

      <div className="container product-main-container">
        <div className="product-details-grid">
          {/* Left: Gallery */}
          <div className="product-gallery">
            <div className="gallery-main-image-wrap">
              <img
                src={currentImage}
                alt={product.title}
                className="gallery-main-img"
              />
              {discount > 0 && (
                <span className="badge badge-sale gallery-badge">-{discount}% OFF</span>
              )}
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="gallery-thumbs-row">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`gallery-thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`${product.title} view ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Actions */}
          <div className="product-info-panel">
            <div className="product-meta-header">
              <span className="product-brand-tag">{product.brand || 'VERDANT STUDIO'}</span>
              <div className="product-rating-box">
                <Star size={16} fill="#F59E0B" color="#F59E0B" />
                <span className="rating-num">{product.rating ? product.rating.toFixed(1) : '4.8'}</span>
                <span className="reviews-count">({product.reviews?.length || 18} Customer Reviews)</span>
              </div>
            </div>

            <h1 className="product-details-title">{product.title}</h1>

            <div className="product-pricing-wrap">
              <span className="price-current">{formatPrice(product.price)}</span>
              {discount > 0 && (
                <span className="price-original">{formatPrice(originalPrice)}</span>
              )}
              {product.stock && (
                <span className="stock-pill">
                  <Check size={13} /> In Stock ({product.stock} units)
                </span>
              )}
            </div>

            <p className="product-description-text">{product.description}</p>

            {/* Color / Variant selector */}
            <div className="product-option-section">
              <div className="option-label-row">
                <span className="option-title">Finish / Color:</span>
                <span className="option-selected">{selectedVariant}</span>
              </div>
              <div className="variant-chips-row">
                {variants.map((v, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`variant-chip ${selectedVariant === v ? 'active' : ''}`}
                    onClick={() => setSelectedVariant(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="product-actions-group">
              <div className="quantity-control-wrap">
                <button
                  type="button"
                  className="qty-adjust-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="qty-number">{quantity}</span>
                <button
                  type="button"
                  className="qty-adjust-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                className={`btn btn-primary btn-add-main ${addedAnimation ? 'btn-added' : ''}`}
                onClick={handleAddToCart}
              >
                {addedAnimation ? (
                  <>
                    <Check size={18} /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> Add to Cart — {formatPrice(product.price * quantity)}
                  </>
                )}
              </button>

              <button
                type="button"
                className={`btn-wishlist-toggle ${inWishlist ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                title="Wishlist"
              >
                <Heart size={20} fill={inWishlist ? "#E06D6D" : "none"} color={inWishlist ? "#E06D6D" : "currentColor"} />
              </button>
            </div>

            {/* Value Props & Shipping Guarantees */}
            <div className="product-perks-list">
              <div className="perk-item">
                <Truck size={18} className="perk-icon" />
                <div>
                  <strong>{product.shippingInformation || 'Ships in 1-2 business days'}</strong>
                  <span>Free shipping on all orders over $150</span>
                </div>
              </div>
              <div className="perk-item">
                <RotateCcw size={18} className="perk-icon" />
                <div>
                  <strong>{product.returnPolicy || '30-Day Effortless Returns'}</strong>
                  <span>Pre-paid labels included with packaging</span>
                </div>
              </div>
              <div className="perk-item">
                <ShieldCheck size={18} className="perk-icon" />
                <div>
                  <strong>{product.warrantyInformation || '1-Year Official Warranty'}</strong>
                  <span>Authenticity & durability guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Structured Tabs (Specifications, Reviews, Shipping) */}
        <div className="product-tabs-section">
          <div className="tabs-navigation">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Specifications & Details
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Verified Reviews ({product.reviews?.length || 3})
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping & Eco Packaging
            </button>
          </div>

          <div className="tabs-content-card">
            {activeTab === 'specs' && (
              <div className="specs-grid">
                <div className="spec-row">
                  <span className="spec-label">SKU</span>
                  <span className="spec-val">{product.sku || `VRD-${product.id}`}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Category</span>
                  <span className="spec-val" style={{ textTransform: 'capitalize' }}>{product.category}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Weight</span>
                  <span className="spec-val">{product.weight ? `${product.weight} oz` : '12 oz'}</span>
                </div>
                {product.dimensions && (
                  <div className="spec-row">
                    <span className="spec-label">Dimensions</span>
                    <span className="spec-val">
                      {product.dimensions.width}W × {product.dimensions.height}H × {product.dimensions.depth}D cm
                    </span>
                  </div>
                )}
                <div className="spec-row">
                  <span className="spec-label">Warranty</span>
                  <span className="spec-val">{product.warrantyInformation || 'Standard 1-Year'}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Materials</span>
                  <span className="spec-val">Ethically Sourced, Eco-Certified</span>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-tab-content">
                <div className="reviews-list">
                  {(product.reviews && product.reviews.length > 0 ? product.reviews : [
                    {
                      reviewerName: "Camilla Scott",
                      rating: 5,
                      comment: "Exceeded my highest expectations. The material quality feels truly exceptional.",
                      date: "2026-03-14"
                    },
                    {
                      reviewerName: "Marcus Sterling",
                      rating: 5,
                      comment: "Super fast shipping, thoughtful plastic-free packaging, exactly as described.",
                      date: "2026-03-02"
                    }
                  ]).map((rev, idx) => (
                    <div key={idx} className="review-item">
                      <div className="review-item-header">
                        <div className="review-rating">
                          {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                            <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                          ))}
                        </div>
                        <span className="review-date">{new Date(rev.date).toLocaleDateString()}</span>
                      </div>
                      <p className="review-comment">"{rev.comment}"</p>
                      <span className="reviewer-author">— {rev.reviewerName} (Verified Purchase)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="shipping-tab-content">
                <h4>Carbon-Neutral Logistics</h4>
                <p>
                  Every order placed with VERDANT is delivered via verified green carriers. Our parcel boxes are made from 100% post-consumer recycled paper and soy-based inks.
                </p>
                <div className="shipping-bullet-points">
                  <p>• Standard Transit: 3–5 Business Days</p>
                  <p>• Express Courier: 1–2 Business Days available at checkout</p>
                  <p>• 30-Day Hassle-Free Returns with instant courier pickup</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="product-section-block">
            <div className="section-header-split">
              <div>
                <span className="section-tag">COMPLEMENTARY STYLING</span>
                <h2 className="section-title">Related Items</h2>
              </div>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        )}

        {/* Recently Viewed Products */}
        {recentlyViewed.length > 0 && (
          <div className="product-section-block">
            <div className="section-header-split">
              <div>
                <span className="section-tag">YOUR SESSION</span>
                <h2 className="section-title">Recently Viewed</h2>
              </div>
            </div>
            <ProductGrid products={recentlyViewed.slice(0, 4)} />
          </div>
        )}
      </div>
    </div>
  );
}

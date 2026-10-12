import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Flame, Star, Package } from 'lucide-react';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import ProductGrid from '../components/ProductGrid';
import CategoryCard from '../components/CategoryCard';
import PromoBanner from '../components/PromoBanner';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import { getProducts, CATEGORY_MAPPINGS } from '../services/productApi';
import './Home.css';

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingBestSellers, setLoadingBestSellers] = useState(true);
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(true);

  useEffect(() => {
    // Fetch Trending products (first batch with high rating)
    getProducts({ limit: 8, skip: 0 })
      .then(res => {
        setTrendingProducts(res.products || []);
      })
      .catch(err => console.error('Trending fetch error', err))
      .finally(() => setLoadingTrending(false));

    // Fetch Best Sellers (different skip offset)
    getProducts({ limit: 8, skip: 12 })
      .then(res => {
        setBestSellers(res.products || []);
      })
      .catch(err => console.error('Best seller fetch error', err))
      .finally(() => setLoadingBestSellers(false));

    // Fetch New Arrivals (another skip offset)
    getProducts({ limit: 8, skip: 24 })
      .then(res => {
        setNewArrivals(res.products || []);
      })
      .catch(err => console.error('New arrivals fetch error', err))
      .finally(() => setLoadingNewArrivals(false));
  }, []);

  const featuredCategories = [
    {
      name: "Beauty & Personal Care",
      slug: "beauty-personal-care",
      count: "30+ Items",
      image: CATEGORY_MAPPINGS['beauty-personal-care'].bannerImg
    },
    {
      name: "Modern Electronics",
      slug: "electronics",
      count: "25+ Devices",
      image: CATEGORY_MAPPINGS['electronics'].bannerImg
    },
    {
      name: "Curated Fashion",
      slug: "fashion",
      count: "40+ Styles",
      image: CATEGORY_MAPPINGS['fashion'].bannerImg
    },
    {
      name: "Home & Sanctuaries",
      slug: "home-living",
      count: "20+ Accents",
      image: CATEGORY_MAPPINGS['home-living'].bannerImg
    },
    {
      name: "Accessories & Timepieces",
      slug: "accessories",
      count: "35+ Pieces",
      image: CATEGORY_MAPPINGS['accessories'].bannerImg
    },
    {
      name: "Men's Apparel",
      slug: "mens-clothing",
      count: "15+ Essentials",
      image: CATEGORY_MAPPINGS['mens-clothing'].bannerImg
    }
  ];

  return (
    <div className="home-page-root">
      {/* 1. Split Hero Section */}
      <Hero />

      {/* 2. Benefits Banner */}
      <Benefits />

      {/* 3. Featured Categories Section (White Background) */}
      <section className="section-white categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">EXPLORE BY EDIT</span>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Intentionally crafted collections spanning sustainable beauty, timeless wardrobe essentials,
              smart devices, and living accoutrements.
            </p>
          </div>

          <div className="categories-grid">
            {featuredCategories.map((cat, idx) => (
              <CategoryCard key={idx} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Trending Products Section (Light Green Background) */}
      <section className="section-green trending-section">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="section-tag">
                <Flame size={14} /> CURRENTLY IN DEMAND
              </span>
              <h2 className="section-title">Trending This Season</h2>
              <p className="section-subtitle">
                The most beloved picks chosen by our conscious community this week.
              </p>
            </div>
            <Link to="/shop" className="btn btn-secondary">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>

          <ProductGrid products={trendingProducts} loading={loadingTrending} skeletonCount={8} />
        </div>
      </section>

      {/* 5. Promotional Banner with Special Offer */}
      <PromoBanner />

      {/* 6. Best-Selling Products Section (White Background) */}
      <section className="section-white best-sellers-section">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="section-tag">
                <Star size={14} /> ALL-TIME FAVORITES
              </span>
              <h2 className="section-title">Our Best-Selling Curations</h2>
              <p className="section-subtitle">
                Timeless best-sellers certified for durability, aesthetic warmth, and refined utility.
              </p>
            </div>
            <Link to="/shop" className="btn btn-secondary">
              Shop Bestsellers <ArrowRight size={16} />
            </Link>
          </div>

          <ProductGrid products={bestSellers} loading={loadingBestSellers} skeletonCount={8} />
        </div>
      </section>

      {/* 7. New Arrivals Section (Light Green Background) */}
      <section className="section-green new-arrivals-section">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="section-tag">
                <Sparkles size={14} /> FRESH ARRIVALS
              </span>
              <h2 className="section-title">Newly Added to Catalog</h2>
              <p className="section-subtitle">
                Experience our newest additions curated with modern sensibilities.
              </p>
            </div>
            <Link to="/shop" className="btn btn-secondary">
              Browse New Drops <ArrowRight size={16} />
            </Link>
          </div>

          <ProductGrid products={newArrivals} loading={loadingNewArrivals} skeletonCount={8} />
        </div>
      </section>

      {/* 8. Customer Reviews & Testimonials (Secondary Background) */}
      <Testimonials />

      {/* 9. Newsletter Subscription Section (White Background) */}
      <Newsletter />
    </div>
  );
}

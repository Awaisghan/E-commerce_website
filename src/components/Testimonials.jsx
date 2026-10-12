import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import './Testimonials.css';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Sophia Montgomery",
      location: "San Francisco, CA",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      product: "Essence Botanical Serum",
      review: "The packaging is completely plastic-free and recyclable. The skincare formula absorbs instantly with zero residue. Absolutely in love with VERDANT's aesthetic and quality."
    },
    {
      id: 2,
      name: "Julian Vance",
      location: "London, UK",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      product: "Minimalist Chrono Watch",
      review: "Remarkable craftsmanship for this price tier. Delivered within 3 days in spotless condition. The subtle green watch accents match perfectly with tailored suiting."
    },
    {
      id: 3,
      name: "Elena Rostova",
      location: "Stockholm, Sweden",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      product: "Nordic Ceramic Vases",
      review: "The textures and earth tones blend seamlessly into our Scandinavian living room. Customer care answered my delivery inquiry within minutes. 10/10 shopping experience!"
    }
  ];

  return (
    <section className="section-green testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">VOICES OF CONSCIOUS CONSUMERS</span>
          <h2 className="section-title">Loved by Over 40,000 Discerning Shoppers</h2>
          <p className="section-subtitle">
            Authentic experiences shared by our community worldwide about craftsmanship, delivery, and mindful living.
          </p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((rev) => (
            <div key={rev.id} className="testimonial-card card-base">
              <div className="testimonial-header">
                <div className="testimonial-stars">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <Quote size={24} className="testimonial-quote-icon" />
              </div>

              <p className="testimonial-body">"{rev.review}"</p>

              <div className="testimonial-meta">
                <span className="verified-purchased-tag">
                  Purchased: <strong>{rev.product}</strong>
                </span>
              </div>

              <div className="testimonial-author">
                <img src={rev.avatar} alt={rev.name} className="author-avatar" />
                <div className="author-info">
                  <h4 className="author-name">
                    {rev.name}
                    <CheckCircle size={14} className="verified-check" />
                  </h4>
                  <span className="author-location">{rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

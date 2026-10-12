import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Award, Recycle, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import './About.css';

export default function About() {
  const values = [
    {
      icon: <Leaf size={28} />,
      title: "Mindful Sourcing",
      desc: "Every product in our catalog undergoes rigorous auditing for non-toxic, certified organic, and ethically sourced raw materials."
    },
    {
      icon: <Recycle size={28} />,
      title: "Zero Single-Use Plastic",
      desc: "All parcel orders are dispatched in 100% water-soluble or post-consumer recycled boxes printed with non-polluting algae inks."
    },
    {
      icon: <Award size={28} />,
      title: "Uncompromising Quality",
      desc: "We prioritize timeless endurance over fleeting trends. We design goods made to last through years of everyday utility."
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Radical Transparency",
      desc: "From supply chain certifications to fair living wages for artisans, our operations remain open and publicly verified."
    }
  ];

  return (
    <div className="about-page-root">
      {/* Hero Header */}
      <section className="about-hero">
        <div className="container">
          <span className="section-tag">OUR MISSION & HERITAGE</span>
          <h1 className="about-title">Living in Harmonic Balance with Modern Design</h1>
          <p className="about-subtitle">
            Founded with the conviction that luxury, utility, and environmental stewardship 
            can coexist without sacrifice.
          </p>
        </div>
      </section>

      {/* Story split */}
      <section className="section-white">
        <div className="container about-split-grid">
          <div className="about-story-text">
            <span className="section-tag">THE VERDANT STORY</span>
            <h2 className="section-title">Reimagining Conscious Commerce</h2>
            <p className="story-paragraph">
              VERDANT was founded in 2024 to solve a simple dilemma: why should elevated, 
              beautiful essentials come at the expense of our living environment? 
            </p>
            <p className="story-paragraph">
              We curate the world's most deliberate collection of organic beauty, durable apparel, 
              functional technology, and handcrafted interior living objects. Every piece is selected 
              to bring aesthetic peace, functional longevity, and mindful appreciation to your daily life.
            </p>
            <div className="story-stat-row">
              <div className="stat-box">
                <span className="stat-val">100%</span>
                <span className="stat-desc">Plastic-Free Parcels</span>
              </div>
              <div className="stat-box">
                <span className="stat-val">40k+</span>
                <span className="stat-desc">Mindful Customers</span>
              </div>
              <div className="stat-box">
                <span className="stat-val">0</span>
                <span className="stat-desc">Net Carbon Footprint</span>
              </div>
            </div>
          </div>

          <div className="about-story-visual">
            <img 
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=900&auto=format&fit=crop" 
              alt="VERDANT Craft Studio"
              className="about-studio-img"
            />
          </div>
        </div>
      </section>

      {/* Core Values (Green Background) */}
      <section className="section-green">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">THE CORNERSTONES</span>
            <h2 className="section-title">Our Environmental & Craft Commitments</h2>
            <p className="section-subtitle">
              The four foundational pillars guiding every brand partnership and catalog selection.
            </p>
          </div>

          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card card-base">
                <div className="value-icon-wrap">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="section-white about-cta-section">
        <div className="container text-center">
          <h2 className="section-title">Ready to Experience Mindful Living?</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 30px', maxWidth: '520px' }}>
            Browse our full catalog or discover new arrivals handpicked for this season.
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Shop The Catalog <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

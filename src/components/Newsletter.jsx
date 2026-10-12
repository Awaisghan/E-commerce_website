import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <section className="section-white newsletter-section">
      <div className="container">
        <div className="newsletter-card">
          <div className="newsletter-header">
            <span className="section-tag">THE VERDANT JOURNAL</span>
            <h2 className="newsletter-title">Subscribe to The Mindful Edit</h2>
            <p className="newsletter-subtitle">
              Receive private invitations to seasonal drops, subscriber-only 15% offers, 
              and conscious lifestyle editorial stories directly in your inbox.
            </p>
          </div>

          {subscribed ? (
            <div className="newsletter-success">
              <CheckCircle2 size={36} className="success-icon" />
              <div>
                <h4>You're on the list!</h4>
                <p>Check your inbox for your 15% welcome code: <strong>VERDANT15</strong></p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="newsletter-input-group">
                <Mail size={18} className="newsletter-mail-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="btn btn-primary newsletter-btn">
                  Join Newsletter <ArrowRight size={16} />
                </button>
              </div>
              <span className="newsletter-privacy">
                Zero spam. You can unsubscribe anytime with one click.
              </span>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

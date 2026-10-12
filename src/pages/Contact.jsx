import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "How does complimentary shipping work?",
      a: "All orders over $150 automatically qualify for complimentary carbon-neutral shipping at checkout. Standard transit takes 3-5 business days with live courier tracking."
    },
    {
      q: "What is your return & exchange guarantee?",
      a: "We offer 30-day hassle-free returns. Every package includes a pre-paid return label. Once received at our depot, refunds are processed within 48 hours."
    },
    {
      q: "Are the skincare and beauty products cruelty-free?",
      a: "Yes, 100%. All cosmetics, fragrances, and skincare formulations on VERDANT are certified cruelty-free, paraben-free, and packaged in recyclable containers."
    },
    {
      q: "Where do you ship from?",
      a: "Our primary logistics distribution centers are located in San Francisco (US), Frankfurt (EU), and London (UK) to minimize delivery transit emissions."
    }
  ];

  return (
    <div className="contact-page-root">
      <div className="contact-hero">
        <div className="container">
          <span className="section-tag">CONNECT WITH US</span>
          <h1 className="contact-hero-title">How May We Assist You?</h1>
          <p className="contact-hero-desc">
            Our dedicated concierge team is available 7 days a week to assist with product guidance, 
            order tracking, styling consultations, or sustainability inquiries.
          </p>
        </div>
      </div>

      <div className="container contact-main-content">
        <div className="contact-grid">
          {/* Left: Contact Info */}
          <div className="contact-info-panel">
            <h2 className="panel-title">Get in Touch</h2>
            <p className="panel-sub">
              Have a question about an order or our materials? We're here to help.
            </p>

            <div className="info-cards-stack">
              <div className="contact-channel-card card-base">
                <div className="channel-icon-wrap"><Mail size={22} /></div>
                <div>
                  <h4>Email Concierge</h4>
                  <p>care@verdantliving.com</p>
                  <span>Average response time: 2 hours</span>
                </div>
              </div>

              <div className="contact-channel-card card-base">
                <div className="channel-icon-wrap"><Phone size={22} /></div>
                <div>
                  <h4>Phone Support</h4>
                  <p>+1 (800) 582-7326</p>
                  <span>Toll-free, Mon–Fri 9am–7pm PST</span>
                </div>
              </div>

              <div className="contact-channel-card card-base">
                <div className="channel-icon-wrap"><MapPin size={22} /></div>
                <div>
                  <h4>Flagship Atelier</h4>
                  <p>540 Eco Vista Way</p>
                  <span>San Francisco, CA 94107</span>
                </div>
              </div>

              <div className="contact-channel-card card-base">
                <div className="channel-icon-wrap"><Clock size={22} /></div>
                <div>
                  <h4>Showroom Hours</h4>
                  <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
                  <span>Sunday: 11:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Message Form */}
          <div className="contact-form-panel card-base">
            <h2 className="panel-title">Send a Message</h2>
            <p className="panel-sub">Fill out the form below and an advisor will reply promptly.</p>

            {submitted ? (
              <div className="contact-success-box">
                <CheckCircle2 size={48} className="success-icon" />
                <h3>Thank you, {formData.name || 'Friend'}!</h3>
                <p>Your message has been safely delivered to our concierge team. We will get back to you shortly at <strong>{formData.email}</strong>.</p>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g. Elena Rostova"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@example.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Inquiry Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Status">Order Status & Tracking</option>
                    <option value="Returns & Exchanges">Returns & Exchanges</option>
                    <option value="Product Sourcing">Sustainability & Product Sourcing</option>
                    <option value="Press & Partnership">Press & Editorial</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist your shopping experience?"
                    className="form-input textarea-field"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg submit-btn">
                  Send Message <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="contact-faq-section">
          <div className="section-header">
            <span className="section-tag">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="section-title">Answers to Common Inquiries</h2>
          </div>

          <div className="faq-accordion">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item card-base ${openFaq === idx ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className={`faq-chevron ${openFaq === idx ? 'rotated' : ''}`} />
                </div>
                {openFaq === idx && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

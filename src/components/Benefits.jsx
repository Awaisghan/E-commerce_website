import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones, Sparkles, Award } from 'lucide-react';
import './Benefits.css';

export default function Benefits() {
  const benefits = [
    {
      icon: <Truck size={26} />,
      title: "Carbon-Neutral Delivery",
      description: "Complimentary global shipping on orders over $150 with verified zero-emission transport."
    },
    {
      icon: <ShieldCheck size={26} />,
      title: "Encrypted Secure Payments",
      description: "256-bit SSL transaction protection with Apple Pay, cards, and flexible payment plans."
    },
    {
      icon: <RotateCcw size={26} />,
      title: "30-Day Effortless Returns",
      description: "Hassle-free return policy with pre-paid return labels and doorstep courier pickups."
    },
    {
      icon: <Headphones size={26} />,
      title: "24/7 Concierge Support",
      description: "Dedicated shopping advisors ready to help via live chat, email, or direct phone call."
    }
  ];

  return (
    <section className="benefits-section">
      <div className="container">
        <div className="benefits-grid">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-icon-wrapper">
                {benefit.icon}
              </div>
              <div className="benefit-content">
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-desc">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

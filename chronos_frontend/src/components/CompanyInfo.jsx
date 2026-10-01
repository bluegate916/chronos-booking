import { useState } from 'react';
import { Mail, Phone, MapPin, Send, ShieldCheck, Clock, Award } from 'lucide-react';
import './CompanyInfo.css';

export default function CompanyInfo() {
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your feedback! We will respond to ${feedbackEmail} if necessary.`);
    setFeedbackEmail('');
    setFeedbackText('');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Successfully subscribed! ${newsletterEmail} has been added to our newsletter.`);
    setNewsletterEmail('');
  };

  return (
    <div className="company-info-wrapper">
      {/* SECTION 1: ABOUT US */}
      <section className="grid-2-cols grid-2-cols-lg">
        <div>
          <span className="badge-text">Our Identity</span>
          <h2 className="section-title">Redefining Hourly Professional Workspaces</h2>
          <p className="section-description">
            Founded in 2026, <strong>Chronos Booking</strong> bridges the gap between remote flexibility and high-tier corporate infrastructure. 
            We offer frictionless, immediate hourly bookings for freelancers, corporate squads, and executive operators who need professional 
            spaces without long-term commitments.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Clock className="feature-icon" size={20} />
              <span className="feature-label">24/7 Access</span>
            </div>
            <div className="feature-card">
              <ShieldCheck className="feature-icon" size={20} />
              <span className="feature-label">Secure Rooms</span>
            </div>
            <div className="feature-card">
              <Award className="feature-icon" size={20} />
              <span className="feature-label">Modern Tech Facilities</span>
            </div>
          </div>
        </div>
        <div className="mission-card">
          <h3>Our On-Site Mission</h3>
          <p>
            Every room on our platform is physically optimized with dedicated fiber-optic internet hubs, 
            automated climatic regulators, and localized hardware projections to guarantee absolute productivity.
          </p>
        </div>
      </section>

      {/* SECTION 2: CONTACT FRONT DESK & FEEDBACK */}
      <section className="grid-2-cols grid-2-cols-md">
        {/* Contact Info Column */}
        <div className="info-card">
          <div className="card-header">
            <span className="badge-text">Customer Support</span>
            <h3>Contact Front Desk</h3>
            <p className="card-subtitle">Our customer experience squad is on standby to help optimize your reservation layout.</p>
          </div>

          <div className="contact-list">
            <div className="contact-item">
              <Phone className="icon" size={20} />
              <div>
                <span className="contact-item-title">Hotline Number</span>
                <span className="contact-item-value">+234 (0) 800-CHRONOS</span>
              </div>
            </div>
            <div className="contact-item">
              <Mail className="icon" size={20} />
              <div>
                <span className="contact-item-title">Support Email</span>
                <span className="contact-item-value">frontdesk@chronosbooking.com</span>
              </div>
            </div>
            <div className="contact-item">
              <MapPin className="icon" size={20} />
              <div>
                <span className="contact-item-title">Headquarters Axis</span>
                <span className="contact-item-value">Marina Tower, 4th Floor, Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Mail Form Column */}
        <div className="info-card">
          <div className="card-header">
            <h3>Send System Feedback</h3>
            <p className="card-subtitle">Noticed an error or want a specific layout upgrade? Share it with our engineers.</p>
          </div>
          
          <form onSubmit={handleFeedbackSubmit} className="form-container">
            <input 
              type="email" 
              placeholder="Your Email Address"
              value={feedbackEmail}
              onChange={(e) => setFeedbackEmail(e.target.value)}
              className="form-input"
              required 
            />
            <textarea 
              placeholder="Detail your experience or request here..."
              rows="3"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="form-textarea"
              required
            />
            <button type="submit" className="form-submit-btn">
              <Send size={16} /> Submit Feedback
            </button>
          </form>
        </div>
      </section>

      {/* SECTION 3: NEWSLETTER FOOTER BANNER */}
      <section className="newsletter-banner">
        <div className="newsletter-text">
          <h3>Join the Chronos Network</h3>
          <p>Receive priority email alerts regarding freshly registered boardrooms, flash weekend price slashes, and system updates.</p>
        </div>
        <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
          <input 
            type="email" 
            placeholder="Enter email address"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            className="newsletter-input"
            required 
          />
          <button type="submit" className="newsletter-btn">
            Subscribe
          </button>
        </form>
      </section>

    </div>
  );
}
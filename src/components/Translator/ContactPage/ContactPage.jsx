import React, { useState } from 'react';
import { Book, Briefcase, Clock, Mail, MapPin, Phone } from 'lucide-react';
import "./ContactPage.scss"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <div className="contact-left">
          <h1 className="contact-heading">You Will Grow, You Will Succeed. <span>We Promise That.</span></h1>
          <div className="benefits-container">
            <h3 className="benefits-title">Why Choose Us</h3>
            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Book size={20} />
                </div>
                <div className="benefit-content">
                  <h4>Continuous Learning</h4>
                  <p>Gain access to training, resources, and industry insights.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Briefcase size={20} />
                </div>
                <div className="benefit-content">
                  <h4>Career Advancement</h4>
                  <p>Work with global clients and expand your professional network.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Clock size={20} />
                </div>
                <div className="benefit-content">
                  <h4>Flexible Opportunities</h4>
                  <p>Choose projects that match your skills and schedule.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Mail size={20} />
                </div>
                <div className="benefit-content">
                  <h4>Supportive Community</h4>
                  <p>Collaborate with top professionals and grow together.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-info">
            <h3 className="info-title">Get In Touch</h3>
            <div className="info-grid">
              <div className="info-item">
                <Phone className="info-icon" />
                <div>
                  <h4>Phone</h4>
                  <p>0987654321</p>
                </div>
              </div>
              <div className="info-item">
                <Mail className="info-icon" />
                <div>
                  <h4>Email</h4>
                  <p>nammpse173557@ftp.edu.vn</p>
                </div>
              </div>
              <div className="info-item">
                <Clock className="info-icon" />
                <div>
                  <h4>Hours</h4>
                  <p>Mon - Sunday: 24/24</p>
                </div>
              </div>
              <div className="info-item">
                <MapPin className="info-icon" />
                <div>
                  <h4>Location</h4>
                  <p>Our Office Address</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="contact-right">
          <div className="form-container">
            <h2 className="form-title">Send Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={5}
                />
              </div>
              
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
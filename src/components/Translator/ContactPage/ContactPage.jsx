import React, { useState } from 'react';
import { Book, Briefcase, Clock, Mail, MapPin, Phone } from 'lucide-react';
import './ContactPage.scss';

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
    <div className="ctc-container">
      <div className="ctc-left">
        <h1 className="ctc-promise">You Will Grow, You Will Succeed. We Promise That.</h1>
        <p className="ctc-description">
          At InterTransConnect, we believe in your potential and are committed to helping you
          achieve success in the world of translation and interpretation. 🌍
        </p>
        <ul className="ctc-benefits">
          <li className="ctc-benefit">
            <Book className="ctc-icon" size={18} />
            <span>Continuous Learning — Gain access to training, resources, and industry insights.</span>
          </li>
          <li className="ctc-benefit">
            <Briefcase className="ctc-icon" size={18} />
            <span>Career Advancement — Work with global clients and expand your professional network.</span>
          </li>
          <li className="ctc-benefit">
            <Clock className="ctc-icon" size={18} />
            <span>Flexible Opportunities — Choose projects that match your skills and schedule.</span>
          </li>
          <li className="ctc-benefit">
            <Mail className="ctc-icon" size={18} />
            <span>Supportive Community — Collaborate with top professionals and grow together...</span>
          </li>
        </ul>
        <div className="ctc-info">
          <div className="ctc-item">
            <Phone className="ctc-icon" size={18} />
            <span>Call for us:</span>
            <p>0987654321</p>
          </div>
          <div className="ctc-item">
            <Mail className="ctc-icon" size={18} />
            <span>Send email:</span>
            <p>nammpse173557@ftp.edu.vn</p>
          </div>
          <div className="ctc-item">
            <Clock className="ctc-icon" size={18} />
            <span>Opening hours:</span>
            <p>Mon - Sunday: 24/24</p>
          </div>
          <div className="ctc-item">
            <MapPin className="ctc-icon" size={18} />
            <span>Office:</span>
            <p>Location</p>
          </div>
        </div>
      </div>
      <div className="ctc-right">
        <h2 className="ctc-form-title">Contact Info</h2>
        <form className="ctc-form" onSubmit={handleSubmit}>
          <div className="ctc-form-group">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="ctc-form-input"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="ctc-form-input"
            />
          </div>
          <div className="ctc-form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="ctc-form-input"
            />
          </div>
          <div className="ctc-form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="ctc-form-input ctc-form-textarea"
            />
          </div>
          <button type="submit" className="ctc-form-submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
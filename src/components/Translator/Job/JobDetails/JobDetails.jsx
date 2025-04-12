import React from 'react';
import './JobDetails.scss';

const JobDetails = () => {
  return (
    <div className="job-listing-container">
      <header className="header">
        <button className="back-btn">BACK</button>
        <button className="next-btn">NEXT</button>
      </header>

      <main className="main-content">
        <div className="job-details2">
          <h1>Marketing Translation</h1>
          <div className="job-meta">
            <span className="status">New Customer</span>
            <span className="type">Commerce</span>
            <span className="time">Full time</span>
            <span className="salary">$4000-$4200</span>
            <span className="location">Việt Nam</span>
          </div>

  
          <section className="section">
            <h2>Job Description</h2>
            <p>
              Marketing translation goes beyond simple word-for-word conversion. It involves adapting brand messages, slogans, and promotional content to resonate with different cultural and linguistic audiences. A well-executed marketing translation ensures that the original intent, emotion, and persuasive power remain intact, making it an essential service for businesses expanding into international markets.
            </p>
            <h3>Key Aspects of Marketing Translation:</h3>
            <ul>
              <li><span className="check">✓</span> Localization: Adapting tone, style, and cultural references to match the target market.</li>
              <li><span className="check">✓</span> Brand Consistency: Ensuring the message aligns with the company’s identity across languages.</li>
              <li><span className="check">✓</span> SEO Optimization: Translating and adapting keywords for global search rankings.</li>
              <li><span className="check">✓</span> Creative Adaptation: Maintaining emotional impact while adjusting phrasing for different audiences.</li>
              <li><span className="check">✓</span> Cross-Channel Integration: Applying translated content across websites, social media, and advertising.</li>
              <li><span className="check">✓</span> Marketing translation helps brands connect with international customers, increase engagement, and build trust across diverse markets.</li>
            </ul>
          </section>

     
          <section className="section">
            <h2>Key Responsibilities</h2>
            <h3>Translate & Localize Content</h3>
            <ul>
              <li><span className="check">✓</span> Convert marketing materials (ads, brochures, websites, social media posts, product descriptions) while maintaining cultural and brand consistency.</li>
            </ul>
            <h3>Ensure Brand Voice & Tone</h3>
            <ul>
              <li><span className="check">✓</span> Adapt messaging to fit the target audience while preserving the brand’s unique voice and style.</li>
            </ul>
            <h3>SEO & Keyword Optimization</h3>
            <ul>
              <li><span className="check">✓</span> Translate and optimize keywords for search engines to improve online visibility in different languages.</li>
            </ul>
            <h3>Transcreation & Copywriting</h3>
            <ul>
              <li><span className="check">✓</span> Rewrite slogans, taglines, and promotional content to evoke the same emotions as the original.</li>
            </ul>
          </section>

 
          <section className="section">
            <h2>Professional Skills</h2>
            <ul>
              <li><span className="check">✓</span> Language Proficiency: Fluent in both the source and target languages, with strong grammar, vocabulary, and writing skills.</li>
              <li><span className="check">✓</span> Marketing & Branding Knowledge: Understanding of marketing strategies, consumer psychology, and brand positioning across cultures.</li>
              <li><span className="check">✓</span> Transcreation & Copywriting: Ability to create and adapt slogans, taglines, and marketing messages while maintaining the original intent.</li>
            </ul>
          </section>
        </div>

 
        <aside className="sidebar">
          <button className="apply-btn">Apply Job</button>
          <div className="job-overview">
            <h2>Job Overview</h2>
            <div className="overview-item">
              <span className="icon">👤</span> Job Title: Marketing Translation
            </div>
            <div className="overview-item">
              <span className="icon">📂</span> Category: Commerce
            </div>
            <div className="overview-item">
              <span className="icon">💰</span> Offered Salary: $4000
            </div>
            <div className="overview-item">
              <span className="icon">📍</span> Location: Việt Nam
            </div>
          </div>
          <div className="message-form">
            <h2>Send Us Message</h2>
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <input type="tel" placeholder="Phone Number" />
            <textarea placeholder="Message"></textarea>
            <button className="send-btn">Send Message</button>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default JobDetails;
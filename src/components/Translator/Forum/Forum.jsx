import React from 'react';
import './Forum.scss';

const Forum = () => {
  return (
    <div className="smapp-social-media-app">
      <div className="smapp-sidebar">
        <div className="smapp-sidebar-section">
          <div className="smapp-sidebar-item smapp-active">
            <div className="smapp-sidebar-icon smapp-newest">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm2-10h-2v8h2V6z" />
              </svg>
            </div>
            <div className="smapp-sidebar-content">
              <h3>Newest and Recent</h3>
              <p>Find the latest update</p>
            </div>
          </div>
          
          <div className="smapp-sidebar-item">
            <div className="smapp-sidebar-icon smapp-popular">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
            </div>
            <div className="smapp-sidebar-content">
              <h3>Popular of the day</h3>
              <p>Shots featured today by curators</p>
            </div>
          </div>
          
          <div className="smapp-sidebar-item">
            <div className="smapp-sidebar-icon smapp-following">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>
            <div className="smapp-sidebar-content">
              <h3>Following <span className="smapp-badge">24</span></h3>
              <p>Explore from your favorite person</p>
            </div>
          </div>
        </div>
        
        <div className="smapp-sidebar-section">
          <h2>Popular Tags</h2>
          
          <div className="smapp-tag-item">
            <div className="smapp-tag-icon smapp-technology">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
              </svg>
            </div>
            <div className="smapp-tag-content">
              <h3>Technology</h3>
              <p>82,645 Posted by this tag</p>
            </div>
          </div>
          
          <div className="smapp-tag-item">
            <div className="smapp-tag-icon smapp-financial">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
              </svg>
            </div>
            <div className="smapp-tag-content">
              <h3>Financial & Economic</h3>
              <p>65,523 Posted • Trending in VIE</p>
            </div>
          </div>
          
          <div className="smapp-tag-item">
            <div className="smapp-tag-icon smapp-game">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z" />
              </svg>
            </div>
            <div className="smapp-tag-content">
              <h3>Game</h3>
              <p>51,354 • Trending in</p>
            </div>
          </div>
          
          <div className="smapp-tag-item">
            <div className="smapp-tag-icon smapp-education">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
              </svg>
            </div>
            <div className="smapp-tag-content">
              <h3>Education</h3>
              <p>48,029 Posted by this tag</p>
            </div>
          </div>
          
          <div className="smapp-tag-item">
            <div className="smapp-tag-icon smapp-commerce">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
            <div className="smapp-tag-content">
              <h3>Commerce</h3>
              <p>51,354 • Trending in VIE</p>
            </div>
          </div>
          
          <div className="smapp-tag-item">
            <div className="smapp-tag-icon smapp-marketing">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z" />
              </svg>
            </div>
            <div className="smapp-tag-content">
              <h3>Marketing & Advertising</h3>
              <p>82,645 Posted by this tag</p>
            </div>
          </div>
        </div>
        
        <div className="smapp-sidebar-section">
          <h2>Pinned Group <span className="smapp-arrow-icon">→</span></h2>
          
          <div className="smapp-group-item">
            <div className="smapp-group-icon smapp-game">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z" />
              </svg>
            </div>
            <div className="smapp-group-content">
              <h3>Game</h3>
              <p>82,645 Posted by this tag</p>
            </div>
          </div>
          
          <div className="smapp-group-item">
            <div className="smapp-group-icon smapp-financial">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
              </svg>
            </div>
            <div className="smapp-group-content">
              <h3>Financial & Economic</h3>
              <p>65,523 Posted • Trending</p>
            </div>
          </div>
          
          <div className="smapp-group-item">
            <div className="smapp-group-icon smapp-commerce">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
            <div className="smapp-group-content">
              <h3>Commerce</h3>
              <p>51,354 • Trending in Bangladesh</p>
            </div>
          </div>
          
          <div className="smapp-group-item">
            <div className="smapp-group-icon smapp-education">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
              </svg>
            </div>
            <div className="smapp-group-content">
              <h3>Education</h3>
              <p>48,029 Posted by this tag</p>
            </div>
          </div>
          
          <div className="smapp-group-item">
            <div className="smapp-group-icon smapp-marketing">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z" />
              </svg>
            </div>
            <div className="smapp-group-content">
              <h3>Marketing & Advertising</h3>
              <p>51,354 • Trending in Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="smapp-main-content">
        <div className="smapp-post-header">
          <div className="smapp-user-avatar">
            <img src="/api/placeholder/40/40" alt="User avatar" />
          </div>
          <div className="smapp-post-input">
            <input type="text" placeholder="Let's share what going on your mind..." />
          </div>
          <button className="smapp-create-post-btn">Create Post</button>
        </div>
        
        <div className="smapp-post-feed">
          <div className="smapp-post-card">
            <div className="smapp-post-image">
              <img src="/api/placeholder/200/200" alt="Marketing post" className="smapp-marketing-image" />
            </div>
            <div className="smapp-post-content">
              <div className="smapp-post-title-row">
                <h2>Marketing & Advertising</h2>
                <div className="smapp-like-icon smapp-not-liked">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
                  </svg>
                </div>
              </div>
              
              <div className="smapp-post-tags">
                <span className="smapp-tag">Marketing</span>
                <span className="smapp-tag">DigitalMarketing</span>
                <span className="smapp-tag">MarketingTips</span>
              </div>
              
              <div className="smapp-post-meta">
                <div className="smapp-post-author">
                  <img src="/api/placeholder/30/30" alt="Lady Hue" className="smapp-author-avatar" />
                  <div className="smapp-author-info">
                    <span className="smapp-author-name">LadyHue •</span>
                    <span className="smapp-post-time">3 weeks ago</span>
                  </div>
                </div>
                
                <div className="smapp-post-stats">
                  <div className="smapp-stat">
                    <span className="smapp-stat-value">651,324</span>
                    <span className="smapp-stat-label">Views</span>
                  </div>
                  <div className="smapp-stat">
                    <span className="smapp-stat-value">36,6545</span>
                    <span className="smapp-stat-label">Likes</span>
                  </div>
                  <div className="smapp-stat">
                    <span className="smapp-stat-value">56</span>
                    <span className="smapp-stat-label">comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="smapp-post-card">
            <div className="smapp-post-image">
              <img src="/api/placeholder/200/200" alt="Financial chart" className="smapp-financial-image" />
            </div>
            <div className="smapp-post-content">
              <div className="smapp-post-title-row">
                <h2>Financial & Economic</h2>
                <div className="smapp-like-icon smapp-liked">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
              
              <div className="smapp-post-tags">
                <span className="smapp-tag">Finance</span>
                <span className="smapp-tag">FinancialPlanning</span>
                <span className="smapp-tag">MoneyManagement</span>
              </div>
              
              <div className="smapp-post-meta">
                <div className="smapp-post-author">
                  <img src="/api/placeholder/30/30" alt="Lady Hue" className="smapp-author-avatar" />
                  <div className="smapp-author-info">
                    <span className="smapp-author-name">LadyHue •</span>
                    <span className="smapp-post-time">3 days ago</span>
                  </div>
                </div>
                
                <div className="smapp-post-stats">
                  <div className="smapp-stat">
                    <span className="smapp-stat-value">244,564</span>
                    <span className="smapp-stat-label">Views</span>
                  </div>
                  <div className="smapp-stat">
                    <span className="smapp-stat-value">10,920</span>
                    <span className="smapp-stat-label">Likes</span>
                  </div>
                  <div className="smapp-stat">
                    <span className="smapp-stat-value">184</span>
                    <span className="smapp-stat-label">comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="smapp-post-card">
            <div className="smapp-post-image">
              <img src="/api/placeholder/200/200" alt="Technology icons" className="smapp-tech-image" />
            </div>
            <div className="smapp-post-content">
              <div className="smapp-post-title-row">
                <h2>Technology</h2>
                <div className="smapp-like-icon smapp-liked">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
              
              <div className="smapp-post-tags">
                <span className="smapp-tag">Technology</span>
                <span className="smapp-tag">TechTrends</span>
                <span className="smapp-tag">DigitalTransformation</span>
              </div>
              
              <div className="smapp-post-meta">
                <div className="smapp-post-author">
                  <img src="/api/placeholder/30/30" alt="Lady Hue" className="smapp-author-avatar" />
                  <div className="smapp-author-info">
                    <span className="smapp-author-name">LadyHue •</span>
                    <span className="smapp-post-time">1 week ago</span>
                  </div>
                </div>
                
                <div className="smapp-post-stats">
                  <div className="smapp-stat">
                    <span className="smapp-stat-value">601,066</span>
                    <span className="smapp-stat-label">Views</span>
                  </div>
                  <div className="smapp-stat">
                    <span className="smapp-stat-value">24,753</span>
                    <span className="smapp-stat-label">Likes</span>
                  </div>
                  <div className="smapp-stat">
                    <span className="smapp-stat-value">209</span>
                    <span className="smapp-stat-label">comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="smapp-post-card">
            <div className="smapp-post-image">
              <img src="/api/placeholder/200/200" alt="Education illustration" className="smapp-education-image" />
            </div>
            <div className="smapp-post-content">
              <div className="smapp-post-title-row">
                <h2>Education</h2>
                <div className="smapp-like-icon smapp-not-liked">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
                  </svg>
                </div>
              </div>
              
              <div className="smapp-post-tags">
                <span className="smapp-tag">Education</span>
                <span className="smapp-tag">Learning</span>
                <span className="smapp-tag">Teaching</span>
              </div>
              
              <div className="smapp-post-meta">
                <div className="smapp-post-author">
                  <img src="/api/placeholder/30/30" alt="Lady Hue" className="smapp-author-avatar" />
                  <div className="smapp-author-info">
                    <span className="smapp-author-name">LadyHue •</span>
                    <span className="smapp-post-time">2 weeks ago</span>
                  </div>
                </div>
                
                <div className="smapp-post-stats">
                  <div className="smapp-stat">
                    <span className="smapp-stat-value">964,258</span>
                    <span className="smapp-stat-label">Views</span>
                  </div>
                  <div className="smapp-stat">
                    <span className="smapp-stat-value">64,755</span>
                    <span className="smapp-stat-label">Likes</span>
                  </div>
                  <div className="smapp-stat">
                    <span className="smapp-stat-value">44</span>
                    <span className="smapp-stat-label">comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
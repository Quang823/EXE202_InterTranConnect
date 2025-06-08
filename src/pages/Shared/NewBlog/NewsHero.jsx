import { Book } from "lucide-react";

const NewsHero = () => {
  return (
    <section className="news-hero">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="news-icon-wrapper">
              <Book className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="hero-title">Connect News & Insights</h1>
          <p className="hero-subtitle">
            A platform connecting professional translators and interpreters with
            users. Share knowledge, experience, and inspiring stories.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">1,200+</span>
              <span className="stat-label">Articles</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Authors</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Readers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsHero;

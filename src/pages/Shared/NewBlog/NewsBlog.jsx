import NewsHero from "./NewsHero";
import BlogCard from "./BlogCard";
import BlogSidebar from "./BlogSidebar";
import "./NewsBlog.scss";

const NewsBlog = () => {
  const blogPosts = [
    {
      title: "The Art of Simultaneous Interpretation: From Theory to Practice",
      excerpt:
        "Explore the techniques and secrets to becoming a professional simultaneous interpreter, from basic practice to application in international conferences.",
      author: "Nguyen Thi Lan",
      date: "November 15, 2024",
      category: "Professional Skills",
      image: "photo-1434494878577-86c23bcb06b9",
      readTime: "8",
      featured: true,
    },
    {
      title: "How AI Technology is Transforming the Translation Industry?",
      excerpt:
        "Learn about the impact of artificial intelligence on the translation industry and how experts can adapt to these changes.",
      author: "Tran Van Minh",
      date: "November 12, 2024",
      category: "Technology",
      image: "photo-1488590528505-98d2b5aba04b",
      readTime: "6",
    },
    {
      title: "Building a Personal Brand in the Translation Field",
      excerpt:
        "A detailed guide on how to build and develop a personal brand to attract clients and increase the value of your services.",
      author: "Le Thi Huong",
      date: "November 10, 2024",
      category: "Career",
      image: "photo-1486312338219-ce68d2c6f44d",
      readTime: "5",
    },
    {
      title: "Cultural Challenges in International Translation",
      excerpt:
        "An analysis of the cultural difficulties translators often face and effective ways to address them.",
      author: "Pham Quoc Viet",
      date: "November 8, 2024",
      category: "Culture",
      image: "photo-1488590528505-98d2b5aba04b",
      readTime: "7",
    },
    {
      title:
        "Time Management Skills for Freelance Translators and Interpreters",
      excerpt:
        "Sharing effective time management methods to boost productivity and balance work and life.",
      author: "Do Thi Mai",
      date: "November 5, 2024",
      category: "Soft Skills",
      image: "photo-1461749280684-dccba630e2f6",
      readTime: "4",
    },
    {
      title: "New Trends in Medical Translation",
      excerpt:
        "An overview of the latest trends and requirements in medical translation, including specialized terminology and international standards.",
      author: "Vu Dinh Hao",
      date: "November 3, 2024",
      category: "Specialized Fields",
      image: "photo-1581091226825-a6a2a5aee158",
      readTime: "9",
    },
  ];

  return (
    <div className="news-blog">
      <NewsHero />

      <div className="container mx-auto px-4 py-12">
        <div className="blog-layout">
          <main className="blog-main">
            <div className="blog-header">
              <h2>Latest Articles</h2>
              <p>
                Stay updated with the latest knowledge and experiences in the
                translation field
              </p>
            </div>

            <div className="blog-grid">
              {blogPosts.map((post, index) => (
                <BlogCard key={index} {...post} />
              ))}
            </div>

            <div className="blog-pagination">
              <button className="pagination-btn pagination-prev" disabled>
                Previous Page
              </button>
              <div className="pagination-numbers">
                <button className="pagination-number active">1</button>
                <button className="pagination-number">2</button>
                <button className="pagination-number">3</button>
                <span className="pagination-dots">...</span>
                <button className="pagination-number">12</button>
              </div>
              <button className="pagination-btn pagination-next">
                Next Page
              </button>
            </div>
          </main>

          <BlogSidebar />
        </div>
      </div>
    </div>
  );
};

export default NewsBlog;

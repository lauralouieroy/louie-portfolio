import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import '../components/Portfolio.css';

export const Portfolio = () => {
  const works = [
    { img: img1, title: 'Modern Agency Website' },
    { img: img2, title: 'Portfolio Design System' },
    { img: img3, title: 'Creative Landing Page' },
  ];

  const blogs = [
    { img: img1, title: 'UX Research and Testing', read: '5 min read' },
    { img: img2, title: 'Creative Strategy Design', read: '4 min read' },
    { img: img3, title: 'Design Systems and Branding', read: '6 min read' },
  ];

  return (
    <section id="portfolio" className="portfolio-section">
                <h2 className="text-sm font-semibold uppercase mb-2">Portfolio</h2>
      <h1 className="portfolio-title">Latest Works</h1>
      <div className="portfolio-grid">
        {works.map((work, i) => (
          <div key={i} className="portfolio-card">
            <img src={work.img} alt={work.title} />
            <h3>{work.title}</h3>
          </div>
        ))}
      </div>

      <div id="blog" className="blog-section">
        <h2 className="text-sm font-semibold uppercase mb-2">Blog</h2>
        <h1 className="blog-title">Design Insights & Trends</h1>

        <div className="blog-grid">
          {blogs.map((blog, i) => (
            <div key={i} className="blog-card">
              <img src={blog.img} alt={blog.title} />
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">{blog.read}</p>
                <h3>{blog.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

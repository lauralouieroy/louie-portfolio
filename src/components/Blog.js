import "../components/Blog.css";

import blog1 from "../assets/img1.jpg";
import blog2 from "../assets/img2.jpg";
import blog3 from "../assets/img3.jpg";

export const Blog = () => {
  const blogs = [
    {
      title: "Building Scalable Web Applications",
      desc: "A guide on structuring frontend and backend systems for scalability using React and Spring Boot.",
      read: "5 min read",
      img: blog1,
    },
    {
      title: "From Angular to React Migration",
      desc: "Key learnings and strategies when transitioning enterprise applications from Angular to React.",
      read: "6 min read",
      img: blog2,
    },
    {
      title: "Improving UI/UX for Better Engagement",
      desc: "How small UI/UX improvements can significantly enhance user experience and performance.",
      read: "4 min read",
      img: blog3,
    },
  ];

  return (
    <section id="blog" className="blogs">
      <div className="blog-container">

        <h1 className="section-title">Blogs</h1>

        <div className="blog-list">
          {blogs.map((blog, index) => (
            <div key={index} className="blog-item">

              {/* IMAGE */}
              <div className="blog-image">
                <img src={blog.img} alt={blog.title} />
              </div>

              {/* CONTENT */}
              <div className="blog-left">
                <span className="read-time">{blog.read}</span>
                <h2>{blog.title}</h2>
                <p>{blog.desc}</p>
              </div>

              {/* BUTTON */}
              <div className="blog-right">
                <button className="read-btn">Read More →</button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

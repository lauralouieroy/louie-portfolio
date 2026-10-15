import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import { SiAngular, SiJavascript, SiReact, SiSpringboot } from "react-icons/si";
import "./Blog.css";
import { MediaTile } from "./MediaTile";

import { ScrollReveal } from "./Utils/ScrollReveal";

function useVisibleCount() {
  const getCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth <= 900) return 1;
    if (window.innerWidth <= 1199) return 2;
    return 3;
  };

  const [count, setCount] = useState(getCount);

  useEffect(() => {
    const onResize = () => setCount(getCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return count;
}

export const Blog = () => {
  const blogs = [
    {
      title: "Understanding React Server Components",
      desc:
        "A deep dive into React Server Components and how they improve rendering performance and scalability for modern enterprise applications.",
      read: "5 min read",
      date: "May 20, 2024",
      icon: SiReact,
      tone: "#149eca",
      category: "React",

      content: `
React Server Components allow developers to move part of the rendering logic to the server, improving performance and reducing unnecessary JavaScript sent to the client.

Unlike traditional client-side rendering, Server Components help optimize large enterprise applications by reducing bundle size and improving initial page load speed.

Key benefits include:

• Better performance
• Reduced client-side JavaScript
• Improved scalability
• Cleaner separation of server and client logic

In real-world enterprise applications, this becomes especially useful for dashboard systems, admin portals, and data-heavy applications where performance directly affects user experience.

My approach usually involves combining Server Components with proper API architecture and lazy loading strategies to maximize efficiency.
      `,
    },

    {
      title: "10 JavaScript Tricks You Should Know",
      desc:
        "Useful JavaScript tips that can improve your daily coding workflow and help write cleaner code.",
      read: "4 min read",
      date: "May 10, 2024",
      icon: SiJavascript,
      tone: "#e0b400",
      category: "JavaScript",

      content: `
JavaScript offers many small tricks that can greatly improve code quality and productivity.

Some useful ones include:

• Optional chaining
• Nullish coalescing
• Array destructuring
• Object spread operators
• Short-circuit evaluation

These patterns help reduce boilerplate code and make applications easier to maintain.

In enterprise projects, writing clean JavaScript matters because multiple developers work on the same codebase.
      `,
    },

    {
      title: "How I Structure My Angular Projects",
      desc:
        "My personal approach to structuring scalable React applications for enterprise-level development.",
      read: "6 min read",
      date: "Apr 28, 2024",
      icon: SiAngular,
      tone: "#dd0031",
      category: "Frontend",

      content: `
A scalable React project should be organized for maintainability and long-term collaboration.

My common structure includes:

• components/
• pages/
• services/
• hooks/
• utils/
• layouts/
• assets/

This keeps code modular and prevents large monolithic files.

For enterprise systems, I also prioritize reusable UI components, centralized API services, and clean folder naming conventions.
      `,
    },

    {
      title: "Spring Boot Performance Optimization",
      desc:
        "Practical techniques for improving backend performance and optimizing API response times.",
      read: "7 min read",
      date: "Apr 15, 2024",
      icon: SiSpringboot,
      tone: "#6db33f",
      category: "Backend",

      content: `
Spring Boot performance optimization focuses on improving response times and backend efficiency.

Important strategies include:

• Proper database indexing
• Query optimization
• Pagination
• Batch processing
• Caching using Redis
• Async processing

For enterprise applications like SSO systems and onboarding dashboards, backend performance is critical because delays directly affect operations and business flow.
      `,
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const visibleCount = useVisibleCount();
  const canSlide = blogs.length > visibleCount;

  const nextSlide = () => {
    if (!canSlide) return;
    setStartIndex((prev) => (prev + 1) % blogs.length);
  };

  const prevSlide = () => {
    if (!canSlide) return;
    setStartIndex((prev) =>
      prev === 0 ? blogs.length - 1 : prev - 1
    );
  };

  const visibleBlogs = Array.from({ length: visibleCount }, (_, i) => {
    return blogs[(startIndex + i) % blogs.length];
  });

  return (
    <>
      <ScrollReveal>
        <section id="blog" className="blogs">
          <div className="blog-container">
            <div className="blog-header">
              <div>
                <p className="blog-label">LATEST BLOGS</p>

                <h1 className="section-title">
                  Sharing <span>knowledge</span>
                </h1>
              </div>

              <div className="carousel-controls">
                <button onClick={prevSlide} disabled={!canSlide}>
                  <FaArrowLeft />
                </button>

                <button onClick={nextSlide} disabled={!canSlide}>
                  <FaArrowRight />
                </button>
              </div>
            </div>

            <div className="blog-grid">
              {visibleBlogs.map((blog, index) => (
                <div
                  key={`${blog.title}-${index}`}
                  className="blog-card"
                  onClick={() => setSelectedBlog(blog)}
                >
                  <MediaTile tone={blog.tone} label={blog.category} className="blog-image">
                    <blog.icon />
                  </MediaTile>

                  <div className="blog-content">
                    <p className="blog-date">{blog.date}</p>

                    <h2>{blog.title}</h2>

                    <p>{blog.desc}</p>

                    <div className="blog-footer">
                      <span>{blog.read}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {selectedBlog && (
        <div className="blog-modal">
          <div className="blog-modal-content">
            <button
              className="close-modal"
              onClick={() => setSelectedBlog(null)}
            >
              <FaTimes />
            </button>

            <MediaTile
              tone={selectedBlog.tone}
              label={selectedBlog.category}
              className="modal-image media-tile--large"
            >
              <selectedBlog.icon />
            </MediaTile>

            <h2>{selectedBlog.title}</h2>

            <p>{selectedBlog.desc}</p>

            <h4>Category</h4>
            <p>{selectedBlog.category}</p>

            <h4>Full Article</h4>
            <p className="blog-full-content">
              {selectedBlog.content}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

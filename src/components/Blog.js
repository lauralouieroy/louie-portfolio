import { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import "./Blog.css";

import blog1 from "../assets/blog1.png";
import blog2 from "../assets/blog2.png";
import blog3 from "../assets/blog3.png";
import blog4 from "../assets/blog4.png";

import { ScrollReveal } from "./Utils/ScrollReveal";

export const Blog = () => {
  const blogs = [
    {
      title: "Understanding React Server Components",
      desc:
        "A deep dive into React Server Components and how they improve rendering performance and scalability for modern enterprise applications.",
      read: "5 min read",
      date: "May 20, 2024",
      img: blog1,
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
      img: blog2,
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
      img: blog3,
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
      img: blog4,
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

  const nextSlide = () => {
    if (blogs.length <= 3) return;

    setStartIndex((prev) => (prev + 1) % blogs.length);
  };

  const prevSlide = () => {
    if (blogs.length <= 3) return;

    setStartIndex((prev) =>
      prev === 0 ? blogs.length - 1 : prev - 1
    );
  };

  const isMobile = window.innerWidth <= 900;

const visibleBlogs =  isMobile
    ? [blogs[startIndex]]
    : blogs.length <= 3
    ? blogs
    : [
        blogs[startIndex],
        blogs[(startIndex + 1) % blogs.length],
        blogs[(startIndex + 2) % blogs.length],
      ];

  return (
    <>
    <ScrollReveal>
      <section id="blog" className="blogs">
        <div className="blog-container">

          {/* HEADER */}
          <div className="blog-header">
            <div>
              <p className="blog-label">LATEST BLOGS</p>

              <h1 className="section-title">
                Sharing <span>knowledge</span>
              </h1>
            </div>

            {/* ARROWS */}
            <div className="carousel-controls">
              <button
                onClick={prevSlide}
                disabled={blogs.length <= 3}
              >
                <FaArrowLeft />
              </button>

              <button
                onClick={nextSlide}
                disabled={blogs.length <= 3}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>

          {/* BLOG GRID */}
          <div className="blog-grid">
            {visibleBlogs.map((blog, index) => (
              <div
                key={index}
                className="blog-card"
                onClick={() => setSelectedBlog(blog)}
              >
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="blog-image"
                />

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

      {/* MODAL */}
      {selectedBlog && (
        <div className="blog-modal">
          <div className="blog-modal-content">
            <button
              className="close-modal"
              onClick={() => setSelectedBlog(null)}
            >
              <FaTimes />
            </button>

            <img
              src={selectedBlog.img}
              alt={selectedBlog.title}
              className="modal-image"
            />

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
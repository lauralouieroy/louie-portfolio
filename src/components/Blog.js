import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCode,
  FaCompass,
  FaLaptopCode,
  FaTimes,
} from "react-icons/fa";
import hackathonTeam from "../assets/blog/app-builders-hackathon.png";
import wardenLogo from "../assets/blog/warden-logo.webp";
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
      title: "Sail Off Without a Map",
      desc:
        "From welding and electrical tracks pointed toward the sea, to HUMSS, to a BSIT path I didn’t choose — and somehow grew to love.",
      read: "8 min read",
      date: "Mar 12, 2024",
      icon: FaCompass,
      tone: "#5b8fd4",
      category: "Journey",
      content: `
When I was young, I didn’t really know where I was headed. I only knew that adults around me seemed sure — and that their certainty was quieter than my confusion.

In high school, my parents guided a lot of the choices. They steered me toward practical, technical paths. I took Welding as my TVE in junior high, then Electrical in senior high, all pointed toward becoming a seaman. My father is a seaman, so those tracks made sense to him: skills you can hold in your hands, a future that looked familiar from his own life. I followed because that was the map I was given, even when I wasn’t sure the destination was mine.

Somewhere along the way I said I wanted to shift to HUMSS. It still left a door open toward the seaman path, but it also felt like room to breathe — language, people, stories — something wider than the workshop floor. I was trying to find a version of “forward” that didn’t feel like I was only wearing someone else’s uniform.

By college, I had started to aspire to become a teacher. That felt honest. I could picture myself explaining things, helping someone else understand, standing in front of a room that needed patience more than prestige. Then my mom said I should take BSIT.

That moment still sits with me: another turn on a route I didn’t draw. I didn’t fight the current the way dramatic stories do. I enrolled. I showed up. And then something unexpected happened — while studying Information Technology, I began to enjoy it.

Not all at once. First it was small wins: a program that finally ran, a design that made sense, a problem that unlocked after hours of staring. Then it became identity. The same curiosity that once felt lost at sea started docking somewhere real — systems, interfaces, logic, the craft of building tools people use.

Looking back, I didn’t sail off with a clean map. I sailed with instructions, redirects, and a few quiet rebellions. Welding. Electrical. HUMSS. The dream of teaching. The push into BSIT. What I know now is that some destinations only become yours after you’ve already left the shore — and that loving the work can arrive later than the enrollment form.

I still carry respect for the path my parents imagined for me. I also carry the proof that a life can change course mid-voyage. I didn’t choose every wave. I did choose to keep learning how to steer.
      `,
    },
    {
      title: "As a Software Engineer",
      desc:
        "After BSIT at CvSU Carmona, I applied across BA, QA, and Dev — started as an IT Trainee, and grew into the Software Engineer I am today.",
      read: "8 min read",
      date: "Jun 8, 2024",
      icon: FaCode,
      tone: "#2d3748",
      category: "Career",
      content: `
If Sail Off Without a Map was about arriving at BSIT by a path I didn’t fully choose, this chapter is about what happened after I chose to stay.

I graduated with a Bachelor of Science in Information Technology from Cavite State University — Carmona Campus (August 2018 – April 2023). The diploma felt like a shore I’d finally reached — and also like standing at another unmarked coastline. I started applying to many information technology openings: Business Analyst, Quality Assurance, developer roles. I wasn’t picking a single identity yet. I was casting a wide net, hoping one door would open into real work.

That door opened as an IT Trainee.

Trainee life was the first time the classroom turned into production systems, tickets, and people who depended on what you shipped. I learned how teams actually move — reading requirements, debugging under pressure, asking better questions, and earning trust one small delivery at a time. The title was humble. The growth wasn’t.

From there I grew into Software Engineer at Software Ventures International – Software Service Corporation in Ortigas, Pasig City (August 2023 – Present) — the role I hold now.

As a Software Engineer, the work is less about a single stack and more about owning outcomes across systems people rely on every day.

I’ve helped build and enhance a mobile-first Authentication and Single Sign-On (SSO) platform — secure, responsive access across devices and applications. That work stretched into integrations with KYC Onboarding, KYC Viewer, SSO Administration, and Role-Based Access Management: identity verification, user and access management, application integration, and safer onboarding flows. Privacy and access aren’t slides in a deck; they’re product surfaces you design and defend.

I’ve also contributed to modernizing a loan origination and credit information system — translating legacy business processes into a React and Spring Boot foundation so the product can scale instead of stalling on old architecture. On the banking side, I developed credit-card batch-processing programs that load, encrypt, validate, and transmit customer KYC data to banking clients, strengthening the reliability of decisioning and onboarding.

The work isn’t only “fintech screens.” I’ve enhanced an employee timekeeping system with biometric clock in/out, shift scheduling, swap requests, and mobile-friendly attendance and leave flows. I’ve improved payroll by updating BIR, SSS, and HDMF reporting templates, strengthening 13th-month processing, and adding version tracking for compliance and auditability. I’ve integrated Keycloak-based role management into an HR file and access system so authorization lives in one place. I’ve built government transaction-processing modules with validation and downstream batch work. I’ve automated bulk uploads and exception reporting for a dealership management system while linking customer and vehicle records — less manual chaos, more consistent data.

And beyond tickets: I’ve mentored programmer trainees as an instructor and panelist — usability, design practices, web services, database integration — because I remember what it felt like to be the one still learning the ropes.

So when I say “as a Software Engineer,” I mean this: after CvSU Carmona I applied broadly across BA, QA, and Dev; I started as an IT Trainee; and I grew into an engineer who ships SSO and identity, modernizes legacy credit systems, hardens batch and compliance workflows, and still makes room to teach. The title wasn’t handed over fully formed. It was earned — trainee step by trainee step, system by system — the same way the best software is.
      `,
    },
    {
      title: "1st Hackathon - App Builders Hackathon",
      desc:
        "My first hackathon with StackOverFlowers — building WARDEN, an AI Prompt Privacy Firewall under a real deadline.",
      read: "7 min read",
      date: "2026",
      icon: FaLaptopCode,
      cover: wardenLogo,
      coverAlt: "WARDEN logo",
      tone: "#2563eb",
      category: "Hackathon",
      video: `${process.env.PUBLIC_URL}/warden-demo.mp4`,
      videoTitle: "WARDEN demo",
      content: `
My first hackathon — App Builders Hackathon — was the moment theory stopped being enough. I showed up with a team, a ticking clock, and a problem that felt bigger than a weekend: people are talking to AI every day, and sensitive data keeps hitchhiking along for the ride.

That problem became WARDEN — Your Data. Your Control.

We built WARDEN as an AI Prompt Privacy Firewall: a layer that detects and masks sensitive information before a prompt ever reaches an external AI service. The idea was simple to say and hard to ship fast — Detect. Mask. Protect. — so someone can still use AI at work without casually leaking IDs, secrets, or personal details into a third-party model.

As StackOverFlowers — Kyle Ryan Yunsay, Lyzer Merck Bautista, Jason Aguilera, and me, Louie Laura — we had to move like a real product team compressed into hours. We scoped what “sensitive” meant for a demo, argued about what to cut, and kept coming back to one question: will someone understand this in under a minute? Pitching forced us to strip the product down to a clear story — privacy first, AI still useful — instead of hiding behind jargon.

What stuck with me wasn’t only the feature list. It was the first-time hackathon rhythm: dividing ownership, debugging under pressure, watching a half-broken flow become a story people could believe, and learning that a strong idea still needs a team that can finish. WARDEN taught me that privacy isn’t a slide at the end of an AI deck — it’s a product surface you have to design, defend, and demo.

We're building a safer way to use AI, one prompt at a time. Proudly built by StackOverFlowers — Kyle, Lyzer, Jason, and Louie — and for me, that weekend is still the blueprint for how I want to ship: clear problem, sharp focus, and a team that owns the outcome together.
      `,
      image: hackathonTeam,
      imageAlt:
        "StackOverFlowers at App Builders Hackathon — Kyle Ryan Yunsay, Lyzer Merck Bautista, Jason Aguilera, and Louie Laura",
      imageCaption:
        "StackOverFlowers at App Builders Hackathon (SM Makati Cyberzone) — Kyle, Lyzer, Jason, and Louie.",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const visibleCount = useVisibleCount();
  const canSlide = blogs.length > visibleCount;

  useEffect(() => {
    if (!selectedBlog) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedBlog(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedBlog]);

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
                  My <span>experience</span>
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
                    {blog.cover ? (
                      <img src={blog.cover} alt="" className="blog-cover-mark" />
                    ) : (
                      <blog.icon />
                    )}
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
              {selectedBlog.cover ? (
                <img
                  src={selectedBlog.cover}
                  alt={selectedBlog.coverAlt || ""}
                  className="blog-cover-mark blog-cover-mark--large"
                />
              ) : (
                <selectedBlog.icon />
              )}
            </MediaTile>

            <h2>{selectedBlog.title}</h2>

            <p>{selectedBlog.desc}</p>

            <h4>Category</h4>
            <p>{selectedBlog.category}</p>

            <h4>Full Article</h4>
            <p className="blog-full-content">
              {selectedBlog.content}
            </p>

            {selectedBlog.video && (
              <figure className="blog-article-figure">
                <video
                  className="blog-article-video"
                  controls
                  playsInline
                  preload="metadata"
                  poster={selectedBlog.cover}
                  title={selectedBlog.videoTitle || selectedBlog.title}
                >
                  <source src={selectedBlog.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <figcaption>
                  {selectedBlog.videoTitle || "Project demo"} — Detect. Mask. Protect.
                </figcaption>
              </figure>
            )}

            {selectedBlog.image && (
              <figure className="blog-article-figure">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.imageAlt || selectedBlog.title}
                  className="blog-article-image"
                  loading="lazy"
                  decoding="async"
                />
                {selectedBlog.imageCaption && (
                  <figcaption>{selectedBlog.imageCaption}</figcaption>
                )}
              </figure>
            )}
          </div>
        </div>
      )}
    </>
  );
};

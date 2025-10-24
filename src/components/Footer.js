import '../components/Footer.css';

export const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">
          Got a Vision? Let’s Bring It to Life!
        </h2>
        <p className="text-gray-400 mb-4">
          I’m always excited to collaborate on creative and meaningful projects.
        </p>
        <a
          href="mailto:hello@louiedev.com"
          className="text-sm px-6 py-2 bg-white text-black rounded-full hover:bg-gray-300 transition"
        >
          Book A Call
        </a>
      </div>
      <p className="text-gray-500 mt-8">
        © 2025 Louie Laura. All rights reserved.
      </p>
    </footer>
  );
};

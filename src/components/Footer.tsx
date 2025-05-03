
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-5">
              <img 
                src="/lovable-uploads/0992f3de-9abe-4580-ba52-44d85d0cc000.png" 
                alt="Britannia Inc. Logo" 
                className="h-10 mr-3"
              />
              <h3 className="text-xl font-bold">Britannia Inc.</h3>
            </div>
            <p className="mb-6 text-sm text-gray-300">
              Global M&A and Management Advisory<br />
              Connecting EMEA-Korea markets
            </p>
            <div className="flex space-x-5 mt-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-gray-300 hover:text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-300 hover:text-white" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-300 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/media" className="text-gray-300 hover:text-white text-sm">Media</Link>
              </li>
              <li>
                <Link to="/esg" className="text-gray-300 hover:text-white text-sm">ESG</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white text-sm">Careers</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Contact</h3>
            <address className="not-italic text-sm text-gray-300">
              <p className="mb-3">IFC 3 Tower, Yeouido</p>
              <p className="mb-3">Seoul, South Korea</p>
              <p className="mb-3">
                <span className="block">Tel: +82-2-1234-5678</span>
                <span className="block">Email: info@britannia-inc.com</span>
              </p>
            </address>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white text-sm">Terms of Use</Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-gray-300 hover:text-white text-sm">Sitemap</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {currentYear} Britannia Inc. All rights reserved.</p>
            <p className="mt-3 md:mt-0">
              <span className="inline-flex items-center">
                <span className="mr-1">&#127472;&#127479;</span> Korean capital-based global advisory firm
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

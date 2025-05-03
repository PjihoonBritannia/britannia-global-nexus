
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-corporate-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-corporate-blue">B</span>ritannia Inc.
            </h3>
            <p className="mb-4 text-sm text-gray-300">
              글로벌 M&A 및 경영자문 리더십<br />
              EMEA-한국 시장 연결
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-gray-300 hover:text-corporate-blue" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-300 hover:text-corporate-blue" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-300 hover:text-corporate-blue" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-corporate-blue text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/media" className="text-gray-300 hover:text-corporate-blue text-sm">Media</Link>
              </li>
              <li>
                <Link to="/esg" className="text-gray-300 hover:text-corporate-blue text-sm">ESG</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-corporate-blue text-sm">Careers</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-sm text-gray-300">
              <p className="mb-2">IFC 3 Tower, Yeouido</p>
              <p className="mb-2">Seoul, South Korea</p>
              <p className="mb-2">
                <span className="block">Tel: +82-2-1234-5678</span>
                <span className="block">Email: info@britannia-inc.com</span>
              </p>
            </address>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-corporate-blue text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-corporate-blue text-sm">Terms of Use</Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-gray-300 hover:text-corporate-blue text-sm">Sitemap</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {currentYear} Britannia Inc. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              <span className="inline-flex items-center">
                <span className="mr-1">&#127472;&#127479;</span> 한국 자본 기반 글로벌 기업
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

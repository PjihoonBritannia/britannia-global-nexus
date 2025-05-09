
import React from "react";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-dark text-white pt-28 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="mb-5">
              <img src="/logo_white.svg" alt="Britannia Inc." className="w-44 h-auto" />
            </div>
            <p className="mb-6 text-sm text-gray-300 font-light">
              Connecting EMEA-Korea markets with Korean capital expertise
            </p>
            <div className="flex space-x-5 mt-6">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-gray-300 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-6">About Us</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white text-sm font-light">About Us</Link>
              </li>
              <li>
                <Link to="/media" className="text-gray-300 hover:text-white text-sm font-light">Media</Link>
              </li>
              <li>
                <Link to="/esg" className="text-gray-300 hover:text-white text-sm font-light">ESG</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white text-sm font-light">Careers</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-6">Contact</h3>
            <address className="not-italic text-sm text-gray-300 font-light">
              <p className="mb-3">43F, Three IFC, 10 Gukjegeumyung-ro, Yeongdeungpo-gu, Seoul, Republic of Korea</p>
              <p className="mb-3">
                <span className="block">Tel: +82 2-419-8244</span>
                <span className="block">Email: kremi@britannia.co.kr</span>
              </p>
            </address>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-medium mb-6">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white text-sm font-light">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white text-sm font-light">Terms of Use</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400">
          <p className="text-center font-light">© {currentYear} Britannia Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface FooterTab {
  title: string;
  links: { text: string; to: string }[];
}

interface FooterProps {
  footerTabs: FooterTab[];
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: { icon: string; to: string }[];
  copyrightText: string;
}

const Footer: React.FC<FooterProps> = ({
  footerTabs,
  contactEmail,
  contactPhone,
  address,
  socialLinks,
  copyrightText,
}) => {
  const location = useLocation();
  const isWorkspace = location.pathname.startsWith('/workspace');

  if (isWorkspace) {
    return null;
  }

  return (
    <footer className="bg-gray-800 text-white py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerTabs.map((tab, index) => (
            <div key={index}>
              <h3 className="text-base font-semibold text-white mb-4">{tab.title}</h3>
              <ul className="space-y-2">
                {tab.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.to} className="text-gray-300 hover:text-white transition-colors">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mt-8 lg:mt-0">
            <h3 className="text-base font-semibold text-white mb-4">Contact</h3>
            <p className="text-gray-300 mb-2">Email: <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">{contactEmail}</a></p>
            <p className="text-gray-300 mb-2">Phone: {contactPhone}</p>
            <p className="text-gray-300">{address}</p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.to} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <i className={`fab fa-${social.icon} fa-lg`}></i>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Management</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login with WordPress
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-300 hover:text-white transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-center">{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type HeaderItem = {
  label: string;
  to: string;
  subItems?: HeaderItem[];
};

type HeaderProps = {
  bgTransparent?: boolean;
};

const Header: React.FC<HeaderProps> = ({ bgTransparent = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigationItems: HeaderItem[] = [
    { label: 'About Us', to: '/about' },
    { label: 'UK Property', to: '/uk-property' },
    { label: 'Media', to: '/media' },
    { label: 'ESG', to: '/esg' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contents', to: '/contents' },
  ];

  // Check if current path is in workspace section
  const isWorkspace = location.pathname.startsWith('/workspace');

  // Skip rendering the header on the workspace pages
  if (isWorkspace) {
    return null;
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || !bgTransparent ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src={
                scrolled || !bgTransparent
                  ? 'https://cdn.jsdelivr.net/gh/PjihoonBritannia/britannia-global-nexus@main/public/statics/logo_black.svg'
                  : 'https://cdn.jsdelivr.net/gh/PjihoonBritannia/britannia-global-nexus@main/public/statics/logo_white.svg'
              }
              alt="Britannia Inc."
              className="h-10 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`text-sm font-medium transition-colors duration-300 ${
                  scrolled || !bgTransparent
                    ? 'text-gray-900 hover:text-gray-600'
                    : 'text-white hover:text-gray-200'
                } ${location.pathname === item.to ? 'font-bold' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            {user ? (
              <Button
                asChild
                className="bg-point hover:bg-point/80 text-white rounded-[15px]"
              >
                <Link to="/workspace">Workspace</Link>
              </Button>
            ) : (
              <Button
                asChild
                className="bg-point hover:bg-point/80 text-white rounded-[15px]"
              >
                <Link to="#contact">Contact Us</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900 dark:text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className={`h-6 w-6 ${scrolled || !bgTransparent ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${scrolled || !bgTransparent ? 'text-gray-900' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden bg-white py-6 px-4 shadow-lg">
          <div className="space-y-4">
            {navigationItems.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.to}
                  className={`block text-gray-900 hover:text-point text-sm font-medium ${
                    location.pathname === item.to ? 'font-bold text-point' : ''
                  }`}
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              </div>
            ))}
            <div className="pt-4">
              {user ? (
                <Button
                  asChild
                  className="w-full bg-point hover:bg-point/80 text-white rounded-[15px]"
                  onClick={toggleMenu}
                >
                  <Link to="/workspace">Workspace</Link>
                </Button>
              ) : (
                <Button
                  asChild
                  className="w-full bg-point hover:bg-point/80 text-white rounded-[15px]"
                  onClick={toggleMenu}
                >
                  <Link to="#contact">Contact Us</Link>
                </Button>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;


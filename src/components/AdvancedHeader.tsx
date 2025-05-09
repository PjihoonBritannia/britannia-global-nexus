
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const AdvancedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Navigation items - used both for regular nav and dots in condensed mode
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/uk-property", label: "UK Property" },
    { path: "/media", label: "Media" },
    { path: "/esg", label: "ESG" },
    { path: "/careers", label: "Careers" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        // Reset expanded state when back at top
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle header hover for desktop
  const handleHeaderMouseEnter = () => {
    if (isScrolled && !isMobile) {
      setIsExpanded(true);
    }
  };

  const handleHeaderMouseLeave = () => {
    if (isScrolled && !isMobile) {
      setIsExpanded(false);
    }
  };

  // Text color class for nav links
  const navLinkClass = (path) => {
    if (isMobile && isMenuOpen) {
      return location.pathname === path ? 'text-point translate-x-2' : 'text-base-dark';
    }
    
    if (isScrolled || (isMobile && isMenuOpen)) {
      return location.pathname === path ? 'text-point' : 'text-base-dark';
    }
    
    return 'text-white hover:text-white/80';
  };

  return (
    <header 
      ref={headerRef}
      className="fixed w-full z-50"
      style={{ pointerEvents: isScrolled && !isMobile ? 'none' : 'auto' }}
    >
      {/* Only render one header based on scroll state */}
      {isScrolled && !isMobile ? (
        // Condensed floating header for desktop when scrolled
        <div 
          className="flex justify-center w-full transition-all duration-500"
          onMouseEnter={handleHeaderMouseEnter}
          onMouseLeave={handleHeaderMouseLeave}
          style={{ pointerEvents: 'auto' }}
        >
          <div 
            className={`
              bg-white/90 backdrop-blur-md shadow-md 
              rounded-full mt-4 transition-all duration-500
              flex items-center justify-between
              ${isExpanded ? 'w-auto px-10 py-4' : 'w-[400px] py-3 px-6'}
            `}
          >
            {/* Always show logo, sized appropriately */}
            <Link to="/" className="flex items-center">
              <img 
                src="/logo_black.svg" 
                alt="Britannia Inc." 
                className={`transition-all duration-300 ${isExpanded ? 'w-[120px]' : 'w-[80px]'}`}
              />
              <span className="sr-only">Britannia Inc.</span>
            </Link>

            {/* Navigation: show dots or text based on expanded state */}
            <div className="ml-4">
              {isExpanded ? (
                // Text Navigation (shown when expanded)
                <nav className="flex items-center space-x-8 transition-all duration-500">
                  {navItems.map((item, index) => (
                    <Link 
                      key={`nav-${index}`}
                      to={item.path} 
                      className={`font-light link-underline transition-colors duration-200 ${
                        location.pathname === item.path ? 'text-point' : 'text-base-dark'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  <Button 
                    className="bg-point hover:bg-point/90 text-white rounded-[35px] hover:shadow-lg transition-shadow duration-300 ml-4"
                  >
                    Contact Us
                  </Button>
                </nav>
              ) : (
                // Navigation Dots (shown when condensed)
                <div className="flex space-x-3 justify-center items-center">
                  {navItems.map((item, index) => (
                    <Link
                      key={`dot-${index}`}
                      to={item.path}
                      aria-label={item.label}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        location.pathname === item.path ? 'w-3 h-3 bg-point' : 'bg-base-dark'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Standard header for mobile or desktop at top
        <div className={`
          w-full transition-all duration-300
          ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}
          ${isMobile && isMenuOpen && !isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : ''}
        `}>
          <div className="container mx-auto px-6 flex items-center justify-between">
            <Link 
              to="/" 
              className={`flex items-center transition-transform duration-300 ${
                isScrolled ? 'scale-90' : ''
              }`}
            >
              <img 
                src={isScrolled || (isMobile && isMenuOpen) ? "/logo_black.svg" : "/logo_white.svg"} 
                alt="Britannia Inc." 
                className="h-10 w-auto transition-opacity duration-300" 
              />
              <span className="sr-only">Britannia Inc.</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              {navItems.map((item, index) => (
                <Link 
                  key={`std-nav-${index}`}
                  to={item.path} 
                  className={`font-light link-underline transition-colors duration-200 ${navLinkClass(item.path)}`}
                >
                  {item.label}
                </Link>
              ))}
              <Button 
                className="bg-point hover:bg-point/90 text-white rounded-[35px] hover:shadow-lg transition-shadow duration-300"
              >
                Contact Us
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 ${(isScrolled || (isMenuOpen && !isScrolled)) ? 'text-base-dark' : 'text-white'}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && isMobile && (
            <div className="md:hidden absolute w-full bg-white/95 backdrop-blur-md z-50 border-t border-gray-100">
              <nav className="container mx-auto px-6 py-5 flex flex-col space-y-6">
                {navItems.map((item, index) => (
                  <Link 
                    key={`mobile-nav-${index}`}
                    to={item.path} 
                    className={`font-light hover:text-point p-2 transition-all duration-200 ${
                      location.pathname === item.path ? 'text-point translate-x-2' : 'text-base-dark'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button 
                  className="bg-point hover:bg-point/90 text-white w-full rounded-[35px] hover:shadow-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Button>
              </nav>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default AdvancedHeader;

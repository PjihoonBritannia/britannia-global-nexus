
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

  // Calculate header class
  let headerClasses = "fixed w-full z-50 transition-all duration-500";
  
  // Mobile-specific header styling
  if (isMobile) {
    headerClasses += isMenuOpen
      ? " bg-white shadow-md py-4"
      : isScrolled 
        ? " bg-white/90 backdrop-blur-md shadow-md py-4" 
        : " bg-transparent py-6";
  } 
  // Desktop-specific header styling with multi-state transformation
  else {
    if (isScrolled) {
      headerClasses = `fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500 ${isExpanded ? "pointer-events-auto" : "pointer-events-none"}`;
    } else {
      headerClasses += " bg-transparent py-6";
    }
  }

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
      className={headerClasses}
      onMouseEnter={handleHeaderMouseEnter}
      onMouseLeave={handleHeaderMouseLeave}
    >
      {isScrolled && !isMobile ? (
        // Condensed floating header for desktop when scrolled
        <div 
          className={`header-scrolled ${isExpanded ? "header-expanded" : ""} pointer-events-auto`}
        >
          {/* Navigation Dots (shown when condensed) */}
          <div className={`nav-dots ${isExpanded ? "hidden" : "flex"}`}>
            {navItems.map((item, index) => (
              <Link
                key={`dot-${index}`}
                to={item.path}
                aria-label={item.label}
                className={`nav-dot ${location.pathname === item.path ? 'active' : ''}`}
              />
            ))}
          </div>
          
          {/* Text Navigation (shown when expanded) */}
          <nav className={`hidden ${isExpanded ? "md:flex" : ""} items-center space-x-8 transition-all duration-500`}>
            <Link 
              to="/" 
              className="flex items-center mr-8"
            >
              <img src="/logo_black.svg" alt="Britannia Inc." className="h-10 w-auto" />
              <span className="sr-only">Britannia Inc.</span>
            </Link>
            
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
        </div>
      ) : (
        // Standard header for mobile or desktop at top
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
            className={`md:hidden p-2 ${(isScrolled || isMenuOpen) ? 'text-base-dark' : 'text-white'}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}

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
    </header>
  );
};

export default AdvancedHeader;

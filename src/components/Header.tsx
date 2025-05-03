
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-corporate-navy">
            <span className="text-corporate-blue">B</span>ritannia Inc.
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="font-medium text-corporate-navy hover:text-corporate-blue link-underline">
            About
          </Link>
          <Link to="/media" className="font-medium text-corporate-navy hover:text-corporate-blue link-underline">
            Media
          </Link>
          <Link to="/esg" className="font-medium text-corporate-navy hover:text-corporate-blue link-underline">
            ESG
          </Link>
          <Link to="/careers" className="font-medium text-corporate-navy hover:text-corporate-blue link-underline">
            Careers
          </Link>
          <Button className="bg-corporate-blue hover:bg-corporate-teal text-white">
            Contact Us
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-corporate-navy"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white z-50 shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/about" 
              className="font-medium text-corporate-navy hover:text-corporate-blue p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/media" 
              className="font-medium text-corporate-navy hover:text-corporate-blue p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Media
            </Link>
            <Link 
              to="/esg" 
              className="font-medium text-corporate-navy hover:text-corporate-blue p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              ESG
            </Link>
            <Link 
              to="/careers" 
              className="font-medium text-corporate-navy hover:text-corporate-blue p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Careers
            </Link>
            <Button 
              className="bg-corporate-blue hover:bg-corporate-teal text-white w-full"
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

export default Header;

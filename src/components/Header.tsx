
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
    <header className="relative w-full bg-white border-b border-gray-100">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/0992f3de-9abe-4580-ba52-44d85d0cc000.png" 
            alt="Britannia Inc. Logo" 
            className="h-14 mr-3"
          />
          <span className="sr-only">Britannia Inc.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link to="/about" className="font-medium text-gray-800 hover:text-gray-600 link-underline">
            About
          </Link>
          <Link to="/media" className="font-medium text-gray-800 hover:text-gray-600 link-underline">
            Media
          </Link>
          <Link to="/esg" className="font-medium text-gray-800 hover:text-gray-600 link-underline">
            ESG
          </Link>
          <Link to="/careers" className="font-medium text-gray-800 hover:text-gray-600 link-underline">
            Careers
          </Link>
          <Link to="/uk-property" className="font-medium text-gray-800 hover:text-gray-600 link-underline">
            UK Property
          </Link>
          <Button className="bg-gray-800 hover:bg-gray-700 text-white">
            Contact Us
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-800"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white z-50 border-t border-gray-100">
          <nav className="container mx-auto px-6 py-5 flex flex-col space-y-5">
            <Link 
              to="/about" 
              className="font-medium text-gray-800 hover:text-gray-600 p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/media" 
              className="font-medium text-gray-800 hover:text-gray-600 p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Media
            </Link>
            <Link 
              to="/esg" 
              className="font-medium text-gray-800 hover:text-gray-600 p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              ESG
            </Link>
            <Link 
              to="/careers" 
              className="font-medium text-gray-800 hover:text-gray-600 p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Careers
            </Link>
            <Link 
              to="/uk-property" 
              className="font-medium text-gray-800 hover:text-gray-600 p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              UK Property
            </Link>
            <Button 
              className="bg-gray-800 hover:bg-gray-700 text-white w-full mt-2"
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

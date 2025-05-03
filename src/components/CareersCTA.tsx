
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CareersCTA = () => {
  return (
    <section 
      className="py-24 bg-cover bg-center relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80')" }}
    >
      <div className="absolute inset-0 bg-gray-900/80"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
            Cultivate Global Financial Expertise
          </h2>
          <p className="text-xl text-white/90 mb-8">
            "Do you want to develop your career at the center of cross-border M&A Deals?"
          </p>
          <p className="text-white/80 mb-10">
            Grow as a global financial professional with Britannia, at the center of cross-border M&A transactions. We foster top talent in a challenging and collaborative environment.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Button asChild className="bg-white text-gray-900 hover:bg-gray-100">
              <Link to="/careers">
                View Career Opportunities
              </Link>
            </Button>
            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
              <Link to="/careers#life">
                Life at Britannia
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersCTA;

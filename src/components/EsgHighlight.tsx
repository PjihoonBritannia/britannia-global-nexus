
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const EsgHighlight = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            ESG Commitment
          </h2>
          <p className="text-lg mb-10">
            Britannia integrates transparent governance, social responsibility, and environmental considerations into our business practices. Sustainability principles are reflected in all our business decisions and advisory services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-7">
              <h3 className="text-xl font-semibold mb-3">Governance</h3>
              <p className="text-white/80">
                Building trust through transparent governance and ethical management
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-7">
              <h3 className="text-xl font-semibold mb-3">Social</h3>
              <p className="text-white/80">
                Creating social value through diversity and talent development
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-7">
              <h3 className="text-xl font-semibold mb-3">Environmental</h3>
              <p className="text-white/80">
                Minimizing environmental impact and pursuing sustainable business practices
              </p>
            </div>
          </div>
          <Button asChild className="bg-white text-gray-900 hover:bg-gray-100">
            <Link to="/esg" className="inline-flex items-center">
              Learn more about our ESG philosophy
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EsgHighlight;

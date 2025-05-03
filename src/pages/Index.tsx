
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import BusinessAreas from "@/components/BusinessAreas";
import LatestNews from "@/components/LatestNews";
import EsgHighlight from "@/components/EsgHighlight";
import CareersCTA from "@/components/CareersCTA";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          title="Global M&A and Management Advisory Leadership"
          subtitle="Connecting EMEA-Korea markets with Korean capital expertise"
          backgroundImage="https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80"
        >
          <div className="flex flex-wrap gap-5">
            <Button asChild className="bg-gray-800 hover:bg-gray-700">
              <Link to="#contact">
                Request a Consultation
              </Link>
            </Button>
            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
              <Link to="/about" className="inline-flex items-center">
                Learn More
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </Hero>

        <BusinessAreas />
        
        <LatestNews />
        
        <EsgHighlight />
        
        <CareersCTA />
        
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

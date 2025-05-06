
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Search, CircleDollarSign, Handshake, MapPin, FileText } from "lucide-react";
import UkPropertyServices from "@/components/UkPropertyServices";
import UkPropertyPartnership from "@/components/UkPropertyPartnership";
import UkPropertyProcess from "@/components/UkPropertyProcess";
import UkPropertyAreas from "@/components/UkPropertyAreas";
import UkPropertyInsights from "@/components/UkPropertyInsights";
import UkPropertyContact from "@/components/UkPropertyContact";

const UkProperty = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero
          title="Strategic UK Property Investment Solutions"
          subtitle="Britannia Global Nexus provides expert guidance to Korean investors navigating London's prime real estate market, leveraging our strategic partnership with Oliver James London to deliver bespoke acquisition and investment solutions."
          backgroundImage="https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=1200"
        >
          <div className="flex flex-wrap gap-5">
            <Button asChild className="bg-gray-800 hover:bg-gray-700">
              <a href="#contact">
                Request Consultation
              </a>
            </Button>
            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
              <a href="#opportunity" className="inline-flex items-center">
                Explore Opportunities
                <ArrowRight size={16} className="ml-2" />
              </a>
            </Button>
          </div>
        </Hero>

        <section id="opportunity" className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <SectionTitle 
              title="The Opportunity: Why Invest in London Property Now" 
              subtitle="London's prime real estate market presents a strategic opportunity for Korean investors"
              align="center"
            />
            
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 mb-6 leading-relaxed">
                London maintains its status as a premier global city, offering Korean investors a resilient and stable property market even amid global economic fluctuations. Current market conditions present a strategic entry point, with prime property values still below their 2014 peaks while demonstrating consistent long-term appreciation.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                The strong rental demand from professionals and international students ensures reliable income streams, while favorable exchange rates enhance the value proposition for Korean investors. London's transparent legal system, freehold ownership structure, and absence of foreign buyer restrictions further strengthen its appeal.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This combination of factors creates a compelling case for strategic long-term investment, particularly with expert guidance to navigate market complexities and identify optimal opportunities aligned with your investment objectives.
              </p>
            </div>
          </div>
        </section>

        <UkPropertyServices />
        
        <UkPropertyPartnership />
        
        <UkPropertyProcess />
        
        <UkPropertyAreas />
        
        <UkPropertyInsights />
        
        <UkPropertyContact />
      </main>
      
      <Footer />
    </div>
  );
};

export default UkProperty;


import SectionTitle from "./SectionTitle";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const UkPropertyInsights = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Market Insights & Trends" 
          subtitle="Expert analysis of London's prime property market"
          align="center"
        />
        
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 mb-10 text-center leading-relaxed">
            Britannia Global Nexus provides Korean investors with timely, data-driven analysis of London's prime property market dynamics. Our insights combine macroeconomic factors, neighborhood-specific trends, and comparative investment metrics to inform strategic decision-making tailored to Korean investors' objectives.
          </p>
          
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 mb-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Market Trends</h3>
            
            <ul className="space-y-6">
              <li className="flex">
                <div className="text-gray-800 mr-4 mt-1">
                  <div className="h-2 w-2 rounded-full bg-gray-800"></div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-medium text-gray-900">Supply-Demand Imbalance:</span> Limited new development in prime central areas continues to support values amid strong domestic and international demand.
                </p>
              </li>
              <li className="flex">
                <div className="text-gray-800 mr-4 mt-1">
                  <div className="h-2 w-2 rounded-full bg-gray-800"></div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-medium text-gray-900">Rental Growth:</span> Professional tenant demand driving rental yield increases, particularly in prime central locations near business districts.
                </p>
              </li>
              <li className="flex">
                <div className="text-gray-800 mr-4 mt-1">
                  <div className="h-2 w-2 rounded-full bg-gray-800"></div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-medium text-gray-900">Market Recovery:</span> Post-pandemic resurgence in international buyer activity with prime London values showing consistent quarterly growth.
                </p>
              </li>
            </ul>
          </div>
          
          <div className="text-center">
            <Button className="bg-gray-800 hover:bg-gray-700">
              <FileText size={16} className="mr-2" />
              Request Detailed Market Report
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UkPropertyInsights;

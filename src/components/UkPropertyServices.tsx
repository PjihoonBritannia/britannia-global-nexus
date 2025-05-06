
import { Building, CircleDollarSign, FileSearch } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const UkPropertyServices = () => {
  const services = [
    {
      icon: <Building size={24} />,
      title: "Acquisition Advisory",
      description: "Tailored property search and acquisition strategies for Korean investors, ensuring optimal alignment with investment goals while navigating UK market complexities and cultural nuances."
    },
    {
      icon: <FileSearch size={24} />,
      title: "Sales Advisory",
      description: "Expert guidance for Korean property owners on optimal timing, positioning, and execution of London property sales, maximizing returns through strategic marketing to both local and international buyers."
    },
    {
      icon: <CircleDollarSign size={24} />,
      title: "Investment Consultancy",
      description: "Comprehensive analysis of London property investment opportunities, providing Korean investors with data-driven insights on market trends, yield potential, and long-term appreciation prospects."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Our Services for Korean Clients" 
          subtitle="Bespoke property solutions designed specifically for Korean investors"
          align="center"
        />
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <Card key={index} className="border border-gray-100 hover:border-gray-200 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="text-gray-800 mb-5">{service.icon}</div>
                <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UkPropertyServices;

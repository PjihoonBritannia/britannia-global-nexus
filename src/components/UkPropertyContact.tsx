
import SectionTitle from "./SectionTitle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const UkPropertyContact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Request Received",
        description: "Thank you for your inquiry. Our team will contact you shortly.",
      });
      
      // Reset form
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Contact & Consultation" 
          subtitle="Request a confidential discussion with our UK property experts"
          align="center"
        />
        
        <div className="max-w-2xl mx-auto mt-12">
          <div className="bg-white rounded-lg border border-gray-100 p-8">
            <p className="text-gray-700 mb-8 text-center leading-relaxed">
              Our team of specialists is ready to provide personalized guidance on your UK property investment journey. All inquiries are treated with the utmost confidentiality and receive prompt attention from our senior advisors.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <Input id="name" placeholder="Your Name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input id="email" type="email" placeholder="your.email@example.com" required />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <Input id="phone" placeholder="+82 10 1234 5678" />
              </div>
              
              <div>
                <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-2">Inquiry Details</label>
                <Textarea 
                  id="inquiry" 
                  placeholder="Please describe your investment interests or specific questions"
                  rows={4}
                  className="resize-none"
                  required
                />
              </div>
              
              <div className="text-sm text-gray-500">
                <p>Contact information: +44 20 1234 5678 | contact@britannia-global-nexus.com</p>
              </div>
              
              <div className="text-center">
                <Button 
                  type="submit" 
                  className="bg-gray-800 hover:bg-gray-700 w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Request Confidential Consultation"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UkPropertyContact;


import { Mail, MapPin, Phone } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <section className="py-24 bg-white" id="contact">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Contact Us"
          subtitle="Discuss optimal solutions for your business objectives with our expert team."
          align="center"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          <div className="lg:col-span-1">
            <div className="space-y-10">
              <div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-gray-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                </div>
                <p className="text-gray-700 pl-8">
                  IFC 3 Tower, Yeouido<br />
                  Seoul, South Korea
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <Phone className="h-5 w-5 text-gray-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                </div>
                <p className="text-gray-700 pl-8">
                  +82-2-1234-5678
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <Mail className="h-5 w-5 text-gray-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                </div>
                <p className="text-gray-700 pl-8">
                  info@britannia-inc.com
                </p>
              </div>
              
              <div className="bg-gray-50 p-7 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
                <p className="text-gray-700">
                  Monday - Friday<br />
                  09:00 - 18:00 KST
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-7 md:p-10 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-7">Inquiry Form</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

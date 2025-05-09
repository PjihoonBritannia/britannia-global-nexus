
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import SectionTitle from "./SectionTitle";
import { ArrowRight } from "lucide-react";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call with timeout
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you! We will get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="bg-[#F8F2FF] py-32 md:py-36 lg:py-40">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Contact Us"
          subtitle="글로벌 비즈니스 기회에 대해 논의하세요"
          align="center"
          textColor="text-base-dark"
          accentColor="bg-point"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-12 bg-white rounded-[35px] p-10 shadow-sm">
            <div>
              <h3 className="text-xl font-medium mb-6 text-base-dark">Our Offices</h3>
              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <div className="rounded-full bg-point/10 p-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#FF0062" strokeWidth="2"/>
                      <circle cx="12" cy="10" r="3" stroke="#FF0062" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-point font-medium mb-2">Seoul HQ</h4>
                    <address className="not-italic text-gray-600 font-light space-y-1">
                      <p>43F, Three IFC, 10 Gukjegeumyung-ro</p>
                      <p>Yeongdeungpo-gu, Seoul, Republic of Korea</p>
                      <p className="mt-2">Tel: +82 2-419-8244</p>
                      <p>Email: kremi@britannia.co.kr</p>
                    </address>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="rounded-full bg-point/10 p-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#FF0062" strokeWidth="2"/>
                      <circle cx="12" cy="10" r="3" stroke="#FF0062" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-point font-medium mb-2">London Office</h4>
                    <address className="not-italic text-gray-600 font-light space-y-1">
                      <p>17 Bloomsbury Square</p>
                      <p>London, WC1A 2NN, United Kingdom</p>
                      <p className="mt-2">Tel: +44 20-7183-9321</p>
                      <p>Email: ukeis@britannia.co.uk</p>
                    </address>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-6 text-base-dark">Business Hours</h3>
              <div className="text-gray-600 font-light">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday - Sunday: Closed</p>
                <p className="mt-4 italic text-point">24/7 support for urgent inquiries</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-[35px] p-10 shadow-md border border-gray-100">
            <h3 className="text-xl font-medium mb-6 text-base-dark">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-gray-200 focus:border-point"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-gray-200 focus:border-point"
                    placeholder="Your email address"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="border-gray-200 focus:border-point"
                  placeholder="Message subject"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="border-gray-200 focus:border-point resize-none"
                  rows={5}
                  placeholder="Your message"
                />
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-point hover:bg-point/90 text-white font-normal flex items-center gap-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

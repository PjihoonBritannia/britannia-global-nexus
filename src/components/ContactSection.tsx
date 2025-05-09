
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import SectionTitle from "./SectionTitle";

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
    <section id="contact" className="bg-base-dark text-white py-32 md:py-36 lg:py-40">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Contact Us"
          subtitle="글로벌 비즈니스 기회에 대해 논의하세요"
          align="center"
          textColor="text-white"
          accentColor="bg-white"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-medium mb-6">Our Offices</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-point font-medium mb-2">Seoul HQ</h4>
                  <address className="not-italic text-gray-300 font-light space-y-1">
                    <p>43F, Three IFC, 10 Gukjegeumyung-ro</p>
                    <p>Yeongdeungpo-gu, Seoul, Republic of Korea</p>
                    <p className="mt-2">Tel: +82 2-419-8244</p>
                    <p>Email: kremi@britannia.co.kr</p>
                  </address>
                </div>
                
                <div>
                  <h4 className="text-point font-medium mb-2">London Office</h4>
                  <address className="not-italic text-gray-300 font-light space-y-1">
                    <p>17 Bloomsbury Square</p>
                    <p>London, WC1A 2NN, United Kingdom</p>
                    <p className="mt-2">Tel: +44 20-7183-9321</p>
                    <p>Email: ukeis@britannia.co.uk</p>
                  </address>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-6">Business Hours</h3>
              <div className="text-gray-300 font-light">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday - Sunday: Closed</p>
                <p className="mt-4 italic">24/7 support for urgent inquiries</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white/10 rounded-[35px] p-8">
            <h3 className="text-xl font-medium mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-light mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-light mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Your email address"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-light mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Message subject"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-light mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  rows={5}
                  placeholder="Your message"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-point hover:bg-point/90 text-white font-normal"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Form Submitted Successfully",
      description: "We'll get back to you as soon as possible.",
    });

    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    });
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-corporate-dark-gray mb-1">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-corporate-dark-gray mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            className="w-full"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-corporate-dark-gray mb-1">
            Company
          </label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your Company"
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-corporate-dark-gray mb-1">
            Subject
          </label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject of your inquiry"
            required
            className="w-full"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-corporate-dark-gray mb-1">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you?"
          required
          rows={5}
          className="w-full"
        />
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto bg-corporate-blue hover:bg-corporate-teal text-white"
      >
        {isSubmitting ? "Sending..." : "Submit Inquiry"}
      </Button>
    </form>
  );
};

export default ContactForm;

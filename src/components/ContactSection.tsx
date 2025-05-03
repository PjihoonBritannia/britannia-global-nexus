
import { Mail, MapPin, Phone } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <section className="py-16 bg-white" id="contact">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Contact Us"
          subtitle="브리타니아에 연락하여 귀사의 비즈니스 목표를 위한 최적의 솔루션을 논의하세요."
          align="center"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-3">
                  <MapPin className="h-5 w-5 text-corporate-blue mr-3" />
                  <h3 className="text-lg font-semibold text-corporate-navy">주소</h3>
                </div>
                <p className="text-corporate-dark-gray pl-8">
                  IFC 3 Tower, Yeouido<br />
                  Seoul, South Korea
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-3">
                  <Phone className="h-5 w-5 text-corporate-blue mr-3" />
                  <h3 className="text-lg font-semibold text-corporate-navy">전화</h3>
                </div>
                <p className="text-corporate-dark-gray pl-8">
                  +82-2-1234-5678
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-3">
                  <Mail className="h-5 w-5 text-corporate-blue mr-3" />
                  <h3 className="text-lg font-semibold text-corporate-navy">이메일</h3>
                </div>
                <p className="text-corporate-dark-gray pl-8">
                  info@britannia-inc.com
                </p>
              </div>
              
              <div className="bg-corporate-light-gray p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-corporate-navy mb-3">사업 시간</h3>
                <p className="text-corporate-dark-gray">
                  월요일 - 금요일<br />
                  09:00 - 18:00 KST
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-corporate-light-gray p-6 md:p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-corporate-navy mb-6">문의하기</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

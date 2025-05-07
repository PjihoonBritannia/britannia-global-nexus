
import { useState, useRef, useEffect } from "react";
import { Briefcase, Globe, Users } from "lucide-react";
import Card from "./Card";
import SectionTitle from "./SectionTitle";
import AnimatedCounter from "./AnimatedCounter";

const BusinessAreas = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const services = [
    {
      title: "지주 사업 (Holding Activities)",
      description: "전략적 투자 및 포트폴리오 관리를 통한 장기적 가치 창출. 한국 자본을 기반으로 글로벌 시장에서의 안정적인 성장 추구.",
      icon: <Globe size={32} />,
      link: "/about#holding",
    },
    {
      title: "EMEA M&A 자문 (M&A Advisory)",
      description: "유럽, 중동 및 아프리카 지역 M&A 전문성 보유. Target Identification, Deal Sourcing, Due Diligence 등 종합적 자문 서비스 제공.",
      icon: <Briefcase size={32} />,
      link: "/about#advisory",
    },
    {
      title: "경영 컨설팅 (Management Consulting)",
      description: "기업 전략 수립, PMI(인수 후 통합), 운영 효율성 및 가치 창출 계획 수립을 통한 지속 가능한 비즈니스 모델 구축.",
      icon: <Users size={32} />,
      link: "/about#consulting",
    },
  ];

  // Track section visibility for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-bg-cream to-base-light"
    >
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Core Business Areas"
          subtitle="브리타니아는 안정적인 지주 사업, 전문적인 M&A 자문, 그리고 전략적 경영 컨설팅을 통해 고객에게 최상의 가치를 제공합니다."
          align="center"
        />
        
        {/* Stats Counter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 mt-8">
          <AnimatedCounter end={150} suffix="+" title="Successful M&A Deals" />
          <AnimatedCounter end={25} suffix="+" title="Countries with Active Projects" />
          <AnimatedCounter end={98} suffix="%" title="Client Satisfaction Rate" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className={`transform transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessAreas;

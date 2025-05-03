
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CareersCTA = () => {
  return (
    <section 
      className="py-20 bg-cover bg-center relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80')" }}
    >
      <div className="absolute inset-0 bg-corporate-navy/80"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            글로벌 금융 전문성을 키우고 싶으신가요?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            "Do you want to cultivate Global Financial Expertise at the center of cross-border M&A Deals?"
          </p>
          <p className="text-white/80 mb-8">
            브리타니아와 함께 국경을 넘나드는 M&A 거래의 중심에서 글로벌 금융 전문가로 성장하세요. 우리는 도전적이고 협력적인 환경에서 최고의 인재를 육성합니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-corporate-blue hover:bg-corporate-teal">
              <Link to="/careers">
                커리어 기회 보기
              </Link>
            </Button>
            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
              <Link to="/careers#life">
                브리타니아에서의 생활
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersCTA;

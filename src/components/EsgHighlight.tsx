
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const EsgHighlight = () => {
  return (
    <section className="py-16 bg-corporate-navy text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            ESG 경영 철학 (Our ESG Commitment)
          </h2>
          <p className="text-lg mb-8">
            브리타니아는 투명한 지배구조, 사회적 책임, 환경 고려를 통합하는 ESG 경영을 실천합니다. 우리의 비즈니스 결정과 자문 서비스에는 지속가능성 원칙이 반영됩니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex-1 min-w-[240px]">
              <h3 className="text-xl font-semibold mb-2">Governance</h3>
              <p className="text-white/80">
                투명한 지배구조와 윤리적 경영을 통한 신뢰 구축
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex-1 min-w-[240px]">
              <h3 className="text-xl font-semibold mb-2">Social</h3>
              <p className="text-white/80">
                다양성 존중 및 인재 개발을 통한 사회적 가치 창출
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex-1 min-w-[240px]">
              <h3 className="text-xl font-semibold mb-2">Environmental</h3>
              <p className="text-white/80">
                환경 영향 최소화 및 지속 가능한 비즈니스 관행 추구
              </p>
            </div>
          </div>
          <Button asChild>
            <Link to="/esg" className="inline-flex items-center">
              ESG 철학 자세히 보기
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EsgHighlight;

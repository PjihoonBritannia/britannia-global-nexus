import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import {
	ArrowRight,
	Building,
	Search,
	CircleDollarSign,
	Handshake,
	MapPin,
	FileText,
} from 'lucide-react';
import UkPropertyServices from '@/components/UkPropertyServices';
import UkPropertyPartnership from '@/components/UkPropertyPartnership';
import UkPropertyProcess from '@/components/UkPropertyProcess';
import UkPropertyAreas from '@/components/UkPropertyAreas';
import UkPropertyInsights from '@/components/UkPropertyInsights';
import UkPropertyContact from '@/components/UkPropertyContact';

const UkProperty = () => {
	return (
		<div className='min-h-screen flex flex-col bg-bg-cream'>
			<Header />

			<main className='flex-1'>
				<Hero
					title='Strategic UK Property Investment Solutions'
					subtitle='Britannia Global Nexus는 런던의 프라임 부동산 시장을 탐색하는 한국 투자자에게 전문적인 지침을 제공하며, Oliver James London과의 전략적 파트너십을 통해 맞춤형 인수 및 투자 솔루션을 제공합니다.'
					backgroundImage='https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=1200'
				>
					<div className='flex flex-wrap gap-5'>
						<Button
							asChild
							className='bg-point hover:bg-point/90 text-white rounded-[15px]'
						>
							<a href='#contact'>Request Consultation</a>
						</Button>
						<Button
							variant='outline'
							className='bg-transparent text-white border-white hover:bg-white/10 rounded-[15px]'
							asChild
						>
							<a
								href='#opportunity'
								className='inline-flex items-center'
							>
								Explore Opportunities
								<ArrowRight size={16} className='ml-2' />
							</a>
						</Button>
					</div>
				</Hero>

				<section id='opportunity' className='py-24 md:py-30'>
					<div className='container mx-auto px-6'>
						<SectionTitle
							title='The Opportunity: Why Invest in London Property Now'
							subtitle='런던의 프라임 부동산 시장은 한국 투자자에게 전략적 기회를 제공합니다'
							align='center'
						/>

						<div className='max-w-3xl mx-auto'>
							<p className='text-base-dark mb-6 leading-relaxed font-light'>
								런던은 글로벌 경제 변동 속에서도 한국
								투자자들에게 회복력 있고 안정적인 부동산 시장을
								제공하는 세계적 도시로서의 위상을 유지하고
								있습니다. 현재 시장 상황은 2014년 최고치보다
								여전히 낮은 프라임 부동산 가치를 보이면서도
								장기적으로 일관된 가치 상승을 보여주고 있어,
								전략적 진입 시점을 제공합니다.
							</p>
							<p className='text-base-dark mb-6 leading-relaxed font-light'>
								전문가와 국제 학생들로부터의 강력한 임대 수요는
								안정적인 수입 흐름을 보장하며, 유리한 환율은
								한국 투자자들에게 추가적인 가치를 제공합니다.
								런던의 투명한 법률 시스템, 자유 보유권 소유
								구조, 외국인 구매자에 대한 제한 부재는 매력을
								더욱 강화합니다.
							</p>
							<p className='text-base-dark leading-relaxed font-light'>
								이러한 요소들의 조합은 특히 시장 복잡성을
								탐색하고 투자 목표에 부합하는 최적의 기회를
								식별하기 위한 전문가의 지침이 있을 때 장기적인
								전략적 투자에 매력적인 사례를 만듭니다.
							</p>
						</div>
					</div>
				</section>

				<UkPropertyServices />

				<UkPropertyPartnership />

				<UkPropertyProcess />

				<UkPropertyAreas />

				<UkPropertyInsights />

				<UkPropertyContact />
			</main>
		</div>
	);
};

export default UkProperty;

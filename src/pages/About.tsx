import {
	Building,
	Briefcase,
	Globe,
	Network,
	Shield,
	Users,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';

const About = () => {
	const executives = [
		{
			name: '김영준 (Young-Jun Kim)',
			title: 'CEO & Founder',
			bio: '20년 이상의 국제 M&A 및 경영 컨설팅 경험을 보유한 전문가. 영국 옥스퍼드 대학 MBA.',
			image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80',
		},
		{
			name: '박서연 (Seo-Yeon Park)',
			title: 'CFO',
			bio: '유럽 및 아시아 금융 시장에서 15년 경력. 런던 경제대학 금융학 박사.',
			image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80',
		},
		{
			name: 'Michael Johnson',
			title: 'Head of EMEA Advisory',
			bio: 'EMEA 지역 크로스보더 M&A 거래에 특화된 전문가. 16년간 글로벌 투자은행 경험.',
			image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80',
		},
		{
			name: '이지원 (Ji-Won Lee)',
			title: 'CTO',
			bio: '금융 기술 및 디지털 트랜스포메이션 전문가. 실리콘밸리 테크 기업 출신.',
			image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80',
		},
	];

	const advisoryServices = [
		{
			name: 'Sell-Side M&A Advisory',
			nameKr: '매각 자문',
			description:
				'기업 매각 전략 수립부터 거래 종결까지 종합적인 자문 서비스 제공',
			icon: <Building />,
		},
		{
			name: 'Buy-Side M&A Advisory',
			nameKr: '인수 자문',
			description:
				'적절한 인수 대상 발굴 및 평가, 거래 구조화, 협상 및 거래 완료 지원',
			icon: <Briefcase />,
		},
		{
			name: 'Commercial Due Diligence',
			nameKr: '상업적 실사',
			description: '시장 잠재력, 경쟁 환경, 사업 모델 지속 가능성 평가',
			icon: <Globe />,
		},
		{
			name: 'Financial Due Diligence',
			nameKr: '재무 실사',
			description:
				'재무 상태, 현금 흐름, 부채 구조 및 재무적 리스크 분석',
			icon: <Shield />,
		},
		{
			name: 'Post-Merger Integration',
			nameKr: '인수 후 통합',
			description:
				'문화적, 운영적, 재무적 통합을 통한 시너지 창출 및 가치 실현',
			icon: <Network />,
		},
		{
			name: 'Corporate Strategy Consulting',
			nameKr: '기업 전략 컨설팅',
			description:
				'장기적 성장 전략, 시장 진출 전략, 조직 구조 최적화 자문',
			icon: <Users />,
		},
	];

	return (
		<div className='min-h-screen flex flex-col'>
			<Header />

			<main className='flex-1'>
				<Hero
					title='Our Company'
					subtitle='브리타니아의 가치와 전문성을 소개합니다'
					backgroundImage='https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80'
				/>

				{/* Overview Section */}
				<section className='py-16'>
					<div className='container mx-auto px-4'>
						<SectionTitle
							title='Overview'
							subtitle='브리타니아의 미션, 비전 및 핵심 가치'
						/>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
							<div>
								<h3 className='text-xl font-semibold text-corporate-navy mb-4'>
									미션 (Mission)
								</h3>
								<p className='text-corporate-dark-gray mb-6'>
									한국 기업과 투자자들에게 글로벌 시장, 특히
									EMEA 지역에서의 성공적인 사업 확장과 투자
									기회를 제공하여 지속적인 가치 창출을
									지원합니다.
								</p>

								<h3 className='text-xl font-semibold text-corporate-navy mb-4'>
									비전 (Vision)
								</h3>
								<p className='text-corporate-dark-gray mb-6'>
									EMEA와 한국 시장을 연결하는 최고의 글로벌
									자문 및 지주회사로 성장하여, 국경을 초월한
									비즈니스 협력의 가교 역할을 수행합니다.
								</p>

								<h3 className='text-xl font-semibold text-corporate-navy mb-4'>
									핵심 가치 (Core Values)
								</h3>
								<ul className='list-disc pl-5 text-corporate-dark-gray space-y-2'>
									<li>
										전문성 (Expertise): 글로벌 금융과
										비즈니스 환경에 대한 깊은 이해와 지식
									</li>
									<li>
										신뢰성 (Integrity): 모든 비즈니스
										관계에서의 투명성과 윤리적 행동
									</li>
									<li>
										혁신 (Innovation): 변화하는 시장 환경에
										적응하고 새로운 기회를 발굴
									</li>
									<li>
										협력 (Collaboration): 고객, 파트너 및
										팀원 간의 효과적인 협업 추구
									</li>
									<li>
										글로벌 마인드 (Global Mindset): 다양한
										문화와 비즈니스 환경에 대한 이해
									</li>
								</ul>
							</div>

							<div className='bg-corporate-light-gray p-8 rounded-lg'>
								<h3 className='text-xl font-semibold text-corporate-navy mb-4'>
									브리타니아의 차별점 (Our Edge)
								</h3>
								<ul className='space-y-4'>
									<li className='flex items-start'>
										<div className='bg-white p-2 rounded-full mr-4 text-corporate-blue'>
											<Globe size={24} />
										</div>
										<div>
											<h4 className='font-semibold text-corporate-navy'>
												한국-EMEA 시장 이해
											</h4>
											<p className='text-corporate-dark-gray'>
												양 시장에 대한 깊은 전문성과
												네트워크
											</p>
										</div>
									</li>
									<li className='flex items-start'>
										<div className='bg-white p-2 rounded-full mr-4 text-corporate-blue'>
											<Briefcase size={24} />
										</div>
										<div>
											<h4 className='font-semibold text-corporate-navy'>
												통합적 접근 방식
											</h4>
											<p className='text-corporate-dark-gray'>
												지주사와 자문 역량의 시너지 효과
											</p>
										</div>
									</li>
									<li className='flex items-start'>
										<div className='bg-white p-2 rounded-full mr-4 text-corporate-blue'>
											<Network size={24} />
										</div>
										<div>
											<h4 className='font-semibold text-corporate-navy'>
												전략적 파트너십
											</h4>
											<p className='text-corporate-dark-gray'>
												글로벌 네트워크와 현지 전문성
												결합
											</p>
										</div>
									</li>
									<li className='flex items-start'>
										<div className='bg-white p-2 rounded-full mr-4 text-corporate-blue'>
											<Users size={24} />
										</div>
										<div>
											<h4 className='font-semibold text-corporate-navy'>
												다문화 전문가 팀
											</h4>
											<p className='text-corporate-dark-gray'>
												다양한 배경과 전문성을 갖춘 인재
												구성
											</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* Leadership Section */}
				<section
					className='py-16 bg-corporate-light-gray'
					id='leadership'
				>
					<div className='container mx-auto px-4'>
						<SectionTitle
							title='Leadership'
							subtitle='브리타니아를 이끄는 전문가 경영진을 소개합니다'
							align='center'
						/>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
							{executives.map((executive) => (
								<div
									key={executive.name}
									className='bg-white rounded-lg shadow-md overflow-hidden'
								>
									<div className='h-64 overflow-hidden'>
										<img
											src={executive.image}
											alt={executive.name}
											className='w-full h-full object-cover object-center'
										/>
									</div>
									<div className='p-6'>
										<h3 className='text-lg font-semibold text-corporate-navy mb-1'>
											{executive.name}
										</h3>
										<p className='text-corporate-blue mb-3'>
											{executive.title}
										</p>
										<p className='text-corporate-dark-gray text-sm'>
											{executive.bio}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Our Business Section */}
				<section className='py-16' id='business'>
					<div className='container mx-auto px-4'>
						<SectionTitle
							title='Our Business'
							subtitle='브리타니아의 핵심 사업 영역에 대해 알아보세요'
						/>

						<div className='mb-16'>
							<h3
								className='text-2xl font-semibold text-corporate-navy mb-6'
								id='holding'
							>
								지주 사업 (Holding Activities)
							</h3>
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
								<div>
									<p className='text-corporate-dark-gray mb-4'>
										브리타니아는 한국 자본을 기반으로 글로벌
										시장, 특히 EMEA 지역을 중심으로 한 지주
										사업을 운영합니다. 장기적인 가치 창출을
										목표로 선별된 기업과 자산에 전략적
										투자를 진행합니다.
									</p>
									<ul className='list-disc pl-5 text-corporate-dark-gray space-y-2'>
										<li>
											전략적 투자 철학 기반의 포트폴리오
											구성
										</li>
										<li>
											산업 트렌드와 경제적 기회를 고려한
											투자 결정
										</li>
										<li>안정적인 장기 수익률 추구</li>
										<li>
											투자 기업의 지속 가능한 성장 지원
										</li>
									</ul>
								</div>
								<div className='bg-corporate-light-gray p-6 rounded-lg'>
									<h4 className='text-lg font-semibold text-corporate-navy mb-4'>
										투자 중점 분야
									</h4>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
										<div className='bg-white p-4 rounded-md'>
											<h5 className='font-semibold text-corporate-navy'>
												기술 혁신 기업
											</h5>
											<p className='text-sm text-corporate-dark-gray'>
												미래 성장 가능성이 높은 혁신
												기술 기업
											</p>
										</div>
										<div className='bg-white p-4 rounded-md'>
											<h5 className='font-semibold text-corporate-navy'>
												전통 산업 리더
											</h5>
											<p className='text-sm text-corporate-dark-gray'>
												안정적인 실적을 가진 산업 선도
												기업
											</p>
										</div>
										<div className='bg-white p-4 rounded-md'>
											<h5 className='font-semibold text-corporate-navy'>
												인프라 및 에너지
											</h5>
											<p className='text-sm text-corporate-dark-gray'>
												장기적 수익을 창출하는 인프라
												자산
											</p>
										</div>
										<div className='bg-white p-4 rounded-md'>
											<h5 className='font-semibold text-corporate-navy'>
												금융 서비스
											</h5>
											<p className='text-sm text-corporate-dark-gray'>
												혁신적인 금융 솔루션 제공 기업
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div id='advisory'>
							<h3 className='text-2xl font-semibold text-corporate-navy mb-6'>
								자문 서비스 (Advisory Services)
							</h3>
							<p className='text-corporate-dark-gray mb-6'>
								브리타니아의 자문 서비스는 EMEA 지역에 대한 깊은
								이해와 한국 기업의 필요성에 대한 통찰력을 결합한
								종합적인 솔루션을 제공합니다. 우리의 전문가 팀은
								고객의 목표에 맞는 맞춤형 전략을 개발하고
								성공적인 거래와 비즈니스 혁신을 지원합니다.
							</p>

							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
								{advisoryServices.map((service) => (
									<div
										key={service.name}
										className='border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow'
									>
										<div className='text-corporate-blue mb-4'>
											{service.icon}
										</div>
										<h4 className='text-lg font-semibold text-corporate-navy mb-1'>
											{service.name}
										</h4>
										<p className='text-corporate-blue text-sm mb-3'>
											{service.nameKr}
										</p>
										<p className='text-corporate-dark-gray text-sm'>
											{service.description}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Global Network Section */}
				<section className='py-16 bg-corporate-light-gray' id='network'>
					<div className='container mx-auto px-4'>
						<SectionTitle
							title='Global Network'
							subtitle='브리타니아의 글로벌 비즈니스 네트워크'
							align='center'
						/>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
							<div>
								<h3 className='text-xl font-semibold text-corporate-navy mb-4'>
									전략적 위치
								</h3>
								<p className='text-corporate-dark-gray mb-6'>
									서울 여의도 IFC 타워에 위치한 브리타니아는
									한국 금융의 중심부에서 글로벌 네트워크를
									운영합니다. 우리의 위치는 아시아와 EMEA
									지역을 연결하는 전략적 허브로서의 역할을
									수행합니다.
								</p>

								<h3 className='text-xl font-semibold text-corporate-navy mb-4'>
									EMEA 연결망
								</h3>
								<p className='text-corporate-dark-gray mb-6'>
									브리타니아는 유럽, 중동, 아프리카 전역에
									걸친 광범위한 파트너십 네트워크를 구축하고
									있습니다. 이를 통해 현지 시장 인사이트, 규제
									환경 이해, 비즈니스 기회 발굴 등 고객에게
									필요한 전문성을 제공합니다.
								</p>

								<h3 className='text-xl font-semibold text-corporate-navy mb-4'>
									전략적 파트너십
								</h3>
								<p className='text-corporate-dark-gray'>
									주요 금융 기관, 법률 및 회계 법인, 산업
									전문가 등과의 협력을 통해 고객에게 포괄적인
									서비스를 제공합니다. 이러한 파트너십은 거래
									소싱, 실사, 협상 및 거래 완료 과정에서
									강력한 지원 체계를 구축합니다.
								</p>
							</div>

							<div className='bg-white p-6 rounded-lg shadow-md'>
								<img
									src='https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80'
									alt='Global Network'
									className='w-full h-auto rounded-md mb-6'
								/>
								<div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
									<div className='text-center'>
										<div className='text-3xl font-bold text-corporate-navy'>
											30+
										</div>
										<p className='text-corporate-dark-gray text-sm'>
											파트너 국가
										</p>
									</div>
									<div className='text-center'>
										<div className='text-3xl font-bold text-corporate-navy'>
											50+
										</div>
										<p className='text-corporate-dark-gray text-sm'>
											전략적 파트너십
										</p>
									</div>
									<div className='text-center'>
										<div className='text-3xl font-bold text-corporate-navy'>
											200+
										</div>
										<p className='text-corporate-dark-gray text-sm'>
											전문가 네트워크
										</p>
									</div>
									<div className='text-center'>
										<div className='text-3xl font-bold text-corporate-navy'>
											5
										</div>
										<p className='text-corporate-dark-gray text-sm'>
											주요 EMEA 허브
										</p>
									</div>
									<div className='text-center'>
										<div className='text-3xl font-bold text-corporate-navy'>
											15+
										</div>
										<p className='text-corporate-dark-gray text-sm'>
											산업 분야
										</p>
									</div>
									<div className='text-center'>
										<div className='text-3xl font-bold text-corporate-navy'>
											24/7
										</div>
										<p className='text-corporate-dark-gray text-sm'>
											글로벌 운영
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default About;

import { Shield, Users, Leaf } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';

const Esg = () => {
	const esgFocus = [
		{
			area: 'Governance',
			commits: [
				{
					title: '이사회 독립성 및 전문성',
					description:
						'투명하고 독립적인 이사회 운영과 글로벌 전문가 참여',
				},
				{
					title: '윤리적 행동 및 규정 준수',
					description:
						'엄격한 윤리 규범과 국제 표준 준수를 통한 신뢰 구축',
				},
				{
					title: '이해관계자 커뮤니케이션',
					description: '투명한 정보 공개와 이해관계자 참여 확대',
				},
			],
			icon: <Shield className='h-8 w-8' />,
			color: 'bg-blue-50',
			iconColor: 'text-blue-600',
		},
		{
			area: 'Social',
			commits: [
				{
					title: '인재 개발 및 다양성/포용성',
					description:
						'다양한 배경의 인재 육성 및 포용적 조직문화 구축',
				},
				{
					title: '근무 환경 및 직원 웰빙',
					description:
						'건강하고 균형 잡힌 근무 환경과 직원 복지 증진',
				},
				{
					title: '책임있는 자문 및 투자',
					description:
						'사회적 영향을 고려한 투자 결정과 자문 서비스 제공',
				},
			],
			icon: <Users className='h-8 w-8' />,
			color: 'bg-purple-50',
			iconColor: 'text-purple-600',
		},
		{
			area: 'Environmental',
			commits: [
				{
					title: '기후 변화 리스크 관리',
					description:
						'투자 및 자문 과정에서의 기후 변화 리스크 분석 및 고려',
				},
				{
					title: '자원 효율성 및 환경 영향 최소화',
					description:
						'사무실 운영에서의 에너지 효율성 증진 및 탄소 발자국 감소',
				},
			],
			icon: <Leaf className='h-8 w-8' />,
			color: 'bg-green-50',
			iconColor: 'text-green-600',
		},
	];

	return (
		<div className='min-h-screen flex flex-col'>
			<Header />

			<main className='flex-1'>
				<Hero
					title='ESG Management'
					subtitle='브리타니아의 지속 가능한 비즈니스 철학과 ESG 경영 원칙'
					backgroundImage='https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80'
				/>

				{/* Our Commitment Section */}
				<section className='py-16'>
					<div className='container mx-auto px-4'>
						<SectionTitle
							title='Our Commitment'
							subtitle='브리타니아의 ESG 약속과 철학'
							align='center'
						/>

						<div className='max-w-3xl mx-auto'>
							<div className='bg-corporate-light-gray p-8 rounded-lg mb-8'>
								<h3 className='text-xl font-semibold text-corporate-navy mb-4'>
									CEO 메시지
								</h3>
								<blockquote className='text-corporate-dark-gray border-l-4 border-corporate-blue pl-4 italic'>
									"브리타니아는 지속 가능한 비즈니스 관행이
									장기적 성공의 핵심이라고 믿습니다. 우리는
									재무적 성과뿐만 아니라 사회와 환경에 미치는
									영향을 고려하는 균형 잡힌 접근 방식을
									취합니다. ESG 원칙은 우리의 모든 의사 결정과
									비즈니스 활동의 핵심에 있습니다."
									<footer className='mt-2 text-corporate-blue font-normal not-italic'>
										- 김영준, CEO & Founder
									</footer>
								</blockquote>
							</div>

							<p className='text-corporate-dark-gray mb-6'>
								브리타니아는 한국 자본을 기반으로 한 글로벌
								기업으로서, 우리의 비즈니스 활동이 사회와 환경에
								미치는 영향을 깊이 이해하고 있습니다. 우리는
								지배구조, 사회적 책임, 환경 고려 등 ESG 원칙을
								경영 활동에 통합함으로써 장기적이고 지속 가능한
								가치를 창출하기 위해 노력하고 있습니다.
							</p>

							<p className='text-corporate-dark-gray mb-6'>
								우리의 ESG 전략은 다음과 같은 핵심 원칙에
								기반합니다:
							</p>

							<ul className='list-disc pl-5 text-corporate-dark-gray space-y-2 mb-6'>
								<li>
									<strong>통합적 접근:</strong> ESG 요소를
									투자 결정, 자문 서비스, 내부 운영에 통합
								</li>
								<li>
									<strong>지속적 개선:</strong> ESG 성과 측정
									및 지속적인 개선 추구
								</li>
								<li>
									<strong>투명성:</strong> ESG 활동, 성과,
									도전 과제에 대한 투명한 보고
								</li>
								<li>
									<strong>이해관계자 참여:</strong> 직원,
									고객, 투자자, 지역사회와의 적극적인 소통
								</li>
							</ul>

							<p className='text-corporate-dark-gray'>
								브리타니아는 향후 국제 표준에 부합하는 ESG
								보고서를 발간할 예정이며, GRI(Global Reporting
								Initiative)와 SASB(Sustainability Accounting
								Standards Board) 프레임워크를 참고하여 ESG
								성과를 투명하게 공개할 계획입니다.
							</p>
						</div>
					</div>
				</section>

				{/* ESG Focus Areas Section */}
				<section className='py-16 bg-corporate-light-gray'>
					<div className='container mx-auto px-4'>
						<SectionTitle
							title='ESG Focus Areas & Commitments'
							subtitle='브리타니아의 ESG 중점 분야 및 약속'
							align='center'
						/>

						<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
							{esgFocus.map((area) => (
								<div
									key={area.area}
									className={`${area.color} rounded-lg p-6 shadow-sm`}
								>
									<div className='flex items-center mb-4'>
										<div
											className={`p-2 rounded-full ${area.iconColor} bg-white mr-3`}
										>
											{area.icon}
										</div>
										<h3 className='text-xl font-bold text-corporate-navy'>
											{area.area}
										</h3>
									</div>

									<div className='space-y-4'>
										{area.commits.map((commit) => (
											<div
												key={commit.title}
												className='bg-white p-4 rounded-md'
											>
												<h4 className='font-semibold text-corporate-navy mb-1'>
													{commit.title}
												</h4>
												<p className='text-sm text-corporate-dark-gray'>
													{commit.description}
												</p>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Governance Section */}
				<section className='py-16'>
					<div className='container mx-auto px-4'>
						<SectionTitle
							title='Governance'
							subtitle='브리타니아는 투명하고 윤리적인 지배구조를 핵심 원칙으로 삼습니다'
						/>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
							<div>
								<h3 className='text-lg font-semibold text-corporate-navy mb-4'>
									투명한 지배구조
								</h3>
								<p className='text-corporate-dark-gray mb-6'>
									브리타니아는 독립적이고 다양한 배경을 가진
									이사회를 통해 기업 지배구조의 투명성을
									확보합니다. 우리의 이사회는 재무, M&A, ESG,
									리스크 관리 등 다양한 분야의 전문가로
									구성되어 있으며, 정기적인 회의를 통해 기업
									전략과 운영에 관한 중요한 결정을 내립니다.
								</p>

								<h3 className='text-lg font-semibold text-corporate-navy mb-4'>
									윤리 강령 및 규정 준수
								</h3>
								<p className='text-corporate-dark-gray mb-6'>
									엄격한 윤리 강령을 기반으로 모든 임직원이
									높은 윤리적 기준을 유지하도록 합니다. 우리는
									뇌물 및 부패 방지, 이해 충돌 관리, 내부
									고발자 보호, 개인정보 보호 등에 관한 명확한
									정책을 시행하며, 정기적인 교육을 통해 윤리적
									문화를 강화합니다.
								</p>

								<div className='bg-corporate-light-gray p-6 rounded-lg'>
									<h4 className='text-corporate-navy font-semibold mb-2'>
										지배구조 핵심 원칙
									</h4>
									<blockquote className='pl-4 border-l-2 border-corporate-blue text-corporate-dark-gray italic'>
										"Britannia considers transparent and
										ethical Governance as a core principle
										of corporate operation..."
									</blockquote>
									<ul className='mt-4 space-y-2 text-corporate-dark-gray'>
										<li className='flex items-start'>
											<div className='rounded-full bg-corporate-blue/20 p-1 mr-2 mt-1'>
												<div className='w-2 h-2 rounded-full bg-corporate-blue'></div>
											</div>
											<span>
												이사회 독립성 및 다양성 확보
											</span>
										</li>
										<li className='flex items-start'>
											<div className='rounded-full bg-corporate-blue/20 p-1 mr-2 mt-1'>
												<div className='w-2 h-2 rounded-full bg-corporate-blue'></div>
											</div>
											<span>
												윤리적 의사결정 및 행동 장려
											</span>
										</li>
										<li className='flex items-start'>
											<div className='rounded-full bg-corporate-blue/20 p-1 mr-2 mt-1'>
												<div className='w-2 h-2 rounded-full bg-corporate-blue'></div>
											</div>
											<span>
												이해관계자와의 투명한 소통
											</span>
										</li>
										<li className='flex items-start'>
											<div className='rounded-full bg-corporate-blue/20 p-1 mr-2 mt-1'>
												<div className='w-2 h-2 rounded-full bg-corporate-blue'></div>
											</div>
											<span>
												리스크 관리 및 내부 통제 강화
											</span>
										</li>
									</ul>
								</div>
							</div>

							<div>
								<h3 className='text-lg font-semibold text-corporate-navy mb-4'>
									리스크 관리
								</h3>
								<p className='text-corporate-dark-gray mb-6'>
									포괄적인 리스크 관리 프레임워크를 통해 재무,
									운영, 평판, ESG 관련 리스크를 식별하고
									관리합니다. 정기적인 리스크 평가를 수행하며,
									이사회 산하 리스크 관리 위원회가 전반적인
									리스크 감독을 담당합니다.
								</p>

								<h3 className='text-lg font-semibold text-corporate-navy mb-4'>
									정보 보안 및 데이터 보호
								</h3>
								<p className='text-corporate-dark-gray mb-6'>
									고객 및 파트너의 민감한 정보를 보호하기 위해
									강력한 정보 보안 정책과 시스템을 유지합니다.
									정기적인 보안 감사와 직원 교육을 통해 데이터
									보호 문화를 강화합니다.
								</p>

								<h3 className='text-lg font-semibold text-corporate-navy mb-4'>
									이해관계자 참여
								</h3>
								<p className='text-corporate-dark-gray'>
									주주, 고객, 직원, 지역사회 등 모든
									이해관계자와 투명하고 열린 소통을
									유지합니다. 정기적인 보고, 미팅, 피드백
									채널을 통해 이해관계자의 의견을 수렴하고,
									이를 경영 의사결정에 반영합니다.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Social Section */}
				<section className='py-16 bg-corporate-light-gray'>
					<div className='container mx-auto px-4'>
						<SectionTitle
							title='Social'
							subtitle='브리타니아의 사회적 책임과 인적 자본 관리 접근법'
						/>

						<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
							<div className='bg-white p-6 rounded-lg shadow-sm'>
								<h3 className='text-lg font-semibold text-corporate-navy mb-4 border-b border-gray-200 pb-3'>
									인재 개발 및 다양성
								</h3>
								<ul className='space-y-4'>
									<li>
										<h4 className='font-medium text-corporate-navy'>
											글로벌 인재 육성
										</h4>
										<p className='text-sm text-corporate-dark-gray'>
											EMEA-한국 시장을 연결하는 전문성
											개발 프로그램 운영
										</p>
									</li>
									<li>
										<h4 className='font-medium text-corporate-navy'>
											다양성 및 포용성 증진
										</h4>
										<p className='text-sm text-corporate-dark-gray'>
											다양한 배경과 관점을 가진 인재 채용
											및 육성
										</p>
									</li>
									<li>
										<h4 className='font-medium text-corporate-navy'>
											멘토링 및 성장 기회
										</h4>
										<p className='text-sm text-corporate-dark-gray'>
											체계적인 멘토링 프로그램과 경력 개발
											지원
										</p>
									</li>
								</ul>
							</div>

							<div className='bg-white p-6 rounded-lg shadow-sm'>
								<h3 className='text-lg font-semibold text-corporate-navy mb-4 border-b border-gray-200 pb-3'>
									근무 환경 및 직원 웰빙
								</h3>
								<ul className='space-y-4'>
									<li>
										<h4 className='font-medium text-corporate-navy'>
											워라밸 문화
										</h4>
										<p className='text-sm text-corporate-dark-gray'>
											유연한 근무 제도와 건강한 일-삶 균형
											촉진
										</p>
									</li>
									<li>
										<h4 className='font-medium text-corporate-navy'>
											건강 및 웰빙 프로그램
										</h4>
										<p className='text-sm text-corporate-dark-gray'>
											직원 건강 검진 및 심리 상담 지원
										</p>
									</li>
									<li>
										<h4 className='font-medium text-corporate-navy'>
											공정한 보상 및 인정
										</h4>
										<p className='text-sm text-corporate-dark-gray'>
											투명한 성과 평가와 보상 체계 운영
										</p>
									</li>
								</ul>
							</div>

							<div className='bg-white p-6 rounded-lg shadow-sm'>
								<h3 className='text-lg font-semibold text-corporate-navy mb-4 border-b border-gray-200 pb-3'>
									사회적 책임
								</h3>
								<ul className='space-y-4'>
									<li>
										<h4 className='font-medium text-corporate-navy'>
											책임있는 자문 및 투자
										</h4>
										<p className='text-sm text-corporate-dark-gray'>
											ESG 요소를 고려한 투자 및 자문
											의사결정
										</p>
									</li>
									<li>
										<h4 className='font-medium text-corporate-navy'>
											지역사회 참여
										</h4>
										<p className='text-sm text-corporate-dark-gray'>
											임직원 자원봉사 및 지역사회 발전
											프로젝트 지원
										</p>
									</li>
									<li>
										<h4 className='font-medium text-corporate-navy'>
											금융 교육 프로그램
										</h4>
										<p className='text-sm text-corporate-dark-gray'>
											미래 세대를 위한 금융 리터러시 향상
											프로그램
										</p>
									</li>
								</ul>
							</div>
						</div>

						<div className='mt-12 bg-white p-8 rounded-lg shadow-sm'>
							<h3 className='text-xl font-semibold text-corporate-navy mb-6 text-center'>
								브리타니아 사회적 영향 지표
							</h3>
							<div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
								<div>
									<div className='text-3xl font-bold text-corporate-blue mb-2'>
										40%
									</div>
									<p className='text-corporate-dark-gray text-sm'>
										여성 임직원 비율
									</p>
								</div>
								<div>
									<div className='text-3xl font-bold text-corporate-blue mb-2'>
										12
									</div>
									<p className='text-corporate-dark-gray text-sm'>
										지원 사회 프로젝트
									</p>
								</div>
								<div>
									<div className='text-3xl font-bold text-corporate-blue mb-2'>
										500+
									</div>
									<p className='text-corporate-dark-gray text-sm'>
										연간 교육 시간/인당
									</p>
								</div>
								<div>
									<div className='text-3xl font-bold text-corporate-blue mb-2'>
										10+
									</div>
									<p className='text-corporate-dark-gray text-sm'>
										임직원 국적 수
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Environmental Section */}
				<section className='py-16'>
					<div className='container mx-auto px-4'>
						<SectionTitle
							title='Environmental'
							subtitle='브리타니아의 환경 영향 관리 및 지속 가능한 비즈니스 관행'
						/>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
							<div>
								<h3 className='text-lg font-semibold text-corporate-navy mb-4'>
									기후 변화 대응
								</h3>
								<p className='text-corporate-dark-gray mb-6'>
									브리타니아는 기후 변화가 비즈니스와 사회에
									미치는 영향을 인식하고, 이를 투자 결정과
									자문 서비스에 통합하고 있습니다. 우리는 기후
									관련 리스크를 평가하고, 친환경 투자 기회를
									발굴하며, 고객사의 지속 가능한 전환을
									지원합니다.
								</p>

								<h3 className='text-lg font-semibold text-corporate-navy mb-4'>
									자원 효율성
								</h3>
								<p className='text-corporate-dark-gray mb-6'>
									사무실 운영에서의 에너지 효율성 증진, 종이
									사용 감소, 폐기물 관리 개선을 통해 환경
									영향을 최소화하기 위해 노력합니다. 디지털
									문서 관리 시스템 도입, 에너지 효율적인 사무
									장비 사용, 재활용 프로그램 운영 등의
									이니셔티브를 실행하고 있습니다.
								</p>

								<h3 className='text-lg font-semibold text-corporate-navy mb-4'>
									지속 가능한 출장 및 통근
								</h3>
								<p className='text-corporate-dark-gray'>
									불필요한 출장을 줄이기 위해 화상 회의 활용을
									장려하고, 필수적인 출장에 대해서는 탄소 상쇄
									프로그램을 지원합니다. 또한 직원들의
									대중교통 이용 및 카풀 장려를 통해 통근으로
									인한 환경 영향을 감소시키고 있습니다.
								</p>
							</div>

							<div className='bg-corporate-light-gray p-6 rounded-lg'>
								<h3 className='text-lg font-semibold text-corporate-navy mb-6 text-center'>
									환경 영향 관리 전략
								</h3>
								<div className='space-y-6'>
									<div className='bg-white p-4 rounded-md'>
										<h4 className='font-medium text-corporate-navy flex items-center'>
											<div className='w-3 h-3 rounded-full bg-green-500 mr-2'></div>
											투자 및 자문에서의 환경적 고려
										</h4>
										<ul className='mt-2 text-sm text-corporate-dark-gray space-y-1 pl-5'>
											<li>ESG 요소를 투자 분석에 통합</li>
											<li>
												기후 리스크를 고려한 포트폴리오
												구성
											</li>
											<li>
												친환경 산업 및 기술에 대한 투자
												기회 발굴
											</li>
										</ul>
									</div>

									<div className='bg-white p-4 rounded-md'>
										<h4 className='font-medium text-corporate-navy flex items-center'>
											<div className='w-3 h-3 rounded-full bg-blue-500 mr-2'></div>
											운영상 환경 영향 최소화
										</h4>
										<ul className='mt-2 text-sm text-corporate-dark-gray space-y-1 pl-5'>
											<li>에너지 효율적인 사무실 운영</li>
											<li>
												디지털 전환을 통한 종이 사용
												감소
											</li>
											<li>
												폐기물 최소화 및 재활용 프로그램
											</li>
										</ul>
									</div>

									<div className='bg-white p-4 rounded-md'>
										<h4 className='font-medium text-corporate-navy flex items-center'>
											<div className='w-3 h-3 rounded-full bg-purple-500 mr-2'></div>
											측정 및 보고
										</h4>
										<ul className='mt-2 text-sm text-corporate-dark-gray space-y-1 pl-5'>
											<li>환경 지표 모니터링 및 측정</li>
											<li>
												탄소 발자국 계산 및 저감 목표
												설정
											</li>
											<li>
												국제 표준에 부합하는 환경 성과
												보고
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Reports Section */}
				<section className='py-16 bg-corporate-light-gray'>
					<div className='container mx-auto px-4'>
						<SectionTitle
							title='ESG Reports & Disclosures'
							subtitle='브리타니아의 ESG 성과 및 보고 계획'
							align='center'
						/>

						<div className='max-w-3xl mx-auto text-center'>
							<p className='text-corporate-dark-gray mb-8'>
								브리타니아는 ESG 성과에 대한 투명한 공개와
								보고의 중요성을 인식하고 있습니다. 현재 우리는
								국제 표준에 부합하는 ESG 보고 프레임워크를 구축
								중이며, 향후 정기적인 ESG 보고서를 발간할
								예정입니다.
							</p>

							<div className='bg-white p-6 rounded-lg shadow-sm mb-8'>
								<h3 className='text-lg font-semibold text-corporate-navy mb-4'>
									ESG 보고 접근법
								</h3>
								<ul className='text-left text-corporate-dark-gray space-y-3'>
									<li className='flex items-start'>
										<div className='rounded-full bg-corporate-blue/20 p-1 mr-2 mt-1'>
											<div className='w-2 h-2 rounded-full bg-corporate-blue'></div>
										</div>
										<span>
											GRI(Global Reporting Initiative) 및
											SASB(Sustainability Accounting
											Standards Board) 프레임워크 참조
										</span>
									</li>
									<li className='flex items-start'>
										<div className='rounded-full bg-corporate-blue/20 p-1 mr-2 mt-1'>
											<div className='w-2 h-2 rounded-full bg-corporate-blue'></div>
										</div>
										<span>
											실질적 중요성 평가를 통한 핵심 ESG
											지표 선정
										</span>
									</li>
									<li className='flex items-start'>
										<div className='rounded-full bg-corporate-blue/20 p-1 mr-2 mt-1'>
											<div className='w-2 h-2 rounded-full bg-corporate-blue'></div>
										</div>
										<span>
											정량적 지표와 정성적 정보의 균형
											있는 제공
										</span>
									</li>
									<li className='flex items-start'>
										<div className='rounded-full bg-corporate-blue/20 p-1 mr-2 mt-1'>
											<div className='w-2 h-2 rounded-full bg-corporate-blue'></div>
										</div>
										<span>
											목표 설정과 진행 상황 추적을 통한
											지속적 개선
										</span>
									</li>
								</ul>
							</div>

							<p className='text-corporate-dark-gray'>
								첫 번째 ESG 보고서는 2026년에 발행될 예정이며,
								이후 매년 정기적으로 발행할 계획입니다. 보고서는
								이해관계자들에게 브리타니아의 ESG 성과,
								이니셔티브, 도전 과제 및 미래 계획에 대한
								포괄적인 인사이트를 제공할 것입니다.
							</p>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default Esg;

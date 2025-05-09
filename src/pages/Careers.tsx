import { CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

const Careers = () => {
	const benefits = [
		{
			title: '글로벌 경험',
			description:
				'국경을 초월한 M&A 거래와 자문 프로젝트를 통한 국제적 경험',
		},
		{
			title: '지속적 성장',
			description:
				'지속적인 학습과 전문성 개발을 위한 체계적인 교육 프로그램',
		},
		{
			title: '멘토링 기회',
			description: '업계 전문가들의 직접적인 지도와 멘토링',
		},
		{
			title: '균형 잡힌 근무 환경',
			description: '유연 근무제 및 일과 삶의 균형을 중시하는 문화',
		},
		{
			title: '경쟁력 있는 보상',
			description: '성과에 기반한 경쟁력 있는 보상 패키지',
		},
		{
			title: '글로벌 네트워크',
			description:
				'다양한 국적의 전문가들과 협업하며 글로벌 네트워크 구축',
		},
	];

	const testimonials = [
		{
			name: '박지현',
			position: 'Senior Associate, M&A Advisory',
			quote: '브리타니아에서의 경험은 단순한 직업 이상입니다. 유럽과 아시아를 연결하는 크로스보더 거래에 참여하면서 글로벌 금융 전문가로 성장할 수 있었습니다.',
			image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80',
		},
		{
			name: 'David Kim',
			position: 'Associate Director, Corporate Strategy',
			quote: '브리타니아는 전문성 개발과 글로벌 경험을 추구하는 인재들에게 최적의 환경을 제공합니다. 다양한 배경을 가진 동료들과 함께 일하며 시야가 넓어졌습니다.',
			image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80',
		},
		{
			name: '이수진',
			position: 'Analyst, Investment Team',
			quote: '브리타니아의 멘토링 프로그램은 제 경력 발전에 큰 도움이 되었습니다. 선배들의 지도와 지원 속에서 빠르게 성장하고 있음을 느낍니다.',
			image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80',
		},
	];

	const openings = [
		{
			title: 'Senior Associate, M&A Advisory',
			department: 'Advisory Services',
			location: 'Seoul, Korea',
			type: 'Full-time',
			requirements: [
				'5년 이상의 M&A 자문 또는 투자 은행 경험',
				'유럽 시장에 대한 이해 및 관련 경험',
				'탁월한 재무 분석 및 모델링 능력',
				'유창한 영어 및 한국어 구사 능력',
				'관련 MBA 또는 석사 학위 보유자 우대',
			],
		},
		{
			title: 'Associate, Investment Team',
			department: 'Holding Business',
			location: 'Seoul, Korea',
			type: 'Full-time',
			requirements: [
				'3년 이상의 사모펀드, 벤처 캐피털 또는 투자 관련 경험',
				'강력한 재무 및 비즈니스 분석 능력',
				'투자 기회 발굴 및 평가 경험',
				'영어 의사소통 능력 필수',
				'관련 학위 및 CFA 자격증 보유자 우대',
			],
		},
		{
			title: 'Consultant, Management Consulting',
			department: 'Advisory Services',
			location: 'Seoul, Korea',
			type: 'Full-time',
			requirements: [
				'3-5년의 경영 컨설팅 경험',
				'PMI(Post-Merger Integration) 또는 조직 변화 관리 프로젝트 경험',
				'데이터 기반 의사결정 및 프레젠테이션 능력',
				'원활한 영어 의사소통 능력',
				'관련 분야 학위 소지자',
			],
		},
	];

	const applicationSteps = [
		{
			step: '1',
			title: '서류 지원',
			description:
				'이력서, 자기소개서, 성적증명서 등 필요 서류를 온라인으로 제출',
		},
		{
			step: '2',
			title: '서류 심사',
			description: '지원자의 경력, 학력, 역량 등을 종합적으로 평가',
		},
		{
			step: '3',
			title: '온라인 평가',
			description:
				'직무 관련 지식, 분석 능력, 영어 능력 등을 평가하는 온라인 테스트',
		},
		{
			step: '4',
			title: '1차 면접',
			description: 'HR 담당자 및 팀 리더와의 일반적인 면접',
		},
		{
			step: '5',
			title: '2차 면접',
			description: '경영진과의 심층 면접 및 케이스 스터디 프레젠테이션',
		},
		{
			step: '6',
			title: '최종 합격',
			description: '합격자에게 개별 통보 및 입사 절차 안내',
		},
	];

	return (
		<div className='min-h-screen flex flex-col'>
			<Header />

			<main className='flex-1'>
				<Hero
					title='Careers at Britannia'
					subtitle='글로벌 금융 전문성을 키우고 경력을 발전시킬 수 있는 기회'
					backgroundImage='https://images.unsplash.com/photo-1496902526517-c0f2cb8fdb6a?q=80'
				>
					<Button className='bg-corporate-blue hover:bg-corporate-teal'>
						채용 공고 보기
					</Button>
				</Hero>

				{/* Why Britannia Section */}
				<section className='py-16' id='why-britannia'>
					<div className='container mx-auto px-4'>
						<SectionTitle
							title='Why Britannia Inc.'
							subtitle='브리타니아에서 경력을 쌓아야 하는 이유'
							align='center'
						/>

						<div className='max-w-3xl mx-auto mb-12'>
							<div className='bg-corporate-light-gray p-8 rounded-lg'>
								<blockquote className='text-corporate-dark-gray italic mb-4'>
									"Do you want to cultivate Global Financial
									Expertise at the center of cross-border M&A
									Deals?"
								</blockquote>
								<p className='text-corporate-dark-gray'>
									브리타니아는 한국 자본을 기반으로 EMEA
									시장을 연결하는 글로벌 M&A 및 경영 자문 전문
									기업입니다. 우리와 함께라면 국경을 초월한
									거래 경험, 다양한 문화와 비즈니스 환경에
									대한 이해, 그리고 글로벌 금융 전문가로서의
									성장 기회를 얻을 수 있습니다.
								</p>
							</div>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{benefits.map((benefit) => (
								<div
									key={benefit.title}
									className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'
								>
									<h3 className='text-lg font-semibold text-corporate-navy mb-2 flex items-center'>
										<CheckCircle2 className='h-5 w-5 text-corporate-blue mr-2' />
										{benefit.title}
									</h3>
									<p className='text-corporate-dark-gray'>
										{benefit.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Life at Britannia Section */}
				<section className='py-16 bg-corporate-light-gray' id='life'>
					<div className='container mx-auto px-4'>
						<SectionTitle
							title='Life at Britannia'
							subtitle='브리타니아에서의 일상과 기업 문화'
						/>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
							<div>
								<h3 className='text-xl font-semibold text-corporate-navy mb-4'>
									우리의 기업 문화
								</h3>
								<p className='text-corporate-dark-gray mb-6'>
									브리타니아는 성과 지향적이면서도 협력적인
									문화를 추구합니다. 우리는 서로의 다양한
									배경과 관점을 존중하며, 열린 소통을 통해
									최선의 결과를 도출합니다. 수평적인 조직 문화
									속에서 모든 구성원이 자유롭게 아이디어를
									제안하고 토론할 수 있습니다.
								</p>

								<h3 className='text-xl font-semibold text-corporate-navy mb-4'>
									성장과 발전
								</h3>
								<p className='text-corporate-dark-gray mb-6'>
									우리는 모든 직원의 지속적인 성장을
									지원합니다. 정기적인 교육 프로그램, 글로벌
									컨퍼런스 참여 기회, 직무 순환 제도 등을 통해
									다양한 경험과 지식을 쌓을 수 있는 환경을
									제공합니다.
								</p>

								<h3 className='text-xl font-semibold text-corporate-navy mb-4'>
									일과 삶의 균형
								</h3>
								<p className='text-corporate-dark-gray'>
									브리타니아는 직원들의 일과 삶의 균형을
									중시합니다. 유연 근무제, 재택 근무 옵션,
									가족 친화적 정책 등을 통해 직원들이 일과
									개인 생활을 조화롭게 유지할 수 있도록
									지원합니다.
								</p>
							</div>

							<div className='space-y-6'>
								{testimonials.map((testimonial) => (
									<div
										key={testimonial.name}
										className='bg-white p-6 rounded-lg shadow-sm flex'
									>
										<div className='flex-shrink-0 mr-4'>
											<img
												src={testimonial.image}
												alt={testimonial.name}
												className='w-16 h-16 rounded-full object-cover'
											/>
										</div>
										<div>
											<p className='text-corporate-dark-gray italic mb-3'>
												"{testimonial.quote}"
											</p>
											<p className='font-semibold text-corporate-navy'>
												{testimonial.name}
											</p>
											<p className='text-sm text-corporate-blue'>
												{testimonial.position}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Current Opportunities Section */}
				<section className='py-16' id='opportunities'>
					<div className='container mx-auto px-4'>
						<SectionTitle
							title='Current Opportunities'
							subtitle='브리타니아에서 함께할 인재를 찾고 있습니다'
							align='center'
						/>

						<div className='space-y-6 max-w-4xl mx-auto'>
							{openings.map((job, index) => (
								<Accordion
									type='single'
									collapsible
									key={index}
								>
									<AccordionItem
										value={`item-${index}`}
										className='border rounded-lg overflow-hidden'
									>
										<AccordionTrigger className='px-6 py-4 hover:no-underline hover:bg-corporate-light-gray'>
											<div className='flex flex-col md:flex-row md:items-center justify-between w-full text-left'>
												<div className='font-semibold text-lg text-corporate-navy'>
													{job.title}
												</div>
												<div className='flex flex-wrap gap-2 mt-2 md:mt-0'>
													<span className='bg-corporate-light-gray text-corporate-dark-gray text-xs px-2 py-1 rounded'>
														{job.department}
													</span>
													<span className='bg-corporate-light-gray text-corporate-dark-gray text-xs px-2 py-1 rounded'>
														{job.location}
													</span>
													<span className='bg-corporate-light-gray text-corporate-dark-gray text-xs px-2 py-1 rounded'>
														{job.type}
													</span>
												</div>
											</div>
										</AccordionTrigger>
										<AccordionContent className='px-6 py-4'>
											<div className='space-y-4'>
												<div>
													<h4 className='font-semibold text-corporate-navy mb-2'>
														주요 자격 요건
													</h4>
													<ul className='list-disc pl-5 text-corporate-dark-gray space-y-1'>
														{job.requirements.map(
															(req, idx) => (
																<li key={idx}>
																	{req}
																</li>
															),
														)}
													</ul>
												</div>
												<div className='pt-4'>
													<Button className='bg-corporate-blue hover:bg-corporate-teal'>
														지원하기
													</Button>
												</div>
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							))}
						</div>

						<div className='mt-12 text-center'>
							<p className='text-corporate-dark-gray mb-4'>
								적합한 포지션을 찾지 못하셨나요? 우리는 항상
								뛰어난 인재를 찾고 있습니다.
							</p>
							<Button
								variant='outline'
								className='border-corporate-blue text-corporate-blue hover:bg-corporate-blue hover:text-white'
							>
								일반 지원서 제출하기
							</Button>
						</div>
					</div>
				</section>

				{/* Application Process Section */}
				<section className='py-16 bg-corporate-light-gray' id='apply'>
					<div className='container mx-auto px-4'>
						<SectionTitle
							title='How to Apply'
							subtitle='브리타니아 채용 과정을 안내합니다'
							align='center'
						/>

						<div className='max-w-4xl mx-auto'>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{applicationSteps.map((step) => (
									<div
										key={step.step}
										className='bg-white p-6 rounded-lg border-gray-200 border-solid border-2'
									>
										<div className='w-10 h-10 rounded-full bg-gray-100 bg-corporate-blue text-secondary flex items-center justify-center font-bold mb-4'>
											{step.step}
										</div>
										<h3 className='text-lg font-semibold text-corporate-navy mb-2'>
											{step.title}
										</h3>
										<p className='text-corporate-dark-gray'>
											{step.description}
										</p>
									</div>
								))}
							</div>

							<div className='bg-white p-8 rounded-lg shadow-sm mt-12'>
								<h3 className='text-xl font-semibold text-corporate-navy mb-4'>
									지원 시 필요 서류
								</h3>
								<ul className='list-disc pl-5 text-corporate-dark-gray space-y-2'>
									<li>이력서 (영문 및 국문)</li>
									<li>
										자기소개서 (경력 목표 및 브리타니아에
										지원하는 이유 포함)
									</li>
									<li>최종 학력 성적증명서</li>
									<li>경력 증명서 (해당되는 경우)</li>
									<li>영어 능력 증명서 (TOEIC, TOEFL 등)</li>
									<li>추가 자격증 사본 (해당되는 경우)</li>
								</ul>
								<div className='mt-6'>
									<p className='text-corporate-dark-gray mb-4'>
										모든 지원서는{' '}
										<strong>
											careers@britannia-inc.com
										</strong>
										으로 제출해 주시기 바랍니다.
									</p>
									<Button className='bg-corporate-blue hover:bg-corporate-teal'>
										채용 페이지로 이동
									</Button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default Careers;

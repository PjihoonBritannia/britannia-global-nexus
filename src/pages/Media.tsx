import { CalendarIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const Media = () => {
	const news = [
		{
			id: '1',
			title: '브리타니아, 유럽 기술 기업 인수 자문 성공적 완료',
			excerpt:
				'브리타니아가 한국 대기업의 유럽 기술 기업 인수에 관한 자문을 성공적으로 완료하며 EMEA 시장 진출 지원.',
			content:
				'브리타니아 Inc.는 최근 한국 대기업의 유럽 기술 기업 인수 과정에서 주요 재무 및 전략 자문사로 참여해 성공적인 거래를 이끌었습니다. 이번 거래는 한국 기업의 유럽 시장 진출을 위한 중요한 이정표가 될 것으로 기대됩니다. 브리타니아는 대상 기업 발굴부터 재무 실사, 협상 및 거래 종결까지 전 과정을 지원했습니다.',
			date: '2023-04-25',
			category: '보도 자료',
			image: 'https://images.unsplash.com/photo-1605460375648-278bcbd579a6',
		},
		{
			id: '2',
			title: '신임 리더십 팀 발표: 글로벌 비즈니스 확장 가속화',
			excerpt:
				'브리타니아가 유럽 및 중동 지역 확장을 위한 신임 리더십 팀 구성을 발표하며 글로벌 비즈니스 확장에 박차를 가합니다.',
			content:
				'브리타니아 Inc.는 EMEA 지역 내 비즈니스 확장을 위한 새로운 리더십 팀을 구성했습니다. 유럽 금융 시장에서 15년 이상의 경험을 가진 Sarah Johnson을 유럽 지역 대표로, 중동 M&A 시장의 전문가인 Ahmed Al-Farsi를 중동 지역 대표로 임명했습니다. 이번 인사는 브리타니아의 글로벌 영향력 확대 전략의 일환입니다.',
			date: '2023-04-10',
			category: '회사 소식',
			image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984',
		},
		{
			id: '3',
			title: '2025 EMEA-Korea M&A 트렌드 보고서 발간',
			excerpt:
				'브리타니아 애널리스트 팀이 2025년 EMEA-한국 간 M&A 시장 동향 및 전망을 분석한 연례 보고서 발표.',
			content:
				'브리타니아 Inc.는 2025년 EMEA 지역과 한국 간 M&A 시장 동향을 분석한 연례 보고서를 발간했습니다. 이번 보고서는 산업별 M&A 전망, 주요 규제 변화, 투자 기회 및 위험 요소에 대한 심층적인 분석을 담고 있습니다. 특히 친환경 에너지, 디지털 트랜스포메이션, 헬스케어 분야의 크로스보더 M&A가 활발할 것으로 전망했습니다.',
			date: '2023-03-15',
			category: '인사이트',
			image: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c',
		},
		{
			id: '4',
			title: '포스트 팬데믹 시대의 EMEA 투자 기회 세미나 개최',
			excerpt:
				'브리타니아가 국내 기업 및 투자자를 대상으로 EMEA 지역의 포스트 팬데믹 투자 환경과 기회에 관한 세미나를 성황리에 개최했습니다.',
			content:
				"브리타니아 Inc.는 지난주 서울 여의도 IFC에서 '포스트 팬데믹 시대의 EMEA 투자 기회'라는 주제로 세미나를 개최했습니다. 이번 세미나에는 100여 명의 기업 임원과 투자자들이 참석했으며, 브리타니아의 산업 전문가들이 코로나19 이후 변화한 EMEA 시장의 역학 관계와 매력적인 투자 분야에 대한 인사이트를 공유했습니다.",
			date: '2023-02-28',
			category: '이벤트',
			image: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa',
		},
		{
			id: '5',
			title: '브리타니아, 유럽 중소기업 투자 펀드 출범',
			excerpt:
				'한국 자본과 유럽 중소기업을 연결하는 새로운 투자 펀드를 출범하며 시장 간 협력 강화에 나섭니다.',
			content:
				"브리타니아 Inc.는 한국 자본과 유럽의 혁신적인 중소기업을 연결하는 1억 유로 규모의 투자 펀드를 출범했습니다. '브리타니아 유로-코리아 그로스 펀드'는 첨단 제조, 친환경 기술, 디지털 혁신 분야의 유망 중소기업에 투자할 예정입니다. 이 펀드는 한국 투자자들에게 유럽 시장에 대한 접근성을 제공하는 동시에, 유럽 기업들에게 아시아 시장 진출 기회를 제공할 것으로 기대됩니다.",
			date: '2023-01-15',
			category: '보도 자료',
			image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
		},
	];

	const insights = [
		{
			id: '1',
			title: '글로벌 에너지 전환과 M&A 기회 분석',
			excerpt:
				'탄소중립 정책이 가속화됨에 따라 에너지 산업에서 발생하는 M&A 기회와 도전 과제를 분석합니다.',
			author: '박서연, CFO',
			date: '2023-04-20',
			category: '산업 분석',
			image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9',
		},
		{
			id: '2',
			title: '디지털 트랜스포메이션: 유럽 중소기업 인수 전략',
			excerpt:
				'디지털 혁신 역량 강화를 위한 유럽 중소기업 인수 전략과 성공 요인에 대한 심층 분석입니다.',
			author: 'Michael Johnson, Head of EMEA Advisory',
			date: '2023-03-25',
			category: '전략',
			image: 'https://images.unsplash.com/photo-1496096265110-f83ad7f96608',
		},
		{
			id: '3',
			title: 'ESG 중심 투자의 부상과 M&A 영향',
			excerpt:
				'ESG가 기업 가치평가와 M&A 의사결정에 미치는 영향 및 향후 전망을 분석합니다.',
			author: '김영준, CEO',
			date: '2023-02-15',
			category: 'ESG',
			image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
		},
		{
			id: '4',
			title: 'EMEA 지역 테크 스타트업 생태계 심층 분석',
			excerpt:
				'유럽, 중동, 아프리카 지역의 기술 스타트업 생태계 현황과 투자 기회를 분석합니다.',
			author: '이지원, CTO',
			date: '2023-01-20',
			category: '시장 분석',
			image: 'https://images.unsplash.com/photo-1551434678-e076c223a692',
		},
	];

	const multimedia = [
		{
			id: '1',
			title: '포스트 팬데믹 시대의 M&A 전략',
			type: '비디오',
			duration: '24:15',
			image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
		},
		{
			id: '2',
			title: '브리타니아 리더십 인터뷰: EMEA 시장 전망',
			type: '비디오',
			duration: '18:45',
			image: 'https://images.unsplash.com/photo-1542744173-8659d8875fc1',
		},
		{
			id: '3',
			title: '글로벌 M&A 트렌드 2025 인포그래픽',
			type: '인포그래픽',
			image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
		},
		{
			id: '4',
			title: '유럽-한국 비즈니스 협력 이점 - CEO 인터뷰',
			type: '비디오',
			duration: '15:30',
			image: 'https://images.unsplash.com/photo-1530099486328-e021101a494a',
		},
	];

	return (
		<div className='min-h-screen flex flex-col'>
			<Header />

			<main className='flex-1'>
				<Hero
					title='Media & Insights'
					subtitle='브리타니아의 최신 소식과 전문가 인사이트를 확인하세요'
					backgroundImage='https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80'
				/>

				<section className='py-16'>
					<div className='container mx-auto px-4'>
						<Tabs defaultValue='news' className='w-full'>
							<div className='flex justify-center mb-8'>
								<TabsList className='grid w-full max-w-md grid-cols-3'>
									<TabsTrigger value='news'>News</TabsTrigger>
									<TabsTrigger value='insights'>
										Insights
									</TabsTrigger>
									<TabsTrigger value='multimedia'>
										Media
									</TabsTrigger>
								</TabsList>
							</div>

							<TabsContent value='news'>
								<SectionTitle
									title='News & Announcements'
									subtitle='브리타니아의 최신 소식과 보도자료를 확인하세요'
									align='center'
								/>

								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
									{news.map((item) => (
										<div
											key={item.id}
											className='bg-white rounded-lg shadow-md overflow-hidden'
										>
											<div className='h-48 overflow-hidden'>
												<img
													src={item.image}
													alt={item.title}
													className='w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105'
												/>
											</div>
											<div className='p-6'>
												<div className='flex items-center text-sm text-corporate-dark-gray mb-3'>
													<span className='bg-corporate-light-gray px-2 py-1 rounded-md'>
														{item.category}
													</span>
													<div className='flex items-center ml-3'>
														<CalendarIcon
															size={14}
															className='mr-1'
														/>
														{item.date}
													</div>
												</div>
												<h3 className='text-xl font-semibold text-corporate-navy mb-2'>
													{item.title}
												</h3>
												<p className='text-corporate-dark-gray mb-4'>
													{item.excerpt}
												</p>
												<Link
													to={`/media/news/${item.id}`}
													className='text-corporate-blue font-medium hover:text-corporate-teal'
												>
													자세히 보기
												</Link>
											</div>
										</div>
									))}
								</div>
							</TabsContent>

							<TabsContent value='insights'>
								<SectionTitle
									title='Insights & Perspectives'
									subtitle='브리타니아 전문가들의 산업 분석 및 인사이트를 확인하세요'
									align='center'
								/>

								<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
									{insights.map((item) => (
										<div
											key={item.id}
											className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row'
										>
											<div className='md:w-1/3 h-48 md:h-auto overflow-hidden'>
												<img
													src={item.image}
													alt={item.title}
													className='w-full h-full object-cover object-center'
												/>
											</div>
											<div className='md:w-2/3 p-6'>
												<div className='flex items-center text-sm text-corporate-dark-gray mb-3'>
													<span className='bg-corporate-light-gray px-2 py-1 rounded-md'>
														{item.category}
													</span>
													<div className='flex items-center ml-3'>
														<CalendarIcon
															size={14}
															className='mr-1'
														/>
														{item.date}
													</div>
												</div>
												<h3 className='text-xl font-semibold text-corporate-navy mb-2'>
													{item.title}
												</h3>
												<p className='text-corporate-dark-gray mb-2'>
													{item.excerpt}
												</p>
												<p className='text-corporate-blue mb-4'>
													작성자: {item.author}
												</p>
												<Link
													to={`/media/insights/${item.id}`}
													className='text-corporate-blue font-medium hover:text-corporate-teal'
												>
													자세히 보기
												</Link>
											</div>
										</div>
									))}
								</div>
							</TabsContent>

							<TabsContent value='multimedia'>
								<SectionTitle
									title='Multimedia'
									subtitle='브리타니아의 비디오, 인포그래픽 등 다양한 미디어 컨텐츠를 살펴보세요'
									align='center'
								/>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
									{multimedia.map((item) => (
										<div
											key={item.id}
											className='bg-white rounded-lg shadow-md overflow-hidden group relative'
										>
											<div className='h-64 overflow-hidden'>
												<img
													src={item.image}
													alt={item.title}
													className='w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105'
												/>
												{item.type === '비디오' && (
													<div className='absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
														<div className='w-16 h-16 rounded-full bg-corporate-blue flex items-center justify-center'>
															<div className='w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1'></div>
														</div>
													</div>
												)}
											</div>
											<div className='p-6'>
												<div className='flex items-center justify-between text-sm text-corporate-dark-gray mb-3'>
													<span className='bg-corporate-light-gray px-2 py-1 rounded-md'>
														{item.type}
													</span>
													{item.duration && (
														<span>
															{item.duration}
														</span>
													)}
												</div>
												<h3 className='text-xl font-semibold text-corporate-navy'>
													{item.title}
												</h3>
											</div>
										</div>
									))}
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</section>
			</main>
		</div>
	);
};

export default Media;

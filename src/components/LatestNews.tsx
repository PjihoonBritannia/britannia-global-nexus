import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import SectionTitle from './SectionTitle';
import Card from './Card';
import { Button } from '@/components/ui/button';

const LatestNews = () => {
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);

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
			},
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

	const news = [
		{
			title: '브리타니아, 유럽 기술 기업 인수 자문 성공적 완료',
			description:
				'브리타니아가 한국 대기업의 유럽 기술 기업 인수에 관한 자문을 성공적으로 완료하며 EMEA 시장 진출 지원.',
			date: '2025-04-25',
			imageUrl:
				'https://images.unsplash.com/photo-1605460375648-278bcbd579a6',
			link: '/media/news/1',
		},
		{
			title: '신임 리더십 팀 발표: 글로벌 비즈니스 확장 가속화',
			description:
				'브리타니아가 유럽 및 중동 지역 확장을 위한 신임 리더십 팀 구성을 발표하며 글로벌 비즈니스 확장에 박차를 가합니다.',
			date: '2025-04-10',
			imageUrl:
				'https://images.unsplash.com/photo-1553877522-43269d4ea984',
			link: '/media/news/2',
		},
		{
			title: '2025 EMEA-Korea M&A 트렌드 보고서 발간',
			description:
				'브리타니아 애널리스트 팀이 2025년 EMEA-한국 간 M&A 시장 동향 및 전망을 분석한 연례 보고서 발표.',
			date: '2025-03-15',
			imageUrl:
				'https://images.unsplash.com/photo-1543286386-2e659306cd6c',
			link: '/media/news/3',
		},
	];

	return (
		<section
			ref={sectionRef}
			className='py-32 bg-gradient-to-t from-bg-cream to-white'
		>
			<div className='container mx-auto px-4'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-12'>
					<SectionTitle
						title='News & Insights'
						subtitle='브리타니아의 최신 소식과 산업 인사이트를 확인하세요.'
					/>
					<Button
						variant='outline'
						className='mt-4 md:mt-0 hover-lift'
						asChild
					>
						<Link to='/media' className='inline-flex items-center'>
							모든 뉴스 보기
							<ArrowRight size={16} className='ml-2' />
						</Link>
					</Button>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{news.map((item, index) => (
						<div
							key={item.title}
							className={`transform transition-all duration-700 ${
								isVisible
									? 'translate-y-0 opacity-100'
									: 'translate-y-20 opacity-0'
							}`}
							style={{ transitionDelay: `${index * 200}ms` }}
						>
							<Link to={item.link} className='block group'>
								<div className='bg-white rounded-[35px] shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden hover-lift'>
									<div className='h-52 overflow-hidden'>
										<img
											src={item.imageUrl}
											alt={item.title}
											className='w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105'
										/>
									</div>
									<div className='p-7'>
										<div className='flex items-center text-sm text-gray-500 mb-3'>
											<Calendar
												size={14}
												className='mr-2'
											/>
											<span>{item.date}</span>
										</div>
										<h3 className='text-xl font-semibold text-gray-900 mb-3 group-hover:text-point transition-colors duration-300'>
											{item.title}
										</h3>
										<p className='text-gray-700 mb-5 font-light'>
											{item.description}
										</p>
										<div className='text-point flex items-center'>
											<span className='mr-2'>
												Read More
											</span>
											<ArrowRight
												size={16}
												className='transform group-hover:translate-x-1 transition-transform duration-300'
											/>
										</div>
									</div>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default LatestNews;

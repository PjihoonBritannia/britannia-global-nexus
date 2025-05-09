import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const CareersCTA = () => {
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

	return (
		<section
			ref={sectionRef}
			className='py-32 bg-cover bg-center relative overflow-hidden'
			style={{
				backgroundImage:
					"url('https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80')",
			}}
		>
			<div className='absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/80'></div>

			{/* Animated particles */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className='absolute rounded-full bg-white/30 animate-pulse-soft'
						style={{
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
							width: `${Math.random() * 10 + 2}px`,
							height: `${Math.random() * 10 + 2}px`,
							animationDelay: `${Math.random() * 5}s`,
							animationDuration: `${Math.random() * 8 + 4}s`,
						}}
					></div>
				))}
			</div>

			<div className='container mx-auto px-6 relative z-10'>
				<div
					className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
						isVisible
							? 'translate-y-0 opacity-100'
							: 'translate-y-12 opacity-0'
					}`}
				>
					<div className='w-16 h-1 bg-point mx-auto mb-6'></div>

					<h2 className='text-2xl md:text-3xl font-bold text-white mb-5'>
						Cultivate Global Financial Expertise
					</h2>

					<div className='bg-white/10 backdrop-blur-sm p-6 rounded-[35px] mb-8'>
						<p className='text-xl text-white/90 italic font-medium'>
							"Do you want to develop your career at the center of
							cross-border M&A Deals?"
						</p>
					</div>

					<p className='text-white/80 mb-10 font-light'>
						Grow as a global financial professional with Britannia,
						at the center of cross-border M&A transactions. We
						foster top talent in a challenging and collaborative
						environment.
					</p>

					<div className='flex flex-wrap justify-center gap-5'>
						<Button
							asChild
							className='bg-white text-gray-900 hover:bg-gray-100 hover-lift'
						>
							<Link
								to='/careers'
								className='inline-flex items-center'
							>
								View Career Opportunities
								<ArrowUpRight size={16} className='ml-2' />
							</Link>
						</Button>
						<Button
							variant='outline'
							className='bg-transparent text-white border-white hover:bg-white/10 hover-lift'
						>
							<Link
								to='/careers#life'
								className='inline-flex items-center'
							>
								Life at Britannia
								<ArrowRight size={16} className='ml-2' />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CareersCTA;

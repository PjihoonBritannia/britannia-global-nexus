import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const location = useLocation();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// Handle scroll effect
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		// Initialize scroll state
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	// Close menu when route changes
	useEffect(() => {
		setIsMenuOpen(false);
	}, [location]);

	return (
		<header
			className={`fixed w-full z-50 transition-all duration-300 ${
				isScrolled || (isMenuOpen && !isScrolled)
					? 'bg-white/90 backdrop-blur-md shadow-md py-4'
					: 'bg-transparent py-6'
			}`}
		>
			<div className='container mx-auto px-6 flex items-center justify-between'>
				<Link
					to='/'
					className={`flex items-center transition-transform duration-300 ${
						isScrolled ? 'scale-90' : ''
					}`}
				>
					<img
						src={
							isScrolled || (isMenuOpen && !isScrolled)
								? 'https://cdn.jsdelivr.net/gh/PjihoonBritannia/britannia-global-nexus@main/public/statics/logo_black.svg'
								: 'https://cdn.jsdelivr.net/gh/PjihoonBritannia/britannia-global-nexus@main/public/statics/logo_white.svg'
						}
						alt='Britannia Inc.'
						className='h-10 w-auto transition-opacity duration-300'
					/>
					<span className='sr-only'>Britannia Inc.</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className='hidden md:flex items-center space-x-12'>
					{/* Home link - only shown when scrolled */}
					{isScrolled && (
						<Link
							to='/'
							className={`font-light link-underline transition-colors duration-200 ${
								location.pathname === '/'
									? 'text-point'
									: 'text-base-dark'
							}`}
						>
							Home
						</Link>
					)}

					<Link
						to='/about'
						className={`font-light link-underline transition-colors duration-200 ${
							isScrolled || (isMenuOpen && !isScrolled)
								? location.pathname === '/about'
									? 'text-point'
									: 'text-base-dark'
								: 'text-white hover:text-white/80'
						}`}
					>
						About
					</Link>
					<Link
						to='/uk-property'
						className={`font-light link-underline transition-colors duration-200 ${
							isScrolled || (isMenuOpen && !isScrolled)
								? location.pathname === '/uk-property'
									? 'text-point'
									: 'text-base-dark'
								: 'text-white hover:text-white/80'
						}`}
					>
						Property
					</Link>
					<Link
						to='/media'
						className={`font-light link-underline transition-colors duration-200 ${
							isScrolled || (isMenuOpen && !isScrolled)
								? location.pathname === '/media'
									? 'text-point'
									: 'text-base-dark'
								: 'text-white hover:text-white/80'
						}`}
					>
						Media
					</Link>
					<Link
						to='/esg'
						className={`font-light link-underline transition-colors duration-200 ${
							isScrolled || (isMenuOpen && !isScrolled)
								? location.pathname === '/esg'
									? 'text-point'
									: 'text-base-dark'
								: 'text-white hover:text-white/80'
						}`}
					>
						ESG
					</Link>
					<Link
						to='/careers'
						className={`font-light link-underline transition-colors duration-200 ${
							isScrolled || (isMenuOpen && !isScrolled)
								? location.pathname === '/careers'
									? 'text-point'
									: 'text-base-dark'
								: 'text-white hover:text-white/80'
						}`}
					>
						Careers
					</Link>
					<Button className='bg-point hover:bg-point/90 text-white rounded-[35px] hover:shadow-lg transition-shadow duration-300'>
						Contact Us
					</Button>
				</nav>

				{/* Mobile Menu Button */}
				<button
					className={`md:hidden p-2 ${
						isScrolled || (isMenuOpen && !isScrolled)
							? 'text-base-dark'
							: 'text-white'
					}`}
					onClick={toggleMenu}
					aria-label='Toggle menu'
				>
					{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<div className='md:hidden absolute w-full bg-white/95 backdrop-blur-md z-50 border-t border-gray-100'>
					<nav className='container mx-auto px-6 py-5 flex flex-col space-y-6'>
						<Link
							to='/'
							className={`font-light hover:text-point p-2 transition-all duration-200 ${
								location.pathname === '/'
									? 'text-point translate-x-2'
									: 'text-base-dark'
							}`}
							onClick={() => setIsMenuOpen(false)}
						>
							Home
						</Link>
						<Link
							to='/about'
							className={`font-light hover:text-point p-2 transition-all duration-200 ${
								location.pathname === '/about'
									? 'text-point translate-x-2'
									: 'text-base-dark'
							}`}
							onClick={() => setIsMenuOpen(false)}
						>
							About
						</Link>
						<Link
							to='/uk-property'
							className={`font-light hover:text-point p-2 transition-all duration-200 ${
								location.pathname === '/uk-property'
									? 'text-point translate-x-2'
									: 'text-base-dark'
							}`}
							onClick={() => setIsMenuOpen(false)}
						>
							UK Property
						</Link>
						<Link
							to='/media'
							className={`font-light hover:text-point p-2 transition-all duration-200 ${
								location.pathname === '/media'
									? 'text-point translate-x-2'
									: 'text-base-dark'
							}`}
							onClick={() => setIsMenuOpen(false)}
						>
							Media
						</Link>
						<Link
							to='/esg'
							className={`font-light hover:text-point p-2 transition-all duration-200 ${
								location.pathname === '/esg'
									? 'text-point translate-x-2'
									: 'text-base-dark'
							}`}
							onClick={() => setIsMenuOpen(false)}
						>
							ESG
						</Link>
						<Link
							to='/careers'
							className={`font-light hover:text-point p-2 transition-all duration-200 ${
								location.pathname === '/careers'
									? 'text-point translate-x-2'
									: 'text-base-dark'
							}`}
							onClick={() => setIsMenuOpen(false)}
						>
							Careers
						</Link>
						<Button
							className='bg-point hover:bg-point/90 text-white w-full rounded-[35px] hover:shadow-lg transition-all duration-300'
							onClick={() => setIsMenuOpen(false)}
						>
							Contact Us
						</Button>
					</nav>
				</div>
			)}
		</header>
	);
};

export default Header;


import { ReactNode, useEffect, useState } from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: ReactNode;
  overlay?: boolean;
}

const Hero = ({
  title,
  subtitle,
  backgroundImage,
  children,
  overlay = true,
}: HeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation trigger on component mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className="relative bg-gray-900 bg-cover bg-center bg-no-repeat overflow-hidden h-screen min-h-[600px] flex items-center"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : {}
      }
    >
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70"
          aria-hidden="true"
        />
      )}
      
      {/* Animated decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-16 h-16 rounded-full bg-point/20 blur-xl animate-float"></div>
        <div className="absolute bottom-[20%] right-[15%] w-32 h-32 rounded-full bg-point/10 blur-xl animate-float animate-delay-300"></div>
        <div className="absolute top-[40%] right-[20%] w-24 h-24 rounded-full bg-base-dark/10 blur-xl animate-float animate-delay-200"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <h1 
            className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {title}
          </h1>
          
          {subtitle && (
            <p 
              className={`text-lg md:text-xl text-white/90 mb-8 transition-all duration-1000 delay-100 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {subtitle}
            </p>
          )}
          
          {children && (
            <div 
              className={`mt-10 transition-all duration-1000 delay-200 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {children}
            </div>
          )}
        </div>
      </div>
      
      {/* Removed the animated scroll indicator (wave-like decoration) that was here */}
    </div>
  );
};

export default Hero;

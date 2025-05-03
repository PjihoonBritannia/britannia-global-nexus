
import { ReactNode } from "react";

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
  return (
    <div
      className="relative bg-gray-900 bg-cover bg-center bg-no-repeat"
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
      <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in animate-delay-100">
              {subtitle}
            </p>
          )}
          {children && (
            <div className="mt-10 animate-fade-in animate-delay-200">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;

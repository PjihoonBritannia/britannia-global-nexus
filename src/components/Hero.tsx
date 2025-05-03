
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
      className="relative bg-corporate-navy bg-cover bg-center bg-no-repeat"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : {}
      }
    >
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-corporate-navy/90 to-corporate-navy/60"
          aria-hidden="true"
        />
      )}
      <div className="container mx-auto px-4 py-20 md:py-28 lg:py-36 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 mb-6 animate-fade-in animate-delay-100">
              {subtitle}
            </p>
          )}
          {children && (
            <div className="mt-8 animate-fade-in animate-delay-200">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;


import { useEffect, useRef, useState } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  textColor?: string;
  accentColor?: string;
  className?: string;
}

const SectionTitle = ({
  title,
  subtitle,
  align = "left",
  textColor = "text-base-dark",
  accentColor = "bg-point",
  className = "",
}: SectionTitleProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  const alignClass = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };
  
  // Track when the title comes into view
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
      }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={titleRef}
      className={`max-w-3xl ${alignClass[align]} mb-20 ${className}`}
    >
      <div className="overflow-hidden mb-4">
        <div
          className={`w-16 h-1 ${accentColor} transition-all duration-700 ${
            align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""
          } ${isVisible ? "w-16" : "w-0"}`}
        ></div>
      </div>
      <h2 
        className={`text-2xl md:text-3xl lg:text-4xl font-bold ${textColor} mb-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p 
          className={`text-lg text-gray-700 font-light transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;

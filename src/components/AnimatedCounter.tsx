
import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  title?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  duration = 2000,
  prefix = '',
  suffix = '',
  title,
}) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const startTime = useRef<number | null>(null);
  const frameId = useRef<number | null>(null);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounter();
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => {
      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current);
      }
      observer.disconnect();
    };
  }, [value]);
  
  const startCounter = () => {
    startTime.current = null;
    
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      
      const progress = (timestamp - startTime.current) / duration;
      
      if (progress < 1) {
        setCount(Math.floor(value * Math.min(progress, 1)));
        frameId.current = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    
    frameId.current = requestAnimationFrame(animate);
  };
  
  return (
    <div ref={counterRef} className="text-center">
      <div className="text-4xl font-bold text-point mb-2">
        {prefix}{count}{suffix}
      </div>
      {title && <p className="text-gray-700">{title}</p>}
    </div>
  );
};

export default AnimatedCounter;

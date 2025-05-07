
import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  title?: string;
  startOnView?: boolean;
}

const AnimatedCounter = ({ 
  end, 
  duration = 2000,
  prefix = '',
  suffix = '',
  title,
  startOnView = true
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        animateCount();
        setHasAnimated(true);
      }
    };

    const animateCount = () => {
      // If end is 0, don't animate
      if (end === 0) {
        setCount(0);
        return;
      }
      
      const startTime = Date.now();
      const endTime = startTime + duration;
      
      const updateCount = () => {
        const now = Date.now();
        const remaining = Math.max(0, endTime - now);
        const progress = 1 - remaining / duration;
        
        // Use easing function for smoother animation
        const easedProgress = easeOutExpo(progress);
        const currentCount = Math.floor(easedProgress * end);
        
        setCount(currentCount);
        
        if (remaining > 0) {
          requestAnimationFrame(updateCount);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(updateCount);
    };

    // Easing function for smoother animation
    const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };
    
    // Start immediately if not startOnView
    if (!startOnView) {
      animateCount();
      setHasAnimated(true);
      return;
    }
    
    // Set up intersection observer for startOnView
    const options = {
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver(handleIntersection, options);
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end, duration, startOnView, hasAnimated]);
  
  return (
    <div ref={counterRef} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-base-dark mb-2">
        {prefix}{count}{suffix}
      </div>
      {title && <div className="text-sm text-gray-600 font-light">{title}</div>}
    </div>
  );
};

export default AnimatedCounter;

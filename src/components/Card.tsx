
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CardProps {
  title: string;
  description: string;
  link?: string;
  icon?: ReactNode;
  className?: string;
  imageUrl?: string;
}

const Card = ({
  title,
  description,
  link,
  icon,
  className,
  imageUrl,
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const CardContent = () => (
    <div
      className={cn(
        "bg-white rounded-[35px] border border-gray-100 transition-all duration-300 overflow-hidden hover-lift h-full flex flex-col",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl && (
        <div className="h-52 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-500"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        </div>
      )}
      <div className="p-7 flex flex-col flex-grow">
        {icon && (
          <div className={`text-point mb-5 transition-transform duration-300 ${
            isHovered ? 'transform -translate-y-1' : ''
          }`}>
            {icon}
          </div>
        )}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-700 mb-5 font-light flex-grow">
          {description}
        </p>
        {link && (
          <div 
            className={`text-point font-medium flex items-center transition-all duration-300 mt-auto ${
              isHovered ? 'translate-x-1' : ''
            }`}
          >
            Learn More 
            <ArrowRight 
              size={16} 
              className={`ml-2 transition-transform duration-300 ${
                isHovered ? 'transform translate-x-1' : ''
              }`} 
            />
          </div>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <Link to={link} className="block h-full">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

export default Card;

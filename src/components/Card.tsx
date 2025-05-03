
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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
  const CardContent = () => (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 overflow-hidden",
        className
      )}
    >
      {imageUrl && (
        <div className="h-52 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="p-7">
        {icon && <div className="text-gray-700 mb-5">{icon}</div>}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-700 mb-5">{description}</p>
        {link && (
          <div className="text-gray-800 font-medium hover:text-gray-600">
            Learn More
          </div>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <Link to={link} className="block">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

export default Card;

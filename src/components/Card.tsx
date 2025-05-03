
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
        "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden",
        className
      )}
    >
      {imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        {icon && <div className="text-corporate-blue mb-4">{icon}</div>}
        <h3 className="text-xl font-semibold text-corporate-navy mb-2">
          {title}
        </h3>
        <p className="text-corporate-dark-gray mb-4">{description}</p>
        {link && (
          <div className="text-corporate-blue font-medium hover:text-corporate-teal">
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

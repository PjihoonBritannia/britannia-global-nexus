
interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

const SectionTitle = ({
  title,
  subtitle,
  align = "left",
}: SectionTitleProps) => {
  const alignClass = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div className={`max-w-3xl ${alignClass[align]} mb-16`}>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-700">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;

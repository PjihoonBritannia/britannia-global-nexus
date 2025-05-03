
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
    <div className={`max-w-3xl ${alignClass[align]} mb-12`}>
      <h2 className="text-2xl md:text-3xl font-bold text-corporate-navy mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-corporate-dark-gray text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;

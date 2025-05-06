
import SectionTitle from "./SectionTitle";

const UkPropertyProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Consultation & Strategy",
      description: "Initial assessment of investment goals, preferences, and constraints to develop a tailored acquisition strategy."
    },
    {
      number: "02",
      title: "Property Search & Shortlisting",
      description: "Curated selection of properties matching your criteria, including off-market opportunities through our exclusive network."
    },
    {
      number: "03",
      title: "Offer & Negotiation",
      description: "Expert negotiation to secure optimal terms and price, leveraging market insights and local expertise."
    },
    {
      number: "04",
      title: "Due Diligence & Legal",
      description: "Comprehensive due diligence and coordination with legal specialists to ensure a secure and compliant transaction."
    },
    {
      number: "05",
      title: "Completion & Handover",
      description: "Seamless finalization of the purchase and support with property management setup for a worry-free investment."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Navigating the Process" 
          subtitle="A streamlined journey to successful UK property investment"
          align="center"
        />
        
        <div className="max-w-4xl mx-auto mt-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-start md:items-center mb-12 last:mb-0">
              <div className="bg-gray-100 text-gray-800 font-semibold text-lg py-3 px-5 rounded-lg min-w-16 text-center mb-4 md:mb-0 md:mr-6">
                {step.number}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-700 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UkPropertyProcess;

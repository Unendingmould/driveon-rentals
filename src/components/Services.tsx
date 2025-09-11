import { ArrowRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      number: "01",
      title: "Commercial deliveries",
      highlighted: true
    },
    {
      number: "02", 
      title: "Moving services",
      highlighted: false
    },
    {
      number: "03",
      title: "Construction work", 
      highlighted: false
    },
    {
      number: "04",
      title: "Event logistics",
      highlighted: false
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl font-medium text-muted-foreground mb-8">
            Rental solutions for
          </h2>
          
          <div className="space-y-4">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-6 rounded-lg border transition-all duration-300 hover:shadow-md cursor-pointer group ${
                  service.highlighted 
                    ? 'bg-yellow-400 border-yellow-400' 
                    : 'bg-background border-border hover:border-primary/20'
                }`}
              >
                <div className="flex items-center gap-8">
                  <span className={`text-4xl font-light ${
                    service.highlighted ? 'text-black' : 'text-muted-foreground'
                  }`}>
                    {service.number}
                  </span>
                  <h3 className={`text-3xl font-normal ${
                    service.highlighted ? 'text-black' : 'text-foreground'
                  }`}>
                    {service.title}
                  </h3>
                </div>
                
                <ArrowRight className={`w-8 h-8 transition-transform duration-300 group-hover:translate-x-2 ${
                  service.highlighted ? 'text-black' : 'text-muted-foreground'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
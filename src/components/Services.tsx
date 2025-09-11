import { ArrowRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      number: "01",
      title: "Commercial deliveries"
    },
    {
      number: "02", 
      title: "Moving services"
    },
    {
      number: "03",
      title: "Construction work"
    },
    {
      number: "04",
      title: "Event logistics"
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
                className="flex items-center justify-between p-6 rounded-lg border bg-card hover:bg-primary hover:border-primary transition-all duration-300 hover:shadow-md cursor-pointer group"
              >
                <div className="flex items-center gap-8">
                  <span className="text-4xl font-light text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300">
                    {service.number}
                  </span>
                  <h3 className="text-3xl font-normal text-foreground group-hover:text-primary-foreground transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
                
                <ArrowRight className="w-8 h-8 transition-all duration-300 group-hover:translate-x-2 text-muted-foreground group-hover:text-primary-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
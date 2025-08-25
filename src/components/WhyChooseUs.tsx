import { Check } from "lucide-react";

export default function WhyChooseUs() {
  const benefits = [
    "Flexible plans you can actually afford",
    "Simple approval, no credit checks",
    "Trucks ready across USA, Canada & UK", 
    "Affordable rentals that let you earn while you drive"
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-gradient">
            Made For Drivers Who Can't Buy a Truck Outright
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 card-gradient rounded-xl hover-lift fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                
                <p className="text-lg text-left text-foreground font-medium">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
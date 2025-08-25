import { Truck, Calendar, Play } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Truck className="w-12 h-12 text-primary" />,
      title: "Pick Your Truck",
      description: "Browse models with full specs."
    },
    {
      icon: <Calendar className="w-12 h-12 text-primary" />,
      title: "Choose Your Plan",
      description: "Weekly, monthly, or quarterly rentals."
    },
    {
      icon: <Play className="w-12 h-12 text-primary" />,
      title: "Start Driving",
      description: "Pay deposit, pick up, and hit the road."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">
            Simple Steps To Get Your Truck
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="text-center group hover-lift fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 card-gradient rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-foreground">
                {step.title}
              </h3>
              
              <p className="text-lg text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
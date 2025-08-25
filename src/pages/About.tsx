import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Truck, Globe, CreditCard, Wrench } from "lucide-react";
import heroTruckImage from "@/assets/hero-truck.jpg";

export default function About() {
  const services = [
    {
      icon: CreditCard,
      title: "Flexible Financing",
      description: "Affordable payment plans that work with your budget and cash flow needs."
    },
    {
      icon: Globe,
      title: "International Shipping", 
      description: "Reliable delivery across USA, Canada, and UK with full logistics support."
    },
    {
      icon: Truck,
      title: "Rent-to-Own Options",
      description: "Start driving today with weekly, monthly, or quarterly rental plans."
    },
    {
      icon: Wrench,
      title: "Trusted Maintenance",
      description: "Full service support and maintenance programs to keep you on the road."
    }
  ];

  const benefits = [
    "Affordable entry costs - no massive upfront payments required",
    "Reliable, well-maintained trucks with clean titles and documentation", 
    "Customer-first support team available 24/7 for your success",
    "Flexible terms that adapt to your business needs and growth",
    "International reach with local expertise in every market",
    "Transparent pricing with no hidden fees or surprise costs"
  ];

  const scrollToCTA = () => {
    document.getElementById('contact-cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroTruckImage})` }}
        >
          <div className="absolute inset-0 hero-overlay" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient fade-in-up">
              Driving Opportunities, One Truck at a Time
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground fade-in-up animation-delay-200 max-w-3xl mx-auto">
              We understand that not everyone can afford to buy a truck outright. That's why we've built 
              a company dedicated to helping drivers and businesses access quality trucks through flexible 
              rent-to-own solutions. With clean titles, trusted models, and international shipping across 
              the USA, Canada, and UK, we're here to turn your driving dreams into reality.
            </p>
            
            <Button 
              onClick={scrollToCTA}
              className="btn-cta text-lg px-8 py-6 fade-in-up animation-delay-400"
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive truck solutions designed to get you on the road faster and keep you there longer.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="text-center p-6 card-gradient rounded-xl hover-lift fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
              Why Choose Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're more than just a truck rental company. We're your partners in building a successful driving business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 card-gradient rounded-xl hover-lift fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                </div>
                <p className="text-lg text-foreground font-medium">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact-cta" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
              Start Your Journey Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to take the next step? Get in touch with our team and discover how we can help 
              you get behind the wheel of your ideal truck.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-cta text-lg px-8 py-6">
                Contact Us Now
              </Button>
              <Button variant="outline" className="btn-secondary text-lg px-8 py-6">
                View Available Trucks
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
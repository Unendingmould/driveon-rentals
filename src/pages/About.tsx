import { useState, useEffect, useRef } from 'react';
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import { Truck, Globe, CreditCard, Wrench } from "lucide-react";
import missionImage from "@/assets/truck-1-1.jpg";

import serviceImage1 from "@/assets/truck-2-1.jpg";
import serviceImage2 from "@/assets/truck-2-2.jpg";
import serviceImage3 from "@/assets/truck-2-3.jpg";
import serviceImage4 from "@/assets/truck-2-4.jpg";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function About() {
  usePageTitle("About");

  const [activeService, setActiveService] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<any>();
  const services = [
    {
      icon: CreditCard,
      title: "Flexible Financing",
      description: "Affordable payment plans that work with your budget and cash flow needs.",
      image: serviceImage1
    },
    {
      icon: Globe,
      title: "International Shipping", 
      description: "Reliable delivery across USA, Canada, and UK with full logistics support.",
      image: serviceImage2
    },
    {
      icon: Truck,
      title: "Rent-to-Own Options",
      description: "Start driving today with weekly, monthly, or quarterly rental plans.",
      image: serviceImage3
    },
    {
      icon: Wrench,
      title: "Trusted Maintenance",
      description: "Full service support and maintenance programs to keep you on the road.",
      image: serviceImage4
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

  const handleServiceClick = (index: number) => {
    setActiveService(index);
    setIsPaused(true);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    setTimeout(() => {
      setIsPaused(false);
    }, 10000); // Pause for 10 seconds on manual interaction
  };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = window.setInterval(() => {
        setActiveService((prevStep) => (prevStep + 1) % services.length);
      }, 6000);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, services.length]);

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight">
              Driving opportunities, <br /> one truck at a time.
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-muted-foreground">
              We're dedicated to helping drivers access quality trucks through flexible rent-to-own solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                We want to make truck ownership an option for everyone.
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg">
                <p>
                  At TrucksOnFlex, we believe truck ownership should be an option for everyone, regardless of your financial situation.
                </p>
                <p>
                  But today, due to the high upfront costs and financing challenges, many aspiring drivers and small businesses are locked out of the market. We're here to change that.
                </p>
              </div>
            </div>
            <div>
              <img src={missionImage} alt="Our Mission" className="rounded-lg shadow-lg w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Our Services
            </h2>
             <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive truck solutions designed to get you on the road faster and keep you there longer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] overflow-hidden rounded-lg">
              {services.map((service, index) => (
                <img
                  key={index}
                  src={service.image}
                  alt={service.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${activeService === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                />
              ))}
            </div>

            <div className="flex flex-col justify-center h-full">
              <div className="space-y-8 mb-12">
                {services.map((service, index) => (
                  <div key={index} className="cursor-pointer" onClick={() => handleServiceClick(index)}>
                    <div className="relative inline-block">
                      <h3 className={`text-4xl font-bold transition-colors duration-300 ${activeService === index ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                        {service.title}
                      </h3>
                      {activeService === index && (
                        <div className="absolute bottom-[-10px] left-0 w-full h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
                          <div 
                            key={activeService} // Re-triggers the animation when the step changes
                            className="h-1 bg-primary animate-fill-progress"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-lg text-muted-foreground min-h-[150px]">
                  {services[activeService].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
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

      <Partners />

      {/* Final CTA Section */}
      <section id="contact-cta" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Start Your Journey Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to take the next step? Get in touch with our team and discover how we can help 
              you get behind the wheel of your ideal truck.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-cta text-lg px-8 py-6 rounded-full">
                Contact Us Now
              </Button>
              <Button className="btn-secondary text-lg px-8 py-6 rounded-full hover:text-black">
                View Available Trucks
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
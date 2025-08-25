import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Truck {
  id: string;
  model: string;
  year: number;
  image: string;
  specs: {
    mileage: string;
    transmission: string;
    fuel: string;
    horsepower: string;
  };
  pricing: {
    weekly: number;
    monthly: number;
    outright: number;
  };
}

export default function FeaturedTrucks() {
  const [selectedPlan, setSelectedPlan] = useState<string>("weekly");

  const trucks: Truck[] = [
    {
      id: "1",
      model: "Freightliner Cascadia 125",
      year: 2024,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center",
      specs: {
        mileage: "45,000 mi",
        transmission: "Automatic",
        fuel: "Diesel",
        horsepower: "475 HP"
      },
      pricing: {
        weekly: 800,
        monthly: 2500,
        outright: 65000
      }
    },
    {
      id: "2", 
      model: "Peterbilt 579",
      year: 2023,
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop&crop=center",
      specs: {
        mileage: "52,000 mi",
        transmission: "Manual",
        fuel: "Diesel",
        horsepower: "500 HP"
      },
      pricing: {
        weekly: 850,
        monthly: 2700,
        outright: 72000
      }
    },
    {
      id: "3",
      model: "Kenworth T680",
      year: 2024,
      image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=600&h=400&fit=crop&crop=center",
      specs: {
        mileage: "38,000 mi", 
        transmission: "Automatic",
        fuel: "Diesel",
        horsepower: "485 HP"
      },
      pricing: {
        weekly: 825,
        monthly: 2600,
        outright: 68000
      }
    }
  ];

  const handleGetTruck = (truckId: string) => {
    // Scroll to CTA section
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="trucks" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gradient">
            Available Now
          </h2>
          
          {/* Plan Selector */}
          <div className="inline-flex p-2 card-gradient rounded-lg">
            {["weekly", "monthly", "outright"].map((plan) => (
              <button
                key={plan}
                onClick={() => setSelectedPlan(plan)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedPlan === plan 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {plan.charAt(0).toUpperCase() + plan.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trucks.map((truck, index) => (
            <Card 
              key={truck.id} 
              className="card-gradient border-border hover-lift overflow-hidden fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={truck.image} 
                  alt={`${truck.model} ${truck.year}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    {truck.year}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {truck.model}
                </h3>
                
                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 mb-6 text-sm text-muted-foreground">
                  <div>{truck.specs.mileage}</div>
                  <div>{truck.specs.transmission}</div>
                  <div>{truck.specs.fuel}</div>
                  <div>{truck.specs.horsepower}</div>
                </div>
                
                {/* Pricing */}
                <div className="mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    ${selectedPlan === "weekly" && `${truck.pricing.weekly}/week`}
                    {selectedPlan === "monthly" && `${truck.pricing.monthly}/month`}
                    {selectedPlan === "outright" && truck.pricing.outright.toLocaleString()}
                  </div>
                  
                  {selectedPlan !== "outright" && (
                    <div className="text-sm text-muted-foreground">
                      Weekly: ${truck.pricing.weekly} • Monthly: ${truck.pricing.monthly}
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={() => handleGetTruck(truck.id)}
                  className="btn-cta w-full"
                >
                  Get This Truck
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
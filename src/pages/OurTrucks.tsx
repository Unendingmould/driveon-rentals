import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Truck, Shield, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

// Truck 1 images (White)
import truck11 from "@/assets/truck-1-1.jpg";
import truck12 from "@/assets/truck-1-2.jpg";
import truck13 from "@/assets/truck-1-3.jpg";
import truck14 from "@/assets/truck-1-4.jpg";
import truck15 from "@/assets/truck-1-5.jpg";

// Truck 2 images (Red)
import truck21 from "@/assets/truck-2-1.jpg";
import truck22 from "@/assets/truck-2-2.jpg";
import truck23 from "@/assets/truck-2-3.jpg";
import truck24 from "@/assets/truck-2-4.jpg";
import truck25 from "@/assets/truck-2-5.jpg";

// Truck 3 images (Blue)
import truck31 from "@/assets/truck-3-1.jpg";
import truck32 from "@/assets/truck-3-2.jpg";
import truck33 from "@/assets/truck-3-3.jpg";
import truck34 from "@/assets/truck-3-4.jpg";
import truck35 from "@/assets/truck-3-5.jpg";

export default function OurTrucks() {
  const trucks = [
    {
      id: 1,
      images: [truck11, truck12, truck13, truck14, truck15],
      make: "Freightliner",
      model: "Cascadia 125",
      year: "2024",
      mileage: "616,974",
      engine: "Detroit 450 HP, Diesel",
      transmission: "Automatic",
      vin: "14252",
      title: "Clean",
      axles: "Tandem 6x4",
      suspension: "Air Ride",
      exterior: "White",
      interior: "White",
      condition: "Used",
      warranty: "6 Months Powertrain",
      weeklyRate: "$850",
      monthlyRate: "$2,700"
    },
    {
      id: 2,
      images: [truck21, truck22, truck23, truck24, truck25],
      make: "Freightliner",
      model: "Cascadia 125",
      year: "2024",
      mileage: "584,321", 
      engine: "Detroit 450 HP, Diesel",
      transmission: "Automatic",
      vin: "14253",
      title: "Clean",
      axles: "Tandem 6x4",
      suspension: "Air Ride",
      exterior: "Red",
      interior: "Black",
      condition: "Used",
      warranty: "6 Months Powertrain",
      weeklyRate: "$850",
      monthlyRate: "$2,700"
    },
    {
      id: 3,
      images: [truck31, truck32, truck33, truck34, truck35],
      make: "Freightliner",
      model: "Cascadia 125", 
      year: "2024",
      mileage: "623,147",
      engine: "Detroit 450 HP, Diesel",
      transmission: "Automatic",
      vin: "14254",
      title: "Clean",
      axles: "Tandem 6x4",
      suspension: "Air Ride",
      exterior: "Blue",
      interior: "Gray",
      condition: "Used",
      warranty: "6 Months Powertrain",
      weeklyRate: "$850",
      monthlyRate: "$2,700"
    }
  ];

  const faqs = [
    {
      question: "Do you ship to USA, Canada, and UK?",
      answer: "Yes, we provide comprehensive shipping services across the United States, Canada, and the United Kingdom. Our logistics team handles all documentation and delivery coordination to ensure your truck arrives safely and on time."
    },
    {
      question: "How does the rent-to-own process work?",
      answer: "Our rent-to-own program is simple: choose your truck, select a payment plan (weekly, monthly, or quarterly), pay your deposit, and start driving. A portion of each payment goes toward ownership, and you can exercise your purchase option at any time during the rental period."
    },
    {
      question: "What payment flexibility do you offer?",
      answer: "We accept multiple payment methods including Cash App, PayPal, Zelle, Bitcoin, and Gift Cards. Our flexible terms allow you to adjust payment schedules based on your cash flow, and we work with drivers to find solutions that fit their business needs."
    },
    {
      question: "What's included with each truck?",
      answer: "Every truck comes with a clean title, full maintenance records, and our comprehensive inspection report. We also provide warranty coverage and ongoing maintenance support to keep you on the road and earning."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Header Section */}
      <section className="py-20 bg-secondary/30 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient">
              Find the Right Truck for You
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Flexible payment, reliable trucks, ready for the road.
            </p>
          </div>
        </div>
      </section>

      {/* Trucks Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {trucks.map((truck, index) => (
              <div 
                key={truck.id}
                className="card-gradient rounded-xl overflow-hidden hover-lift fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Truck Image Carousel */}
                <div className="relative h-64 overflow-hidden">
                  <Carousel className="w-full h-full">
                    <CarouselContent>
                      {truck.images.map((image, imageIndex) => (
                        <CarouselItem key={imageIndex}>
                          <img 
                            src={image} 
                            alt={`${truck.make} ${truck.model} - View ${imageIndex + 1}`}
                            className="w-full h-64 object-cover"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Clean Title
                    </Badge>
                    <Badge className="bg-secondary text-secondary-foreground flex items-center gap-1">
                      <CreditCard className="w-3 h-3" />
                      Flexible Payment
                    </Badge>
                  </div>
                </div>

                {/* Truck Details */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Truck className="w-5 h-5 text-primary" />
                    <h3 className="text-2xl font-bold text-foreground">
                      {truck.make} {truck.model}
                    </h3>
                  </div>

                  {/* Key Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Year:</span>
                      <span className="ml-2 font-medium text-foreground">{truck.year}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Mileage:</span>
                      <span className="ml-2 font-medium text-foreground">{truck.mileage}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Engine:</span>
                      <span className="ml-2 font-medium text-foreground">{truck.engine}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Transmission:</span>
                      <span className="ml-2 font-medium text-foreground">{truck.transmission}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">VIN:</span>
                      <span className="ml-2 font-medium text-foreground">{truck.vin}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Axles:</span>
                      <span className="ml-2 font-medium text-foreground">{truck.axles}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Suspension:</span>
                      <span className="ml-2 font-medium text-foreground">{truck.suspension}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Exterior:</span>
                      <span className="ml-2 font-medium text-foreground">{truck.exterior}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Interior:</span>
                      <span className="ml-2 font-medium text-foreground">{truck.interior}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Condition:</span>
                      <span className="ml-2 font-medium text-foreground">{truck.condition}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Warranty:</span>
                      <span className="ml-2 font-medium text-foreground">{truck.warranty}</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">Weekly:</span>
                      <span className="text-xl font-bold text-primary">{truck.weeklyRate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Monthly:</span>
                      <span className="text-xl font-bold text-primary">{truck.monthlyRate}</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3">
                    <Button asChild className="btn-cta w-full">
                      <Link to={`/order?truck=${truck.id}`}>
                        Reserve This Truck
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="btn-secondary w-full">
                      <Link to={`/order?truck=${truck.id}`}>
                        Inquire Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Get answers to common questions about our truck rental and rent-to-own services.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="card-gradient rounded-xl px-6 border-0"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
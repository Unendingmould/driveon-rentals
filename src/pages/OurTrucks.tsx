import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from 'react';
import { Truck, Shield, CreditCard, Plus, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import TruckDetailModal from '@/components/TruckDetailModal';

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

// Define a more specific interface for the trucks on this page
export interface OurTruck {
  id: number;
  images: string[];
  make: string;
  model: string;
  year: string;
  mileage: string;
  engine: string;
  transmission: string;
  vin: string;
  title: string;
  axles: string;
  suspension: string;
  exterior: string;
  interior: string;
  condition: string;
  warranty: string;
  weeklyRate: string;
  monthlyRate: string;
}

export default function OurTrucks() {
  const [selectedTruck, setSelectedTruck] = useState<OurTruck | null>(null);
  const trucks: OurTruck[] = [
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
      <section className="bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight">
              Find the right truck for you.
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-muted-foreground">
              Flexible payment, reliable trucks, ready for the road.
            </p>
          </div>
        </div>
      </section>

      {/* Trucks Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {trucks.map((truck) => (
              <div key={truck.id} className="group cursor-pointer" onClick={() => setSelectedTruck(truck)}>
                <div className="relative bg-muted/50 rounded-lg p-8 mb-4 aspect-square flex items-center justify-center overflow-hidden">
                  <img
                    src={truck.images[0]}
                    alt={truck.model}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 h-10 w-10 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{truck.make} {truck.model}</h3>
                  <p className="text-muted-foreground">{truck.year} • {truck.mileage} miles</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Get answers to common questions about our truck rental and rent-to-own services.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b">
                <AccordionTrigger noChevron className="flex justify-between items-center w-full py-6 text-left font-semibold text-foreground hover:no-underline group">
                  <div className="flex items-center">
                    <span className="text-lg text-muted-foreground mr-8">{`0${index + 1}`}</span>
                    <span className="text-lg">{faq.question}</span>
                  </div>
                  <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center transform transition-transform duration-300 group-data-[state=open]:rotate-45">
                    <Plus className="h-6 w-6 text-primary-foreground" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 pl-16">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <Footer />

      {selectedTruck && (
        <TruckDetailModal 
          truck={{
            id: selectedTruck.id.toString(),
            model: `${selectedTruck.make} ${selectedTruck.model}`,
            subtitle: `${selectedTruck.year} • ${selectedTruck.mileage} miles`,
            images: selectedTruck.images,
            description: `A reliable ${selectedTruck.condition} ${selectedTruck.make} ${selectedTruck.model} with a ${selectedTruck.engine} engine and ${selectedTruck.transmission} transmission. This truck is ready for the road.`,
            features: {
              'Make': selectedTruck.make,
              'Model': selectedTruck.model,
              'Year': selectedTruck.year,
              'Mileage': selectedTruck.mileage,
              'Engine': selectedTruck.engine,
              'Transmission': selectedTruck.transmission,
              'VIN': selectedTruck.vin,
              'Condition': selectedTruck.condition,
              'Warranty': selectedTruck.warranty,
              'Weekly Rate': selectedTruck.weeklyRate,
              'Monthly Rate': selectedTruck.monthlyRate,
            },
            applications: [selectedTruck.axles, selectedTruck.suspension, 'Heavy-Duty'],
          }}
          onClose={() => setSelectedTruck(null)} 
        />
      )}
    </div>
  );
}
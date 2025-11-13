import { Check, Clock, Shield, CreditCard, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Link } from "react-router-dom";

const Financing = () => {
  usePageTitle("Financing");

  const plans = [
    {
      name: "Standard Plan",
      description: "Spread payments over 12 months with a fixed interest rate.",
      features: [
        "12 monthly payments",
        "Low upfront deposit", 
        "Fixed 5% interest rate"
      ],
      cta: "Choose Standard Plan",
      popular: false
    },
    {
      name: "Extended Plan", 
      description: "Enjoy more flexibility with payments spread across 24 months.",
      features: [
        "24 monthly payments",
        "Moderate upfront deposit",
        "Variable 7% interest rate"
      ],
      cta: "Choose Extended Plan",
      popular: true
    },
    {
      name: "Business Growth Plan",
      description: "Ideal for fleet buyers and businesses scaling operations.",
      features: [
        "Custom payment terms (36+ months)",
        "Negotiable deposit", 
        "Tailored interest rates based on volume"
      ],
      cta: "Contact Us for Custom Plan",
      popular: false
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      text: "Fast approval process with minimal paperwork"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      text: "Flexible payment schedules – weekly, monthly, or quarterly"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      text: "Competitive interest rates tailored to your business size"
    },
    {
      icon: <Check className="w-6 h-6" />,
      text: "Zero hidden charges or prepayment penalties"
    }
  ];

  const steps = [
    {
      question: "Select Your Truck",
      answer: "Browse our inventory on the Trucks page and choose the vehicle that best fits your needs. Each listing provides detailed specifications to help you decide."
    },
    {
      question: "Fill Out the Financing Form",
      answer: "Once you've selected a truck, complete our straightforward financing application. We only ask for the essential details to process your request quickly."
    },
    {
      question: "Choose Your Payment Plan",
      answer: "We offer a variety of flexible payment plans. Select the one that aligns with your budget and business's cash flow—whether it's weekly, monthly, or quarterly."
    },
    {
      question: "Get Approved and Drive",
      answer: "Our team will review your application and provide a decision promptly. Upon approval, you can get behind the wheel and start your journey."
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
              Flexible financing & payment plans.
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-muted-foreground">
              Choose a payment plan that fits your budget and business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Why Finance With Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Our Financing Options?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex items-start space-x-4 p-6 card-gradient border border-border rounded-lg fade-in-up animation-delay-${index * 200}`}
              >
                <div className="text-yellow-500 flex-shrink-0">
                  {benefit.icon}
                </div>
                <p className="text-foreground text-lg">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Payment Plans
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative card-gradient border-border hover-lift fade-in-up animation-delay-${index * 200} ${
                  plan.popular ? 'ring-2 ring-yellow-400' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-foreground text-xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-yellow-500" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full btn-cta mt-6 rounded-full" asChild>
                    <Link to="/financing/apply">
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              How Financing Works
            </h2>
            <p className="text-xl text-muted-foreground">
              A simple, transparent process to get you on the road.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto space-y-4">
            {steps.map((step, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b">
                <AccordionTrigger noChevron className="flex justify-between items-center w-full py-6 text-left font-semibold text-foreground hover:no-underline group">
                  <div className="flex items-center flex-1 min-w-0">
                    <span className="text-lg text-muted-foreground mr-8 flex-shrink-0">{`0${index + 1}`}</span>
                    <span className="text-lg">{step.question}</span>
                  </div>
                  <div className="h-10 w-10 bg-yellow-400 rounded-full flex items-center justify-center transform transition-transform duration-300 group-data-[state=open]:rotate-45 flex-shrink-0 ml-4">
                    <Plus className="h-6 w-6 text-black" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 pl-16">
                  {step.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 to-yellow-400/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Apply today and get approved for your truck financing.
          </p>
          <Button className="btn-cta text-lg px-8 py-4 rounded-full" asChild>
            <Link to="/financing/apply">
              Apply for Financing
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Financing;
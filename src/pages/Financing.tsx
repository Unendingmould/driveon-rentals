import { Check, Clock, Shield, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Financing = () => {
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
    "Select your truck from our Trucks page.",
    "Fill out the financing form with your details.",
    "Choose your preferred payment plan.",
    "Get approval and start driving your truck!"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="relative py-24 bg-gradient-to-r from-background via-background/95 to-background overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-6 fade-in-up">
              Flexible Financing & Payment Plans
            </h1>
            <p className="text-xl text-muted-foreground fade-in-up animation-delay-200">
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
                <div className="text-primary flex-shrink-0">
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
                  plan.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
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
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full btn-cta mt-6">
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How Financing Works
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-6 fade-in-up animation-delay-${index * 200}`}
                >
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-foreground">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Apply today and get approved for your truck financing.
          </p>
          <Button className="btn-cta text-lg px-8 py-4">
            Apply for Financing
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Financing;
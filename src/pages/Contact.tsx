import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setIsSubmitting(false);
    
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Call Us",
      value: "+234-800-TRUCKS",
      href: "tel:+2348008782257"
    },
    {
      icon: Mail,
      label: "Email",
      value: "support@yourbrand.com",
      href: "mailto:support@yourbrand.com"
    },
    {
      icon: MapPin,
      label: "Office Address",
      value: "123 Logistics Road, Lagos, Nigeria",
      href: "https://maps.google.com"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp Support",
      value: "+234-700-TRUCKS",
      href: "https://wa.me/2347008782257"
    }
  ];

  const locations = [
    { city: "Los Angeles", state: "California", country: "USA" },
    { city: "Houston", state: "Texas", country: "USA" },
    { city: "Chicago", state: "Illinois", country: "USA" },
    { city: "Toronto", state: "Ontario", country: "Canada" },
    { city: "Vancouver", state: "British Columbia", country: "Canada" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground">
              Get in touch
            </h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <section>
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input 
                      id="name" 
                      name="name"
                      required 
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      required 
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel" 
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      required 
                      placeholder="Tell us how we can help you..."
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="btn-cta w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Locations Section */}
          <section>
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-2xl">Find Us Here</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground mb-6">
                    We operate across multiple locations in the USA and Canada to serve you better.
                  </p>
                  
                  <div className="space-y-4">
                    {locations.map((location, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background border">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-primary" />
                          <div>
                            <h4 className="font-medium text-foreground">
                              {location.city}, {location.state}
                            </h4>
                            <Badge variant="secondary" className="mt-1">
                              {location.country}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> Additional service areas available. Contact us to check availability in your region.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
        {/* Contact Info Section */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Reach Us Directly
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <Card key={index} className="card-gradient hover:hover-lift transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.label}</h3>
                  <a 
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.value}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
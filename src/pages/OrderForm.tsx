import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown, Shield, Lock, CheckCircle, ArrowLeft, Truck } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Address is required"),
  paymentPlan: z.enum(["purchase", "rent-to-own", "monthly"], {
    required_error: "Please select a payment plan",
  }),
});

export default function OrderForm() {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();
  
  const truckId = searchParams.get("truck") || "1";
  
  // Mock truck data (in real app, this would come from API)
  const truckData = {
    "1": { make: "Freightliner", model: "Cascadia 125", year: 2024, mileage: "45,000 mi", condition: "Used", basePrice: 65000 },
    "2": { make: "Peterbilt", model: "579", year: 2023, mileage: "52,000 mi", condition: "Used", basePrice: 72000 },
    "3": { make: "Kenworth", model: "T680", year: 2024, mileage: "38,000 mi", condition: "Used", basePrice: 68000 },
  };
  
  const selectedTruck = truckData[truckId as keyof typeof truckData] || truckData["1"];

  const paymentPlans = [
    {
      id: "purchase",
      title: "One-time Purchase", 
      description: "Pay upfront and own instantly",
      price: selectedTruck.basePrice,
      monthly: 0,
    },
    {
      id: "rent-to-own",
      title: "Rent-to-Own",
      description: "Affordable monthly payments leading to full ownership", 
      price: Math.round(selectedTruck.basePrice * 0.15),
      monthly: Math.round(selectedTruck.basePrice * 0.04),
    },
    {
      id: "monthly", 
      title: "Flexible Monthly Plan",
      description: "Lowest monthly commitment, cancel anytime",
      price: Math.round(selectedTruck.basePrice * 0.10),
      monthly: Math.round(selectedTruck.basePrice * 0.035),
    },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      paymentPlan: "rent-to-own",
    },
  });

  const selectedPaymentPlan = form.watch("paymentPlan");
  const currentPlan = paymentPlans.find(plan => plan.id === selectedPaymentPlan);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setShowConfirmation(true);
    console.log(values);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1920&h=1080&fit=crop&crop=center')] bg-cover bg-center opacity-20" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/trucks" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Trucks
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Secure Your Truck Today
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Fill in your details, select your plan, and get on the road faster.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Truck Summary */}
        <Card className="mb-8 card-gradient">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-accent/50 rounded-t-lg transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck className="w-6 h-6 text-primary" />
                    <CardTitle className="text-xl">Your Selected Truck</CardTitle>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Make</div>
                    <div className="font-medium">{selectedTruck.make}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Model</div>
                    <div className="font-medium">{selectedTruck.model}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Year</div>
                    <div className="font-medium">{selectedTruck.year}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Mileage</div>
                    <div className="font-medium">{selectedTruck.mileage}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Condition</div>
                    <div className="font-medium">{selectedTruck.condition}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Base Price</div>
                    <div className="font-medium text-primary">${selectedTruck.basePrice.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-2xl">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location / Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your address" className="min-h-[80px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Plan */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-2xl">Choose Your Payment Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="paymentPlan"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-4"
                        >
                          {paymentPlans.map((plan) => (
                            <div key={plan.id} className="relative">
                              <RadioGroupItem
                                value={plan.id}
                                id={plan.id}
                                className="peer sr-only"
                              />
                              <label
                                htmlFor={plan.id}
                                className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-lg border-2 cursor-pointer transition-all peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-accent/50"
                              >
                                <div className="flex-1">
                                  <div className="font-semibold text-lg mb-2">{plan.title}</div>
                                  <div className="text-muted-foreground">{plan.description}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-primary">
                                    ${plan.price.toLocaleString()}
                                  </div>
                                  {plan.monthly > 0 && (
                                    <div className="text-sm text-muted-foreground">
                                      + ${plan.monthly.toLocaleString()}/month
                                    </div>
                                  )}
                                  {plan.id === selectedPaymentPlan && (
                                    <Badge className="mt-2">Selected</Badge>
                                  )}
                                </div>
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Review Order */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-2xl">Review Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Total Due Now:</span>
                    <span className="text-2xl font-bold text-primary">
                      ${currentPlan?.price.toLocaleString()}
                    </span>
                  </div>
                  {currentPlan?.monthly && currentPlan.monthly > 0 && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Next Payment Schedule:</span>
                      <span className="font-medium">
                        ${currentPlan.monthly.toLocaleString()}/month
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="card-gradient text-center">
              <CardContent className="pt-8 pb-8">
                <Button type="submit" className="btn-cta text-xl px-12 py-6 mb-4">
                  Get My Truck
                </Button>
                <p className="text-muted-foreground">
                  We'll contact you within 24 hours to finalize your order.
                </p>
              </CardContent>
            </Card>
          </form>
        </Form>

        {/* Trust Badges */}
        <div className="flex justify-center items-center gap-8 mt-12 py-8 border-t border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5" />
            <span className="text-sm">Secure Form</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="w-5 h-5" />
            <span className="text-sm">Verified Payment</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm">Safe Data Handling</span>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-2xl">Order Submitted Successfully!</DialogTitle>
            <DialogDescription className="text-base">
              Thank you for choosing us! We've received your order for the {selectedTruck.make} {selectedTruck.model} and will contact you within 24 hours to finalize the details.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-6">
            <Button onClick={() => setShowConfirmation(false)} className="btn-cta">
              Got It
            </Button>
            <Button variant="outline" onClick={() => setShowConfirmation(false)} asChild>
              <Link to="/trucks">View More Trucks</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
}
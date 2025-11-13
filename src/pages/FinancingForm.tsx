import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";

export default function FinancingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    employmentStatus: "",
    financingType: "",
    paymentPlan: "",
    creditScoreRange: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { session } = useSessionContext();

  usePageTitle("Apply for Financing");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formElement = e.target as HTMLFormElement;
      const formDataObj = new FormData(formElement);

      const applicationData = {
        user_id: session?.user?.id || null,
        full_name: formDataObj.get("fullName") as string,
        email: formDataObj.get("email") as string,
        phone: formDataObj.get("phone") as string,
        address: formDataObj.get("address") as string,
        city: formDataObj.get("city") as string,
        state: formDataObj.get("state") as string,
        zip_code: formDataObj.get("zipCode") as string,
        employment_status: formData.employmentStatus,
        employer: formDataObj.get("employer") as string || null,
        monthly_income: parseFloat(formDataObj.get("monthlyIncome") as string),
        years_employed: formDataObj.get("yearsEmployed") ? parseFloat(formDataObj.get("yearsEmployed") as string) : null,
        financing_type: formData.financingType,
        financing_amount: parseFloat(formDataObj.get("financingAmount") as string),
        payment_plan: formData.paymentPlan,
        down_payment: formDataObj.get("downPayment") ? parseFloat(formDataObj.get("downPayment") as string) : null,
        credit_score_range: formData.creditScoreRange || null,
        additional_notes: formDataObj.get("additionalNotes") as string || null,
        status: "pending"
      };

      const { error } = await supabase
        .from("financing_applications")
        .insert([applicationData]);

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "We'll review your financing application and get back to you within 24-48 hours.",
      });

      // Reset form
      formElement.reset();
      setFormData({
        employmentStatus: "",
        financingType: "",
        paymentPlan: "",
        creditScoreRange: ""
      });
      
      // Redirect to dashboard or trucks page after a delay
      setTimeout(() => {
        navigate(session ? "/dashboard" : "/trucks");
      }, 2000);
    } catch (error) {
      console.error("Error submitting financing application:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => navigate("/financing")}
              className="mb-6 -ml-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Financing
            </Button>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground">
              Apply for Financing
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Fill out the form below to secure funding for your truck purchase or rental.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="card-gradient">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Financing Application</CardTitle>
                    <CardDescription>Your information is secure and confidential</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b pb-2">Personal Information</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input 
                          id="firstName" 
                          name="firstName"
                          required 
                          placeholder="Enter your first name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input 
                          id="lastName" 
                          name="lastName"
                          required 
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          required 
                          placeholder="your.email@example.com"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          type="tel" 
                          required 
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input 
                        id="address" 
                        name="address"
                        required 
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input 
                          id="city" 
                          name="city"
                          required 
                          placeholder="City"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input 
                          id="state" 
                          name="state"
                          required 
                          placeholder="State"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input 
                          id="zipCode" 
                          name="zipCode"
                          required 
                          placeholder="00000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Employment Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b pb-2">Employment Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="employmentStatus">Employment Status *</Label>
                      <Select name="employmentStatus" required value={formData.employmentStatus} onValueChange={(value) => setFormData({...formData, employmentStatus: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self_employed">Self-Employed</SelectItem>
                          <SelectItem value="business_owner">Business Owner</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employer">Employer / Company Name</Label>
                        <Input 
                          id="employer" 
                          name="employer"
                          placeholder="Your employer or business name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="monthlyIncome">Monthly Income *</Label>
                        <Input 
                          id="monthlyIncome" 
                          name="monthlyIncome"
                          type="number"
                          min="0"
                          step="100"
                          required 
                          placeholder="$5,000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearsEmployed">Years at Current Position</Label>
                      <Input 
                        id="yearsEmployed" 
                        name="yearsEmployed"
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="2"
                      />
                    </div>
                  </div>

                  {/* Financing Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b pb-2">Financing Details</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="financingType">Financing Type *</Label>
                        <Select name="financingType" required value={formData.financingType} onValueChange={(value) => setFormData({...formData, financingType: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select financing type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="purchase">Purchase</SelectItem>
                            <SelectItem value="rental">Rental</SelectItem>
                            <SelectItem value="lease_to_own">Lease to Own</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="requestedAmount">Requested Amount *</Label>
                        <Input 
                          id="requestedAmount" 
                          name="requestedAmount"
                          type="number"
                          min="0"
                          step="1000"
                          required 
                          placeholder="$50,000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentPlan">Preferred Payment Plan *</Label>
                      <Select name="paymentPlan" required value={formData.paymentPlan} onValueChange={(value) => setFormData({...formData, paymentPlan: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard_12">Standard Plan (12 months)</SelectItem>
                          <SelectItem value="extended_24">Extended Plan (24 months)</SelectItem>
                          <SelectItem value="business_36">Business Growth Plan (36+ months)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="downPayment">Down Payment Amount</Label>
                      <Input 
                        id="downPayment" 
                        name="downPayment"
                        type="number"
                        min="0"
                        step="500"
                        placeholder="$5,000 (optional)"
                      />
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b pb-2">Additional Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="creditScore">Estimated Credit Score</Label>
                      <Select name="creditScore" value={formData.creditScoreRange} onValueChange={(value) => setFormData({...formData, creditScoreRange: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select credit score range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent (750+)</SelectItem>
                          <SelectItem value="good">Good (700-749)</SelectItem>
                          <SelectItem value="fair">Fair (650-699)</SelectItem>
                          <SelectItem value="poor">Poor (below 650)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalNotes">Additional Notes</Label>
                      <Textarea 
                        id="additionalNotes" 
                        name="additionalNotes"
                        placeholder="Tell us anything else that might help with your application..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="btn-cta w-full text-lg py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Submitting Application..."
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Submit Financing Application
                        </>
                      )}
                    </Button>
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      By submitting this form, you agree to our terms and conditions. We'll review your application and contact you within 24-48 hours.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FeaturedTrucks from "@/components/FeaturedTrucks";
import PaymentOptions from "@/components/PaymentOptions";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <Services />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FeaturedTrucks />
      <PaymentOptions />
      <FinalCTA />
    </div>
  );
};

export default Index;

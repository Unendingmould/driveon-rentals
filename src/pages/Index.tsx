import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedTrucks from "@/components/FeaturedTrucks";
import PaymentOptions from "@/components/PaymentOptions";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <WhyChooseUs />
      <FeaturedTrucks />
      <PaymentOptions />
      <FinalCTA />
    </div>
  );
};

export default Index;

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FeaturedTrucks from "@/components/FeaturedTrucks";
import PaymentOptions from "@/components/PaymentOptions";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";

const Index = () => {
  usePageTitle("Home");

  return (
    <div className="min-h-screen">
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <Services />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <FeaturedTrucks />
        <PaymentOptions />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

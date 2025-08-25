import { Button } from "@/components/ui/button";
import heroTruckImage from "@/assets/hero-truck.jpg";

export default function HeroSection() {
  const scrollToTrucks = () => {
    document.getElementById('trucks')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroTruckImage})` }}
      >
        <div className="absolute inset-0 hero-overlay" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient fade-in-up">
            No Big Upfront Cost. Just a Truck You Can Drive Today.
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground fade-in-up animation-delay-200">
            Weekly, monthly, and quarterly truck rental plans across USA, Canada & UK.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 fade-in-up animation-delay-400">
            <Button 
              onClick={scrollToTrucks}
              className="btn-cta text-lg px-8 py-6"
            >
              Find My Truck
            </Button>
            
            <Button 
              onClick={scrollToCTA}
              variant="outline" 
              className="btn-secondary text-lg px-8 py-6"
            >
              Start Driving Now
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
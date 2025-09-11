import { Button } from "@/components/ui/button";
import heroTruckImage from "@/assets/hero-truck.jpg";

export default function HeroSection() {
  const scrollToTrucks = () => {
    document.getElementById('trucks')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroTruckImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="text-white">Get ready for a</span>
            <br />
            <span className="text-white">truck </span>
            <span className="bg-primary text-primary-foreground px-4 py-2 rounded-lg inline-block">
              rental
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl">
            Driving success through flexible 
            truck rental solutions.
          </p>
          
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-full flex items-center pr-2 pl-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group" onClick={scrollToTrucks}>
              <span className="text-foreground font-medium text-lg mr-4">Our solutions</span>
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-300">
                <span className="text-xl font-bold text-black">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
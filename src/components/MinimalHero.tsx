import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroRoad from "@/assets/hero-road.jpg";

export default function MinimalHero() {
  const scrollToSolutions = () => {
    const element = document.getElementById('solutions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroRoad})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-large-spaced text-white mb-8 fade-in-minimal">
          Get set for an
          <br />
          <span className="block mt-4">electric future</span>
        </h1>
        
        <div className="slide-up-minimal" style={{ animationDelay: '0.3s' }}>
          <Link to="/trucks">
            <Button className="btn-outline-minimal bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
              Our solutions
              <br />
              <span className="text-xs font-light">Our solutions</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 slide-up-minimal" style={{ animationDelay: '0.6s' }}>
        <button 
          onClick={scrollToSolutions}
          className="text-white/80 hover:text-white transition-colors duration-200"
        >
          <div className="text-sm font-light mb-2">Explore</div>
          <div className="text-2xl">↓</div>
        </button>
      </div>
    </section>
  );
}
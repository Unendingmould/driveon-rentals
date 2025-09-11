import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  const handleGetTruck = () => {
    // In a real app, this would open a form or redirect to checkout
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="cta" className="relative py-32 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1920&h=1080&fit=crop&crop=center')] bg-cover bg-center opacity-20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground fade-in-up">
            Stop waiting, start driving.
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground fade-in-up animation-delay-200">
            Trucks available now – secure yours today.
          </p>
          
          <Button 
            onClick={handleGetTruck}
            className="btn-cta text-xl px-12 py-6 rounded-full fade-in-up animation-delay-400"
          >
            Get My Truck
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse animation-delay-400" />
    </section>
  );
}
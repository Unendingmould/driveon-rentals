import truck2 from "@/assets/truck-2.jpg";
import truck3 from "@/assets/truck-3.jpg";
import heroTruck from "@/assets/hero-truck.jpg";

export default function HowWeHelp() {
  return (
    <section className="section-minimal bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Image grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="slide-up-minimal">
            <img 
              src={truck2} 
              alt="Professional truck maintenance"
              className="w-full h-64 object-cover rounded-lg shadow-card"
            />
          </div>
          <div className="slide-up-minimal" style={{ animationDelay: '0.1s' }}>
            <img 
              src={truck3} 
              alt="Customer service excellence"
              className="w-full h-64 object-cover rounded-lg shadow-card"
            />
          </div>
          <div className="slide-up-minimal" style={{ animationDelay: '0.2s' }}>
            <img 
              src={heroTruck} 
              alt="Modern truck fleet"
              className="w-full h-64 object-cover rounded-lg shadow-card"
            />
          </div>
        </div>

        {/* Content sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="slide-up-minimal" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-lg font-medium text-neutral-900 mb-4">How we can help</h4>
            <h3 className="text-2xl font-light text-neutral-900 mb-4 leading-tight">
              Leaders in commercial truck rental solutions
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Backed by decades of experience in logistics and transportation, TruckRental brings you a fleet of modern, well-maintained vehicles.
            </p>
          </div>

          <div className="slide-up-minimal" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-2xl font-light text-neutral-900 mb-4 leading-tight">
              A consultative approach
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              We work closely with you throughout the rental process to ensure the vehicle meets your unique requirements and timeline.
            </p>
          </div>

          <div className="slide-up-minimal" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-2xl font-light text-neutral-900 mb-4 leading-tight">
              Ongoing support and maintenance
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              We provide 24/7 roadside assistance and maintenance support, so there's no need for your day-to-day involvement in vehicle upkeep.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
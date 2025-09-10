import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import truck1 from "@/assets/truck-1.jpg";

export default function TruckShowcase() {
  return (
    <section className="section-minimal bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Large showcase image */}
        <div className="mb-16 slide-up-minimal">
          <img 
            src={truck1} 
            alt="Professional truck rental fleet"
            className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-card"
          />
        </div>

        {/* Content */}
        <div className="text-center mb-16">
          <h2 className="text-medium-spaced text-neutral-900 mb-8 slide-up-minimal" style={{ animationDelay: '0.2s' }}>
            Smart truck rental solutions for businesses and individuals
          </h2>
          
          <div className="slide-up-minimal" style={{ animationDelay: '0.4s' }}>
            <Link to="/trucks">
              <Button className="btn-outline-minimal">
                Our solutions
                <br />
                <span className="text-xs font-light">Our solutions</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Trucks grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-light text-neutral-900 mb-8 slide-up-minimal" style={{ animationDelay: '0.6s' }}>
            We offer a range of trucks to choose from.
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Compact Truck", size: "Up to 1 ton capacity", image: truck1 },
              { name: "Mid-size Truck", size: "Up to 3 ton capacity", image: truck1 },
              { name: "Large Truck", size: "Up to 5 ton capacity", image: truck1 },
              { name: "Box Truck", size: "Up to 7 ton capacity", image: truck1 },
              { name: "Heavy Duty", size: "Up to 10 ton capacity", image: truck1 },
              { name: "Specialty Truck", size: "Custom configurations", image: truck1 }
            ].map((truck, index) => (
              <div 
                key={truck.name}
                className="slide-up-minimal group"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <Link to="/trucks" className="block">
                  <div className="mb-4">
                    <img 
                      src={truck.image} 
                      alt={truck.name}
                      className="w-full h-48 object-cover rounded-lg shadow-minimal group-hover:shadow-card transition-shadow duration-200"
                    />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-neutral-500 mb-1">→</div>
                    <h4 className="text-xl font-medium text-neutral-900 mb-2 group-hover:text-neutral-600 transition-colors duration-200">
                      {truck.name}
                    </h4>
                    <p className="text-sm text-neutral-600">
                      {truck.size}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import truck1 from "@/assets/truck-1.jpg";

export default function TruckSolutions() {
  return (
    <section id="solutions" className="section-minimal bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main heading */}
        <div className="text-center mb-16">
          <h2 className="text-medium-spaced text-neutral-900 mb-8 fade-in-minimal">
            Powering peace of mind through tailored truck rental solutions.
          </h2>
          
          <div className="slide-up-minimal" style={{ animationDelay: '0.2s' }}>
            <p className="text-lg font-light text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Future-proof your business or delivery needs with our scalable truck rental solutions.
            </p>
          </div>
        </div>

        {/* Large feature image */}
        <div className="mb-16 slide-up-minimal" style={{ animationDelay: '0.4s' }}>
          <img 
            src={truck1} 
            alt="Professional truck rental solution"
            className="w-full h-96 object-cover rounded-lg shadow-card"
          />
        </div>

        {/* Solutions grid */}
        <div className="mb-16">
          <h3 className="text-xl font-light text-neutral-900 mb-8 slide-up-minimal" style={{ animationDelay: '0.6s' }}>
            Truck solutions for
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "01", title: "Small businesses", desc: "Local delivery and logistics" },
              { number: "02", title: "Moving services", desc: "Residential and commercial moves" },
              { number: "03", title: "Construction", desc: "Equipment and material transport" },
              { number: "04", title: "E-commerce", desc: "Last-mile delivery solutions" }
            ].map((solution, index) => (
              <div 
                key={solution.number}
                className="slide-up-minimal"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <Link to="/trucks" className="group block">
                  <div className="border-l-2 border-neutral-200 pl-6 py-4 hover:border-neutral-400 transition-colors duration-200">
                    <div className="text-sm text-neutral-500 mb-2">{solution.number}</div>
                    <h4 className="text-lg font-medium text-neutral-900 mb-2 group-hover:text-neutral-600 transition-colors duration-200">
                      {solution.title}
                    </h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {solution.desc}
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
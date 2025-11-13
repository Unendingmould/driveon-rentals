import { Truck, ArrowRight } from "lucide-react";

const hardcodedServices = [
  {
    id: "1",
    title: "Owner Operators",
    subtitle: "Flexible rental terms for independent truckers building their business"
  },
  {
    id: "2",
    title: "Fleet Expansion",
    subtitle: "Scale your operations with our reliable commercial truck fleet"
  },
  {
    id: "3",
    title: "Seasonal Demand",
    subtitle: "Short-term rentals to handle peak shipping seasons"
  },
  {
    id: "4",
    title: "Emergency Replacement",
    subtitle: "Quick turnaround when your truck is down for maintenance"
  }
];

export default function Services() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Rental Solutions For
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
            Flexible truck rental options designed for your specific business needs
          </p>
        </div>

        {/* Solution Cards - Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {hardcodedServices.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white dark:bg-card rounded-2xl border-2 border-border p-6 sm:p-8 transition-all duration-300 hover:shadow-lg"
            >
              {/* Number Badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <span className="text-sm sm:text-base font-bold text-primary">
                    {String(index + 1).padStart(2, \"0\")}
                  </span>
                </div>
              </div>

              {/* Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-5 sm:mb-6 transition-transform group-hover:scale-110 duration-300">
                <Truck className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {service.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
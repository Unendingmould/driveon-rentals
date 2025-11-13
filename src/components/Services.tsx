import { User, TrendingUp, Calendar, Wrench } from "lucide-react";

const hardcodedServices = [
  {
    id: "1",
    title: "Owner Operators",
    subtitle: "Flexible rental terms for independent truckers building their business",
    icon: User
  },
  {
    id: "2",
    title: "Fleet Expansion",
    subtitle: "Scale your operations with our reliable commercial truck fleet",
    icon: TrendingUp
  },
  {
    id: "3",
    title: "Seasonal Demand",
    subtitle: "Short-term rentals to handle peak shipping seasons",
    icon: Calendar
  },
  {
    id: "4",
    title: "Emergency Replacement",
    subtitle: "Quick turnaround when your truck is down for maintenance",
    icon: Wrench
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {hardcodedServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative bg-white dark:bg-card rounded-xl border border-border p-5 sm:p-6 transition-all duration-300"
              >
                {/* Number Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-4 sm:mb-5 transition-transform group-hover:scale-110 duration-300">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
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
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl font-medium text-muted-foreground mb-8">
            Rental solutions for
          </h2>

          <div className="space-y-4">
            {hardcodedServices.map((service, index) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-6 rounded-lg border bg-card hover:bg-primary hover:border-primary transition-all duration-300 hover:shadow-md cursor-pointer group"
              >
                <div className="flex items-center gap-6">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary-foreground group-hover:text-primary transition-colors duration-300">
                    <Truck className="h-8 w-8" />
                  </span>
                  <div>
                    <p className="text-sm uppercase tracking-wide text-muted-foreground group-hover:text-primary-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary-foreground transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground group-hover:text-primary-foreground/80">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                <ArrowRight className="hidden sm:block w-8 h-8 transition-all duration-300 group-hover:translate-x-2 text-muted-foreground group-hover:text-primary-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
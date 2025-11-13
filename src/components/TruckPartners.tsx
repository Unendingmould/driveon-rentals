/**
 * TruckPartners Component
 * Displays trusted truck brands/manufacturers as partners
 */

export default function TruckPartners() {
  const partners = [
    { name: "Volvo", logo: "/trucks logo/volvo-alt-svgrepo-com.svg" },
    { name: "Freightliner", logo: "/trucks logo/freightliner-trucks.svg" },
    { name: "Kenworth", logo: "/trucks logo/kenworth-1.svg" },
    { name: "Peterbilt", logo: "/trucks logo/peterbilt.svg" },
    { name: "Mack", logo: "/trucks logo/mack-trucks-1.svg" },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Trusted Vehicle Partners
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We work with leading truck manufacturers to bring you quality vehicles
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center p-4 md:p-6 bg-white rounded-lg border border-border/60 hover:shadow-md transition-shadow w-full h-24 md:h-28"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} trucks`}
                className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

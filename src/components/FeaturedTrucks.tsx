import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import TruckDetailModal from "./TruckDetailModal";
import { useTrucks } from "@/hooks/useDriveonData";
import { Skeleton } from "@/components/ui/skeleton";
import type { TruckWithAssets } from "@/types/driveon";
import truck1 from "@/assets/truck-1.jpg";
import truck2 from "@/assets/truck-2.jpg";
import truck3 from "@/assets/truck-3.jpg";

const FALLBACK_IMAGE = truck1;

// Placeholder trucks for when database is empty or fails
const PLACEHOLDER_TRUCKS: TruckWithAssets[] = [
  {
    id: "placeholder-1",
    slug: "2020-volvo-vnl",
    title: "2020 Volvo VNL",
    make: "Volvo",
    model: "VNL",
    model_year: 2020,
    mileage: 45000,
    weekly_rate: 1200,
    monthly_rate: 4500,
    status: "available",
    images: [{ id: "img-1", url: FALLBACK_IMAGE, alt: "Volvo VNL Truck", isPrimary: true, sortOrder: 0 }],
    engine: null,
    transmission: null,
    vin: null,
    exterior_color: null,
    interior_color: null,
    suspension: null,
    axles: null,
    condition: null,
    warranty: null,
    short_description: null,
    description: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "placeholder-2",
    slug: "2019-freightliner-cascadia",
    title: "2019 Freightliner Cascadia",
    make: "Freightliner",
    model: "Cascadia",
    model_year: 2019,
    mileage: 67000,
    weekly_rate: 1100,
    monthly_rate: 4200,
    status: "available",
    images: [{ id: "img-2", url: truck2, alt: "Freightliner Cascadia", isPrimary: true, sortOrder: 0 }],
    engine: null,
    transmission: null,
    vin: null,
    exterior_color: null,
    interior_color: null,
    suspension: null,
    axles: null,
    condition: null,
    warranty: null,
    short_description: null,
    description: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "placeholder-3",
    slug: "2021-kenworth-t680",
    title: "2021 Kenworth T680",
    make: "Kenworth",
    model: "T680",
    model_year: 2021,
    mileage: 32000,
    weekly_rate: 1300,
    monthly_rate: 4800,
    status: "available",
    images: [{ id: "img-3", url: truck3, alt: "Kenworth T680", isPrimary: true, sortOrder: 0 }],
    engine: null,
    transmission: null,
    vin: null,
    exterior_color: null,
    interior_color: null,
    suspension: null,
    axles: null,
    condition: null,
    warranty: null,
    short_description: null,
    description: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function FeaturedTrucks() {
  const { data: trucks, isLoading, isError } = useTrucks();
  const [selectedTruck, setSelectedTruck] = useState<TruckWithAssets | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("[FeaturedTrucks] query state", {
        isLoading,
        isError,
        truckCount: trucks?.length ?? 0,
      });
    }
  }, [trucks, isLoading, isError]);

  const featured = useMemo(() => {
    // Use real trucks if available, otherwise use placeholders
    if (trucks && trucks.length > 0) {
      return trucks.slice(0, 3);
    }
    // Use placeholders if loading failed or no data
    if (isError || !isLoading) {
      return PLACEHOLDER_TRUCKS;
    }
    return [];
  }, [trucks, isError, isLoading]);

  if (isLoading) {
    return (
      <section id="trucks" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Our Featured Trucks
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore a curated selection from our inventory. Each listing is quality-checked and road ready.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="w-full aspect-square rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="trucks" className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-foreground">
              Our Featured Trucks
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Explore a curated selection from our inventory. Each listing is quality-checked and road ready.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {featured.map((truck) => (
              <div
                key={truck.id}
                className="group cursor-pointer"
                onClick={() => setSelectedTruck(truck)}
              >
                {/* Modern Card with Border */}
                <div className="relative bg-white dark:bg-card rounded-xl border-2 border-border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl h-full flex flex-col">
                  
                  {/* Image Container - Fixed Aspect Ratio */}
                  <div className="relative w-full aspect-[4/3] bg-muted/30 overflow-hidden">
                    <img
                      src={truck.images[0]?.url || FALLBACK_IMAGE}
                      alt={truck.images[0]?.alt || `${truck.make} ${truck.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Hover Icon */}
                    <div className="absolute top-3 right-3 h-9 w-9 sm:h-10 sm:w-10 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                      <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                        Available
                      </span>
                    </div>
                  </div>

                  {/* Content Container - Aligned Properly */}
                  <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
                    {/* Title */}
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-2 line-clamp-1">
                      {truck.title}
                    </h3>

                    {/* Details */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                      <span className="font-medium">{truck.model_year}</span>
                      <span className="text-border">•</span>
                      <span>{truck.mileage?.toLocaleString()} miles</span>
                    </div>

                    {/* Pricing */}
                    <div className="mt-auto pt-3 sm:pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Starting from</p>
                          <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                            ${truck.weekly_rate?.toLocaleString() || truck.monthly_rate?.toLocaleString() || 'N/A'}
                            <span className="text-xs sm:text-sm font-normal text-muted-foreground">
                              /{truck.weekly_rate ? 'week' : 'month'}
                            </span>
                          </p>
                        </div>
                        
                        {/* CTA Arrow */}
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                          <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedTruck && (
        <TruckDetailModal truck={selectedTruck} onClose={() => setSelectedTruck(null)} />
      )}
    </>
  );
}
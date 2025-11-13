import { useMemo, useState } from "react";
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

  return (
    <>
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

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {featured.map((truck) => {
                const heroImage = truck.images[0];
                return (
                  <button
                    key={truck.id}
                    type="button"
                    className="group text-left min-h-11 w-full"
                    onClick={() => setSelectedTruck(truck)}
                  >
                    <div className="rounded-lg border border-border/60 p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative rounded-md bg-muted/50 mb-4 aspect-square overflow-hidden flex items-center justify-center">
                        <img
                          src={heroImage?.url ?? FALLBACK_IMAGE}
                          alt={heroImage?.alt ?? truck.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4 h-10 w-10 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowUpRight className="h-6 w-6 text-primary-foreground" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">{truck.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {[truck.make, truck.model, truck.model_year ?? undefined].filter(Boolean).join(" • ") || "TrucksOnFlex Fleet"}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {selectedTruck && (
        <TruckDetailModal truck={selectedTruck} onClose={() => setSelectedTruck(null)} />
      )}
    </>
  );
}
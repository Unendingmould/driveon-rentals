import Navigation from "@/components/Navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/Footer";
import TruckDetailModal from "@/components/TruckDetailModal";
import { useTrucks } from "@/hooks/useDriveonData";
import { usePageTitle } from "@/hooks/usePageTitle";
import type { TruckWithAssets } from "@/types/driveon";
import { useState } from "react";
import { Truck, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import truck1 from "@/assets/truck-1.jpg";
import truck2 from "@/assets/truck-2.jpg";
import truck3 from "@/assets/truck-3.jpg";

function formatNumericCurrency(value: string | number | null | undefined) {
  if (value === null || value === undefined) return null;
  const amount = typeof value === "string" ? parseFloat(value) : value;
  if (Number.isNaN(amount)) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatMileage(mileage: number | null | undefined) {
  if (mileage === null || mileage === undefined) return null;
  return `${mileage.toLocaleString()} miles`;
}

// Placeholder trucks (used when database has no trucks)
const placeholderTrucks: TruckWithAssets[] = [
  {
    id: "ph-1",
    slug: "2020-freightliner-cascadia",
    title: "2020 Freightliner Cascadia",
    make: "Freightliner",
    model: "Cascadia",
    model_year: 2020,
    mileage: 450000,
    engine: "Detroit DD15",
    transmission: "Automatic",
    vin: null,
    exterior_color: "White",
    interior_color: null,
    suspension: null,
    axles: "6x4",
    condition: "Used",
    warranty: null,
    weekly_rate: 850,
    monthly_rate: 3000,
    status: "available",
    short_description: "Reliable highway tractor with DD15 engine.",
    description: "Well-maintained 2020 Cascadia ideal for long-haul.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      { id: "ph-1-img", url: truck1, alt: "2020 Freightliner Cascadia", isPrimary: true, sortOrder: 0 },
    ],
  },
  {
    id: "ph-2",
    slug: "2019-volvo-vnl-760",
    title: "2019 Volvo VNL 760",
    make: "Volvo",
    model: "VNL 760",
    model_year: 2019,
    mileage: 520000,
    engine: "Volvo D13",
    transmission: "Automatic",
    vin: null,
    exterior_color: "Blue",
    interior_color: null,
    suspension: null,
    axles: "6x4",
    condition: "Used",
    warranty: null,
    weekly_rate: 780,
    monthly_rate: 2750,
    status: "available",
    short_description: "Fuel-efficient sleeper, ready for work.",
    description: "Comfortable sleeper with great MPG and uptime.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      { id: "ph-2-img", url: truck2, alt: "2019 Volvo VNL 760", isPrimary: true, sortOrder: 0 },
    ],
  },
  {
    id: "ph-3",
    slug: "2018-kenworth-t680",
    title: "2018 Kenworth T680",
    make: "Kenworth",
    model: "T680",
    model_year: 2018,
    mileage: 610000,
    engine: "Cummins X15",
    transmission: "Manual",
    vin: null,
    exterior_color: "Red",
    interior_color: null,
    suspension: null,
    axles: "6x4",
    condition: "Used",
    warranty: null,
    weekly_rate: 720,
    monthly_rate: 2600,
    status: "available",
    short_description: "Durable and dependable fleet favorite.",
    description: "Great pulling power and proven reliability.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      { id: "ph-3-img", url: truck3, alt: "2018 Kenworth T680", isPrimary: true, sortOrder: 0 },
    ],
  },
];

export default function OurTrucks() {
  const [selectedTruck, setSelectedTruck] = useState<TruckWithAssets | null>(null);
  const { data: trucks, isLoading: isLoadingTrucks, isError: isTrucksError } = useTrucks();
  const { session } = useSessionContext();

  usePageTitle("Our Trucks");

  const resolvedTrucks = trucks ?? [];

  // Source catalog (DB trucks or placeholders when DB is empty)
  const sourceTrucks: TruckWithAssets[] = (resolvedTrucks && resolvedTrucks.length > 0) ? resolvedTrucks : placeholderTrucks;

  // Search, filter, sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMake, setSelectedMake] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("relevance");

  // Options
  const makeOptions = Array.from(new Set(sourceTrucks.map(t => t.make).filter(Boolean))).sort();
  const yearOptions = Array.from(new Set(sourceTrucks.map(t => t.model_year).filter((y): y is number => Boolean(y)))).sort((a, b) => b - a);

  // Filtering
  const filteredTrucks = sourceTrucks.filter((t) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery = q.length === 0 || [t.title, t.make, t.model].some((v) => (v ?? "").toLowerCase().includes(q));
    const matchesMake = selectedMake === "all" || t.make === selectedMake;
    const matchesYear = selectedYear === "all" || String(t.model_year ?? "") === selectedYear;
    return matchesQuery && matchesMake && matchesYear;
  });

  // Sorting
  const displayTrucks = filteredTrucks.slice().sort((a, b) => {
    switch (sortOrder) {
      case "price_asc":
        return (a.weekly_rate ?? Infinity) - (b.weekly_rate ?? Infinity);
      case "price_desc":
        return (b.weekly_rate ?? -Infinity) - (a.weekly_rate ?? -Infinity);
      case "year_desc":
        return (b.model_year ?? 0) - (a.model_year ?? 0);
      case "mileage_asc":
        return (a.mileage ?? Infinity) - (b.mileage ?? Infinity);
      default:
        return 0;
    }
  });

  // Listing helpers
  const deriveListingType = (t: TruckWithAssets): "rental" | "sale" => {
    const status = (t.status ?? "").toLowerCase();
    if (status.includes("rent")) return "rental";
    if (status.includes("sale") || status.includes("sell") || status.includes("purchase")) return "sale";
    if (t.weekly_rate != null || t.monthly_rate != null) return "rental"; // default to rental if rates exist
    return "sale";
  };

  const formatCurrency = (value: number | null | undefined) => {
    if (value == null || Number.isNaN(value)) return null;
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  };

  const computeHourlyFromRates = (t: TruckWithAssets) => {
    if (t.weekly_rate != null) return t.weekly_rate / (7 * 24);
    if (t.monthly_rate != null) return t.monthly_rate / (30 * 24);
    return null;
  };

  const formatHourly = (t: TruckWithAssets) => {
    const hourly = computeHourlyFromRates(t);
    if (hourly == null) return null;
    return `${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(hourly)} / hr`;
  };

  // Brand chips (prefilters) - using local SVG logos
  const brandChips: Array<{ name: string; logo?: string | null }> = [
    { name: "All", logo: null },
    { name: "Freightliner", logo: "/trucks logo/freightliner-trucks.svg" },
    { name: "Volvo", logo: "/trucks logo/volvo-alt-svgrepo-com.svg" },
    { name: "Kenworth", logo: "/trucks logo/kenworth-1.svg" },
    { name: "Peterbilt", logo: "/trucks logo/peterbilt.svg" },
    { name: "Mack", logo: "/trucks logo/mack-trucks-1.svg" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Header Section - hidden for authenticated users */}
      {!session && (
        <section className={`bg-white pt-32 pb-20`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Find the right truck for you.
              </h1>
              <p className="mt-6 text-lg md:text-xl lg:text-2xl text-muted-foreground">
                Flexible payment, reliable trucks, ready for the road.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Trucks Grid */}
      <section className={`py-20 ${session ? "md:ml-64" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Brand Prefilter Chips */}
          <div className="mb-4 -mx-1 overflow-x-auto">
            <div className="flex items-center gap-2 px-1">
              {brandChips.map((b) => {
                const isAll = b.name === "All";
                const active = selectedMake === (isAll ? "all" : b.name);
                return (
                  <button
                    key={b.name}
                    type="button"
                    onClick={() => setSelectedMake(isAll ? "all" : b.name)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border transition-colors text-sm whitespace-nowrap min-h-11 ${
                      active ? "bg-yellow-400 text-black border-yellow-400" : "bg-white text-foreground border-border hover:bg-muted"
                    }`}
                    aria-pressed={active}
                    aria-label={`Filter by ${b.name}`}
                  >
                    {b.logo ? (
                      <img src={b.logo} alt={b.name} className="h-4 w-4 object-contain" />
                    ) : (
                      <Truck className="h-4 w-4" />
                    )}
                    <span>{b.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <Input
              placeholder="Search by name, make or model"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:max-w-sm"
            />
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <Select value={selectedMake} onValueChange={setSelectedMake}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All makes</SelectItem>
                  {makeOptions.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All years</SelectItem>
                  {yearOptions.map((y) => (
                    <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[190px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Sort: Relevance</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="year_desc">Newest Year</SelectItem>
                  <SelectItem value="mileage_asc">Mileage: Low to High</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedMake("all"); setSelectedYear("all"); setSortOrder("relevance"); }}>
                Clear
              </Button>
            </div>
          </div>

          {isLoadingTrucks ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : displayTrucks.length === 0 ? (
            <div className="text-center py-16 bg-muted/30 rounded-xl">
              <h3 className="text-2xl font-semibold text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground max-w-xl mx-auto">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {displayTrucks.map((truck) => {
                const heroImage = truck.images[0];
                return (
                  <div key={truck.id} className="group cursor-pointer" onClick={() => setSelectedTruck(truck)}>
                    {/* Modern Card with Border - Matches FeaturedTrucks */}
                    <div className="relative bg-white dark:bg-card rounded-xl border-2 border-border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl h-full flex flex-col">
                      
                      {/* Image Container - Fixed Aspect Ratio */}
                      <div className="relative w-full aspect-[4/3] bg-muted/30 overflow-hidden">
                        <img
                          src={heroImage?.url ?? truck1}
                          alt={heroImage?.alt ?? truck.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Status Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                            Available
                          </span>
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
                        {/* Title */}
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-2 line-clamp-1">
                          {truck.title}
                        </h3>

                        {/* Details */}
                        <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                          {[truck.make, truck.model, truck.model_year ?? undefined].filter(Boolean).join(" • ")}
                        </p>

                        {/* Pricing */}
                        <div className="mt-auto space-y-1">
                          {deriveListingType(truck) === "rental" ? (
                            <>
                              <p className="text-xs text-muted-foreground">Starting from</p>
                              <p className="text-lg sm:text-xl font-bold text-primary">
                                {formatCurrency(truck.weekly_rate)}
                                <span className="text-sm font-normal text-muted-foreground">/week</span>
                              </p>
                            </>
                          ) : (
                            <p className="text-lg sm:text-xl font-bold text-foreground">
                              {formatCurrency((truck as any)?.sale_price as number) ?? formatCurrency(truck.monthly_rate) ?? "Price on request"}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="p-4 pt-0 sm:p-5 sm:pt-0 md:p-6 md:pt-0 flex flex-col sm:flex-row gap-2">
                        <Button 
                          variant="secondary" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTruck(truck);
                          }} 
                          className="flex-1"
                        >
                          View details
                        </Button>
                        <Button className="btn-cta flex-1" asChild>
                          <Link to={session ? `/trucks/${truck.slug}/checkout?mode=${deriveListingType(truck)}` : `/auth?redirect=/trucks/${truck.slug}/checkout?mode=${deriveListingType(truck)}`}>
                            {deriveListingType(truck) === "rental" ? "Rent now" : "Buy now"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {!session && <Footer />}

      {selectedTruck && (
        <TruckDetailModal 
          truck={selectedTruck}
          onClose={() => setSelectedTruck(null)} 
        />
      )}
    </div>
  );
}
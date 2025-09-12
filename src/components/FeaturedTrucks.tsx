import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import TruckDetailModal from './TruckDetailModal'; // Assuming the new component is in the same directory

export interface Truck {
  id: string;
  model: string;
  subtitle: string;
  images: string[];
  description: string;
  features: { [key: string]: string };
  applications: string[];
}

const trucks: Truck[] = [
  {
    id: '1',
    model: 'Freightliner Cascadia',
    subtitle: 'Heavy-Duty Hauler',
    images: [
      '/src/assets/truck-1-1.jpg',
      '/src/assets/truck-1-2.jpg',
      '/src/assets/truck-1-3.jpg',
      '/src/assets/truck-1-4.jpg',
    ],
    description: 'The Freightliner Cascadia is the most advanced on-highway truck Freightliner has ever offered. Its robust design and fuel-efficient engineering make it a top choice for long-haul applications.',
    features: {
      'Engine': 'Detroit DD15 Gen 5',
      'Horsepower': '455-505 HP',
      'Transmission': 'Detroit DT12 On-Highway Series',
      'Sleeper': '72" Raised Roof',
    },
    applications: ['Long Haul', 'Regional Distribution', 'Bulk Hauling'],
  },
  {
    id: '2',
    model: 'Peterbilt 579',
    subtitle: 'Sleeper Cab',
    images: [
      '/src/assets/truck-2-1.jpg',
      '/src/assets/truck-2-2.jpg',
      '/src/assets/truck-2-3.jpg',
      '/src/assets/truck-2-4.jpg',
    ],
    description: 'Known for its aerodynamic design and superior fuel efficiency, the Peterbilt 579 is a driver-favorite. It offers a comfortable, spacious interior and a smooth, quiet ride.',
    features: {
      'Engine': 'PACCAR MX-13',
      'Horsepower': '405-510 HP',
      'Transmission': 'PACCAR TX-12 Automated',
      'Sleeper': '80" UltraLoft Sleeper',
    },
    applications: ['Temperature-Controlled', 'Tanker', 'General Freight'],
  },
  {
    id: '3',
    model: 'Kenworth T680',
    subtitle: 'Aerodynamic Efficiency',
    images: [
      '/src/assets/truck-3-1.jpg',
      '/src/assets/truck-3-2.jpg',
      '/src/assets/truck-3-3.jpg',
      '/src/assets/truck-3-4.jpg',
    ],
    description: 'The Kenworth T680 sets a high standard for aerodynamic performance and driver comfort. It\'s a reliable and efficient choice for a wide range of applications.',
    features: {
      'Engine': 'PACCAR MX-13',
      'Horsepower': '405-510 HP',
      'Transmission': 'PACCAR TX-18 Automated',
      'Sleeper': '76" High-Roof Sleeper',
    },
    applications: ['Flatbed', 'Intermodal', 'Less-Than-Truckload'],
  },
];

export default function FeaturedTrucks() {
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);

  return (
    <>
      <section id="trucks" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Our Featured Trucks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-16">
            {trucks.map((truck) => (
              <div key={truck.id} className="group cursor-pointer" onClick={() => setSelectedTruck(truck)}>
                <div className="relative bg-muted/50 rounded-lg p-4 md:p-8 mb-3 md:mb-4 aspect-[4/3] md:aspect-square flex items-center justify-center overflow-hidden">
                  <img
                    src={truck.images[0]} // Show the first image
                    alt={truck.model}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 h-8 w-8 md:h-10 md:w-10 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="h-4 w-4 md:h-6 md:w-6 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground">{truck.model}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{truck.subtitle}</p>
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
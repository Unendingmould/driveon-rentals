import React, { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import useEmblaCarousel from "embla-carousel-react";
import type { TruckWithAssets } from "@/types/driveon";
import truckPlaceholder from "@/assets/truck-1.jpg";

interface TruckDetailModalProps {
  truck: TruckWithAssets;
  onClose: () => void;
}

const DEFAULT_IMAGE = truckPlaceholder;

const TruckDetailModal: React.FC<TruckDetailModalProps> = ({ truck, onClose }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const modalContentRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key press or outside click
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Update carousel dot indicators
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div ref={modalContentRef} className="relative bg-white rounded-lg shadow-xl w-full max-w-6xl h-full max-h-[90vh] flex overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-yellow-400 rounded-full p-2 hover:bg-yellow-500 transition-colors"
        >
          <X className="h-6 w-6 text-black" />
        </button>

        {/* Left Column: Image Carousel */}
        <div className="w-1/2 bg-slate-100 p-8 flex flex-col justify-center">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {(truck.images.length > 0 ? truck.images : [{ id: "fallback", url: DEFAULT_IMAGE, alt: truck.title, isPrimary: true, sortOrder: 0 }]).map((image, index) => (
                <div className="flex-[0_0_100%] aspect-square" key={image.id ?? index}>
                  <img
                    src={image.url ?? DEFAULT_IMAGE}
                    alt={image.alt ?? `${truck.title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {(truck.images.length > 0 ? truck.images : [{ id: "fallback" } as const]).map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-3 w-3 rounded-full transition-colors ${selectedIndex === index ? 'bg-black' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Scrollable Content */}
        <div className="w-1/2 p-12 overflow-y-auto">
          <h2 className="text-4xl font-bold mb-2">{truck.title}</h2>
          <p className="text-muted-foreground mb-8">
            {[truck.make, truck.model, truck.model_year ? `(${truck.model_year})` : null]
              .filter(Boolean)
              .join(" • ") || truck.short_description}
          </p>

          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Product description</h3>
              <p>{truck.description ?? truck.short_description ?? "Detailed description coming soon."}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Features</h3>
              <div className="space-y-3">
                {[
                  { key: "Make", value: truck.make },
                  { key: "Model", value: truck.model },
                  { key: "Year", value: truck.model_year },
                  { key: "Mileage", value: truck.mileage ? `${truck.mileage.toLocaleString()} miles` : null },
                  { key: "Engine", value: truck.engine },
                  { key: "Transmission", value: truck.transmission },
                  { key: "VIN", value: truck.vin },
                  { key: "Condition", value: truck.condition },
                  { key: "Warranty", value: truck.warranty },
                  { key: "Weekly Rate", value: truck.weekly_rate ? `$${Number(truck.weekly_rate).toLocaleString()}` : null },
                  { key: "Monthly Rate", value: truck.monthly_rate ? `$${Number(truck.monthly_rate).toLocaleString()}` : null },
                  { key: "Axles", value: truck.axles },
                  { key: "Suspension", value: truck.suspension },
                  { key: "Exterior", value: truck.exterior_color },
                  { key: "Interior", value: truck.interior_color },
                ]
                  .filter((item) => item.value)
                  .map((item) => (
                    <div key={item.key} className="flex justify-between border-b pb-3">
                      <span className="text-gray-500">{item.key}</span>
                      <span className="font-medium text-black">{item.value}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Applications</h3>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  const derivedTags = truck.images
                    .map((image) => image.alt)
                    .filter((value): value is string => Boolean(value));
                  return derivedTags.length > 0 ? derivedTags : ["Heavy-duty", "Long Haul", "Reliable"];
                })().map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckDetailModal;
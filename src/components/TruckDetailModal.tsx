import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Truck } from './FeaturedTrucks';

interface TruckDetailModalProps {
  truck: Truck;
  onClose: () => void;
}

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
              {truck.images.map((src, index) => (
                <div className="flex-[0_0_100%] aspect-square" key={index}>
                  <img src={src} alt={`${truck.model} view ${index + 1}`} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {truck.images.map((_, index) => (
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
          <h2 className="text-4xl font-bold mb-4">{truck.model}</h2>
          
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Product description</h3>
              <p>{truck.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Features</h3>
              <div className="space-y-3">
                {Object.entries(truck.features).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-3">
                    <span className="text-gray-500">{key}</span>
                    <span className="font-medium text-black">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Applications</h3>
              <div className="flex flex-wrap gap-2">
                {truck.applications.map((app) => (
                  <span key={app} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {app}
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
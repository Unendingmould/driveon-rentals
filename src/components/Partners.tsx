import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const logos = [
  { name: "Freightliner", logo: "/trucks logo/freightliner-trucks.svg" },
  { name: "Volvo", logo: "/trucks logo/volvo-alt-svgrepo-com.svg" },
  { name: "Peterbilt", logo: "/trucks logo/peterbilt.svg" },
  { name: "Kenworth", logo: "/trucks logo/kenworth-1.svg" },
  { name: "Mack", logo: "/trucks logo/mack-trucks-1.svg" },
];

export default function Partners() {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Our solutions are all made possible by our partners.
          </h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent>
            {logos.map((logo, index) => (
              <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
                <div className="p-4">
                  <div className="flex justify-center items-center p-6 bg-white dark:bg-card border border-border rounded-lg h-24 hover:shadow-md transition-shadow">
                    <img
                      src={logo.logo}
                      alt={`${logo.name} trucks`}
                      className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

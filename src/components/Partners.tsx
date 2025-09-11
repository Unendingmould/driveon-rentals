import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const logos = [
  { name: "Freightliner" },
  { name: "Volvo" },
  { name: "Peterbilt" },
  { name: "Kenworth" },
  { name: "Mack" },
  { name: "International" },
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
              <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/6">
                <div className="p-4">
                  <div className="flex justify-center items-center p-6 bg-muted/30 rounded-lg h-28">
                    <span className="text-muted-foreground font-bold text-center text-lg">{logo.name}</span>
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

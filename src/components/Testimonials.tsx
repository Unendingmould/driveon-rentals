import { Quote, Star } from "lucide-react";

const hardcodedTestimonials = [
  {
    id: "1",
    quote: "TrucksOnFlex made it easy to get back on the road when my truck broke down. Their rental process is straightforward and the trucks are well-maintained.",
    author_name: "Marcus Johnson",
    author_role: "Owner Operator",
    location: "Atlanta, GA",
    rating: 5
  },
  {
    id: "2",
    quote: "We've been using TrucksOnFlex for seasonal demand and it's been a game changer. The flexibility and quality of their fleet keeps our business moving.",
    author_name: "Sarah Williams",
    author_role: "Fleet Manager",
    location: "Dallas, TX",
    rating: 5
  },
  {
    id: "3",
    quote: "Great service and reliable trucks. The team at TrucksOnFlex understands the trucking business and makes the rental process hassle-free.",
    author_name: "David Chen",
    author_role: "Independent Trucker",
    location: "Los Angeles, CA",
    rating: 5
  }
];

const Testimonials = () => {

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by drivers and fleet owners using TrucksOnFlex to stay on the road.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {hardcodedTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`card-gradient border border-border rounded-lg p-8 relative fade-in-up animation-delay-${index * 100}`}
            >
              <Quote className="text-primary w-8 h-8 mb-6" />
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.author_name}</p>
                <p className="text-sm text-muted-foreground">
                  {[testimonial.author_role, testimonial.location].filter(Boolean).join(" • ")}
                </p>
                {typeof testimonial.rating === "number" && testimonial.rating > 0 && (
                  <div className="mt-3 flex items-center gap-1 text-primary">
                    {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                      <Star key={starIndex} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
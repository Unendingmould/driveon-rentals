import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "I never thought I could own a truck with flexible payment. This platform made it possible for me to start my transport business.",
    name: "Emeka O.",
    role: "Logistics Business Owner"
  },
  {
    quote: "The process was smooth and transparent. Within weeks, I was already driving my truck on the road.",
    name: "Aisha M.",
    role: "Independent Driver"
  },
  {
    quote: "Customer service was excellent — they guided me step by step until I got my truck.",
    name: "John K.",
    role: "Fleet Manager"
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
            Trusted by truck drivers and businesses across Nigeria.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`card-gradient border border-border rounded-lg p-8 relative fade-in-up animation-delay-${index * 200}`}
            >
              <Quote className="text-primary w-8 h-8 mb-6" />
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
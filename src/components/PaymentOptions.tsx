import { Button } from "@/components/ui/button";
import { MessageCircle, Smartphone, Bitcoin } from "lucide-react";

export default function PaymentOptions() {
  const paymentMethods = [
    { name: "Cash App", icon: <Smartphone className="w-16 h-16" fill="currentColor" /> },
    { name: "Bitcoin", icon: <Bitcoin className="w-16 h-16" fill="currentColor" /> }
  ];

  const openWhatsApp = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    <section className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Flexible Payment Methods
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Choose the option that works best for you – we accept Cash App and Bitcoin.
          </p>
          
          {/* Payment Method Icons */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {paymentMethods.map((method, index) => (
              <div 
                key={method.name}
                className="flex flex-col items-center gap-3 hover-lift fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 card-gradient rounded-2xl flex items-center justify-center text-primary">
                  {method.icon}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {method.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Support */}
        <div className="text-center">
          <Button 
            onClick={openWhatsApp}
            variant="outline"
            className="btn-secondary text-lg px-8 py-4 inline-flex items-center gap-3"
          >
            <MessageCircle className="w-6 h-6 text-primary" />
            Need help? Chat with us now
          </Button>
        </div>
      </div>
    </section>
  );
}
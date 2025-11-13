import { Button } from "@/components/ui/button";
import { MessageCircle, Bitcoin, Smartphone, Zap } from "lucide-react";

const hardcodedPaymentOptions = [
  {
    id: "1",
    name: "Crypto",
    description: "Pay with Bitcoin, Ethereum, or other cryptocurrencies",
    icon: "bitcoin"
  },
  {
    id: "2",
    name: "Cash App",
    description: "Quick and easy mobile payments",
    icon: "cashapp"
  },
  {
    id: "3",
    name: "Zelle",
    description: "Fast bank-to-bank transfers",
    icon: "zelle"
  }
];

const iconMap: Record<string, JSX.Element> = {
  bitcoin: <Bitcoin className="w-10 h-10" />,
  cashapp: <Smartphone className="w-10 h-10" />,
  zelle: <Zap className="w-10 h-10" />,
};

function resolveIcon(key: string) {
  return iconMap[key.toLowerCase()] ?? <Smartphone className="w-10 h-10" />;
}

export default function PaymentOptions() {

  const openWhatsApp = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-foreground">
            Flexible Payment Solutions
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            We accept multiple payment methods for your convenience
          </p>
        </div>

        {/* Payment Cards - Clean Layout Without CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {hardcodedPaymentOptions.map((option) => (
            <div 
              key={option.id} 
              className="group relative bg-white dark:bg-card rounded-2xl border-2 border-border p-6 sm:p-8 transition-all duration-300 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-5 sm:mb-6 transition-transform group-hover:scale-110 duration-300">
                {resolveIcon(option.icon)}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  {option.name}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section - Subtle */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Questions about payment methods?
          </p>
          <Button
            onClick={openWhatsApp}
            variant="outline"
            size="lg"
            className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
}
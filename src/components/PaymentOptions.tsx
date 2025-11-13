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
    <section className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Flexible Payment Methods
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Choose the payment channel that fits your business. We support digital wallets, crypto, and traditional options.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hardcodedPaymentOptions.map((option) => (
              <div key={option.id} className="card-gradient rounded-2xl p-6 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-3xl border-2 border-primary/20 text-primary flex items-center justify-center mb-6">
                  {resolveIcon(option.icon)}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{option.name}</h3>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{option.description}</p>
              </div>
            ))}
          </div>
        </div>

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
import MinimalNavigation from "@/components/MinimalNavigation";
import MinimalHero from "@/components/MinimalHero";
import TruckSolutions from "@/components/TruckSolutions";
import HowWeHelp from "@/components/HowWeHelp";
import TruckShowcase from "@/components/TruckShowcase";

const Index = () => {
  return (
    <div className="min-h-screen">
      <MinimalNavigation />
      <MinimalHero />
      <TruckSolutions />
      <HowWeHelp />
      <TruckShowcase />
    </div>
  );
};

export default Index;

import { useState, useEffect, useRef } from 'react';
import truck1 from '@/assets/truck-1-1.jpg';
import truck2 from '@/assets/truck-1-2.jpg';
import truck3 from '@/assets/truck-1-3.jpg';

const steps = [
  {
    title: 'Pick Your Truck',
    description: 'Browse our wide selection of top-quality trucks. We have models for every need, from heavy-duty haulers to nimble city movers. Detailed specifications and photos are available for each vehicle to help you make an informed choice.',
    image: truck1,
  },
  {
    title: 'Choose Your Plan',
    description: 'We offer flexible rental plans to suit your schedule and budget. Choose from weekly, monthly, or even quarterly options. Our team is here to help you find the perfect plan for your needs.',
    image: truck2,
  },
  {
    title: 'Start Driving',
    description: 'Once you\'ve selected your truck and plan, you\'re ready to go! Simply pay the deposit, pick up your keys, and hit the road. It\'s that easy to get started with TrucksOnFlex.',
    image: truck3,
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<any>();

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsPaused(true);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    // Optional: Resume after a delay
    setTimeout(() => {
      setIsPaused(false);
    }, 10000); // Pause for 10 seconds on manual interaction
  };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = window.setInterval(() => {
        setActiveStep((prevStep) => (prevStep + 1) % steps.length);
      }, 6000);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            How To Get Your Truck
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] overflow-hidden rounded-lg">
            {steps.map((step, index) => (
              <img
                key={index}
                src={step.image}
                alt={step.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${activeStep === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              />
            ))}
          </div>

          <div className="flex flex-col justify-center h-full">
            <div className="space-y-8 mb-12">
              {steps.map((step, index) => (
                <div key={index} className="cursor-pointer" onClick={() => handleStepClick(index)}>
                  <div className="relative inline-block">
                    <h3 className={`text-4xl font-bold transition-colors duration-300 ${activeStep === index ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                      {step.title}
                    </h3>
                    {activeStep === index && (
                      <div className="absolute bottom-[-10px] left-0 w-full h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
                        <div 
                          key={activeStep} // Re-triggers the animation when the step changes
                          className="h-1 bg-primary animate-fill-progress"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-lg text-muted-foreground min-h-[150px]">
                {steps[activeStep].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
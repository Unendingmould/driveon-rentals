import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    id: "1",
    question: "What are your rental terms?",
    answer: "We offer flexible rental terms starting from weekly rentals up to long-term monthly agreements. All rentals include basic maintenance coverage and roadside assistance. You can choose from weekly, monthly, or quarterly payment plans based on your needs. Early termination options are available with notice."
  },
  {
    id: "2",
    question: "Do you offer purchase financing?",
    answer: "Yes! We partner with multiple lenders to offer competitive financing options for truck purchases. Our financing application is simple and can be completed online in minutes. We work with various credit profiles and offer flexible down payment options. Approval typically takes 24-48 hours."
  },
  {
    id: "3",
    question: "What is included in the rental?",
    answer: "Our rentals include the truck, basic insurance coverage, routine maintenance, and 24/7 roadside assistance. You're responsible for fuel, tolls, and any damage beyond normal wear and tear. We also provide GPS tracking and fleet management tools at no extra cost."
  },
  {
    id: "4",
    question: "How do I qualify for a rental?",
    answer: "To qualify, you need a valid Commercial Driver's License (CDL), a clean driving record from the past 3 years, and proof of insurance. We also require a security deposit equal to one week's rent. For businesses, we'll need your EIN and business license. No credit checks required for rentals!"
  },
  {
    id: "5",
    question: "What happens if the truck breaks down?",
    answer: "We provide 24/7 roadside assistance and emergency support. If there's a mechanical failure that's not due to driver error, we'll arrange for repairs or provide a replacement truck at no additional cost. Most repairs are completed within 24 hours."
  },
  {
    id: "6",
    question: "Can I rent trucks for my fleet?",
    answer: "Absolutely! We specialize in fleet solutions for small to large businesses. We offer volume discounts, dedicated account management, and flexible terms for multiple trucks. Contact our fleet sales team for a customized package that fits your business needs."
  },
  {
    id: "7",
    question: "What is your rent-to-own program?",
    answer: "Our rent-to-own program allows you to apply a portion of your rental payments toward purchasing the truck. Typically, 50-70% of your rental payments go toward the purchase price. You can transition to ownership anytime after 6 months of consistent payments."
  },
  {
    id: "8",
    question: "Do you operate in Canada and the UK?",
    answer: "Yes! We have operations across the USA, Canada, and the UK. Our fleet is available in major cities and transportation hubs in all three countries. International cross-border rentals are available with proper documentation and insurance."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Get answers to common questions about our truck rental and rent-to-own services.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto space-y-4">
          {FAQS.map((faq, index) => (
            <AccordionItem key={faq.id} value={`faq-${faq.id}`} className="border-b">
              <AccordionTrigger noChevron className="flex justify-between items-center w-full py-6 text-left font-semibold text-foreground hover:no-underline group">
                <div className="flex items-center">
                  <span className="text-lg text-muted-foreground mr-8">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-lg">{faq.question}</span>
                </div>
                <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center transform transition-transform duration-300 group-data-[state=open]:rotate-45">
                  <Plus className="h-6 w-6 text-primary-foreground" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 pl-16">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

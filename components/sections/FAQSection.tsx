import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can we bring outside food?",
    answer: "Outside food and beverages are not allowed inside the park. We offer a variety of dining options to suit all tastes and dietary requirements.",
  },
  {
    question: "Is parking available at park?",
    answer: "Yes, we have ample parking space available. Standard parking is included with your admission ticket.",
  },
  {
    question: "Are mobile tickets allowed?",
    answer: "Yes, we accept mobile tickets. Simply show your ticket QR code at the entrance for quick and easy access.",
  },
];

export function FAQSection() {
  return (
    <section className="mx-[5%]">
      <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
} 
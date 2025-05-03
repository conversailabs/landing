import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import '@/app/globalsB.css'

const FaqSection = () => {
  const faqs = [
    {
      question: "What is ConversAILabs?",
      answer: "ConversAILabs is a pioneering platform that empowers businesses to create sophisticated AI-powered voice agents without any technical expertise. Our technology analyzes your existing communication patterns and business content to build voice agents that authentically represent your brand for both inbound customer service and outbound engagement campaigns."
    },
    {
      question: "How does the ConversAILabs platform work?",
      answer: "Our process is simple yet powerful. Upload a few customer interaction samples (calls, chats, emails), provide your website URL, or share your knowledge base documents. Our AI system analyzes these inputs to create voice agents that mirror your unique communication style, business knowledge, and problem-solving approach. You can then customize conversation flows through our intuitive dashboard to meet your specific business needs."
    },
    {
      question: "What specific use cases can ConversAILabs voice agents handle?",
      answer: "Our voice agents excel across numerous business functions including: automated appointment scheduling and reminders, intelligent lead qualification and nurturing, 24/7 customer support and troubleshooting, real-time order status updates, automated payment reminders and collections, post-service satisfaction surveys, and personalized outreach campaigns. We serve diverse industries such as healthcare, retail, financial services, education, hospitality, and professional services."
    },
    {
      question: "What is the pricing structure for ConversAILabs services?",
      answer: "ConversAILabs offers tiered pricing plans designed to scale with your business needs. Our plans typically include a base subscription plus usage-based components (call minutes, agent instances). We provide solutions for businesses of all sizes, from small operations to enterprise organizations. For a customized quote that aligns with your specific requirements, please contact our sales team who can demonstrate the ROI our platform delivers."
    },
    {
      question: "How accurate and natural are ConversAILabs voice agents?",
      answer: "Our voice agents leverage cutting-edge natural language processing and voice synthesis to deliver remarkably human-like interactions. With advanced context awareness, our agents understand nuanced requests, maintain conversation continuity, and adapt their tone to match emotional cues. The result is conversations that flow naturally, with 95%+ accuracy in understanding customer intents across various accents and speaking styles."
    }
  ];

  // Function to handle the Contact Support button click
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Check if the Footer has exposed the openFooterContact method
    if (typeof window.openFooterContact === 'function') {
      // Call the method exposed by the Footer component
      window.openFooterContact();
    } else {
      // Fallback: Manually click the contact link in the footer
      const footerContactLink = document.getElementById('footer-contact-link');
      if (footerContactLink) {
        footerContactLink.click();
      }
      
      // Scroll to footer
      const footer = document.querySelector('footer');
      if (footer) {
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
        const scrollPosition = footer.offsetTop - navbarHeight - 2;
        
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get answers to common questions about our AI voice technology
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto animate-fade-in-up animation-delay-100">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-left font-medium py-4 hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-10 animate-fade-in-up animation-delay-200">
          <p className="text-muted-foreground mb-6">
            Have more questions? We're here to help!
          </p>
          <a href="#" onClick={handleContactClick}>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary font-medium py-2 px-6 rounded-md transition-colors">
              Contact Support
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
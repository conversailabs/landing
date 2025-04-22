'use client';

import React from 'react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';

const FaqSection = () => {
  const faqs = [
    {
      question: 'What is ConversAILabs?',
      answer:
    'ConversAILabs is a pioneering platform that empowers businesses to create sophisticated AI-powered voice agents without any technical expertise. Our technology analyzes your existing communication patterns and business content to build voice agents that authentically represent your brand for both inbound customer service and outbound engagement campaigns.',
},
{
  question: 'How does the ConversAILabs platform work?',
  answer:
    'Our process is simple yet powerful. Upload a few customer interaction samples (calls, chats, emails), provide your website URL, or share your knowledge base documents. Our AI system analyzes these inputs to create voice agents that mirror your unique communication style, business knowledge, and problem-solving approach. You can then customize conversation flows through our intuitive dashboard to meet your specific business needs.',
},
{
  question: 'What specific use cases can ConversAILabs voice agents handle?',
  answer:
    'Our voice agents excel across numerous business functions including: automated appointment scheduling and reminders, intelligent lead qualification and nurturing, 24/7 customer support and troubleshooting, real-time order status updates, automated payment reminders and collections, post-service satisfaction surveys, and personalized outreach campaigns. We serve diverse industries such as healthcare, retail, financial services, education, hospitality, and professional services.',
},
{
  question: 'What is the pricing structure for ConversAILabs services?',
  answer:
    'ConversAILabs offers tiered pricing plans designed to scale with your business needs. Our plans typically include a base subscription plus usage-based components (call minutes, agent instances). We provide solutions for businesses of all sizes, from small operations to enterprise organizations. For a customized quote that aligns with your specific requirements, please contact our sales team who can demonstrate the ROI our platform delivers.',
},
{
  question: 'How accurate and natural are ConversAILabs voice agents?',
  answer:
    'Our voice agents leverage cutting-edge natural language processing and voice synthesis to deliver remarkably human-like interactions. With advanced context awareness, our agents understand nuanced requests, maintain conversation continuity, and adapt their tone to match emotional cues. The result is conversations that flow naturally, with 95%+ accuracy in understanding customer intents across various accents and speaking styles.',
    },
    
  ];
  return (
    <div id="faq" className="py-16 bg-background rounded-lg border border-gray-200" style={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="bg-white rounded-lg border border-gray-100 overflow-hidden"
                style={{ boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.08)', transition: 'box-shadow 0.3s ease' }}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.12)'}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.08)'}
              >
                <AccordionTrigger className="font-medium text-lg px-6 py-4 text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600 px-6 pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
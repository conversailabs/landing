import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Describe Your Call Flow",
      description: "Tell us what questions you commonly get and how you'd like them answered. No technical skills required.",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-primary"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    },
    {
      number: "02",
      title: "Upload Scripts or FAQs",
      description: "Upload existing call scripts, FAQs, or let our team help you create them from scratch.",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-primary"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="18" x2="12" y2="12"></line>
          <line x1="9" y1="15" x2="15" y2="15"></line>
        </svg>
      )
    },
    {
      number: "03",
      title: "Forward Your Number",
      description: "Forward your business line to our AI during specific hours or for specific call types. We handle the rest.",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-primary"
        >
          <polyline points="16 3 21 3 21 8"></polyline>
          <line x1="4" y1="20" x2="21" y2="3"></line>
          <path d="M21 16v5h-5"></path>
          <line x1="15" y1="15" x2="21" y2="21"></line>
          <path d="M4 4v7a4 4 0 0 0 4 4h11"></path>
        </svg>
      )
    }
  ];
  
  return (
    <section id="how-it-works" className="py-20 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mb-48"></div>
      
      <div className="container px-6 sm:px-8 lg:px-10 mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">Ready in <span className="text-primary">15 Minutes</span></h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started with ConversAI is quick and painless. Our team helps you every step of the way.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative">
          {/* Connection line (desktop only) */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 hidden md:block"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative animate-fade-in-up" style={{ animationDelay: `${0.2 * (index + 1)}s` }}>
              {/* Step card */}
              <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow h-full hover:border-primary/30 group">
                <CardContent className="pt-10 pb-8 px-8 flex flex-col h-full">
                  {/* Numbered circle */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md z-10 group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  
                  <div className="text-center mb-6 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground text-center flex-grow">{step.description}</p>
                  
                  {/* Bottom accent line */}
                  <div className="w-16 h-1 bg-primary/40 mx-auto mt-6 group-hover:w-24 transition-all duration-300"></div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
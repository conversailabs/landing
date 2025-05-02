import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ProofSection: React.FC = () => {
  const metrics = [
    {
      value: "2.1M+",
      label: "Minutes Handled",
      description: "Our AI has engaged in over 2.1 million minutes of conversation with prospects."
    },
    {
      value: "98%",
      label: "Natural-Language Match",
      description: "Prospects can't tell they're talking to an AI assistant."
    },
    {
      value: "4.8/5",
      label: "Caller Satisfaction",
      description: "Average rating given by callers after interacting with our AI."
    }
  ];
  
  const testimonials = [
    {
      quote: "ConversAI has transformed our lead capture process. We're booking 35% more demos without adding any staff. The ROI was positive within the first month.",
      author: "Sarah Johnson",
      title: "Founder, SalesOptimize SaaS"
    },
    {
      quote: "Our dental practices were missing calls after hours and during busy periods. Now we capture every opportunity and patients love being able to schedule immediately.",
      author: "Dr. Michael Chen",
      title: "CEO, Bright Smile Dental Group"
    }
  ];
  
  return (
    <section id="proof" className="py-20 bg-accent relative">
      <div className="container px-6 sm:px-8 lg:px-10 mx-auto max-w-6xl">
        <div className="text-center mb-14 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">Proof It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The numbers speak for themselves. Here's what our AI has accomplished:
          </p>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="stats-item text-center animate-fade-in-up p-6 bg-white/50 rounded-xl shadow-sm hover:shadow-md transition-all" 
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3 animate-pulse-soft">{metric.value}</div>
              <h3 className="text-lg font-medium mb-3">{metric.label}</h3>
              <p className="text-muted-foreground">{metric.description}</p>
            </div>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up" 
              style={{ animationDelay: `${0.3 * (index + 1)}s` }}
            >
              <CardContent className="p-0">
                <div className="bg-white p-7 relative">
                  {/* Quote mark */}
                  <div className="absolute top-5 right-5 text-6xl leading-none text-primary/10 font-serif">
                    "
                  </div>
                  
                  <p className="text-lg mb-6 relative z-10 leading-relaxed">{testimonial.quote}</p>
                  
                  <div className="mt-4">
                    <h4 className="text-lg font-medium">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{testimonial.title}</p>
                  </div>
                </div>
                <div className="h-2 bg-gradient-to-r from-primary to-violet-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
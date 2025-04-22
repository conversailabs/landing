'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

const AboutUsPage = () => {
  return (
    <section 
      id="about" 
      className="py-16 bg-accent text-center"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-foreground">About Us</h1>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Welcome to ConversAILabs! We're a team of AI and voice technology experts dedicated to transforming 
            how businesses handle customer communications. Our AI-powered voice agents automate 
            conversations while maintaining the human touch your customers expect.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-accent/10 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To make AI voice technology accessible to businesses of all sizes, enabling 
                effortless, natural customer interactions without technical expertise.
              </p>
            </div>
            
            <div className="bg-accent/10 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Our Technology</h3>
              <p className="text-muted-foreground">
                We combine advanced natural language processing, voice synthesis, and machine learning 
                to create voice agents that sound natural and understand context.
              </p>
            </div>
            
            <div className="bg-accent/10 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Our Commitment</h3>
              <p className="text-muted-foreground">
                We're committed to helping businesses save time and resources while improving customer 
                satisfaction through intelligent, conversational AI voice solutions.
              </p>
            </div>
          </div>
          
         
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
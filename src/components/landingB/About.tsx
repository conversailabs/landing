import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import '@/app/globalsB.css'

const AboutUsPage: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-24 bg-accent relative overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 opacity-70"></div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/10 rounded-full -ml-32 filter blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-purple-200/30 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-200/20 rounded-full filter blur-2xl"></div>
      
      <div className="container px-6 sm:px-8 mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">About <span className="text-primary">ConversAILabs</span></h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're a team of AI and voice technology experts dedicated to
            transforming how businesses handle customer communications.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {/* Vision Card */}
          <Card className="hover-card bg-white/60 backdrop-blur-sm animate-fade-in-up animation-delay-100 border border-primary/10 hover:border-primary/30 transition-colors group">
            <CardContent className="pt-8 pb-8 px-6">
              <div className="mb-6 p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-primary"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-primary transition-colors">Our Vision</h3>
              <p className="text-muted-foreground text-center">
                To make AI voice technology accessible to businesses of all sizes, enabling
                effortless, natural customer interactions without technical expertise.
              </p>
              
              {/* Bottom accent line */}
              <div className="w-16 h-1 bg-primary/40 mx-auto mt-6 group-hover:w-24 transition-all duration-300"></div>
            </CardContent>
          </Card>
          
          {/* Technology Card */}
          <Card className="hover-card bg-white/60 backdrop-blur-sm animate-fade-in-up animation-delay-200 border border-primary/10 hover:border-primary/30 transition-colors group">
            <CardContent className="pt-8 pb-8 px-6">
              <div className="mb-6 p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-primary"
                >
                  <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
                  <line x1="8" x2="8" y1="16" y2="16" />
                  <line x1="8" x2="8" y1="20" y2="20" />
                  <line x1="12" x2="12" y1="18" y2="18" />
                  <line x1="12" x2="12" y1="22" y2="22" />
                  <line x1="16" x2="16" y1="16" y2="16" />
                  <line x1="16" x2="16" y1="20" y2="20" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-primary transition-colors">Our Technology</h3>
              <p className="text-muted-foreground text-center">
                We combine advanced natural language processing, voice synthesis, and machine
                learning to create voice agents that sound natural and understand context.
              </p>
              
              {/* Bottom accent line */}
              <div className="w-16 h-1 bg-primary/40 mx-auto mt-6 group-hover:w-24 transition-all duration-300"></div>
            </CardContent>
          </Card>
          
          {/* Commitment Card */}
          <Card className="hover-card bg-white/60 backdrop-blur-sm animate-fade-in-up animation-delay-300 border border-primary/10 hover:border-primary/30 transition-colors group">
            <CardContent className="pt-8 pb-8 px-6">
              <div className="mb-6 p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-primary"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-primary transition-colors">Our Commitment</h3>
              <p className="text-muted-foreground text-center">
                We're committed to helping businesses save time and resources while improving
                customer satisfaction through intelligent, conversational AI voice solutions.
              </p>
              
              {/* Bottom accent line */}
              <div className="w-16 h-1 bg-primary/40 mx-auto mt-6 group-hover:w-24 transition-all duration-300"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
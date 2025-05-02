import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from 'lucide-react';
import '@/app/globalsB.css'

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      pain: "Missed calls cost deals",
      solution: "AI picks up in < 1 ring, nurtures the lead",
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
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )
    },
    {
      pain: "Reps waste hours qualifying",
      solution: "Adaptive scripts score prospects in real time",
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
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          <path d="M9 12h6"></path>
          <path d="M9 16h6"></path>
        </svg>
      )
    },
    {
      pain: "Manual scheduling chaos",
      solution: "Direct calendar sync—no back-and-forth",
      icon: (
        <Calendar className="text-primary" />
      )
    }
  ];
  
  return (
    <section id="benefits" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Owners Love <span className="text-primary">ConversAI Labs</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI solution handles the heavy lifting so you can focus on what matters most—growing your business.
          </p>
        </div>
        
        <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
          <Table className="border border-border/50 shadow-sm">
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-1/12"></TableHead>
                <TableHead className="text-lg text-foreground font-bold">Pain You Feel</TableHead>
                <TableHead className="text-lg text-foreground font-bold">How We Fix It</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {benefits.map((benefit, index) => (
                <TableRow 
                  key={index}
                  className="transition-colors hover:bg-accent"
                  style={{ animationDelay: `${0.2 * (index + 1)}s` }}
                >
                  <TableCell className="text-center">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors mx-auto">
                      {benefit.icon}
                    </div>
                  </TableCell>
                  <TableCell className="text-base font-medium">{benefit.pain}</TableCell>
                  <TableCell className="text-base text-muted-foreground">{benefit.solution}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-10 text-center">
            <p className="text-muted-foreground italic">
              "Our AI never sleeps, never misses a call, and handles the repetitive work 
              so your team can focus on closing deals."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
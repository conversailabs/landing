'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PricingFeatureProps {
  text: string;
}

const PricingFeature: React.FC<PricingFeatureProps> = ({ text }) => (
  <li className="flex items-start">
    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
    <span className="ml-2 text-muted-foreground text-sm">{text}</span>
  </li>
);

export interface PlanInfo {
  id: string;
  name: string;
  price: number;
  isAnnual: boolean;
}

const PricingSection: React.FC = () => {
  const [annualBilling, setAnnualBilling] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Calculate time remaining until May 1st
  const calculateTimeRemaining = () => {
    const now = new Date();
    const deadline = new Date(2025, 4, 1); // May is month 4 (0-indexed)
    const difference = deadline.getTime() - now.getTime();
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return days;
  };

  const daysRemaining = calculateTimeRemaining();

  // Handle clicks outside of pricing cards
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sectionRef.current) {
        const cards = sectionRef.current.querySelectorAll('.pricing-card');
        let clickedInsideCard = false;
        
        cards.forEach(card => {
          if (card.contains(event.target as Node)) {
            clickedInsideCard = true;
          }
        });
        
        if (!clickedInsideCard) {
          setSelectedPlan(null);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calculate prices based on billing cycle
  const starterPrice = annualBilling ? 99 : Math.round(99 * 1.2);
  const professionalPrice = annualBilling ? 199 : Math.round(199 * 1.2);

  // Handle plan selection and navigation to waitlist
  const handleGetStarted = (planIndex: number) => {
    let planInfo: PlanInfo;

    switch (planIndex) {
      case 0:
        planInfo = {
          id: 'starter',
          name: 'Starter Plan',
          price: starterPrice,
          isAnnual: annualBilling
        };
        break;
      case 1:
        planInfo = {
          id: 'professional',
          name: 'Professional Plan',
          price: professionalPrice,
          isAnnual: annualBilling
        };
        break;
      case 2:
        planInfo = {
          id: 'enterprise',
          name: 'Enterprise Plan',
          price: 0, // Custom pricing
          isAnnual: annualBilling
        };
        break;
      default:
        planInfo = {
          id: 'starter',
          name: 'Starter Plan',
          price: starterPrice,
          isAnnual: annualBilling
        };
    }

    // Store selected plan in localStorage
    localStorage.setItem('selectedPlan', JSON.stringify(planInfo));
    
    // Navigate to waitlist section
    window.location.href = '#waitlist';
  };

  return (
    <section id="pricing" className="py-12 bg-accent w-full" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Pricing Plans</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that best fits your business needs
          </p>
          
          <div className="flex items-center justify-center mt-4 mb-6 space-x-3">
            <span className={`text-sm font-medium ${!annualBilling ? 'text-primary' : 'text-muted-foreground'}`}>Monthly</span>
            <Switch
              checked={annualBilling}
              onCheckedChange={setAnnualBilling}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-sm font-medium flex items-center ${annualBilling ? 'text-primary' : 'text-muted-foreground'}`}>
              Annual 
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">20% savings</Badge>
            </span>
          </div>
          
          {/* Launch Special Banner */}
          <div className="bg-primary/10 border border-primary/20 p-4 mb-6 w-full max-w-3xl mx-auto rounded-lg">
            <p className="text-center text-primary font-medium">
              <span className="font-bold">Launch Special:</span> Get the Starter Plan for <span className="font-bold">$69/month</span> for your first 3 months. Ends May 1st.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mx-auto">
          {/* Starter Plan */}
          <Card 
            className={`pricing-card relative h-full flex flex-col ${
              selectedPlan === 0 
                ? 'ring-2 ring-primary' 
                : 'hover:border-primary/50 transition-colors'
            }`}
            onClick={() => setSelectedPlan(0)}
          >
            <CardHeader>
              <CardTitle>Starter Plan</CardTitle>
              <CardDescription>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">
                    ${starterPrice}
                  </span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <Badge className="mt-2 bg-primary text-primary-foreground">
                  $69/mo for first 3 months
                </Badge>
                {annualBilling && (
                  <p className="text-green-600 text-sm mt-2">20% savings with annual billing</p>
                )}
                <p className="text-muted-foreground mt-2">500 minutes included</p>
                <p className="text-xs text-muted-foreground/70">One-time setup fee of $99</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <PricingFeature text="Natural Voice Conversations" />
                <PricingFeature text="24/7 Availability" />
                <PricingFeature text="Basic Customizable Scripts" />
                <PricingFeature text="Simple Analytics & Call Summaries" />
                <PricingFeature text="Email Support" />
                <PricingFeature text="Additional minutes at $0.12/min" />
              </ul>
            </CardContent>
            <CardFooter className="pt-6">
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => handleGetStarted(0)}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Professional Plan */}
          <Card 
            className={`pricing-card relative h-full flex flex-col ${
              selectedPlan === 1 
                ? 'ring-2 ring-primary' 
                : 'hover:border-primary/50 transition-colors'
            }`}
            onClick={() => setSelectedPlan(1)}
          >
            <CardHeader>
              <CardTitle>Professional Plan</CardTitle>
              <CardDescription>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">
                    ${professionalPrice}
                  </span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                {annualBilling && (
                  <p className="text-green-600 text-sm mt-2">20% savings with annual billing</p>
                )}
                <p className="text-muted-foreground mt-2">1,000 minutes included</p>
                <p className="text-xs text-muted-foreground/70">One-time setup fee of $99</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <PricingFeature text="Everything in Starter, plus:" />
                <PricingFeature text="Advanced Customizable Scripts" />
                <PricingFeature text="Comprehensive Analytics & Summaries" />
                <PricingFeature text="CRM Integration" />
                <PricingFeature text="Calendar Integration" />
                <PricingFeature text="AI-Powered Adaptive Dialogues" />
                <PricingFeature text="Priority Support" />
                <PricingFeature text="Additional minutes at $0.10/min" />
              </ul>
            </CardContent>
            <CardFooter className="pt-6">
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => handleGetStarted(1)}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card 
            className={`pricing-card relative h-full flex flex-col ${
              selectedPlan === 2 
                ? 'ring-2 ring-primary' 
                : 'hover:border-primary/50 transition-colors'
            }`}
            onClick={() => setSelectedPlan(2)}
          >
            <CardHeader>
              <CardTitle>Enterprise Plan</CardTitle>
              <CardDescription>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">Custom</span>
                </div>
                <p className="text-muted-foreground mt-2">Custom minutes allocation</p>
                <p className="text-xs text-muted-foreground/70">*Minimum service level applies</p>
                <p className="text-xs text-muted-foreground/70">One-time setup fee of $99</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <PricingFeature text="Everything in Professional, plus:" />
                <PricingFeature text="Fully Customizable Scripts" />
                <PricingFeature text="Enterprise Analytics & Reporting" />
                <PricingFeature text="Advanced Integrations" />
                <PricingFeature text="Premium AI Adaptive Dialogues" />
                <PricingFeature text="Secure & Compliant (GDPR & HIPAA)" />
                <PricingFeature text="Dedicated Account Manager" />
                <PricingFeature text="24/7 Premium Support" />
                <PricingFeature text="Custom Integrations" />
              </ul>
            </CardContent>
            <CardFooter className="pt-6">
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => handleGetStarted(2)}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-8 text-muted-foreground max-w-3xl mx-auto">
          <p>
            All plans include our natural voice technology for authentic conversations.
            Need a custom solution? <a href="#waitlist" className="text-primary font-medium hover:underline">Contact our sales team</a>.
          </p>
          <p className="text-sm mt-2 text-muted-foreground/70">
            *Launch special pricing available for new customers until May 1st, 2025.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
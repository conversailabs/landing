'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface PricingFeatureProps {
  text: string;
}

const PricingFeature: React.FC<PricingFeatureProps> = ({ text }) => (
  <li className="flex items-start">
    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
    <span className="ml-2 text-muted-foreground text-sm">{text}</span>
  </li>
);

const PricingSection: React.FC = () => {
  const [annualBilling, setAnnualBilling] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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
          
          {/* Updated Free Trial Banner */}
          <div className="bg-primary/10 border border-primary/20 p-4 mb-6 w-full mx-auto rounded-lg relative lg:max-w-none">
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-0.5 rounded-md">
              NEW
            </div>
            <h3 className="text-center text-primary font-bold text-xl mb-1">
              Try any plan FREE for 14 days!
            </h3>
            <p className="text-center text-primary">
              Full access to all features. No credit card required. Cancel anytime.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mx-auto">
          {/* Starter Plan */}
          <Card 
            className={`pricing-card relative h-full flex flex-col transform transition-all duration-300 hover:scale-105 ${
              selectedPlan === 0 
                ? 'ring-2 ring-primary' 
                : 'hover:border-primary/50 transition-colors'
            }`}
            onClick={() => setSelectedPlan(0)}
          >
            <div className="absolute -top-3 left-0 right-0 flex justify-center">
              <div className="bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                14-DAYS FREE TRIAL
              </div>
            </div>
            <CardHeader>
              <CardTitle>Starter Plan</CardTitle>
              <div className="mt-2 flex items-baseline">
                <span className="text-3xl font-bold">
                  ${starterPrice}
                </span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              {annualBilling && (
                <p className="text-green-600 text-sm mt-2">20% savings with annual billing</p>
              )}
              <p className="text-muted-foreground mt-2">500 minutes included</p>
              <p className="text-sm text-muted-foreground mt-1">One-time setup fee of $99</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                <PricingFeature text="Natural Voice Conversations" />
                <PricingFeature text="24/7 Availability" />
                <PricingFeature text="Basic Customizable Scripts" />
                <PricingFeature text="Simple Analytics & Call Summaries" />
                <PricingFeature text="Email Support" />
                <PricingFeature text="Additional minutes at $0.12/min" />
              </ul>
            </CardContent>
            <CardFooter className="pt-6">
              <a href="#waitlist" className="w-full">
                <Button size="lg" className="w-full">Start 14-Days Free Trial</Button>
              </a>
            </CardFooter>
          </Card>

          {/* Professional Plan */}
          <Card 
            className={`pricing-card relative h-full flex flex-col transform transition-all duration-300 hover:scale-105 ${
              selectedPlan === 1 
                ? 'ring-2 ring-primary' 
                : 'hover:border-primary/50 transition-colors'
            }`}
            onClick={() => setSelectedPlan(1)}
          >
            <div className="absolute -top-3 left-0 right-0 flex justify-center">
              <div className="bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                14-DAYS FREE TRIAL
              </div>
            </div>
            <CardHeader>
              <CardTitle>Professional Plan</CardTitle>
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
              <p className="text-sm text-muted-foreground mt-1">One-time setup fee of $99</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
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
              <a href="#waitlist" className="w-full">
                <Button size="lg" className="w-full">Start 14-Days Free Trial</Button>
              </a>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card 
            className={`pricing-card relative h-full flex flex-col transform transition-all duration-300 hover:scale-105 ${
              selectedPlan === 2 
                ? 'ring-2 ring-primary' 
                : 'hover:border-primary/50 transition-colors'
            }`}
            onClick={() => setSelectedPlan(2)}
          >
            <div className="absolute -top-3 left-0 right-0 flex justify-center">
              <div className="bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                14-DAYS FREE TRIAL
              </div>
            </div>
            <CardHeader>
              <CardTitle>Enterprise Plan</CardTitle>
              <div className="mt-2 flex items-baseline">
                <span className="text-3xl font-bold">Custom</span>
              </div>
              <p className="text-muted-foreground mt-2">Custom minutes allocation</p>
              <p className="text-sm text-muted-foreground mt-1">Minimum service level guarantee</p>
              <p className="text-sm text-muted-foreground mt-1">One-time setup fee of $199</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
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
              <a href="#waitlist" className="w-full">
                <Button size="lg" className="w-full">Start 14-Days Free Trial</Button>
              </a>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-8 text-muted-foreground max-w-3xl mx-auto">
          <p>
            All plans include our natural voice technology for authentic conversations.
            Need a custom solution? <a href="#waitlist" className="text-primary font-medium hover:underline">Contact our sales team</a>.
          </p>
          <p className="text-sm mt-2 text-muted-foreground/70">
            *Free 14-day trial available for all plans. No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
'use client';
import { cn } from '@/lib/utils';
import {
  Lightbulb,
  Clock,
  FileText,
  BarChart3,
  Calendar,
  Bot,
  ShieldCheck,
  PlugZap,
} from 'lucide-react';
import { FC } from 'react';

// Common text styles for reusability
const titleStyles = "text-left text-xl font-bold text-foreground";
const descriptionStyles = "mt-2 text-left text-gray-600";

// Define feature interface for type safety
interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

// Features array remains the same
const features: Feature[] = [
  {
    title: 'Natural Voice Conversations',
    description: 'Realistic, human-like voices with emotion, tone, and multilingual support.',
    icon: <Lightbulb className="size-6 text-muted-foreground" />,
  },
  {
    title: '24/7 Availability',
    description: 'Never miss a call or opportunity—your voice agent works around the clock.',
    icon: <Clock className="size-6 text-muted-foreground" />,
  },
  {
    title: 'Fully Customizable Scripts',
    description: 'Design flows specific to your business needs—no coding required.',
    icon: <FileText className="size-6 text-muted-foreground" />,
  },
  {
    title: 'Analytics & Call Summaries',
    description: 'Track interactions, extract insights, and monitor customer satisfaction.',
    icon: <BarChart3 className="size-6 text-muted-foreground" />,
  },
  {
    title: 'CRM & Calendar Integration',
    description: 'Seamless syncing with Salesforce, HubSpot, Google Calendar, and more.',
    icon: <Calendar className="size-6 text-muted-foreground" />,
  },
  {
    title: 'AI-Powered Adaptive Dialogues',
    description: 'Voice agents that learn, adapt, and respond intelligently in real time.',
    icon: <Bot className="size-6 text-muted-foreground" />,
  },
  {
    title: 'Secure & Compliant',
    description: 'Enterprise-grade encryption, GDPR & HIPAA compliance, role-based access.',
    icon: <ShieldCheck className="size-6 text-muted-foreground" />,
  },
  {
    title: 'Plug-and-Play Setup',
    description: 'Get started in minutes with easy onboarding and support.',
    icon: <PlugZap className="size-6 text-muted-foreground" />,
  },
];

const KeyFeaturesSection: FC = () => {
  return (
    <section 
      className="container mx-auto flex min-h-[350px] w-full max-w-7xl flex-col items-center justify-center gap-y-12 p-6 sm:py-14 lg:gap-y-16"
      id="features"
    >
      <div className="flex flex-col items-center">
        <h2 className="mb-4 mt-6 text-center text-3xl font-semibold tracking-tight text-foreground leading-tight md:text-5xl lg:text-center">
          Key Features
        </h2>
      </div>
      
      <div className="mx-auto grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          // Removed conditional border styling that was causing issues
          <div
            className="group relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 p-6 transition-all duration-300 hover:border-primary"
            key={feature.title}
          >
            {/* Improved gradient with better visibility on all screens */}
            <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent to-primary/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            
            <div className="mb-4">
              {feature.icon}
            </div>
            
            <div className="relative z-10">
              <h3 className={titleStyles}>
                {feature.title}
              </h3>
              <p className={descriptionStyles}>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeaturesSection;
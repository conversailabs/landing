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
} from 'lucide-react'; // or your icon set
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Add custom CSS for mobile active state
const customStyles = `
@media (max-width: 640px) {
  .mobile-active {
    border-color: hsl(var(--primary)) !important;
    border-width: 2px !important;
    background-color: rgba(var(--primary-rgb), 0.05);
  }
  
  .mobile-active .bg-gradient-to-t {
    opacity: 1 !important;
  }
  
  .group\/card {
    margin: 0.2 !important;
    padding-top: 4px !important;
    padding-bottom: 4px !important;
  }
}
`;

const features = [
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

const containerVariants = {
  visible: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.5,
    },
  },
  hidden: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.5,
    },
  },
};

const childrenVariants = {
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
  hidden: {
    opacity: 0,
    y: 10,
    filter: 'blur(5px)',
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};

const KeyFeaturesSection = () => {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  
  // Function to handle card click/tap on mobile
  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    // Only apply for mobile view
    if (window.innerWidth <= 640) {
      event.stopPropagation(); // Prevent bubbling to document click handler
      setActiveCardIndex(prev => prev === index ? null : index);
    }
  };

  // Add a document click handler to reset active card when clicking elsewhere
  useEffect(() => {
    const handleDocumentClick = () => {
      setActiveCardIndex(null);
    };
    
    document.addEventListener('click', handleDocumentClick);
    
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <motion.section 
      className="container mx-auto flex min-h-[350px] w-full max-w-7xl flex-col items-center justify-center gap-y-12 p-6 sm:py-14 lg:gap-y-16"
      variants={containerVariants}
      animate="visible"
      initial="hidden"
      id="features"
    >
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className="flex flex-col items-center">
        <motion.h2
          className="leading-[1.1]! mb-0 mt-6 text-center text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-center"
          variants={childrenVariants}
        >
          Key Features
        </motion.h2>
      </div>
      <motion.div
        className="mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-0"
      >
        {features.map((feature, index) => (
          <motion.div
            className={cn(
              'group/card relative flex h-full w-full max-w-7xl flex-col overflow-hidden border border-border py-6 sm:py-10 transition-all duration-300 hover:border-primary hover:border-2 cursor-pointer m-0',
              {
                'mobile-active': activeCardIndex === index,
                'lg:border-t': index % 3 === 0 && index < 4,
                'lg:border-b':
                  ((index % 4 === 0 || index === features.length - 1) && index >= 4) ||
                  index === 2 ||
                  index === 1,
                'lg:border-l': (index >= 4 && index === features.length - 1) || index === 3,
                'lg:border-r': (index >= 4 && index % 4 === 0) || index === 0,
              },
            )}
            onClick={(e) => handleCardClick(e, index)}
            key={index}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
              },
              hidden: {
                opacity: 0,
                y: 10,
                filter: 'blur(5px)',
              },
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-primary/10 to-transparent opacity-0 transition duration-200 group-hover/card:opacity-100 dark:from-primary/10"></div>
            <div
              className={cn(
                'mb-2 sm:mb-4 mt-2 px-2 sm:px-10 transition-all duration-200 group-hover/card:translate-x-1',
                {
                  'lg:group-hover/card:-translate-x-2 lg:group-hover/card:-translate-y-0':
                    index === 2 || index === 6,
                  'lg:group-hover/card:-translate-y-0 lg:group-hover/card:translate-x-2':
                    index === 1 || index === 5,
                  'lg:group-hover/card:-translate-y-2 lg:group-hover/card:translate-x-0':
                    index === 4 || index === features.length - 1,
                  'lg:group-hover/card:translate-x-0 lg:group-hover/card:translate-y-2':
                    index === 0 || index === 3,
                },
              )}
            >
              {feature.icon}
            </div>
            <div
              className={cn(
                'z-10 px-2 sm:px-10 transition-all duration-200 group-hover/card:translate-x-1',
                {
                  'lg:group-hover/card:-translate-x-2 lg:group-hover/card:-translate-y-0':
                    index === 2 || index === 6,
                  'lg:group-hover/card:-translate-y-0 lg:group-hover/card:translate-x-2':
                    index === 1 || index === 5,
                  'lg:group-hover/card:-translate-y-2 lg:group-hover/card:translate-x-0':
                    index === 4 || index === features.length - 1,
                  'lg:group-hover/card:translate-x-0 lg:group-hover/card:translate-y-2':
                    index === 0 || index === 3,
                },
              )}
            >
              <h2 className="relative mt-0 text-left text-lg sm:text-xl font-bold text-foreground">
                {feature.title}
              </h2>
              <p className="text-sm sm:text-md mt-1 sm:mt-2 max-w-xs pr-1 sm:pr-4 text-left text-gray-600">
                {feature.description}
              </p>
            </div>
            <div
              className={cn(
                'absolute left-0 bg-neutral-700 transition-all duration-200 group-hover/card:h-[0.4rem] group-hover/card:bg-primary',
                {
                  'h-[3rem] w-1 rounded-br-full rounded-tr-full group-hover/card:h-[3.5rem] lg:left-[calc(50%-3rem)] lg:top-0 lg:h-1 lg:w-[6rem] lg:rounded-bl-full lg:rounded-br-full lg:rounded-tl-none lg:rounded-tr-none lg:group-hover/card:h-1 lg:group-hover/card:w-[6.5rem]':
                    index === 0 || index === 3,
                  'h-[3rem] w-1 rounded-br-full rounded-tr-full group-hover/card:h-[3.5rem] lg:left-0 lg:top-[calc(50%-3rem)]':
                    index === 1 || index === 5,
                  'h-[3rem] w-1 rounded-br-full rounded-tr-full group-hover/card:h-[3.5rem] lg:right-0 lg:top-[calc(50%-3rem)] lg:rounded-bl-full lg:rounded-br-none lg:rounded-tl-full lg:rounded-tr-none':
                    index === 2 || index === 6,
                  'h-[3rem] w-1 rounded-br-full rounded-tr-full group-hover/card:h-[3.5rem] lg:bottom-0 lg:left-[calc(50%-3rem)] lg:h-1 lg:w-[6rem] lg:rounded-bl-none lg:rounded-br-none lg:rounded-tl-full lg:rounded-tr-full lg:group-hover/card:h-1 lg:group-hover/card:w-[6.5rem]':
                    index === 4 || index === features.length - 1,
                },
              )}
            ></div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default KeyFeaturesSection;
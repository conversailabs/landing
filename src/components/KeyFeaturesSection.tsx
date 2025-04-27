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
import { motion, useAnimation } from 'framer-motion';
import { PRODUCT_NAME } from '@/lib/config';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.section
      className="container mx-auto flex min-h-[350px] w-full max-w-7xl flex-col items-center justify-center gap-y-12 p-6 sm:py-14 lg:gap-y-16"
      variants={containerVariants}
      animate="visible"
      initial="hidden"
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="relative mx-auto inline-flex h-8 w-min select-none overflow-hidden rounded-full px-[1.5px] pb-[1px] pt-[2px] focus:outline-none"
          variants={{
            visible: {
              opacity: 1,
              y: 0,
            },
            hidden: {
              opacity: 0,
              y: 2,
            },
          }}
        >
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--primary))_0%,hsl(var(--muted))_50%,hsl(var(--primary))_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-4 py-1 text-sm font-medium text-foreground backdrop-blur-3xl">
            Features
          </span>
        </motion.div>
        <motion.h2
          className="leading-[1.1]! mb-0 mt-6 text-center text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-center"
          variants={childrenVariants}
        >
          Unlock the Power of Voice AI
        </motion.h2>
        <motion.p
          className="mt-4 max-w-lg px-2 text-center text-lg text-muted-foreground"
          variants={childrenVariants}
        >
          Build smarter conversations, automate workflows, and drive growth with our next-generation
          voice agents.
        </motion.p>
      </div>
      <motion.div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        ref={containerRef}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{
          background: isHovering
            ? `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary)) -200%, transparent 100%)`
            : 'none',
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            className={cn(
              'group/card relative flex h-full w-full max-w-7xl flex-col overflow-hidden border-border py-10',
              {
                'lg:border-t': index % 3 === 0 && index < 4,
                'lg:border-b':
                  ((index % 4 === 0 || index === features.length - 1) && index >= 4) ||
                  index === 2 ||
                  index === 1,
                'lg:border-l': (index >= 4 && index === features.length - 1) || index === 3,
                'lg:border-r': (index >= 4 && index % 4 === 0) || index === 0,
              },
            )}
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
            {/* Animated border overlay */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                {/* Top border */}
                <div className="absolute left-0 top-0 h-px w-full">
                  <div className="absolute h-full w-full animate-border-flow bg-gradient-to-r from-transparent via-primary to-transparent" />
                </div>
                {/* Right border */}
                <div className="absolute right-0 top-0 h-full w-px">
                  <div className="absolute h-full w-full animate-border-flow-vertical bg-gradient-to-b from-transparent via-primary to-transparent" />
                </div>
                {/* Bottom border */}
                <div className="absolute bottom-0 left-0 h-px w-full">
                  <div className="absolute h-full w-full animate-border-flow-reverse bg-gradient-to-r from-transparent via-primary to-transparent" />
                </div>
                {/* Left border */}
                <div className="absolute left-0 top-0 h-full w-px">
                  <div className="absolute h-full w-full animate-border-flow-vertical-reverse bg-gradient-to-b from-transparent via-primary to-transparent" />
                </div>
              </div>
            </div>

            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-primary/35 to-transparent opacity-0 transition duration-200 group-hover/card:opacity-100 dark:from-primary/30"></div>
            <div
              className={cn(
                'mb-4 mt-2 px-10 transition-all duration-200 group-hover/card:translate-x-2',
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
                'z-10 px-10 transition-all duration-200 group-hover/card:translate-x-2',
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
              <h2 className="relative mt-0 text-left text-xl font-bold text-foreground">
                {feature.title}
              </h2>
              <p className="text-md mt-2 max-w-xs pr-4 text-left text-gray-600">
                {feature.description}
              </p>
            </div>
            <div
              className={cn(
                'absolute bg-neutral-700 transition-all duration-200 group-hover/card:h-[0.4rem] group-hover/card:bg-primary',
                {
                  'h-[6rem] w-1 rounded-br-full rounded-tr-full group-hover/card:h-[6.5rem] lg:left-[calc(50%-3rem)] lg:top-0 lg:h-1 lg:w-[6rem] lg:rounded-bl-full lg:rounded-br-full lg:rounded-tl-none lg:rounded-tr-none lg:group-hover/card:h-1 lg:group-hover/card:w-[6.5rem]':
                    index === 0 || index === 3,
                  'h-[6rem] w-1 rounded-br-full rounded-tr-full group-hover/card:h-[6.5rem] lg:left-0 lg:top-[calc(50%-3rem)]':
                    index === 1 || index === 5,
                  'h-[6rem] w-1 rounded-br-full rounded-tr-full group-hover/card:h-[6.5rem] lg:right-0 lg:top-[calc(50%-3rem)] lg:rounded-bl-full lg:rounded-br-none lg:rounded-tl-full lg:rounded-tr-none':
                    index === 2 || index === 6,
                  'h-[6rem] w-1 rounded-br-full rounded-tr-full group-hover/card:h-[6.5rem] lg:bottom-0 lg:left-[calc(50%-3rem)] lg:h-1 lg:w-[6rem] lg:rounded-bl-none lg:rounded-br-none lg:rounded-tl-full lg:rounded-tr-full lg:group-hover/card:h-1 lg:group-hover/card:w-[6.5rem]':
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

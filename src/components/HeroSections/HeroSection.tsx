'use client';

import React, { useState, useEffect } from 'react';
import VoiceAISaaSForm from '@/components/HeroSections/VoiceAISaaSForm';
import { motion, AnimatePresence } from 'framer-motion';

interface UseCase {
  title: string;
  description: string;
  stat?: string;
}

const useCasesData: UseCase[] = [
  {
    title: 'Appointment Setting',
    description:
      'Create personalized voice AI agents that call leads, respond naturally to objections, and schedule meetings directly in your calendar.',
  },
  {
    title: 'Customer Service',
    description:
      'Deploy intelligent voice agents that answer questions, resolve issues, and provide support—even when your team is offline.',
  },
  {
    title: 'Lead Qualification',
    description:
      'Let AI voice agents identify high-potential prospects by asking qualifying questions and scoring leads based on their responses.',
  },
  {
    title: 'Outbound Sales',
    description:
      'Automate initial sales conversations with voice AI that introduces your product, handles objections, and books demos with interested prospects.',
  },
  {
    title: 'Appointment Reminders',
    description:
      'Voice agents that call to confirm appointments, reschedule when needed, and send personalized reminders that keep your calendar full.',
  },
  {
    title: 'Customer Feedback',
    description:
      'Automatically collect customer feedback through natural conversations and identify trends to enhance your products and services.',
  },
];

const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentUseCase = useCasesData[currentIndex];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % useCasesData.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [useCasesData.length]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .wave-bar {
        animation: waveAnimation 1.4s ease-in-out infinite;
        transform-origin: 50% 50%;
      }

      @keyframes waveAnimation {
        0%, 100% {
          transform: scaleY(0.3);
        }
        50% {
          transform: scaleY(1);
        }
      }

      .text-transition {
        transition: all 0.5s ease;
        animation: textFade 0.7s ease;
      }

      @keyframes textFade {
        0% { opacity: 0; transform: translateY(8px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      .description-transition {
        transition: all 0.5s ease;
        animation: descriptionFade 1s ease;
      }

      @keyframes descriptionFade {
        0% { opacity: 0; transform: translateY(15px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      .stat-transition {
        transition: all 0.5s ease;
        animation: statFade 1.2s ease;
      }

      @keyframes statFade {
        0% { opacity: 0; transform: translateX(-15px); }
        100% { opacity: 1; transform: translateX(0); }
      }

      .moving-wave {
        animation: moveWave 30s linear infinite; /* Increased from 12s to 30s for a longer animation */
        will-change: transform;
      }

      @keyframes moveWave {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      
      /* Mobile specific enhancements for better spacing and readability */
      @media (max-width: 767px) {
        .mobile-text-spacing {
          word-spacing: 0.05em;
          letter-spacing: 0.02em;
          line-height: 1.6;
        }
        
        .mobile-title-spacing {
          word-spacing: 0.08em;
          letter-spacing: 0.03em;
          line-height: 1.3;
        }
        
        .mobile-container {
          padding-left: 1rem;
          padding-right: 1rem;
          max-width: 100%;
        }
        
        .mobile-countdown {
          margin-top: 1rem;
          margin-bottom: 0.4rem;
        }
        
        .mobile-countdown-item {
          padding: 0.5rem;
          min-width: 3.5rem;
        }
        
        .mobile-description {
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          margin-bottom: 2.5rem;
        }
        
        .mobile-cta-button {
          margin-top: 1rem;
          margin-bottom: 1rem;
          padding-left: 1.5rem !important;
          padding-right: 1.5rem !important;
          font-size: 1rem !important;
        }
        
        .mobile-early-bird {
          margin-top: 1rem;
          margin-bottom: 1.25rem;
          font-size: 1.125rem !important;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center relative">
      {/* Added the wave container here, positioned absolutely at the bottom */}
      <div className="wave-container overflow-hidden absolute bottom-0 left-0 w-full z-0">
        <div className="w-[200%] moving-wave">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16 md:h-24"
          >
            <defs>
              <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                <stop stopColor="rgba(255, 255, 255, 1)" offset="0%"></stop>
                <stop stopColor="rgba(255, 255, 255, 1)" offset="100%"></stop>
              </linearGradient>
            </defs>
            <path
              d="M0,0V46.29c47.79,22.2,103.64,32.17,158.48,29.3
             C213.31,73.52,267.94,59.25,321.48,41.31
             c53.54-17.91,107.17-32,160.79-32
             C538.93,9.31,593.39,26.79,647.42,48.89
             c54.04,22.09,108.12,46.93,162.2,58.95
             C865.28,119.28,920.49,108.21,975.72,93.26
             c55.23-14.95,110.35-31.55,165.46-33.6
             C1190.88,58.18,1200,49,1200,46.29V0Z"
              opacity="1"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
      
      <div className="container px-4 md:px-10 mx-auto text-center flex-grow flex flex-col justify-center items-center relative z-10 mt-0">
        {/* Updated heading style with increased spacing between main heading and use case title on lg screens */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 px-2 md:px-0">
          <span className="block mb-1 md:mb-2 lg:mb-6">Intelligent Voice AI Agents &#8594; 24/7 AI Receptionist</span>
          <span key={currentIndex} className="text-primary text-transition block text-xl md:text-3xl lg:text-4xl mt-2 md:mt-3 lg:mt-6">
            {currentUseCase.title}
          </span>
        </h1>
        
        {/* Content container with fixed height to prevent layout shifts */}
        <div className="w-full flex flex-col items-center" style={{ minHeight: '160px', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center absolute top-0 left-0 right-0"
            >
              <div className="mx-auto md:max-w-2xl lg:max-w-3xl px-2 md:px-0 mt-4">
                <div className="mb-6 md:mb-5 text-muted-foreground">
                  <p className="my-3 md:mb-2 text-sm md:text-base lg:text-lg leading-relaxed max-w-prose">
                    {currentUseCase.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Button container with z-index to appear above the wave */}
        <div className="mt-4 w-full relative z-10">
          <VoiceAISaaSForm />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
'use client';

import React, { useState, useEffect } from 'react';
import VoiceAISaaSForm from '@/components/HeroSections/VoiceAISaaSForm';
import { WavyBackground } from '@/components/ui/wavy-background';
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

  return (
    <WavyBackground className="mx-auto overflow-hidden">
      <div className="min-h-[90vh] flex flex-col justify-center">
        <div className="container px-10 mx-auto text-center flex-grow flex flex-col justify-center">
          <h1 className="w-full max-w-7xl text-center text-3xl font-extrabold md:text-4xl lg:text-5xl 2xl:text-6xl uppercase">
            Intelligent Voice AI Agents
          </h1>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="w-full mt-6 max-w-7xl text-center text-primary text-3xl font-extrabold md:text-4xl lg:text-5xl 2xl:text-6xl uppercase">
                {currentUseCase.title}
              </h2>

              <div className="mx-auto md:max-w-2xl lg:max-w-3xl px-2 md:px-0 mt-4">
                <div className="mb-8 md:mb-6 font-medium text-gray-700">
                  <p className="my-4 md:mb-3 text-base md:text-xl">{currentUseCase.description}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4"></div>
          <VoiceAISaaSForm />
        </div>
      </div>
    </WavyBackground>
  );
};

export default HeroSection;

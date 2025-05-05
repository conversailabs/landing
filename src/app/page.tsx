'use client';

import React from 'react';
import Navbar from '@/components/landingB/Navbar';
import HeroSection from '@/components/landingB/HeroSections/HeroSection';
import BenefitsSection from '@/components/landingB/Benefits'; 
import ProofSection from '@/components/landingB/ProofSection';
import PricingSection from '@/components/landingB/PricingSection';
import FaqSection from '@/components/landingB/FaqSection';
import Footer from '@/components/landingB/Footer';
import WaitlistSection from '@/components/WaitlistSection';
import AboutUsPage from '@/components/landingB/About';
import HowItWorksSection from '@/components/landingB/HowItWorksSection'; 
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <ProofSection />
      <HowItWorksSection />
      <PricingSection />
      <WaitlistSection />
      <AboutUsPage />
      <FaqSection />
      <Footer />
    </>
  );
}

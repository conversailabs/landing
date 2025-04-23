'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSections/HeroSection';
import UseCasesSection from '@/components/UseCasesSection';
import KeyFeaturesSection from '@/components/KeyFeaturesSection';
import PricingSection from '@/components/PricingSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import WaitlistSection from '@/components/WaitlistSection';
import AboutUsPage from '@/components/About';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <UseCasesSection />
      <KeyFeaturesSection />
      <PricingSection />
      <WaitlistSection />
      <AboutUsPage />
      <FaqSection />
      <Footer />
    </>
  );
}

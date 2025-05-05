'use client';

import React from 'react';
import Navbar from '@/components/landingA/Navbar';
import HeroSection from '@/components/landingA/HeroSections/HeroSection';
import UseCasesSection from '@/components/landingA/UseCasesSection';
import KeyFeaturesSection from '@/components/landingA/KeyFeaturesSection';
import PricingSection from '@/components/landingA/PricingSection';
import FaqSection from '@/components/landingA/FaqSection';
import Footer from '@/components/landingA/Footer';
import WaitlistSection from '@/components/WaitlistSection';
import AboutUsPage from '@/components/landingA/About';

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

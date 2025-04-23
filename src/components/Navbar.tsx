'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Navbar = () => {
  // Using useState with a stable initial value
  const [isOpen, setIsOpen] = useState(false);

  // Avoid dynamically generated content that could cause hydration errors
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-background py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" className="flex items-center md:flex-1">
          <img
            src="https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/sign/demo-audios/Group%201.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzcyMzJmNjk4LTBiYTAtNGU4Yi1iZWMxLWM3NDgyYTM4Y2RjOSJ9.eyJ1cmwiOiJkZW1vLWF1ZGlvcy9Hcm91cCAxLnBuZyIsImlhdCI6MTc0NDYyOTQ0OCwiZXhwIjoxNzc2MTY1NDQ4fQ.ZSFXe6hPDW2MH74Ypv4bpnjvQ1DbJZPLq8NPM0reVxg"
            alt="ConversAILabs Logo"
            className="h-8 mr-2"
            onError={(e) => {
              console.log('Image failed to load, suppressing error');
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="text-xl font-bold hidden md:inline"></span>
        </a>

        {/* Company name in the middle for mobile view */}
        <div className="flex-1 text-center md:hidden">
          <span className="text-xl font-bold">ConversAILabs</span>
        </div>

        <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
          <a href="#features" className="hover:text-primary">
            Features
          </a>
          <a href="#pricing" className="hover:text-primary">
            Pricing
          </a>

          <a href="#about" className="hover:text-primary">
            About Us
          </a>
          <a href="#faq" className="hover:text-primary">
            FAQs
          </a>
          <a href="#waitlist">
            <Button>Experience AI Calling</Button>
          </a>
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="md:hidden">
              <SheetTitle className="text-left">Navigation Menu</SheetTitle>
              <div className="flex items-center mb-6">
                <img
                  src="https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/sign/demo-audios/Group%201.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzcyMzJmNjk4LTBiYTAtNGU4Yi1iZWMxLWM3NDgyYTM4Y2RjOSJ9.eyJ1cmwiOiJkZW1vLWF1ZGlvcy9Hcm91cCAxLnBuZyIsImlhdCI6MTc0NDYyOTQ0OCwiZXhwIjoxNzc2MTY1NDQ4fQ.ZSFXe6hPDW2MH74Ypv4bpnjvQ1DbJZPLq8NPM0reVxg"
                  alt="ConversAILabs Logo"
                  className="h-6 mr-2"
                  onError={(e) => {
                    console.log('Image failed to load in mobile menu, suppressing error');
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-lg font-bold">ConversAILabs</span>
              </div>
              <div className="grid gap-4 py-4">
                <a href="#features" className="hover:text-primary" onClick={handleLinkClick}>
                  Features
                </a>
                <a href="#pricing" className="hover:text-primary" onClick={handleLinkClick}>
                  Pricing
                </a>

                <a href="#about" className="hover:text-primary" onClick={handleLinkClick}>
                  About Us
                </a>
                <a href="#faq" className="hover:text-primary" onClick={handleLinkClick}>
                  FAQs
                </a>
                <a href="#waitlist" className="mt-2" onClick={handleLinkClick}>
                  <Button className="w-full">Experience AI Calling</Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

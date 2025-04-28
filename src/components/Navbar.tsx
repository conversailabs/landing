'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

// Create a custom event for opening the demo form
const openDemoFormEvent = new CustomEvent('openAIDemoForm');

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault(); // Prevent default anchor behavior
    setIsOpen(false);
    
    // Find the section element
    const section = document.getElementById(sectionId);
    if (section) {
      // Calculate position to scroll to (accounting for navbar height plus some padding)
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
      const scrollPosition = section.offsetTop - navbarHeight - 1; // 20px padding instead of 60px
      
      // Smooth scroll to the calculated position
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Function to handle "Experience AI Calling" button click
  const handleDemoButtonClick = () => {
    // Dispatch custom event to trigger the demo form
    document.dispatchEvent(openDemoFormEvent);
    setIsOpen(false); // Close the mobile menu if open
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
          <span className="text-xl font-bold">ConversAILabs</span>
        </a>

        <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
          <a href="#features" className="hover:text-primary" onClick={(e) => handleLinkClick(e, 'features')}>
            Features
          </a>
          <a href="#pricing" className="hover:text-primary" onClick={(e) => handleLinkClick(e, 'pricing')}>
            Pricing
          </a>
          <a href="#about" className="hover:text-primary" onClick={(e) => handleLinkClick(e, 'about')}>
            About Us
          </a>
          <a href="#faq" className="hover:text-primary" onClick={(e) => handleLinkClick(e, 'faq')}>
            FAQs
          </a>
          {/* Updated to use onClick instead of href */}
          <Button onClick={handleDemoButtonClick}>Experience AI Calling</Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="md:hidden pt-0">
              {/* Keep SheetTitle but visually hide it for accessibility */}
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex items-center mb-4 pt-0">
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
              <div className="grid gap-4 py-3">
                <a href="#features" className="hover:text-primary" onClick={(e) => handleLinkClick(e, 'features')}>
                  Features
                </a>
                <a href="#pricing" className="hover:text-primary" onClick={(e) => handleLinkClick(e, 'pricing')}>
                  Pricing
                </a>
                <a href="#about" className="hover:text-primary" onClick={(e) => handleLinkClick(e, 'about')}>
                  About Us
                </a>
                <a href="#faq" className="hover:text-primary" onClick={(e) => handleLinkClick(e, 'faq')}>
                  FAQs
                </a>
                {/* Updated to use onClick instead of href */}
                <Button className="w-full mt-2" onClick={handleDemoButtonClick}>
                  Experience AI Calling
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
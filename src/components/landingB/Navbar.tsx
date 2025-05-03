'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsOpen(false);
    
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
        const scrollPosition = section.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  const handleDemoButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsOpen(false);
    
    setTimeout(() => {
      const openDemoFormEvent = new CustomEvent('openAIDemoForm');
      document.dispatchEvent(openDemoFormEvent);
    }, 300);
  };

  return (
    <nav className="bg-background py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo section */}
        <a href="/" className="flex items-center shrink-0">
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

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 justify-end">
          <a href="#benefits" className="hover:text-primary whitespace-nowrap text-sm lg:text-base" onClick={(e) => handleLinkClick(e, 'benefits')}>
            Benefits
          </a>
          <a href="#proof" className="hover:text-primary whitespace-nowrap text-sm lg:text-base" onClick={(e) => handleLinkClick(e, 'proof')}>
            Proof
          </a>
          <a href="#how-it-works" className="hover:text-primary whitespace-nowrap text-sm lg:text-base" onClick={(e) => handleLinkClick(e, 'how-it-works')}>
            How It Works
          </a>
          <a href="#pricing" className="hover:text-primary whitespace-nowrap text-sm lg:text-base" onClick={(e) => handleLinkClick(e, 'pricing')}>
            Pricing
          </a>
          <a href="#about" className="hover:text-primary whitespace-nowrap text-sm lg:text-base" onClick={(e) => handleLinkClick(e, 'about')}>
            About Us
          </a>
          <a href="#faq" className="hover:text-primary whitespace-nowrap text-sm lg:text-base" onClick={(e) => handleLinkClick(e, 'faq')}>
            FAQs
          </a>
          <Button onClick={handleDemoButtonClick} className="flex items-center gap-2 whitespace-nowrap ml-2">
            <Phone size={18} className="text-white fill-white" /> 
            <span className="hidden lg:inline">Talk to Our Voice AI</span>
            <span className="lg:hidden">Voice AI</span>
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="md:hidden pt-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex items-center mb-3 pt-4 mt-2 px-1">
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
                <a 
                  href="#benefits" 
                  className="hover:text-primary active:text-primary" 
                  onClick={(e) => handleLinkClick(e, 'benefits')}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  Benefits
                </a>
                <a 
                  href="#proof" 
                  className="hover:text-primary active:text-primary" 
                  onClick={(e) => handleLinkClick(e, 'proof')}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  Proof
                </a>
                <a 
                  href="#how-it-works" 
                  className="hover:text-primary active:text-primary" 
                  onClick={(e) => handleLinkClick(e, 'how-it-works')}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  How It Works
                </a>
                <a 
                  href="#pricing" 
                  className="hover:text-primary active:text-primary" 
                  onClick={(e) => handleLinkClick(e, 'pricing')}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  Pricing
                </a>
                <a 
                  href="#about" 
                  className="hover:text-primary active:text-primary" 
                  onClick={(e) => handleLinkClick(e, 'about')}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  About Us
                </a>
                <a 
                  href="#faq" 
                  className="hover:text-primary active:text-primary" 
                  onClick={(e) => handleLinkClick(e, 'faq')}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  FAQs
                </a>
                <Button 
                  className="w-full mt-2 flex items-center justify-center gap-2" 
                  onClick={handleDemoButtonClick}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <Phone size={18} className="text-white fill-white" /> Talk to Our Voice AI
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
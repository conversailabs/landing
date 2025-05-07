'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, Phone } from 'lucide-react'; // Added Phone import

// Create a custom event for opening the demo form

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
    const [isHomePage, setIsHomePage] = useState(true);
  
    // Check if we're on the home page
    useEffect(() => {
      // Check if the pathname is "/" or empty (home page)
      const isHome = window.location.pathname === "/beta" || window.location.pathname === "";
      setIsHomePage(isHome);
    }, []);
  
    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Prevent default navigation if we're already on home page
      if (isHomePage) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault(); // Prevent default anchor behavior
    e.stopPropagation(); // Stop event propagation to prevent reopening

    // Close the sheet first
    setIsOpen(false);

    // Delay the scroll slightly to allow the sheet to close
    setTimeout(() => {
      // Find the section element
      const section = document.getElementById(sectionId);
      if (section) {
        // Calculate position to scroll to (accounting for navbar height plus some padding)
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
        const scrollPosition = section.offsetTop - navbarHeight - 1; // Small padding

        // Smooth scroll to the calculated position
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth',
        });
      }
    }, 300); // Short delay to ensure the sheet closes first
  };

  // Function to handle "Experience AI Calling" button click
  const handleDemoButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling

    // Close the sheet first
    setIsOpen(false);

    // Slight delay to ensure sheet closes before opening the form
    setTimeout(() => {
      const openDemoFormEvent = new CustomEvent('openAIDemoForm');
      // Dispatch custom event to trigger the demo form
      document.dispatchEvent(openDemoFormEvent);
    }, 300);
  };

  return (
    <nav className="bg-background py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a 
        href="/beta" 
        className="flex items-center md:flex-1"
        onClick={handleLogoClick}
        >
          <img
            src="https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/public/demo-audios/Group%201.png"
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
          <a
            href="#features"
            className="hover:text-primary"
            onClick={(e) => handleLinkClick(e, 'features')}
          >
            Features
          </a>
          <a
            href="#pricing"
            className="hover:text-primary"
            onClick={(e) => handleLinkClick(e, 'pricing')}
          >
            Pricing
          </a>
          <a
            href="#about"
            className="hover:text-primary"
            onClick={(e) => handleLinkClick(e, 'about')}
          >
            About Us
          </a>
          <a href="#faq" className="hover:text-primary" onClick={(e) => handleLinkClick(e, 'faq')}>
            FAQs
          </a>
          {/* Added Phone icon to the button */}
          <Button onClick={handleDemoButtonClick} className="flex items-center gap-2">
            <Phone size={18} className="text-white fill-white" /> Talk to Our Voice AI
          </Button>
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
              {/* Reduced padding for the logo and company name in mobile view */}
              <div className="flex items-center mb-1 pt-2 px-0">
                <img
                  src="https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/public/demo-audios/Group%201.png"
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
                  href="#features"
                  className="hover:text-primary active:text-primary"
                  onClick={(e) => handleLinkClick(e, 'features')}
                  onMouseDown={(e) => e.preventDefault()} // Prevent focus issues
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="hover:text-primary active:text-primary"
                  onClick={(e) => handleLinkClick(e, 'pricing')}
                  onMouseDown={(e) => e.preventDefault()} // Prevent focus issues
                >
                  Pricing
                </a>
                <a
                  href="#about"
                  className="hover:text-primary active:text-primary"
                  onClick={(e) => handleLinkClick(e, 'about')}
                  onMouseDown={(e) => e.preventDefault()} // Prevent focus issues
                >
                  About Us
                </a>
                <a
                  href="#faq"
                  className="hover:text-primary active:text-primary"
                  onClick={(e) => handleLinkClick(e, 'faq')}
                  onMouseDown={(e) => e.preventDefault()} // Prevent focus issues
                >
                  FAQs
                </a>
                {/* Added Phone icon to the mobile button too */}
                <Button
                  className="w-full mt-2 flex items-center justify-center gap-2"
                  onClick={handleDemoButtonClick}
                  onMouseDown={(e) => e.preventDefault()} // Prevent focus issues
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
'use client';

import React, { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Linkedin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const companyName = 'ConversAILabs';
  const emailAddress = 'connect@conversailabs.com';
  const phoneNumber = '+1 (681) 201-1361';
  
  const [showContact, setShowContact] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Common breakpoint for mobile devices
    };
    
    // Initial check
    checkIfMobile();
    
    // Check on resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const toggleContactInfo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent immediate bubbling
    setShowContact(!showContact);
  };

  // Add document click listener to close contact info when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click was outside the contact section
      const target = event.target as HTMLElement;
      if (!target.closest('a[href="#"]') && !target.closest('.contact-info')) {
        setShowContact(false);
      }
    };

    // Add event listener
    document.addEventListener('click', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Handle section navigation
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // Reset the contact display when navigating
    setShowContact(false);
    
    // Remove any focus or active states from the clicked link
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    
    // Find the section element
    const section = document.getElementById(sectionId);
    if (section) {
      // Calculate position to scroll to (accounting for navbar height plus some padding)
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
      const scrollPosition = section.offsetTop - navbarHeight - 2; // 2px padding
      
      // Smooth scroll to the calculated position
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-accent py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-bold mb-4">{companyName}</h4>
            <p className="text-muted-foreground mb-6">
              Your partner in AI-powered voice solutions.
            </p>
            <div className="flex items-center">
              <a 
                href="https://www.linkedin.com/company/conversailabs/posts/?feedView=all"
                className="flex items-center text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-5 w-5 mr-2" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h6 className="text-sm font-semibold mb-4">Company</h6>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#about" 
                  className={`text-muted-foreground ${!isMobile ? 'hover:text-primary' : ''} focus:outline-none active:text-primary`}
                  onClick={(e) => handleSectionClick(e, 'about')}
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  onClick={toggleContactInfo}
                  className={`text-muted-foreground hover:text-primary`}
                >
                  Contact
                </a>
              </li>
              {showContact && (
                <li className="pl-4 pt-2 space-y-2 contact-info">
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{phoneNumber}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{emailAddress}</span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        <Separator />

        <div className="pt-6 text-sm text-muted-foreground">
          © {currentYear} {companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
'use client';

import React, { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Linkedin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const companyName = 'ConversAILabs';
  const emailAddress = 'connect@conversailabs.com';
  const phoneNumber = '+1 (681) 201-1361';
  // Using signed URL for logo image as in Navbar component
  const logoUrl = 'https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/sign/demo-audios/Group%201.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzcyMzJmNjk4LTBiYTAtNGU4Yi1iZWMxLWM3NDgyYTM4Y2RjOSJ9.eyJ1cmwiOiJkZW1vLWF1ZGlvcy9Hcm91cCAxLnBuZyIsImlhdCI6MTc0NDYyOTQ0OCwiZXhwIjoxNzc2MTY1NDQ4fQ.ZSFXe6hPDW2MH74Ypv4bpnjvQ1DbJZPLq8NPM0reVxg';
  
  const [showContact, setShowContact] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // New state for the highlight effect
  const [isHighlighted, setIsHighlighted] = useState(false);
  
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

  // IMPORTANT: Expose the toggle function to the global window object
  // This allows other components to access it without using Context
  useEffect(() => {
    // Create a function to open contact info
    window.openFooterContact = () => {
      setShowContact(true);
      
      // Add highlight effect
      setIsHighlighted(true);
      
      // Remove highlight after 2 seconds
      setTimeout(() => {
        setIsHighlighted(false);
      }, 2000);
      
      // Scroll to footer
      const footer = document.querySelector('footer');
      if (footer) {
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
        const scrollPosition = footer.offsetTop - navbarHeight - 2;
        
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }
    };
    
    // Cleanup
    return () => {
      delete window.openFooterContact;
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
      const target = event.target;
      if (target instanceof Element && !target.closest('a[href="#"]') && !target.closest('.contact-info')) {
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

  // Create footer links from navbar items
  const footerLinks = {
    product: [
      { name: "Benefits", url: "#benefits", id: "benefits" },
      { name: "Proof", url: "#proof", id: "proof" },
      { name: "How It Works", url: "#how-it-works", id: "how-it-works" },
      { name: "Pricing", url: "#pricing", id: "pricing" },
    ],
    company: [
      { name: "About Us", url: "#about", id: "about" },
      { name: "FAQs", url: "#faq", id: "faq" },
      { name: "Contact", url: "#", id: "" }
    ],
  };

  return (
    <footer className="bg-accent pt-12 pb-6 border-t">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Company info */}
          <div className="md:col-span-5">
            <div className="mb-4">
              <div className="flex items-center">
                <img
                  src={logoUrl}
                  alt="ConversAILabs Logo"
                  className="h-8 mr-2"
                  onError={(e) => {
                    console.log('Image failed to load, suppressing error');
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-2xl font-bold text-black">{companyName}</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your partner in AI-powered voice solutions that help businesses never miss a lead and book more meetings automatically.
            </p>
            <div className="flex space-x-4">
              {/* Social icons */}
              <a 
                href="https://www.linkedin.com/company/conversailabs/posts/?feedView=all" 
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5 mr-2" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Product links */}
              <div>
                <h3 className="font-semibold mb-3">Product</h3>
                <ul className="space-y-3">
                  {footerLinks.product.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.url} 
                        className="text-muted-foreground hover:text-primary transition-colors"
                        onClick={(e) => link.id ? handleSectionClick(e, link.id) : null}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Company links */}
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.url} 
                        className={`text-muted-foreground hover:text-primary transition-colors ${
                          link.name === "Contact" && isHighlighted ? "text-primary font-medium" : ""
                        }`}
                        onClick={(e) => link.id ? handleSectionClick(e, link.id) : 
                          link.name === "Contact" ? toggleContactInfo(e) : null}
                        id={link.name === "Contact" ? "footer-contact-link" : ""}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                  {showContact && (
                    <li className="pl-0 pt-2 space-y-2 contact-info">
                      <div className={`${isHighlighted ? "bg-primary/5 p-4 rounded-md border border-primary/20 transition-all duration-500 w-full sm:min-w-64" : "pl-4"}`}>
                        <div className="flex items-center text-muted-foreground mb-3">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{phoneNumber}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Mail className="h-4 w-4 mr-2" />
                          <span>{emailAddress}</span>
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
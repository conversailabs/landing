'use client';

import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const companyName = 'ConversAILabs';
  const emailAddress = 'dev@conversailabs.com';

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
                <a href="#about" className="text-muted-foreground hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact
                </a>
              </li>
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
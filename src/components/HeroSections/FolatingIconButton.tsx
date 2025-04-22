'use client';

import React, { useState } from 'react';
import { Phone, X } from 'lucide-react';

interface FloatingIconButtonProps {
  onClick: () => void;
  isOpen?: boolean;
}

const FloatingIconButton: React.FC<FloatingIconButtonProps> = ({ 
  onClick, 
  isOpen = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-40 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
        isOpen 
          ? 'bg-muted hover:bg-muted/90 h-10 w-10'
          : isHovered 
            ? 'bg-primary hover:bg-primary/90 h-14 w-14 md:w-auto md:px-4 md:pr-6'
            : 'bg-primary hover:bg-primary/90 h-14 w-14'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={isOpen ? "Close form" : "Get early access"}
    >
      {isOpen ? (
        <X className="h-5 w-5 text-foreground" />
      ) : (
        <div className="flex items-center">
          <Phone className="h-6 w-6 text-primary-foreground flex-shrink-0" />
          {isHovered && (
            <span className="hidden md:block text-primary-foreground font-medium ml-2 whitespace-nowrap text-transition">
              Get Early Access
            </span>
          )}
        </div>
      )}
    </button>
  );
};

export default FloatingIconButton;
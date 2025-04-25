'use client';

import { useEffect } from 'react';

// Define proper types for the Facebook Pixel
type FbqEvent = 'LandingPageView' | string;

interface FbqFunction {
  (action: 'init', pixelId: string): void;
  (action: 'track', event: FbqEvent, params?: Record<string, any>): void;
  callMethod?: (...args: any[]) => void;
  queue?: any[][];
  push?: (...args: any[]) => void;
  loaded?: boolean;
  version?: string;
}

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

export default function FacebookPixel() {
     // Get Pixel ID from environment variable 
     const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  useEffect(() => {
    // Skip if already initialized
    if (window.fbq) return;
    
    // Skip in development environment unless specifically enabled
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_ANALYTICS_IN_DEV !== 'true') {
      console.log('Facebook Pixel disabled in development environment');
      return;
    }
    
   
    
    try {
      const f = window;
      const b = document;
      const e = 'script';
      const v = 'https://connect.facebook.net/en_US/fbevents.js';
      
      // Create the fbq function
      const n = function(...args: any[]) {
        if (n.callMethod) {
          n.callMethod.apply(n, args);
        } else {
          (n.queue ?? []).push(args);
        }
      } as FbqFunction;
      
      n.queue = [];
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      
      // Assign to window
      f.fbq = n;
      f._fbq = n;
      
      // Create script element
      const scriptElement = b.createElement(e);
      scriptElement.async = true;
      scriptElement.src = v;
      
      // Add error handling
      scriptElement.onerror = () => {
        console.error('Failed to load Facebook Pixel script');
      };
      
      // Find existing script or append to head
      const firstScript = b.getElementsByTagName(e)[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(scriptElement, firstScript);
      } else {
        b.head.appendChild(scriptElement);
      }
      
      // Initialize the pixel
      if (pixelId) {
        f.fbq('init', pixelId);
      } else {
        console.error('Facebook Pixel ID is not defined');
      }
      f.fbq('track', 'PageView');
      
      console.log('Facebook Pixel initialized successfully');
    } catch (error) {
      console.error('Error initializing Facebook Pixel:', error);
    }
  }, []);

  
  // Return the noscript fallback with proper accessibility
  return (
    <noscript>
      <img 
        height="1" 
        width="1" 
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        alt="Facebook Pixel" 
        aria-hidden="true" 
      />
    </noscript>
  );
}
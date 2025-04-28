'use client';

import { useEffect } from 'react';

// Define proper types for the Facebook Pixel
type FbqEvent = 'PageView' | 'LandingPageView' | string;

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
    fbPixelInitialized?: Record<string, boolean>; // Track initialized pixel IDs
  }
}

export default function FacebookPixel() {
  // Get Pixel ID from environment variable 
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  useEffect(() => {
    // Skip if no pixel ID
    if (!pixelId) {
      console.error('Facebook Pixel ID is not defined');
      return;
    }
    
    // Initialize tracking object if it doesn't exist
    if (!window.fbPixelInitialized) {
      window.fbPixelInitialized = {};
    }
    
    // Check if this specific pixel ID has already been initialized
    if (window.fbPixelInitialized[pixelId]) {
      console.log(`Facebook Pixel ID ${pixelId} already initialized, skipping`);
      return;
    }
    
    try {
      // Only create the fbq function if it doesn't exist
      if (!window.fbq) {
        window.fbq = function(...args) {
          if (window.fbq?.callMethod) {
            window.fbq.callMethod.apply(window.fbq, args);
          } else {
            (window.fbq?.queue || []).push(args);
          }
        } as FbqFunction;
        
        window.fbq.queue = [];
        window.fbq.push = window.fbq;
        window.fbq.loaded = true;
        window.fbq.version = '2.0';
        window._fbq = window.fbq;
        
        // Load the Facebook Pixel script ONLY if it hasn't been loaded
        if (!document.getElementById('facebook-pixel-script')) {
          const script = document.createElement('script');
          script.id = 'facebook-pixel-script';
          script.async = true;
          script.src = 'https://connect.facebook.net/en_US/fbevents.js';
          script.onerror = () => console.error('Failed to load Facebook Pixel script');
          document.head.appendChild(script);
        }
      }
      
      // Initialize this specific pixel ID if it's not already initialized
      if (!window.fbPixelInitialized[pixelId]) {
        window.fbq('init', pixelId);
        window.fbPixelInitialized[pixelId] = true;
        console.log(`Facebook Pixel ID ${pixelId} initialized successfully`);
      }
      
      // Only track PageView once
      window.fbq('track', 'PageView');
      
    } catch (error) {
      console.error('Error initializing Facebook Pixel:', error);
    }
    
  }, [pixelId]);

  // Return the noscript fallback with proper accessibility
  return pixelId ? (
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
  ) : null;
}
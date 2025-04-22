'use client';

import React from 'react';

const KeyFeaturesSection = () => {
  const features = [
    {
      title: 'Natural Voice Conversations',
      description:
        'Realistic, human-like voices with emotion, tone, and multilingual support.',
   
    },
    {
      title: '24/7 Availability',
      description:
        'Never miss a call or opportunity—your voice agent works around the clock.',
     
    },
    {
      title: 'Fully Customizable Scripts',
      description:
        'Design flows specific to your business needs—no coding required.',
    
    },
    {
      title: 'Analytics & Call Summaries',
      description:
        'Track interactions, extract insights, and monitor customer satisfaction.',
    
    },
    {
      title: 'CRM & Calendar Integration',
      description:
        'Seamless syncing with Salesforce, HubSpot, Google Calendar, and more.',
  
    },
    {
      title: 'AI-Powered Adaptive Dialogues',
      description:
        'Voice agents that learn, adapt, and respond intelligently in real time.',
      
    },
    {
      title: 'Secure & Compliant',
      description:
        'Enterprise-grade encryption, GDPR & HIPAA compliance, role-based access.',
   
    },
    {
      title: 'Plug-and-Play Setup',
      description: 'Get started in minutes with easy onboarding and support.',
      
    },
  ];

  return (
    <div id="features" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">
         Key Features
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            padding: '1rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '1rem',
            boxShadow: '0 0 10px rgba(0,0,0,0.05)',
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                padding: '1rem',
                backgroundColor: '#fff',
                borderRadius: '0.75rem',
                boxShadow: '0 0 5px rgba(0,0,0,0.08)',
              }}
            >
              <div className="flex items-start mb-2">
                <div className="min-w-8 h-8 mr-3 flex items-center justify-center">
                  <span className="text-purple-600 opacity-60 text-sm">●</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyFeaturesSection;
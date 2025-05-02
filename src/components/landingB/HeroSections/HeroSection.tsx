import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import VoiceAISaaSForm from '@/components/landingB/HeroSections/VoiceAISaaSForm'; // Adjust the import path as necessary

const HeroSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]); // Fixed type to NodeJS.Timeout[]
  const transcriptContainerRef = useRef<HTMLDivElement | null>(null);
  const startTimeRef = useRef<number>(0);

  // Transcript data with timestamps
  const transcriptSegments = [
    { text: "Agent: Hi there! This is Maria from Convers AI labs. May I know you name please?", time: 0 },
    { text: "User: Yeah. Sure. My name is Danu.", time: 5000 },
    { text: "Agent: Great to connect with you, Danu! How are you doing today?", time: 8000 },
    { text: "User: I'm doing great.", time: 12000 },
    { text: "Agent: Glad to hear that! So, umm, I'm reaching out because you showed interest in our AI voice agents that can automate conversations while keeping that human touch your customers expect. Is now a good time to chat about how we might help your business?", time: 14000 },
    { text: "User: Yeah. Yeah. Sure.", time: 27000 },
    { text: "Agent: Awesome! To better understand your needs, could you tell me what industry your business is in?", time: 29000 },
    { text: "User: Yeah. It's in health care.", time: 35000 },
    { text: "Agent: Got it, healthcare! And what's the name of your company, Danu?", time: 38000 },
    { text: "User: Well, it's called teeth and teeth.", time: 42000 },
    { text: "Agent: Thanks! Teeth and Teeth - I'll make a note of that. So, what kind of use case are you looking for? We offer services like new lead qualification both inbound and outbound with appointment scheduling, old lead reactivation, or customer service automation. Or maybe something else?", time: 46000 },
    { text: "User: Oh, yeah. I'm I'm looking for, like, a receptionist so that it check my schedule and then if a new customer is coming oh, sorry. A new patient and all of that.", time: 61000 },
    { text: "Agent: That sounds like a great use case! So, you're looking for customer service automation, particularly for scheduling and managing new patients. Have you tried any AI voice systems or similar solutions before?", time: 74000 },
    { text: "User: No.", time: 86000 },
    { text: "Agent: Thanks for sharing that! And roughly how many calls are you expecting to handle monthly with our system?", time: 88000 },
    { text: "User: Uh, about fifty", time: 94000 },
    { text: "Agent: That sounds manageable! So, our pricing begins at $99 per month, which includes 500 minutes, so you should be well covered. And actually, for new customers like you, we're offering the first three months at just $69 per month. There's a one-time setup fee of $99, and we typically take about five to ten working days to create your custom voice AI bot. Our package also includes CRM integration, calendar integration, and comprehensive analytics with call summaries.Does that sound good to you?", time: 101000 },
    { text: "User: That that that does sound good.", time: 132000 },
    { text: "Agent: Great to hear that, Danu! Could I get your email address? We'll send you more detailed information within the next 24 hours. And is there anything specific you'd like us to address in our follow-up?", time: 136000 },
    { text: "User: Not really.", time: 147000 },
    { text: "Agent: Alright! And", time: 148000 },
    { text: "User: (inaudible speech)", time: 149000 },
    { text: "Agent: what's your email address, Danu? I'll make sure to send you the information.", time: 149000 },
    { text: "User: So my email address is teeth and teeth one zero one at g mail dot com.", time: 154000 },
    { text: "Agent: Got it! Just to confirm, that's teeth and teeth one zero one at g mail dot com. Is that correct?", time: 161000 },
    { text: "User: Yeah. Yeah. Yeah.", time: 167000 },
    { text: "Agent: Perfect! Thanks for confirming that, Danu. So, just to recap, we'll send you more information about our AI voice agents, and we're excited about the possibility of working with Teeth and Teeth to help streamline your patient scheduling process!Thank you for your time today, and have a great rest of your day!", time: 170000 },
    { text: "User: Thank you.", time: 188000 }
  ];

  useEffect(() => {
    audioRef.current = new Audio("https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/public/demo-audios//CoversAILabs.mp3");
    
    // Track current time in audio
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime * 1000); // Convert to ms to match transcript timing
      }
    };
    
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }
    
    // Clean up audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
    
    // Add ended event listener to reset when audio finishes
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    };
    
    audioRef.current.addEventListener('ended', handleEnded);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [isPlaying]);

  // Handle transcript timing and auto-scrolling based on currentTime
  useEffect(() => {
    // Clear existing timers when play state changes
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];
    
    if (!isPlaying) {
      return;
    }
    
    // If starting playback, determine which transcript segments should be shown
    const currentSegments = transcriptSegments.filter(segment => segment.time <= currentTime);
    
    // Build initial transcript based on current time
    if (currentSegments.length > 0) {
      const initialTranscript = currentSegments.map(seg => seg.text).join('\n\n');
      setCurrentTranscript(initialTranscript);
      
      // Scroll to bottom to show latest segment
      setTimeout(() => {
        if (transcriptContainerRef.current) {
          transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
        }
      }, 100);
    } else {
      setCurrentTranscript('');
    }
    
    // Set up timers for future segments based on current time
    const remainingSegments = transcriptSegments.filter(segment => segment.time > currentTime);
    startTimeRef.current = Date.now() - currentTime;
    
    // Set up new timers for remaining transcript segments
    timersRef.current = remainingSegments.map(segment => {
      const adjustedDelay = segment.time - currentTime;
      
      return setTimeout(() => {
        setCurrentTranscript(prev => prev + (prev ? '\n\n' : '') + segment.text);
        
        // Auto-scroll to the bottom after content updates
        setTimeout(() => {
          if (transcriptContainerRef.current) {
            transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
          }
        }, 100);
      }, adjustedDelay);
    });
    
    // Clear timers on cleanup
    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer));
    };
  }, [isPlaying, currentTime]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play()
          .catch(error => {
            console.error("Error playing audio:", error);
          });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative pt-32 pb-28 md:pt-40 lg:pt-32 md:pb-36 bg-gradient-to-br from-white via-accent/50 to-accent overflow-hidden">
      <div className="container px-6 md:px-8 mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-12 xl:space-x-16">
          {/* Left side content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-16 lg:mb-0 p-4 md:p-8">
            <div className="relative mx-auto lg:mx-0 max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8 animate-fade-in-down">
              Never Miss A Call —
              <span className="gradient-text" style={{ fontSize: '0.8em' }}>24/7 AI Receptionist</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Our AI answers calls 24/7, engages prospects naturally, and books meetings directly in your calendar while you focus on closing deals.
              </p>
              
              {/* Form component */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-5 sm:space-y-0 sm:space-x-5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <VoiceAISaaSForm />
              </div>
            </div>
          </div>
          
          {/* Right side audio visualization and transcript */}
          <div className="w-full lg:w-1/2 relative animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="relative mx-auto w-full max-w-md">
              {/* Background blur effects with increased size and spread */}
              <div className="absolute top-0 -left-8 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
              <div className="absolute top-0 -right-8 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute -bottom-12 left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '4s' }}></div>
              
              <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex space-x-3">
                    <div className="w-3.5 h-3.5 bg-red-500 rounded-full"></div>
                    <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full"></div>
                    <div className="w-3.5 h-3.5 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm font-medium text-gray-500">ConversAI Voice Assistant</div>
                </div>
                
                {/* Voice wave visualization with increased height */}
                <div className="flex items-center justify-center h-20 mb-6 relative">
                  <div className={`absolute inset-0 flex items-center justify-center ${isPlaying ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                    <div className="flex items-end space-x-1.5">
                      {Array.from({ length: 12 }).map((_, i) => {
                        // Use fixed values rather than random calculations
                        const heightValues = [40, 60, 45, 70, 55, 65, 50, 75, 40, 60, 50, 45];
                        const opacityValues = [0.6, 0.7, 0.5, 0.8, 0.7, 0.9, 0.6, 0.8, 0.5, 0.7, 0.6, 0.5];
                        
                        return (
                          <div 
                            key={i} 
                            className="w-2.5 bg-primary rounded-full animate-pulse" 
                            style={{ 
                              height: `${heightValues[i]}%`,
                              animationDelay: `${i * 0.05}s`,
                              opacity: opacityValues[i]
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                  <Button 
                    onClick={toggleAudio} 
                    size="sm" 
                    variant="outline" 
                    className="rounded-full h-14 w-14 p-0 z-10 bg-white shadow-md"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </Button>
                </div>
                
                {/* Transcript area with increased height */}
                <div 
                  ref={transcriptContainerRef}
                  className="bg-gray-50 rounded-lg p-5 h-72 overflow-y-auto"
                >
                  {currentTranscript ? (
                    <div className="space-y-5">
                      {currentTranscript.split('\n\n').map((text, i) => {
                        const isAgent = text.startsWith('Agent:');
                        return (
                          <div key={i} className="flex items-start animate-fade-in-up" style={{ animationDelay: `${i * 0.3}s` }}>
                            <div className={`rounded-lg p-4 ${isAgent ? 'bg-primary/10 mr-auto' : 'bg-gray-200 ml-auto'} max-w-[85%]`}>
                              <p className="text-sm">{text}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      <p>{isPlaying ? "Listening..." : "Press play to hear our AI voice assistant"}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Divider with increased height */}
      <div className="wave-divider mt-16">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
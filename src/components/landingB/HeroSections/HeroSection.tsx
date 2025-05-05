import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import VoiceAISaaSForm from '@/components/landingB/HeroSections/VoiceAISaaSForm'; // Adjust the import path as necessary

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const initialTranscript = [
    "Agent: Hi there! This is Maria from Convers AI labs. May I know you name please?",
    "User: Yeah. Sure. My name is Danu."
  ].join('\n\n');
  const [currentTranscript, setCurrentTranscript] = useState(initialTranscript);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const transcriptContainerRef = useRef<HTMLDivElement | null>(null);
  const startTimeRef = useRef(0);

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
    { text: "Agent: Perfect! Thanks for confirming that, Danu. So, just to recap, we'll send you more information about our AI voice agents, and we're excited about the possibility of working with Teeth and Teeth to help streamline your patient scheduling process! Thank you for your time today, and have a great rest of your day!", time: 170000 },
    { text: "User: Thank you.", time: 188000 }
  ];

  // Calculate total duration
  const totalDuration = transcriptSegments[transcriptSegments.length - 1].time;

  // Audio initialization with loading state
  useEffect(() => {
    audioRef.current = new Audio("https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/public/demo-audios//CoversAILabs.mp3");
    
    // Set loading state
    audioRef.current.addEventListener('loadeddata', () => {
      setLoading(false);
    });
    
    // Track current time in audio
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const currentMs = audioRef.current.currentTime * 1000;
        setCurrentTime(currentMs);
        setProgress((currentMs / totalDuration) * 100);
      }
    };
    
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    
    // Clean up audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadeddata', () => {});
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [totalDuration]);

  // Toggle mute function
  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  // Handle play/pause with improved error handling
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback started successfully
          })
          .catch(error => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
            
            // Show user-friendly error message
            if (error.name === 'NotAllowedError') {
              alert('Please enable autoplay in your browser settings or interact with the page first.');
            }
          });
      }
    } else {
      audioRef.current.pause();
    }
    
    // Add ended event listener to reset when audio finishes
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
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
   // If this is initial render and we have the default transcript, scroll to bottom
   if (!isPlaying && currentTranscript === initialTranscript && transcriptContainerRef.current) {
    setTimeout(() => {
      if (transcriptContainerRef.current) {
        transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
      }
    }, 100);
    return;
  }
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

  // Handle progress bar click for seeking
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || loading) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    
    // Calculate new time in ms
    const newTimeMs = clickPosition * totalDuration;
    
    // Update audio element time
    audioRef.current.currentTime = newTimeMs / 1000;
    setCurrentTime(newTimeMs);
    setProgress(clickPosition * 100);
    
    // Update transcript
    const currentSegments = transcriptSegments.filter(segment => segment.time <= newTimeMs);
    if (currentSegments.length > 0) {
      const newTranscript = currentSegments.map(seg => seg.text).join('\n\n');
      setCurrentTranscript(newTranscript);
    } else {
      setCurrentTranscript('');
    }
    
    // Reset and setup timers again if playing
    if (isPlaying) {
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];
      
      const remainingSegments = transcriptSegments.filter(segment => segment.time > newTimeMs);
      
      timersRef.current = remainingSegments.map(segment => {
        const adjustedDelay = segment.time - newTimeMs;
        
        return setTimeout(() => {
          setCurrentTranscript(prev => prev + (prev ? '\n\n' : '') + segment.text);
          
          setTimeout(() => {
            if (transcriptContainerRef.current) {
              transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
            }
          }, 100);
        }, adjustedDelay);
      });
    }
  };

  // Reset transcript when audio starts playing from the beginning
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // If we're at the beginning (or close to it), reset transcript to show all
        if (currentTime < 100) {
          const currentSegments = transcriptSegments.filter(segment => segment.time <= currentTime);
          if (currentSegments.length > 0) {
            const initialTranscript = currentSegments.map(seg => seg.text).join('\n\n');
            setCurrentTranscript(initialTranscript);
          }
        }
        
        audioRef.current.play()
          .catch(error => {
            console.error("Error playing audio:", error);
          });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
 // Handle auto-scrolling on initial load
 useEffect(() => {
  // Auto-scroll to the bottom after initial render
  if (transcriptContainerRef.current) {
    transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
  }
}, []);

  // Format time function (mm:ss)
  const formatTime = (timeMs: number) => {
    const totalSeconds = Math.floor(timeMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const totalTimeFormatted = formatTime(totalDuration);
  const currentTimeFormatted = formatTime(currentTime);

  return (
    <section className="relative pt-32 pb-28 md:pt-40 lg:pt-32 md:pb-36 bg-gradient-to-br from-white via-accent/50 to-accent overflow-hidden">
      <div className="container px-6 md:px-8 mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-12 xl:space-x-16">
          {/* Left side content - KEEPING ORIGINAL */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-16 lg:mb-0 p-4 md:p-8">
            <div className="relative mx-auto lg:mx-0 max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8 animate-fade-in-down">
              Never Miss A Call —
              <span className="gradient-text" style={{ fontSize: '0.8em' }}> 24/7 AI Receptionist</span>
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
          <div className="w-full lg:w-1/2 relative animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="relative mx-auto w-full max-w-md">
              {/* Background blur effects */}
              <div className="absolute top-0 -left-8 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
              <div className="absolute top-0 -right-8 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute -bottom-12 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '4s' }}></div>
              
              <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm font-medium text-gray-500">ConversAI Labs Voice Assistant</div>
                </div>
                
                {/* Transcript area */}
                <div 
                  ref={transcriptContainerRef}
                  className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto"
                >
                  {currentTranscript ? (
                    <div className="space-y-4">
                      {currentTranscript.split('\n\n').map((text, i) => {
                        const isAgent = text.startsWith('Agent:');
                        return (
                          <div key={i} className={`flex items-start ${isAgent ? 'justify-start' : 'justify-end'} animate-fade-in-up`} style={{ animationDelay: `${i * 0.2}s` }}>
                            {isAgent && (
                              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-1">
                                <span className="text-xs font-medium text-primary">AI</span>
                              </div>
                            )}
                            <div className={`rounded-lg p-3 max-w-[85%] ${isAgent ? 'bg-primary/10 text-gray-800' : 'bg-gray-200 text-gray-700'}`}>
                              <p className="text-sm">{isAgent ? text.replace('Agent: ', '') : text.replace('User: ', '')}</p>
                            </div>
                            {!isAgent && (
                              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ml-2 mt-1">
                                <span className="text-xs font-medium text-gray-600">U</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      <p>{loading ? "Loading audio demo..." : isPlaying ? "Listening..." : "Press play to hear our AI voice assistant in action"}</p>
                    </div>
                  )}
                </div>
                
                {/* Progress bar with elapsed time */}
                <div className="mb-4">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                    <span>{currentTimeFormatted}</span>
                    <span>{totalTimeFormatted}</span>
                  </div>
                  <div 
                    className="h-2 w-full bg-gray-200 rounded-full cursor-pointer relative overflow-hidden"
                    onClick={handleProgressClick}
                  >
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Voice wave visualization */}
                <div className="flex items-center justify-center h-16 mb-6 relative">
                  <div className={`absolute inset-0 flex items-center justify-center ${isPlaying ? 'opacity-100' : 'opacity-50'} transition-opacity duration-300`}>
                    <div className="flex items-end space-x-1">
                      {Array.from({ length: 12 }).map((_, i) => {
                        // Fixed but varied heights for wave bars
                        const heightValues = [40, 60, 45, 70, 55, 65, 50, 75, 40, 60, 50, 45];
                        const animationDelays = [0, 0.1, 0.2, 0.15, 0.25, 0.1, 0.2, 0.15, 0.25, 0.1, 0.2, 0.15];
                        
                        return (
                          <div 
                            key={i} 
                            className={`w-2 bg-primary rounded-full ${isPlaying ? 'animate-pulse' : ''}`} 
                            style={{ 
                              height: `${heightValues[i]}%`,
                              animationDelay: `${animationDelays[i]}s`,
                              opacity: isPlaying ? 0.8 : 0.5
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 z-10">
                    {/* Play/Pause Button */}
                    <Button 
                      onClick={toggleAudio} 
                      disabled={loading}
                      className="rounded-full h-8 w-8 p-0 bg-white shadow-md hover:bg-gray-50 border-2 border-primary"
                    >
                      {loading ? (
                        <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                      ) : isPlaying ? (
                        <Pause className="h-4 w-4 text-primary" />
                      ) : (
                        <Play className="h-4 w-4 text-primary" />
                      )}
                    </Button>
                    
                    {/* Mute Button */}
                    <Button 
                      onClick={toggleMute} 
                      disabled={loading}
                      variant="outline"
                      className="rounded-full h-8 w-8 p-0 bg-white shadow-sm hover:bg-gray-50"
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* Call-to-action */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500 mb-2">Experience how our AI handles real conversations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="wave-divider mt-12">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
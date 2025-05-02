 'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ClipboardList,
  Headphones,
  FileText,
  DollarSign,
  Play,
  Pause,
  User,
  PhoneOff,
  Users,
  Phone,
  Volume2,
  VolumeX,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';
import { getAudioUrl } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Import the countries data
import countries from '@/data/countries.json';


// Define audio file paths
const AUDIO_FILES = {
  receptionist: 'receptionist.mp3',
  survey: 'survey.mp3',
  education: 'education.mp3',
  leadQualification: 'lead qualification.mp3',
  interviewer: 'interviewer.mp3',
  ecommerce: 'ecommerce.mp3',
};

const FALLBACK_AUDIO_URLS = {
  receptionist:
    'https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/public/demo-audios/receptionist.mp3',
  survey:
    'https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/public/demo-audios/survey.mp3',
  education:
    'https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/public/demo-audios/education.mp3',
  leadQualification:
    'https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/public/demo-audios/lead%20qualification.mp3',
  interviewer:
    'https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/public/demo-audios/interviewer.mp3',
  ecommerce:
    'https://kbwtnhujnskomqwryfhy.supabase.co/storage/v1/object/public/demo-audios/ecommerce.mp3',
};

// Audio Type Checker
const checkAudioCompatibility = (url: string): Promise<boolean> => {
  const audio = new Audio();
  return new Promise((resolve) => {
    audio.oncanplaythrough = () => resolve(true);
    audio.onerror = () => resolve(false);
    audio.src = url;
  });
};

// Type definitions
type AudioKey = keyof typeof AUDIO_FILES;

interface UseCase {
  title: string;
  icon: LucideIcon;
  animation: string;
  audioKey: AudioKey;
  image: string;
  outboundNumber?: string;
  outboundAgentID?: string;
  color: string;
  gradient: string;
}

// Use case descriptions for better content
const USE_CASE_DESCRIPTIONS: Record<string, string> = {
  'Receptionist': 
    "Our AI receptionist handles calls 24/7, schedules appointments, and answers routine questions with natural conversation flow.",
  'Lead Qualification': 
    "Qualify leads at scale with our AI assistant that asks targeted questions and captures vital information for your sales team.",
  'Survey': 
    "Boost response rates with our conversational AI surveys that adapt to user responses and collect deeper insights.",
  'Education': 
    "Provide personalized learning support with our AI educational assistant that answers questions and guides students.",
  'Interviewer': 
    "Conduct consistent preliminary interviews at scale to efficiently screen candidates before human interviews.",
  'E-commerce': 
    "Increase conversions with our AI shopping assistant that helps customers find products and complete purchases."
};

// Key benefits for each use case
const USE_CASE_BENEFITS: Record<string, string[]> = {
  'Receptionist': ["24/7 Availability", "60% Reduced Wait Times", "100% Call Coverage"],
  'Lead Qualification': ["3x More Leads Processed", "90% Qualification Accuracy", "Instant Routing"],
  'Survey': ["40% Higher Completion Rate", "Rich Qualitative Data", "Real-time Analysis"],
  'Education': ["Personalized Learning", "Instant Feedback", "Multilingual Support"],
  'Interviewer': ["Consistent Evaluation", "Bias Reduction", "Time Savings"],
  'E-commerce': ["2x Conversion Rate", "Reduced Cart Abandonment", "Customer Insights"]
};

const UseCasesSection: React.FC = () => {
  const { toast } = useToast();
  
  // Update the colors to be professional and consistent with light theme
  const useCases: UseCase[] = [
    {
      title: 'Receptionist',
      icon: User,
      animation: '/animations/receptionist.json',
      audioKey: 'receptionist',
      image:
        'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=1170&auto=format&fit=crop',
      outboundNumber: '+16812011361',
      outboundAgentID: 'agent_df655e2fd4ec6291863068597c',
      color: 'bg-purple-600',
      gradient: 'from-purple-50 to-purple-100',
    },
    {
      title: 'Lead Qualification',
      icon: ClipboardList,
      animation: '/animations/lead-qualification.json',
      audioKey: 'leadQualification',
      image:
        'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1170&auto=format&fit=crop',
      color: 'bg-blue-600',
      gradient: 'from-blue-50 to-blue-100',
    },
    {
      title: 'Survey',
      icon: FileText,
      animation: '/animations/survey.json',
      audioKey: 'survey',
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1170&auto=format&fit=crop',
      color: 'bg-green-600',
      gradient: 'from-green-50 to-green-100',
    },
    {
      title: 'Education',
      icon: Headphones,
      animation: '/animations/customer-service.json',
      audioKey: 'education',
      image:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1074&auto=format&fit=crop',
      color: 'bg-amber-600',
      gradient: 'from-amber-50 to-amber-100',
    },
    {
      title: 'Interviewer',
      icon: Users,
      animation: '/animations/debt-collection.json',
      audioKey: 'interviewer',
      image:
        'https://images.unsplash.com/photo-1560439513-74b037a25d84?q=80&w=1170&auto=format&fit=crop',
      color: 'bg-indigo-600',
      gradient: 'from-indigo-50 to-indigo-100',
    },
    {
      title: 'E-commerce',
      icon: DollarSign,
      animation: '/animations/debt-collection.json',
      audioKey: 'ecommerce',
      image:
        'https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=1170&auto=format&fit=crop',
      color: 'bg-rose-600',
      gradient: 'from-rose-50 to-rose-100',
    },
  ];

  const [currentUseCase, setCurrentUseCase] = useState<UseCase>(useCases[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [showVolume, setShowVolume] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState(countries.find((c) => c.code === 'US'));
  const [callStatus, setCallStatus] = useState<string>('');
  const [isInCall, setIsInCall] = useState<boolean>(false);
  const [callError, setCallError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isCallingAPI, setIsCallingAPI] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Load audio for the current use case
  useEffect(() => {
    const loadAudio = async () => {
      if (!audioRef.current || !currentUseCase) return;

      const audio = audioRef.current;
      setIsLoading(true);
      setAudioError(false);
      setProgress(0);

      // Pause current playback if any
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      }

      try {
        const audioKey = currentUseCase.audioKey;

        if (!audioKey) {
          console.error(`No audio key found for use case: ${currentUseCase.title}`);
          setAudioError(true);
          setIsLoading(false);
          return;
        }

        let url = '';

        // Try to get a fresh signed URL first
        try {
          const filePath = AUDIO_FILES[audioKey];
          const dynamicUrl = await getAudioUrl(filePath);

          if (dynamicUrl) {
            url = dynamicUrl;
          } else {
            url = FALLBACK_AUDIO_URLS[audioKey];
          }
        } catch (error) {
          console.warn('Failed to get dynamic URL, using fallback:', error);
          url = FALLBACK_AUDIO_URLS[audioKey];
        }

        if (!url) {
          console.error(`No audio URL available for: ${audioKey}`);
          setAudioError(true);
          setIsLoading(false);
          return;
        }

        // Check if the audio can be played
        const isCompatible = await checkAudioCompatibility(url);

        if (!isCompatible) {
          console.error(`Audio format not supported or URL not accessible: ${url}`);
          setAudioError(true);
          setIsLoading(false);
          return;
        }

        // Set the audio source
        setAudioUrl(url);
        audio.src = url;

        // Set up event listeners
        const canPlayHandler = () => {
          setIsLoading(false);
        };

        audio.addEventListener('canplaythrough', canPlayHandler);
        audio.load();

        return () => {
          audio.removeEventListener('canplaythrough', canPlayHandler);
        };
      } catch (error) {
        console.error('Error setting up audio:', error);
        setAudioError(true);
        setIsLoading(false);
      }
    };

    loadAudio();
  }, [currentUseCase]);

  // Set up event listeners for the audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Add event listeners
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
    
    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setAudioError(true);
      setIsPlaying(false);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Clean up event listeners
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Handle play/pause state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    if (isPlaying && !isLoading) {
      // Try to play the audio
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Start tracking progress
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current);
            }
            
            progressIntervalRef.current = setInterval(() => {
              if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
              }
            }, 100);
          })
          .catch((error) => {
            console.error('Failed to play audio:', error);
            setAudioError(true);
            setIsPlaying(false);
          });
      }
    } else {
      // Pause the audio
      audio.pause();
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }
  }, [isPlaying, isLoading, audioUrl]);

  // Handle volume changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const handleUseCaseClick = (useCase: UseCase) => {
    if (currentUseCase.title !== useCase.title) {
      setCurrentUseCase(useCase);
      if (isInCall) {
        endCallHandler();
      }
    }
  };

  const togglePlay = () => {
    if (isLoading || audioError || !audioUrl) return;
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and limit to reasonable length
    const value = e.target.value.replace(/\D/g, '').slice(0, 15);
    setPhoneNumber(value);
    
    // Clear any previous error
    if (phoneError) {
      setPhoneError('');
    }
  };

  const validatePhone = (): boolean => {
    if (!phoneNumber || phoneNumber.trim() === '') {
      setPhoneError('Phone number is required');
      return false;
    }
    
    // Basic validation for length
    if (phoneNumber.length < 6) {
      setPhoneError('Please enter a valid phone number');
      return false;
    }
    
    return true;
  };

  const startCallHandler = async () => {
    // Validate phone number
    if (!validatePhone()) {
      return;
    }
    
    // Format the phone number with country code
    const formattedPhone = `${selectedCountry?.dial_code}${phoneNumber}`;
    
    setCallStatus('Connecting...');
    setIsInCall(true);
    setCallError(null);
    setIsCallingAPI(true);
    
    try {
      // Show immediate feedback
      toast({
        title: 'Initiating call',
        description: `Setting up your ${currentUseCase.title} AI demo call...`,
      });
      
      // Make the actual API call
      const response = await axios.post('/api/make-call', {
        to_number: formattedPhone,
        call_type: 'ai',
        metadata: {
          number: formattedPhone,
          useCase: currentUseCase.title,
        },
        retell_llm_dynamic_variables: {
          number: formattedPhone,
          useCase: currentUseCase.title,
          current_time: new Date().toISOString(),
        }
      }, {
        timeout: 15000 // 15 seconds timeout
      });
      
      // Success handling
      if (response.status === 200 || response.status === 201) {
        setCallStatus(`Connected to AI ${currentUseCase.title}`);
        
        toast({
          title: 'Incoming AI call',
          description: `Watch your phone — your ${currentUseCase.title} AI demo is about to begin!`,
          duration: 5000,
        });
      }
    } catch (error: any) {
      // Error handling
      setIsInCall(false);
      
      let errorMessage = 'An unexpected error occurred';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'The call request is taking too long. Please try again later.';
      } else if (error.response?.data?.error?.message) {
        errorMessage = error.response.data.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setCallError(errorMessage);
      
      toast({
        title: 'Failed to send call',
        description: errorMessage,
        variant: 'destructive',
      });
      
    } finally {
      setIsCallingAPI(false);
    }
  };

  const endCallHandler = async () => {
    setCallStatus('Ending call...');
    setIsInCall(false);

    // Clear call status after a delay
    setTimeout(() => {
      setCallStatus('Call ended');

      setTimeout(() => {
        setCallStatus('');
        setPhoneNumber('');
        setCallError(null);
      }, 2000);
    }, 1000);
  };

  return (
    <section id="use-cases" className="py-12 sm:py-16 bg-gray-50 rounded-xl text-center w-full max-w-7xl mx-auto my-8 border border-gray-100">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-center text-gray-800">Experience ConversAI in Action</h2>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl">Select a use case below and listen to our AI agents in conversation, or try a live demo call.</p>
        
        <div className="flex flex-col lg:flex-row w-full gap-4 sm:gap-6 items-start">
          {/* Use Cases Grid - Now on left on larger screens */}
          <div className="w-full lg:w-2/5 order-1 lg:order-1 mb-6 lg:mb-0">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 sm:mb-4 text-left">Select a Use Case</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
              {useCases.map((useCase, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 sm:p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 h-full border ${
                    currentUseCase.title === useCase.title
                      ? `${useCase.color} text-white`
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleUseCaseClick(useCase)}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 ${
                    currentUseCase.title === useCase.title
                      ? 'bg-white/20'
                      : useCase.color.replace('bg-', 'bg-') + '/10'
                  }`}>
                    <useCase.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${currentUseCase.title === useCase.title ? 'text-white' : useCase.color.replace('bg-', 'text-')}`} />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-center">{useCase.title}</h3>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Demo Showcase Area - Now on right side with more prominence on larger screens */}
          <div className="w-full lg:w-3/5 order-2 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentUseCase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl overflow-hidden border border-gray-200 relative bg-white`}
                style={{ minHeight: '500px', height: 'auto' }} // Changed to auto height with min-height
              >
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={currentUseCase.image}
                    alt={currentUseCase.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentUseCase.gradient} opacity-60`}></div>
                </div>

                {/* Content Overlay */}
                <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 z-10 min-h-[500px]">
                  <motion.h2 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-gray-800"
                  >
                    {currentUseCase.title}
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-base sm:text-lg mb-4 sm:mb-6 max-w-lg text-gray-800 font-medium"
                  >
                    {USE_CASE_DESCRIPTIONS[currentUseCase.title]}
                  </motion.p>

                  {/* Key Benefits */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6"
                  >
                    {USE_CASE_BENEFITS[currentUseCase.title]?.map((benefit, index) => (
                      <span key={index} className="bg-white border border-gray-200 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {benefit}
                      </span>
                    ))}
                  </motion.div>

                  {/* Call Feature for All Use Cases */}
                  {!isInCall ? (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-col items-center gap-2 sm:gap-3 mt-2 bg-white border border-gray-300 p-3 sm:p-5 rounded-xl w-full max-w-sm z-20"
                    >
                      <h3 className="font-medium text-gray-700">Talk to Our {currentUseCase.title} AI</h3>
                      <div className="flex w-full max-w-xs">
                        <div className="relative flex items-center gap-2 w-full">
                          {/* Country Code Selector */}
                          <Select
                            value={selectedCountry?.code}
                            onValueChange={(code) => {
                              const country = countries.find((c) => c.code === code);
                              if (country) setSelectedCountry(country);
                            }}
                          >
                            <SelectTrigger className="w-24 sm:w-28 overflow-hidden">
                              <SelectValue>
                                <div className="flex items-center">
                                  <div className="w-5 h-3 sm:w-6 sm:h-4 relative mr-1 sm:mr-2 overflow-hidden rounded-sm border border-gray-200">
                                    <img 
                                      src={`https://flagcdn.com/w40/${selectedCountry?.code.toLowerCase()}.png`} 
                                      alt={selectedCountry?.name || "Flag"} 
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
                                  <span className="text-xs sm:text-sm truncate">{selectedCountry?.dial_code}</span>
                                </div>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="max-h-60 overflow-y-auto">
                              {countries.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                  <div className="flex items-center">
                                    <div className="w-5 h-3 sm:w-6 sm:h-4 relative mr-1 sm:mr-2 overflow-hidden rounded-sm border border-gray-200">
                                      <img 
                                        src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`} 
                                        alt={country.name} 
                                        className="object-cover w-full h-full"
                                      />
                                    </div>
                                    <span className="text-xs sm:text-sm">{country.dial_code}</span>
                                    <span className="ml-1 sm:ml-2 text-xs text-gray-500 truncate max-w-[100px]">({country.name})</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          {/* Phone Number Input */}
                          <input
                            type="text"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            className={`flex-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-l-none rounded-r-lg text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-${currentUseCase.color.replace('bg-', '')} text-sm ${phoneError ? 'border-red-500' : ''}`}
                          />
                        </div>
                      </div>
                      
                      {/* Error Message */}
                      {phoneError && (
                        <span className="text-xs text-red-600 self-start ml-2">
                          {phoneError}
                        </span>
                      )}
                      
                      {/* Call Button */}
                      <button
                        onClick={startCallHandler}
                        disabled={isCallingAPI}
                        className={`w-full flex items-center justify-center gap-1 ${currentUseCase.color} hover:opacity-90 transition-all text-white font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg text-sm ${
                          isCallingAPI ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isCallingAPI ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            <span>Connecting...</span>
                          </>
                        ) : (
                          <>
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Call Me</span>
                          </>
                        )}
                      </button>
                      
                      {/* Info Text */}
                      <p className="text-gray-500 text-xs mt-1">
                        Or listen to a sample conversation below
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center gap-2 sm:gap-3 mt-2 bg-white border border-gray-300 p-3 sm:p-5 rounded-xl w-full max-w-sm z-20"
                    >
                      <div className="text-center">
                        <h3 className="font-medium text-gray-700">Active Call</h3>
                        <p className="text-gray-600 text-sm">
                          {callStatus || `Connected to AI ${currentUseCase.title}`}
                        </p>
                      </div>
                      
                      {/* Animated wave to show call is active */}
                      <div className="w-full h-6 sm:h-8 flex items-center justify-center">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-1 mx-0.5 ${currentUseCase.color.replace('bg-', 'bg-')}/70 rounded-full`}
                            style={{
                              height: `${Math.max(5, Math.floor(Math.random() * 20))}px`,
                              animation: `wave 1s ease-in-out ${i * 0.1}s infinite alternate`
                            }}
                          ></div>
                        ))}
                      </div>
                      
                      <button
                        onClick={endCallHandler}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg flex items-center gap-1 text-sm w-full justify-center"
                      >
                        <PhoneOff className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>End Call</span>
                      </button>
                      
                      {/* Show the formatted phone number */}
                      <p className="text-gray-500 text-xs mt-1">
                        Call to: {selectedCountry?.dial_code}{phoneNumber}
                      </p>
                    </motion.div>
                  )}

                  {/* Audio Player Controls */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className={`mt-4 flex flex-col items-center ${isInCall ? 'hidden' : ''}`}
                  >
                    <div className="w-full max-w-xs bg-gray-300 rounded-full h-2 mb-4">
                      <div 
                        className={`h-2 rounded-full ${currentUseCase.color}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center gap-4 sm:gap-6">
                      {/* Volume Control */}
                      <div className="relative flex items-center">
                        <button
                          onClick={toggleMute}
                          onMouseEnter={() => setShowVolume(true)}
                          className="text-gray-700 hover:text-gray-900"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                        </button>
                        
                        {/* Volume Slider */}
                        {showVolume && (
                          <div 
                            onMouseLeave={() => setShowVolume(false)}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white border border-gray-200 p-2 rounded-lg w-20 sm:w-24"
                          >
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              value={volume}
                              onChange={handleVolumeChange}
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Play/Pause Button */}
                      <button
                        onClick={togglePlay}
                        disabled={isLoading || audioError}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${currentUseCase.color} hover:opacity-90 flex items-center justify-center transition-all`}
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : isPlaying ? (
                          <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 sm:ml-1" />
                        )}
                      </button>
                      
                      {/* Get Started Button */}
                      <a 
                        href="#contact" 
                        className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <span className="mr-1 text-xs sm:text-sm font-medium">Info</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* CSS for wave animation */}
      <style jsx>{`
        @keyframes wave {
          0% { height: 5px; }
          50% { height: 20px; }
          100% { height: 5px; }
        }
      `}</style>
      
      {/* Hidden audio element as fallback */}
      <audio style={{ display: 'none' }} controls={false} />
    </section>
  );
};

export default UseCasesSection;
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
} from 'lucide-react';
import { getAudioUrl } from '../lib/supabaseClient'; // Adjusted relative path

// Define audio file paths - these map to actual files in Supabase storage
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
const checkAudioCompatibility = (url: string) => {
  const audio = new Audio();
  return new Promise((resolve) => {
    audio.oncanplaythrough = () => resolve(true);
    audio.onerror = () => resolve(false);
    audio.src = url;
  });
};

interface UseCase {
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  animation: string;
  audioKey: string; // Key that maps to AUDIO_FILES
  image: string;
}

const UseCasesSection = () => {
  const useCases = [
    {
      title: 'Receptionist',
      icon: User,
      animation: '/animations/receptionist.json',
      audioKey: 'receptionist',
      image:
        'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=1170&auto=format&fit=crop',
      outboundNumber: '+16812011361',
      outboundAgentID: 'agent_df655e2fd4ec6291863068597c',
    },
    {
      title: 'Lead Qualification',
      icon: ClipboardList,
      animation: '/animations/lead-qualification.json',
      audioKey: 'leadQualification', // Using lead qualification audio
      image:
        'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1170&auto=format&fit=crop',
    },
    {
      title: 'Survey',
      icon: FileText,
      animation: '/animations/survey.json',
      audioKey: 'survey',
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1170&auto=format&fit=crop',
    },
    {
      title: 'Education',
      icon: Headphones,
      animation: '/animations/customer-service.json',
      audioKey: 'education',
      image:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1074&auto=format&fit=crop',
    },
    {
      title: 'Interviewer',
      icon: Users,
      animation: '/animations/debt-collection.json',
      audioKey: 'interviewer', // Using interviewer audio
      image:
        'https://images.unsplash.com/photo-1560439513-74b037a25d84?q=80&w=1170&auto=format&fit=crop',
    },
    {
      title: 'E-commerce',
      icon: DollarSign,
      animation: '/animations/debt-collection.json',
      audioKey: 'ecommerce', // Using ecommerce audio
      image:
        'https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=1170&auto=format&fit=crop',
    },
  ];

  const [currentUseCase, setCurrentUseCase] = useState(useCases[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [audioUrl, setAudioUrl] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // States for UI elements (without actual API integration)
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [callError, setCallError] = useState<string | null>(null);

  // Initialize audio element
  useEffect(() => {
    // Create the audio element
    audioRef.current = new Audio();
    const audio = audioRef.current;

    // Set initial volume
    audio.volume = volume;

    // Clean up function
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
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

      // Pause current playback if any
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      }

      try {
        // Get the audio key for the current use case
        const audioKey = currentUseCase.audioKey as keyof typeof AUDIO_FILES;

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
            console.log('Using dynamically generated URL for', audioKey);
          } else {
            // Fall back to static URL if dynamic fails
            url = FALLBACK_AUDIO_URLS[audioKey];
            console.log('Falling back to static URL for', audioKey);
          }
        } catch (error) {
          // If dynamic URL fails, use fallback
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
          console.log('Audio can play:', url);
          setIsLoading(false);
        };

        audio.addEventListener('canplaythrough', canPlayHandler);

        // Preload the audio
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
    const handleEnded = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setAudioError(true);
      setIsPlaying(false);
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
            // Playback started successfully
            console.log('Audio playback started successfully');
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

  const endCallHandler = async () => {
    setCallStatus('Ending call...');
    setIsInCall(false);

    // Clear call status after a delay
    setTimeout(() => {
      setCallStatus('Call ended');

      setTimeout(() => {
        setCallStatus('');
        setPhoneNumber('');
      }, 2000);
    }, 1000);
  };

  return (
    <div id="use-cases" className="py-8 bg-accent rounded-lg text-center w-full ">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-center">Try our Live Demo</h2>
        <div className="flex flex-col lg:flex-row-reverse w-full">
          {/* Image/Animation Section - Now on right */}
          <div
            className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-md relative m-2"
            style={{ height: '350px' }}
          >
            {/* Blurred image for all use cases */}
            <img
              src={currentUseCase.image}
              alt={currentUseCase.title}
              className="w-full h-full object-cover rounded-xl blur-[2px] brightness-75"
            />

            {/* Text overlay for all use cases - Receptionist version */}
            {currentUseCase.title === 'Receptionist' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 z-10">
                <h2 className="text-3xl font-bold mb-3 text-shadow drop-shadow-lg">Receptionist</h2>
                <p className="text-center text-base mb-6 max-w-md drop-shadow-md font-medium">
                  Experience our AI phone assistant that handles calls, schedules appointments, and
                  answers questions.
                </p>

                {/* Play demo audio button - centered */}
                {!isInCall && (
                  <div className="mt-4 flex flex-col items-center">
                    <span className="mb-1 text-xs font-medium drop-shadow-md">Listen to Demo:</span>
                    <button
                      onClick={togglePlay}
                      className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all"
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Text overlay for all other use cases */}
            {currentUseCase.title !== 'Receptionist' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 z-10">
                <h2 className="text-3xl font-bold mb-3 text-shadow drop-shadow-lg">
                  {currentUseCase.title}
                </h2>
                <p className="text-center text-base mb-6 max-w-md drop-shadow-md font-medium">
                  {currentUseCase.title === 'Lead Qualification' &&
                    'Qualify leads effectively with our AI assistant that asks the right questions.'}
                  {currentUseCase.title === 'Survey' &&
                    'Collect valuable feedback and insights with our AI-powered survey solution.'}
                  {currentUseCase.title === 'Education' &&
                    'Enhance learning experiences with our AI educational assistant.'}
                  {currentUseCase.title === 'Interviewer' &&
                    'Streamline your interview process with our AI interviewer.'}
                  {currentUseCase.title === 'E-commerce' &&
                    'Boost sales and customer satisfaction with our AI e-commerce assistant.'}
                </p>

                {/* Play demo audio button - centered */}
                <div className="mt-4 flex flex-col items-center">
                  <span className="mb-1 text-xs font-medium drop-shadow-md">Listen to Demo:</span>
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : isPlaying ? (
                      <Pause size={16} />
                    ) : (
                      <Play size={16} className="ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Controls Overlay for all use cases */}
            {/* Controls Overlay - Only show for Receptionist when in call */}
            {currentUseCase.title === 'Receptionist' && isInCall && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 rounded-b-xl">
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-medium">{currentUseCase.title}</h3>
                    <p className="text-xs opacity-75">Try our AI phone assistant</p>
                  </div>
                  <div className="flex gap-3">
                    {/* End Call button - Only for Receptionist when in call */}
                    <button
                      onClick={endCallHandler}
                      className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
                      aria-label="End call"
                    >
                      <PhoneOff size={18} />
                    </button>
                  </div>
                </div>

                {/* Call status display */}
                {callStatus && (
                  <div
                    className={`mt-2 text-xs font-medium px-2 py-1 rounded ${
                      callStatus.includes('Connected')
                        ? 'bg-green-500 bg-opacity-20'
                        : callStatus.includes('ended')
                        ? 'bg-red-500 bg-opacity-20'
                        : 'bg-blue-500 bg-opacity-20'
                    }`}
                  >
                    {callStatus}
                  </div>
                )}

                {/* Display call error if any */}
                {callError && (
                  <div className="mt-2 text-xs font-medium px-2 py-1 rounded bg-red-500 bg-opacity-30">
                    {callError}
                  </div>
                )}

                {/* Audio wave animation during call */}
                <div className="mt-1 w-full h-3">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 100 10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0,5 Q10,2 20,5 T40,5 T60,5 T80,5 T100,5"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1"
                    >
                      <animate
                        attributeName="d"
                        values="
                          M0,5 Q10,2 20,5 T40,5 T60,5 T80,5 T100,5;
                          M0,5 Q10,8 20,5 T40,5 T60,5 T80,5 T100,5;
                          M0,5 Q10,2 20,5 T40,5 T60,5 T80,5 T100,5
                        "
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Use Cases Grid - Now on left */}
          <div className="w-full lg:w-1/2 grid grid-cols-3 gap-2 order-first lg:order-none">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className={`rounded-xl shadow-md p-2 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300 cursor-pointer m-2 border ${
                  currentUseCase.title === useCase.title
                    ? 'bg-accent-foreground text-white'
                    : useCase.title === 'Receptionist'
                    ? 'bg-white border-2'
                    : 'bg-white'
                }`}
                onClick={() => handleUseCaseClick(useCase)}
              >
                {/* Icon */}
                <useCase.icon
                  className={`w-6 h-6 mb-1 ${
                    currentUseCase.title === useCase.title
                      ? 'text-white'
                      : useCase.title === 'Receptionist'
                      ? ''
                      : 'text-muted-foreground'
                  }`}
                />
                <h3 className="text-sm font-semibold text-center">{useCase.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add hidden audio element as fallback */}
      <audio
        style={{ display: 'none' }}
        controls={false}
        ref={(el) => {
          // This is a backup approach if the Audio API doesn't work
          if (el && !audioRef.current) {
            audioRef.current = el;
          }
        }}
      />
    </div>
  );
};

export default UseCasesSection;

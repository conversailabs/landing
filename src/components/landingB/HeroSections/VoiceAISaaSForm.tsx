'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';
import axios from 'axios';
import countries from '@/data/countries.json';
import { Phone } from 'lucide-react';

// PhoneInput component for reusability
interface PhoneInputProps {
  selectedCountry: any;
  setSelectedCountry: (country: any) => void;
  fieldName: string;
  onChange: (field: string, value: string) => void;
  error?: string;
}

const PhoneInput = ({ selectedCountry, setSelectedCountry, fieldName, onChange, error }: PhoneInputProps) => {
  return (
    <div>
      <Label>Phone Number *</Label>
      <div className="flex gap-2 items-center">
        <Select
          value={selectedCountry?.code}
          onValueChange={(code) => {
            const country = countries.find((c) => c.code === code);
            if (country) setSelectedCountry(country);
          }}
        >
          <SelectTrigger className="w-28 overflow-hidden">
            <SelectValue>
              <div className="flex items-center">
                <div className="w-6 h-4 relative mr-2 overflow-hidden rounded-sm border border-gray-200">
                  <img 
                    src={`https://flagcdn.com/w40/${selectedCountry?.code.toLowerCase()}.png`} 
                    alt={selectedCountry?.name || "Flag"} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="truncate">{selectedCountry?.dial_code}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <div className="flex items-center">
                  <div className="w-6 h-4 relative mr-2 overflow-hidden rounded-sm border border-gray-200">
                    <img 
                      src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`} 
                      alt={country.name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span>{country.dial_code}</span>
                  <span className="ml-2 text-xs text-gray-500 truncate">({country.name})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          className={`flex-1 ${error ? 'border-red-500' : ''}`}
          type="tel"
          placeholder="Enter phone number"
          onChange={(e) => {
            onChange(fieldName, `${selectedCountry?.dial_code}${e.target.value}`);
          }}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default function VoiceAISaaSForm() {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [step1Error, setStep1Error] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries.find((c) => c.code === 'US'));
  
  // Field-level validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { toast } = useToast();

  // Listen for the custom event to open the demo form
  useEffect(() => {
    const handleOpenDemoForm = () => {
      setShowDemoForm(true);
    };

    // Add event listener
    document.addEventListener('openAIDemoForm', handleOpenDemoForm);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('openAIDemoForm', handleOpenDemoForm);
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error for this field when user makes changes
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateStep1 = () => {
    const requiredFields = ['task', 'volume'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setStep1Error('Please fill out all required fields before proceeding.');
        return false;
      }
    }
    setStep1Error('');
    return true;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate name
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Name is required';
    }
    
    // Validate email
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate phone
    if (!formData.phone || formData.phone.trim() === '') {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+\d{1,4}\d{6,14}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDemoForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate name
    if (!formData.demo_name || formData.demo_name.trim() === '') {
      newErrors.demo_name = 'Name is required';
    }
    
    // Validate phone
    if (!formData.demo_phone || formData.demo_phone.trim() === '') {
      newErrors.demo_phone = 'Phone number is required';
    } else if (!/^\+\d{1,4}\d{6,14}$/.test(formData.demo_phone)) {
      newErrors.demo_phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Validate before submitting
    if (!validateStep2()) {
      return;
    }
    
    try {
      setIsLoading(true);

      const { error } = await supabase.from('voice_ai_leads').insert([
        {
          task: formData.task,
          volume: formData.volume,
          about: formData.about,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      ]);

      if (error) throw error;

      toast({
        title: 'Submission Successful',
        description: 'Our team will reach out with a custom voice AI solution within 24 hours.',
      });

      // optionally reset form here
      setFormData({});
      setErrors({});
      setStep(1);
      setShowCustomForm(false);
    } catch (err: any) {
      toast({
        title: 'Submission Failed',
        description: err.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoCallSubmit = async () => {
    // Validate before submitting
    if (!validateDemoForm()) {
      return;
    }
    
    let abortError = false;
    
    try {
      setIsLoading(true);
      
      // Show immediate feedback that call is being initiated
      toast({
        title: 'Initiating call',
        description: 'Setting up your personalized demo call...',
      });
      
      // Use a simple timeout instead of AbortController
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          abortError = true;
          reject(new Error('Timeout: The request took too long to complete'));
          
          // When aborting, also set loading state to false
          setIsLoading(false);
        }, 15000);
      });
      
      // Race between the actual request and the timeout
      const response = await Promise.race([
        axios.post('/api/make-call', {
          from_number: '+16812011361',
          to_number: formData.demo_phone,
          override_agent_id: 'agent_70dbec3ad930da72a639c27fad',
          metadata: {
            name: formData.demo_name || 'Guest',
            number: formData.demo_phone,
          },
          retell_llm_dynamic_variables: {
            name: formData.demo_name || 'Guest',
            number: formData.demo_phone,
            current_time: new Date().toISOString(),
          }
        }),
        timeoutPromise
      ]);
  
      // Only show success toast if we actually got a response (not timed out)
      toast({
        title: 'Incoming AI call',
        description: 'Watch your phone — your personalized demo is about to begin!',
        duration: 5000, // Show for 5 seconds
      });
      
      // Close the form after successful call initiation
      setShowDemoForm(false);
      
      // Reset form data
      setFormData({});
      setErrors({});
    } catch (error: any) {
      // If it's a timeout error (from our Promise.race)
      if (abortError) {
        toast({
          title: 'Request timeout',
          description: 'The call request is taking too long. Please try again later.',
          variant: 'destructive',
        });
      } else {
        // Regular error handling with more user-friendly messages
        let errorMessage = 'An unexpected error occurred';
        
        if (error.response?.data?.error?.message) {
          errorMessage = error.response.data.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        toast({
          title: 'Failed to send call',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    } finally {
      // Only set loading to false if it wasn't a timeout
      // (timeout already sets loading to false)
      if (!abortError) {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Button
        size="lg"
        className="px-8 py-6 text-lg hover:scale-105 transition-transform"
        onClick={() => setShowCustomForm(true)}
      >
        Start 14-Day Free Trial
      </Button>
      
      <Button
  size="lg"
  variant="outline"
  className="px-8 py-6 text-lg hover:scale-105 transition-transform border-primary"
  onClick={() => setShowDemoForm(true)}
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="mr-2 text-primary fill-primary"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
  <span className="text-primary">Talk to Our Voice AI Agents</span>
</Button>
      {/* Custom Voice AI Form */}
      <Dialog
        open={showCustomForm}
        onOpenChange={(open) => {
          setShowCustomForm(open);
          if (!open) {
            setStep(1);
            setFormData({});
            setStep1Error('');
            setErrors({});
            setSelectedCountry(countries.find((c) => c.code === 'US')); // Reset country code on close
          }
        }}
      >
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>Get Custom Voice AI Solution</DialogTitle>
          </DialogHeader>

          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <Label>What should Voice AI handle? *</Label>
                <Select onValueChange={(val) => handleInputChange('task', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose task" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Customer Support</SelectItem>
                    <SelectItem value="sales">Sales Calls</SelectItem>
                    <SelectItem value="reminders">Appointment Reminders</SelectItem>
                    <SelectItem value="all_to_them">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Estimated Monthly Call Volume *</Label>
                <Select onValueChange={(val) => handleInputChange('volume', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select volume" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less_1000">Less than 1,000</SelectItem>
                    <SelectItem value="1k_10k">1,000 - 10,000</SelectItem>
                    <SelectItem value="10k_plus">More than 10,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tell us more about your business (optional)</Label>
                <Textarea onChange={(e) => handleInputChange('about', e.target.value)} />
              </div>
              {step1Error && <p className="text-red-500 text-sm">{step1Error}</p>}
              <DialogFooter>
                <Button
                  onClick={() => {
                    if (validateStep1()) setStep(2);
                  }}
                  className="w-full"
                >
                  Next
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label>Full Name *</Label>
                <Input 
                  className={errors.name ? 'border-red-500' : ''}
                  onChange={(e) => handleInputChange('name', e.target.value)} 
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label>Business Email *</Label>
                <Input 
                  type="email"
                  className={errors.email ? 'border-red-500' : ''}
                  onChange={(e) => handleInputChange('email', e.target.value)} 
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              {/* Using the PhoneInput component */}
              <PhoneInput 
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                fieldName="phone"
                onChange={handleInputChange}
                error={errors.phone}
              />

              <DialogFooter>
                <div className="flex flex-col gap-2">
                  <Button onClick={() => handleSubmit()} disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    We'll email you with details about how our voice agents can help your specific
                    business.
                  </p>
                </div>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Demo Call Form */}
      <Dialog
        open={showDemoForm}
        onOpenChange={(open) => {
          setShowDemoForm(open);
          if (!open) {
            setFormData({});
            setErrors({});
            setSelectedCountry(countries.find((c) => c.code === 'US')); // Reset country code on close
          }
        }}
      >
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Talk to Our Voice AI</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="demo_name" className="block mb-2">
                Name *
              </Label>
              <Input
                id="demo_name"
                className={errors.demo_name ? 'border-red-500' : ''}
                onChange={(e) => handleInputChange('demo_name', e.target.value)}
              />
              {errors.demo_name && <p className="text-red-500 text-xs mt-1">{errors.demo_name}</p>}
            </div>
            
            {/* Using the PhoneInput component */}
            <PhoneInput 
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              fieldName="demo_phone"
              onChange={handleInputChange}
              error={errors.demo_phone}
            />

            <DialogFooter>
              <div className="flex flex-col gap-2 w-full">
                <Button onClick={handleDemoCallSubmit} className="w-full" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Me A Demo Call'}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  You'll receive a call within a minute from +16812011361
                </p>
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
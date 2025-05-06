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
import { Phone } from 'lucide-react'; // Added import for Phone icon



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

  // Add this effect hook to inject mobile-specific CSS for the dialog position
  useEffect(() => {
    // Create a style element for mobile-only styles
    const styleEl = document.createElement('style');
    
    styleEl.textContent = `
      @media (max-width: 640px) {
        .mobile-dialog-fix {
          position: fixed !important;
          top: 10px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          max-height: 90vh !important;
          overflow-y: auto !important;
          margin: 0 !important;
        }
      }
    `;
    
    // Add the style to the document
    document.head.appendChild(styleEl);
    
    // Clean up when component unmounts
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

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
  // reset form
  const resetform=()=>{
    setFormData({});
    setErrors({});
  }

  const handleSubmit = async () => {
    // Validate before submitting
    if (!validateStep2()) {
      return;
    }
    
    setIsLoading(true);
  
    try {
      // Prepare the promises but don't await them yet
      const dbPromise = supabase.from('voice_ai_leads').insert([
        {
          task: formData.task,
          volume: formData.volume,
          about: formData.about,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      ]);
  
      const apiPromise = axios.post('/api/make-call', {
        to_number: formData.phone,
        call_type: 'default',
        metadata: {
          task: formData.task,
          volume: formData.volume,
          about: formData.about,
          name: formData.name || 'Guest',
          email: formData.email,
          phone: formData.phone,
        },
        retell_llm_dynamic_variables: {
          name: formData.name || 'Guest',
          number: formData.phone,
          use_case: formData.task,
          current_time: new Date().toISOString(),
        }
      }, {
        timeout: 15000 // 15 seconds timeout
      });
  
      // Use Promise.allSettled to handle success/failure of each promise independently
      const results = await Promise.allSettled([dbPromise, apiPromise]);
      
      // Handle DB result - index 0
      if (results[0].status === 'fulfilled') {
        const dbResult = results[0].value;
        if (dbResult.error) {
          toast({
            title: 'Database Error',
            description: dbResult.error.message || 'Failed to save your information',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Submission Successful',
            description: 'Our team will reach out with a custom voice AI solution within 24 hours.',
          });
        }
      } else {
        // DB promise was rejected
        const error = results[0].reason;
        let errorMessage = 'An unexpected error occurred';
        
        if (error.message) {
          errorMessage = error.message;
        }
        
        toast({
          title: 'Database Error',
          description: errorMessage,
          variant: 'destructive',
        });
      }
      
      // Handle API result - index 1
      if (results[1].status === 'fulfilled') {
        const apiResponse = results[1].value;
        if (apiResponse.status === 200 || apiResponse.status === 201) {
          toast({
            title: 'Incoming AI call',
            description: 'Watch your phone — your personalized verification is about to begin!',
            duration: 5000,
          });
        } else {
          toast({
            title: 'Call Service Error',
            description: 'Failed to initiate call. Please try again later.',
            variant: 'destructive',
          });
        }
      } else {
        // API promise was rejected - use your exact error message processing
        const error = results[1].reason;
        let errorMessage = 'An unexpected error occurred';
        
        if (error.code === 'ECONNABORTED') {
          errorMessage = 'The call request is taking too long. Please try again later.';
        } else if (error.response?.data?.error?.message) {
          errorMessage = error.response.data.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        toast({
          title: 'Call Service Error',
          description: errorMessage,
          variant: 'destructive',
        });
      }
      
      // Determine if we should reset the form based on operation results
      const dbSucceeded = results[0].status === 'fulfilled' && !results[0].value.error;
      const apiSucceeded = results[1].status === 'fulfilled' && 
                          (results[1].value.status === 200 || results[1].value.status === 201);
      
      // Only reset if at least one operation succeeded
      if (dbSucceeded || apiSucceeded) {
        resetform();
        setStep(1);
        setShowCustomForm(false);
      }
      
    } catch (err) {
      // This catch block should rarely be hit since we're using Promise.allSettled
      // But just in case there's some other unexpected error
      const error = err as any;
      let errorMessage = 'An unexpected error occurred';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'The call request is taking too long. Please try again later.';
      } else if (error.response?.data?.error?.message) {
        errorMessage = error.response.data.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: 'Operation Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      console.error('Unexpected error in form submission:', error);
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
      if (!formData.demo_phone || formData.demo_phone === selectedCountry?.dial_code) {
        toast({
          title: 'Phone required',
          description: 'Please enter a valid phone number to receive the demo call.',
          variant: 'destructive',
        });
        return;
      }
      setIsLoading(true);
      
      // Show immediate feedback that call is being initiated
      toast({
        title: 'Initiating call',
        description: 'Setting up your personalized demo call...',
      });
      
      const response = await axios.post('/api/make-call', {
        to_number: formData.demo_phone,
        call_type: 'default',
        metadata: {
          name: formData.demo_name || 'Guest',
          number: formData.demo_phone,
        },
        retell_llm_dynamic_variables: {
          name: formData.demo_name || 'Guest',
          number: formData.demo_phone,
          current_time: new Date().toISOString(),
        }
      }, {
        timeout: 15000 // 15 seconds timeout
      });
  
      // Only show success toast if we actually got a response (not timed out)
      if(response.status===200 ||response.status===201){
      toast({
        title: 'Incoming AI call',
        description: 'Watch your phone — your personalized demo is about to begin!',
        duration: 5000, // Show for 5 seconds
      });
    }
      // Close the form after successful call initiation
      setShowDemoForm(false);
      
      // Reset form data
      resetform();
    
    } catch (error:any) {
      // Handle different error types
      let errorMessage = 'An unexpected error occurred';

      if (error.code === 'ECONNABORTED') {
        errorMessage = 'The call request is taking too long. Please try again later.';
      } else if (error.response?.data?.error?.message) {
        errorMessage = error.response.data.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: 'Failed to send call',
        description: errorMessage,
        variant: 'destructive',
      });
    }  finally {
      setIsLoading(false);
    }
  };

  // Handle button clicks with direct state updates
  const handleOpenCustomForm = () => {
    setShowCustomForm(true);
  };
  
  const handleOpenDemoForm = () => {
    setShowDemoForm(true);
  };

  return (
    // Fixed height container to maintain consistent layout regardless of content changes
    <div className="flex flex-col items-center justify-center h-24 md:h-28">
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          onClick={handleOpenDemoForm}
          variant="outline"
          className="border-2 border-primary text-lg md:text-xl font-semibold whitespace-nowrap flex items-center gap-2"
        >
          <Phone size={20} className="text-primary fill-primary" />
          <span className="text-primary">Talk to Our Voice AI</span>
        </Button>
        <Button
          onClick={handleOpenCustomForm}
          className="text-lg md:text-xl font-semibold whitespace-nowrap"
        >
          Get your custom voice AI solutions
        </Button>
      </div>

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

      {/* Demo Call Form - with mobile positioning fix */}
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
        <DialogContent className="max-w-md w-full mobile-dialog-fix">
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
                  You'll receive a call within a minute.
                </p>
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
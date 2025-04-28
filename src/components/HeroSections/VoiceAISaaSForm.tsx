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

export default function VoiceAISaaSForm() {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [step1Error, setStep1Error] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries.find((c) => c.code === 'US'));

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

  const handleSubmit = async () => {
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
    <div className="flex flex-col items-center justify-center p-4 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          onClick={() => setShowDemoForm(true)}
          variant="outline"
          className="border-2 border-primary text-lg md:text-xl font-semibold"
        >
          Experience AI calling
        </Button>
        <Button
          onClick={() => setShowCustomForm(true)}
          className="text-lg md:text-xl font-semibold"
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
                <Input onChange={(e) => handleInputChange('name', e.target.value)} />
              </div>
              <div>
                <Label>Business Email *</Label>
                <Input type="email" onChange={(e) => handleInputChange('email', e.target.value)} />
              </div>
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
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.emoji} {country.dial_code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    className="flex-1"
                    type="tel"
                    placeholder="Enter phone number"
                    onChange={(e) => {
                      handleInputChange('phone', `${selectedCountry?.dial_code}${e.target.value}`);
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <div className="flex flex-col gap-2">
                  <Button onClick={() => handleSubmit()}>Submit</Button>
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
            setSelectedCountry(countries.find((c) => c.code === 'US')); // Reset country code on close
          }
        }}
      >
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Experience AI Calling</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="demo_name" className="block mb-2">
                Name *
              </Label>
              <Input
                id="demo_name"
                onChange={(e) => handleInputChange('demo_name', e.target.value)}
              />
            </div>
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
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.emoji} {country.dial_code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  className="flex-1"
                  type="tel"
                  placeholder="Enter phone number"
                  onChange={(e) => {
                    handleInputChange(
                      'demo_phone',
                      `${selectedCountry?.dial_code}${e.target.value}`,
                    );
                  }}
                />
              </div>
            </div>

            <DialogFooter>
              <div className="flex flex-col gap-2 w-full">
                <Button onClick={handleDemoCallSubmit} className="w-full" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Me A Demo Call'}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  You'll receive a call within a minutes from +16812011361
                </p>
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

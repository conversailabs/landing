'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
import { Check } from 'lucide-react';
import countries from '@/data/countries.json';

export default function WaitlistSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [step1Error, setStep1Error] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries.find((c) => c.code === 'US'));

  const { toast } = useToast();


  // Transform countries data for consistency
  const transformedCountries = countries.map((country) => ({
    name: country.name,
    code: country.code,
    dial_code: country.dial_code,
    emoji: country.emoji,
    flag: `https://flagcdn.com/${country.code.toLowerCase()}.svg`,
  }));

  // Make sure US is the default for +1
  const getCountryByDialCode = (dialCode: string) => {
    // Special case for +1 (North America)
    if (dialCode === '+1') {
      const us = transformedCountries.find((c) => c.code === 'US');
      if (us) return us;
    }

    return (
      transformedCountries.find((c) => c.dial_code === dialCode) ||
      // Default to US if not found
      transformedCountries.find((c) => c.code === 'US') ||
      transformedCountries[0]
    );
  };

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
          phone: selectedCountry?.dial_code + ' ' + formData.phone,
      
        },
      ]);

      if (error) throw error;

      toast({
        title: 'Submission Successful',
        description: 'Our team will reach out with a custom voice AI solution within 24 hours.',
      });

      // Reset form and localStorage
      setFormData({});
      setSelectedCountry(getCountryByDialCode('+1'));
      setStep(1);
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

  return (
    <div
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1477093782505-e10aaeb27c6d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div
        id="waitlist"
        className="flex flex-col items-center justify-center p-4 py-12 w-full max-w-lg mx-auto"
      >
        <div className="bg-card border rounded-lg shadow-sm p-6 w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
            Get Custom Voice AI Solution
            </h2>
            <p className="text-sm text-muted-foreground">
              Automate calls and save 20+ hours weekly with personalized AI voice agents
            </p>

            <div className="relative w-full h-1 bg-gray-300 rounded-full mt-4">
              <div
                className="absolute h-1 bg-primary rounded-full transition-all duration-300"
                style={{ width: `${step === 1 ? '50%' : '100%'}` }}
              />
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <Label>What should Voice AI handle? *</Label>
                <Select
                  value={formData.task}
                  onValueChange={(val) => handleInputChange('task', val)}
                >
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
                <Select
                  value={formData.volume}
                  onValueChange={(val) => handleInputChange('volume', val)}
                >
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
                <Textarea
                  value={formData.about || ''}
                  onChange={(e) => handleInputChange('about', e.target.value)}
                  placeholder="Describe your specific needs, challenges or questions"
                />
              </div>
              {step1Error && <p className="text-red-500 text-sm">{step1Error}</p>}

              <div className="flex flex-col gap-2 w-full mt-6">
                <Button
                  onClick={() => {
                    if (validateStep1()) setStep(2);
                  }}
                  className="w-full"
                >
                  See My Custom Solutions
                </Button>
                <p className="text-xs text-center text-muted-foreground w-full">
                  Join 200+ businesses already saving time with our voice AI *
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label>Full Name *</Label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div>
                <Label>Business Email *</Label>
                <Input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
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
                    className="flex-1"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone || ''}
                    onChange={(e) => {
                      handleInputChange('phone', e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full mt-6">
                <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Your personal AI consultant will contact you within 24 hours with your custom
                  solution
                </p>
              </div>

              <Button variant="ghost" className="w-full mt-2" onClick={() => setStep(1)}>
                Back to Step 1
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
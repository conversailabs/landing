'use client';

import { useState } from 'react';
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
import { Search, Check, ChevronDown } from 'lucide-react';
import countries from '@/data/countries.json';

export default function WaitlistSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [step1Error, setStep1Error] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('+1'); // Default to US/Canada
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { toast } = useToast();

  // Transform countries data for consistency
  const transformedCountries = countries.map(country => ({
    name: country.name,
    code: country.code,
    dial_code: country.dial_code,
    flag: `https://flagcdn.com/${country.code.toLowerCase()}.svg`
  }));

  // Make sure US is the default for +1
  const getCountryByDialCode = (dialCode: string) => {
    // Special case for +1 (North America)
    if (dialCode === '+1') {
      const us = transformedCountries.find(c => c.code === 'US');
      if (us) return us;
    }
    
    return transformedCountries.find(c => c.dial_code === dialCode) || 
      // Default to US if not found
      transformedCountries.find(c => c.code === 'US') || 
      transformedCountries[0];
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateStep1 = () => {
    const requiredFields = ['industry', 'task', 'volume'];
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
          industry: formData.industry,
          task: formData.task,
          volume: formData.volume,
          about: formData.about,
          name: formData.name,
          email: formData.email,
          phone: selectedCountry + ' ' + formData.phone,
        },
      ]);

      if (error) throw error;

      toast({
        title: 'Submission Successful',
        description: 'Our team will reach out with a custom voice AI solution within 24 hours.',
      });

      // Reset form
      setFormData({});
      setSelectedCountry('+1');
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
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-lg mx-auto my-6">
      <div className="bg-card border rounded-lg shadow-sm p-6 w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Get Custom Voice AI Solution</h2>
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
              <Label>Your Industry *</Label>
              <Select onValueChange={(val) => handleInputChange('industry', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                  <SelectItem value="all_to_them">All Of Them</SelectItem>
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
              <Textarea
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
              <Input onChange={(e) => handleInputChange('name', e.target.value)} />
            </div>
            <div>
              <Label>Business Email *</Label>
              <Input type="email" onChange={(e) => handleInputChange('email', e.target.value)} />
            </div>
            <div>
              <Label>Phone Number *</Label>
              <div className="flex gap-2">
                {/* Country Code Selector */}
                <div className="w-1/3 relative">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex justify-between items-center h-10"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <div className="flex items-center">
                      <img
                        src={`https://flagcdn.com/${getCountryByDialCode(selectedCountry).code.toLowerCase()}.svg`}
                        alt={`${getCountryByDialCode(selectedCountry).name} flag`}
                        className="h-4 w-6 object-cover mr-1"
                      />
                      <span className="ml-1 truncate">{selectedCountry}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
                  </Button>

                  {dropdownOpen && (
                    <div className="fixed inset-0 z-50" onClick={() => setDropdownOpen(false)}>
                      <div 
                        className="absolute top-12 left-0 w-72 max-h-72 bg-background border rounded-lg shadow-lg overflow-hidden z-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-2 border-b sticky top-0 bg-background z-10">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                            <Input 
                              placeholder="Search countries..." 
                              className="pl-8 h-8"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              autoFocus
                            />
                          </div>
                        </div>
                        
                        <div className="overflow-y-auto max-h-56">
                          {transformedCountries
                            .filter(country => 
                              searchQuery === '' ? true : 
                              country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              country.dial_code.includes(searchQuery))
                            .map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                className="flex items-center justify-between w-full px-3 py-2 text-left hover:bg-accent"
                                onClick={() => {
                                  setSelectedCountry(country.dial_code);
                                  setDropdownOpen(false);
                                  setSearchQuery('');
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <img
                                    src={country.flag}
                                    alt={`${country.name} flag`}
                                    className="h-4 w-6 object-cover"
                                  />
                                  <span className="font-medium truncate">{country.name}</span>
                                </div>
                                <span className="text-sm text-muted-foreground shrink-0">
                                  {country.dial_code}
                                </span>
                                {selectedCountry === country.dial_code && (
                                  <Check className="ml-2 h-4 w-4 text-blue-600" />
                                )}
                              </button>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-2/3">
                  <Input 
                    type="tel" 
                    onChange={(e) => handleInputChange('phone', e.target.value)} 
                    placeholder="Phone number" 
                    className="h-10"
                  />
                </div>
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
  );
}
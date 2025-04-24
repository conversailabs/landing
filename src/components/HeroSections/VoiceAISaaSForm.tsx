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
import { Search, Check, ChevronDown } from 'lucide-react';
import countries from '@/data/countries.json';

export default function VoiceAISaaSForm() {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [step1Error, setStep1Error] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('+1'); // Default to US/Canada
  const [customDropdownOpen, setCustomDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSubmit = async (type: 'custom' | 'demo') => {
    const endpoint = type === 'custom' ? '/api/contact-custom' : '/api/contact-demo';
    const payload =
      type === 'custom'
        ? {
            industry: formData.industry,
            task: formData.task,
            volume: formData.volume,
            about: formData.about,
            name: formData.name,
            email: formData.email,
            phone: selectedCountry + ' ' + formData.phone,
          }
        : {
            name: formData.demo_name,
            phone: selectedCountry + ' ' + formData.demo_phone,
          };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (res.ok) {
        alert('Submitted successfully!');
        setShowCustomForm(false);
        setShowDemoForm(false);
        setStep(1);
        setFormData({});
      } else {
        alert(result.message || 'Something went wrong');
      }
    } catch (err) {
      alert('Network error');
    }
  };

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

  // Country dropdown component to avoid duplication
  const CountryDropdown = ({ 
    isOpen, 
    setIsOpen, 
    searchValue,
    setSearchValue,
    onSelect
  }: { 
    isOpen: boolean; 
    setIsOpen: (state: boolean) => void;
    searchValue: string;
    setSearchValue: (query: string) => void;
    onSelect: (dialCode: string) => void;
  }) => (
    <>
      <Button
        type="button"
        variant="outline"
        className="w-full flex justify-between items-center h-10"
        onClick={() => setIsOpen(!isOpen)}
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

      {isOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setIsOpen(false)}>
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
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-56">
              {transformedCountries
                .filter(country => 
                  searchValue === '' ? true : 
                  country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                  country.dial_code.includes(searchValue))
                .map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    className="flex items-center justify-between w-full px-3 py-2 text-left hover:bg-accent"
                    onClick={() => {
                      onSelect(country.dial_code);
                      setIsOpen(false);
                      setSearchValue('');
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
    </>
  );

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Button onClick={() => setShowCustomForm(true)}>Get your custom voice AI solutions</Button>
        <Button onClick={() => setShowDemoForm(true)} variant="outline">
          Experience AI calling
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
            setSelectedCountry('+1'); // Reset country code on close
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
                <Label>Your Industry *</Label>
                <Select onValueChange={(val) => handleInputChange('industry', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
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
                <div className="flex gap-2">
                  {/* Country Code Selector for Custom Form */}
                  <div className="w-1/3 relative">
                    <CountryDropdown 
                      isOpen={customDropdownOpen}
                      setIsOpen={setCustomDropdownOpen}
                      searchValue={searchQuery}
                      setSearchValue={setSearchQuery}
                      onSelect={setSelectedCountry}
                    />
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
              <DialogFooter>
                <div className="flex flex-col gap-2">
                  <Button onClick={() => handleSubmit('custom')}>Submit</Button>
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
            setSelectedCountry('+1'); // Reset country code on close
          }
        }}
      >
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Experience AI Calling</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="demo_name" className="block mb-2">Name *</Label>
              <Input id="demo_name" onChange={(e) => handleInputChange('demo_name', e.target.value)} />
            </div>
            <div className="mt-4">
              <Label htmlFor="demo_phone" className="block mb-2">Phone *</Label>
              <div className="flex gap-2">
                {/* Country Code Selector for Demo Form */}
                <div className="w-1/3 relative">
                  <CountryDropdown 
                    isOpen={demoDropdownOpen}
                    setIsOpen={setDemoDropdownOpen}
                    searchValue={searchQuery}
                    setSearchValue={setSearchQuery}
                    onSelect={setSelectedCountry}
                  />
                </div>
                <div className="w-2/3">
                  <Input 
                    type="tel" 
                    onChange={(e) => handleInputChange('demo_phone', e.target.value)} 
                    placeholder="Phone number" 
                    className="h-10"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => handleSubmit('demo')} className="w-full">
                Submit
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
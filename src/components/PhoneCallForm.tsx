'use client';

import React, { useState, useEffect } from 'react';
import { Phone, X, ChevronDown, Check, Search } from 'lucide-react';
// Import countries data from the JSON file
import countriesData from '@/data/countries.json';
// Import available shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';

// Country data interface
interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

interface PhoneCallFormProps {
  onSubmit: (phone: string) => void;
  onCancel: () => void;
  outboundAgentID: string;
  outboundNumber: string;
}

const PhoneCallForm: React.FC<PhoneCallFormProps> = ({
  onSubmit,
  onCancel,
  outboundAgentID,
  outboundNumber,
}) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Process countries from the imported JSON file
    try {
      setIsLoading(true);

      // Transform the data to match the expected format
      const formattedCountries = countriesData
        .map((country: any) => ({
          name: country.name,
          code: country.code,
          dial_code: country.dial_code,
          flag: `https://flagcdn.com/${country.code.toLowerCase()}.svg`, // Generate flag URL from country code
        }))
        .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

      setCountries(formattedCountries);

      // Set default country (US)
      const defaultCountry =
        formattedCountries.find((c: Country) => c.code === 'US') || formattedCountries[0];
      setSelectedCountry(defaultCountry);
      setIsLoading(false);
    } catch (error) {
      console.error('Error processing countries data:', error);
      // Fallback to a minimal set of countries if data processing fails
      const fallbackCountries = [
        { name: 'United States', code: 'US', dial_code: '+1', flag: 'https://flagcdn.com/us.svg' },
        {
          name: 'United Kingdom',
          code: 'GB',
          dial_code: '+44',
          flag: 'https://flagcdn.com/gb.svg',
        },
        { name: 'Canada', code: 'CA', dial_code: '+1', flag: 'https://flagcdn.com/ca.svg' },
        { name: 'Australia', code: 'AU', dial_code: '+61', flag: 'https://flagcdn.com/au.svg' },
        { name: 'India', code: 'IN', dial_code: '+91', flag: 'https://flagcdn.com/in.svg' },
      ];
      setCountries(fallbackCountries);
      setSelectedCountry(fallbackCountries[0]);
      setIsLoading(false);
    }
  }, []);

  const filteredCountries =
    searchQuery.trim() === ''
      ? countries
      : countries.filter(
          (country) =>
            country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            country.dial_code.includes(searchQuery) ||
            country.code.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!phone.trim()) {
      setError('Please enter a phone number');
      return;
    }

    // Enhanced phone validation with country codes consideration
    const phoneDigits = phone.replace(/[\s()-]/g, '');
    // Most countries have phone numbers between 7-15 digits (excluding country code)
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setError('Please enter a valid phone number');
      return;
    }

    // Set submitting state to true (show loading)
    setIsSubmitting(true);

    // Format the full number with country code
    const formattedPhone = `${selectedCountry?.dial_code}${
      phoneDigits.startsWith('0') ? phoneDigits.substring(1) : phoneDigits
    }`;

    try {
      const res = await axios.post('/api/make-call', {
        from_number: outboundNumber,
        to_number: formattedPhone,
        override_agent_id: outboundAgentID,
      });

      setShowSuccessMessage(true);
    } catch (err: any) {
      const error = err.response?.data?.error || 'Something went wrong while making the call.';
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }

    // Hide the success message and submit after a delay
    setTimeout(() => {
      setShowSuccessMessage(false);
      setIsSubmitting(false);
      onSubmit(formattedPhone);
    }, 3000);
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10 rounded-xl">
      <div className="bg-card rounded-lg shadow-xl w-4/5 max-w-sm overflow-hidden">
        {/* Show success message overlay when form is submitted */}
        {showSuccessMessage && (
          <div className="absolute inset-0 bg-green-500 flex items-center justify-center z-20 rounded-lg animate-in fade-in duration-300">
            <div className="text-center p-4">
              <div className="flex items-center justify-center mb-3">
                <Phone size={40} className="text-white animate-pulse" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">AI will call you soon</h3>
              <p className="text-white text-opacity-90">Please keep your phone nearby</p>
            </div>
          </div>
        )}

        <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
          <h3 className="font-medium text-lg flex items-center gap-2">
            <Phone size={18} />
            Call AI Receptionist
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-blue-700 hover:text-white"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <X size={18} />
          </Button>
        </div>

        <div className="p-5">
          <p className="text-muted-foreground text-sm mb-4">
            Enter your phone number and our AI receptionist will call you directly.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number
              </Label>

              <div className="flex">
                {/* Country code selector */}
                <div className="relative w-1/3">
                  <Button
                    type="button"
                    variant="outline"
                    className={`w-full flex justify-between items-center rounded-r-none h-10 ${
                      error ? 'border-red-500' : ''
                    }`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    disabled={isLoading || isSubmitting}
                  >
                    {isLoading ? (
                      <div className="animate-pulse flex space-x-2">
                        <div className="h-5 w-5 bg-gray-200 rounded"></div>
                        <div className="h-5 w-10 bg-gray-200 rounded"></div>
                      </div>
                    ) : selectedCountry ? (
                      <>
                        <div className="flex items-center">
                          <img
                            src={selectedCountry.flag}
                            alt={`${selectedCountry.name} flag`}
                            className="h-4 w-6 object-cover mr-1"
                          />
                          <span className="ml-1 truncate">{selectedCountry.dial_code}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
                      </>
                    ) : (
                      <span className="text-muted-foreground">Select</span>
                    )}
                  </Button>

                  {dropdownOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                      <div
                        className="bg-card border rounded-lg shadow-lg max-w-md w-full max-h-[80vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-between border-b p-4">
                          <h3 className="font-medium">Select Country</h3>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setDropdownOpen(false)}
                            className="h-8 w-8"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="p-4 border-b">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search countries..."
                              className="pl-9"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              autoFocus
                            />
                          </div>
                        </div>

                        <div className="overflow-y-auto flex-1 p-1">
                          {filteredCountries.length > 0 ? (
                            <div className="grid gap-0.5">
                              {filteredCountries.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  className="flex items-center w-full p-2 text-left text-sm rounded hover:bg-accent"
                                  onClick={() => {
                                    setSelectedCountry(country);
                                    setDropdownOpen(false);
                                    setSearchQuery('');
                                  }}
                                >
                                  <img
                                    src={country.flag}
                                    alt={`${country.name} flag`}
                                    className="h-4 w-6 object-cover mr-2"
                                  />
                                  <span className="flex-1 truncate">{country.name}</span>
                                  <span className="text-muted-foreground ml-2">
                                    {country.dial_code}
                                  </span>
                                  {selectedCountry?.code === country.code && (
                                    <Check className="ml-2 h-4 w-4 text-blue-600" />
                                  )}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <p className="text-center py-4 text-muted-foreground">
                              No countries found
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Phone number input */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    type="tel"
                    id="phone"
                    className={`pl-10 h-10 rounded-l-none ${
                      error ? 'border-red-500 focus-visible:ring-red-500' : ''
                    }`}
                    placeholder="123 456 7890"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError('');
                    }}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    Processing...
                  </>
                ) : (
                  'Call Me'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhoneCallForm;

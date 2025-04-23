'use client';

import 'react-phone-input-2/lib/style.css';
import { useState } from 'react';
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

export default function VoiceAISaaSForm() {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [step1Error, setStep1Error] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

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
    try {
      setIsLoading(true);

      const response = await axios.post('/api/make-call', {
        from_number: '+16812011361',
        to_number: formData.demo_phone,
        override_agent_id: 'agent_df655e2fd4ec6291863068597c',
        metadata: {
          name: formData.demo_name,
        },
      });

      toast({
        title: 'Incoming AI call',
        description: 'Watch your phone — your personalized demo is about to begin!',
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error?.message || error.message || 'An unexpected error occurred';
      toast({
        title: 'Failed to send call',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Button onClick={() => setShowCustomForm(true)}>
          Request Your Custom Setup - 24hr Response
        </Button>
        <Button onClick={() => setShowDemoForm(true)}>Experience AI Calling</Button>
      </div>

      <Dialog
        open={showCustomForm}
        onOpenChange={(open) => {
          setShowCustomForm(open);
          if (!open) {
            setStep(1);
          }
        }}
      >
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle className="text-2xl">Get Custom Voice AI Solution</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Automate calls and save 20+ hours weekly with personalized AI voice agents
            </p>
            <div className="relative w-full h-1 bg-gray-300 rounded-full mb-6">
              <div
                className="absolute h-1 bg-primary rounded-full transition-all duration-300"
                style={{ width: `${step === 1 ? '50%' : '100%'}` }}
              />
            </div>
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
                <Textarea
                  onChange={(e) => handleInputChange('about', e.target.value)}
                  placeholder="Describe your specific needs, challenges or questions"
                />
              </div>
              {step1Error && <p className="text-red-500 text-sm">{step1Error}</p>}

              <DialogFooter>
                <div className="flex flex-col gap-2 w-full">
                  <Button
                    onClick={() => {
                      if (validateStep1()) setStep(2);
                    }}
                  >
                    See My Custom Solutions
                  </Button>
                  <p className="text-xs text-center text-muted-foreground w-full">
                    Join 200+ businesses already saving time with our voice AI
                  </p>
                </div>
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
                <Input type="tel" onChange={(e) => handleInputChange('phone', e.target.value)} />
              </div>
              <DialogFooter>
                <div className="flex flex-col gap-2 w-full">
                  <Button onClick={() => handleSubmit()}>Submit</Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Your personal AI consultant will contact you within 24 hours with your custom
                    solution
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
          }
        }}
      >
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle className="text-2xl">Experience AI Calling - Live Demo</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Hear exactly how our intelligent voice AI will sound to your customers with a
              personalized demo call.
            </p>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name *</Label>
              <Input onChange={(e) => handleInputChange('demo_name', e.target.value)} />
            </div>
            <div>
              <Label>Phone *</Label>
              <Input type="tel" onChange={(e) => handleInputChange('demo_phone', e.target.value)} />
            </div>
            <DialogFooter>
              <div className="flex flex-col gap-2 w-full">
                <Button onClick={handleDemoCallSubmit} className="w-full" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Me A Demo Call'}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  You'll receive a call within a minutes
                </p>
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

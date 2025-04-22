'use client';

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

export default function VoiceAISaaSForm() {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [step1Error, setStep1Error] = useState('');

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
            phone: formData.phone,
          }
        : {
            name: formData.demo_name,
            email: formData.demo_email,
            phone: formData.demo_phone,
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

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Button onClick={() => setShowCustomForm(true)}>Get your custom voice AI solutions</Button>
        <Button onClick={() => setShowDemoForm(true)} variant="outline">
          Try demo call
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
                <Input type="tel" onChange={(e) => handleInputChange('phone', e.target.value)} />
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
          }
        }}
      >
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Try Demo Call</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name *</Label>
              <Input onChange={(e) => handleInputChange('demo_name', e.target.value)} />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                onChange={(e) => handleInputChange('demo_email', e.target.value)}
              />
            </div>
            <div>
              <Label>Phone *</Label>
              <Input type="tel" onChange={(e) => handleInputChange('demo_phone', e.target.value)} />
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

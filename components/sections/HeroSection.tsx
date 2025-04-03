'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Plus, Minus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { PaymentDrawer } from "./PaymentDrawer";

export function HeroSection() {
  const [date, setDate] = useState<Date>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pickupService, setPickupService] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setIsDrawerOpen(true);
    }
  };

  const calculateTotal = () => {
    const adultPrice = 1000 * adults;
    const childPrice = 500 * children;
    const pickupPrice = pickupService ? 300 : 0;
    return adultPrice + childPrice + pickupPrice;
  };

  const handlePayment = async () => {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      console.error('Cannot process payment in server-side environment');
      return;
    }

    // Wait for Razorpay to be available
    let attempts = 0;
    const maxAttempts = 10;
    
    while (!(window as any).Razorpay && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 500));
      attempts++;
    }

    if (!(window as any).Razorpay) {
      console.error('Razorpay failed to load');
      return;
    }

    // Initialize Razorpay payment
    const options = {
      key: 'rzp_test_7UYeBxuQmCOZc9',
      amount: calculateTotal() * 100, // Amount in paise
      currency: 'INR',
      name: 'Adventure Park',
      description: 'Ticket Booking',
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      notes: {
        address: 'Adventure Park Main Office'
      },
      theme: {
        color: '#3B82F6'
      },
      handler: function (response: any) {
        console.log('Payment ID: ' + response.razorpay_payment_id);
        // Here you would typically make an API call to your backend to verify the payment
        // using the secret key: '19RT3vKZCmRWXAXeMRgjPG70'
      }
    };

    try {
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error initializing Razorpay:', error);
    }
  };

  return (
    <section className="relative h-[100vh] rounded-lg overflow-hidden">
      <Image
        src="https://res.cloudinary.com/db1nsxnit/image/upload/v1743604141/resortanimated_lbpjbq.gif?q=80&w=2070&auto=format&fit=crop"
        alt="Theme Park"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/30">
        <div className="container h-full flex items-center justify-between">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold m-6">Welcome to Adventure Park</h1>
            <p className="text-xl m-8">
              Experience thrilling rides, delicious food, and unforgettable moments.
            </p>
            <Button size="lg" className="m-4">
              View Attractions
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
            <h2 className="text-white text-2xl font-semibold mb-4">Select Date for Booking</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="bg-white rounded-md"
            />
          </div>
        </div>
      </div>

      <PaymentDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        selectedDate={date}
      />
    </section>
  );
}
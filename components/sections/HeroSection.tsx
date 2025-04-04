'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
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
    if (typeof window === 'undefined') {
      console.error('Cannot process payment in server-side environment');
      return;
    }

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

    const options = {
      key: 'rzp_test_7UYeBxuQmCOZc9',
      amount: calculateTotal() * 100,
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
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-between">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/db1nsxnit/image/upload/v1743604141/resortanimated_lbpjbq.gif?q=80&w=2070&auto=format&fit=crop"
          alt="Theme Park"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/30" />
      </div>

      {/* Content Container */}
      <div className="container relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 py-8">
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-white text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Adventure Park</h1>
          <p className="text-lg md:text-xl mb-6">
            Experience thrilling rides, delicious food, and unforgettable moments.
          </p>
          <Button size="lg">View Attractions</Button>
        </div>

        {/* Calendar Section */}
        <div className="w-full md:w-auto bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-lg border border-white/20">
          <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 text-center">Select Date for Booking</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="bg-white rounded-md text-black dark:bg-gray-800 dark:text-white"
          />
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
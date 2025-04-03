'use client';

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

interface PaymentDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | undefined;
}

export function PaymentDrawer({ isOpen, onOpenChange, selectedDate }: PaymentDrawerProps) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pickupService, setPickupService] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

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
      description: `Booking for ${selectedDate?.toLocaleDateString()}`,
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      notes: {
        address: 'Adventure Park Main Office',
        booking_date: selectedDate?.toISOString()
      },
      theme: {
        color: '#3B82F6'
      },
      handler: function (response: any) {
        console.log('Payment ID: ' + response.razorpay_payment_id);
        // Here you would typically make an API call to your backend to verify the payment
        onOpenChange(false); // Close drawer after successful payment
      }
    };

    try {
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
      // Close the drawer immediately after initiating payment
      onOpenChange(false);
    } catch (error) {
      console.error('Error initializing Razorpay:', error);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Book Your Adventure</DrawerTitle>
          {selectedDate && (
            <p className="text-sm text-muted-foreground">
              Selected Date: {selectedDate.toLocaleDateString()}
            </p>
          )}
        </DrawerHeader>
        <div className="p-6 space-y-6">
          {/* Quantity Selectors */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg">Adults (₹1000/person)</span>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{adults}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAdults(adults + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg">Children (₹500/person)</span>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{children}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setChildren(children + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pickup"
                checked={pickupService}
                onCheckedChange={(checked) => setPickupService(checked as boolean)}
              />
              <label htmlFor="pickup" className="text-sm font-medium leading-none">
                Pickup & Drop Service (₹300)
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm font-medium leading-none">
                I accept the terms and conditions
              </label>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Booking Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Adults ({adults} × ₹1000)</span>
                <span>₹{adults * 1000}</span>
              </div>
              <div className="flex justify-between">
                <span>Children ({children} × ₹500)</span>
                <span>₹{children * 500}</span>
              </div>
              {pickupService && (
                <div className="flex justify-between">
                  <span>Pickup & Drop Service</span>
                  <span>₹300</span>
                </div>
              )}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pay Now Button */}
          <Button
            className="w-full"
            size="lg"
            disabled={!acceptTerms}
            onClick={handlePayment}
          >
            Pay Now
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
'use client';

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus,X } from "lucide-react";
import { useState } from "react";
import { PaymentReceipt } from "@/components/PaymentReceipt";

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
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const calculateTotal = () => {
    const adultPrice = 1000 * adults;
    const childPrice = 500 * children;
    const pickupPrice = pickupService ? 300 : 0;
    return adultPrice + childPrice + pickupPrice;
  };

  const handlePayment = async () => {
    onOpenChange(false);
    //close dr
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
      name: 'Vaity Resort',
      description: `Booking for ${selectedDate?.toLocaleDateString()}`,
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      notes: {
        address: 'Justbook My Resort Main Office',
        booking_date: selectedDate?.toISOString()
      },
      theme: {
        color: '#3B82F6'
      },
      handler: function (response: any) {
        setPaymentId(response.razorpay_payment_id);
        setPaymentSuccess(true);
        onOpenChange(true); 
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
          <X className="absolute top-4 right-4" onClick={() => onOpenChange(false)} />

          {paymentSuccess && paymentId ? (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-green-600 mb-2">Payment Successful!</h3>
                <p className="text-sm text-muted-foreground">Thank you for booking with us.</p>
              </div>
              <PaymentReceipt
                paymentDetails={{
                  paymentId,
                  bookingDate: selectedDate!,
                  adults,
                  children,
                  pickupService,
                  totalAmount: calculateTotal(),
                }}
              />
              <Button 
                className="w-full" 
                variant="outline" 
                onClick={() => {
                  setPaymentSuccess(false);
                  setPaymentId(null);
                  onOpenChange(false);
                }}
              >
                Close
              </Button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

export default function BookingPage() {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pickupService, setPickupService] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const basePrice = 1000;
  const pickupPrice = 300;
  const totalPrice = (adults + children) * basePrice + (pickupService ? pickupPrice : 0);

  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-3xl font-bold">Book Your Visit</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="adults">Adults (13+)</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                >-</Button>
                <Input 
                  id="adults"
                  type="number" 
                  value={adults} 
                  onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value)))}
                  className="w-20 text-center"
                />
                <Button 
                  variant="outline" 
                  onClick={() => setAdults(adults + 1)}
                >+</Button>
              </div>
            </div>

            <div>
              <Label htmlFor="children">Children (3-12)</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setChildren(Math.max(0, children - 1))}
                >-</Button>
                <Input 
                  id="children"
                  type="number" 
                  value={children} 
                  onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value)))}
                  className="w-20 text-center"
                />
                <Button 
                  variant="outline" 
                  onClick={() => setChildren(children + 1)}
                >+</Button>
              </div>
            </div>

            <div>
              <Label>Select Date</Label>
              <Calendar 
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="pickup" 
                checked={pickupService}
                onCheckedChange={(checked) => setPickupService(checked as boolean)}
              />
              <Label htmlFor="pickup">Pickup & Drop Service (₹300)</Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                I accept the terms and conditions
              </Label>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Adults (₹{basePrice} × {adults})</span>
              <span>₹{adults * basePrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Children (₹{basePrice} × {children})</span>
              <span>₹{children * basePrice}</span>
            </div>
            {pickupService && (
              <div className="flex justify-between">
                <span>Pickup Service</span>
                <span>₹{pickupPrice}</span>
              </div>
            )}
            <div className="border-t pt-2 mt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
          </div>
          <Button 
            className="w-full" 
            size="lg"
            disabled={!acceptTerms || !selectedDate}
          >
            Pay Now
          </Button>
        </Card>
      </div>
    </div>
  );
}
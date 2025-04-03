'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import waveAnimation from '@/app/Animation - 1743620226381.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if splash has been shown before
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    
    if (hasSeenSplash) {
      setShowSplash(false);
      return;
    }

    // Set timeout to hide splash after animation
    const timer = setTimeout(() => {
      setShowSplash(false);
      localStorage.setItem('hasSeenSplash', 'true');
    }, 4000); // 4 seconds to match animation duration

    return () => clearTimeout(timer);
  }, []);

  if (!showSplash) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Full screen background with animation */}
      <div className="absolute inset-0 w-full h-full">
        <Lottie
          animationData={waveAnimation}
          loop={false}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Glass overlay for text */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Content with glass effect */}
      <div className="relative z-10 text-center p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
        <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
          Welcome to Adventure Park
        </h1>
        <p className="text-xl text-white/90 animate-fade-in-delayed">
          Your journey begins here
        </p>
      </div>
    </div>
  );
} 
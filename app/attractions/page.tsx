'use client'

import ClientOnly from "@/components/ClientOnly";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { AttractionsGrid } from "@/components/sections/AttractionsGrid";
import { UltimateGuideSection } from "@/components/sections/UltimateGuideSection";

export default function AttractionsPage() {
  return (
    <div className="container space-y-12">
      <ClientOnly>
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Attractions Grid */}
        <AttractionsGrid />

        {/* Ultimate Guide Section */}
        <UltimateGuideSection />
      </ClientOnly>
    </div>
  );
}
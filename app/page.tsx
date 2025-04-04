'use client'

import ClientOnly from "@/components/ClientOnly";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { FAQSection } from "@/components/sections/FAQSection";
import { UltimateGuideSection } from "@/components/sections/UltimateGuideSection";

export default function Home() {
  return (
    <div className="container space-y-12">
      <ClientOnly>
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <FAQSection />
        <UltimateGuideSection />
      </ClientOnly>
    </div>
  );
}
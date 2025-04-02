import { Card } from "@/components/ui/card";
import Image from "next/image";
import { UltimateGuideSection } from "@/components/sections/UltimateGuideSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FoodSection } from "@/components/sections/FoodSection";

export default function FoodPage() {
  return (
    <div className="container py-8 space-y-12">
      {/* Food Guide Section */}
      <FoodSection />
      {/* Services Section */}
      <ServicesSection />
      {/* Contact & Location */}
      <UltimateGuideSection />
    </div>
  );
}

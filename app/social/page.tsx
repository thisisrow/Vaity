import { Card } from "@/components/ui/card";
import { UltimateGuideSection } from "@/components/sections/UltimateGuideSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FoodSection } from "@/components/sections/FoodSection";

import Image from "next/image";
import '@flaticon/flaticon-uicons/css/all/all.css'; // Import Flaticon UI icons

export default function SocialPage() {
  return (
    <div className="container py-8 space-y-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Insta-Family</h1>

      {/* Instagram-style Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-[15%]">
        {instagramPosts.map((post, index) => (
          <Card key={index} className="overflow-hidden group cursor-pointer relative">
            <div className="relative aspect-[9/16]">
              <video
                src={post}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
                muted
                loop
                playsInline
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="fi fi-rr-play text-white text-4xl"></i>
            </div>
          </Card>
        ))}
      </div>

      <FoodSection />
      <ServicesSection />
      <UltimateGuideSection />
    </div>
  );
}

const instagramPosts = [
  "https://res.cloudinary.com/db1nsxnit/video/upload/v1743609565/Video-969_gkx7z0.mp4?q=80&w=2070&auto=format&fit=crop",
  "https://res.cloudinary.com/db1nsxnit/video/upload/v1743609565/Video-969_gkx7z0.mp4?q=80&w=2070&auto=format&fit=crop",
  "https://res.cloudinary.com/db1nsxnit/video/upload/v1743609565/Video-969_gkx7z0.mp4?q=80&w=2070&auto=format&fit=crop",
  "https://res.cloudinary.com/db1nsxnit/video/upload/v1743609565/Video-969_gkx7z0.mp4?q=80&w=2070&auto=format&fit=crop",
  "https://res.cloudinary.com/db1nsxnit/video/upload/v1743609565/Video-969_gkx7z0.mp4?q=80&w=2070&auto=format&fit=crop",
  "https://res.cloudinary.com/db1nsxnit/video/upload/v1743609565/Video-969_gkx7z0.mp4?q=80&w=2070&auto=format&fit=crop",
  "https://res.cloudinary.com/db1nsxnit/video/upload/v1743609565/Video-969_gkx7z0.mp4?q=80&w=2070&auto=format&fit=crop",
  "https://res.cloudinary.com/db1nsxnit/video/upload/v1743609565/Video-969_gkx7z0.mp4?q=80&w=2070&auto=format&fit=crop",
];
